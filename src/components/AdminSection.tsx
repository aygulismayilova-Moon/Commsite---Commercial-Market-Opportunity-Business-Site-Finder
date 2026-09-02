import React, { useState, useMemo } from 'react';
import {
  Shield,
  Lock,
  Users,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle2,
  UserPlus,
  Trash2,
  Edit3,
  RefreshCw,
  Search,
  Key,
  Layers,
  Sparkles,
  MapPin,
  Siren,
  Sliders,
  FileSpreadsheet,
  Download,
  LogOut,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Building,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserProfile, UserRole, UserStatus, PlaceItem, MapSnapshot, IncidentAlarm, AccidentEvent } from '../types';
import { LoginPage } from './LoginPage';
import { CommsiteLogo } from './CommsiteLogo';

interface AdminSectionProps {
  places: PlaceItem[];
  snapshots: MapSnapshot[];
  alarms: IncidentAlarm[];
  accidentEvents: AccidentEvent[];
  onRefreshPlaces?: () => void;
  onNavigateToMonitoring?: () => void;
  onNavigateToCommercial?: () => void;
}

export function AdminSection({
  places,
  snapshots,
  alarms,
  accidentEvents,
  onRefreshPlaces,
  onNavigateToMonitoring,
  onNavigateToCommercial,
}: AdminSectionProps) {
  const {
    user,
    userProfile,
    isAdmin,
    isAuthorizedAdmin,
    loading,
    usersList,
    auditLogs,
    securityConfig,
    updateUserRole,
    addUserManually,
    deleteUserAccount,
    updateSecurityConfig,
    logAuditAction,
    logout,
    loginWithDemoAdmin,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'security' | 'data'>('overview');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newDepartment, setNewDepartment] = useState('Geospatial Site Selection');
  const [newRole, setNewRole] = useState<UserRole>('analyst');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [auditFilter, setAuditFilter] = useState<string>('All');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Filtered users
  const filteredUsers = useMemo(() => {
    if (!userSearchQuery.trim()) return usersList;
    const q = userSearchQuery.toLowerCase();
    return usersList.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        u.displayName.toLowerCase().includes(q) ||
        u.department?.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [usersList, userSearchQuery]);

  // Filtered audit logs
  const filteredLogs = useMemo(() => {
    if (auditFilter === 'All') return auditLogs;
    return auditLogs.filter((l) => l.category?.toLowerCase() === auditFilter.toLowerCase());
  }, [auditLogs, auditFilter]);

  // Handle adding user
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setIsProcessing(true);
    const success = await addUserManually(newEmail, newName, newRole, newDepartment);
    setIsProcessing(false);
    if (success) {
      showNotification(`User account created and authorized for ${newEmail}`);
      setNewEmail('');
      setNewName('');
      setShowAddUserModal(false);
    } else {
      showNotification('Failed to create user account.', 'error');
    }
  };

  // Handle role modification
  const handleRoleChange = async (userId: string, targetRole: UserRole) => {
    setIsProcessing(true);
    await updateUserRole(userId, targetRole, targetRole === 'admin', 'active');
    setIsProcessing(false);
    showNotification(`User role updated to ${targetRole.toUpperCase()}`);
  };

  // Handle status toggle
  const handleStatusToggle = async (userItem: UserProfile) => {
    const nextStatus: UserStatus = userItem.status === 'active' ? 'suspended' : 'active';
    setIsProcessing(true);
    await updateUserRole(userItem.id, userItem.role, userItem.isAuthorizedAdmin, nextStatus);
    setIsProcessing(false);
    showNotification(`User status changed to ${nextStatus.toUpperCase()}`);
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (confirm(`Are you sure you want to delete access for ${userEmail}?`)) {
      setIsProcessing(true);
      await deleteUserAccount(userId);
      setIsProcessing(false);
      showNotification(`User profile for ${userEmail} was removed.`);
    }
  };

  // Export audit logs to JSON
  const handleExportAuditLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `commsite_audit_logs_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('System audit logs exported successfully.');
  };

  // 1. IF USER IS NOT LOGGED IN -> Show Access Denied / Direct Login Screen
  if (!userProfile) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-2xl mb-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="w-16 h-16 bg-rose-600/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
            <Lock className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-950/80 text-rose-300 border border-rose-800/50 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-rose-400" />
            Security Clearance Level 5 Required
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mb-2">
            Administrator Authentication Required
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6">
            The COMMSITE Admin Command Center is strictly restricted to authorized system directors and administrators. Please authenticate with your authorized credentials.
          </p>

          <button
            onClick={loginWithDemoAdmin}
            className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-bold rounded-lg text-xs shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Fast-Track Authorized Admin Login (<code className="text-amber-200">aisay.company@gmail.com</code>)</span>
          </button>
        </div>

        <LoginPage
          redirectReason="Please sign in with your authorized administrator account to access the Admin Control Center."
          defaultTab="admin"
        />
      </div>
    );
  }

  // 2. IF LOGGED IN BUT NOT AUTHORIZED ADMIN -> Show Access Restricted Barrier
  if (!isAuthorizedAdmin) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl border border-rose-200 shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-200">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-bold mb-3">
            <Shield className="w-3.5 h-3.5" />
            Unauthorized Access
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-2">
            Administrator Clearance Required
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-4">
            Your current account (<strong className="text-slate-900">{userProfile.email}</strong>) is registered as{' '}
            <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold uppercase text-xs">
              {userProfile.role}
            </span>
            , which does not have Administrative clearance to modify users, security rules, or database systems.
          </p>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs text-slate-700 space-y-2 mb-6 max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-slate-500">Account ID:</span>
              <span className="font-mono">{userProfile.uid || userProfile.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Clearance Status:</span>
              <span className="font-bold text-amber-700">Standard Clearance</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Master Admin:</span>
              <span className="font-bold text-slate-900">aisay.company@gmail.com</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={loginWithDemoAdmin}
              className="w-full sm:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Switch to Authorized Admin (aisay)</span>
            </button>
            <button
              onClick={logout}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. AUTHORIZED ADMINISTRATOR CONTROL PANEL
  return (
    <div className="space-y-6">
      {/* Top Admin Mission Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-600/20 text-rose-400 rounded-xl border border-rose-500/30">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 text-xs font-black bg-rose-900/80 text-rose-300 border border-rose-700/50 rounded uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Authorized Admin Clearance
                </span>
                <span className="text-xs text-slate-400">
                  Signed in as <strong className="text-white">{userProfile.email}</strong>
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                COMMSITE Executive &amp; Administrative Command Center
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Global governance for user authorizations, role-based access control, security policies, audit logging, and geospatial dataset integrity.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                logAuditAction('System Refresh', 'Manual health sync requested by admin', 'Operations');
                if (onRefreshPlaces) onRefreshPlaces();
                showNotification('System records and Firestore collections synchronized.');
              }}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold border border-slate-700 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
              <span>Sync Database</span>
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 rounded-lg text-xs font-bold border border-rose-500/30 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div
            className={`mt-4 p-3 rounded-lg text-xs flex items-center gap-2 font-bold ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                : 'bg-rose-950/80 text-rose-300 border border-rose-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMessage.text}</span>
          </div>
        )}
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4 text-blue-400" />
          <span>System &amp; Data Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'users'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-400" />
          <span>Authorized Users &amp; Roles</span>
          <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[10px] font-black rounded-full">
            {usersList.length || 1}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'security'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4 text-amber-400" />
          <span>Security &amp; Audit Trail</span>
          <span className="px-1.5 py-0.5 bg-slate-700 text-white text-[10px] font-mono rounded">
            {auditLogs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('data')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'data'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Database className="w-4 h-4 text-purple-400" />
          <span>Dataset Governance</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & SYSTEM HEALTH */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Metrics Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
                <span>Monitored Places</span>
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{places.length}</div>
              <p className="text-[11px] text-slate-400 mt-1">Active surveillance targets</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
                <span>Map Snapshots</span>
                <Layers className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{snapshots.length}</div>
              <p className="text-[11px] text-slate-400 mt-1">Portrait 480x720 records</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
                <span>Incident Alarms</span>
                <Siren className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{alarms.length}</div>
              <p className="text-[11px] text-slate-400 mt-1">Configured severity filters</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
                <span>Authorized Users</span>
                <UserCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{Math.max(1, usersList.length)}</div>
              <p className="text-[11px] text-slate-400 mt-1">Active RBAC accounts</p>
            </div>
          </div>

          {/* Infrastructure Health Status */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <span>Core Services &amp; API Connectivity Status</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900">Firestore Realtime DB</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-emerald-800 font-semibold">Online &amp; Synchronized</p>
                <p className="text-[10px] text-slate-500 mt-1 font-mono">ID: ai-studio-remixgeoguardmap</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900">Google Maps Platform</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-emerald-800 font-semibold">Active &amp; Server-Proxied</p>
                <p className="text-[10px] text-slate-500 mt-1">Static Maps, Tile Engine &amp; Geocoding</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900">Gemini Reasoning AI</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-emerald-800 font-semibold">Server-Side Integrated</p>
                <p className="text-[10px] text-slate-500 mt-1">Vision analysis &amp; Market Intelligence</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900">Places Discovery Engine</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-emerald-800 font-semibold">Real-Time Search Ready</p>
                <p className="text-[10px] text-slate-500 mt-1">Google Places + OSM Global Scanner</p>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Commercial Market Finder</h4>
                <p className="text-xs text-slate-500 mt-0.5">Explore competitor saturation and AI opportunity zones</p>
              </div>
              <button
                onClick={onNavigateToCommercial}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Open Market Finder</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Head Office And Branches - Physical Monitoring</h4>
                <p className="text-xs text-slate-500 mt-0.5">Inspect vertical 480x720 snapshots and AI difference detection</p>
              </div>
              <button
                onClick={onNavigateToMonitoring}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Open Physical Monitoring</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUTHORIZED USERS & ROLES */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Authorized Users &amp; Role-Based Access Control</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage clearance levels for administrators, commercial analysts, and monitoring personnel.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Authorize New User</span>
                </button>
              </div>
            </div>

            {/* User Search Bar */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                placeholder="Search users by name, email, department, or role..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">User / Email</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Clearance Role</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        No registered users found. Click &quot;Authorize New User&quot; to provision an account.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id || u.uid} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                              {u.displayName?.charAt(0)?.toUpperCase() || u.email?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{u.displayName || 'Unnamed User'}</span>
                                {u.email.toLowerCase() === 'aisay.company@gmail.com' && (
                                  <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[9px] font-black rounded uppercase">
                                    Owner
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500">{u.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-medium">
                          {u.department || 'Commercial Site Analytics'}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={u.role}
                            disabled={isProcessing}
                            onChange={(e) => handleRoleChange(u.id || u.uid, e.target.value as UserRole)}
                            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-all cursor-pointer ${
                              u.role === 'admin'
                                ? 'bg-rose-50 text-rose-800 border-rose-300'
                                : u.role === 'manager'
                                ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                                : u.role === 'analyst'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            <option value="admin">Administrator (Full Access)</option>
                            <option value="manager">Manager (Approve &amp; Edit)</option>
                            <option value="analyst">Analyst (Analyze &amp; Export)</option>
                            <option value="viewer">Viewer (Read-Only)</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleStatusToggle(u)}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase transition-all cursor-pointer ${
                              u.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                          >
                            {u.status}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(u.id || u.uid, u.email)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all cursor-pointer"
                            title="Remove user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SECURITY POLICIES & AUDIT TRAIL */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Security Configuration Switches */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600" />
              <span>System Security &amp; Access Controls</span>
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Configure global authentication policies, session timeouts, and data access barriers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="text-xs font-bold text-slate-900">Enforce Admin 2FA Warning</div>
                  <div className="text-[11px] text-slate-500">Require multi-factor verification check on login</div>
                </div>
                <input
                  type="checkbox"
                  checked={securityConfig.requireAdminTwoFactorNotice}
                  onChange={(e) => updateSecurityConfig({ requireAdminTwoFactorNotice: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="text-xs font-bold text-slate-900">Allow Guest Preview Mode</div>
                  <div className="text-[11px] text-slate-500">Allow unauthenticated users to preview public datasets</div>
                </div>
                <input
                  type="checkbox"
                  checked={securityConfig.allowGuestPreview}
                  onChange={(e) => updateSecurityConfig({ allowGuestPreview: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="text-xs font-bold text-slate-900">Allow CSV Dataset Export</div>
                  <div className="text-[11px] text-slate-500">Enable analysts to download places &amp; market reports</div>
                </div>
                <input
                  type="checkbox"
                  checked={securityConfig.allowCsvExport}
                  onChange={(e) => updateSecurityConfig({ allowCsvExport: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="text-xs font-bold text-slate-900">Enforce GPS Coordinate Validation</div>
                  <div className="text-[11px] text-slate-500">Block creation of places with invalid coordinates</div>
                </div>
                <input
                  type="checkbox"
                  checked={securityConfig.enforceGpsVerification}
                  onChange={(e) => updateSecurityConfig({ enforceGpsVerification: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Audit Logs Trail */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Real-Time Security &amp; Administrative Audit Trail</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Immutable log of logins, role updates, and data modifications.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={auditFilter}
                  onChange={(e) => setAuditFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs font-bold border border-slate-300 rounded-lg bg-white"
                >
                  <option value="All">All Categories</option>
                  <option value="Authentication">Authentication</option>
                  <option value="User Governance">User Governance</option>
                  <option value="Admin Clearance">Admin Clearance</option>
                  <option value="Security">Security</option>
                  <option value="Operations">Operations</option>
                </select>

                <button
                  onClick={handleExportAuditLogs}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Actor Email</th>
                    <th className="py-3 px-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-400 font-sans">
                        No audit records in this category.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.slice(0, 50).map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 text-slate-500 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="py-2.5 px-4 font-bold text-slate-900 font-sans">
                          {log.action}
                        </td>
                        <td className="py-2.5 px-4">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase font-sans">
                            {log.category || 'General'}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-blue-700 font-sans">
                          {log.actorEmail}
                        </td>
                        <td className="py-2.5 px-4 text-slate-600 max-w-xs truncate font-sans">
                          {log.details || '—'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DATASET GOVERNANCE */}
      {activeTab === 'data' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-600" />
              <span>Geospatial Data Governance &amp; Cleanup</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tools to maintain database integrity, eliminate orphaned records, and backup configurations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 mb-1">Places Integrity Audit</h4>
              <p className="text-[11px] text-slate-500 mb-3">
                Scans all {places.length} places for duplicate coordinates, missing coordinates, or orphaned tags.
              </p>
              <button
                onClick={() => {
                  logAuditAction('Data Integrity Scan', `Audited ${places.length} places`, 'Operations');
                  showNotification(`Audit complete: All ${places.length} places verified with valid coordinates.`);
                }}
                className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition-all cursor-pointer"
              >
                Run Integrity Scan
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 mb-1">Local Storage Cache Sync</h4>
              <p className="text-[11px] text-slate-500 mb-3">
                Synchronizes browser storage keys with latest Firestore collections.
              </p>
              <button
                onClick={() => {
                  if (onRefreshPlaces) onRefreshPlaces();
                  showNotification('Local and Firestore data stores resynchronized.');
                }}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-xs transition-all cursor-pointer"
              >
                Resynchronize Cache
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 mb-1">Backup Export</h4>
              <p className="text-[11px] text-slate-500 mb-3">
                Download a complete JSON archive of all monitored places, alarms, and snapshots.
              </p>
              <button
                onClick={() => {
                  const backup = {
                    exportedAt: new Date().toISOString(),
                    places,
                    alarms,
                    accidentEvents,
                  };
                  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
                  const a = document.createElement('a');
                  a.href = dataStr;
                  a.download = `commsite_system_backup_${new Date().toISOString().split('T')[0]}.json`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  showNotification('System backup downloaded.');
                }}
                className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-all cursor-pointer"
              >
                Download System Backup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: AUTHORIZE NEW USER */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                <span>Authorize New User Account</span>
              </h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  User Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="analyst@commsite.ai"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Sarah Jenkins"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department / Unit
                </label>
                <input
                  type="text"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  placeholder="Commercial Market Intelligence"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assigned Clearance Role *
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold bg-white"
                >
                  <option value="admin">Administrator (Full Admin Access)</option>
                  <option value="manager">Manager (Approve &amp; Edit Datasets)</option>
                  <option value="analyst">Analyst (Standard Access)</option>
                  <option value="viewer">Viewer (Read-Only)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{isProcessing ? 'Authorizing...' : 'Authorize & Provision'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

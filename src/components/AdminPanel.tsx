import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  UserProfile,
  UserRole,
  UserStatus,
  AdminAuditLog,
  SystemSecurityConfig,
} from '../types';
import {
  Shield,
  Users,
  KeyRound,
  FileText,
  Settings,
  UserPlus,
  Trash2,
  Lock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  Download,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    userProfile,
    isAuthorizedAdmin,
    usersList,
    auditLogs,
    securityConfig,
    updateUserRole,
    addUserManually,
    deleteUserAccount,
    updateSecurityConfig,
    loginWithDemoAdmin,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'users' | 'audit' | 'security'>('users');
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('analyst');
  const [newDept, setNewDept] = useState('Commercial Market Intelligence');
  const [auditFilter, setAuditFilter] = useState('');

  if (!isAuthorizedAdmin) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center mx-auto">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Admin Governance Portal</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Access to user management, system audit logs, and security parameters requires verified administrator clearance.
          </p>
          <div className="pt-2">
            <button
              onClick={() => loginWithDemoAdmin()}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition-all inline-flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock Admin Clearance (Demo Mode)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredUsers = usersList.filter(
    (u) =>
      u.email.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
      u.displayName.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
      u.department?.toLowerCase().includes(searchUserQuery.toLowerCase())
  );

  const filteredAuditLogs = auditLogs.filter(
    (l) =>
      !auditFilter ||
      l.action.toLowerCase().includes(auditFilter.toLowerCase()) ||
      l.actorEmail.toLowerCase().includes(auditFilter.toLowerCase()) ||
      l.details.toLowerCase().includes(auditFilter.toLowerCase())
  );

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    await addUserManually(newEmail, newName, newRole, newDept);
    setNewEmail('');
    setNewName('');
    setShowAddUserModal(false);
  };

  const handleExportAuditLogs = () => {
    const headers = 'ID,Timestamp,Actor,Action,Category,Details\n';
    const rows = auditLogs
      .map(
        (l) =>
          `"${l.id}","${new Date(l.timestamp).toISOString()}","${l.actorEmail}","${l.action}","${l.category}","${l.details.replace(/"/g, '""')}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `commsite_audit_logs_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">Admin Governance &amp; Security</h2>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold rounded-full uppercase">
                Active Clearance
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Logged in as <span className="text-slate-200 font-semibold">{userProfile?.email}</span> ({userProfile?.role.toUpperCase()})
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'users' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Users ({usersList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'audit' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Audit Trail ({auditLogs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'security' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Security Policy</span>
          </button>
        </div>
      </div>

      {/* Tab: Users Management */}
      {activeTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">User Access &amp; Role Management</h3>
              <p className="text-xs text-slate-500">Configure role clearances (Admin, Manager, Analyst, Viewer) and access status.</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search user, email, dept..."
                  value={searchUserQuery}
                  onChange={(e) => setSearchUserQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow transition-all flex items-center gap-1.5 flex-shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add User</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">User / Identity</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Role Clearance</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Last Active</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{u.displayName || u.email.split('@')[0]}</div>
                      <div className="text-slate-500 text-[11px] font-mono">{u.email}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-medium">
                      {u.department || 'Commercial Strategy'}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={u.role}
                        onChange={(e) => {
                          const newR = e.target.value as UserRole;
                          updateUserRole(u.id, newR, newR === 'admin', u.status);
                        }}
                        className={`px-2 py-1 rounded font-bold text-[11px] border cursor-pointer ${
                          u.role === 'admin'
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                            : u.role === 'manager'
                            ? 'bg-blue-50 border-blue-200 text-blue-800'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="analyst">Analyst</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={u.status}
                        onChange={(e) => {
                          const newStat = e.target.value as UserStatus;
                          updateUserRole(u.id, u.role, u.isAuthorizedAdmin, newStat);
                        }}
                        className={`px-2 py-1 rounded font-bold text-[11px] border cursor-pointer ${
                          u.status === 'active'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : u.status === 'suspended'
                            ? 'bg-rose-50 border-rose-200 text-rose-800'
                            : 'bg-amber-50 border-amber-200 text-amber-800'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-[11px]">
                      {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {u.email !== userProfile?.email && (
                        <button
                          onClick={() => deleteUserAccount(u.id)}
                          title="Delete user"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">System Audit Trail &amp; Access Log</h3>
              <p className="text-xs text-slate-500">Immutable ledger of administrative actions, authentication attempts, and data exports.</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Filter logs..."
                value={auditFilter}
                onChange={(e) => setAuditFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleExportAuditLogs}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-[480px]">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="px-4 py-2.5">Timestamp</th>
                  <th className="px-4 py-2.5">Category</th>
                  <th className="px-4 py-2.5">Action</th>
                  <th className="px-4 py-2.5">Actor</th>
                  <th className="px-4 py-2.5">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                {filteredAuditLogs.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 text-slate-500 whitespace-nowrap">
                      {new Date(l.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {l.category}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-bold text-slate-900 font-sans">
                      {l.action}
                    </td>
                    <td className="px-4 py-2 text-slate-600 truncate max-w-[160px]">
                      {l.actorEmail}
                    </td>
                    <td className="px-4 py-2 text-slate-600 font-sans max-w-xs truncate">
                      {l.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Security Policy */}
      {activeTab === 'security' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Global Security &amp; Compliance Configuration</h3>
            <p className="text-xs text-slate-500">Fine-tune system-wide policy enforcement, session security, and data export rules.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Allow Guest Preview</h4>
                  <p className="text-[11px] text-slate-500">Permit unauthenticated users to view demo commercial insights</p>
                </div>
                <input
                  type="checkbox"
                  checked={securityConfig.allowGuestPreview}
                  onChange={(e) => updateSecurityConfig({ allowGuestPreview: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Enforce GPS Verification</h4>
                  <p className="text-[11px] text-slate-500">Validate real coordinate bounding ranges before saving places</p>
                </div>
                <input
                  type="checkbox"
                  checked={securityConfig.enforceGpsVerification}
                  onChange={(e) => updateSecurityConfig({ enforceGpsVerification: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Allow CSV Dataset Export</h4>
                  <p className="text-[11px] text-slate-500">Permit analysts to download raw place registries</p>
                </div>
                <input
                  type="checkbox"
                  checked={securityConfig.allowCsvExport}
                  onChange={(e) => updateSecurityConfig({ allowCsvExport: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Allow Bulk Deletion</h4>
                  <p className="text-[11px] text-slate-500">Permit authorized admins to execute batch cleanup</p>
                </div>
                <input
                  type="checkbox"
                  checked={securityConfig.allowBulkDelete}
                  onChange={(e) => updateSecurityConfig({ allowBulkDelete: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-slate-200">
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  AI Rate Limit Threshold (RPM per client)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="5"
                    value={securityConfig.aiRateLimitThreshold}
                    onChange={(e) => updateSecurityConfig({ aiRateLimitThreshold: parseInt(e.target.value, 10) })}
                    className="flex-1"
                  />
                  <span className="font-mono text-xs font-bold text-slate-800 w-12 text-right">
                    {securityConfig.aiRateLimitThreshold} RPM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-900 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-sm font-bold text-slate-900">Provision New User Account</h3>
            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="analyst@commsite.ai"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Liam Zhang"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Role Clearance</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="analyst">Analyst</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Department</label>
                  <input
                    type="text"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

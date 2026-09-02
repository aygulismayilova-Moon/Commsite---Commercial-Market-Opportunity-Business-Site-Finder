import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  Key,
  User,
  Building,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  Eye,
  EyeOff,
  Layers,
  Database,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CommsiteLogo } from './CommsiteLogo';

interface LoginPageProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  redirectReason?: string;
  defaultTab?: 'signin' | 'signup' | 'admin';
}

export function LoginPage({
  onSuccess,
  onCancel,
  redirectReason,
  defaultTab = 'signin',
}: LoginPageProps) {
  const {
    loginWithEmail,
    signupWithEmail,
    loginWithDemoAdmin,
    sendPasswordReset,
    error,
    clearError,
    loading,
    userProfile,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'admin'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('Geospatial Analytics');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetSent, setIsResetSent] = useState(false);
  const [resettingEmail, setResettingEmail] = useState(false);
  const [localMessage, setLocalMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalMessage(null);

    if (activeTab === 'signin') {
      if (!email.trim() || !password) {
        setLocalMessage('Please enter both email and password.');
        return;
      }
      const ok = await loginWithEmail(email, password);
      if (ok && onSuccess) onSuccess();
    } else if (activeTab === 'signup') {
      if (!email.trim() || !password) {
        setLocalMessage('Please enter email and password.');
        return;
      }
      if (password.length < 6) {
        setLocalMessage('Password must be at least 6 characters.');
        return;
      }
      const ok = await signupWithEmail(email, password, fullName, department);
      if (ok && onSuccess) onSuccess();
    }
  };

  const handleDemoAdminSignIn = async () => {
    clearError();
    setLocalMessage(null);
    const ok = await loginWithDemoAdmin();
    if (ok && onSuccess) onSuccess();
  };

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setLocalMessage('Please enter your email address in the field above to receive a password reset link.');
      return;
    }
    setResettingEmail(true);
    const ok = await sendPasswordReset(email);
    setResettingEmail(false);
    if (ok) {
      setIsResetSent(true);
      setLocalMessage(`A password reset link has been dispatched to ${email}.`);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 text-white text-center relative">
          {onCancel && (
            <button
              onClick={onCancel}
              className="absolute top-4 left-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          <div className="flex justify-center mb-2 mt-1">
            <CommsiteLogo size="md" dark />
          </div>
          <p className="text-xs text-blue-200/90 font-medium max-w-xs mx-auto mb-3">
            Commercial Market Opportunity &amp; Business Site Finder &bull; Geospatial Intelligence
          </p>
          <div className="pt-2 border-t border-slate-700/60">
            <h2 className="text-lg font-black tracking-tight text-white">
              {activeTab === 'admin'
                ? 'Administrator Access Clearance'
                : activeTab === 'signup'
                ? 'Create COMMSITE Account'
                : 'Sign In to COMMSITE'}
            </h2>
          </div>
        </div>

        {/* Redirect Notice if routed because of restricted access */}
        {redirectReason && (
          <div className="bg-amber-50 border-b border-amber-200 p-3 px-5 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Access Restricted</p>
              <p className="text-amber-700">{redirectReason}</p>
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('signin');
              clearError();
              setLocalMessage(null);
            }}
            className={`py-3 text-center transition-all border-b-2 ${
              activeTab === 'signin'
                ? 'bg-white text-blue-800 border-blue-600 shadow-sm'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setActiveTab('signup');
              clearError();
              setLocalMessage(null);
            }}
            className={`py-3 text-center transition-all border-b-2 ${
              activeTab === 'signup'
                ? 'bg-white text-blue-800 border-blue-600 shadow-sm'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => {
              setActiveTab('admin');
              clearError();
              setLocalMessage(null);
            }}
            className={`py-3 text-center transition-all border-b-2 flex items-center justify-center gap-1 ${
              activeTab === 'admin'
                ? 'bg-white text-rose-700 border-rose-600 shadow-sm'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-rose-500" />
            <span>Admin Fast</span>
          </button>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Error / Alert Messages */}
          {(error || localMessage) && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold leading-relaxed">{error || localMessage}</p>
                </div>
              </div>

              {((error && (error.includes('already registered') || error.includes('already-in-use'))) ||
                (localMessage && localMessage.includes('already registered'))) && (
                <div className="flex items-center gap-2 pt-1 border-t border-rose-200/80">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('signin');
                      clearError();
                      setLocalMessage(null);
                    }}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-[11px] transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Switch to Sign In</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    disabled={resettingEmail}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold rounded text-[11px] transition-all cursor-pointer"
                  >
                    {resettingEmail ? 'Sending...' : 'Send Password Reset'}
                  </button>
                </div>
              )}
            </div>
          )}

          {isResetSent && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Password reset instructions sent. Please check your inbox.</span>
            </div>
          )}

          {/* ADMIN FAST-TRACK TAB */}
          {activeTab === 'admin' ? (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 rounded-xl text-white border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                  <Shield className="w-4 h-4" />
                  <span>Authorized Administrator Clearance</span>
                </div>
                <p className="text-xs text-slate-300 mb-3">
                  Instantly authenticate as the authorized Super Administrator (<code className="text-amber-300 font-mono text-[11px]">aisay.company@gmail.com</code>) to unlock full access to the Admin Portal, User Role Governance, System Logs, and Security Policies.
                </p>
                <div className="space-y-1.5 text-[11px] text-slate-300 border-t border-slate-800 pt-2 mb-3">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Full Admin Management &amp; Role Control</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Real-Time Audit Trail &amp; Data Integrity Hub</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Global Security &amp; Database Governance</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDemoAdminSignIn}
                  disabled={loading}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-amber-300" />
                  <span>{loading ? 'Authenticating Clearance...' : 'Login as Authorized Super Admin'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-500">
                  Or enter regular credentials in the <button type="button" onClick={() => setActiveTab('signin')} className="text-blue-600 font-bold hover:underline">Sign In tab</button>.
                </p>
              </div>
            </div>
          ) : (
            /* EMAIL/PASSWORD FORM (SIGN IN / SIGN UP) */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {activeTab === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Dr. Alex Rivera"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Department / Organization
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="Market Intelligence & Site Strategy"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="analyst@commsite.ai"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  {activeTab === 'signin' && (
                    <button
                      type="button"
                      onClick={handlePasswordReset}
                      disabled={resettingEmail}
                      className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                    >
                      {resettingEmail ? 'Sending...' : 'Forgot password?'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {loading
                    ? 'Authenticating...'
                    : activeTab === 'signin'
                    ? 'Sign In'
                    : 'Create Account'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Authorized Admin Shortcut Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDemoAdminSignIn}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-rose-500" />
                  <span>Instant Authorized Admin Fast-Track</span>
                </button>
              </div>
            </form>
          )}

          {/* Current Auth Status Indicator if user already logged in */}
          {userProfile && (
            <div className="mt-6 pt-4 border-t border-slate-200 text-center">
              <p className="text-[11px] text-slate-500">Currently signed in as:</p>
              <p className="text-xs font-bold text-slate-800">{userProfile.email}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-black rounded uppercase ${
                userProfile.role === 'admin'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                Role: {userProfile.role}
              </span>
            </div>
          )}
        </div>

        {/* Footer Security Guarantee */}
        <div className="bg-slate-50 p-3 px-6 border-t border-slate-200 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-blue-600" />
          <span>Role-Based Access Control &amp; Firestore Security Enforced</span>
        </div>
      </div>
    </div>
  );
}

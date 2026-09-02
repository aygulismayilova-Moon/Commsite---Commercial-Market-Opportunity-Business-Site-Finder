import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CommsiteLogo } from './CommsiteLogo';
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  Building,
  KeyRound,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const {
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    loginWithDemoAdmin,
    sendPasswordReset,
    error,
    clearError,
  } = useAuth();

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isForgot, setIsForgot] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [department, setDepartment] = useState<string>('Commercial Market Intelligence');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setInfoMessage(null);
    setIsSubmitting(true);

    try {
      if (isForgot) {
        if (!email.trim()) {
          setIsSubmitting(false);
          return;
        }
        await sendPasswordReset(email.trim());
        setInfoMessage(`Password recovery link dispatched to ${email}.`);
        setIsSubmitting(false);
        return;
      }

      if (isSignUp) {
        const ok = await signupWithEmail(email, password, name, department);
        if (ok) {
          onClose();
        }
      } else {
        const ok = await loginWithEmail(email, password);
        if (ok) {
          onClose();
        }
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    clearError();
    const ok = await loginWithGoogle();
    setIsSubmitting(false);
    if (ok) onClose();
  };

  const handleDemoAdmin = async () => {
    setIsSubmitting(true);
    await loginWithDemoAdmin();
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-900 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pt-2">
          <CommsiteLogo size="sm" variant="badge" className="mx-auto mb-2" />
          <h2 className="text-lg font-extrabold text-slate-900">
            {isForgot
              ? 'Reset Password'
              : isSignUp
              ? 'Create Commsite Account'
              : 'Sign In to Commsite'}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Commercial site analytics &amp; geospatial decision intelligence
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-900 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span className="flex-1">{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="flex-1">{infoMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {isSignUp && (
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Johnathan Miller"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-bold mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
              />
            </div>
          </div>

          {!isForgot && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-700 font-bold">Password</label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgot(true);
                      clearError();
                    }}
                    className="text-[11px] text-blue-600 hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                />
              </div>
            </div>
          )}

          {isSignUp && (
            <div>
              <label className="block text-slate-700 font-bold mb-1">Department / Organization</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Retail Expansion Team"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg shadow transition-all disabled:opacity-50"
          >
            {isSubmitting
              ? 'Processing...'
              : isForgot
              ? 'Send Reset Link'
              : isSignUp
              ? 'Create Free Account'
              : 'Sign In'}
          </button>
        </form>

        {!isForgot && (
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-lg border border-slate-200 shadow-xs transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleDemoAdmin}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-1.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs rounded-lg border border-indigo-200 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>One-Click Demo Admin Authorization</span>
            </button>
          </div>
        )}

        <div className="text-center pt-2">
          {isForgot ? (
            <button
              type="button"
              onClick={() => {
                setIsForgot(false);
                clearError();
              }}
              className="text-xs text-blue-600 hover:underline font-bold"
            >
              Back to Sign In
            </button>
          ) : (
            <p className="text-xs text-slate-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  clearError();
                  setInfoMessage(null);
                }}
                className="text-blue-600 hover:underline font-bold"
              >
                {isSignUp ? 'Sign In' : 'Sign Up Free'}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

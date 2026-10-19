import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle2, ShieldCheck, ArrowRight, RefreshCw, X, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export const GoogleAuthPage = ({ onAuthSuccess, isEmbedded = false, onCancel }) => {
  const [selectedEmail, setSelectedEmail] = useState('dooroomimediquip@gmail.com');
  const [useOtherAccount, setUseOtherAccount] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const activeEmail = useOtherAccount ? customEmail.trim() : selectedEmail;

  const handleVerifySubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!activeEmail) {
      setError('Please provide a valid Gmail address.');
      return;
    }

    if (!password.trim()) {
      setError('Enter your password to continue.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: activeEmail.toLowerCase(),
          password: password.trim(),
          name: 'Dooroomi Administrator'
        })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSuccess(true);

        // Store session tokens
        if (data.token) {
          sessionStorage.setItem('dooroomi_admin_token', data.token);
        }
        if (data.user) {
          sessionStorage.setItem('dooroomi_user', JSON.stringify(data.user));
        }
        sessionStorage.setItem('dooroomi_admin', 'true');
        sessionStorage.setItem('dooroomi_redirect_target', 'updatePassword');

        // Clean any cached storage
        try {
          localStorage.removeItem('dooroomi_admin');
          localStorage.removeItem('dooroomi_admin_token');
          localStorage.removeItem('dooroomi_user');
        } catch (_) {}

        // Notify parent window if this is running in a popup
        if (window.opener && !window.opener.closed) {
          try {
            window.opener.postMessage({
              type: 'DOOROOMI_GOOGLE_AUTH_SUCCESS',
              token: data.token,
              user: data.user,
              redirectTarget: 'updatePassword'
            }, '*');
          } catch (_) {}
        }

        if (onAuthSuccess) {
          setTimeout(() => {
            onAuthSuccess(data.user, 'updatePassword');
          }, 900);
        } else {
          // In popup window, close after showing success
          setTimeout(() => {
            if (window.opener) {
              window.close();
            } else {
              window.location.hash = '/admin?tab=settings&mode=updatePassword';
            }
          }, 1100);
        }
      } else {
        setError(data.message || 'Wrong password. Try again or check your administrator password.');
      }
    } catch (networkErr) {
      setError('Unable to connect to Dooroomi authentication server. Please verify backend status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full ${isEmbedded ? '' : 'min-h-screen bg-[#f0f4f9] flex items-center justify-center p-4'}`}>
      <div className={`w-full max-w-[480px] bg-white rounded-3xl ${isEmbedded ? '' : 'shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-slate-200/70 p-8 sm:p-10'} relative overflow-hidden`}>
        
        {/* Cancel button if modal */}
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Top Google Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <svg className="w-10 h-10 mb-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>

          <h2 className="text-xl sm:text-2xl font-medium text-slate-800 tracking-tight font-sans">
            Sign in with Google
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            to continue to <strong className="text-slate-800 font-semibold">Dooroomi Mediquip</strong>
          </p>
        </div>

        {/* Success Splash */}
        {success ? (
          <div className="py-8 px-4 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-9 h-9 stroke-[2.4]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Google Account Verified!
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-mono">
                {activeEmail}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
              <span>Redirecting to <strong>Update Password</strong>...</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleVerifySubmit} className="space-y-4">
            
            {/* Account Card */}
            {!useOtherAccount ? (
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                    D
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 truncate">
                      <span>Dooroomi Admin</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-100 text-emerald-800 font-semibold shrink-0">
                        Authorized
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono block truncate">
                      {selectedEmail}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setUseOtherAccount(true)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer ml-2 shrink-0"
                >
                  Change
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Enter your Google Email:
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setUseOtherAccount(false);
                      setCustomEmail('');
                    }}
                    className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                  >
                    Use default admin email
                  </button>
                </div>
                <input
                  type="email"
                  required
                  autoFocus
                  placeholder="name@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono"
                />
              </div>
            )}

            {/* Instruction Subtext */}
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              To verify and access your administrator account, enter your security password below:
            </p>

            {/* Password Field */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoFocus={!useOtherAccount}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Show password checkbox like standard Google Sign-In */}
              <div className="flex items-center justify-between mt-2.5 px-0.5">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span>Show password</span>
                </label>
                <span className="text-[11px] text-blue-600 font-medium">
                  Verified Admin Security
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            {/* Google Next Button & Actions */}
            <div className="pt-2 flex items-center justify-between gap-3">
              {onCancel ? (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              ) : (
                <span className="text-[11px] text-slate-400">
                  Step 2 of 2
                </span>
              )}

              <button
                type="submit"
                disabled={loading}
                className="ml-auto px-7 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Footer Notice */}
            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed text-center">
              Google will verify your identity and immediately direct you to update your admin password.
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

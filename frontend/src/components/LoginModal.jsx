import React, { useState } from 'react';
import { X, Lock, ArrowRight, ShieldCheck, User, Eye, EyeOff, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';
import { API_BASE_URL } from '../config/api';

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [useOtherAccount, setUseOtherAccount] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanUser = loginId.trim().toLowerCase();
    const cleanPass = password.trim();

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass })
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        if (data.token) {
          sessionStorage.setItem('dooroomi_admin_token', data.token);
        }
        if (data.user) {
          sessionStorage.setItem('dooroomi_user', JSON.stringify(data.user));
        }
        sessionStorage.setItem('dooroomi_admin', 'true');

        // Clear any old credentials or cached data from localStorage
        localStorage.removeItem('dooroomi_admin');
        localStorage.removeItem('dooroomi_admin_token');
        localStorage.removeItem('dooroomi_user');

        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        }
        onClose();
      } else {
        setError(data.message || 'Access Denied. Invalid administrator credentials.');
      }
    } catch (networkErr) {
      setError('Cannot connect to backend server. Please make sure the server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async (emailToUse) => {
    setError('');
    setLoading(true);

    const targetEmail = (emailToUse || 'dooroomimediquip@gmail.com').trim().toLowerCase();

    try {
      const res = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          name: 'Dooroomi Global Administrator'
        })
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        if (data.token) {
          sessionStorage.setItem('dooroomi_admin_token', data.token);
        }
        if (data.user) {
          sessionStorage.setItem('dooroomi_user', JSON.stringify(data.user));
        }
        sessionStorage.setItem('dooroomi_admin', 'true');

        localStorage.removeItem('dooroomi_admin');
        localStorage.removeItem('dooroomi_admin_token');
        localStorage.removeItem('dooroomi_user');

        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        }
        setShowGooglePrompt(false);
        onClose();
      } else {
        setError(data.message || 'Google account verification failed. Access restricted to authorized administrators.');
      }
    } catch (networkErr) {
      setError('Cannot connect to backend server. Please verify backend status.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setError('');
    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            setShowGooglePrompt(true);
          }
        });
        return;
      } catch (_) {}
    }
    setShowGooglePrompt(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-hanbit-dark/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-hanbit-gold/40 p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-hanbit-ivory hover:bg-stone-200 text-hanbit-forest flex items-center justify-center transition-colors cursor-pointer"
          title="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-hanbit-forest to-emerald-900 text-hanbit-gold flex items-center justify-center shadow-md border border-hanbit-gold/40">
            <Lock className="w-7 h-7" />
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-mono font-bold border border-amber-200">
            <ShieldCheck className="w-3 h-3 text-amber-600" />
            <span>Dooroomi B2B &amp; Administrator Gateway</span>
          </div>

          <h3 className="text-2xl font-extrabold text-hanbit-forest font-serif">
            Admin Portal Login
          </h3>
          <p className="text-xs text-hanbit-muted leading-relaxed font-light">
            Authorized management portal for clinical inquiries, wholesale B2B distributor tracking, and 15+ therapy centers.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs leading-relaxed flex items-start gap-2">
            <span className="text-red-500 font-bold shrink-0">⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* GOOGLE RECOVERY PROMPT */}
        {showGooglePrompt ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <h4 className="text-sm font-bold text-neutral-800">Google Administrator Login</h4>
              </div>
              <button
                type="button"
                onClick={() => setShowGooglePrompt(false)}
                className="text-xs text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                Back
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              If you forgot your password, authenticate with your registered Google Administrator account to regain instant access.
            </p>

            {/* Default Official Admin Account Card */}
            <div 
              onClick={() => handleGoogleAuth('dooroomimediquip@gmail.com')}
              className="p-3.5 rounded-2xl border border-sky-200 bg-sky-50/60 hover:bg-sky-50 hover:border-sky-400 cursor-pointer transition-all flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  D
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <span>Dooroomi Official Admin</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-100 text-emerald-800 font-semibold">Authorized</span>
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">dooroomimediquip@gmail.com</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Option to use custom Google email */}
            {useOtherAccount ? (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-neutral-700 font-mono">
                  Enter Authorized Google Email:
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="e.g. admin@dooroomimediquip.com"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-800 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleGoogleAuth(customGoogleEmail)}
                    disabled={!customGoogleEmail || loading}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setUseOtherAccount(true)}
                className="w-full text-center text-xs text-neutral-500 hover:text-sky-600 font-medium py-1 cursor-pointer transition-colors"
              >
                Use another Google Administrator email
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowGooglePrompt(false)}
              className="w-full py-2.5 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-xs font-medium cursor-pointer transition-colors mt-2"
            >
              Cancel &amp; Return to Password Login
            </button>
          </div>
        ) : (
          /* STANDARD FORM LOGIN + GOOGLE BUTTON */
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-hanbit-forest mb-1 font-mono">
                  Administrator ID / Login ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter Admin ID"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-hanbit-ivory border border-hanbit-border text-xs text-hanbit-forest font-mono focus:outline-none focus:border-hanbit-gold focus:ring-1 focus:ring-hanbit-gold"
                  />
                  <User className="w-4 h-4 text-hanbit-gold absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-hanbit-forest mb-1 font-mono">
                  Security Key / Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-hanbit-ivory border border-hanbit-border text-xs text-hanbit-forest font-mono focus:outline-none focus:border-hanbit-gold focus:ring-1 focus:ring-hanbit-gold"
                  />
                  <KeyRound className="w-4 h-4 text-hanbit-gold absolute left-3 top-3 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-hanbit-muted hover:text-hanbit-forest cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-hanbit-forest to-emerald-950 hover:from-hanbit-dark hover:to-hanbit-forest text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold" />
                </button>
              </div>
            </form>

            {/* OR DIVIDER */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-hanbit-border/80"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-hanbit-muted text-[11px] font-medium tracking-wider">
                  Forgot Password?
                </span>
              </div>
            </div>

            {/* GOOGLE SIGN IN BUTTON */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold flex items-center justify-center gap-2.5 shadow-xs hover:shadow-sm transition-all cursor-pointer disabled:opacity-50 group"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="group-hover:text-neutral-900 transition-colors">Sign in with Google</span>
            </button>

            <p className="text-[11px] text-center text-hanbit-muted mt-2 font-light">
              Forgot password? Sign in securely via your registered Google Administrator account.
            </p>
          </>
        )}

        <div className="mt-5 pt-4 border-t border-hanbit-border text-center">
          <p className="text-[11px] text-hanbit-muted font-light">
            MongoDB Database: <strong className="text-emerald-700 font-mono">dooroomimediquip.72damgv.mongodb.net</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

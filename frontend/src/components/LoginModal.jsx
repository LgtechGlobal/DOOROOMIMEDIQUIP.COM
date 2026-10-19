import React, { useState } from 'react';
import { X, Lock, ArrowRight, ShieldCheck, User, Eye, EyeOff, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';
import { API_BASE_URL } from '../config/api';
import { GoogleAuthPage } from './GoogleAuthPage';

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);

  if (!isOpen) return null;

  const handleAuthSuccess = (data, redirectTarget = null) => {
    if (data.token) {
      sessionStorage.setItem('dooroomi_admin_token', data.token);
    }
    if (data.user) {
      sessionStorage.setItem('dooroomi_user', JSON.stringify(data.user));
    }
    sessionStorage.setItem('dooroomi_admin', 'true');
    if (redirectTarget) {
      sessionStorage.setItem('dooroomi_redirect_target', redirectTarget);
    }

    // Clear any old credentials or cached data from localStorage
    try {
      localStorage.removeItem('dooroomi_admin');
      localStorage.removeItem('dooroomi_admin_token');
      localStorage.removeItem('dooroomi_user');
    } catch (_) {}

    if (onLoginSuccess) {
      onLoginSuccess(data.user, redirectTarget);
    }
    setShowGooglePrompt(false);
    onClose();
  };

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
        handleAuthSuccess(data);
      } else {
        setError(data.message || 'Access Denied. Invalid administrator credentials.');
      }
    } catch (networkErr) {
      setError('Cannot connect to backend server. Please make sure the server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignInClick = () => {
    setError('');
    // Open dedicated Google popup window (centered 480x640)
    const width = 480;
    const height = 640;
    const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2);
    const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2);

    try {
      const popup = window.open(
        '#/google-auth',
        'GoogleSignIn',
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,location=no,status=no,resizable=yes`
      );

      // If browser blocked popup window, display directly inside the modal
      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        setShowGooglePrompt(true);
      } else {
        popup.focus();
      }
    } catch (e) {
      setShowGooglePrompt(true);
    }
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

        {showGooglePrompt ? (
          <GoogleAuthPage
            isEmbedded={true}
            onAuthSuccess={(user, redirect) => handleAuthSuccess({ user }, redirect || 'updatePassword')}
            onCancel={() => setShowGooglePrompt(false)}
          />
        ) : (
          <>
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
              onClick={handleGoogleSignInClick}
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

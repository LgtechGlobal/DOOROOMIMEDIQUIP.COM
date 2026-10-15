import React, { useState } from 'react';
import { X, Lock, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Partner portal authentication is currently restricted to active enterprise distributors. To establish access, contact your Dooroomi account manager.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-hanbit-dark/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-hanbit-border p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-hanbit-ivory text-hanbit-forest flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-hanbit-sage-light text-hanbit-forest flex items-center justify-center">
            <Lock className="w-6 h-6 text-hanbit-gold" />
          </div>
          <h3 className="text-xl font-extrabold text-hanbit-forest">
            B2B Partner Portal
          </h3>
          <p className="text-xs text-hanbit-muted">
            Access lot COA chromatograms, manufacturing scheduling, and wholesale tracking.
          </p>
        </div>

        {status && (
          <div className="p-3 mb-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-hanbit-forest mb-1">
              Authorized Business Email
            </label>
            <input
              type="email"
              required
              placeholder="partner@distributor.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-hanbit-ivory border border-hanbit-border text-xs focus:outline-none focus:border-hanbit-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-hanbit-forest mb-1">
              Secure Security Key
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-hanbit-ivory border border-hanbit-border text-xs focus:outline-none focus:border-hanbit-gold"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>Authenticate Client Access</span>
              <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-hanbit-border text-center">
          <p className="text-[11px] text-hanbit-muted">
            Need partner credentials? Contact <a href={`mailto:${SITE_CONFIG.email}`} className="text-hanbit-gold font-bold hover:underline">{SITE_CONFIG.email}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

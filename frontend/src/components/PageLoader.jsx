import React, { useState, useEffect } from 'react';
import { HeartHandshake, Sparkles, Activity } from 'lucide-react';

export const PageLoader = () => {
  const [progress, setProgress] = useState(10);
  const [loadingText, setLoadingText] = useState('Initializing Korean Medical Systems...');
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Step 1: Rapid initial step
    const t1 = setTimeout(() => {
      setProgress(38);
      setLoadingText('Loading Free Therapy Centers & Equipment...');
    }, 180);

    // Step 2: Mid stage
    const t2 = setTimeout(() => {
      setProgress(72);
      setLoadingText('Preparing 100% Free Daily Therapy Experience...');
    }, 450);

    // Step 3: Complete
    const t3 = setTimeout(() => {
      setProgress(100);
      setLoadingText('Welcome to Dooroomi Mediquip · 사랑 · 봉사 · 친절');
    }, 850);

    // Step 4: Fade out
    const t4 = setTimeout(() => {
      setIsFading(true);
    }, 1100);

    // Step 5: Unmount
    const t5 = setTimeout(() => {
      setIsMounted(false);
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071322] text-white transition-all duration-700 ease-in-out select-none ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading Dooroomi Mediquip"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(200,16,46,0.22)_0%,rgba(245,166,35,0.12)_40%,transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Center Content Box */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
        
        {/* Animated Brand Emblem */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer dashed spinning ring */}
          <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-amber-400/40 animate-[spin_10s_linear_infinite]" />
          
          {/* Secondary pulsating ring */}
          <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-red-500/40 animate-ping opacity-30" />

          {/* Central Logo Container */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-[#c8102e] to-amber-300 shadow-[0_0_35px_rgba(200,16,46,0.6)] flex items-center justify-center overflow-hidden">
            <img
              src="./assets/img/brand-logo.jpg"
              alt="Dooroomi 두루미"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Floating Heart & Sparkle Badge */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#c8102e] border-2 border-white shadow-md flex items-center justify-center text-amber-300 animate-bounce">
            <HeartHandshake className="w-4 h-4" />
          </div>
        </div>

        {/* Brand Names */}
        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-amber-300 uppercase tracking-widest font-mono">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>South Korea · Est. 1991</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-white font-serif pt-1">
            DOOROOMI MEDIQUIP
          </h2>
          
          <p className="text-sm font-medium text-amber-300/90 font-serif tracking-widest">
            주식회사 두루미 의료기
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-72 space-y-2.5">
          <div className="relative h-2 w-full rounded-full bg-slate-800/90 border border-slate-700/80 overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-[#c8102e] to-amber-300 shadow-[0_0_12px_rgba(245,166,35,0.8)] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Percent & Live Status Text */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span className="truncate pr-2">{loadingText}</span>
            <span className="text-amber-400 font-bold shrink-0">{progress}%</span>
          </div>
        </div>

        {/* Corporate Motto Footer */}
        <div className="mt-8 flex items-center gap-2 text-xs text-slate-400 font-light">
          <Activity className="w-3.5 h-3.5 text-[#c8102e] animate-pulse" />
          <span className="tracking-wide">사랑 (Love) · 봉사 (Service) · 친절 (Kindness)</span>
        </div>

      </div>
    </div>
  );
};

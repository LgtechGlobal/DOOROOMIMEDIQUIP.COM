import React from 'react';
import { 
  HeartHandshake, 
  ArrowRight, 
  PhoneCall, 
  Activity 
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const Hero = ({ onExploreProducts, onRequestQuote }) => {
  const handleScrollToFreeTherapy = () => {
    const freeTherapyEl = document.getElementById('dooroomi-free-therapy') || document.getElementById('free-therapy');
    if (freeTherapyEl) {
      freeTherapyEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onRequestQuote) {
      onRequestQuote();
    }
  };

  const handleScrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onRequestQuote) {
      onRequestQuote();
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-[#fcfdfd] via-[#f7faf8] to-[#edf4f0] text-slate-900 pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-20 overflow-hidden border-b border-emerald-900/10">
      {/* Ambient background glows & subtle grid pattern (100% CSS, No Images) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[350px] bg-gradient-to-b from-emerald-100/60 via-amber-100/40 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Container */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center text-center">
        
        {/* Eyebrow Badge - Centered */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-800/20 shadow-xs mb-3 sm:mb-4 backdrop-blur-sm animate-in fade-in duration-500">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c8102e] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-emerald-950 font-mono">
            South Korea · Humanitarian Public Health Initiative · 사랑 · 봉사 · 친절
          </span>
        </div>

        {/* What is Dooroomi & Free Therapy Main Headline - Centered */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 font-serif leading-[1.18] sm:leading-[1.15] max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
          What is Dooroomi? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8102e] via-red-700 to-amber-600">
            A Mission of 100% Free Daily Therapy
          </span> <br className="hidden sm:inline" />
          For Every Family & Patient.
        </h1>

        {/* Narrative Description / Subtitle - Centered */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed font-normal animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          Established in South Korea in 1991 under our timeless corporate motto <strong className="text-slate-900 font-semibold">“Love, Service, and Kindness”</strong>, <strong className="text-slate-900 font-semibold">Dooroomi (두루미)</strong> is a certified medical technology organization dedicated to public wellness. We open our authorized therapy centers every day to provide <strong className="text-[#c8102e] font-bold">100% Free Hospital-Grade Therapy</strong> with zero fees, zero obligation, and zero financial burden.
        </p>

        {/* Centered Action Buttons (CTAs) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500 delay-150">
          <button
            onClick={handleScrollToFreeTherapy}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#c8102e] via-red-700 to-[#b00d27] hover:from-red-700 hover:to-red-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-700/25 transform hover:-translate-y-0.5 active:scale-98 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <HeartHandshake className="w-5 h-5 text-amber-300" />
            <span>Experience Free Therapy Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreProducts}
            className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm sm:text-base shadow-xs hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-emerald-700" />
            <span>Explore Medical Equipment</span>
          </button>

          <button
            onClick={handleScrollToContact}
            className="px-5 py-3.5 rounded-full bg-emerald-900/10 hover:bg-emerald-900/20 text-emerald-950 font-semibold text-sm sm:text-base border border-emerald-800/20 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-[#c8102e]" />
            <span>Helpline: {SITE_CONFIG.phone}</span>
          </button>
        </div>

      </div>
    </section>
  );
};

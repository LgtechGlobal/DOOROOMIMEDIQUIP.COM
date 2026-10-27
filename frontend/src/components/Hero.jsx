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
    <section className="relative text-white pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-emerald-950/40 min-h-[520px] sm:min-h-[580px] flex items-center justify-center bg-gradient-to-b from-[#061812] via-[#09221a] to-[#05140f]">
      
      {/* Ambient Decorative Glows & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-hanbit-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Content Container */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center text-center">
        
        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-serif leading-[1.18] sm:leading-[1.15] max-w-4xl mx-auto drop-shadow-md animate-in fade-in slide-in-from-bottom-3 duration-500">
          Experience our Free Demo Therapy
        </h1>

        {/* Narrative Description / Subtitle */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-emerald-100/90 max-w-3xl mx-auto leading-relaxed font-normal drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          Established in South Korea in 1991 under our timeless corporate motto <strong className="text-white font-semibold">“Love, Service, and Kindness”</strong>, <strong className="text-white font-semibold">Dooroomi (두루미)</strong> is a certified organization dedicated to public wellness. We open our authorized therapy centers every day to provide <strong className="text-amber-300 font-bold">100% Free Therapy</strong> with zero fees, zero obligation, and zero financial burden.
        </p>

        {/* Centered Action Buttons (CTAs) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500 delay-150">
          <button
            onClick={handleScrollToFreeTherapy}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#c8102e] via-red-700 to-[#b00d27] hover:from-red-600 hover:to-red-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-red-950/50 transform hover:-translate-y-0.5 active:scale-98 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <HeartHandshake className="w-5 h-5 text-amber-300" />
            <span>Experience Free Therapy Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreProducts}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-sm sm:text-base shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Explore Equipment</span>
          </button>

          <button
            onClick={handleScrollToContact}
            className="px-5 py-3.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 font-semibold text-sm sm:text-base border border-amber-400/40 backdrop-blur-md transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Helpline: {SITE_CONFIG.phone}</span>
          </button>
        </div>

      </div>
    </section>
  );
};

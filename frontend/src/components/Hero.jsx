import React from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  MapPin, 
  PhoneCall, 
  Activity, 
  Flame, 
  CheckCircle2,
  Users
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
    <section className="relative bg-gradient-to-b from-[#fcfdfd] via-[#f7faf8] to-[#edf4f0] text-slate-900 py-16 sm:py-20 lg:py-28 overflow-hidden border-b border-emerald-900/10">
      {/* Ambient background glows & subtle grid pattern (100% CSS, No Images) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[350px] bg-gradient-to-b from-emerald-100/60 via-amber-100/40 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Container */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center text-center">
        
        {/* Eyebrow Badge - Centered */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-800/20 shadow-xs mb-6 backdrop-blur-sm animate-in fade-in duration-500">
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

        {/* 4 Pillars of Dooroomi Free Therapy - Centered Grid (No Images, Pure Visual Cards) */}
        <div className="mt-12 sm:mt-14 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-white/90 border border-emerald-800/15 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-[#c8102e] mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">100% Free Daily Care</h3>
            <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 leading-normal">
              Zero registration fees, zero treatment charges, and no obligation to buy. Come every day with your entire family.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-white/90 border border-emerald-800/15 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Spinal Traction & FIR</h3>
            <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 leading-normal">
              Heated natural Korean jade rollers, vertebra decompression, far-infrared thermotherapy, and acupressure.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-white/90 border border-emerald-800/15 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-3">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Chronic Pain Recovery</h3>
            <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 leading-normal">
              Clinically trusted for slip disc, cervical spondylosis, sciatica, arthritis, knee pain, and post-stroke rehabilitation.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-2xl bg-white/90 border border-emerald-800/15 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">15+ Centers in India</h3>
            <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 leading-normal">
              Serving thousands of daily visitors across Odisha, Delhi NCR, and nationwide with compassionate staff.
            </p>
          </div>

        </div>

        {/* Centered Key Stats Bar */}
        <div className="mt-10 pt-8 border-t border-slate-300/70 w-full flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#c8102e] font-serif">100%</span>
            <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider mt-0.5">Free Daily Therapy</span>
          </div>

          <div className="h-8 w-px bg-slate-300 hidden sm:block" />

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">15+</span>
            <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider mt-0.5">Therapy Centers in India</span>
          </div>

          <div className="h-8 w-px bg-slate-300 hidden sm:block" />

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-serif">500,000+</span>
            <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider mt-0.5">Relieved Patients</span>
          </div>

          <div className="h-8 w-px bg-slate-300 hidden sm:block" />

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-serif">1991</span>
            <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider mt-0.5">Est. in South Korea</span>
          </div>
        </div>

        {/* Centered Quality & Accreditation Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-700 font-medium">
          <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ISO 13485 & CGMP Certified</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Korea Medical Device Manufacturing Standard</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-[#c8102e]" />
            <span>Zero Treatment Fees · Open to All</span>
          </span>
        </div>

      </div>
    </section>
  );
};

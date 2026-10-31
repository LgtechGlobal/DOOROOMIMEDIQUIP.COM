import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Quote, 
  CheckCircle2, 
  ArrowRight, 
  HeartHandshake,
  Calendar,
  Check
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const CeoSection = ({ onNavigateAbout, onContactClick }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const ceo = SITE_CONFIG.ceo;

  const ceoPhotos = [
    {
      id: "portrait",
      src: ceo.photos.portrait,
      label: "Official Portrait",
      subtitle: "Executive Leadership",
      caption: `${ceo.name} — Chief Executive Officer guiding Korean medical wellness innovation with scientific rigor.`
    },
    {
      id: "leadership",
      src: ceo.photos.leadership,
      label: "Leadership & Care",
      subtitle: "Dedicated to Patient Vitality",
      caption: `Pledging authentic Korean therapeutic technology and community wellness for families worldwide.`
    }
  ];

  const leadershipHighlights = [
    {
      year: "1991",
      title: "Founding Philosophy",
      desc: "Pioneered clinical thermal therapy and natural Korean bio-formulations with zero compromise on raw purity."
    },
    {
      year: "36+",
      title: "Global Export Reach",
      desc: "Guided international expansion across Asia, Europe, and the Americas under strict ISO 22716 & CGMP standards."
    },
    {
      year: "100%",
      title: "Community Mission",
      desc: "Established free community therapy centers in India and globally, empowering thousands with daily spinal and joint care."
    }
  ];

  return (
    <section 
      id="ceo-vision" 
      className="py-20 lg:py-28 text-slate-900 relative overflow-hidden select-none bg-[#8dc6e0]"
      style={{ backgroundColor: '#8dc6e0' }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-white/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10">
        
        {/* Section Top Header Pill */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a2342] text-white text-xs font-semibold shadow-lg mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-mono text-amber-300 font-bold">대표이사 리더십 & 철학</span>
            <span className="text-white/40">|</span>
            <span className="tracking-wider uppercase text-[11px] text-white">CEO Leadership & Vision</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07192f] tracking-tight font-serif leading-tight">
            Pioneering Health, Rooted in Authentic Care.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-800 font-medium leading-relaxed max-w-2xl mx-auto">
            Meet <b>{ceo.name}</b>, Chief Executive Officer and global technology partner of Dooroomi Mediquip, pioneering wellness systems across Korea and worldwide.
          </p>
        </div>

        {/* Main Content Grid: Interactive Showcase + Executive Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Photo & Business Card Presentation */}
          <div className="lg:col-span-5 relative max-w-sm sm:max-w-md mx-auto w-full">
            
            {/* 3D Backdrop Glow Card Layer */}
            <div className="absolute -inset-3 rounded-3xl bg-white/40 blur-xl opacity-70 pointer-events-none" />

            {/* Main Active Photo Container */}
            <div className="relative rounded-3xl overflow-hidden bg-hanbit-dark border-2 border-[#0a2342]/40 shadow-2xl group max-h-[460px]">
              
              {/* Image Frame with Smooth Crossfade Animation */}
              <div className="relative aspect-[4/5] max-h-[460px] w-full overflow-hidden bg-neutral-900 flex items-center justify-center">
                <img
                  key={ceoPhotos[activeImageIndex].id}
                  src={ceoPhotos[activeImageIndex].src}
                  alt={ceoPhotos[activeImageIndex].label}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 animate-in fade-in zoom-in-95"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Top Corner Official Stamp */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-hanbit-gold/40 text-[11px] font-bold text-amber-200 shadow-md">
                  <Award className="w-3.5 h-3.5 text-hanbit-gold" />
                  <span>{ceo.name} · {ceo.title}</span>
                </div>

                {/* Floating Image Mode Switcher Pill */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 p-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 shadow-md">
                  {ceoPhotos.map((photo, idx) => (
                    <button
                      key={photo.id}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all duration-200 cursor-pointer ${
                        activeImageIndex === idx
                          ? 'bg-gradient-to-r from-hanbit-gold to-amber-400 text-hanbit-dark font-bold shadow-xs'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {idx === 0 ? 'Portrait' : 'Leadership'}
                    </button>
                  ))}
                </div>

                {/* In-Image Caption at Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-20 space-y-1.5 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-hanbit-gold/20 border border-hanbit-gold/40 text-[10px] font-mono font-bold text-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{ceoPhotos[activeImageIndex].subtitle}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-wide leading-tight">
                    {ceo.name}
                  </h3>
                  <p className="text-xs text-white/90 font-light leading-relaxed">
                    {ceoPhotos[activeImageIndex].caption}
                  </p>
                </div>
              </div>

              {/* Bottom Thumbnail Strip for Instant 1-Click Swap */}
              <div className="p-3.5 bg-hanbit-dark/95 border-t border-white/20 flex items-center justify-between gap-3">
                <span className="text-[11px] text-emerald-200/70 font-light hidden sm:inline">
                  Select view:
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {ceoPhotos.map((photo, idx) => (
                    <button
                      key={photo.id}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative h-13 px-2 rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex items-center gap-2 bg-black/40 ${
                        activeImageIndex === idx
                          ? 'border-hanbit-gold scale-105 shadow-md shadow-hanbit-gold/30 bg-hanbit-gold/10'
                          : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                      }`}
                      title={photo.label}
                    >
                      <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-neutral-800">
                        <img
                          src={photo.src}
                          alt={photo.label}
                          loading="lazy"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="text-left pr-1 hidden sm:block">
                        <span className="text-[11px] font-bold text-white block leading-tight">
                          {photo.label}
                        </span>
                        <span className="text-[9px] text-emerald-300/80 block">
                          View details
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Floating Trust Badge Seal */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 z-30 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-white backdrop-blur-xl border border-sky-300 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-[#0a2342]/10 flex items-center justify-center text-[#0a2342] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-sky-800 font-bold uppercase tracking-wider block">
                  Korea CGMP & ISO Verified
                </span>
                <span className="text-xs font-bold text-slate-900 block">
                  28+ Years Continuous Governance
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Executive Profile, Direct Contact, Quote & Milestones */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Real CEO Name, Title & Company Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a2342] text-white text-xs font-semibold mb-3 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Executive Leadership</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#07192f] font-serif tracking-tight">
                {ceo.name}
              </h3>

              <p className="text-sm sm:text-base text-slate-800 font-bold mt-1">
                {ceo.title} · {ceo.company}
              </p>

              <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
                {ceo.partnership}
              </p>
            </div>

            {/* CEO Quote Callout Box */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-white/95 border border-white shadow-xl space-y-3">
              <Quote className="w-8 h-8 text-[#0a2342]/40 -mb-2" />
              <blockquote className="text-sm sm:text-base lg:text-lg text-slate-800 font-serif italic leading-relaxed">
                "Our founding mission has never wavered: to unite authentic natural science with precision medical engineering. Every thermal recovery bed, jade moxibustion roller, and bio-formulation is crafted with genuine compassion for human health."
              </blockquote>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-serif">
                    {ceo.name}
                  </h4>
                  <p className="text-[11px] text-sky-900 font-mono font-semibold">
                    {ceo.company} · Republic of Korea
                  </p>
                </div>
                {/* Official Korean Red Seal Stamp */}
                <div className="px-3 py-1 rounded-md border-2 border-rose-500/80 bg-rose-50 text-rose-700 font-serif text-[11px] font-bold tracking-widest text-center shadow-inner">
                  성 매튜 代表
                </div>
              </div>
            </div>

            {/* 3 Executive Milestones Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {leadershipHighlights.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-white/95 border border-white hover:border-[#0a2342]/40 transition-all space-y-1.5 hover:-translate-y-1 shadow-sm"
                >
                  <span className="text-base font-mono font-black text-[#0a2342] block">
                    {item.year}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900 font-serif">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onNavigateAbout}
                className="px-6 py-3 rounded-full bg-[#0a2342] text-white font-bold text-xs hover:bg-[#153a6b] shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={onContactClick}
                className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm hover:border-[#0a2342]"
              >
                <span>Connect with Executive Office</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

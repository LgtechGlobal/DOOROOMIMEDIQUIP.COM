import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Quote, 
  CheckCircle2, 
  Globe, 
  ArrowRight, 
  HeartHandshake,
  Building2,
  Calendar,
  Check,
  Phone,
  Mail,
  MapPin,
  ExternalLink
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
      year: "1998",
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
      className="py-20 lg:py-28 bg-gradient-to-b from-[#0a1b13] via-hanbit-forest to-[#0d2218] text-white relative overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-hanbit-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#dfbe7e_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10">
        
        {/* Section Top Header Pill */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-hanbit-gold/30 text-xs font-semibold text-amber-200 shadow-lg mb-4">
            <Sparkles className="w-3.5 h-3.5 text-hanbit-gold" />
            <span className="font-mono text-hanbit-gold font-bold">대표이사 리더십 & 철학</span>
            <span className="text-white/30">|</span>
            <span className="tracking-wider uppercase text-[11px]">CEO Leadership & Vision</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif leading-tight">
            Pioneering Health, Rooted in Authentic Care.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-emerald-100/80 font-light leading-relaxed max-w-2xl mx-auto">
            Meet <b>{ceo.name}</b>, Chief Executive Officer of SKS International and global technology partner of Dooroomi Mediquip, pioneering medical wellness systems across Korea and worldwide.
          </p>
        </div>

        {/* Main Content Grid: Interactive Showcase + Executive Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Photo & Business Card Presentation */}
          <div className="lg:col-span-5 relative">
            
            {/* 3D Backdrop Glow Card Layer */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-hanbit-gold/20 via-transparent to-emerald-400/20 blur-xl opacity-70 pointer-events-none" />

            {/* Main Active Photo Container */}
            <div className="relative rounded-3xl overflow-hidden bg-hanbit-dark border-2 border-hanbit-gold/50 shadow-2xl group">
              
              {/* Image Frame with Smooth Crossfade Animation */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 flex items-center justify-center">
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
                    {ceo.name} <span className="text-sm font-sans font-normal text-amber-200">({ceo.nameKo})</span>
                  </h3>
                  <p className="text-xs text-emerald-100/80 font-light leading-relaxed">
                    {ceoPhotos[activeImageIndex].caption}
                  </p>
                </div>
              </div>

              {/* Bottom Thumbnail Strip for Instant 1-Click Swap */}
              <div className="p-3.5 bg-hanbit-dark/95 border-t border-hanbit-gold/30 flex items-center justify-between gap-3">
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
            <div className="absolute -bottom-6 -left-4 sm:-left-6 z-30 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-hanbit-dark/95 backdrop-blur-xl border border-hanbit-gold/60 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-hanbit-gold/20 flex items-center justify-center text-hanbit-gold shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-hanbit-gold font-bold uppercase tracking-wider block">
                  Korea CGMP & ISO Verified
                </span>
                <span className="text-xs font-bold text-white block">
                  28+ Years Continuous Governance
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Executive Profile, Direct Contact, Quote & Milestones */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Real CEO Name, Title & Company Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-semibold mb-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Executive Leadership</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
                {ceo.name} <span className="text-xl sm:text-2xl font-light text-hanbit-gold">({ceo.nameKo})</span>
              </h3>

              <p className="text-sm sm:text-base text-amber-200 font-medium mt-1">
                {ceo.title} · {ceo.company}
              </p>

              <p className="text-xs sm:text-sm text-emerald-100/70 font-light mt-0.5">
                {ceo.partnership}
              </p>
            </div>

            {/* CEO Quote Callout Box */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl space-y-3">
              <Quote className="w-8 h-8 text-hanbit-gold/60 -mb-2" />
              <blockquote className="text-sm sm:text-base lg:text-lg text-emerald-50 font-serif italic leading-relaxed">
                "Our founding mission has never wavered: to unite authentic natural science with precision medical engineering. Every thermal recovery bed, jade moxibustion roller, and bio-formulation is crafted with genuine compassion for human health."
              </blockquote>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-serif">
                    {ceo.name}
                  </h4>
                  <p className="text-[11px] text-amber-200/90 font-mono">
                    {ceo.company} · Republic of Korea
                  </p>
                </div>
                {/* Official Korean Red Seal Stamp */}
                <div className="px-3 py-1 rounded-md border-2 border-rose-500/80 bg-rose-950/40 text-rose-300 font-serif text-[11px] font-bold tracking-widest text-center shadow-inner">
                  성 매튜 代表
                </div>
              </div>
            </div>

            {/* Real Executive Contact & Office Details from Business Card */}
            <div className="p-5 rounded-2xl bg-black/40 border border-hanbit-gold/30 space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-200 block">
                Official Executive Contact & Korea Headquarters
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Direct Mobile */}
                <a 
                  href={`tel:${ceo.mobile.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white group cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-hanbit-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Mobile (Korea)</span>
                    <span className="font-mono font-semibold text-emerald-200">{ceo.mobile}</span>
                  </div>
                </a>

                {/* Direct Email */}
                <a 
                  href={`mailto:${ceo.email}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white group cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-hanbit-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Direct Email</span>
                    <span className="font-mono font-semibold text-emerald-200">{ceo.email}</span>
                  </div>
                </a>

                {/* Official Website */}
                <a 
                  href={`https://${ceo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white group cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-hanbit-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Global Website</span>
                    <span className="font-mono font-semibold text-emerald-200 flex items-center gap-1">
                      {ceo.website}
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </span>
                  </div>
                </a>

                {/* SKS International Company Details Shortcut */}
                <a 
                  href={`https://${ceo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white group cursor-pointer text-left"
                >
                  <Building2 className="w-4 h-4 text-hanbit-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] text-neutral-400 block">SKS International</span>
                    <span className="font-semibold text-amber-200 flex items-center gap-1">
                      SKS International Co., Ltd.
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </span>
                  </div>
                </a>
              </div>

              {/* Korea HQ Address */}
              <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-xs text-emerald-100/80">
                <MapPin className="w-4 h-4 text-hanbit-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <b className="text-white">Head Office:</b> {ceo.address}
                </span>
              </div>
            </div>

            {/* 3 Executive Milestones Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {leadershipHighlights.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-hanbit-gold/40 transition-all space-y-1.5 hover:-translate-y-1"
                >
                  <span className="text-base font-mono font-bold text-hanbit-gold block">
                    {item.year}
                  </span>
                  <h5 className="text-xs font-bold text-white font-serif">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-emerald-100/70 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onNavigateAbout}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-hanbit-gold to-amber-500 text-hanbit-dark font-bold text-xs hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-hanbit-gold/25 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContactClick}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-medium text-xs transition-all inline-flex items-center gap-2 cursor-pointer hover:border-hanbit-gold"
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

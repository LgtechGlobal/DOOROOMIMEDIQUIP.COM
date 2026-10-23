import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Building2, 
  FlaskConical, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  MapPin 
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const AboutSection = ({ onContactClick }) => {
  const pillars = [
    {
      icon: FlaskConical,
      title: "Seoul R&D Bio-Venture Valley",
      desc: "Our primary laboratory in Gangnam, Seoul specializes in proprietary botanical fermentation, active ginsenoside extraction, and liposomal peptide synthesis."
    },
    {
      icon: ShieldCheck,
      title: "Incheon CGMP Cleanroom Plant",
      desc: "Automated Class 10,000 & 100 aseptic filling cleanrooms in the Songdo Bio-Cluster, certified under ISO 22716 and Korean CGMP standards."
    },
    {
      icon: Layers,
      title: "Medical Equipment & Device Systems",
      desc: "Engineering advanced therapeutic thermal therapy beds, airless vacuum dispensers, and precision trans-dermal active delivery technology."
    },
    {
      icon: Globe2,
      title: "Global Export to 36 Nations",
      desc: "Over 28 years of trusted OEM/ODM partnerships supplying premier hospitals, dermatology clinics, and prestige brands across Asia, the Americas, and Europe."
    }
  ];

  const milestones = [
    { year: "1998", text: "Founded in Seoul as a pioneer in Korean cellular bio-cosmetics and medical equipment." },
    { year: "2010", text: "Established Songdo Bio-Cluster automated cleanroom plant; achieved ISO 22716 & CGMP certifications." },
    { year: "2018", text: "Launched Bedro Smart therapeutic medical bed series with integrated infrared thermal acupressure." },
    { year: "2026", text: "Expanded global clinical exports to 36 nations with 45+ proprietary patented bio-active formulations." }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#fbfbfa] border-t border-hanbit-border relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-hanbit-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-hanbit-gold/30 text-xs font-semibold text-hanbit-forest shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-hanbit-gold animate-pulse" />
            <span className="font-mono text-hanbit-gold font-bold">두루미 기업 소개</span>
            <span className="text-hanbit-border">|</span>
            <span className="tracking-wider uppercase text-[11px]">About Dooroomi Co., Ltd.</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight font-serif">
            A Pioneer in Korean Medical Equipment & Precision Bio-Cosmetics.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-hanbit-muted font-light leading-relaxed">
            Founded in 1998, <b>Dooroomi (두루미)</b> has spent nearly three decades advancing clinical health engineering, certified cleanroom manufacturing, and bioactive Korean skincare.
          </p>
        </div>

        {/* Top 2-Column Split: Visual & Corporate Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-hanbit-border p-6 sm:p-8 shadow-xl">
              
              {/* Main Facility & Device Stage */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-emerald-950 via-hanbit-forest to-hanbit-dark flex items-center justify-center p-6">
                <img
                  src="/assets/products/bedro-smart-1-traction-bed.png" onError={(e) => { e.target.onerror = null; e.target.src = "/assets/products/bedro-smart-1-traction-bed.png"; }}
                  alt="Dooroomi Medical Equipment and Bio-Formulation Facility"
                  className="max-h-[85%] w-auto object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <Building2 className="w-3.5 h-3.5 text-hanbit-gold" />
                  <span>Gangnam R&D · Songdo Cleanroom</span>
                </div>
              </div>

              {/* Floating Stat Overlay Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-hanbit-ivory border border-hanbit-border/70">
                  <span className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif block">
                    28<span className="text-hanbit-gold font-sans">+</span>
                  </span>
                  <span className="text-xs text-hanbit-muted font-medium mt-1 block">
                    Years of Bio-Formulation & Mediquip Excellence
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-hanbit-ivory border border-hanbit-border/70">
                  <span className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif block">
                    36<span className="text-hanbit-gold font-sans">+</span>
                  </span>
                  <span className="text-xs text-hanbit-muted font-medium mt-1 block">
                    Nations with Active Global Export Partnerships
                  </span>
                </div>
              </div>

              {/* Corporate Registered Addresses */}
              <div className="mt-5 p-4 rounded-2xl bg-white border border-hanbit-border text-xs text-hanbit-muted space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-hanbit-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-hanbit-forest block">Seoul R&D Center:</span>
                    <span>{SITE_CONFIG.addressEn}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-hanbit-border/50">
                  <Building2 className="w-4 h-4 text-hanbit-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-hanbit-forest block">Aseptic Cleanroom Plant:</span>
                    <span>{SITE_CONFIG.plantAddress}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Narrative & Corporate Philosophy Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-hanbit-border shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-hanbit-forest font-serif">
                Bridging Traditional Korean Fermentation with Clinical Nanotechnology
              </h3>
              
              <p className="text-sm text-hanbit-ink/80 leading-relaxed font-light">
                Dooroomi Co., Ltd. operates with a singular focus: delivering verifiable clinical outcomes through zero-compromise manufacturing integrity. We engineer products from raw botanical molecular synthesis through to automated cleanroom filling.
              </p>

              <p className="text-sm text-hanbit-ink/80 leading-relaxed font-light">
                Our facilities maintain stringent micro-filtered air quality (Class 100/10,000), automated vacuum emulsification, and nitrogen-headspace sealing to ensure maximum bio-active potency throughout global transit.
              </p>
            </div>

            {/* Quick Milestones Timeline */}
            <div className="p-6 rounded-3xl bg-white border border-hanbit-border shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-hanbit-forest mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-hanbit-gold" />
                <span>Historical Milestones</span>
              </h4>

              <div className="space-y-4 border-l-2 border-hanbit-gold/40 pl-4 ml-1">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative space-y-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-hanbit-gold absolute -left-[21px] top-1.5 ring-4 ring-white" />
                    <span className="text-xs font-mono font-bold text-hanbit-gold">{m.year}</span>
                    <p className="text-xs text-hanbit-forest font-medium">{m.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onContactClick}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-hanbit-forest to-hanbit-dark hover:from-hanbit-dark hover:to-emerald-950 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Connect with Our Leadership & R&D Team</span>
                <ArrowRight className="w-4 h-4 text-hanbit-gold" />
              </button>
            </div>

          </div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold/60 shadow-sm hover:shadow-xl transition-all space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-hanbit-ivory border border-hanbit-border/60 group-hover:bg-hanbit-forest group-hover:text-white text-hanbit-forest flex items-center justify-center transition-colors">
                  <Icon className="w-6 h-6 text-hanbit-gold" />
                </div>

                <h4 className="text-base font-bold text-hanbit-forest font-serif leading-snug">
                  {pillar.title}
                </h4>

                <p className="text-xs text-hanbit-muted leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

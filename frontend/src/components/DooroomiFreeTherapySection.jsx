import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  PhoneCall, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Flame, 
  Zap, 
  Users,
  Compass,
  MessageCircle,
  Award,
  ChevronRight,
  Tag
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const DooroomiFreeTherapySection = ({ onContactClick, onNavigateTherapy, onNavigateAbout }) => {
  const [activeTab, setActiveTab] = useState('bedro');

  const therapyModes = [
    {
      id: 'bedro',
      productId: 'p-bedro-smart-1',
      title: 'BEDRO Smart-1 Thermal Spine Traction Bed',
      shortTitle: 'BEDRO Smart-1 Spine Traction',
      korean: '베드로 스마트-1 척추 온열 견인',
      badge: 'Flagship Traction',
      model: 'BEDRO SMART-1 (BST-01)',
      image: '/assets/products/bedro-smart-1-traction-bed.png',
      summary: 'Automatic thermal spinal decompression utilizing pure natural jade internal rollers heated between 40°C–70°C, delivering spinal traction, moxibustion, and autonomic acupressure.',
      benefits: [
        'Relieves herniated disc, sciatica, spondylosis & root nerve compression',
        'Restores natural cervical, thoracic and lumbar lordotic curvature',
        'Stimulates autonomic nervous system via spinal cord reflex points',
        'Deep Far-Infrared jade thermal core melts chronic muscle rigidity'
      ],
      timing: '40 Minutes Daily Session'
    },
    {
      id: 'taeyangsuk',
      productId: 'p-taeyangsuk-plus',
      title: 'TAEYANGSUK PLUS Far-Infrared Bio-Mat',
      shortTitle: 'TAEYANGSUK PLUS Bio-Mat',
      korean: '태양석 플러스 원적외선 온열 매트',
      badge: 'Bio-Mineral Therapy',
      model: 'TAEYANGSUK PLUS (DM-TSKP)',
      image: '/assets/products/taeyangsuk-plus-mat.png',
      summary: 'Full-length Korean medical thermal mat hand-crafted with thousands of sintered hexagonal tourmaline, elvan and jade mineral discs emitting negative ions (>1,200 ions/cc) and deep far-infrared heat.',
      benefits: [
        'Thousands of hexagonal sintered tourmaline & nephrite jade tiles',
        'Negative ion emission (>1,200 ions/cm³) enhances cellular vitality',
        'Deep far-infrared thermotherapy (30°C–70°C) cleanses vascular blockages',
        'Multi-layer EMF shielding matrix with bone marrow stimulation'
      ],
      timing: '45 Minutes Daily Session'
    },
    {
      id: 'taeyangsuk-mini',
      productId: 'p-taeyangsuk-mini',
      title: 'DOOROOMI Taeyangsuk Mini Bio-Mat',
      shortTitle: 'DOOROOMI Taeyangsuk Mini',
      korean: '두루미 태양석 미니 온열 매트',
      badge: 'Portable Bio-Mat',
      model: 'TAEYANGSUK MINI (DM-TSKM)',
      image: '/assets/products/taeyangsuk-mini-mat.png',
      summary: 'Authentic Made in Korea compact thermal mat featuring high-density hexagonal jade and tourmaline bio-ceramic mineral discs with embossed leather badge, designed for chairs, sofas, and targeted therapy.',
      benefits: [
        'Authentic Made-in-Korea Korean bio-ceramic rare-earth minerals',
        'Targeted thermal moxibustion for lumbar, abdomen, hips & joints',
        'High-density hexagonal nephrite jade & tourmaline array',
        'Compact portable ergonomic design for chairs, beds & treatment sofas'
      ],
      timing: '30 Minutes Daily Session'
    },
    {
      id: 'bedro-controller',
      productId: 'p-bedro-controller',
      title: 'BEDRO Smart Digital Therapeutic Controller',
      shortTitle: 'BEDRO Smart Controller',
      korean: '베드로 스마트 디지털 치료 리모컨',
      badge: 'Smart Controller',
      model: 'BEDRO SMART-RC (DM-SRC500)',
      image: '/assets/products/bedro-digital-controller.png',
      summary: 'Intelligent medical frequency controller featuring 500Hz bio-frequency pulse wave generation, high-contrast backlit LED diagnostic display, 30:00 precision countdown timer, and automatic safety cutoffs.',
      benefits: [
        'Up to 500 Hz bio-frequency pulse wave therapeutic generation',
        'High-contrast digital LED diagnostic display & countdown timer',
        'One-touch therapy mode cycling & micro-temperature adjustment',
        'Triple safety thermal protection & automated auto-shutoff'
      ],
      timing: 'Continuous Micro-Adjustment'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Walk-In With Family',
      desc: 'No appointment or registration fee needed. Simply walk into your nearest Dooroomi center.'
    },
    {
      step: '02',
      title: 'Health Evaluation',
      desc: 'Our trained therapists assess your spine, joint pain, BP, and personalized therapy needs.'
    },
    {
      step: '03',
      title: 'Experience Medical Beds',
      desc: 'Enjoy 40–45 minutes of warm far-infrared spinal traction on BEDRO Smart-1 & Taeyangsuk.'
    },
    {
      step: '04',
      title: 'Return Every Single Day',
      desc: 'Come daily for weeks or months. Experience persistent, natural healing with 100% zero charges.'
    }
  ];

  const activeMode = therapyModes.find(m => m.id === activeTab) || therapyModes[0];

  return (
    <section 
      id="dooroomi-free-therapy" 
      className="py-20 lg:py-28 bg-gradient-to-b from-[#081b15] via-[#0b241c] to-[#071611] text-white relative overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#dfbe7e_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10">
        
        {/* Section Top Header Pill */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/30 text-xs font-semibold text-amber-200 shadow-lg mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-amber-300 font-bold">대한민국 두루미 무료 체험관</span>
            <span className="text-white/30">|</span>
            <span className="tracking-wider uppercase text-[11px]">100% Free Daily Therapy Initiative</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif leading-tight">
            Healing Through Giving. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300">
              Dooroomi Free Daily Therapy.
            </span>
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-emerald-100/80 font-light leading-relaxed max-w-2xl mx-auto">
            Founded under the timeless philosophy of <strong>“Love, Service, and Kindness”</strong>, we believe true healing should be experienced firsthand. Visit any of our 15+ therapy centers across India for daily complimentary sessions.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-14 lg:mb-20">
          {steps.map((st, sIdx) => (
            <div 
              key={sIdx}
              className="p-5 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="font-mono text-2xl font-black text-amber-400/80 group-hover:text-amber-300 transition-colors">
                  {st.step}
                </span>
                <h4 className="text-base font-bold text-white mt-2 group-hover:text-amber-200 transition-colors">
                  {st.title}
                </h4>
                <p className="text-xs text-emerald-100/70 font-light mt-1.5 leading-relaxed">
                  {st.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[11px] text-amber-300/80 font-mono">
                <span>Free Service</span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-amber-400/60 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid: Interactive Equipment Tabs + Detailed Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14">
          
          {/* Left Column: Equipment Mode Selectors & Narrative */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
              Certified Korean Equipment Provided Free Daily
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight leading-snug">
              World-Class Spinal Traction &amp; Bio-Mineral Therapy.
            </h3>
            <p className="text-sm text-emerald-100/80 font-light leading-relaxed">
              Every Dooroomi therapy center is equipped with authorized Class II medical devices imported directly from South Korea, engineered under ISO 13485 and Korean CGMP standards.
            </p>

            {/* 4 Product Selector Buttons */}
            <div className="space-y-3 pt-2">
              {therapyModes.map((mode) => {
                const isSel = mode.id === activeTab;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setActiveTab(mode.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border flex items-center justify-between cursor-pointer ${
                      isSel 
                        ? 'bg-gradient-to-r from-amber-500/20 via-emerald-950 to-white/10 border-amber-400 text-white shadow-lg' 
                        : 'bg-white/5 border-white/10 text-emerald-100/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-300">
                          {mode.badge}
                        </span>
                        <span className="text-[11px] text-white/40">|</span>
                        <span className="text-xs text-emerald-200/60 font-mono">
                          {mode.korean}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">
                        {mode.shortTitle || mode.title}
                      </h4>
                      {mode.model && (
                        <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                          {mode.model}
                        </p>
                      )}
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSel ? 'text-amber-400 translate-x-1' : 'text-white/30'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Showcase of Selected Therapy Equipment */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 via-emerald-950/70 to-black/80 border border-amber-400/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-[11px] font-mono font-bold text-amber-200">
                      {activeMode.timing}
                    </span>
                    {activeMode.model && (
                      <span className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono text-emerald-200">
                        {activeMode.model}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                    {activeMode.title}
                  </h3>
                  <p className="text-xs text-amber-300/80 font-serif mt-0.5">
                    {activeMode.korean}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 shrink-0">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Korea CGMP &amp; ISO 13485</span>
                </div>
              </div>

              {/* Product Visual Image Frame with clean translucent backing so PNG stands out */}
              <div className="relative my-6 aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-stone-900/60 to-black/80 border border-white/10 flex items-center justify-center p-6">
                <img 
                  key={activeMode.id}
                  src={activeMode.image} 
                  alt={activeMode.title}
                  className="max-h-[280px] sm:max-h-[320px] w-auto max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/products/bedro-smart-1-traction-bed.png';
                  }}
                />
              </div>

              {/* Summary & Benefits List */}
              <div className="space-y-4">
                <p className="text-sm text-emerald-100/90 font-light leading-relaxed">
                  {activeMode.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {activeMode.benefits.map((bnf, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-emerald-100/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{bnf}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action row */}
              <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`#/products/${activeMode.productId}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-200 transition"
                >
                  <span>View Complete Clinical Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {onContactClick && (
                  <button
                    onClick={onContactClick}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition shadow-sm cursor-pointer"
                  >
                    Experience at Free Center
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Action Strip: Direct Center Access & WhatsApp */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-900/40 via-[#b8142a]/30 to-amber-900/40 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Pan-India Free Therapy Network</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Visit Today — 100% Free Sessions For All Ages.
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100/70 font-light">
              Experience BEDRO Smart-1 and Taeyangsuk therapy firsthand. Center Hours: Mon–Sat 8:00 AM – 5:00 PM IST.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {onNavigateTherapy && (
              <button
                onClick={onNavigateTherapy}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-stone-950 text-xs font-bold transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Full Therapy Science</span>
              </button>
            )}

            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all inline-flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: {SITE_CONFIG.tollFree}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

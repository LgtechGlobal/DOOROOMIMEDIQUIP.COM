import React from 'react';
import { 
  HeartPulse, 
  Layers, 
  Droplets, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Building2,
  Globe2
} from 'lucide-react';

export const DooroomiGroupsSection = ({ onContactClick, onNavigateAbout, onNavigateGallery }) => {
  const groups = [
    {
      id: "medical",
      icon: HeartPulse,
      korean: "두루미 메디칼 · 첨단 의료기기",
      title: "Dooroomi Medical",
      badge: "Hospital & Clinic Grade",
      desc: "Internationally certified medical systems combining ancient Korean moxibustion and jade stone therapy with cutting-edge chiropractic traction and pain-blocking neuro-stimulation (BEDRO Smart-1, Taeyangsuk Bio-Mineral Mat, and BioWave). Certified under US FDA, CE Medical, and Korea MFDS Class II standards across 51+ countries."
    },
    {
      id: "textile",
      icon: Layers,
      korean: "두루미 텍스타일 · 기능성 바이오 섬유",
      title: "Dooroomi Textile",
      badge: "Far-Infrared Smart Fiber",
      desc: "Proprietary functional bio-ceramic textiles and therapeutic compression garments infused with micro-pulverized natural minerals and negative ions. Radiates continuous far-infrared resonance deep into capillaries to enhance microcirculation, correct musculoskeletal posture, and sustain cellular thermal balance."
    },
    {
      id: "hydrogen-water",
      icon: Droplets,
      korean: "두루미 수소수 · 항산화 바이오 워터",
      title: "Dooroomi Hydrogen Water",
      badge: "Cellular Anti-Oxidation",
      desc: "High-density molecular hydrogen (H₂) generation technology producing ultra-pure, antioxidant-rich cellular drinking water with high dissolved hydrogen concentration. Neutralizes malignant reactive oxygen species (free radicals), accelerates cellular hydration, and supports deep metabolic detoxification."
    },
    {
      id: "body-care",
      icon: Sparkles,
      korean: "두루미 바디케어 · 메디컬 코스메틱 & 웰니스",
      title: "Dooroomi Body Care",
      badge: "ISO 22716 & CGMP Certified",
      desc: "Advanced clinical-grade bio-cosmetics, trans-dermal natural active emulsions, and therapeutic personal wellness formulations manufactured in Class 1,000 automated CGMP cleanrooms. Engineered with fermented Korean botanicals to strengthen the epidermal barrier and restore whole-body cellular vitality."
    }
  ];

  return (
    <section id="dooroomi-groups" className="py-16 sm:py-24 bg-[#fbfbfa] border-b border-hanbit-border relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-hanbit-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-hanbit-forest/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-hanbit-gold/30 text-xs font-semibold text-hanbit-forest shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-hanbit-gold animate-pulse" />
            <span className="font-mono text-hanbit-gold font-bold">두루미 그룹 사업 영역</span>
            <span className="text-hanbit-border">|</span>
            <span className="tracking-wider uppercase text-[11px]">Global Healthcare Enterprise</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight font-serif leading-tight">
            Dooroomi Groups
          </h2>

          <p className="mt-3 text-sm sm:text-base text-hanbit-muted font-light leading-relaxed max-w-2xl mx-auto">
            Pioneering integrated human health through our four specialized global divisions across advanced medical engineering, smart therapeutic textiles, molecular hydrogen science, and holistic body care.
          </p>
        </div>

        {/* 4 Dooroomi Groups Cards in a Single Row (Exact Design Matching Reference Image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.id}
                className="p-8 rounded-3xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Top Icon Badge & Mini Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-hanbit-ivory border border-hanbit-border/60 group-hover:bg-hanbit-forest group-hover:border-hanbit-forest text-hanbit-forest flex items-center justify-center transition-colors shadow-2xs">
                      <Icon className="w-6 h-6 text-hanbit-gold transition-transform group-hover:scale-110" />
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-hanbit-ivory border border-hanbit-border/60 text-[10px] font-mono font-bold text-hanbit-muted group-hover:text-hanbit-forest group-hover:border-hanbit-gold/50 transition-colors">
                      {group.badge}
                    </span>
                  </div>

                  {/* Titles */}
                  <div>
                    <span className="text-[11px] font-mono font-bold text-hanbit-gold tracking-wider block">
                      {group.korean}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-hanbit-forest font-serif leading-snug mt-1 group-hover:text-hanbit-gold transition-colors">
                      {group.title}
                    </h3>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-xs sm:text-[13px] text-hanbit-muted leading-relaxed font-light">
                    {group.desc}
                  </p>
                </div>

                {/* Bottom Verified Badge */}
                <div className="pt-4 border-t border-hanbit-border/50 flex items-center justify-between text-[11px] font-medium text-hanbit-forest">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Global Standard Verified</span>
                  </span>

                  <span className="text-[10px] font-mono text-hanbit-muted group-hover:text-hanbit-gold transition-colors">
                    Since 1991
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Quick Navigation Links */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-hanbit-forest via-emerald-950 to-hanbit-dark text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold font-serif">
              Connecting 51+ Nations with Authentic Korean Medical Wellness
            </h4>
            <p className="text-xs text-emerald-100/70 font-light">
              Founded on November 24, 1991 in Seoul, South Korea under the permanent corporate motto: <i>"Love, Service, and Kindness"</i>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onNavigateAbout && (
              <button
                onClick={onNavigateAbout}
                className="px-5 py-2.5 rounded-full border border-hanbit-gold text-white hover:bg-hanbit-gold hover:text-hanbit-dark text-xs font-semibold transition-all cursor-pointer"
              >
                Learn Corporate Story
              </button>
            )}
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="px-5 py-2.5 rounded-full bg-hanbit-gold hover:bg-amber-300 text-hanbit-dark text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <span>Inquire With Divisions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

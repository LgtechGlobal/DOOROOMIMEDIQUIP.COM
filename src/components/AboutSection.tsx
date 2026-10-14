import React from 'react';
import { Sparkles, Building2, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const values = [
    {
      num: "01",
      title: "Scientific Quality Above All",
      desc: "We do not formulate trendy gimmicks. Every botanical fermentation and peptide molecule is evaluated for active shelf-stability and trans-dermal bioavailability."
    },
    {
      num: "02",
      title: "Transparent Batch Chemistry",
      desc: "Complete analytical HPLC graphs, Certificate of Analysis (COA) documents, and Dermatest safety files are provided openly with every single production batch."
    },
    {
      num: "03",
      title: "Decades of Global Partnership",
      desc: "Over 28 years, we have nurtured long-term partnerships with leading prestige skincare brands across Korea, the United States, Europe, and Japan."
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-hanbit-ivory border-t border-hanbit-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Media Column */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden bg-white border border-hanbit-border p-6 shadow-xl">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-950/5 flex items-center justify-center">
                <img
                  src="./assets/img/about.svg"
                  alt="Hanbit Korea R&D Headquarters and Cleanroom Production Facility"
                  className="w-full h-full object-cover filter drop-shadow-md"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-hanbit-border text-xs font-bold text-hanbit-forest shadow-sm">
                  <span>Seoul R&D Center & Incheon Plant</span>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-hanbit-ivory border border-hanbit-border/60 text-xs text-hanbit-muted space-y-1.5">
                <p className="font-bold text-hanbit-forest">
                  Corporate Registration & Bio-Cluster
                </p>
                <p>• {SITE_CONFIG.addressEn}</p>
                <p>• Cleanroom Plant: {SITE_CONFIG.plantAddress}</p>
              </div>
            </div>
          </div>

          {/* Right Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-hanbit-gold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Heritage & Scientific Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight">
              A Korean Bio-Cosmetic Pioneer Built on Exacting Standards.
            </h2>

            <p className="text-base sm:text-lg text-hanbit-muted leading-relaxed font-light">
              Founded in 1998, <b>{SITE_CONFIG.nameEn} ({SITE_CONFIG.nameKo})</b> has spent nearly three decades advancing the art and biochemistry of high-performance Korean skincare manufacturing.
            </p>

            <p className="text-sm text-hanbit-ink/80 leading-relaxed font-light">
              Operating our primary R&D headquarters in Gangnam, Seoul, and automated CGMP cleanroom production facilities in the Incheon Songdo Bio-Cluster, we bridge the gap between traditional Korean botanical fermentation and state-of-the-art liposomal nanotechnology.
            </p>

            <div className="pt-2">
              <button
                onClick={onContactClick}
                className="px-6 py-3 rounded-full bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                Connect with Our Chief Scientific Officer
              </button>
            </div>
          </div>
        </div>

        {/* 3 Core Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-hanbit-border shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-hanbit-sage-light text-hanbit-forest flex items-center justify-center font-bold text-sm">
                {val.num}
              </div>
              <h4 className="text-base font-bold text-hanbit-forest">
                {val.title}
              </h4>
              <p className="text-xs text-hanbit-muted leading-relaxed font-light">
                {val.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

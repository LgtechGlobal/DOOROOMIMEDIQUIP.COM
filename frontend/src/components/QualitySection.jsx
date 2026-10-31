import React from 'react';
import { ShieldCheck, Award, CheckCircle2, Download, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { CERTIFICATES } from '../data/siteData';

export const QualitySection = ({ onViewTesting }) => {
  const pillars = [
    {
      num: "01",
      title: "End-to-End Lot Traceability",
      desc: "Every raw botanical active and finished bottle contains digital barcode genealogy. In the event of audit verification, complete reactor lot records can be produced in under 15 minutes."
    },
    {
      num: "02",
      title: "Strict Cleanroom Bio-Audits",
      desc: "ISO Class 1,000 cleanrooms are subjected to weekly particulate matter particle counts and laminar airflow velocity validation to prevent aerosol bio-burden."
    },
    {
      num: "03",
      title: "Closed-Loop Corrective Action (CAPA)",
      desc: "Any variation beyond ±0.05 pH or 2% active deviation immediately quarantines the fill line for automated root-cause recalibration before lot authorization."
    }
  ];

  return (
    <section id="quality" style={{ backgroundColor: '#75bfb2' }} className="py-20 lg:py-28 bg-[#75bfb2] border-t border-white/20 relative text-slate-900">
      <div id="certificates" className="absolute -top-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 tracking-widest uppercase mb-3 bg-white/90 px-3 py-1 rounded-full border border-white/60">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>Accredited Standards & Approvals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight font-serif drop-shadow-2xs">
            Quality Assurance Certified at Every Node.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-900 font-medium leading-relaxed">
            Dooroomi operates under strict international CGMP and ISO 22716 guidelines. Every claim is supported by third-party laboratory verification and official government accreditation.
          </p>
        </div>

        {/* 4 Certificate Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-amber-700">
                    <Award className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    {cert.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-950 font-serif">
                  {cert.name}
                </h3>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {cert.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{cert.validity}</span>
                </span>
                <a
                  href="./assets/docs/certificates.pdf"
                  className="font-bold text-slate-950 hover:text-amber-700 flex items-center gap-1"
                >
                  <span>PDF Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/20">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="space-y-3 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <span className="text-xs font-mono font-bold text-amber-700">
                PILLAR {pillar.num}
              </span>
              <h4 className="text-base font-bold text-slate-950 font-serif">
                {pillar.title}
              </h4>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

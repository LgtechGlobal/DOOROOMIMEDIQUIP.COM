import React from 'react';
import { ShieldCheck, Award, FileCheck2, CheckCircle2, Download, ArrowRight, Sparkles } from 'lucide-react';
import { CERTIFICATES } from '../data/siteData';

interface QualitySectionProps {
  onViewTesting: () => void;
}

export const QualitySection: React.FC<QualitySectionProps> = ({ onViewTesting }) => {
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
    <section id="quality" className="py-20 lg:py-28 bg-white border-t border-hanbit-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-hanbit-gold tracking-widest uppercase mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Accredited Standards & Approvals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight">
            Quality Assurance Certified at Every Node.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-hanbit-muted font-light leading-relaxed">
            Hanbit Korea operates under strict international CGMP and ISO 22716 guidelines. Every claim is supported by third-party laboratory verification and official government accreditation.
          </p>
        </div>

        {/* 4 Certificate Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-hanbit-ivory border border-hanbit-border/80 hover:border-hanbit-gold shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white border border-hanbit-border flex items-center justify-center text-hanbit-gold shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {cert.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-hanbit-forest leading-snug">
                    {cert.name}
                  </h4>
                  <p className="text-[11px] text-hanbit-muted mt-1">
                    Issuer: <b>{cert.issuer}</b>
                  </p>
                </div>

                <div className="pt-2 text-[11px] text-hanbit-ink/80 space-y-1 border-t border-hanbit-border/40">
                  <p className="line-clamp-2">
                    Scope: {cert.scope}
                  </p>
                  <p className="font-mono text-[10px] text-hanbit-muted">
                    No: {cert.certNumber}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-hanbit-border/60 text-[10px] font-semibold text-hanbit-forest flex items-center justify-between">
                <span>{cert.validity}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>

        {/* 3 Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 sm:p-10 rounded-3xl bg-hanbit-ivory border border-hanbit-border">
          {pillars.map((pil, idx) => (
            <div key={idx} className="space-y-3">
              <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest block">
                PILLAR {pil.num}
              </span>
              <h4 className="text-base font-bold text-hanbit-forest">
                {pil.title}
              </h4>
              <p className="text-xs text-hanbit-muted leading-relaxed font-light">
                {pil.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-hanbit-forest to-hanbit-dark text-white">
          <div>
            <h4 className="text-base font-bold text-white">
              Need Complete Audit Dossiers for Your Brand's Board?
            </h4>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              Download the official ISO 22716 & CGMP Certification Pack including government audit signatures.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="./assets/docs/certificates.pdf"
              download
              className="px-5 py-2.5 rounded-full bg-hanbit-gold text-hanbit-dark text-xs font-bold hover:bg-amber-400 transition-all inline-flex items-center gap-1.5 shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Cert Pack (PDF)</span>
            </a>
            <button
              onClick={onViewTesting}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all inline-flex items-center gap-1.5"
            >
              <span>View 5-Stage Testing Route</span>
              <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { SERVICES, FAQS } from '../data/siteData';

export const ServicesSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First FAQ open by default

  return (
    <section id="services" className="py-20 lg:py-28 bg-white border-t border-hanbit-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-hanbit-gold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey B2B Manufacturing Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight">
            Comprehensive Formulation, Testing & Production Services.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-hanbit-muted font-light leading-relaxed">
            From bespoke active synthesis in our Seoul laboratory to automated aseptic filling at our Incheon plant, we support global beauty brands at every tier.
          </p>
        </div>

        {/* 4 Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {SERVICES.map((svc, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-hanbit-ivory border border-hanbit-border/80 hover:border-hanbit-gold shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="w-10 h-10 rounded-xl bg-white border border-hanbit-border text-hanbit-forest flex items-center justify-center font-bold text-sm shadow-sm">
                  {svc.num}
                </span>

                <div>
                  <h4 className="text-base font-bold text-hanbit-forest leading-snug">
                    {svc.title}
                  </h4>
                  <p className="text-xs text-hanbit-muted mt-2 leading-relaxed font-light">
                    {svc.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-hanbit-border/60 mt-4 flex flex-wrap gap-1.5">
                {svc.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md bg-white border border-hanbit-border/60 text-[10px] text-hanbit-forest font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-hanbit-border">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-hanbit-gold uppercase tracking-widest block">
              B2B Partner Knowledge Base
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-hanbit-border bg-hanbit-ivory/50 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-hanbit-forest hover:text-hanbit-gold transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-hanbit-muted shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-hanbit-gold' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-hanbit-muted leading-relaxed font-light border-t border-hanbit-border/40 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

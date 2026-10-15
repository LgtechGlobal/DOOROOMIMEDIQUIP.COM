import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Home, 
  ChevronRight, 
  ArrowLeft,
  Package,
  Clock,
  Globe2,
  FileText,
  Boxes,
  HelpCircle,
  Truck,
  Check
} from 'lucide-react';
import { SERVICES, FAQS } from '../data/siteData';

export const ServicesPage = ({ onNavigateHome, onNavigateGallery, onContactClick }) => {
  const [openFaq, setOpenFaq] = useState(0);

  const workflow = [
    {
      step: "01",
      title: "Technical Discovery & Briefing",
      time: "Day 1–2",
      desc: "We analyze your target market, benchmark textures, desired bio-active claims, packaging aesthetics, and regulatory targets (US FDA, EU CPNP, or Domestic)."
    },
    {
      step: "02",
      title: "Seoul R&D Sample Prototyping",
      time: "Day 3–7",
      desc: "Our cosmetic chemists formulate two to three bespoke sample iterations with custom sensory viscosity, pH balancing, and active carrier stabilization for your review."
    },
    {
      step: "03",
      title: "Stability Stress & Clinical Assay",
      time: "Day 8–30",
      desc: "Final approved sample undergoes 30-day accelerated climate stress (45°C / 75% RH), centrifuge separation testing, and optional Dermatest® 5-Star patch verification."
    },
    {
      step: "04",
      title: "Regulatory Dossier & Label Review",
      time: "Concurrent",
      desc: "Full ingredient nomenclature (INCI) validation, export Certificate of Free Sale (CFS), MSDS preparation, and MoCRA / CPNP compliance filing."
    },
    {
      step: "05",
      title: "Cleanroom Mass Fill & Finish",
      time: "Production",
      desc: "Automated batch mixing in 500L–2,000L vacuum reactors, Class 1,000 aseptic cleanroom filling, ultrasonic tamper sealing, and continuous inline check-weighing."
    },
    {
      step: "06",
      title: "International Freight Dispatch",
      time: "Delivery",
      desc: "Secure export palletization, humidity-controlled containerization, and express courier or sea freight to 36 nations with complete lot COA documentation."
    }
  ];

  const moqTiers = [
    {
      tier: "Standard Library Stock Packaging",
      moq: "1,000 units / SKU",
      leadTime: "14–21 Days",
      bestFor: "Fast market entry using Dooroomi's tested formulations and pre-molded bottles."
    },
    {
      tier: "Custom Active Formulation & Colorway",
      moq: "3,000 units / SKU",
      leadTime: "28–35 Days",
      bestFor: "Proprietary active ratios, custom scent profiles, and screen-printed primary containers."
    },
    {
      tier: "Full Bespoke Tooling & Global OEM",
      moq: "5,000+ units / SKU",
      leadTime: "45–60 Days",
      bestFor: "Custom bottle mold tooling, specialized airless vacuum pumps, and multi-country regulatory filings."
    }
  ];

  return (
    <div className="bg-[#fbfbfa] min-h-screen py-10 sm:py-16">
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-hanbit-border">
          <nav className="flex items-center space-x-2 text-xs text-hanbit-muted font-medium">
            <button 
              onClick={() => onNavigateHome('hero')}
              className="hover:text-hanbit-forest flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-hanbit-gold" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <span className="text-hanbit-forest font-semibold">B2B Manufacturing</span>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <span className="text-hanbit-gold font-bold">Turnkey OEM / ODM Services</span>
          </nav>

          <button
            onClick={() => onNavigateHome('hero')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-hanbit-border bg-white text-xs font-semibold text-hanbit-forest hover:bg-hanbit-sage-light/40 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-hanbit-gold/30 text-xs font-semibold text-hanbit-forest shadow-2xs mb-4">
            <Sparkles className="w-4 h-4 text-hanbit-gold" />
            <span className="font-mono text-hanbit-gold font-bold">원스톱 제조 서비스</span>
            <span className="text-hanbit-border">|</span>
            <span className="tracking-wider uppercase text-[11px]">Turnkey B2B Manufacturing Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight font-serif">
            Comprehensive Formulation, Clinical Testing & Cleanroom Manufacturing.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-hanbit-muted font-light leading-relaxed">
            From bespoke active synthesis in our Gangnam laboratory to high-speed automated aseptic filling at our Songdo Bio-Cluster facility, Dooroomi provides end-to-end OEM, ODM, and OBM solutions for global beauty and medical brands.
          </p>
        </div>

        {/* 4 Core Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {SERVICES.map((svc, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="w-12 h-12 rounded-2xl bg-hanbit-ivory border border-hanbit-border text-hanbit-forest flex items-center justify-center font-bold text-base shadow-xs group-hover:scale-105 group-hover:bg-hanbit-gold group-hover:text-white transition-all font-mono">
                  {svc.num}
                </span>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-hanbit-forest leading-snug group-hover:text-hanbit-gold transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-hanbit-muted mt-2 leading-relaxed font-light">
                    {svc.desc}
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-hanbit-border/60 mt-4 flex flex-wrap gap-1.5">
                {svc.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-hanbit-ivory border border-hanbit-border/60 text-[10px] text-hanbit-forest font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 6-Step Turnkey Manufacturing Workflow */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-hanbit-border shadow-sm mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest uppercase block mb-1">
              End-to-End Execution
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif">
              Our 6-Stage OEM/ODM Production Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {workflow.map((st, i) => (
              <div key={i} className="p-6 rounded-2xl bg-hanbit-ivory border border-hanbit-border/60 space-y-2.5 hover:border-hanbit-gold transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-extrabold text-hanbit-gold bg-white px-2.5 py-0.5 rounded border border-hanbit-border">
                    STEP {st.step}
                  </span>
                  <span className="text-[11px] font-semibold text-hanbit-muted">
                    {st.time}
                  </span>
                </div>
                <h4 className="text-base font-bold text-hanbit-forest pt-1">
                  {st.title}
                </h4>
                <p className="text-xs text-hanbit-muted leading-relaxed font-light">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Minimum Order Quantities (MOQ) & Commercial Terms */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-hanbit-border shadow-sm mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest uppercase block mb-1">
              Production Volume
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif">
              Flexible Minimum Order Quantities (MOQ)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {moqTiers.map((t, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-hanbit-ivory border border-hanbit-border/60 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-hanbit-gold uppercase tracking-wider block">
                    Tier {idx + 1}
                  </span>
                  <h4 className="text-base font-bold text-hanbit-forest">
                    {t.tier}
                  </h4>
                  <div className="p-3 bg-white rounded-xl border border-hanbit-border/40 space-y-1">
                    <p className="text-xs font-semibold text-hanbit-forest">
                      MOQ: <span className="font-mono text-emerald-800">{t.moq}</span>
                    </p>
                    <p className="text-xs font-semibold text-hanbit-forest">
                      Lead Time: <span className="font-mono text-hanbit-gold">{t.leadTime}</span>
                    </p>
                  </div>
                  <p className="text-xs text-hanbit-muted leading-relaxed font-light">
                    {t.bestFor}
                  </p>
                </div>

                <div className="pt-4 border-t border-hanbit-border/60">
                  <button
                    onClick={onContactClick}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-hanbit-forest hover:text-white border border-hanbit-border text-xs font-bold text-hanbit-forest transition-colors cursor-pointer text-center"
                  >
                    Inquire for Tier {idx + 1} Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-hanbit-border shadow-sm mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest uppercase block mb-1">
              B2B Partner Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 max-w-4xl">
            {FAQS.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-hanbit-border bg-hanbit-ivory/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-hanbit-forest hover:text-hanbit-gold transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-hanbit-muted shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-hanbit-gold' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-hanbit-muted leading-relaxed font-light border-t border-hanbit-border/40 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-hanbit-forest via-emerald-950 to-hanbit-dark text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif">
              Ready to Formulate Your Brand with Korea's Premier Cleanroom?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed font-light">
              Receive evaluation samples dispatched via DHL/FedEx Express in 3–5 business days, along with custom formulation feasibility analysis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateGallery}
              className="px-6 py-3 rounded-full border border-hanbit-gold text-white hover:bg-hanbit-gold hover:text-hanbit-dark text-xs font-bold transition-all cursor-pointer"
            >
              Explore Existing Formulations
            </button>
            <button
              onClick={onContactClick}
              className="px-6 py-3 rounded-full bg-hanbit-gold text-hanbit-dark hover:bg-amber-300 text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              Request Free Sample Kit & Consultation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

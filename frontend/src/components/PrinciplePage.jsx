import React, { useState } from 'react';
import { 
  Sparkles, 
  FlaskConical, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Home, 
  ChevronRight, 
  ArrowLeft,
  Gauge,
  Microscope,
  Zap,
  TestTube2,
  Atom,
  Clock,
  Activity
} from 'lucide-react';

export const PrinciplePage = ({ onNavigateHome, onNavigateGallery, onContactClick }) => {
  const [activeTab, setActiveTab] = useState('stages');

  const principles = [
    {
      icon: Atom,
      title: "Nano-Liposomal Cellular Delivery",
      subtitle: "Sub-50nm Lipids",
      desc: "Traditional topicals remain trapped on the stratum corneum. Dooroomi utilizes high-pressure homogenization to encapsulate active peptides and vitamins into sub-50 nanometer lipid bilayers that seamlessly permeate cellular membranes."
    },
    {
      icon: FlaskConical,
      title: "Zero-Water Bio-Active Base",
      subtitle: "78%–93% Botanical Hydrosols",
      desc: "We eliminate non-functional purified water filler. Formulations use low-temperature fermented Birch Sap (Betula Platyphylla), Centella Asiatica hydrosol, and Galactomyces ferment filtrate as the primary molecular vehicle."
    },
    {
      icon: Microscope,
      title: "Clean Clinical Tolerance (0.00 Irritation)",
      subtitle: "EWG Green Grade 100%",
      desc: "Every formulation must achieve a 0.00 zero-hypersensitivity index across 30 human subjects under Dermatest® clinical repeated insult patch testing (HRIPT) prior to commercial manufacturing authorization."
    },
    {
      icon: Gauge,
      title: "Atmospheric Inert Nitrogen Blanketing",
      subtitle: "Anti-Oxidation Purge",
      desc: "Sensitive antioxidants like pure Ascorbic Acid (15%) and Retinol (0.5%) are homogenized, filtered, and sealed under medical-grade nitrogen gas to prevent photolytic and atmospheric degradation."
    }
  ];

  const steps = [
    { 
      stage: "Stage 01", 
      title: "Concept & Molecular Specification", 
      time: "Days 1–3", 
      desc: "Active target concentration, target skin absorption kinetics, viscosity rheology, and stability boundary parameters are locked by senior Korean cosmetic chemists." 
    },
    { 
      stage: "Stage 02", 
      title: "Intermediate Formulation ('Semi-Finished')", 
      time: "Days 4–10", 
      desc: "Micro-batch trial samples are produced in benchtop reactors. Evaluated for sensory skin-feel, emulsion stability, active suspension, and initial pH equilibrium." 
    },
    { 
      stage: "Stage 03", 
      title: "Pilot Nitrogen Run (Validation Batch)", 
      time: "Days 11–18", 
      desc: "A pilot run of 2,000 units validates cleanroom homogenization parameters, vacuum filling nozzles, and laminar airflow stability prior to mass commercial production." 
    },
    { 
      stage: "Stage 04", 
      title: "30-Day Accelerated Climate Stress", 
      time: "Days 19–30+", 
      desc: "Samples undergo 30 consecutive days in climate chambers at 45°C and 75% relative humidity. By Arrhenius kinetics, passing correlates to 24 months of room-temperature stability." 
    },
    { 
      stage: "Stage 05", 
      title: "Aseptic Packaging & Global Dispatch", 
      time: "Continuous", 
      desc: "Automated Class 1,000 cleanroom filling, nitrogen headspace flushing, digital laser batch lot coding, tamper induction sealing, and international palletization." 
    },
  ];

  const testingSpecs = [
    { label: "Stability Stress Chamber", val: "45°C ± 1°C / 75% RH (30 Consecutive Days)" },
    { label: "Centrifuge Phase Separation Test", val: "4,000 RPM for 30 minutes at 25°C" },
    { label: "Freeze-Thaw Cycling", val: "-10°C to +40°C across 5 complete cycles" },
    { label: "Microbial Challenge (USP 51)", val: "Zero growth of E. coli, P. aeruginosa, S. aureus" },
    { label: "Photostability Exposure", val: "1.2 Million Lux UV spectrum irradiation test" },
    { label: "Heavy Metal Screen", val: "Lead, Arsenic, Cadmium, Mercury < 0.1 ppm (ICP-MS)" },
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
            <span className="text-hanbit-forest font-semibold">Scientific Methodology</span>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <span className="text-hanbit-gold font-bold">Formulation & Testing Principle</span>
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
            <span className="font-mono text-hanbit-gold font-bold">생명공학 원리</span>
            <span className="text-hanbit-border">|</span>
            <span className="tracking-wider uppercase text-[11px]">Translational Bio-Development</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight font-serif">
            Scientific Principles Behind Verified Bio-Active Formulations.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-hanbit-muted font-light leading-relaxed">
            From molecular synthesis in our Seoul laboratory to sterile pilot reactor runs at our Songdo cleanroom plant, discover the scientific principles and rigorous testing protocols powering Korean clinical cosmetics.
          </p>
        </div>

        {/* 4 Core Formulation Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {principles.map((pr, idx) => {
            const IconComponent = pr.icon;
            return (
              <div 
                key={idx}
                className="p-7 rounded-3xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-hanbit-ivory border border-hanbit-border flex items-center justify-center text-hanbit-gold shadow-xs group-hover:scale-110 group-hover:bg-hanbit-gold group-hover:text-white transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-hanbit-gold">
                      {pr.subtitle}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-hanbit-forest mt-0.5 leading-snug">
                      {pr.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13px] text-hanbit-muted leading-relaxed font-light">
                    {pr.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-hanbit-border/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Clinically Validated Protocol</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Section: The Intermediate ("Semi-Finished") Stage */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-hanbit-border shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden bg-hanbit-ivory border border-hanbit-border p-6 shadow-md">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-emerald-950/5 flex items-center justify-center">
                  <img
                    src="./assets/img/intermediate.svg"
                    alt="Intermediate Formulation Development Stage"
                    className="w-full h-full object-cover filter drop-shadow-md"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-hanbit-border text-xs font-bold text-hanbit-forest flex items-center gap-1.5 shadow-xs">
                    <Layers className="w-3.5 h-3.5 text-hanbit-gold" />
                    <span>Intermediate Product Stage</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-hanbit-border/60 pt-4">
                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-hanbit-border/40">
                      <tr>
                        <th className="py-2.5 text-left font-medium text-hanbit-muted">Validation Duration</th>
                        <td className="py-2.5 text-right font-semibold text-hanbit-forest">7–14 Business Days</td>
                      </tr>
                      <tr>
                        <th className="py-2.5 text-left font-medium text-hanbit-muted">Checkpoints</th>
                        <td className="py-2.5 text-right font-semibold text-hanbit-forest">18 Physical / Chemical Assays</td>
                      </tr>
                      <tr>
                        <th className="py-2.5 text-left font-medium text-hanbit-muted">Cleanroom Facility</th>
                        <td className="py-2.5 text-right font-semibold text-hanbit-forest">Songdo Bio-Cluster Plant 1</td>
                      </tr>
                      <tr>
                        <th className="py-2.5 text-left font-medium text-hanbit-muted">Validated Batch Yield</th>
                        <td className="py-2.5 text-right font-semibold text-hanbit-forest">99.4% Recovery Rate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-hanbit-gold tracking-widest uppercase">
                <FlaskConical className="w-4 h-4" />
                <span>The Intermediate Formulation Principle</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-hanbit-forest tracking-tight font-serif">
                Bridging Laboratory Innovation to Mass Cleanroom Production.
              </h2>

              <p className="text-sm sm:text-base text-hanbit-muted leading-relaxed font-light">
                In standard cosmetic manufacturing, formulations jump straight from laboratory test tubes to high-speed commercial fill lines—a common cause of phase separation, active degradation, and batch inconsistencies.
              </p>

              <p className="text-sm sm:text-base text-hanbit-muted leading-relaxed font-light">
                Dooroomi enforces an intermediate <b>"Semi-Finished"</b> validation gate. Each formulation is blended in a 50L trial reactor, subjected to 18 physical-chemical checks, and verified for rheological viscosity before scaling to 500L–2,000L production reactors.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-hanbit-ivory border border-hanbit-border/60">
                  <span className="text-lg sm:text-xl font-bold font-mono text-hanbit-forest block">±0.05</span>
                  <span className="text-[11px] text-hanbit-muted">Strict pH Tolerance</span>
                </div>
                <div className="p-4 rounded-xl bg-hanbit-ivory border border-hanbit-border/60">
                  <span className="text-lg sm:text-xl font-bold font-mono text-hanbit-forest block">&lt; 0.1ppm</span>
                  <span className="text-[11px] text-hanbit-muted">Heavy Metal Limit</span>
                </div>
                <div className="p-4 rounded-xl bg-hanbit-ivory border border-hanbit-border/60 col-span-2 sm:col-span-1">
                  <span className="text-lg sm:text-xl font-bold font-mono text-emerald-700 block">100%</span>
                  <span className="text-[11px] text-hanbit-muted">EWG Green Grade</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 5-Step Translational Bio-Development Route */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-hanbit-border shadow-sm mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest uppercase block mb-1">
              Methodology Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif">
              The 5-Stage Translational Route
            </h2>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-hanbit-gold/40 space-y-8 my-6">
            {steps.map((st, i) => (
              <div key={i} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border-2 border-hanbit-gold group-hover:bg-hanbit-gold transition-colors flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-hanbit-gold group-hover:bg-white" />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold text-hanbit-gold bg-hanbit-ivory px-2 py-0.5 rounded border border-hanbit-border">
                    {st.stage}
                  </span>
                  <span className="text-xs font-semibold text-hanbit-muted">
                    {st.time}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-hanbit-forest group-hover:text-hanbit-gold transition-colors mt-1">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-hanbit-muted mt-1 leading-relaxed font-light max-w-3xl">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 30-Day Accelerated Testing Specifications Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-hanbit-border p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-hanbit-gold" />
              <h3 className="text-lg sm:text-xl font-bold text-hanbit-forest font-serif">
                30-Day Accelerated Climate Simulation Chamber Protocols
              </h3>
            </div>
            <p className="text-xs text-hanbit-muted mb-6 leading-relaxed">
              Every production formulation is validated under accelerated Arrhenius degradation models in controlled environmental chambers:
            </p>

            <div className="space-y-3">
              {testingSpecs.map((spec, spIdx) => (
                <div key={spIdx} className="p-4 rounded-xl bg-hanbit-ivory border border-hanbit-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-hanbit-forest">
                    {spec.label}
                  </span>
                  <span className="font-mono text-xs text-hanbit-ink bg-white px-2.5 py-1 rounded border border-hanbit-border/60 font-medium">
                    {spec.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-4 bg-gradient-to-br from-hanbit-forest to-hanbit-dark text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-hanbit-gold" />
              <h3 className="text-lg font-bold text-white">Experience Results</h3>
            </div>
            <p className="text-xs text-emerald-100/70 mb-6 leading-relaxed font-light">
              See how our scientific principles translate into commercial formulas exported to 36 nations.
            </p>

            <div className="space-y-3">
              <button
                onClick={onNavigateGallery}
                className="w-full py-3 rounded-full bg-gradient-to-r from-hanbit-gold to-amber-300 text-hanbit-dark text-xs font-bold hover:shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Products Developed by Principle</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContactClick}
                className="w-full py-3 rounded-full border border-emerald-700 hover:border-hanbit-gold text-white text-xs font-semibold transition-all text-center cursor-pointer"
              >
                Inquire for Custom Formulation
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

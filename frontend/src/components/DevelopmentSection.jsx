import React from 'react';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';

export const DevelopmentSection = ({ onExploreProducts }) => {
  const steps = [
    { title: "Concept & Molecular Specification", desc: "Active ingredient target concentration, desired skin absorption kinetics, and stability parameters are locked." },
    { title: "Intermediate Formulation ('Semi-Finished')", desc: "A micro-batch sample is emulsified in trial reactors and evaluated for sensory texture and active suspension." },
    { title: "Pilot Nitrogen Run (Validation)", desc: "A pilot run of 2,000 units validates cleanroom homogenization parameters prior to mass filling." },
    { title: "Final Analytical Quality Check", desc: "Finished containers are tested for hermetic vacuum closure, weight consistency, and microbiological zero-tolerance." },
    { title: "Aseptic Packaging & Global Dispatch", desc: "Laser batch lot coding, nitrogen headspace flush, tamper sealing, and export containerization." },
  ];

  return (
    <section id="development" className="py-20 lg:py-28 bg-white border-y border-hanbit-border relative overflow-hidden">
      <div id="principle" className="absolute -top-24" />
      <div id="therapy" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual: Intermediate Product Illustration */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden bg-hanbit-ivory border border-hanbit-border shadow-xl p-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-950/5 flex items-center justify-center">
                <img
                  src="./assets/img/intermediate.svg"
                  alt="Intermediate Formulation Development Stage"
                  className="w-full h-full object-cover filter drop-shadow-md"
                />
                
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-hanbit-border text-xs font-bold text-hanbit-forest flex items-center gap-1.5 shadow-sm">
                  <Layers className="w-3.5 h-3.5 text-hanbit-gold" />
                  <span>Intermediate Product Stage</span>
                </div>
              </div>

              {/* Spec table */}
              <div className="mt-5 border-t border-hanbit-border/60 pt-4">
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-hanbit-border/40">
                    <tr>
                      <th className="py-2.5 text-left font-medium text-hanbit-muted">Stage Validation Time</th>
                      <td className="py-2.5 text-right font-semibold text-hanbit-forest">7–14 Business Days</td>
                    </tr>
                    <tr>
                      <th className="py-2.5 text-left font-medium text-hanbit-muted">Quality Checkpoints</th>
                      <td className="py-2.5 text-right font-semibold text-hanbit-forest">18 Physical / Chemical Tests</td>
                    </tr>
                    <tr>
                      <th className="py-2.5 text-left font-medium text-hanbit-muted">Cleanroom Facility</th>
                      <td className="py-2.5 text-right font-semibold text-hanbit-forest">Incheon Songdo Bio-Cluster Plant 1</td>
                    </tr>
                    <tr>
                      <th className="py-2.5 text-left font-medium text-hanbit-muted">Pilot Batch Yield</th>
                      <td className="py-2.5 text-right font-semibold text-hanbit-forest">99.4% Validated Recovery</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Text Column: Timeline */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-hanbit-gold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Translational Bio-Development</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-hanbit-forest tracking-tight leading-tight">
              From Verified Laboratory Assay to Finished Formulation.
            </h2>

            <p className="text-base text-hanbit-muted leading-relaxed font-light">
              Laboratory data is directly bridged into production through our intermediate formulation stage. Every intermediate batch is rigorously verified before mass cleanroom filling commences.
            </p>

            {/* Step-by-step Timeline */}
            <div className="relative pl-6 border-l-2 border-hanbit-gold/40 space-y-6 my-6">
              {steps.map((st, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-hanbit-gold group-hover:bg-hanbit-gold transition-colors" />
                  <h4 className="text-sm font-bold text-hanbit-forest group-hover:text-hanbit-gold transition-colors">
                    {st.title}
                  </h4>
                  <p className="text-xs text-hanbit-muted mt-0.5 leading-relaxed font-light">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreProducts}
                className="px-6 py-3 rounded-full bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <span>Explore Formulations Developed Through This Route</span>
                <ArrowRight className="w-4 h-4 text-hanbit-gold" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

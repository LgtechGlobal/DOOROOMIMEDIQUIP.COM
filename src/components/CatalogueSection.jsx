import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { CATALOGUE_DOCS } from '../data/siteData';

export const CatalogueSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'Full Master Catalogue',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-12">
      {/* Grid of 6 Downloadable PDF Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATALOGUE_DOCS.map((doc) => (
          <div
            key={doc.id}
            className="group p-6 rounded-2xl bg-white border border-hanbit-border shadow-sm hover:shadow-lg hover:border-hanbit-gold/60 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-14 rounded-lg bg-gradient-to-br from-hanbit-forest to-hanbit-dark text-white p-2 flex flex-col justify-between shadow-sm">
                  <FileText className="w-4 h-4 text-hanbit-gold" />
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-amber-200">
                    PDF
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-hanbit-muted block">
                    {doc.pages} Pages
                  </span>
                  <span className="text-[10px] text-hanbit-muted/70 block">
                    {doc.size}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-hanbit-gold uppercase tracking-wider block">
                  {doc.kind}
                </span>
                <h4 className="text-base font-bold text-hanbit-forest mt-1 group-hover:text-hanbit-gold transition-colors">
                  {doc.title}
                </h4>
              </div>

              <p className="text-xs text-hanbit-muted leading-relaxed font-light">
                {doc.desc}
              </p>
            </div>

            <div className="pt-5 border-t border-hanbit-border/60 mt-4 flex items-center justify-between">
              <span className="text-[11px] text-emerald-800 font-medium inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-hanbit-gold" />
                <span>Verified Dossier</span>
              </span>
              <a
                href={doc.file}
                download
                className="px-4 py-2 rounded-lg bg-hanbit-ivory hover:bg-hanbit-forest hover:text-white border border-hanbit-border text-xs font-bold text-hanbit-forest transition-all inline-flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Catalogue Request Form Panel */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-hanbit-forest to-hanbit-dark text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-hanbit-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct B2B Distribution Inquiries</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Request Complete 2026 Technical Binder & Evaluation Samples.
          </h3>
          <p className="mt-2 text-sm text-emerald-100/80 font-light">
            Receive full analytical COA dossiers, formulation sample kits, and OEM pricing structures directly to your corporate inbox.
          </p>

          {isSubmitted ? (
            <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-6 h-6 text-amber-300 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Thank You for Your Request</h4>
                <p className="text-xs text-emerald-100/80">
                  Our export documentation desk has dispatched the requested technical dossiers to <b>{formData.email}</b>.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Min-Seok Kim"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Global Derma Lab Inc."
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">
                  Primary Interest
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:border-amber-300 [&>option]:text-hanbit-dark"
                >
                  <option>Full Master Catalogue 2026</option>
                  <option>Series A: Botanical Dossier</option>
                  <option>Series B: Peptides & NAD+</option>
                  <option>Series C: Packaging Engineering</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-hanbit-gold to-amber-500 text-hanbit-dark font-bold text-xs shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Technical Dossiers Instantly</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

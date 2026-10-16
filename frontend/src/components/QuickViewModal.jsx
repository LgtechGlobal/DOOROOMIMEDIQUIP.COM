import React from 'react';
import { X, ArrowRight, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { getOptimizedImageUrl } from '../utils/imageUrl';

export const QuickViewModal = ({
  product,
  onClose,
  onSelectForQuote,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-hanbit-dark/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-hanbit-border overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-hanbit-forest flex items-center justify-center shadow-md border border-hanbit-border transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Media Column */}
          <div className="md:col-span-5 bg-gradient-to-b from-hanbit-ivory to-hanbit-sage-light/40 p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-hanbit-border">
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-hanbit-forest text-white text-[11px] font-bold shadow-sm">
                {product.badge}
              </span>
            )}
            
            <div className="w-full max-w-[280px] aspect-square flex items-center justify-center">
              <img
                src={getOptimizedImageUrl(product.imgUrl, { width: 600 })}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain filter drop-shadow-xl"
              />
            </div>

            <div className="mt-6 w-full text-center space-y-1">
              <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest block uppercase">
                {product.model}
              </span>
              <span className="text-xs text-hanbit-muted font-medium">
                Standard Net Volume: {product.volume}
              </span>
            </div>
          </div>

          {/* Right Info Column */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold text-hanbit-gold uppercase tracking-wider block">
                {product.catLabel}
              </span>
              <h2 className="text-2xl font-extrabold text-hanbit-forest mt-1">
                {product.name}
              </h2>
              <p className="text-sm font-semibold text-hanbit-muted mt-0.5">
                {product.nameKo}
              </p>
            </div>

            <p className="text-sm text-hanbit-ink/80 leading-relaxed font-light">
              {product.desc}
            </p>

            {/* Key Actives Section */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-hanbit-forest uppercase tracking-wider">
                Key Bio-Actives & Ingredients
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.keyActives.map((act, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-hanbit-ivory border border-hanbit-border text-xs text-hanbit-forest font-medium flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-hanbit-gold" />
                    <span>{act}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-hanbit-forest uppercase tracking-wider">
                Certified Technical Parameters
              </h4>
              <div className="rounded-xl border border-hanbit-border overflow-hidden">
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-hanbit-border">
                    {product.specs.map(([key, val], idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-hanbit-ivory/50' : 'bg-white'}>
                        <th className="py-2 px-3 text-left font-medium text-hanbit-muted w-1/3">
                          {key}
                        </th>
                        <td className="py-2 px-3 text-left font-semibold text-hanbit-forest">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onSelectForQuote(product);
                  onClose();
                }}
                className="flex-1 py-3 px-5 rounded-full bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Sample Batch Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold" />
              </button>

              <a
                href="./assets/docs/technical-specifications.pdf"
                download
                className="py-3 px-5 rounded-full bg-hanbit-ivory hover:bg-hanbit-sage-light/40 border border-hanbit-border text-hanbit-forest text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-hanbit-muted" />
                <span>Technical Sheet (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, ArrowRight, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { getOptimizedImageUrl } from '../utils/imageUrl';
import { getProductTheme } from '../utils/productTheme';

export const QuickViewModal = ({
  product,
  onClose,
  onSelectForQuote,
}) => {
  if (!product) return null;
  const theme = getProductTheme(product);

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
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-hanbit-forest flex items-center justify-center shadow-md border border-hanbit-border transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Media Column with tailored background matching product */}
          <div className={`md:col-span-5 ${theme.stageBg} p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r ${theme.stageBorder} overflow-hidden`}>
            {/* Ambient Radial Aura */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{ background: theme.stageGlow }}
            />

            {product.badge && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-hanbit-forest text-white text-[11px] font-bold shadow-sm">
                {product.badge}
              </span>
            )}
            
            <div className="w-full max-w-[280px] aspect-square flex items-center justify-center relative z-10">
              <img
                src={getOptimizedImageUrl(product.imgUrl, { width: 600 })}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain filter drop-shadow-xl"
              />
            </div>

            <div className="mt-6 w-full text-center space-y-1 relative z-10">
              <span className={`text-xs font-mono font-bold tracking-widest inline-block uppercase px-3 py-1 rounded-full border ${theme.modelBadge}`}>
                {product.model}
              </span>
              <span className="text-xs text-slate-700 font-medium block">
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
              <p className="text-sm font-semibold text-slate-700 mt-0.5">
                {product.nameKo}
              </p>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed font-normal">
              {product.desc}
            </p>

            {/* Key Actives Section */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-hanbit-forest uppercase tracking-wider">
                Key Bio-Actives & Ingredients
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.keyActives?.map((act, i) => (
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

            {/* Specifications Matrix Table */}
            {product.specs && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-hanbit-forest uppercase tracking-wider">
                  Technical Specifications
                </h4>
                <div className="rounded-xl border border-hanbit-border overflow-hidden text-xs">
                  {product.specs.map(([label, val], idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between p-2.5 ${
                        idx % 2 === 0 ? 'bg-hanbit-ivory/60' : 'bg-white'
                      }`}
                    >
                      <span className="font-semibold text-hanbit-muted">{label}</span>
                      <span className="font-mono text-hanbit-forest font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-hanbit-border flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-hanbit-gold" />
                <span>ISO 22716 & CGMP Certified</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onSelectForQuote(product);
                }}
                className="px-5 py-2.5 rounded-full bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Request Sample Batch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, ArrowRight, Layers, Trash2, CheckCircle2 } from 'lucide-react';
import { Product } from '../data/siteData';

interface CompareDrawerProps {
  products: Product[];
  onRemove: (product: Product) => void;
  onClear: () => void;
  onSelectForQuote: (product: Product) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  products,
  onRemove,
  onClear,
  onSelectForQuote,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (products.length === 0) return null;

  // Extract all unique spec keys across compared products
  const allSpecKeys = Array.from(
    new Set(products.flatMap((p) => p.specs.map(([k]) => k)))
  );

  return (
    <>
      {/* Sticky Bottom Floating Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl bg-hanbit-dark text-white rounded-full p-2.5 sm:p-3 shadow-2xl border border-hanbit-gold/40 backdrop-blur-md flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-3 pl-3">
          <div className="w-8 h-8 rounded-full bg-hanbit-gold text-hanbit-dark flex items-center justify-center font-bold text-xs">
            {products.length}
          </div>
          <div>
            <span className="text-xs font-bold text-white block">
              {products.length} {products.length === 1 ? 'Product' : 'Products'} Selected
            </span>
            <span className="text-[10px] text-emerald-200/80 block">
              {products.length < 2 ? 'Select at least 2 to compare' : 'Ready for side-by-side analysis'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pr-1">
          <button
            onClick={onClear}
            className="px-3 py-1.5 rounded-full text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            Clear
          </button>
          <button
            disabled={products.length < 2}
            onClick={() => setIsModalOpen(true)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              products.length >= 2
                ? 'bg-hanbit-gold text-hanbit-dark hover:bg-amber-400 shadow-md cursor-pointer'
                : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Full Comparison Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-hanbit-dark/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-hanbit-border overflow-hidden z-10 p-6 sm:p-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-hanbit-border">
              <div>
                <h3 className="text-xl font-extrabold text-hanbit-forest">
                  Side-by-Side Formulation Comparison
                </h3>
                <p className="text-xs text-hanbit-muted mt-0.5">
                  Detailed comparison across active compounds, clinical standards, and volume parameters.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-hanbit-ivory hover:bg-hanbit-sage-light/60 flex items-center justify-center text-hanbit-forest"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Comparison Table */}
            <div className="overflow-x-auto flex-1 mt-4">
              <table className="w-full text-xs min-w-[600px]">
                <thead>
                  <tr className="border-b border-hanbit-border">
                    <th className="py-3 px-4 text-left font-bold text-hanbit-muted w-1/4">
                      Specification
                    </th>
                    {products.map((prod) => (
                      <th key={prod.id} className="py-3 px-4 text-left align-top">
                        <div className="space-y-2">
                          <div className="w-20 h-20 mx-auto bg-hanbit-ivory rounded-xl p-2 border border-hanbit-border/60 flex items-center justify-center">
                            <img
                              src={prod.imgUrl}
                              alt={prod.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <span className="font-mono text-[10px] text-hanbit-gold font-bold uppercase block">
                              {prod.model}
                            </span>
                            <span className="font-bold text-sm text-hanbit-forest block">
                              {prod.name}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              onSelectForQuote(prod);
                              setIsModalOpen(false);
                            }}
                            className="w-full py-1.5 px-3 rounded-lg bg-hanbit-forest hover:bg-hanbit-dark text-white text-[11px] font-semibold"
                          >
                            Quote Formula
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-hanbit-border/60">
                  <tr className="bg-hanbit-ivory/50">
                    <th className="py-2.5 px-4 text-left font-medium text-hanbit-muted">
                      Category
                    </th>
                    {products.map((prod) => (
                      <td key={prod.id} className="py-2.5 px-4 text-left font-semibold text-hanbit-forest">
                        {prod.catLabel}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="py-2.5 px-4 text-left font-medium text-hanbit-muted">
                      Net Volume
                    </th>
                    {products.map((prod) => (
                      <td key={prod.id} className="py-2.5 px-4 text-left font-semibold text-hanbit-forest">
                        {prod.volume}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-hanbit-ivory/50">
                    <th className="py-2.5 px-4 text-left font-medium text-hanbit-muted">
                      Texture / Feel
                    </th>
                    {products.map((prod) => (
                      <td key={prod.id} className="py-2.5 px-4 text-left font-semibold text-hanbit-forest">
                        {prod.texture}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="py-2.5 px-4 text-left font-medium text-hanbit-muted">
                      Primary Bio-Actives
                    </th>
                    {products.map((prod) => (
                      <td key={prod.id} className="py-2.5 px-4 text-left font-semibold text-hanbit-forest">
                        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-hanbit-ink">
                          {prod.keyActives.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Render individual specifications */}
                  {allSpecKeys.map((key, kIdx) => (
                    <tr key={key} className={kIdx % 2 === 0 ? 'bg-hanbit-ivory/50' : 'bg-white'}>
                      <th className="py-2.5 px-4 text-left font-medium text-hanbit-muted">
                        {key}
                      </th>
                      {products.map((prod) => {
                        const specMatch = prod.specs.find(([k]) => k === key);
                        return (
                          <td key={prod.id} className="py-2.5 px-4 text-left font-medium text-hanbit-forest">
                            {specMatch ? specMatch[1] : '—'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

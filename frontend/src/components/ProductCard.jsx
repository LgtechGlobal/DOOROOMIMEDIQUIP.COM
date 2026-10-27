import React, { useState } from 'react';
import { Eye, ArrowRight, Sparkles, Check, FlaskConical, ShieldCheck } from 'lucide-react';
import { getOptimizedImageUrl } from '../utils/imageUrl';
import { getProductTheme } from '../utils/productTheme';

export const ProductCard = ({
  product,
  onQuickView,
  onSelectForQuote,
  isCompared,
  onToggleCompare,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = getProductTheme(product);

  // Extract pH or key spec if available
  const phSpec = product.specs?.find(([key]) => key.toLowerCase().includes('ph'))?.[1] || 'Skin Neutral';
  const targetSpec = product.specs?.find(([key]) => key.toLowerCase().includes('target') || key.toLowerCase().includes('indication'))?.[1] || 'All Skin Types';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-white rounded-3xl border border-hanbit-border/80 ${theme.hoverBorder} shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden`}
    >
      {/* Top Floating Badges */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
        {/* Model Identifier Pill */}
        <span className={`px-2.5 py-1 rounded-full backdrop-blur-md border ${theme.modelBadge} text-[10px] font-mono font-bold shadow-sm`}>
          {product.model}
        </span>

        {/* Badge or Series Tag */}
        {product.badge ? (
          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-hanbit-forest to-emerald-950 text-white text-[10px] font-bold tracking-wide shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-hanbit-gold" />
            <span>{product.badge}</span>
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-hanbit-border text-[10px] font-medium text-slate-700 shadow-xs">
            {product.catLabel?.split('·')[0]?.trim()}
          </span>
        )}
      </div>

      {/* Product Image Stage with custom per-product background color & aura */}
      <div className={`relative aspect-[4/3.8] w-full ${theme.stageBg} overflow-hidden flex items-center justify-center p-6 border-b ${theme.stageBorder} transition-colors duration-500`}>
        {/* Soft Radial Ambient Aura matching product color identity */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: theme.stageGlow,
          }}
        />

        {/* Product Image with smooth elevation on hover */}
        <img
          src={getOptimizedImageUrl(product.imgUrl, { width: 500 })}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-500 ease-out group-hover:scale-108 group-hover:-translate-y-1"
        />

        {/* Floating Net Volume Tag */}
        <div className="absolute bottom-2.5 left-3.5 px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] text-slate-700 font-semibold flex items-center gap-1 shadow-xs">
          <FlaskConical className="w-2.5 h-2.5 text-hanbit-gold" />
          <span>{product.volume}</span>
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-2.5 right-3.5 py-1.5 px-3 rounded-lg bg-hanbit-dark/90 hover:bg-hanbit-forest text-white text-[11px] font-semibold backdrop-blur-sm transition-all duration-200 flex items-center gap-1.5 shadow-md hover:scale-105 cursor-pointer opacity-0 group-hover:opacity-100"
          title="Quick View Specifications"
        >
          <Eye className="w-3 h-3 text-hanbit-gold" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-3.5">
        
        {/* Names & Description */}
        <div className="space-y-1">
          <p className="text-[11px] font-semibold text-hanbit-gold line-clamp-1">
            {product.nameKo}
          </p>
          <h3 className="text-base font-bold text-hanbit-forest leading-snug group-hover:text-hanbit-dark transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed font-normal pt-1">
            {product.short}
          </p>
        </div>

        {/* Key Bio-Actives Chips */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {product.keyActives?.slice(0, 2).map((active, aIdx) => (
            <span
              key={aIdx}
              className="px-2 py-0.5 rounded-md bg-hanbit-ivory border border-hanbit-border/70 text-[10px] font-medium text-hanbit-forest flex items-center gap-1 line-clamp-1"
            >
              <span className="w-1 h-1 rounded-full bg-hanbit-gold shrink-0" />
              <span>{active}</span>
            </span>
          ))}
        </div>

        {/* Clinical Parameters Strip */}
        <div className="rounded-xl bg-hanbit-ivory/50 border border-hanbit-border/60 p-2 grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <span className="text-slate-600 block text-[9px] uppercase font-bold">pH Level</span>
            <span className="font-bold text-slate-900 truncate block">{phSpec}</span>
          </div>
          <div>
            <span className="text-slate-600 block text-[9px] uppercase font-bold">Indication</span>
            <span className="font-bold text-slate-900 truncate block">{targetSpec}</span>
          </div>
        </div>

        {/* Bottom Interactive Row */}
        <div className="pt-2 border-t border-hanbit-border/60 flex items-center justify-between gap-2">
          {/* Compare Toggle Pill */}
          <button
            type="button"
            onClick={() => onToggleCompare(product)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              isCompared
                ? 'bg-hanbit-forest text-white shadow-xs font-semibold'
                : 'bg-hanbit-ivory hover:bg-hanbit-sage-light text-hanbit-forest border border-hanbit-border/70'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
              isCompared ? 'bg-hanbit-gold border-hanbit-gold text-white' : 'border-hanbit-muted/60 bg-white'
            }`}>
              {isCompared && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span>Compare</span>
          </button>

          {/* Sample Quote CTA Button */}
          <button
            onClick={() => onSelectForQuote(product)}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm hover:shadow group/btn cursor-pointer"
            title={`Inquire / Contact Us for ${product.name} at ${product.price || 'Quote'}`}
          >
            <span className="font-extrabold text-amber-300 font-mono tracking-tight">{product.price || 'Quote'}</span>
            <ArrowRight className="w-3 h-3 text-white/80 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};

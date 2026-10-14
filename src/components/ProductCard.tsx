import React, { useState, useRef, MouseEvent } from 'react';
import { Eye, ArrowRight, Check, Plus, Sparkles } from 'lucide-react';
import { Product } from '../data/siteData';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onSelectForQuote: (product: Product) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onSelectForQuote,
  isCompared,
  onToggleCompare,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max 8 degrees rotation
    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;
    
    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out, box-shadow 0.25s ease',
      }}
      className="group relative bg-white rounded-2xl border border-hanbit-border overflow-hidden shadow-sm hover:shadow-xl hover:border-hanbit-gold/60 flex flex-col will-change-transform"
    >
      {/* Dynamic specular glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 60%)`,
        }}
      />

      {/* Top Media Area */}
      <div className="relative aspect-square w-full bg-gradient-to-b from-hanbit-ivory to-hanbit-sage-light/30 overflow-hidden flex items-center justify-center p-6">
        {/* Category Pill */}
        <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-hanbit-border text-[11px] font-bold text-hanbit-forest shadow-sm">
          {product.catLabel.split('·')[0]}
        </span>

        {/* Badge if available */}
        {product.badge && (
          <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full bg-hanbit-forest text-white text-[10px] font-bold tracking-wide shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Product SVG Graphic with hover zoom */}
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Hover Quick View Trigger Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-x-4 bottom-3 z-20 py-2 rounded-xl bg-hanbit-dark/85 backdrop-blur-md text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-hanbit-gold hover:text-hanbit-dark"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View Specifications</span>
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-1 space-y-3">
        {/* Model ID & Volume */}
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold tracking-wider text-hanbit-gold font-mono uppercase">
            {product.model}
          </span>
          <span className="text-hanbit-muted font-medium">
            {product.volume}
          </span>
        </div>

        {/* Name in EN & KR */}
        <div>
          <h3 className="text-base font-bold text-hanbit-forest leading-snug group-hover:text-hanbit-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs font-medium text-hanbit-muted/80 line-clamp-1 mt-0.5">
            {product.nameKo}
          </p>
        </div>

        {/* Short description */}
        <p className="text-xs text-hanbit-muted line-clamp-2 leading-relaxed font-light">
          {product.short}
        </p>

        {/* Key Actives Pill List */}
        <div className="pt-1 flex flex-wrap gap-1">
          {product.keyActives.slice(0, 2).map((act, aIdx) => (
            <span
              key={aIdx}
              className="px-2 py-0.5 rounded bg-hanbit-ivory border border-hanbit-border/60 text-[10px] text-hanbit-forest font-medium line-clamp-1"
            >
              • {act}
            </span>
          ))}
        </div>

        {/* Bottom Actions Row */}
        <div className="pt-3 border-t border-hanbit-border/60 mt-auto flex items-center justify-between gap-2">
          {/* Compare Checkbox */}
          <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-hanbit-muted select-none hover:text-hanbit-forest">
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onToggleCompare(product)}
              className="rounded border-hanbit-border text-hanbit-gold focus:ring-hanbit-gold h-3.5 w-3.5 cursor-pointer"
            />
            <span className="text-[11px]">Compare</span>
          </label>

          {/* Quote Button */}
          <button
            onClick={() => onSelectForQuote(product)}
            className="px-3 py-1.5 rounded-lg bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-semibold transition-colors inline-flex items-center gap-1"
          >
            <span>Quote</span>
            <ArrowRight className="w-3 h-3 text-hanbit-gold" />
          </button>
        </div>
      </div>
    </div>
  );
};

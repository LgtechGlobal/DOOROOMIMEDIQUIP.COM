import React, { useState, useMemo } from 'react';
import { Sparkles, Eye, ArrowRight, ShieldCheck, Check, Layers, ChevronRight, Filter } from 'lucide-react';
import { DepthCarousel, DepthCarouselItem } from './DepthCarousel';
import { PRODUCTS, Product, CATEGORIES } from '../data/siteData';

interface TestingPipelineProps {
  onQuickView: (product: Product) => void;
  onSelectForQuote: (product: Product) => void;
  onToggleCompare?: (product: Product) => void;
  comparedProducts?: Product[];
}

export const TestingPipeline: React.FC<TestingPipelineProps> = ({
  onQuickView,
  onSelectForQuote,
  onToggleCompare,
  comparedProducts = [],
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.cat === activeCategory);
  }, [activeCategory]);

  // Convert products to DepthCarousel format
  const carouselItems = useMemo(() => {
    return filteredProducts.map((p) => ({
      image: p.imgUrl,
      alt: p.name,
      title: p.name,
      subtitle: p.nameKo,
      model: p.model,
      badge: p.badge || p.catLabel.split('·')[0].trim(),
      tag: p.catLabel,
      data: p,
    }));
  }, [filteredProducts]);

  const activeProduct = filteredProducts[activeIndex] || filteredProducts[0] || PRODUCTS[0];
  const isCompared = comparedProducts.some((p) => p.id === activeProduct?.id);

  return (
    <section id="testing" className="py-20 lg:py-28 bg-hanbit-ivory relative overflow-hidden border-b border-hanbit-border">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-hanbit-gold/15 via-hanbit-cyan/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-hanbit-gold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Master Korean Formulations</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-hanbit-forest tracking-tight leading-tight">
              ALL products
            </h2>
            <p className="mt-4 text-base sm:text-lg text-hanbit-muted leading-relaxed font-light">
              Experience all 16 precision Korean formulations in full 3D depth. Drag, scroll with mouse wheel, or use arrow controls to inspect each formulation in both directions.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center flex-wrap gap-2 p-1.5 rounded-full bg-white border border-hanbit-border shadow-sm">
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-hanbit-forest text-white shadow-sm'
                  : 'text-hanbit-muted hover:text-hanbit-forest'
              }`}
            >
              All Formulations ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter((p) => p.cat === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveIndex(0);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-hanbit-forest text-white shadow-sm'
                      : 'text-hanbit-muted hover:text-hanbit-forest'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Depth Carousel Container */}
        <div className="w-full relative py-6 my-4" style={{ minHeight: '740px' }}>
          <DepthCarousel
            items={carouselItems}
            depth={240}
            spread={180}
            tilt={22}
            tiltDirection="both"
            perspective={1500}
            visibleCards={4}
            falloff={0.2}
            blur={6}
            autoplay={false}
            loop
            cardWidth={700}
            cardHeight={600}
            radius={24}
            tint="#05060a"
            duration={700}
            ease="power3.out"
            autoplayDelay={3200}
            showControls
            showIndicators
            onChange={(idx) => setActiveIndex(idx)}
            renderCard={(item, _idx, isActive) => {
              const prod = item.data as Product;
              if (!prod) return null;

              return (
                <div className="w-full h-full flex flex-col justify-between bg-white select-none rounded-[24px] overflow-hidden border border-hanbit-border/80 shadow-2xl">
                  {/* Top image & badges: 340px tall */}
                  <div className="relative w-full h-[340px] bg-gradient-to-b from-hanbit-ivory via-hanbit-sage-light/20 to-white flex items-center justify-center p-6 overflow-hidden">
                    <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-hanbit-border text-xs font-bold text-hanbit-forest shadow-sm">
                      {prod.catLabel}
                    </span>
                    <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-hanbit-forest text-white text-xs font-mono font-bold tracking-wider shadow-sm">
                      {prod.model}
                    </span>

                    <img
                      src={prod.imgUrl}
                      alt={prod.name}
                      className="max-h-[300px] max-w-[480px] w-full h-full object-contain filter drop-shadow-xl transition-transform duration-500 hover:scale-105"
                      draggable={false}
                    />
                  </div>

                  {/* Card Bottom Body: 260px tall with spacious typography */}
                  <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between bg-white border-t border-hanbit-border/60">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-hanbit-gold font-mono uppercase tracking-wider text-xs">
                          {prod.volume}
                        </span>
                        <span className="text-xs text-hanbit-muted font-semibold bg-hanbit-ivory px-3 py-1 rounded-full border border-hanbit-border/60">
                          {prod.texture}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest leading-snug">
                        {prod.name}
                      </h3>
                      <p className="text-sm font-semibold text-hanbit-muted">
                        {prod.nameKo}
                      </p>

                      <p className="text-xs sm:text-sm text-hanbit-ink/75 line-clamp-2 leading-relaxed font-light pt-1">
                        {prod.short}
                      </p>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-4 border-t border-hanbit-border/60 flex items-center gap-3">
                      {isActive ? (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onQuickView(prod);
                            }}
                            className="flex-1 py-3 px-5 rounded-xl bg-hanbit-forest text-white text-xs font-bold hover:bg-hanbit-dark flex items-center justify-center gap-2 shadow-sm transition-all"
                          >
                            <Eye className="w-4 h-4 text-hanbit-gold" />
                            <span>Quick View</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectForQuote(prod);
                            }}
                            className="py-3 px-6 rounded-xl bg-hanbit-gold hover:bg-amber-400 text-hanbit-dark text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                          >
                            <span>Quote</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <div className="w-full text-center py-2">
                          <span className="text-xs text-hanbit-muted/90 font-medium">
                            Click to bring to front
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>

        {/* Active Product Spotlight Details Panel */}
        {activeProduct && (
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border border-hanbit-border shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Product Overview */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-hanbit-sage-light text-hanbit-forest text-xs font-bold">
                    {activeProduct.catLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-hanbit-ivory border border-hanbit-border text-xs font-mono font-bold text-hanbit-gold">
                    {activeProduct.model}
                  </span>
                  <span className="text-xs text-hanbit-muted font-medium">
                    {activeProduct.volume} · {activeProduct.texture}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest">
                    {activeProduct.name}
                  </h3>
                  <span className="text-sm font-semibold text-hanbit-muted">
                    {activeProduct.nameKo}
                  </span>
                </div>

                <p className="text-sm text-hanbit-ink/80 leading-relaxed font-light">
                  {activeProduct.desc}
                </p>

                {/* Key Actives Chips */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {activeProduct.keyActives.map((act, aIdx) => (
                    <span
                      key={aIdx}
                      className="px-2.5 py-1 rounded-lg bg-hanbit-ivory border border-hanbit-border text-xs text-hanbit-forest font-medium"
                    >
                      • {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Fast Verification Specs */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4 p-5 rounded-2xl bg-hanbit-ivory border border-hanbit-border/80">
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-hanbit-muted uppercase tracking-wider block text-[10px]">
                    Clinical & Regulatory Status
                  </span>
                  <div className="flex items-center justify-between text-hanbit-forest">
                    <span>Clinical Efficacy</span>
                    <span className="font-bold text-emerald-800">Dermatest® 5-Star Excellent</span>
                  </div>
                  <div className="flex items-center justify-between text-hanbit-forest">
                    <span>Manufacturing Standard</span>
                    <span className="font-bold">ISO 22716 / Korea CGMP</span>
                  </div>
                  <div className="flex items-center justify-between text-hanbit-forest">
                    <span>Clean Formulation</span>
                    <span className="font-bold">EVE Vegan / Preservative-Safe</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-hanbit-border/60 flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => onSelectForQuote(activeProduct)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Request Sample Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold" />
                  </button>

                  <button
                    onClick={() => onQuickView(activeProduct)}
                    className="py-2.5 px-4 rounded-xl bg-white hover:bg-hanbit-sage-light border border-hanbit-border text-hanbit-forest text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5 text-hanbit-gold" />
                    <span>Full Specs</span>
                  </button>

                  {onToggleCompare && (
                    <button
                      onClick={() => onToggleCompare(activeProduct)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 ${
                        isCompared
                          ? 'bg-hanbit-gold text-hanbit-dark border-hanbit-gold'
                          : 'bg-white border-hanbit-border text-hanbit-muted hover:text-hanbit-forest'
                      }`}
                      title={isCompared ? 'Remove from compare' : 'Add to compare'}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Play,
  Pause,
  Award,
  Eye,
  MessageSquare,
  Activity
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/siteData';
import { getOptimizedImageUrl } from '../utils/imageUrl';

// Brisk auto-slide interval (2.4s per slide)
const AUTO_SLIDE_INTERVAL = 2400; 

// Product-specific ambient color themes matching each product aesthetic
const PRODUCT_THEMES = {
  'p-jade-bracelet': {
    bgGradient: 'from-emerald-100/80 via-teal-50/50 to-emerald-200/60',
    borderColor: 'border-emerald-300/70',
    glowColor: 'bg-emerald-400/35',
    dotActive: 'bg-emerald-700',
    tagIcon: 'text-emerald-400'
  },
  'p-jade-necklace': {
    bgGradient: 'from-emerald-100/80 via-teal-50/60 to-emerald-200/60',
    borderColor: 'border-emerald-300/70',
    glowColor: 'bg-emerald-500/35',
    dotActive: 'bg-emerald-700',
    tagIcon: 'text-emerald-400'
  },
  'p-knee-joint-wrap': {
    bgGradient: 'from-cyan-100/80 via-sky-50/60 to-teal-100/60',
    borderColor: 'border-cyan-300/70',
    glowColor: 'bg-cyan-400/30',
    dotActive: 'bg-cyan-700',
    tagIcon: 'text-cyan-400'
  },
  'p-champion-belt': {
    bgGradient: 'from-amber-100/80 via-orange-50/50 to-amber-200/60',
    borderColor: 'border-amber-300/70',
    glowColor: 'bg-amber-400/35',
    dotActive: 'bg-amber-600',
    tagIcon: 'text-amber-400'
  },
  'p-bedro-controller': {
    bgGradient: 'from-blue-100/80 via-indigo-50/50 to-sky-100/70',
    borderColor: 'border-blue-300/70',
    glowColor: 'bg-blue-400/30',
    dotActive: 'bg-blue-600',
    tagIcon: 'text-blue-400'
  },
  'p-taeyangsuk-mini': {
    bgGradient: 'from-emerald-100/70 via-stone-50/60 to-teal-100/60',
    borderColor: 'border-emerald-300/60',
    glowColor: 'bg-teal-400/30',
    dotActive: 'bg-emerald-700',
    tagIcon: 'text-teal-400'
  },
  'p-taeyangsuk-plus': {
    bgGradient: 'from-amber-100/70 via-emerald-50/50 to-amber-200/60',
    borderColor: 'border-amber-300/60',
    glowColor: 'bg-amber-400/30',
    dotActive: 'bg-amber-600',
    tagIcon: 'text-amber-400'
  },
  'p-bedro-smart-1': {
    bgGradient: 'from-rose-100/80 via-red-50/50 to-stone-100/70',
    borderColor: 'border-rose-300/60',
    glowColor: 'bg-rose-400/30',
    dotActive: 'bg-rose-700',
    tagIcon: 'text-rose-400'
  }
};

const DEFAULT_THEME = {
  bgGradient: 'from-stone-50 via-white to-emerald-50/20',
  borderColor: 'border-stone-200/70',
  glowColor: 'bg-emerald-400/20',
  dotActive: 'bg-emerald-700',
  tagIcon: 'text-emerald-400'
};

export const HeroProductSlider = ({
  onSelectProduct,
  onSelectForQuote,
  onExploreAll
}) => {
  const { products: dynamicProducts } = useData();
  const rawProducts = (dynamicProducts && dynamicProducts.length > 0) ? dynamicProducts : FALLBACK_PRODUCTS;
  
  // Reverse the product sequence per user requirement
  const products = useMemo(() => {
    return [...rawProducts].reverse();
  }, [rawProducts]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isFading, setIsFading] = useState(false);

  // Safeguard currentIndex within bounds
  const validIndex = products.length > 0 ? (currentIndex % products.length + products.length) % products.length : 0;
  const currentProduct = products[validIndex] || products[0] || {};

  // Safe theme lookup for currently displayed product
  const currentTheme = useMemo(() => {
    return PRODUCT_THEMES[currentProduct?.id] || DEFAULT_THEME;
  }, [currentProduct?.id]);

  // Slide transition helper
  const changeSlide = useCallback((newIndexCalculator) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = typeof newIndexCalculator === 'function' ? newIndexCalculator(prev) : newIndexCalculator;
        return (next % products.length + products.length) % products.length;
      });
      setIsFading(false);
    }, 120);
  }, [products.length]);

  const handleNext = useCallback(() => {
    changeSlide((prev) => (prev + 1) % products.length);
  }, [changeSlide, products.length]);

  const handlePrev = useCallback(() => {
    changeSlide((prev) => (prev - 1 + products.length) % products.length);
  }, [changeSlide, products.length]);

  const handleGoTo = useCallback((idx) => {
    if (idx !== validIndex) {
      changeSlide(idx);
    }
  }, [changeSlide, validIndex]);

  // Faster infinite loop auto-slide timer
  useEffect(() => {
    if (products.length <= 1 || isManualPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [products.length, isManualPaused, handleNext]);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!products || products.length === 0) return null;

  return (
    <section
      id="featured-showcase"
      aria-label="Featured Medical Equipment Showcase"
      className="py-8 sm:py-12 lg:py-14 bg-gradient-to-b from-[#f8f6f0] via-[#f3efe4] to-[#ede7d8] border-b border-[#ded7c4]/80 relative overflow-hidden select-none w-full"
    >
      {/* Subtle ambient lighting decoration */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* FULL WIDTH CONTAINER */}
      <div className="w-full px-3 sm:px-6 lg:px-10 2xl:px-14 relative z-10">
        
        {/* Top Header Row with Title and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-serif font-bold text-hanbit-forest tracking-tight">
              Featured Therapeutic Equipment & Bio-Minerals
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm lg:text-base mt-1 max-w-3xl">
              Authentic Korean spinal traction beds, far-infrared tourmaline bio-mats, and targeted thermal therapy systems.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsManualPaused(!isManualPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-600 hover:text-stone-900 hover:border-stone-300 transition shadow-xs cursor-pointer"
              title={isManualPaused ? "Resume Autoplay" : "Pause Autoplay"}
            >
              {isManualPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Resume Auto-Slide</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                  <span>Pause</span>
                </>
              )}
            </button>

            {onExploreAll && (
              <button
                onClick={onExploreAll}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition shadow-xs hover:shadow-md cursor-pointer"
              >
                <span>View All ({products.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* FULL WIDTH Showcase Split Card Container */}
        <div
          className="w-full bg-white rounded-2xl lg:rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden relative transition-all duration-300"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top dynamic slide progress line */}
          <div className="w-full h-1 bg-stone-100 overflow-hidden">
            <div 
              key={validIndex}
              className={`h-full bg-gradient-to-r from-emerald-600 to-amber-500 transition-all ${!isManualPaused ? 'w-full duration-[2400ms] ease-linear' : 'w-full duration-0'}`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] lg:min-h-[500px]">

            {/* LEFT COLUMN: Product Details */}
            <div className={`lg:col-span-7 xl:col-span-7 p-6 sm:p-8 lg:p-10 xl:p-14 flex flex-col justify-between transition-opacity duration-150 ${isFading ? 'opacity-30' : 'opacity-100'}`}>
              <div>
                {/* Product Title in English */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-hanbit-forest tracking-tight leading-tight">
                  {currentProduct.name}
                </h3>

                {/* Korean Hangul Name */}
                {currentProduct.nameKo && (
                  <p className="text-amber-800 font-serif font-semibold text-sm sm:text-base mt-1.5">
                    <span>{currentProduct.nameKo}</span>
                  </p>
                )}

                {/* Product Short Description */}
                <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed mt-4 max-w-3xl">
                  {currentProduct.short || currentProduct.desc}
                </p>

                {/* Key Therapeutic Benefits Checklist */}
                {currentProduct.keyActives && currentProduct.keyActives.length > 0 && (
                  <div className="mt-5 space-y-2 pt-4 border-t border-stone-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-600" />
                      Key Therapeutic Capabilities
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                      {currentProduct.keyActives.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Actions & Slide Counter */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectProduct && onSelectProduct(currentProduct.id)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>View Clinical Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectForQuote && onSelectForQuote(currentProduct)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-900 font-semibold text-sm shadow-xs transition cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-700" />
                    <span>Inquire ({currentProduct.price || 'Quote'})</span>
                  </button>
                </div>

                {/* Slide index & indicator */}
                <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                  <span className="font-bold text-emerald-800 text-base">
                    {String(validIndex + 1).padStart(2, '0')}
                  </span>
                  <span>/</span>
                  <span>{String(products.length).padStart(2, '0')}</span>
                  {isManualPaused && (
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-sans font-medium">
                      Paused
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Dynamic Matching Product Theme Showcase */}
            <div className={`lg:col-span-5 xl:col-span-5 bg-gradient-to-br ${currentTheme.bgGradient} p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center relative border-t lg:border-t-0 lg:border-l ${currentTheme.borderColor} min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] transition-all duration-700 ease-in-out overflow-hidden`}>

              {/* Dynamic ambient color glow matching product */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full ${currentTheme.glowColor} blur-3xl pointer-events-none transition-all duration-700`} />

              {/* Floating Previous Button on the Left Edge of Product Image */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Product"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur shadow-lg border border-stone-200/90 text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer z-20 group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Floating Next Button on the Right Edge of Product Image */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Product"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur shadow-lg border border-stone-200/90 text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer z-20 group"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Centered High-Resolution Product Image with subtle zoom and click handler */}
              <div 
                className={`w-full max-w-lg flex flex-col items-center justify-center cursor-pointer group transition-opacity duration-150 relative z-10 ${isFading ? 'opacity-30' : 'opacity-100'}`}
                onClick={() => onSelectProduct && onSelectProduct(currentProduct.id)}
              >
                <div className="relative w-full flex items-center justify-center py-4 px-4 min-h-[260px] sm:min-h-[320px] lg:min-h-[360px]">
                  <img
                    src={getOptimizedImageUrl(currentProduct.imgUrl)}
                    alt={currentProduct.name}
                    className="max-h-[300px] sm:max-h-[360px] lg:max-h-[420px] w-auto max-w-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/products/bedro-smart-1-traction-bed.png';
                    }}
                  />
                </div>

                {/* Subtitle click-to-view tag matching user reference style */}
                <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900/80 backdrop-blur text-white text-[11px] sm:text-xs font-medium opacity-90 group-hover:opacity-100 transition shadow-sm">
                  <Eye className={`w-3.5 h-3.5 ${currentTheme.tagIcon}`} />
                  <span>Click to view {currentProduct.name}</span>
                </div>
              </div>

              {/* Bottom Dot and Pill Indicators matching screenshot */}
              <div className="flex items-center justify-center gap-2 mt-6 z-10">
                {products.map((p, idx) => {
                  const isActive = idx === validIndex;
                  return (
                    <button
                      key={p.id || idx}
                      type="button"
                      onClick={() => handleGoTo(idx)}
                      aria-label={`Go to slide ${idx + 1}: ${p.name}`}
                      className={`transition-all duration-300 cursor-pointer ${
                        isActive
                          ? `w-8 h-2.5 ${currentTheme.dotActive} rounded-full shadow-sm`
                          : 'w-2.5 h-2.5 bg-stone-300 hover:bg-stone-400 rounded-full'
                      }`}
                    />
                  );
                })}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

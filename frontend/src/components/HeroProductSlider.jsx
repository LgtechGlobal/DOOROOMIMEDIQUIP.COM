import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Sparkles,
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

const AUTO_SLIDE_INTERVAL = 4500; // 4.5 seconds per slide

export const HeroProductSlider = ({
  onSelectProduct,
  onSelectForQuote,
  onExploreAll
}) => {
  const { products: dynamicProducts } = useData();
  const products = (dynamicProducts && dynamicProducts.length > 0) ? dynamicProducts : FALLBACK_PRODUCTS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isFading, setIsFading] = useState(false);

  // Safeguard currentIndex within bounds
  const validIndex = products.length > 0 ? (currentIndex % products.length + products.length) % products.length : 0;
  const currentProduct = products[validIndex] || products[0] || {};

  // Slide transition helper
  const changeSlide = useCallback((newIndexCalculator) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = typeof newIndexCalculator === 'function' ? newIndexCalculator(prev) : newIndexCalculator;
        return (next % products.length + products.length) % products.length;
      });
      setIsFading(false);
    }, 150);
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

  // Infinite loop auto-slide timer
  useEffect(() => {
    if (products.length <= 1 || isHovered || isManualPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [products.length, isHovered, isManualPaused, handleNext]);

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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

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
      className="py-12 lg:py-16 bg-[#fbfbfa] border-b border-stone-200/80 relative overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle ambient lighting decoration */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Row with Title and View All Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold tracking-wide uppercase shadow-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>South Korean Medical Therapy Innovations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-hanbit-forest tracking-tight">
              Featured Therapeutic Equipment & Bio-Minerals
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-2xl">
              Authentic Korean spinal traction beds, far-infrared tourmaline bio-mats, and targeted thermal therapy systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsManualPaused(!isManualPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs font-medium text-stone-600 hover:text-stone-900 hover:border-stone-300 transition shadow-xs cursor-pointer"
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
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
              >
                <span>View All ({products.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Main Showcase Split Card Container */}
        <div
          className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden relative transition-all duration-300"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[480px]">

            {/* LEFT COLUMN: Product Details */}
            <div className={`lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between transition-opacity duration-200 ${isFading ? 'opacity-40' : 'opacity-100'}`}>
              <div>
                {/* Category & Model Pill Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                    {currentProduct.badge || currentProduct.catLabel || 'Korean Therapy'}
                  </span>
                  {currentProduct.model && (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-stone-100 text-stone-700 border border-stone-200">
                      Model: {currentProduct.model}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/70">
                    <ShieldCheck className="w-3 h-3 text-amber-700" />
                    MFDS Class II / ISO 13485
                  </span>
                </div>

                {/* Product Title in English */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-hanbit-forest tracking-tight leading-tight">
                  {currentProduct.name}
                </h3>

                {/* Korean Hangul Name */}
                {currentProduct.nameKo && (
                  <p className="text-amber-800 font-serif font-semibold text-sm sm:text-base mt-1 flex items-center gap-2">
                    <span>{currentProduct.nameKo}</span>
                    <span className="text-[11px] text-stone-400 font-sans font-normal">• Authentic Korean Medical Device</span>
                  </p>
                )}

                {/* Product Short Description */}
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mt-4">
                  {currentProduct.short || currentProduct.desc}
                </p>

                {/* Key Therapeutic Benefits Checklist */}
                {currentProduct.keyActives && currentProduct.keyActives.length > 0 && (
                  <div className="mt-5 space-y-2 pt-4 border-t border-stone-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-600" />
                      Key Therapeutic Capabilities
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {currentProduct.keyActives.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Actions & Slide Counter */}
              <div className="pt-8 mt-6 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectProduct && onSelectProduct(currentProduct.id)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>View Clinical Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectForQuote && onSelectForQuote(currentProduct)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-900 font-semibold text-sm shadow-xs transition cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-700" />
                    <span>Request Quote</span>
                  </button>
                </div>

                {/* Slide index & indicator */}
                <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                  <span className="font-bold text-emerald-800 text-sm">
                    {String(validIndex + 1).padStart(2, '0')}
                  </span>
                  <span>/</span>
                  <span>{String(products.length).padStart(2, '0')}</span>
                  {isHovered && (
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      Hover Paused
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Product Image Showcase with Side Arrows and Bottom Dot Indicator */}
            <div className="lg:col-span-6 bg-gradient-to-br from-stone-50 via-white to-emerald-50/20 p-6 sm:p-10 flex flex-col items-center justify-center relative border-t lg:border-t-0 lg:border-l border-stone-200/70 min-h-[380px] sm:min-h-[440px] lg:min-h-[500px]">

              {/* Floating Previous Button on the Left Edge of Product Image */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Product"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 backdrop-blur shadow-lg border border-stone-200/90 text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer z-20 group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Floating Next Button on the Right Edge of Product Image */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Product"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 backdrop-blur shadow-lg border border-stone-200/90 text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer z-20 group"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Centered High-Resolution Product Image with subtle zoom and click handler */}
              <div 
                className={`w-full max-w-md flex flex-col items-center justify-center cursor-pointer group transition-opacity duration-200 ${isFading ? 'opacity-30' : 'opacity-100'}`}
                onClick={() => onSelectProduct && onSelectProduct(currentProduct.id)}
              >
                <div className="relative w-full flex items-center justify-center py-4 px-2">
                  <img
                    src={getOptimizedImageUrl(currentProduct.imgUrl)}
                    alt={currentProduct.name}
                    className="max-h-[280px] sm:max-h-[340px] lg:max-h-[380px] w-auto max-w-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/products/bedro-smart-1-traction-bed.png';
                    }}
                  />
                </div>

                {/* Subtitle click-to-view tag matching user reference style */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-900/80 backdrop-blur text-white text-[11px] font-medium opacity-90 group-hover:opacity-100 transition shadow-sm">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
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
                          ? 'w-8 h-2.5 bg-emerald-700 rounded-full shadow-sm'
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

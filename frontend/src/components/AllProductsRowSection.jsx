import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronsLeft, 
  ChevronsRight, 
  ChevronLeft,
  ChevronRight,
  ArrowRight, 
  Play, 
  Pause, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  Activity, 
  Sparkles 
} from 'lucide-react';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/siteData';
import { useData } from '../context/DataContext';
import { getOptimizedImageUrl } from '../utils/imageUrl';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'flagship', label: 'Flagship Medical' },
  { id: 'biominerals', label: 'Bio-Minerals' },
  { id: 'thermal', label: 'Thermal Projectors' },
  { id: 'accessories', label: 'Accessories' },
];

export const AllProductsRowSection = ({ onSelectProduct, onSelectForQuote, onNavigateGallery }) => {
  const { products: dynamicProducts } = useData();
  const productsList = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : FALLBACK_PRODUCTS;

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const cardContainerRef = useRef(null);
  const cardRefs = useRef([]);

  // Filter products by category
  const filteredProducts = React.useMemo(() => {
    if (activeCategory === 'all') return productsList;
    if (activeCategory === 'flagship') {
      return productsList.filter(p => 
        p.cat === 'series-c' || 
        p.model?.includes('MED') || 
        p.model?.includes('C') || 
        p.name?.toLowerCase().includes('bedro') || 
        p.badge?.toLowerCase().includes('flagship')
      );
    }
    if (activeCategory === 'biominerals') {
      return productsList.filter(p => 
        p.cat === 'series-b' || 
        p.model?.includes('B') || 
        p.name?.toLowerCase().includes('mineral') || 
        p.name?.toLowerCase().includes('mat')
      );
    }
    if (activeCategory === 'thermal') {
      return productsList.filter(p => 
        p.name?.toLowerCase().includes('projector') || 
        p.name?.toLowerCase().includes('thermal') || 
        p.name?.toLowerCase().includes('wave') || 
        p.desc?.toLowerCase().includes('projector') ||
        p.desc?.toLowerCase().includes('thermal')
      );
    }
    if (activeCategory === 'accessories') {
      return productsList.filter(p => 
        p.cat === 'series-a' || 
        p.model?.includes('A') || 
        p.name?.toLowerCase().includes('toner') || 
        p.name?.toLowerCase().includes('dispenser') || 
        p.name?.toLowerCase().includes('flacon') ||
        p.name?.toLowerCase().includes('cream')
      );
    }
    return productsList;
  }, [productsList, activeCategory]);

  // Ensure safe index within current filtered list
  const currentList = filteredProducts.length > 0 ? filteredProducts : productsList;
  const count = currentList.length;
  const safeIndex = selectedIndex < count ? selectedIndex : 0;

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % currentList.length);
  }, [currentList.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + currentList.length) % currentList.length);
  }, [currentList.length]);

  // Smooth auto-slide: automatic continuous cycling every 3.8s (paused when hovered)
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3800);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, handleNext]);

  // Smoothly center the active card in the horizontal strip
  useEffect(() => {
    const activeCard = cardRefs.current[safeIndex];
    const container = cardContainerRef.current;
    if (activeCard && container) {
      const targetScroll = activeCard.offsetLeft - container.offsetWidth / 2 + activeCard.offsetWidth / 2;
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  }, [safeIndex]);

  // Scroll cards left / right
  const scrollCards = (direction) => {
    if (!cardContainerRef.current) return;
    const scrollAmount = 300;
    cardContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section 
      id="all-products-showroom" 
      className="relative w-full overflow-hidden bg-[#fafbfc] py-10 sm:py-16 select-none border-b border-neutral-200/60"
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 flex flex-col">
        
        {/* ============================================================== */}
        {/* TOP SECTION: HEADER & ONE BIG PRODUCT IMAGE SHOWCASE CAROUSEL */}
        {/* ============================================================== */}
        
        {/* Header Bar: Heading, Subtitle, Badges & Auto-Slide Indicator */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            {/* Top Pill / Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[11px] font-extrabold text-sky-600 uppercase tracking-widest font-mono">
                DOOROOMI SERIES
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0d221b] tracking-tight font-serif leading-[1.2]">
              Certified Medical Systems &amp; Therapy Formulations.
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed">
              Explore our precision therapeutic devices and clinical bio-active series engineered under ISO 22716 &amp; Korea CGMP standards.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 shrink-0">
            {/* 4 Feature Badges Row */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-neutral-600 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-[11px]">ISO 22716 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-[11px]">Korea CGMP</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-[11px]">Class II Med Device</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-[11px]">Exporting 51+ Countries</span>
              </div>
            </div>

            {/* Auto-Slide Indicator Pill */}
            <div className="flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-full border border-neutral-200/90 shadow-2xs self-start sm:self-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-neutral-700 hover:text-sky-600 transition-colors cursor-pointer"
                title={isPlaying ? 'Click to pause automatic slide' : 'Click to resume automatic slide'}
              >
                {isPlaying ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Auto Slide</span>
                    <Pause className="w-2.5 h-2.5 opacity-60 ml-0.5" />
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Paused</span>
                    <Play className="w-2.5 h-2.5 opacity-60 ml-0.5" />
                  </>
                )}
              </button>
              <span className="text-neutral-300">|</span>
              <span className="font-mono text-xs text-neutral-400 font-semibold">
                <span className="text-sky-700 font-bold">{String(safeIndex + 1).padStart(2, '0')}</span>
                <span className="mx-0.5">/</span>
                <span>{String(currentList.length).padStart(2, '0')}</span>
              </span>
            </div>
          </div>
        </div>

        {/* ONE BIG PRODUCT IMAGE SHOWCASE WITH BUTTERY-SMOOTH AUTO SLIDE */}
        <div 
          className="relative w-full mb-8 sm:mb-12 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative bg-gradient-to-br from-sky-50/50 via-white to-blue-50/30 rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-sky-100/90 shadow-sm shadow-sky-950/5 hover:shadow-2xl hover:border-sky-300 transition-all duration-500 overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
            
            {/* Soft Ambient Glow & Circular Floor Pedestal */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 sm:w-[500px] lg:w-[650px] h-80 sm:h-[500px] lg:h-[650px] rounded-full bg-gradient-to-b from-sky-100/50 via-blue-50/30 to-transparent blur-3xl group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-6 w-64 sm:w-[420px] lg:w-[560px] h-9 bg-sky-950/10 blur-xl rounded-[100%]" />
            </div>

            {/* Sliding Carousel Track (Buttery Smooth 700ms Deceleration) */}
            <div 
              className="w-full flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${safeIndex * 100}%)` }}
            >
              {currentList.map((prod, idx) => {
                const isActive = idx === safeIndex;
                return (
                  <div
                    key={prod.id || idx}
                    className="w-full shrink-0 flex items-center justify-center cursor-pointer select-none"
                    onClick={() => onSelectProduct && onSelectProduct(prod.id)}
                    title={`Click to view ${prod.name}`}
                  >
                    <img
                      src={getOptimizedImageUrl(prod.imgUrl, { width: 1400 })}
                      alt={prod.name}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      className={`relative z-10 max-h-[300px] sm:max-h-[390px] lg:max-h-[460px] w-auto max-w-[92%] sm:max-w-[85%] object-contain mix-blend-multiply drop-shadow-md select-none transition-all duration-500 ${
                        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-40 blur-[0.5px]'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Floating Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous Product Image"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-sky-600 border border-neutral-200/90 shadow-lg flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next Product Image"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-sky-600 border border-neutral-200/90 shadow-lg flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Smooth Pagination Dots Indicator */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-100 shadow-sm">
              {currentList.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(dotIdx);
                  }}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    dotIdx === safeIndex
                      ? 'w-7 h-2 bg-sky-600 shadow-xs'
                      : 'w-2 h-2 bg-neutral-300 hover:bg-sky-400'
                  }`}
                  aria-label={`Go to product image ${dotIdx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM SECTION: CATEGORY TABS & HORIZONTAL PRODUCT CARDS ROW   */}
        {/* ============================================================== */}
        <div className="relative pt-6 border-t border-neutral-200">
          
          {/* Header Bar: '• Our Products' + Category Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
            
            {/* Title with Blue Dot */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                Our Products
              </h3>
            </div>

            {/* Filter Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSelectedIndex(0);
                    }}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                        : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200/80'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Cards Carousel Strip with Prev / Next Arrow Buttons */}
          <div className="relative mt-2">
            
            {/* Left Chevron Button */}
            <button
              onClick={() => scrollCards('left')}
              aria-label="Scroll left"
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-md hover:bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-sky-600 transition-colors cursor-pointer hidden md:flex"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Horizontal Cards Scrollable Container */}
            <div
              ref={cardContainerRef}
              className="flex items-stretch gap-4 overflow-x-auto py-3 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {currentList.map((prod, idx) => {
                const isSelected = idx === safeIndex;
                return (
                  <div
                    key={prod.id || idx}
                    ref={(el) => (cardRefs.current[idx] = el)}
                    onClick={() => setSelectedIndex(idx)}
                    className={`shrink-0 w-[210px] sm:w-[225px] bg-white rounded-2xl border p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between group relative select-none ${
                      isSelected
                        ? 'border-sky-500 shadow-xl shadow-sky-500/10 ring-2 ring-sky-500/30 bg-sky-50/15'
                        : 'border-neutral-200/90 hover:border-neutral-300 hover:shadow-md'
                    }`}
                  >
                    {/* Top Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 group-hover:bg-sky-50 group-hover:text-sky-700 transition-colors">
                        {prod.badge || 'MEDICAL GRADE'}
                      </span>
                    </div>

                    {/* Centered Thumbnail Image */}
                    <div className="h-28 w-full flex items-center justify-center p-2 mb-3 bg-neutral-50/60 rounded-xl group-hover:bg-neutral-50 transition-colors">
                      <img
                        src={getOptimizedImageUrl(prod.imgUrl, { width: 320 })}
                        alt={prod.name}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>

                    {/* SKU & Title Information */}
                    <div>
                      <span className="font-mono text-[10px] text-neutral-400 block mb-0.5">
                        {prod.model}
                      </span>
                      <h4 className="text-xs font-bold text-neutral-900 line-clamp-1 group-hover:text-sky-600 transition-colors font-serif">
                        {prod.name}
                      </h4>
                      <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                        {prod.short || prod.nameKo}
                      </p>
                    </div>

                    {/* Bottom 'View Details →' Action */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectProduct) onSelectProduct(prod.id);
                      }}
                      className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] font-semibold text-neutral-500 group-hover:text-sky-600 transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Right Chevron Button */}
            <button
              onClick={() => scrollCards('right')}
              aria-label="Scroll right"
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-md hover:bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-sky-600 transition-colors cursor-pointer hidden md:flex"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronsLeft, 
  ChevronsRight, 
  ArrowRight, 
  ArrowUpRight, 
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
  const safeIndex = selectedIndex < currentList.length ? selectedIndex : 0;
  const activeProduct = currentList[safeIndex] || currentList[0];

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % currentList.length);
  }, [currentList.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + currentList.length) % currentList.length);
  }, [currentList.length]);

  // Smooth auto-cycle: pauses on hover or when user paused it
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5500);

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

  // Helper to get 4 key features for the active hero product
  const getProductFeatures = (prod) => {
    if (!prod) return [];
    if (Array.isArray(prod.keyActives) && prod.keyActives.length >= 3) {
      return prod.keyActives.slice(0, 4);
    }
    if (typeof prod.keyActives === 'string' && prod.keyActives.length > 5) {
      const parts = prod.keyActives.split(',').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 3) return parts.slice(0, 4);
    }
    return [
      'Full-Spine Far-Infrared Therapy',
      'Korea MFDS & ISO 22716 Certified',
      'Taeyangsuk Mineral Sintered Matrix',
      '100% Pure Electromagnetic Shielding'
    ];
  };

  const featureList = getProductFeatures(activeProduct);

  return (
    <section 
      id="all-products-showroom" 
      className="relative w-full overflow-hidden bg-[#fafbfc] py-10 sm:py-16 select-none border-b border-neutral-200/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 flex flex-col">
        
        {/* ============================================================== */}
        {/* TOP SECTION: 2-COLUMN SPLIT HERO SHOWCASE                      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-14">
          
          {/* Left Column: Heading, Subtitle & Certification Badges */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
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
            <p className="mt-3.5 text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed max-w-lg">
              Explore our precision therapeutic devices and clinical bio-active series engineered under ISO 22716 &amp; Korea CGMP standards.
            </p>

            {/* 4 Feature Badges Row */}
            <div className="mt-6 pt-6 border-t border-neutral-200/70 grid grid-cols-2 gap-3 text-xs text-neutral-600 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-[11px] sm:text-xs">ISO 22716 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-[11px] sm:text-xs">Korea CGMP</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-[11px] sm:text-xs">Class II Med Device</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-[11px] sm:text-xs">Exporting 51+ Countries</span>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Product Card on Soft Pedestal */}
          <div className="lg:col-span-7">
            <div className="relative bg-gradient-to-br from-sky-50/50 via-white to-blue-50/30 rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm shadow-sky-950/5 overflow-hidden transition-all duration-300">
              
              {/* Card Top Meta Bar: SKU badge & Pagination Controls */}
              <div className="flex items-center justify-between pb-3 border-b border-sky-100/80 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/70 text-sky-700 text-xs font-bold font-mono tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                  <span>{activeProduct.model || 'DM-MED01'}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Play / Pause Toggle */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200 transition-colors cursor-pointer"
                    title={isPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
                  >
                    {isPlaying && !isHovered ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="hidden sm:inline">Auto</span>
                        <Pause className="w-2.5 h-2.5 opacity-60" />
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="hidden sm:inline">Paused</span>
                        <Play className="w-2.5 h-2.5 opacity-60" />
                      </>
                    )}
                  </button>

                  {/* Counter */}
                  <span className="font-mono text-xs text-neutral-400 font-semibold">
                    <span className="text-sky-700 font-bold">{String(safeIndex + 1).padStart(2, '0')}</span>
                    <span className="mx-1">/</span>
                    <span>{String(currentList.length).padStart(2, '0')}</span>
                  </span>
                </div>
              </div>

              {/* Card Inner Grid: Left Details & Right Product Image on Pedestal */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Details Column */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif leading-snug">
                      {activeProduct.name}
                    </h3>
                    {activeProduct.nameKo && (
                      <p className="text-xs text-neutral-400 font-medium mt-1">
                        ({activeProduct.nameKo})
                      </p>
                    )}
                  </div>

                  {/* 4 Key Advantages with Blue Shields */}
                  <div className="space-y-2 py-1">
                    {featureList.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-700 font-medium">
                        <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => onSelectProduct && onSelectProduct(activeProduct.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-md shadow-sky-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (onSelectForQuote) {
                          onSelectForQuote(activeProduct);
                        } else if (onSelectProduct) {
                          onSelectProduct(activeProduct.id);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-700 font-medium text-xs transition-colors cursor-pointer"
                    >
                      <span>View Certification</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  </div>

                </div>

                {/* Image on 3D Pedestal Column */}
                <div className="md:col-span-5 relative flex items-center justify-center min-h-[220px]">
                  
                  {/* Soft 3D Glow & Floor Circular Pedestal */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-sky-100/70 via-blue-50/50 to-transparent blur-xl" />
                    <div className="absolute bottom-2 w-40 h-7 bg-sky-950/10 blur-md rounded-[100%]" />
                  </div>

                  {/* High-Res Product Image */}
                  <img
                    key={activeProduct.id}
                    src={getOptimizedImageUrl(activeProduct.imgUrl, { width: 600 })}
                    alt={activeProduct.name}
                    className="relative z-10 max-h-[170px] sm:max-h-[210px] w-auto object-contain mix-blend-multiply cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => onSelectProduct && onSelectProduct(activeProduct.id)}
                  />
                </div>

              </div>

            </div>
          </div>

        </div>


        {/* ============================================================== */}
        {/* BOTTOM SECTION: CATEGORY TABS & HORIZONTAL PRODUCT CARDS ROW   */}
        {/* ============================================================== */}
        <div className="relative pt-6 border-t border-neutral-200">
          
          {/* Header Bar: "• Our Products" + Category Filter Pills */}
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

                    {/* Bottom "View Details →" Action */}
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

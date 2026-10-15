import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeft, ChevronsRight, ArrowUpRight, Play, Pause } from 'lucide-react';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/siteData';
import { useData } from '../context/DataContext';

export const AllProductsRowSection = ({ onSelectProduct }) => {
  const { products: dynamicProducts } = useData();
  const productsList = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : FALLBACK_PRODUCTS;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const thumbnailRefs = useRef([]);
  const thumbContainerRef = useRef(null);

  const safeIndex = selectedIndex % productsList.length;
  const activeProduct = productsList[safeIndex] || productsList[0];

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % productsList.length);
  }, [productsList.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + productsList.length) % productsList.length);
  }, [productsList.length]);

  // Smooth, non-laggy auto-cycle: pauses on mouse hover or when manually paused
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, handleNext]);

  // Smoothly center the active thumbnail in the horizontal strip using offsetLeft (zero layout thrashing)
  useEffect(() => {
    const activeEl = thumbnailRefs.current[selectedIndex];
    const container = thumbContainerRef.current;
    if (activeEl && container) {
      const targetScroll = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  const changeProduct = (newIndex) => {
    setSelectedIndex(newIndex);
  };

  return (
    <section 
      id="all-products-showroom" 
      className="relative w-full overflow-hidden bg-white py-8 sm:py-12 select-none border-b border-hanbit-border/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 flex flex-col justify-between">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-hanbit-ivory border border-hanbit-gold/30 text-xs font-semibold text-hanbit-forest shadow-2xs mb-3">
            <span className="w-2 h-2 rounded-full bg-hanbit-gold animate-pulse" />
            <span className="font-mono text-hanbit-gold font-bold">두루미 메디큅 쇼룸</span>
            <span className="text-hanbit-border">|</span>
            <span className="tracking-wider uppercase text-[11px]">All Products & Medical Equipment</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hanbit-forest tracking-tight font-serif leading-tight">
            Certified Medical Systems & Bio-Cosmetic Formulations.
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-hanbit-muted font-light leading-relaxed max-w-2xl mx-auto">
            Explore our precision therapeutic devices and clinical bio-active series engineered under ISO 22716 & Korea CGMP standards.
          </p>
        </div>

        {/* Minimal Product Meta Row with Live Loop Pulse and Progress Bar */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 px-2 border-b border-neutral-100 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-[#9b724c]">
              {activeProduct.model}
            </span>
            <span className="text-neutral-300">·</span>
            <span className="font-semibold text-hanbit-forest font-serif truncate max-w-[200px] sm:max-w-xs">
              {activeProduct.name}
            </span>
            <span className="text-[11px] text-neutral-400 font-mono hidden md:inline">
              ({activeProduct.nameKo})
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Progress Bar Timer */}
            <div className="w-14 sm:w-20 h-1 bg-neutral-100 rounded-full overflow-hidden hidden sm:block">
              {isPlaying && !isHovered && (
                <div 
                  key={selectedIndex}
                  className="h-full bg-[#9b724c] rounded-full"
                  style={{
                    animation: 'growWidth 5s linear'
                  }}
                />
              )}
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60 transition-colors cursor-pointer"
              title={isPlaying ? "Click to pause auto-cycle" : "Click to resume auto-cycle"}
            >
              {isPlaying && !isHovered ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Auto Loop</span>
                  <Pause className="w-2.5 h-2.5 ml-0.5 opacity-60" />
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Paused</span>
                  <Play className="w-2.5 h-2.5 ml-0.5 opacity-60" />
                </>
              )}
            </button>

            <span className="font-mono text-[11px] text-neutral-400">
              <span className="font-bold text-hanbit-forest">{String(selectedIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1">/</span>
              <span>{String(productsList.length).padStart(2, '0')}</span>
            </span>
          </div>
        </div>

        {/* Center Stage: Seamless Product Presentation with "Check the detail" Button */}
        <div className="relative flex items-center justify-center my-4 sm:my-6 min-h-[220px] sm:min-h-[270px]">
          
          {/* Main Hero Product Stage */}
          <div className="relative flex flex-col items-center justify-center max-w-lg w-full px-4">
            
            {/* Real Product Image with Hardware Acceleration */}
            <div 
              key={activeProduct.id}
              className="relative z-10 flex items-center justify-center transform-gpu transition-opacity duration-300"
            >
              <img
                src={activeProduct.imgUrl}
                alt={activeProduct.name}
                decoding="async"
                className="max-h-[160px] sm:max-h-[210px] md:max-h-[250px] w-auto object-contain mix-blend-multiply cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => onSelectProduct(activeProduct.id)}
              />
            </div>

            {/* Soft 3D Floor Shadow */}
            <div className="w-2/3 max-w-[280px] h-3.5 bg-black/10 blur-md rounded-[100%] mx-auto -mt-1 pointer-events-none" />
          </div>

          {/* Right Floating "Check the detail ↗" Button */}
          <div className="absolute right-0 sm:right-6 lg:right-12 bottom-2 sm:bottom-1/4 z-20">
            <button
              onClick={() => onSelectProduct(activeProduct.id)}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#e8d8c8] hover:border-[#b8956c] shadow-2xs hover:shadow-sm transition-all duration-200 group cursor-pointer"
            >
              <span className="text-xs sm:text-sm font-medium text-[#9b724c] tracking-wide whitespace-nowrap">
                Check the detail
              </span>
              <span className="w-6 h-6 rounded-full bg-neutral-100 group-hover:bg-[#9b724c] text-neutral-600 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

        </div>

        {/* Bottom Horizon: Double Chevrons & Seamless Product Thumbnails Strip */}
        <div className="relative pt-4 sm:pt-6 border-t border-neutral-100 mt-2">
          <div className="flex items-center justify-between gap-2 sm:gap-4 relative z-10">
            
            {/* Left Double Chevron Button « */}
            <button
              onClick={handlePrev}
              aria-label="Previous product"
              className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center text-neutral-400 hover:text-hanbit-forest hover:scale-110 transition-all duration-150 cursor-pointer"
            >
              <ChevronsLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.4]" />
            </button>

            {/* Thumbnail Strip (Smooth horizontal scrolling without layout jitter) */}
            <div
              ref={thumbContainerRef}
              className="flex-1 flex items-center justify-start gap-3 sm:gap-6 lg:gap-8 overflow-x-auto py-2 px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {productsList.map((prod, idx) => {
                const isSelected = idx === safeIndex;
                return (
                  <button
                    key={prod.id}
                    ref={(el) => (thumbnailRefs.current[idx] = el)}
                    onClick={() => changeProduct(idx)}
                    className={`shrink-0 flex flex-col items-center justify-center transition-transform duration-200 cursor-pointer group py-1 px-1 bg-transparent transform-gpu ${
                      isSelected
                        ? 'scale-110 opacity-100'
                        : 'opacity-40 hover:opacity-85 hover:scale-105'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="w-12 h-10 sm:w-16 sm:h-13 lg:w-18 lg:h-14 flex items-center justify-center bg-transparent">
                      <img
                        src={prod.imgUrl}
                        alt={prod.name}
                        loading="lazy"
                        decoding="async"
                        className={`max-w-full max-h-full object-contain mix-blend-multiply transition-all duration-200 ${
                          isSelected 
                            ? 'drop-shadow-[0_2px_4px_rgba(155,114,76,0.3)]' 
                            : ''
                        }`}
                      />
                    </div>

                    {/* Active Indicator underneath selected thumbnail */}
                    {isSelected && (
                      <span className="w-5 sm:w-6 h-[2px] bg-[#9b724c] rounded-full mt-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Double Chevron Button » */}
            <button
              onClick={handleNext}
              aria-label="Next product"
              className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center text-neutral-400 hover:text-hanbit-forest hover:scale-110 transition-all duration-150 cursor-pointer"
            >
              <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.4]" />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

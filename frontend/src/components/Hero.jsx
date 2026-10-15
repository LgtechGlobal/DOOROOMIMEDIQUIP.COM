import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Shield, Sparkles, Award } from 'lucide-react';

export const Hero = ({ onExploreProducts, onRequestQuote }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      eyebrow: "Bio-Fermentation & Active Extraction",
      title: "Precision Bio-Formulation, Proven by Rigorous Testing.",
      subtitle: "Pioneering cellular-level Korean skincare since 1998. Every botanical essence and peptide formulation is verified through our 5-stage clinical testing pipeline.",
      badge: "ISO 22716 & CGMP Certified",
      heroImage: "./assets/products/product-real-01.jpeg",
      tag: "Series A · Botanical Bio-Actives",
    },
    {
      id: 2,
      eyebrow: "Cellular Longevity & Clinical Actives",
      title: "Crafted in Korea with Scientific Rigor & Pure Care.",
      subtitle: "Patented ultrasonic liposomal encapsulation delivers high-purity PDRN, NAD+ precursors, and triple-retinoids deep into the cutaneous dermal matrix.",
      badge: "Dermatest® 5-Star Excellent",
      heroImage: "./assets/products/product-real-06.jpeg",
      tag: "Series B · Cellular Longevity",
    },
    {
      id: 3,
      eyebrow: "Full Traceability & Cleanroom Production",
      title: "Documented from Cleanroom Reactor to Global Delivery.",
      subtitle: "Complete lot traceability, 30-day accelerated climate stress evaluation, and full export compliance for US MoCRA and European CPNP standards.",
      badge: "Global Export · 36 Nations",
      heroImage: "./assets/products/product-real-13.jpeg",
      tag: "Series C · Eco-Precision Packaging",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  return (
    <section className="relative bg-gradient-to-b from-hanbit-dark via-hanbit-forest to-[#0d1f16] text-white overflow-hidden min-h-[640px] lg:min-h-[760px] flex items-center">
      {/* Ambient background glow & grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#dfbe7e_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-hanbit-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Slide Carousel Track */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slide Tag / Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-hanbit-gold" />
              <span className="font-semibold tracking-wide uppercase text-[11px]">
                {slides[currentSlide].eyebrow}
              </span>
            </div>

            {/* Title with smooth key animation */}
            <h1 
              key={`title-${currentSlide}`}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.15] animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              {slides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p 
              key={`sub-${currentSlide}`}
              className="text-base sm:text-lg text-emerald-100/85 max-w-2xl leading-relaxed font-light animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100"
            >
              {slides[currentSlide].subtitle}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProducts}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-hanbit-gold to-amber-500 text-hanbit-dark font-bold text-sm hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-hanbit-gold/25 hover:shadow-hanbit-gold/40 transform hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onRequestQuote}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-medium text-sm hover:border-white/40 transition-all inline-flex items-center gap-2"
              >
                <span>Request Clinical Dossier</span>
              </button>
            </div>

            {/* Quality Seals banner */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-emerald-200/70">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-hanbit-gold" />
                <span>CGMP Verified Batch Safety</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-hanbit-gold" />
                <span>30-Day Accelerated Testing Standard</span>
              </span>
            </div>
          </div>

          {/* Right Visual Image Column with 3 Floating Cards & 3D Stack */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* 3D Stacked Background Card Layer 2 */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 shadow-lg transform -rotate-3 scale-[0.92] translate-y-5 pointer-events-none z-0" />
            
            {/* 3D Stacked Background Card Layer 1 */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/15 shadow-xl transform rotate-2 scale-[0.96] translate-y-2.5 pointer-events-none z-0" />

            {/* Floating Card 1 (Top-Right / Side) */}
            {(() => {
              const other1 = slides[(currentSlide + 1) % slides.length];
              return (
                <div
                  onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
                  className="absolute -top-7 -right-3 sm:-right-7 z-30 animate-float-slow cursor-pointer group/float1"
                  title={`Switch to ${other1.tag}`}
                >
                  <div className="px-3.5 py-2.5 rounded-2xl bg-hanbit-dark/95 backdrop-blur-xl border border-hanbit-gold/50 shadow-2xl hover:border-hanbit-gold hover:scale-105 transition-all flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={other1.heroImage}
                        alt={other1.tag}
                        className="w-full h-full object-contain filter drop-shadow-sm group-hover/float1:scale-110 transition-transform"
                      />
                    </div>
                    <div className="text-left pr-1">
                      <div className="flex items-center gap-1 text-[10px] text-hanbit-gold font-bold uppercase tracking-wider">
                        <Sparkles className="w-2.5 h-2.5 text-hanbit-gold" />
                        <span>{other1.badge}</span>
                      </div>
                      <p className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                        {other1.tag.split('·')[1]?.trim() || other1.tag}
                      </p>
                      <span className="text-[10px] text-emerald-300/80 font-medium">Click to switch</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Floating Card 2 (Bottom-Left / Side) */}
            {(() => {
              const other2 = slides[(currentSlide + 2) % slides.length];
              return (
                <div
                  onClick={() => setCurrentSlide((currentSlide + 2) % slides.length)}
                  className="absolute -bottom-7 -left-3 sm:-left-7 z-30 animate-float-reverse cursor-pointer group/float2"
                  title={`Switch to ${other2.tag}`}
                >
                  <div className="px-3.5 py-2.5 rounded-2xl bg-hanbit-dark/95 backdrop-blur-xl border border-emerald-500/40 shadow-2xl hover:border-emerald-400 hover:scale-105 transition-all flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={other2.heroImage}
                        alt={other2.tag}
                        className="w-full h-full object-contain filter drop-shadow-sm group-hover/float2:scale-110 transition-transform"
                      />
                    </div>
                    <div className="text-left pr-1">
                      <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{other2.badge}</span>
                      </div>
                      <p className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                        {other2.tag.split('·')[1]?.trim() || other2.tag}
                      </p>
                      <span className="text-[10px] text-emerald-300/80 font-medium">Click to switch</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Floating Card 3 (Middle-Right / Side Guarantee Seal) */}
            <div 
              className="absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 z-20 hidden md:flex animate-float-slow pointer-events-none" 
              style={{ animationDelay: '2s' }}
            >
              <div className="px-3 py-2 rounded-xl bg-emerald-950/95 backdrop-blur-md border border-hanbit-gold/40 shadow-xl flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-hanbit-gold/20 flex items-center justify-center text-hanbit-gold">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left pr-1">
                  <span className="text-[9px] text-hanbit-gold font-bold uppercase tracking-wider block">Korea CGMP</span>
                  <span className="text-[11px] font-bold text-white block leading-none">100% Verified</span>
                </div>
              </div>
            </div>

            {/* Main Active Card */}
            <div 
              key={`img-${currentSlide}`}
              className="relative z-10 mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 border border-white/20 shadow-2xl p-6 lg:p-8 backdrop-blur-md animate-in fade-in zoom-in-95 duration-500"
            >
              {/* Product Badge Pill */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-hanbit-dark/80 backdrop-blur-md border border-hanbit-gold/40 text-[11px] font-bold text-amber-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{slides[currentSlide].badge}</span>
              </div>

              {/* Main Illustration Image */}
              <div className="relative aspect-[4/3] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-emerald-950/40">
                <img 
                  src={slides[currentSlide].heroImage} 
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Bottom Card Annotation */}
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-emerald-100 font-medium">
                  {slides[currentSlide].tag}
                </span>
                <span className="text-hanbit-gold font-bold text-[11px]">
                  0{currentSlide + 1} / 0{slides.length}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel controls bar at bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
          {/* Slide dots with progress animation */}
          <div className="flex items-center space-x-3">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`group relative h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-10 bg-hanbit-gold' : 'w-2.5 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {currentSlide === idx && isPlaying && (
                  <span className="absolute inset-0 rounded-full bg-amber-200 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

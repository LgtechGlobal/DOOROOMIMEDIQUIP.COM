import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Shield, Sparkles, Award } from 'lucide-react';

export const Hero = ({ onExploreProducts, onRequestQuote }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      eyebrow: "Flagship Medical System · South Korea",
      title: "BEDRO Smart-1 Thermal Acupressure System.",
      subtitle: "Automatic spinal thermal massage bed with internal ergonomic acupressure projectors, far-infrared moxibustion (40°C–70°C), and vertebral disc traction.",
      badge: "FDA & CE Approved Class II",
      heroImage: "/assets/therapy/therapy-bedro-smart1-page10.png",
      tag: "Flagship Spinal Acupressure Bed",
    },
    {
      id: 2,
      eyebrow: "Bio-Mineralogy & Whole-Body FIR Therapy",
      title: "TAEYANGSUK PLUS Bio-Mineral Thermal Mat.",
      subtitle: "Dense 7-mineral ceramic matrix emitting deep far-infrared heat, 12,000 Gauss alternating magnetism (50–60Hz), and Bio-Wave pain-relief neuromodulation.",
      badge: "12,000 Gauss Magnetic Induction",
      heroImage: "/assets/therapy/therapy-taeyangsuk-mat-page11.png",
      tag: "Whole-Body Bio-Mineral Mat",
    },
    {
      id: 3,
      eyebrow: "Orthopedic Lumbar & Blood Induction",
      title: "DOOROOMI Champion Lumbar Support Belt.",
      subtitle: "Ergonomic sacroiliac stabilization with integrated tourmaline discs for targeted disc decompression, nerve relief, and active micro-circulation.",
      badge: "ISO 13485 Medical Device",
      heroImage: "/assets/therapy/therapy-champion-belt-page12.png",
      tag: "Targeted Lumbar Spinal Belt",
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
    <section className="relative bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1] text-slate-900 overflow-hidden min-h-[640px] lg:min-h-[760px] flex items-center border-b border-slate-300/80">
      {/* Ambient background glow & grid */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/80 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-slate-300/60 rounded-full blur-3xl pointer-events-none" />

      {/* Main Slide Carousel Track */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slide Tag / Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-300 text-xs font-semibold text-slate-800 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span className="font-semibold tracking-wide uppercase text-[11px]">
                {slides[currentSlide].eyebrow}
              </span>
            </div>

            {/* Title with smooth key animation */}
            <h1 
              key={`title-${currentSlide}`}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 font-serif leading-[1.15] animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              {slides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p 
              key={`sub-${currentSlide}`}
              className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed font-normal animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100"
            >
              {slides[currentSlide].subtitle}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProducts}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm shadow-lg shadow-red-700/25 transform hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Medical Equipment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onRequestQuote}
                className="px-6 py-3.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-slate-300 text-slate-800 font-semibold text-sm shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Experience Free Therapy</span>
              </button>
            </div>

            {/* Quality Seals banner */}
            <div className="pt-6 border-t border-slate-300 flex flex-wrap items-center gap-6 text-xs text-slate-700 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-red-600" />
                <span>ISO 13485 & CGMP Certified</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-red-600" />
                <span>15+ Free Therapy Centers in India</span>
              </span>
            </div>
          </div>

          {/* Right Visual Image Column with 3 Floating Cards & 3D Stack */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* 3D Stacked Background Card Layer 2 */}
            <div className="absolute inset-0 rounded-3xl bg-white/50 border border-slate-200 shadow-md transform -rotate-3 scale-[0.92] translate-y-5 pointer-events-none z-0" />
            
            {/* 3D Stacked Background Card Layer 1 */}
            <div className="absolute inset-0 rounded-3xl bg-white/70 border border-slate-200 shadow-lg transform rotate-2 scale-[0.96] translate-y-2.5 pointer-events-none z-0" />

            {/* Floating Card 1 (Top-Right / Side) */}
            {(() => {
              const other1 = slides[(currentSlide + 1) % slides.length];
              return (
                <div
                  onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
                  className="absolute -top-7 -right-3 sm:-right-7 z-30 animate-float-slow cursor-pointer group/float1"
                  title={`Switch to ${other1.tag}`}
                >
                  <div className="px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-300 shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={other1.heroImage}
                        alt={other1.tag}
                        className="w-full h-full object-contain filter drop-shadow-sm group-hover/float1:scale-110 transition-transform"
                      />
                    </div>
                    <div className="text-left pr-1">
                      <div className="flex items-center gap-1 text-[10px] text-red-600 font-bold uppercase tracking-wider">
                        <Sparkles className="w-2.5 h-2.5 text-hanbit-gold" />
                        <span>{other1.badge}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 line-clamp-1 mt-0.5">
                        {other1.tag.split('·')[1]?.trim() || other1.tag}
                      </p>
                      <span className="text-[10px] text-slate-500 font-medium">Click to switch</span>
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
                  <div className="px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-300 shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={other2.heroImage}
                        alt={other2.tag}
                        className="w-full h-full object-contain filter drop-shadow-sm group-hover/float2:scale-110 transition-transform"
                      />
                    </div>
                    <div className="text-left pr-1">
                      <div className="flex items-center gap-1 text-[10px] text-red-600 font-bold uppercase tracking-wider">
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
              <div className="px-3 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-300 shadow-xl flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-hanbit-gold/20 flex items-center justify-center text-hanbit-gold">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left pr-1">
                  <span className="text-[9px] text-amber-700 font-bold uppercase tracking-wider block">Korea CGMP</span>
                  <span className="text-[11px] font-bold text-slate-900 block leading-none">100% Verified</span>
                </div>
              </div>
            </div>

            {/* Main Active Card */}
            <div 
              key={`img-${currentSlide}`}
              className="relative z-10 mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden bg-white/95 border border-slate-300 shadow-2xl p-6 lg:p-8 backdrop-blur-md animate-in fade-in zoom-in-95 duration-500"
            >
              {/* Product Badge Pill */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{slides[currentSlide].badge}</span>
              </div>

              {/* Main Illustration Image */}
              <div className="relative aspect-[4/3] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/70 border border-slate-200/80">
                <img 
                  src={slides[currentSlide].heroImage} 
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Bottom Card Annotation */}
              <div className="mt-4 p-3 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-800 font-semibold">
                  {slides[currentSlide].tag}
                </span>
                <span className="text-red-700 font-bold text-[11px]">
                  0{currentSlide + 1} / 0{slides.length}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel controls bar at bottom */}
        <div className="mt-12 pt-6 border-t border-slate-300 flex items-center justify-between">
          {/* Slide dots with progress animation */}
          <div className="flex items-center space-x-3">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`group relative h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-10 bg-red-600' : 'w-2.5 bg-slate-400 hover:bg-slate-600'
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

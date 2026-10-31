import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Layers, 
  Droplets, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Building2,
  Globe2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ImageIcon
} from 'lucide-react';

const EXPLORE_IMAGES = [
  {
    id: "prillian-hydrating",
    src: "/assets/explore/prillian-hydrating-cream.jpeg",
    fallbackSrc: "/explore/prillian-hydrating-cream.jpeg",
    category: "body-care",
    title: "PRILLIAN Skin Delivery Hydrating Cream",
    koreanTitle: "프릴리안 스킨 딜리버리 하이드레이팅 크림",
    badge: "Trans-Dermal Hydration Care",
    desc: "Advanced trans-dermal hydration formula developed with natural fermented botanicals. Strengthens epidermal moisture retention, locks in hydration, and creates a soothing lipid barrier.",
    tag: "Hydrating & Barrier Repair"
  },
  {
    id: "prillian-reprogramming",
    src: "/assets/explore/prillian-reprogramming-cream.jpeg",
    fallbackSrc: "/explore/prillian-reprogramming-cream.jpeg",
    category: "body-care",
    title: "PRILLIAN Skin Delivery Reprogramming Cream",
    koreanTitle: "프릴리안 스킨 딜리버리 리프로그래밍 크림",
    badge: "Cellular Bio-Active Complex",
    desc: "Luxury bio-cosmetic cellular regeneration cream formulated in automated Class 1,000 CGMP cleanrooms. Targets deep dermal elasticity, firmness, and natural biological restoration.",
    tag: "Cellular Vitality & Firming"
  },
  {
    id: "prillian-reprogramming-gold",
    src: "/assets/explore/prillian-reprogramming-cream-gold.jpeg",
    fallbackSrc: "/explore/prillian-reprogramming-cream-gold.jpeg",
    category: "body-care",
    title: "PRILLIAN Reprogramming Cream — Gold Luxury Formulation",
    koreanTitle: "프릴리안 프리미엄 메디컬 뷰티 에디션",
    badge: "Clinical Medical Cosmetics",
    desc: "Clinical-grade personal formulation engineered with concentrated Korean herbal actives for soothing irritated skin barriers, replenishing nutrients, and sustaining whole-body skin vitality.",
    tag: "Premium Cleanroom Formula"
  },
  {
    id: "the-skin-uv-suncream-ocean",
    src: "/assets/explore/the-skin-uv-suncream-ocean.jpeg",
    fallbackSrc: "/explore/the-skin-uv-suncream-ocean.jpeg",
    category: "body-care",
    title: "THE SKIN UV Perfect Suncream SPF 50+ PA++++",
    koreanTitle: "더스킨 UV퍼펙트 썬크림 (SPF 50+ / PA++++)",
    badge: "SPF 50+ PA++++ Ultra Protection",
    desc: "Broad-spectrum ultraviolet defense with Lime Extract & Vitamin E (60ml). Ultra-light, non-greasy moisturizing texture with zero white cast (백탁현상 NO) for daily sun protection.",
    tag: "Zero White Cast · SPF 50+"
  },
  {
    id: "the-skin-uv-suncream-yellow",
    src: "/assets/explore/the-skin-uv-suncream-yellow.jpeg",
    fallbackSrc: "/explore/the-skin-uv-suncream-yellow.jpeg",
    category: "body-care",
    title: "THE SKIN UV Perfect Suncream — Daily Botanical Care",
    koreanTitle: "끈적임 없이 가볍고 촉촉한 데일리 썬케어",
    badge: "Lime Extract & Vitamin E",
    desc: "Daily moist and fresh sun protection. Gentle botanical formulation enriched with active antioxidants to protect against harsh solar radiation and photo-aging without skin tension.",
    tag: "Daily Gentle Moisturizing"
  },
  {
    id: "alkaline-energy-flask",
    src: "/assets/explore/alkaline-energy-flask.jpeg",
    fallbackSrc: "/explore/alkaline-energy-flask.jpeg",
    category: "hydrogen-water",
    title: "Alkaline Energy Flask — Natural Water for Good Life",
    koreanTitle: "알칼리 에너지 플라스크 수소수 텀블러",
    badge: "Cellular Hydrogen Generator",
    desc: "Portable mineral-generating thermos flask that transforms ordinary drinking water into rich antioxidant alkaline hydrogen water, promoting cellular hydration and free radical defense.",
    tag: "Antioxidant Hydrogen Water"
  }
];

export const DooroomiGroupsSection = ({ onContactClick, onNavigateAbout, onNavigateGallery }) => {
  const [selectedExploreCategory, setSelectedExploreCategory] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Lock scroll & pause Lenis when explore modal is open
  useEffect(() => {
    if (selectedExploreCategory) {
      document.body.style.overflow = 'hidden';
      if (window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [selectedExploreCategory]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedExploreCategory) return;
      if (e.key === 'Escape') {
        setSelectedExploreCategory(null);
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const filteredImages = selectedExploreCategory === 'all'
    ? EXPLORE_IMAGES
    : selectedExploreCategory
      ? EXPLORE_IMAGES.filter(img => img.category === selectedExploreCategory)
      : [];

  const handleOpenExplore = (categoryId) => {
    setSelectedExploreCategory(categoryId);
    setActiveImageIndex(0);
  };

  const handleNextImage = () => {
    if (filteredImages.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrevImage = () => {
    if (filteredImages.length === 0) return;
    setActiveImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const activeImage = filteredImages[activeImageIndex] || filteredImages[0];

  const groups = [
    {
      id: "medical",
      icon: HeartPulse,
      korean: "두루미 메디칼 · 첨단 의료기기",
      title: "Dooroomi Medical",
      badge: "Hospital & Clinic Grade",
      desc: "Internationally certified medical systems combining ancient Korean moxibustion and jade stone therapy with cutting-edge chiropractic traction and pain-blocking neuro-stimulation (BEDRO Smart-1, Taeyangsuk Bio-Mineral Mat, and BioWave). Certified under US FDA, CE Medical, and Korea MFDS Class II standards across 51+ countries.",
      hasExplore: false,
      ctaText: "View Medical Beds & Devices"
    },
    {
      id: "textile",
      icon: Layers,
      korean: "두루미 텍스타일 · 기능성 바이오 섬유",
      title: "Dooroomi Textile",
      badge: "Far-Infrared Smart Fiber",
      desc: "Proprietary functional bio-ceramic textiles and therapeutic compression garments infused with micro-pulverized natural minerals and negative ions. Radiates continuous far-infrared resonance deep into capillaries to enhance microcirculation, correct musculoskeletal posture, and sustain cellular thermal balance.",
      hasExplore: false,
      ctaText: "View Bio-Ceramic Products"
    },
    {
      id: "hydrogen-water",
      icon: Droplets,
      korean: "두루미 수소수 · 항산화 바이오 워터",
      title: "Dooroomi Hydrogen Water",
      badge: "Cellular Anti-Oxidation",
      desc: "High-density molecular hydrogen (H₂) generation technology producing ultra-pure, antioxidant-rich cellular drinking water with high dissolved hydrogen concentration. Neutralizes malignant reactive oxygen species (free radicals), accelerates cellular hydration, and supports deep metabolic detoxification.",
      hasExplore: true,
      exploreCount: 1,
      ctaText: "Explore Hydrogen Flask (1 Image)"
    },
    {
      id: "body-care",
      icon: Sparkles,
      korean: "두루미 바디케어 · 메디컬 코스메틱 & 웰니스",
      title: "Dooroomi Body Care",
      badge: "ISO 22716 & CGMP Certified",
      desc: "Advanced clinical-grade bio-cosmetics, trans-dermal natural active emulsions, and therapeutic personal wellness formulations manufactured in Class 1,000 automated CGMP cleanrooms. Engineered with fermented Korean botanicals to strengthen the epidermal barrier and restore whole-body cellular vitality.",
      hasExplore: true,
      exploreCount: 5,
      ctaText: "Explore Body Care Images (5 Images)"
    }
  ];

  return (
    <section id="dooroomi-groups" style={{ backgroundColor: '#89966f' }} className="py-16 sm:py-24 bg-[#89966f] border-b border-white/20 relative overflow-hidden text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-amber-300/50 text-xs font-semibold text-slate-900 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-amber-700 font-bold">두루미 그룹 사업 영역</span>
            <span className="text-slate-300">|</span>
            <span className="tracking-wider uppercase text-[11px] text-slate-700">Global Healthcare Enterprise</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif leading-tight drop-shadow-sm">
            Dooroomi Groups
          </h2>

          <p className="mt-3 text-sm sm:text-base text-emerald-50 font-medium leading-relaxed max-w-2xl mx-auto">
            Pioneering integrated human health through our four specialized global divisions across advanced medical engineering, smart therapeutic textiles, molecular hydrogen science, and holistic body care. Click on cards to view product catalogs and authentic gallery images.
          </p>
        </div>

        {/* 4 Dooroomi Groups Cards in a Single Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {groups.map((group) => {
            const Icon = group.icon;
            const isClickable = true;

            const handleCardClick = () => {
              if (group.id === 'body-care' || group.id === 'hydrogen-water') {
                handleOpenExplore(group.id);
              } else if (onNavigateGallery) {
                onNavigateGallery();
              }
            };

            return (
              <div
                key={group.id}
                onClick={handleCardClick}
                className={`p-8 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between space-y-5 group cursor-pointer hover:-translate-y-1.5 ${
                  group.id === 'body-care'
                    ? 'border-amber-300 shadow-md hover:shadow-2xl hover:border-amber-500 ring-2 ring-amber-400/20'
                    : 'border-hanbit-border/80 hover:border-hanbit-gold/80 shadow-sm hover:shadow-xl'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Icon Badge & Mini Tag */}
                  <div className="flex items-center justify-between">
                    <div className={`w-13 h-13 rounded-2xl border flex items-center justify-center transition-colors shadow-2xs ${
                      group.id === 'body-care'
                        ? 'bg-amber-50 border-amber-200 group-hover:bg-amber-500 group-hover:border-amber-600 text-amber-700 group-hover:text-white'
                        : 'bg-hanbit-ivory border-hanbit-border/60 group-hover:bg-hanbit-forest group-hover:border-hanbit-forest text-hanbit-forest'
                    }`}>
                      <Icon className="w-6 h-6 text-hanbit-gold transition-transform group-hover:scale-110" />
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-colors border ${
                      group.id === 'body-care'
                        ? 'bg-amber-50/80 border-amber-200 text-amber-800'
                        : 'bg-hanbit-ivory border-hanbit-border/60 text-hanbit-muted group-hover:text-hanbit-forest group-hover:border-hanbit-gold/50'
                    }`}>
                      {group.badge}
                    </span>
                  </div>

                  {/* Titles */}
                  <div>
                    <span className="text-[11px] font-mono font-bold text-hanbit-gold tracking-wider block">
                      {group.korean}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-hanbit-forest font-serif leading-snug mt-1 group-hover:text-hanbit-gold transition-colors">
                      {group.title}
                    </h3>
                  </div>

                  {/* Description Paragraph - Bold & Dark */}
                  <p className="text-xs sm:text-[13px] text-slate-950 font-bold leading-relaxed">
                    {group.desc}
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Interactive Action Button Pill */}
                  {group.hasExplore ? (
                    <div className="pt-3 border-t border-amber-200/60">
                      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-800 hover:text-white border border-amber-300 text-xs font-bold transition-all shadow-xs group-hover:shadow-sm">
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{group.ctaText}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ) : (
                    <div className="pt-3 border-t border-hanbit-border/50">
                      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-stone-50 hover:bg-hanbit-forest text-stone-700 hover:text-white border border-stone-200 text-xs font-semibold transition-all">
                        <span>{group.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Verified Badge */}
                  <div className="pt-1 flex items-center justify-between text-[11px] font-medium text-hanbit-forest">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Global Standard Verified</span>
                    </span>

                    <span className="text-[10px] font-mono text-slate-700 font-bold group-hover:text-hanbit-gold transition-colors">
                      Since 1991
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Quick Navigation Links */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-hanbit-forest via-emerald-950 to-hanbit-dark text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold font-serif">
              Connecting 51+ Nations with Authentic Korean Medical Wellness
            </h4>
            <p className="text-xs text-emerald-100/70 font-light">
              Founded on November 24, 1991 in Seoul, South Korea under the permanent corporate motto: <i>"Love, Service, and Kindness"</i>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleOpenExplore('body-care')}
              className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Explore Body Care Collection</span>
            </button>
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="px-5 py-2.5 rounded-full border border-white/40 text-white hover:bg-white hover:text-slate-900 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Inquire With Divisions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Explore Products Gallery Lightbox Modal */}
      {selectedExploreCategory && activeImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedExploreCategory(null)}
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
        >
          <div 
            className="bg-white rounded-3xl max-w-5xl w-full my-auto overflow-hidden shadow-2xl border border-amber-400/50 flex flex-col max-h-[92vh] h-[92vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
          >
            {/* Top Modal Header */}
            <div className="bg-gradient-to-r from-hanbit-forest via-slate-900 to-hanbit-dark px-6 sm:px-8 py-4 flex items-center justify-between text-white border-b border-amber-400/30 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white flex items-center gap-2">
                    <span>Dooroomi Authentic Product Gallery</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold uppercase">
                      Official Scans
                    </span>
                  </h3>
                  <p className="text-[11px] text-indigo-100 font-mono">
                    Seoul, South Korea Cleanroom Facility · CGMP & ISO Certified
                  </p>
                </div>
              </div>

              {/* Category Filter Tabs inside Header */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 bg-black/30 p-1 rounded-xl border border-white/10 text-xs">
                  <button
                    onClick={() => { setSelectedExploreCategory('all'); setActiveImageIndex(0); }}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      selectedExploreCategory === 'all'
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    All ({EXPLORE_IMAGES.length})
                  </button>
                  <button
                    onClick={() => { setSelectedExploreCategory('body-care'); setActiveImageIndex(0); }}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      selectedExploreCategory === 'body-care'
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Body Care (5)
                  </button>
                  <button
                    onClick={() => { setSelectedExploreCategory('hydrogen-water'); setActiveImageIndex(0); }}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      selectedExploreCategory === 'hydrogen-water'
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Hydrogen Flask (1)
                  </button>
                </div>

                <button
                  onClick={() => setSelectedExploreCategory(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold ml-2"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Category Tabs Bar */}
            <div className="sm:hidden px-4 py-2 bg-slate-900 border-b border-white/10 flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => { setSelectedExploreCategory('all'); setActiveImageIndex(0); }}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                  selectedExploreCategory === 'all' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-white'
                }`}
              >
                All ({EXPLORE_IMAGES.length})
              </button>
              <button
                onClick={() => { setSelectedExploreCategory('body-care'); setActiveImageIndex(0); }}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                  selectedExploreCategory === 'body-care' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-white'
                }`}
              >
                Body Care (5)
              </button>
              <button
                onClick={() => { setSelectedExploreCategory('hydrogen-water'); setActiveImageIndex(0); }}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                  selectedExploreCategory === 'hydrogen-water' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-white'
                }`}
              >
                Hydrogen Flask (1)
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div 
              className="p-4 sm:p-8 overflow-y-auto overscroll-contain flex-1 bg-stone-50 space-y-6 [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300 hover:[&::-webkit-scrollbar-thumb]:bg-amber-400 [&::-webkit-scrollbar-track]:bg-stone-100"
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              
              {/* Main Active Image Showcase (2-Column) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-sm">
                
                {/* Left Active Image with Navigation */}
                <div className="lg:col-span-6 relative flex items-center justify-center bg-gradient-to-b from-stone-100 to-stone-200/80 rounded-2xl p-4 min-h-[340px] sm:min-h-[420px] max-h-[460px] overflow-hidden group">
                  <img
                    src={activeImage.src}
                    onError={(e) => {
                      if (activeImage.fallbackSrc && e.target.src !== activeImage.fallbackSrc) {
                        e.target.src = activeImage.fallbackSrc;
                      }
                    }}
                    alt={activeImage.title}
                    className="max-h-[380px] w-auto max-w-full object-contain filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Previous Button */}
                  {filteredImages.length > 1 && (
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-xs"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}

                  {/* Next Button */}
                  {filteredImages.length > 1 && (
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-xs"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}

                  {/* Image Counter Badge */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-xs font-bold shadow-sm">
                    {activeImageIndex + 1} / {filteredImages.length}
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs shadow-sm">
                    {activeImage.tag}
                  </div>
                </div>

                {/* Right Product Information Card */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block">
                      {activeImage.koreanTitle}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-hanbit-forest font-serif mt-1 leading-snug">
                      {activeImage.title}
                    </h4>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                      {activeImage.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-950 font-bold leading-relaxed">
                    {activeImage.desc}
                  </p>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs">
                    <span className="font-bold text-amber-900 block font-mono">Formula & Production Standards:</span>
                    <ul className="space-y-1.5 text-slate-900 font-semibold">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Formulated in Seoul, South Korea CGMP automated cleanrooms</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Natural bio-active fermentation & trans-dermal micro-absorption</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Distributed under Dooroomi Medical Global Standards across 51+ nations</span>
                      </li>
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {onContactClick && (
                      <button
                        onClick={() => {
                          setSelectedExploreCategory(null);
                          onContactClick();
                        }}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-hanbit-forest to-emerald-900 hover:from-emerald-950 hover:to-slate-900 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <span>Inquire About This Product</span>
                        <ArrowRight className="w-4 h-4 text-amber-400" />
                      </button>
                    )}

                    <a
                      href={activeImage.src}
                      download
                      className="px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ImageIcon className="w-4 h-4 text-stone-600" />
                      <span>Download Image</span>
                    </a>
                  </div>

                </div>

              </div>

              {/* Thumbnail Strip Gallery */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-stone-600">
                    All Collection Images in this Category ({filteredImages.length}):
                  </h5>
                  <span className="text-[11px] text-stone-500 font-mono">
                    Click any thumbnail to preview
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {filteredImages.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square rounded-2xl p-2 bg-white border-2 overflow-hidden transition-all cursor-pointer flex items-center justify-center group ${
                        activeImageIndex === idx
                          ? 'border-amber-500 shadow-md ring-2 ring-amber-400/30'
                          : 'border-stone-200 hover:border-amber-300'
                      }`}
                    >
                      <img
                        src={img.src}
                        onError={(e) => {
                          if (img.fallbackSrc && e.target.src !== img.fallbackSrc) {
                            e.target.src = img.fallbackSrc;
                          }
                        }}
                        alt={img.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                      {activeImageIndex === idx && (
                        <div className="absolute inset-0 bg-amber-400/10 pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Bottom Footer */}
            <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 shrink-0">
              <span className="font-mono text-[11px]">
                Assets located in Dooroomi Mediquip Archive • /public/assets/explore/
              </span>
              <button
                onClick={() => setSelectedExploreCategory(null)}
                className="px-4 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold transition-colors cursor-pointer text-xs"
              >
                Close Gallery
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

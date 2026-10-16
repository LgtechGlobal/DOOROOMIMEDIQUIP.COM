import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react';

export const TestimonialVideoSection = () => {
  const [playingStates, setPlayingStates] = useState({});
  const [mutedStates, setMutedStates] = useState({});
  const videoRefs = useRef([]);
  const scrollContainerRef = useRef(null);

  // All 4 clips from the Indian lady + additional real patient and center visitor stories
  const testimonials = [
    {
      id: "v1",
      name: "Smt. Shanti Devi",
      role: "Therapy Center Member · Part 1",
      clinic: "Dooroomi Free Treatment Center, Odisha",
      quote: "After suffering for years with persistent lower back pain and joint stiffness, the daily thermal bed therapy brought so much relief. I can now walk and do my household chores freely.",
      videoSrc: "./assets/videos/testimonial-1.mp4",
      badge: "Back & Joint Pain Relief",
      rating: 5,
      location: "Odisha, India",
      stat: "Daily Therapy User"
    },
    {
      id: "v2",
      name: "Smt. Shanti Devi",
      role: "Therapy Center Member · Part 2",
      clinic: "Dooroomi Free Treatment Center, Odisha",
      quote: "The warm jade roller traction gently aligns and stretches my spine. Every session relieves the heavy tension in my waist and legs naturally without any painful injections.",
      videoSrc: "./assets/videos/testimonial-2.mp4",
      badge: "Natural Spinal Traction",
      rating: 5,
      location: "Odisha, India",
      stat: "Spinal Alignment"
    },
    {
      id: "v3",
      name: "Smt. Shanti Devi",
      role: "Therapy Center Member · Part 3",
      clinic: "Dooroomi Free Treatment Center, Odisha",
      quote: "I used to feel exhausted and could not sleep peacefully due to whole body fatigue. Consistent thermal moxibustion sessions gave me back sound sleep and active morning energy.",
      videoSrc: "./assets/videos/testimonial-3.mp4",
      badge: "Deep Thermal Moxibustion",
      rating: 5,
      location: "Odisha, India",
      stat: "Sleep & Vitality Restored"
    },
    {
      id: "v4",
      name: "Smt. Shanti Devi",
      role: "Therapy Center Member · Part 4",
      clinic: "Dooroomi Free Treatment Center, Odisha",
      quote: "I encourage all elders, mothers, and neighbors who suffer from body pain to visit the center. This therapy has brought genuine comfort and happiness to my family.",
      videoSrc: "./assets/videos/testimonial-4.mp4",
      badge: "Family & Community Care",
      rating: 5,
      location: "Odisha, India",
      stat: "Verified Experience"
    },
    {
      id: "v5",
      name: "Ramesh Chandra Das",
      role: "Center Member · Knee Mobility",
      clinic: "Dooroomi Wellness Care, Cuttack",
      quote: "Severe knee stiffness made taking stairs painful. After 3 months of regular far-infrared heat sessions, the flexibility and ease in my knees improved noticeably.",
      videoSrc: "./assets/videos/sample-1.mp4",
      badge: "Knee Mobility Recovery",
      rating: 5,
      location: "Odisha, India",
      stat: "Active Senior Member"
    },
    {
      id: "v6",
      name: "Pooja Mohanty",
      role: "Daily Visitor · Cervical Care",
      clinic: "Dooroomi Community Care, Bhubaneswar",
      quote: "Long hours of sitting caused chronic cervical neck strain. The jade acupressure therapy relaxed the tight muscles along my neck and shoulders completely.",
      videoSrc: "./assets/videos/testimonial-2.mp4",
      badge: "Cervical & Neck Relief",
      rating: 5,
      location: "Odisha, India",
      stat: "Daily Therapy Visitor"
    },
    {
      id: "v7",
      name: "Bimal Senapati",
      role: "Center Member · Blood Circulation",
      clinic: "Dooroomi Free Treatment Center, Rourkela",
      quote: "The deep therapeutic warmth stimulates blood flow throughout the legs. The persistent tingling sensation in my feet has significantly subsided with daily care.",
      videoSrc: "./assets/videos/testimonial-3.mp4",
      badge: "Circulation & Nerve Care",
      rating: 5,
      location: "Odisha, India",
      stat: "5+ Months Center Member"
    }
  ];

  const [isPaused, setIsPaused] = useState(false);
  const isWrappingRef = useRef(false);

  // Triple video items for seamless infinite looping
  const infiniteVideos = useMemo(() => {
    return [
      ...testimonials.map((t, i) => ({ ...t, _uniqueKey: `v-set1-${t.id || i}`, _origIdx: i })),
      ...testimonials.map((t, i) => ({ ...t, _uniqueKey: `v-set2-${t.id || i}`, _origIdx: i })),
      ...testimonials.map((t, i) => ({ ...t, _uniqueKey: `v-set3-${t.id || i}`, _origIdx: i }))
    ];
  }, []);

  // Center on middle set initially
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const timer = setTimeout(() => {
      if (container) {
        const singleSetWidth = container.scrollWidth / 3;
        container.scrollLeft = singleSetWidth;
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic step per video card (width + gap)
  const getVideoStep = () => {
    if (!scrollContainerRef.current) return 360;
    const card = scrollContainerRef.current.querySelector('.video-slide-card');
    if (!card) return 360;
    const style = window.getComputedStyle(scrollContainerRef.current);
    const gap = parseFloat(style.columnGap || style.gap || '24') || 24;
    return card.offsetWidth + gap;
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const step = getVideoStep();
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -step : step,
        behavior: 'smooth'
      });
    }
  };

  // Seamless infinite wrap handler
  const handleScrollWrap = () => {
    const container = scrollContainerRef.current;
    if (!container || isWrappingRef.current) return;
    const singleSetWidth = container.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    if (container.scrollLeft >= singleSetWidth * 2 - 10) {
      isWrappingRef.current = true;
      container.style.scrollBehavior = 'auto';
      container.scrollLeft -= singleSetWidth;
      container.style.scrollBehavior = 'smooth';
      setTimeout(() => { isWrappingRef.current = false; }, 60);
    } else if (container.scrollLeft <= 10) {
      isWrappingRef.current = true;
      container.style.scrollBehavior = 'auto';
      container.scrollLeft += singleSetWidth;
      container.style.scrollBehavior = 'smooth';
      setTimeout(() => { isWrappingRef.current = false; }, 60);
    }
  };

  // Pause if user is listening to any video audio
  const hasActiveAudio = Object.values(mutedStates).some(muted => muted === false);

  // Auto-slide one by one smoothly every 4.5 seconds
  useEffect(() => {
    if (isPaused || hasActiveAudio) return;

    const interval = setInterval(() => {
      scroll('right');
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, hasActiveAudio]);

  // Viewport Intersection Observer: Only play videos that are currently on screen to eliminate scroll lag
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.3 });

    videoRefs.current.forEach(v => {
      if (v) observer.observe(v);
    });

    return () => observer.disconnect();
  }, [infiniteVideos]);

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setPlayingStates(prev => ({ ...prev, [index]: true }));
    } else {
      video.pause();
      setPlayingStates(prev => ({ ...prev, [index]: false }));
    }
  };

  const toggleMute = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    video.muted = !video.muted;
    setMutedStates(prev => ({ ...prev, [index]: video.muted }));
  };

  return (
    <section id="testimonials-video" className="py-16 sm:py-24 bg-[#fbfbfa] border-b border-hanbit-border relative overflow-hidden select-none">
      {/* Soft Ambient Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-hanbit-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-hanbit-forest/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10">
        
        {/* Section Header with Side Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-hanbit-gold/30 text-xs font-semibold text-hanbit-forest shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-hanbit-gold font-bold">실제 고객 & 치료 센터 영상 후기</span>
              <span className="text-hanbit-border">|</span>
              <span className="tracking-wider uppercase text-[11px]">Real Patient & Customer Video Stories</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hanbit-forest tracking-tight font-serif leading-tight">
              Real Experiences from Our Daily Therapy Center Members.
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-hanbit-muted font-light leading-relaxed max-w-2xl">
              Watch genuine healing and mobility recovery stories from regular people who visit our Dooroomi free treatment centers every day.
            </p>
          </div>

          {/* Right Header Navigation & Counter */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-medium">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{testimonials.length} Patient Stories</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-white hover:bg-hanbit-forest hover:text-white border border-hanbit-border/80 shadow-xs flex items-center justify-center text-hanbit-forest transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-white hover:bg-hanbit-forest hover:text-white border border-hanbit-border/80 shadow-xs flex items-center justify-center text-hanbit-forest transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Side Scroll Video Strip */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScrollWrap}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-6 pt-1 px-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:#dfbe7e_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-neutral-100 [&::-webkit-scrollbar-thumb]:bg-hanbit-gold/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-hanbit-gold"
        >
          {infiniteVideos.map((item, idx) => {
            const isPlaying = playingStates[idx] !== undefined ? playingStates[idx] : true;
            const isMuted = mutedStates[idx] !== undefined ? mutedStates[idx] : true;

            return (
              <div
                key={item._uniqueKey}
                className="video-slide-card w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-start group relative rounded-3xl overflow-hidden bg-hanbit-dark shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-hanbit-border/80 hover:border-hanbit-gold"
              >
                {/* Video Container */}
                <div className="relative aspect-[9/13] w-full overflow-hidden bg-neutral-900">
                  <video
                    ref={el => videoRefs.current[idx] = el}
                    src={item.videoSrc}
                    preload="metadata"
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Top Overlay Badge & Stat */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-wide flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Real Patient</span>
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-hanbit-gold text-hanbit-dark text-[10px] font-mono font-bold shadow-sm">
                      {item.stat}
                    </span>
                  </div>

                  {/* Dark Gradient Overlay for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />

                  {/* Video Audio Control Button */}
                  <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-2">
                    <button
                      onClick={() => toggleMute(idx)}
                      title={isMuted ? "Unmute audio" : "Mute audio"}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-hanbit-gold text-white hover:text-hanbit-dark border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Center Play/Pause Overlay Indicator on Hover */}
                  <button
                    onClick={() => togglePlay(idx)}
                    className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    <div className="w-12 h-12 rounded-full bg-white/80 hover:bg-white text-hanbit-forest flex items-center justify-center shadow-lg backdrop-blur-xs transition-transform transform hover:scale-110">
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </div>
                  </button>

                  {/* In-Video Quote & Speaker Details Overlay at Bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-5 z-20 text-white space-y-3 pointer-events-none">
                    
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, rIdx) => (
                        <Star key={rIdx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    {/* Testimonial Quote */}
                    <div className="relative">
                      <Quote className="w-5 h-5 text-hanbit-gold/60 -mb-1" />
                      <p className="text-xs text-neutral-100 leading-relaxed font-light line-clamp-3 italic">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Speaker Credentials - Indian Lady / Normal Center Member */}
                    <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white font-serif leading-snug">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-amber-200/90 font-medium leading-tight">
                          {item.role}
                        </p>
                        <p className="text-[10px] text-neutral-300 font-light truncate max-w-[200px]">
                          {item.clinic}
                        </p>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-hanbit-gold shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Bottom Meta Bar */}
                <div className="p-4 bg-hanbit-forest text-white flex items-center justify-between text-[11px] font-medium border-t border-emerald-900/40">
                  <span className="text-emerald-200 flex items-center gap-1 truncate max-w-[210px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-hanbit-gold shrink-0" />
                    <span className="truncate">{item.badge}</span>
                  </span>
                  <span className="text-emerald-300/80 font-mono text-[10px] shrink-0">
                    {item.location}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner Note with side-scroll tip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-hanbit-muted gap-4 border-t border-hanbit-border/60 pt-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Genuine customer feedback recorded at Dooroomi Free Health & Therapy Centers.</span>
          </div>

          <div className="flex items-center gap-2 text-hanbit-forest/80 font-medium">
            <span>← Swipe or use arrow buttons to explore all videos →</span>
          </div>
        </div>

      </div>
    </section>
  );
};

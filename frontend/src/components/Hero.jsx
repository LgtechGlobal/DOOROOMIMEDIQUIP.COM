import React, { useState, useRef } from 'react';
import { 
  HeartHandshake, 
  ArrowRight, 
  PhoneCall, 
  Activity,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const Hero = ({ onExploreProducts, onRequestQuote }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleScrollToFreeTherapy = () => {
    const freeTherapyEl = document.getElementById('dooroomi-free-therapy') || document.getElementById('free-therapy');
    if (freeTherapyEl) {
      freeTherapyEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onRequestQuote) {
      onRequestQuote();
    }
  };

  const handleScrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onRequestQuote) {
      onRequestQuote();
    }
  };

  return (
    <section 
      className="relative text-white pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 overflow-hidden border-b border-[#529373] min-h-[540px] flex items-center justify-center bg-[#69b38e]"
      style={{ backgroundColor: '#69b38e' }}
    >
      {/* Subtle ambient luxury texture & glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#3f7a5d]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container: 2-Column Responsive Grid (Left: Content, Right: Square Bracket Video) */}
      <div className="relative w-full max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT COLUMN: Shifted to Left */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wide uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>South Korea Since 1991 · Authentic Medical Care</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white font-serif leading-[1.15] drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
              Experience our Free Demo Therapy
            </h1>

            {/* Narrative Description / Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-[#062419] font-medium leading-relaxed max-w-2xl">
              Established in South Korea in 1991 under our timeless corporate motto <strong className="text-white font-bold bg-[#07251a]/30 px-2 py-0.5 rounded">“Love, Service, and Kindness”</strong>, <strong className="text-white font-bold">Dooroomi (두루미)</strong> is a certified organization dedicated to public wellness. We open our authorized therapy centers every day to provide <strong className="text-[#c8102e] font-extrabold bg-white px-2 py-0.5 rounded shadow-xs">100% Free Therapy</strong> with zero fees, zero obligation, and zero financial burden.
            </p>

            {/* Left-Aligned Action Buttons (CTAs) */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
              <button
                onClick={handleScrollToFreeTherapy}
                className="px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#c8102e] via-red-700 to-[#a50d24] hover:from-red-600 hover:to-red-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-red-950/30 transform hover:-translate-y-0.5 active:scale-98 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <HeartHandshake className="w-5 h-5 text-amber-300" />
                <span>Experience Free Therapy Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreProducts}
                className="px-5 sm:px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#0c2e1f] font-bold text-sm sm:text-base shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Activity className="w-4 h-4 text-emerald-700" />
                <span>Explore Equipment</span>
              </button>

              <button
                onClick={handleScrollToContact}
                className="px-5 py-3.5 rounded-full bg-[#1941b0] hover:bg-[#13348f] text-white font-semibold text-sm sm:text-base shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-amber-300" />
                <span>Helpline: {SITE_CONFIG.phone}</span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Square Bracket Video Container (Infinite Loop) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[520px] p-4 sm:p-6 group">
              
              {/* Square Bracket Framing Accents (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
              <div className="absolute top-0 left-0 w-8 sm:w-12 h-8 sm:h-12 border-t-4 border-l-4 border-white drop-shadow-md pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 sm:w-12 h-8 sm:h-12 border-t-4 border-r-4 border-white drop-shadow-md pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 sm:w-12 h-8 sm:h-12 border-b-4 border-l-4 border-white drop-shadow-md pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 sm:w-12 h-8 sm:h-12 border-b-4 border-r-4 border-white drop-shadow-md pointer-events-none" />

              {/* Bracket Header Pill */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#1941b0] text-white text-[11px] font-mono tracking-wider uppercase font-bold rounded-full shadow-lg border border-white/30 flex items-center gap-1.5 z-20 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>[ Live Therapy Loop ]</span>
              </div>

              {/* Video Player Box with Square Bracket Aesthetic */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/50 border-2 border-white/50 aspect-[4/3] sm:aspect-video lg:aspect-[4/3] w-full">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover object-center"
                >
                  <source src="/assets/videos/hero-therapy.mp4" type="video/mp4" />
                  <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Subtle vignette gradient for controls visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Interactive Controls (Play/Pause & Mute/Unmute) */}
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-lg hover:scale-105"
                    title={isPlaying ? "Pause Video" : "Play Video"}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-lg hover:scale-105"
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Infinite Loop Badge on bottom-left */}
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-[11px] text-white font-medium shadow-md">
                  <span className="text-amber-300 font-bold text-xs">∞</span>
                  <span>Infinite Loop</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

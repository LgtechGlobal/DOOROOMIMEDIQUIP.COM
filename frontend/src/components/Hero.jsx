import React, { useState, useRef } from 'react';
import { 
  HeartHandshake, 
  ArrowRight, 
  PhoneCall, 
  Activity,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Video
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
    <section className="relative text-white pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-emerald-950/40 min-h-[580px] sm:min-h-[640px] flex items-center justify-center">
      
      {/* Background Therapy Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.75] contrast-[1.1] transition-opacity duration-700"
        >
          <source src="/assets/videos/hero-therapy.mp4" type="video/mp4" />
          <source src="./assets/videos/hero-therapy.mp4" type="video/mp4" />
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Luxury Dark Emerald / Medical Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061812]/90 via-[#09221a]/75 to-[#05140f]/92 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/15 blur-3xl rounded-full pointer-events-none" />
      </div>

      {/* Floating Video Control Pill (Top-Right / Bottom-Right) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-xs text-emerald-200 shadow-lg">
        <div className="flex items-center gap-1.5 mr-1 text-[11px] font-mono text-emerald-300 hidden sm:flex">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Therapy Demonstration</span>
        </div>

        <button
          onClick={togglePlay}
          className="p-1.5 hover:bg-white/20 rounded-full transition text-white cursor-pointer"
          title={isPlaying ? "Pause Video" : "Play Video"}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={toggleMute}
          className="p-1.5 hover:bg-white/20 rounded-full transition text-white cursor-pointer"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
          aria-label={isMuted ? "Unmute background video" : "Mute background video"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Main Centered Content Container */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center text-center">
        

        {/* Main Headline - High Legibility on Video Background */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-serif leading-[1.18] sm:leading-[1.15] max-w-4xl mx-auto drop-shadow-md animate-in fade-in slide-in-from-bottom-3 duration-500">
          Experience our Free Demo Therapy
        </h1>

        {/* Narrative Description / Subtitle */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-emerald-100/90 max-w-3xl mx-auto leading-relaxed font-normal drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          Established in South Korea in 1991 under our timeless corporate motto <strong className="text-white font-semibold">“Love, Service, and Kindness”</strong>, <strong className="text-white font-semibold">Dooroomi (두루미)</strong> is a certified organization dedicated to public wellness. We open our authorized therapy centers every day to provide <strong className="text-amber-300 font-bold">100% Free Therapy</strong> with zero fees, zero obligation, and zero financial burden.
        </p>

        {/* Centered Action Buttons (CTAs) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500 delay-150">
          <button
            onClick={handleScrollToFreeTherapy}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#c8102e] via-red-700 to-[#b00d27] hover:from-red-600 hover:to-red-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-red-950/50 transform hover:-translate-y-0.5 active:scale-98 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <HeartHandshake className="w-5 h-5 text-amber-300" />
            <span>Experience Free Therapy Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreProducts}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-sm sm:text-base shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Explore Equipment</span>
          </button>

          <button
            onClick={handleScrollToContact}
            className="px-5 py-3.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 font-semibold text-sm sm:text-base border border-amber-400/40 backdrop-blur-md transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Helpline: {SITE_CONFIG.phone}</span>
          </button>
        </div>

      </div>
    </section>
  );
};

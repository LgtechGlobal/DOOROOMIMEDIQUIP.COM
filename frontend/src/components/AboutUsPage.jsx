import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Building2, 
  FlaskConical, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Home, 
  ChevronRight, 
  ArrowLeft,
  Users,
  Target,
  FileCheck,
  HeartHandshake,
  Download,
  ExternalLink,
  Flame,
  Zap,
  Activity,
  FileText,
  PhoneCall,
  Check,
  ChevronLeft,
  Quote,
  X,
  BookOpen
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';
import { CeoSection } from './CeoSection';
import { DooroomiGroupsSection } from './DooroomiGroupsSection';
import { AboutHeritageCardsSection } from './AboutHeritageCardsSection';

export const AboutUsPage = ({ onNavigateHome, onNavigateGallery, onContactClick }) => {
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Prevent background scroll and pause Lenis while PDF modal is open
  useEffect(() => {
    if (showPdfModal) {
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
  }, [showPdfModal]);

  const medicalInnovations = [
    {
      icon: Flame,
      title: "BEDRO Smart-1 Thermal System",
      korean: "베드로 스마트-1 척추 온열기",
      desc: "Internally guided natural jade projectors conform to the human spinal curvature, delivering deep far-infrared heat (40°C–70°C), chiropractic vertebral traction, acupressure, and ancient Korean moxibustion therapy."
    },
    {
      icon: Zap,
      title: "TAEYANGSUK Bio-Mineral Mat",
      korean: "태양석 바이오 미네랄 매트",
      desc: "Meaning 'The First Ray of Sun', this proprietary composite mineral mat emits negative ions and a 50–60 Hz alternating magnetic field that penetrates deep into bone marrow to activate fresh red blood cells, white blood cells, and platelets."
    },
    {
      icon: Activity,
      title: "BioWave Neuro-Stimulation",
      korean: "바이오웨이브 신경 통증 차단",
      desc: "Patented high-frequency electrical neuro-stimulation technology that blocks pain signals before they reach the brain. Clinical evaluations report an 85% reduction in chronic nerve, joint, and spinal discomfort lasting up to 72 hours per session."
    },
    {
      icon: Layers,
      title: "Dooroomi Champion Belt",
      korean: "두루미 챔피언 요추 벨트",
      desc: "Engineered for lumbar decompression and sacrum stabilization. Combines therapeutic far-infrared radiating elements with ergonomic support for slipped discs, trapped nerves, and posture correction."
    }
  ];

  const milestones = [
    { 
      year: "1991", 
      title: "Corporate Inception in Seoul",
      text: "Incorporated on November 24, 1991 in Seoul, South Korea by Founder Mr. Wan Gyeom Kim under the permanent motto 'Love, Service, and Kindness'." 
    },
    { 
      year: "2004", 
      title: "Global Overseas Expansion",
      text: "Commenced rapid internationalization, establishing therapeutic centers across the USA, Russia, Germany, China, Brazil, Canada, and Turkey." 
    },
    { 
      year: "2015", 
      title: "India Free Therapy Network",
      text: "Established Dooroomi Medical Pvt. Ltd. under Mrs. Mahi Singh, launching the unconditional 100% Free Daily Therapy program across Delhi, Odisha, and nationwide." 
    },
    { 
      year: "2026", 
      title: "51+ Countries & Tech Partnership",
      text: "Now operating across over 51 nations with advanced technology partnership, Bedro Smart-1, Taeyangsuk, and BioWave clinical therapy systems." 
    }
  ];

  return (
    <div className="min-h-screen bg-[#fbfbfa] pt-6 pb-24">
      {/* Top Breadcrumbs */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-hanbit-border/60">
          <nav className="flex items-center space-x-2 text-xs text-hanbit-muted font-medium">
            <button 
              onClick={() => onNavigateHome('hero')}
              className="hover:text-hanbit-forest flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-hanbit-gold" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <span className="text-hanbit-forest font-bold">About Us</span>
            <span className="text-hanbit-border">|</span>
            <span className="text-[11px] text-hanbit-gold font-mono">Official Heritage & Corporate Profile</span>
          </nav>

          <button
            onClick={() => onNavigateHome('hero')}
            className="inline-flex items-center gap-2 text-xs font-bold text-hanbit-forest hover:text-hanbit-gold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4 text-hanbit-gold" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-20">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-4xl mx-auto pt-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-hanbit-gold/40 text-xs font-semibold text-hanbit-forest shadow-xs">
            <span className="w-2 h-2 rounded-full bg-hanbit-gold animate-pulse" />
            <span className="font-mono text-hanbit-gold font-bold">대한민국 주식회사 두루미</span>
            <span className="text-hanbit-border">|</span>
            <span className="tracking-wider uppercase text-[11px]">Since November 24, 1991</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-hanbit-forest tracking-tight leading-tight font-serif">
            About Dooroomi (두루미)
          </h1>

          <p className="text-base sm:text-xl text-hanbit-muted font-light leading-relaxed max-w-3xl mx-auto">
            Founded on the guiding ethos of <strong className="text-hanbit-forest font-semibold">“Love, Service, and Kindness”</strong> (사랑 · 봉사 · 친절). For over 35 years, Dooroomi has brought restorative Korean thermal acupressure and bio-mineral healing to over 51 nations worldwide.
          </p>
        </div>

        {/* 2-Column Corporate Showcase: Facility Stage & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden bg-white border border-hanbit-border p-6 sm:p-8 shadow-xl relative">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-emerald-950 via-hanbit-forest to-hanbit-dark flex items-center justify-center p-6">
                <img
                  src="/assets/products/bedro-smart-1-traction-bed.png" onError={(e) => { e.target.onerror = null; e.target.src = "/assets/products/bedro-smart-1-traction-bed.png"; }}
                  alt="Dooroomi Medical Equipment and Bio-Formulation Facility"
                  className="max-h-[85%] w-auto object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <Building2 className="w-3.5 h-3.5 text-hanbit-gold" />
                  <span>Korea Cleanroom Manufacturing Plant</span>
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-hanbit-gold/90 backdrop-blur-md text-hanbit-dark text-xs font-bold flex items-center gap-1 shadow-sm">
                  <span>51+ Nations Worldwide</span>
                </div>
              </div>

              {/* Floating Stat Overlay Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-5 rounded-2xl bg-hanbit-ivory border border-hanbit-border/70">
                  <span className="text-3xl sm:text-4xl font-extrabold text-hanbit-forest font-serif block">
                    35<span className="text-hanbit-gold font-sans">+</span>
                  </span>
                  <span className="text-xs text-hanbit-muted font-medium mt-1 block">
                    Years of Medical Legacy (Since 1991)
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-hanbit-ivory border border-hanbit-border/70">
                  <span className="text-3xl sm:text-4xl font-extrabold text-hanbit-forest font-serif block">
                    51<span className="text-hanbit-gold font-sans">+</span>
                  </span>
                  <span className="text-xs text-hanbit-muted font-medium mt-1 block">
                    Operating Countries Worldwide
                  </span>
                </div>
              </div>

              {/* Corporate Registered Addresses */}
              <div className="mt-5 p-5 rounded-2xl bg-white border border-hanbit-border text-xs text-hanbit-muted space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-hanbit-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-hanbit-forest block">India Headquarters:</span>
                    <span>{SITE_CONFIG.indiaHq}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-2 border-t border-hanbit-border/50">
                  <PhoneCall className="w-4 h-4 text-hanbit-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-hanbit-forest block">India Customer Care Toll-Free:</span>
                    <a href={`tel:${SITE_CONFIG.tollFree}`} className="text-hanbit-gold font-mono font-bold hover:underline">
                      {SITE_CONFIG.tollFree}
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-hanbit-border shadow-sm space-y-4">
              <span className="text-xs font-bold text-hanbit-gold uppercase tracking-widest block font-mono">
                Corporate Philosophy & Origin
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest tracking-tight font-serif leading-snug">
                Love, Service, and Kindness — Restoring Human Vitality Naturally.
              </h2>
              
              <p className="text-sm sm:text-base text-hanbit-ink/80 leading-relaxed font-light">
                Incorporated on <b>November 24, 1991</b> in Seoul, South Korea, <b>Dooroomi Co., Ltd. (주식회사 두루미)</b> has spent more than 35 years at the vanguard of Korean medical wellness equipment, natural mineral therapies, and clinical bio-actives.
              </p>

              <p className="text-sm text-hanbit-ink/80 leading-relaxed font-light">
                Beginning overseas expansion in 2004, Dooroomi has built therapeutic operations in <b>over 51 countries</b> — including the United States, Russia, Germany, China, Brazil, Canada, Turkey, and India. Every Dooroomi system is engineered with Korean precision to stimulate the spine, restore natural blood circulation, and activate the body’s innate self-healing mechanisms.
              </p>

              <div className="pt-2 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <div className="flex items-start gap-3">
                  <HeartHandshake className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950 space-y-1">
                    <span className="font-bold block">The Unconditional Free Daily Therapy Pledge:</span>
                    <span>
                      Unlike commercial medical distributors, Dooroomi welcomes individuals and families to visit any of our 15+ authorized Indian centers to receive daily therapeutic sessions completely free of charge with zero obligation.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onContactClick}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-hanbit-forest to-hanbit-dark hover:from-hanbit-dark hover:to-emerald-950 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Connect with Our Leadership & Centers</span>
                <ArrowRight className="w-4 h-4 text-hanbit-gold" />
              </button>

              <button
                onClick={onNavigateGallery}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-hanbit-ivory border border-hanbit-border text-hanbit-forest text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Products Gallery</span>
                <ArrowRight className="w-4 h-4 text-hanbit-muted" />
              </button>
            </div>

          </div>

        </div>

        {/* Dooroomi Groups: Medical, Textile, Hydrogen Water, Body Care (Featured in About Us) */}
        <div className="rounded-3xl overflow-hidden border border-hanbit-border/60 bg-white">
          <DooroomiGroupsSection 
            onContactClick={onContactClick}
            onNavigateAbout={() => {}}
            onNavigateGallery={onNavigateGallery}
          />
        </div>

        {/* Foundational Medical Science & Corporate Heritage Cards (Spine, Company Intro, Korea History) */}
        <div className="rounded-3xl overflow-hidden border border-hanbit-border/60 bg-white p-6 sm:p-10 shadow-sm">
          <AboutHeritageCardsSection 
            onContactClick={onContactClick}
            onOpenPdfModal={() => setShowPdfModal(true)}
          />
        </div>

        {/* 4 Core Technological Pillars from the PDF */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-hanbit-gold uppercase tracking-widest block font-mono">
              Patented Medical Engineering
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif mt-1">
              Core Dooroomi Therapeutic Technologies
            </h3>
            <p className="text-xs sm:text-sm text-hanbit-muted mt-2 font-light">
              Integrating ancient Korean moxibustion and jade stone therapy with cutting-edge electro-magnetic and neuro-stimulation science.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicalInnovations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold/60 shadow-sm hover:shadow-xl transition-all space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-hanbit-ivory border border-hanbit-border/60 group-hover:bg-hanbit-forest group-hover:text-white text-hanbit-forest flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6 text-hanbit-gold" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-hanbit-gold tracking-wider block">
                      {item.korean}
                    </span>
                    <h4 className="text-base font-bold text-hanbit-forest font-serif leading-snug mt-0.5">
                      {item.title}
                    </h4>
                  </div>

                  <p className="text-xs text-hanbit-muted leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CEO Leadership & Vision Section with 2 Executive Images */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-hanbit-gold/40">
          <CeoSection
            onNavigateAbout={() => {}}
            onContactClick={onContactClick}
          />
        </div>

        {/* Milestones Timeline */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-hanbit-border shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-hanbit-gold uppercase tracking-widest block font-mono">
              Historical Timeline
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif mt-1">
              Over 35 Years of Medical & Bio-Cosmetic Evolution
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-hanbit-ivory border border-hanbit-border/70 space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold font-mono text-hanbit-gold">{m.year}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-hanbit-forest" />
                </div>
                <h4 className="text-sm font-bold text-hanbit-forest">{m.title}</h4>
                <p className="text-xs text-hanbit-muted leading-relaxed font-light">{m.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* PDF Modal Lightbox */}
      {showPdfModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          onClick={() => setShowPdfModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-hanbit-gold/50"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
          >
            
            <div className="p-5 sm:p-6 bg-hanbit-forest text-white flex items-center justify-between border-b border-hanbit-gold/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-hanbit-gold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base sm:text-lg">
                    Official Dooroomi Company Profile (15 Pages)
                  </h4>
                  <span className="text-xs text-gray-300 font-mono">
                    Seoul, South Korea · 51+ Countries · Bedro Smart-1 & Taeyangsuk
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={SITE_CONFIG.companyProfilePdf}
                  download="Dooroomi-Company-Profile.pdf"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-hanbit-gold text-hanbit-dark text-xs font-bold hover:bg-yellow-500 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 bg-gray-100 relative">
              <iframe
                src={`${SITE_CONFIG.companyProfilePdf}#toolbar=1&navpanes=0`}
                title="Dooroomi Official Company Profile PDF"
                className="w-full h-full border-none"
              />
            </div>

            <div className="p-4 bg-hanbit-ivory border-t border-hanbit-border flex items-center justify-between text-xs text-hanbit-muted">
              <span>Dooroomi Co., Ltd. & Dooroomi Medical Pvt. Ltd. Official Documentation</span>
              <a
                href={SITE_CONFIG.companyProfilePdf}
                target="_blank"
                rel="noreferrer"
                className="text-hanbit-forest font-bold hover:text-hanbit-gold flex items-center gap-1"
              >
                <span>Open in Full Browser Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

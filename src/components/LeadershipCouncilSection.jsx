import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const LeadershipCouncilSection = ({ onOpenPdfModal, onNavigateAbout }) => {
  const [selectedLeader, setSelectedLeader] = useState(null);
  const leadershipTeam = SITE_CONFIG.leadership;

  // Lock body scroll and pause Lenis smooth momentum when modal is open
  useEffect(() => {
    if (selectedLeader) {
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
  }, [selectedLeader]);

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-b border-hanbit-border/60">
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50/40 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-hanbit-gold uppercase tracking-widest block font-mono">
            EXECUTIVE GOVERNANCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest font-serif tracking-tight">
            Dooroomi Global Leadership Council
          </h2>
          <p className="text-sm sm:text-base text-hanbit-muted font-light leading-relaxed">
            Guided by distinguished leaders across South Korea, India, and global manufacturing operations. Click on any leader to view their full portrait and official verbatim message.
          </p>
        </div>

        {/* 4 Executive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {leadershipTeam.map((leader, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedLeader(leader)}
              className="group relative p-6 sm:p-7 rounded-3xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5"
            >
              <div className="space-y-4">
                {/* Executive Portrait with Badge */}
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-2 ring-hanbit-gold/40 group-hover:ring-hanbit-gold transition-all shadow-md bg-stone-50 flex items-center justify-center">
                      <img
                        src={leader.photo}
                        alt={leader.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span 
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white shadow-xs" 
                      title="Verified Authorized Executive"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-hanbit-ivory border border-hanbit-border text-[10px] font-mono font-bold text-hanbit-forest/80 group-hover:bg-hanbit-gold/20 group-hover:text-hanbit-forest transition-colors">
                    Official
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-hanbit-gold tracking-wider block">
                    {leader.role}
                  </span>
                  <h3 className="text-lg font-bold text-hanbit-forest font-serif mt-0.5 group-hover:text-hanbit-gold transition-colors">
                    {leader.name}
                  </h3>
                  <span className="text-[11px] text-gray-400 block font-mono mt-0.5">
                    {leader.nameKo} · {leader.base}
                  </span>
                </div>

                <p className="text-xs text-hanbit-muted leading-relaxed font-light line-clamp-3">
                  {leader.bio}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-hanbit-border/50 flex items-center justify-between text-xs">
                <div className="text-[11px] text-hanbit-forest font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-hanbit-gold" />
                  <span>Authorized Executive</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-hanbit-gold group-hover:translate-x-0.5 transition-transform">
                  <span>Read Message</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Executive Official Message & Profile Modal */}
      {selectedLeader && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedLeader(null)}
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-hanbit-gold/50 flex flex-col max-h-[86vh] h-[86vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
          >
            {/* Top Olive Green Bar matching original company profile PDF */}
            <div className="bg-[#93af35] px-6 sm:px-8 py-4 flex items-center justify-between text-white shadow-xs shrink-0">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-white/90" />
                <h3 className="font-sans font-bold text-base sm:text-xl tracking-tight text-white drop-shadow-xs">
                  {selectedLeader.titleHeader || `Message from ${selectedLeader.role}`}
                </h3>
              </div>
              
              <button
                onClick={() => setSelectedLeader(null)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
                aria-label="Close message"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div 
              className="p-6 sm:p-10 overflow-y-auto overscroll-contain space-y-7 flex-1 bg-[#fcfdfa] [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300 hover:[&::-webkit-scrollbar-thumb]:bg-hanbit-gold [&::-webkit-scrollbar-track]:bg-stone-100"
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              
              {/* Executive Header Area */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-6 border-b border-stone-200">
                
                {/* Framed Photo matching original corporate profile style */}
                <div className="shrink-0 text-center sm:text-left">
                  <div className="w-36 h-40 sm:w-44 sm:h-48 rounded-2xl border-[3px] border-[#c0392b] p-1 bg-white shadow-lg overflow-hidden mx-auto sm:mx-0 flex items-center justify-center">
                    <img
                      src={selectedLeader.photo}
                      alt={selectedLeader.name}
                      className="w-full h-full object-cover object-top rounded-xl"
                    />
                  </div>
                  <div className="mt-3">
                    <h4 className="font-extrabold text-[#1a365d] text-base sm:text-lg tracking-tight">
                      {selectedLeader.name.toUpperCase()}
                    </h4>
                    <span className="text-xs sm:text-sm font-bold text-[#2b6cb0] block mt-0.5">
                      {selectedLeader.role}
                    </span>
                    <span className="text-xs text-gray-500 font-mono block mt-0.5">
                      {selectedLeader.nameKo} · {selectedLeader.base}
                    </span>
                  </div>
                </div>

                {/* Quick Meta Badges & Mission */}
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hanbit-ivory border border-hanbit-border text-xs font-semibold text-hanbit-forest">
                    <ShieldCheck className="w-4 h-4 text-hanbit-gold" />
                    <span>Dooroomi Co., Ltd. Official Executive Profile</span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs sm:text-sm text-amber-950 font-serif italic leading-relaxed shadow-2xs">
                    <Quote className="w-5 h-5 text-hanbit-gold inline-block mr-2 -mt-1" />
                    “To contribute to the human health by providing the best service with our best technology and love.” (사랑 · 봉사 · 친절)
                  </div>

                  {/* Credentials Pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(selectedLeader.credentials || []).map((cred, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 text-[11px] font-mono font-medium flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{cred}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verbatim Official Speech Content */}
              <div className="space-y-4 text-stone-800 text-sm sm:text-base leading-relaxed sm:leading-loose font-normal">
                {(selectedLeader.fullMessage || [selectedLeader.bio]).map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Executive Switcher Navigation */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-500 font-mono">Other Executives:</span>
                  <div className="flex gap-2">
                    {leadershipTeam.map((lead, lIdx) => (
                      <button
                        key={lIdx}
                        onClick={() => setSelectedLeader(lead)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          lead.id === selectedLeader.id
                            ? 'bg-hanbit-forest text-hanbit-gold ring-2 ring-hanbit-gold shadow-xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                        title={lead.name}
                      >
                        <span className="w-4 h-4 rounded-full overflow-hidden inline-block shrink-0">
                          <img src={lead.photo} alt={lead.name} className="w-full h-full object-cover" />
                        </span>
                        <span>{lead.name.split(' ')[lead.name.split(' ').length - 1]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const currentIndex = leadershipTeam.findIndex(l => l.id === selectedLeader.id);
                      const prevIndex = (currentIndex - 1 + leadershipTeam.length) % leadershipTeam.length;
                      setSelectedLeader(leadershipTeam[prevIndex]);
                    }}
                    className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={() => {
                      const currentIndex = leadershipTeam.findIndex(l => l.id === selectedLeader.id);
                      const nextIndex = (currentIndex + 1) % leadershipTeam.length;
                      setSelectedLeader(leadershipTeam[nextIndex]);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-hanbit-forest hover:bg-emerald-950 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Next Executive</span>
                    <ChevronRight className="w-3.5 h-3.5 text-hanbit-gold" />
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Bottom Bar */}
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 shrink-0">
              <span className="font-mono text-[11px] text-stone-500 text-center sm:text-left">
                Source: Official Dooroomi Corporate Profile & Korean Medical Council Registry
              </span>

              <div className="flex items-center gap-3">
                {onOpenPdfModal && (
                  <button
                    onClick={() => {
                      setSelectedLeader(null);
                      onOpenPdfModal();
                    }}
                    className="text-hanbit-forest hover:text-hanbit-gold font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-hanbit-gold" />
                    <span>View Full 15-Page PDF</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedLeader(null)}
                  className="px-4 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

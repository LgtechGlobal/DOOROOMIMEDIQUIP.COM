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
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#edf4f0] via-[#e4ede7] to-[#dae7de] relative overflow-hidden border-t border-b border-[#c8d9ce]">
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
          <p className="text-sm sm:text-base text-slate-800 font-normal leading-relaxed">
            Guided by distinguished leaders across South Korea, India, and global manufacturing operations. Click on any leader to view their full portrait and official verbatim message.
          </p>
        </div>

        {/* Executive Cards Grid (Expanded Width & Grand Luxury Styling) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {leadershipTeam.map((leader, idx) => {
            const isCeo = leader.id === 'matthew-seong';
            return (
              <div
                key={idx}
                onClick={() => setSelectedLeader(leader)}
                style={{ backgroundColor: isCeo ? '#8dc6e0' : undefined }}
                className={`group relative p-8 sm:p-9 rounded-3xl backdrop-blur-md border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-2 overflow-hidden ${
                  isCeo
                    ? 'bg-[#8dc6e0] border-[#6eaecb] shadow-xl hover:shadow-2xl hover:border-amber-400'
                    : 'bg-white/95 border-[#cfe0d5] hover:border-amber-500/80 shadow-md hover:shadow-2xl'
                }`}
              >
                {/* Subtle Ambient Glow behind card on hover */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-2xl transition-all pointer-events-none ${
                  isCeo ? 'bg-white/30 group-hover:bg-white/40' : 'bg-amber-400/10 group-hover:bg-amber-400/20'
                }`} />

                <div className="space-y-6 relative z-10">
                  {/* Executive Portrait Header Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="relative">
                      <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 transition-all duration-300 shadow-lg flex items-center justify-center ${
                        isCeo ? 'ring-[#0a2342]/30 group-hover:ring-[#0a2342] bg-white' : 'ring-amber-400/30 group-hover:ring-amber-500 bg-stone-100'
                      }`}>
                        <img
                          src={leader.photo}
                          alt={leader.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <span 
                        className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white shadow-md" 
                        title="Verified Authorized Executive"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide flex items-center gap-1.5 shadow-2xs ${
                        isCeo 
                          ? 'bg-[#0a2342] text-white border border-[#0a2342]' 
                          : 'bg-amber-500/10 border border-amber-500/30 text-amber-800'
                      }`}>
                        <ShieldCheck className={`w-3.5 h-3.5 ${isCeo ? 'text-amber-300' : 'text-amber-600'}`} />
                        <span>{isCeo ? 'Global CEO' : 'India CEO'}</span>
                      </span>
                      <span className={`text-[11px] font-mono font-bold ${isCeo ? 'text-slate-900' : 'text-slate-600'}`}>
                        {isCeo ? '🇰🇷 South Korea' : '🇮🇳 India'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-2xl sm:text-3xl font-extrabold font-serif mt-1 tracking-tight transition-colors ${
                      isCeo ? 'text-[#07192f] group-hover:text-[#040f1d]' : 'text-[#0d221b] group-hover:text-amber-700'
                    }`}>
                      {leader.name}
                    </h3>
                  </div>

                  {/* Bio Narrative */}
                  <p className={`text-sm sm:text-base leading-relaxed font-normal ${
                    isCeo ? 'text-slate-950 font-medium' : 'text-slate-800'
                  }`}>
                    {leader.bio}
                  </p>

                </div>

                {/* Card Footer Button */}
                <div className={`pt-6 mt-6 border-t flex items-center justify-between relative z-10 ${
                  isCeo ? 'border-sky-800/20' : 'border-neutral-200/80'
                }`}>
                  <div className={`text-xs font-semibold flex items-center gap-1.5 ${
                    isCeo ? 'text-slate-900' : 'text-slate-800'
                  }`}>
                    <ShieldCheck className={`w-4 h-4 ${isCeo ? 'text-[#0a2342]' : 'text-amber-600'}`} />
                    <span>Authorized Executive</span>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                    isCeo 
                      ? 'bg-[#0a2342] text-white group-hover:bg-[#153a6b]' 
                      : 'bg-amber-500/10 group-hover:bg-amber-500 text-amber-900 group-hover:text-white'
                  }`}>
                    <span>Read Full Message</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
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
            {/* Top Bar matching leadership branding */}
            <div 
              style={{ backgroundColor: selectedLeader.id === 'matthew-seong' ? '#8dc6e0' : '#93af35' }}
              className={`px-6 sm:px-8 py-4 flex items-center justify-between shadow-xs shrink-0 ${
                selectedLeader.id === 'matthew-seong' ? 'text-slate-950 bg-[#8dc6e0]' : 'text-white bg-[#93af35]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className={`w-5 h-5 ${selectedLeader.id === 'matthew-seong' ? 'text-slate-950' : 'text-white/90'}`} />
                <h3 className={`font-sans font-bold text-base sm:text-xl tracking-tight drop-shadow-xs ${
                  selectedLeader.id === 'matthew-seong' ? 'text-slate-950' : 'text-white'
                }`}>
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
                      loading="lazy"
                      className="w-full h-full object-cover object-top rounded-xl"
                    />
                  </div>
                  <div className="mt-3">
                    <h4 className="font-extrabold text-[#1a365d] text-base sm:text-lg tracking-tight">
                      {selectedLeader.name.toUpperCase()}
                    </h4>
                  </div>
                </div>

                {/* Quick Meta Badges & Mission */}
                <div className="flex-1 space-y-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs sm:text-sm text-amber-950 font-serif italic leading-relaxed shadow-2xs">
                    <Quote className="w-5 h-5 text-hanbit-gold inline-block mr-2 -mt-1" />
                    “To contribute to the human health by providing the best service with our best technology and love.” (사랑 · 봉사 · 친절)
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

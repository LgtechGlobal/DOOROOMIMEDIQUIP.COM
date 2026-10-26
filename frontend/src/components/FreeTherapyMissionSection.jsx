import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  PhoneCall, 
  Download, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Award, 
  ExternalLink,
  FileText,
  Flame,
  Zap,
  Users
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const FreeTherapyMissionSection = ({ onContactClick, onNavigateAbout, onNavigateTherapy }) => {
  const [showPdfModal, setShowPdfModal] = useState(false);

  const keyBenefits = [
    {
      icon: Flame,
      title: "Spinal Traction & Acupressure",
      subtitle: "BEDRO Smart-1 Technology",
      desc: "Internally guided natural jade rollers trace your spine, providing orthopedic traction, gentle moxibustion heat, and vertebra decompression."
    },
    {
      icon: Zap,
      title: "Bone Marrow & RBC Production",
      subtitle: "TAEYANGSUK Bio-Mineral Mat",
      desc: "50-60 Hz alternating magnetic field and rich negative ions penetrate the bone marrow to stimulate healthy RBC, WBC, and platelet generation."
    },
    {
      icon: Activity,
      title: "85% Clinical Pain Relief",
      subtitle: "BioWave Neuro-Stimulation",
      desc: "Blocks pain signals from reaching the brain before you feel discomfort, providing up to 72 hours of persistent joint and nerve relief."
    },
    {
      icon: HeartHandshake,
      title: "100% Free Daily Sessions",
      subtitle: "Zero Obligation, No Strings Attached",
      desc: "Come every single day to any of our 15+ therapy centers across India. Take regular sessions with your entire family completely free."
    }
  ];

  const targetConditions = [
    "Severe Slip Disc & Sciatica",
    "Cervical & Lumbar Spondylosis",
    "Knee Osteoarthritis & Joint Pain",
    "Paralysis & Stroke Recovery",
    "High Blood Pressure & Diabetes",
    "Chronic Insomnia & Nervous Tension",
    "Asthma & Respiratory Weakness",
    "Digestive Disorders & Fatty Liver"
  ];

  return (
    <section id="free-therapy" className="relative py-20 lg:py-28 bg-gradient-to-b from-[#fdfbf7] via-[#f8f2e6] to-[#f2e7d3] overflow-hidden border-t border-b border-[#dfd4be]">
      
      {/* Decorative Background Radiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-hanbit-gold/10 via-hanbit-sage-light/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-hanbit-forest/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-hanbit-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        
        {/* Header Tagline & Mission Statement */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-hanbit-gold/40 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-hanbit-forest font-mono">
              Public Health Initiative · 대한민국 두루미 무료 체험관
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest font-serif tracking-tight leading-tight">
            Dooroomi’s Core Mission: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hanbit-forest via-emerald-800 to-hanbit-gold">
              100% Free Daily Therapy For Every Family
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-hanbit-ink/80 font-light leading-relaxed max-w-3xl mx-auto pt-2">
            Guided by our corporate motto <strong className="text-hanbit-forest font-semibold">“Love, Service, and Kindness”</strong> (사랑 · 봉사 · 친절), Dooroomi was established in South Korea on November 24, 1991. Unlike conventional medical companies, we invite you and your loved ones to visit our 15+ authorized centers daily to receive premium medical therapy at absolutely <strong>zero cost</strong>.
          </p>
        </div>

        {/* Highlight Banner: Why Is It 100% Free? */}
        <div className="mt-12 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-hanbit-forest via-emerald-950 to-hanbit-dark text-white shadow-2xl relative overflow-hidden border border-hanbit-gold/30">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-hanbit-gold/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-hanbit-gold text-xs font-semibold">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Our Unconditional Community Pledge</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
                "Experience Real Healing First — No Strings Attached."
              </h3>

              <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed">
                Under the leadership of India Managing Director <b>Mrs. Mahi Singh</b>, our philosophy has always been simple: You should never have to spend hard-earned money before knowing whether a medical therapy works for your condition. Over 15 state-of-the-art therapeutic centers are operating every day across India waiting to serve you.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                  <Clock className="w-4 h-4 text-hanbit-gold shrink-0" />
                  <span>Center Timings: Mon–Sat 8:00 AM – 5:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                  <Users className="w-4 h-4 text-hanbit-gold shrink-0" />
                  <span>Open to All Ages & Conditions</span>
                </div>
              </div>
            </div>

            {/* Right Action Block with Helpline */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center space-y-4 shadow-inner">
              <span className="text-xs uppercase font-mono tracking-widest text-hanbit-gold block font-semibold">
                National Helpline & Support
              </span>

              <div>
                <a
                  href={`tel:${SITE_CONFIG.tollFree}`}
                  className="inline-flex items-center gap-3 text-2xl sm:text-3xl font-black text-white hover:text-hanbit-gold transition-colors font-mono tracking-wide"
                >
                  <PhoneCall className="w-7 h-7 text-hanbit-gold animate-bounce" />
                  <span>{SITE_CONFIG.tollFree}</span>
                </a>
                <span className="block text-[11px] text-gray-300 mt-1">
                  Toll-Free Customer Care (All India)
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onContactClick}
                  className="w-full py-3.5 px-6 rounded-xl bg-hanbit-gold hover:bg-yellow-500 text-hanbit-dark font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <span>Book Free Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Technological Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="group p-7 rounded-3xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#f0f5f0] group-hover:bg-hanbit-forest text-hanbit-forest group-hover:text-hanbit-gold flex items-center justify-center transition-colors shadow-xs">
                    <Icon className="w-7 h-7 transition-transform group-hover:scale-110" />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase font-bold text-hanbit-gold tracking-wider block">
                      {item.subtitle}
                    </span>
                    <h4 className="text-lg font-bold text-hanbit-forest font-serif mt-1 group-hover:text-emerald-950">
                      {item.title}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-hanbit-muted leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-hanbit-border/50 mt-4 flex items-center gap-1.5 text-xs font-semibold text-hanbit-forest group-hover:text-hanbit-gold transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Clinically Verified Technology</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Conditions Treated & Recovered Grid */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-white border border-hanbit-border shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-hanbit-border/60">
            <div>
              <span className="text-xs font-bold text-hanbit-gold uppercase tracking-widest block font-mono">
                Real Patient Indications
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif mt-1">
                Conditions Showing Remarkable Improvement
              </h3>
              <p className="text-xs sm:text-sm text-hanbit-muted mt-2 max-w-2xl font-light">
                Documented in thousands of regular attendees across Dooroomi's Indian therapeutic centers. Daily moxibustion and far-infrared therapy stimulate natural biological self-repair.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-8">
            {targetConditions.map((cond, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-gradient-to-br from-hanbit-ivory to-white border border-hanbit-border/70 hover:border-hanbit-forest/40 transition-all flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-hanbit-forest">
                  {cond}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Center Notice */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-emerald-900">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                <strong>Authorized Centers Active In:</strong> Bhubaneswar (Palasuni Square & Cuttack), New Delhi, and expanding across major Indian states.
              </span>
            </div>

            <button
              onClick={onContactClick}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 cursor-pointer shrink-0 self-start sm:self-auto"
            >
              Contact Nearest Center →
            </button>
          </div>
        </div>

        {/* Flagship Machines Teaser Linking to Therapy Page */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-hanbit-forest via-emerald-950 to-hanbit-dark text-white p-8 sm:p-12 shadow-xl border border-hanbit-gold/40">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="text-xs font-mono font-bold text-hanbit-gold uppercase tracking-widest block">
                Flagship Physiotherapy Equipment · 대한민국 두루미
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
                BEDRO Smart-1 & TAEYANGSUK PLUS Thermal Mat
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 font-light leading-relaxed">
                Discover the 6 foundational sciences of Dooroomi therapy: Spinal Soft Tissue Traction, Ancient Meridian Acupressure, Far-Infrared Moxibustion, 1890 Chiropractic Alignment, 12,000 Gauss Alternating Magnetism (50–60 Hz), and Patented BioWave Neuromodulation.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              {onNavigateTherapy && (
                <button
                  onClick={onNavigateTherapy}
                  className="px-6 py-3 rounded-full bg-hanbit-gold hover:bg-amber-300 text-hanbit-dark text-xs font-bold transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  <span>Explore Dedicated Therapy Science & Equipment →</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* PDF Quick Preview Lightbox Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-hanbit-gold/50">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-hanbit-forest text-white flex items-center justify-between border-b border-hanbit-gold/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-hanbit-gold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base sm:text-lg">
                    Official Dooroomi Company Profile
                  </h4>
                  <span className="text-xs text-gray-300 font-mono">
                    South Korea Inception (1991) · Global Operations (51+ Nations) · 15 Pages
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

            {/* PDF Viewer Iframe */}
            <div className="flex-1 bg-gray-100 relative">
              <iframe
                src={`${SITE_CONFIG.companyProfilePdf}#toolbar=1&navpanes=0`}
                title="Dooroomi Company Profile PDF"
                className="w-full h-full border-none"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-hanbit-ivory border-t border-hanbit-border flex items-center justify-between text-xs text-hanbit-muted">
              <span>Dooroomi Co., Ltd. & Dooroomi Medical Pvt. Ltd. Official Documentation</span>
              <a
                href={SITE_CONFIG.companyProfilePdf}
                target="_blank"
                rel="noreferrer"
                className="text-hanbit-forest font-bold hover:text-hanbit-gold flex items-center gap-1"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

import React, { useState } from 'react';
import { 
  HeartPulse, 
  Activity, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Home, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  Zap,
  Flame,
  Thermometer,
  Waves,
  Stethoscope,
  Eye,
  Download,
  Maximize2,
  X,
  Award,
  PhoneCall,
  BookOpen,
  HeartHandshake,
  Compass,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const TherapyPage = ({ onNavigateHome, onNavigateGallery, onContactClick }) => {
  const [activeTab, setActiveTab] = useState('flagship'); // 'flagship' | 'principles' | 'science' | 'minerals' | 'archival'
  const [selectedBrochurePage, setSelectedBrochurePage] = useState(null);

  // Original brochure scans data
  const brochurePages = [
    {
      pageNumber: 7,
      title: "Dooroomi Therapy Principles",
      subtitle: "Massage · Acupressure · Moxibustion (Spinal Care)",
      image: "/assets/therapy/therapy-principles-page7.png",
      category: "Eastern Healing Principles",
      desc: "Comprehensive foundation of spinal soft tissue manipulation, meridian acupressure point release, and deep far-infrared moxibustion heat therapy."
    },
    {
      pageNumber: 8,
      title: "Advanced Biomedical Technologies",
      subtitle: "Chiropractic · 12K Gauss Electromagnetism · BioWave",
      image: "/assets/therapy/therapy-science-page8.png",
      category: "Biomedical Engineering",
      desc: "Dr. D. D. Palmer's 1890 Chiropractic vertebral realignment, high-speed 50-60Hz alternating electromagnetism, and clinical 85% pain-blocking BioWave."
    },
    {
      pageNumber: 9,
      title: "Bio-Mineralogy & Photon Energy",
      subtitle: "Taeyangsuk 7 Minerals & Red Light Phototherapy",
      image: "/assets/therapy/therapy-taeyangsuk-minerals-page9.png",
      category: "Mineral Biotechnology",
      desc: "Taeyangsuk 'The First Ray of Sun' combining 7 natural therapeutic rare-earth minerals, photodynamic red photon therapy, and international quality awards."
    },
    {
      pageNumber: 10,
      title: "BEDRO Smart-1 Thermal Massager",
      subtitle: "Flagship Spine Care Centre Equipment & Product Range",
      image: "/assets/therapy/therapy-bedro-smart1-page10.png",
      category: "Flagship Medical System",
      desc: "Automatic thermal massage bed with internal ergonomic guidance, nervous system activation, intrinsic natural healing power, and postural recovery."
    },
    {
      pageNumber: 11,
      title: "TAEYANGSUK PLUS Thermal Mat",
      subtitle: "Whole-Body FIR, 12K Gauss Magnetism & Bio-Wave Accessories",
      image: "/assets/therapy/therapy-taeyangsuk-mat-page11.png",
      category: "Whole-Body Therapy Mat",
      desc: "Clinical physiotherapy mat featuring dense Taeyangsuk stone grid, photon energy, Bio-Wave conductive pads, reflexology slippers, and handheld grips."
    }
  ];

  // The 7 Natural Minerals of Taeyangsuk (Page 9)
  const taeyangsukMinerals = [
    {
      id: 1,
      name: "Korean Nephrite Jade",
      korean: "천연 옥 (Nephrite)",
      color: "from-emerald-600 to-teal-800",
      accent: "#059669",
      role: "Thermal Far-Infrared Resonance",
      desc: "Emits deep-penetrating 8-14μm far-infrared rays matching the bio-energetic vibrational frequency of water molecules within human vascular tissue."
    },
    {
      id: 2,
      name: "Elvan / Quartz Porphyry",
      korean: "맥반석 (Maekban-seok)",
      color: "from-amber-600 to-yellow-800",
      accent: "#d97706",
      role: "Mineral Ion Exchange & Purification",
      desc: "Porous crystalline mineral that absorbs impurities, radiates gentle thermal ions, and enriches cellular fluid with bio-essential trace elements."
    },
    {
      id: 3,
      name: "Germanium Bio-Ore",
      korean: "게르마늄 (Germanium)",
      color: "from-cyan-700 to-blue-900",
      accent: "#0284c7",
      role: "Cellular Oxygenation & Dehydrogenation",
      desc: "Semiconductor mineral known for releasing negative charges that bind surplus positive hydrogen ions, enhancing cellular aerobic respiration."
    },
    {
      id: 4,
      name: "Tourmaline Pyroelectric Crystal",
      korean: "전기석 (Tourmaline)",
      color: "from-stone-600 to-slate-900",
      accent: "#475569",
      role: "Continuous Negative Ion Emission",
      desc: "Permanently polar mineral exhibiting piezoelectricity and pyroelectricity, continuously bathing the body in refreshing, anti-oxidative negative ions."
    },
    {
      id: 5,
      name: "Korean Yellow Ocher",
      korean: "황토 (Hwangto)",
      color: "from-orange-700 to-amber-900",
      accent: "#ea580c",
      role: "Deep Earth Detoxification Enzymes",
      desc: "Traditional Korean red/yellow clay rich in catalase, diphenol oxidase, and beneficial soil microbes that neutralize toxins and quell systemic inflammation."
    },
    {
      id: 6,
      name: "Sericite Bio-Mineral",
      korean: "견운모 (Sericite)",
      color: "from-rose-700 to-pink-900",
      accent: "#e11d48",
      role: "Cellular Vitality & Micro-Vibration",
      desc: "Fine-grained mica mineral that emits high-frequency natural bio-waves, soothing irritable sensory nerve endings and promoting deep muscular relaxation."
    },
    {
      id: 7,
      name: "Volcanic Basalt Ceramic",
      korean: "화산석 (Volcanic Stone)",
      color: "from-zinc-700 to-neutral-900",
      accent: "#3f3f46",
      role: "Sustained Radiant Thermal Storage",
      desc: "Dense igneous rock capable of absorbing high thermal energy and radiating deep, non-scorching therapeutic heat deep into visceral organs and joints."
    }
  ];

  // The 6 Foundational Therapy Principles & Sciences (Pages 7 & 8)
  const therapyPrinciples = [
    {
      num: "01",
      title: "Spinal Soft Tissue Massage",
      subtitle: "Ergonomic Traction & Unblocking",
      icon: Waves,
      tag: "Anatomical & Kinetic Therapy",
      summary: "Soft tissue manipulation acting on and manipulating the body with structured tension, motion, and vibration.",
      details: [
        "Spinal stretching relaxes muscles and tendons along the paravertebral column.",
        "Relieves mechanical compressive pressure from the spinal cord and exiting nerve roots.",
        "Facilitates vertebrae movement back into their natural physiological lordotic curvature.",
        "Prepares the musculoskeletal back structures for subsequent deep thermal moxibustion."
      ],
      koreanNote: "척추 지압 및 근육 이완 요법"
    },
    {
      num: "02",
      title: "Ancient Meridian Acupressure",
      subtitle: "Needle-Free Energy Center Stimulation",
      icon: HeartPulse,
      tag: "Eastern Energy Balance",
      summary: "Targeted mechanical pressure applied to specific biological acupoints without invasive needles.",
      details: [
        "Accesses and unblocks congested meridian energy channels (Qi/Ki) throughout the torso.",
        "Energy flowing in channels is drawn toward the surface, immediately boosting microcirculation.",
        "Relieves nervous system tension, lowers elevated cortisol, and enables deep visceral relaxation.",
        "Regulates internal bio-energy by strengthening areas of deficiency and dispersing excess congestion."
      ],
      koreanNote: "경락 지압 및 기혈 순환 요법"
    },
    {
      num: "03",
      title: "Far-Infrared Moxibustion",
      subtitle: "Deep-Penetrating Thermal Kinetic Energy",
      icon: Flame,
      tag: "Hyperthermic Tissue Restoration",
      summary: "Traditional thermal treatment modeled after medicinal mugwort heat, penetrating up to 7cm into deep tissues.",
      details: [
        "Warms deep abdominal, lumbar, and pelvic regions and targeted acupuncture points.",
        "Thermal heat induces high kinetic energy within cellular fluids, creating micro-motion and circulation.",
        "Proven clinical relief for stubborn musculoskeletal pains, sports trauma, and degenerative conditions.",
        "Overcomes diagnostic and treatment limitations often encountered in purely symptomatic Western drugs."
      ],
      koreanNote: "원적외선 온열 뜸 요법"
    },
    {
      num: "04",
      title: "Chiropractic Spinal Realignment",
      subtitle: "Dr. D. D. Palmer Science (Est. 1890)",
      icon: Stethoscope,
      tag: "Vertebral Subluxation Correction",
      summary: "Derived from Greek 'Chiro' (hand) and 'Practice' (action), introduced by Dr. D. D. Palmer in 1890.",
      details: [
        "Founded on the principle that the body possesses innate healing capacity when the skeleton is aligned.",
        "Eliminates disrupted nerve transmission caused by articulate subluxation of spinal vertebrae.",
        "Improves central nervous system transmission efficiency, restoring organ homeostasis.",
        "Taught worldwide in premier medical and paramedical colleges for neuro-orthopedic rehabilitation."
      ],
      koreanNote: "카이로프랙틱 척추 교정 과학"
    },
    {
      num: "05",
      title: "12,000 Gauss Electromagnetic Therapy",
      subtitle: "50–60 Hz High-Speed Alternating Field",
      icon: Zap,
      tag: "Pioneered Medical Magnetic Wave",
      summary: "Dooroomi breakthrough integrating a high-power 12,000 Gauss magnetic system directly into Taeyangsuk Mat.",
      details: [
        "Creates a strong alternating magnetic field when in contact with the precision electric field.",
        "North and South magnetic poles alternate rapidly 50 to 60 times per second.",
        "Induces therapeutic micro-currents in blood vessels, stimulating red blood cell (RBC) separation.",
        "Penetrates deep into bone marrow to activate intrinsic hematopoietic cellular renewal."
      ],
      koreanNote: "12,000 가우스 고속 교번 자기장 치료"
    },
    {
      num: "06",
      title: "Patented BioWave Pain Blocker",
      subtitle: "85% Clinical Efficacy · 72-Hour Relief",
      icon: Activity,
      tag: "Neuro-Synaptic Signal Modulation",
      summary: "Patented technology delivering specialized electrical signals through the skin to block pain at the source.",
      details: [
        "Prevents pain signals from traveling along C-fibers and reaching the cerebral pain centers.",
        "Clinical trials document that 85% of acute and chronic patients respond positively to BioWave.",
        "Single 30-minute treatment delivers documented pain relief and reduced stiffness for up to 72 hours.",
        "Restores active range of motion without oral analgesics, NSAIDs, or invasive injections."
      ],
      koreanNote: "바이오웨이브 특허 통증 차단 기술"
    }
  ];

  return (
    <div className="bg-[#fcfdfa] min-h-screen py-8 sm:py-14 text-hanbit-ink">
      
      {/* Lightbox Modal for Archival Brochure Inspection */}
      {selectedBrochurePage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedBrochurePage(null)}
          data-lenis-prevent
        >
          <div 
            className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-hanbit-gold/40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-hanbit-border bg-hanbit-ivory">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-hanbit-gold bg-hanbit-gold/10 px-2.5 py-0.5 rounded-full border border-hanbit-gold/30">
                  Official Archival Document · Page {selectedBrochurePage.pageNumber}
                </span>
                <h3 className="text-lg font-bold text-hanbit-forest font-serif mt-1">
                  {selectedBrochurePage.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-2">
                <a 
                  href={selectedBrochurePage.image} 
                  download={`Dooroomi-Therapy-Page-${selectedBrochurePage.pageNumber}.png`}
                  className="p-2 rounded-full hover:bg-hanbit-border/60 text-hanbit-forest transition-colors"
                  title="Download High-Res Scan"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => setSelectedBrochurePage(null)}
                  className="p-2 rounded-full hover:bg-hanbit-border/60 text-hanbit-muted hover:text-hanbit-forest transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body with Isolated Scroll */}
            <div className="overflow-y-auto p-4 sm:p-6 bg-stone-100 flex items-center justify-center">
              <img 
                src={selectedBrochurePage.image} 
                alt={selectedBrochurePage.title}
                className="max-h-[68vh] w-auto rounded-xl shadow-lg border border-stone-300 object-contain mx-auto"
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="p-4 sm:p-5 bg-white border-t border-hanbit-border text-xs sm:text-sm text-hanbit-ink/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="font-light leading-relaxed">
                <strong className="text-hanbit-forest font-semibold">{selectedBrochurePage.subtitle}</strong> — {selectedBrochurePage.desc}
              </p>
              <button
                onClick={() => setSelectedBrochurePage(null)}
                className="shrink-0 px-4 py-2 rounded-full bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-bold transition-all shadow-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-hanbit-border">
          <nav className="flex items-center space-x-2 text-xs text-hanbit-muted font-medium">
            <button 
              onClick={() => onNavigateHome('hero')}
              className="hover:text-hanbit-forest flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-hanbit-gold" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <span className="text-hanbit-forest font-semibold">Medical Equipment & Systems</span>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <span className="text-hanbit-gold font-bold">Dooroomi Therapy Science</span>
          </nav>

          <button
            onClick={() => onNavigateHome('hero')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-hanbit-border bg-white text-xs font-semibold text-hanbit-forest hover:bg-hanbit-sage-light/40 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Hero Banner Header */}
        <div className="relative rounded-3xl bg-gradient-to-br from-hanbit-forest via-emerald-950 to-hanbit-dark text-white p-8 sm:p-14 lg:p-16 mb-12 shadow-2xl overflow-hidden border border-hanbit-gold/40">
          
          {/* Decorative Glows */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-hanbit-gold/15 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-hanbit-gold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-hanbit-gold" />
              <span className="font-mono tracking-wider uppercase text-[11px] font-bold">
                대한민국 두루미 메디컬 테라피 공학 · CLINICAL PHYSIOTHERAPY & BIO-REHABILITATION
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight leading-tight">
              The Scientific Art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hanbit-gold via-amber-200 to-white">
                Dooroomi Natural Therapies
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/85 font-light leading-relaxed max-w-3xl">
              Since 1991 in Seoul, South Korea, <strong>Dooroomi Mediquip</strong> has bridged centuries-old Eastern holistic healing—spinal acupressure, moxibustion, and medicinal jade mineralogy—with advanced Western biomedical engineering: Chiropractic alignment, high-speed 12,000 Gauss alternating electromagnetism, and clinically proven BioWave neuro-stimulation.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t border-white/15">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-200/70 block">Seoul Origin</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-hanbit-gold">1991</span>
                <span className="text-[11px] text-white/70 block font-light">Founded in Korea</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-200/70 block">Magnetic Flux</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-hanbit-gold">12K Gauss</span>
                <span className="text-[11px] text-white/70 block font-light">Deep Induction</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-200/70 block">Pole Alternation</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-hanbit-gold">50–60 Hz</span>
                <span className="text-[11px] text-white/70 block font-light">Rapid Oscillation</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-200/70 block">Pain Blockade</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-hanbit-gold">85% Rate</span>
                <span className="text-[11px] text-white/70 block font-light">Clinical Response</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-200/70 block">Bio-Ceramics</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-hanbit-gold">7 Minerals</span>
                <span className="text-[11px] text-white/70 block font-light">Taeyangsuk Matrix</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-200/70 block">Free Daily Care</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-hanbit-gold">15+ Centers</span>
                <span className="text-[11px] text-white/70 block font-light">Pan-India Mission</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => setSelectedBrochurePage(brochurePages[0])}
                className="px-5 py-2.5 rounded-full bg-hanbit-gold hover:bg-amber-300 text-hanbit-dark text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Inspect Original Medical Brochure</span>
              </button>
              <button
                onClick={onContactClick}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-hanbit-gold" />
                <span>Visit a Free Therapy Center</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-hanbit-border">
          {[
            { id: 'flagship', label: 'Flagship Therapy Equipment', icon: HeartPulse },
            { id: 'principles', label: '6 Foundational Sciences', icon: Compass },
            { id: 'minerals', label: 'Taeyangsuk 7 Minerals & Photon', icon: Sparkles },
            { id: 'archival', label: 'Archival Brochure Scans (5 Pages)', icon: BookOpen }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive 
                    ? 'bg-hanbit-forest text-white shadow-sm' 
                    : 'bg-white text-hanbit-muted hover:text-hanbit-forest border border-hanbit-border hover:bg-hanbit-ivory'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-hanbit-gold' : 'text-hanbit-muted'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: FLAGSHIP THERAPY SYSTEMS (BEDRO SMART-1 & TAEYANGSUK PLUS) */}
        {(activeTab === 'flagship' || activeTab === 'all') && (
          <div className="space-y-12 mb-16 animate-in fade-in duration-300">
            
            {/* Panoramic Banner from Page 10 */}
            <div className="rounded-3xl bg-white border border-hanbit-border p-6 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-hanbit-border/60">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-mono font-bold mb-1">
                    <span>Dooroomi Research & Development Team · South Korea</span>
                  </div>
                  <h3 className="text-xl font-bold text-hanbit-forest font-serif">
                    Our Miraculous Medical & Natural Therapy Range
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBrochurePage(brochurePages[3])}
                  className="px-3.5 py-1.5 rounded-full border border-hanbit-gold/60 text-xs font-semibold text-hanbit-forest hover:bg-hanbit-gold/10 inline-flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-hanbit-gold" />
                  <span>View Archival Page 10</span>
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-hanbit-ivory border border-hanbit-border/50 group">
                <img 
                  src="/assets/therapy/miraculous-products-banner.jpg" 
                  alt="Dooroomi Miraculous Products Panoramic Banner" 
                  className="w-full h-auto object-cover max-h-[140px] sm:max-h-[220px] transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                  <p className="text-xs text-white/90 font-light">
                    Dooroomi India has a wide range of unique and highly efficient products through which it provides natural therapies across authorized health centers.
                  </p>
                </div>
              </div>
            </div>

            {/* 2 Flagship Devices Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Device 1: BEDRO Smart-1 */}
              <div className="rounded-3xl bg-white border border-hanbit-border hover:border-hanbit-gold shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                <div>
                  {/* Image Showcase */}
                  <div className="relative bg-gradient-to-b from-stone-100 to-white p-6 sm:p-8 flex items-center justify-center border-b border-hanbit-border overflow-hidden">
                    <img 
                      src="/assets/therapy/therapy-bedro-smart1-page10.png" 
                      alt="BEDRO Smart-1 Automatic Thermal Massager"
                      className="max-h-[380px] w-auto rounded-xl object-contain drop-shadow-md group-hover:scale-102 transition-transform duration-500 cursor-pointer"
                      onClick={() => setSelectedBrochurePage(brochurePages[3])}
                      title="Click to view full high-res page"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-hanbit-forest text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                        Spine Care Centre Flagship
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <button
                        onClick={() => setSelectedBrochurePage(brochurePages[3])}
                        className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-hanbit-border text-xs font-semibold text-hanbit-forest hover:bg-hanbit-gold hover:text-white shadow-xs inline-flex items-center gap-1.5 transition-all"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge Page</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-hanbit-gold">
                        베드로 스마트 1 · MODEL: BEDRO-SMART-1
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Class II Medical Physiotherapy
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-hanbit-forest font-serif leading-snug">
                      BEDRO Smart-1 Automatic Thermal Massager
                    </h3>

                    <p className="text-xs sm:text-sm text-hanbit-muted leading-relaxed font-light">
                      Bedro Smart-1 is an automatic therapy machine created by Dooroomi Group. Combining the synchronized effects of orthopedic massage, meridian acupressure, and far-infrared moxibustion heat therapy, it gently stretches spinal vertebrae, unblocks compressed nerves, and stimulates deep venous circulation.
                    </p>

                    {/* 5 Core Verified Medical Benefits */}
                    <div className="space-y-2.5 pt-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-hanbit-forest block">
                        Core Clinical Mechanisms (Page 10 Documentation):
                      </span>
                      {[
                        "Automatic Thermal Massager with internal natural jade rollers",
                        "Activates the body's primary central and peripheral nerve function",
                        "Significantly enhances arterial and microvascular blood circulation",
                        "Ignites the body's Intrinsic Natural Healing Power (Homeostasis)",
                        "Repairs spinal posture, releases scoliosis strain & muscle spasms"
                      ].map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-hanbit-ink/85">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Therapeutic Action Summary */}
                    <div className="p-4 rounded-2xl bg-hanbit-ivory border border-hanbit-border/60 text-xs text-hanbit-muted space-y-1">
                      <strong className="text-hanbit-forest block font-semibold">
                        Targeted Musculoskeletal & Neurological Relief:
                      </strong>
                      <p className="font-light leading-relaxed">
                        The inbuilt device emits calibrated heat alongside deep acupressure touch. Far-Infrared (FIR) rays kill bacterial/viral pathogens, accelerate injured tissue regeneration, and provide profound relief from stubborn musculoskeletal pains and sports injuries.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-hanbit-border/40 mt-4">
                  <button
                    onClick={() => setSelectedBrochurePage(brochurePages[3])}
                    className="text-xs font-semibold text-hanbit-forest hover:text-hanbit-gold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Archival Brochure</span>
                  </button>
                  <button
                    onClick={onContactClick}
                    className="px-4 py-2 rounded-full bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Inquire for Bedro Smart-1</span>
                    <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold" />
                  </button>
                </div>
              </div>

              {/* Device 2: TAEYANGSUK MAT */}
              <div className="rounded-3xl bg-white border border-hanbit-border hover:border-hanbit-gold shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                <div>
                  {/* Image Showcase */}
                  <div className="relative bg-gradient-to-b from-stone-100 to-white p-6 sm:p-8 flex items-center justify-center border-b border-hanbit-border overflow-hidden">
                    <img 
                      src="/assets/therapy/therapy-taeyangsuk-mat-page11.png" 
                      alt="TAEYANGSUK MAT Thermal Physiotherapy Mat"
                      className="max-h-[380px] w-auto rounded-xl object-contain drop-shadow-md group-hover:scale-102 transition-transform duration-500 cursor-pointer"
                      onClick={() => setSelectedBrochurePage(brochurePages[4])}
                      title="Click to view full high-res page"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-amber-700 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                        태양석 플러스 · TAEYANGSUK PLUS
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <button
                        onClick={() => setSelectedBrochurePage(brochurePages[4])}
                        className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-hanbit-border text-xs font-semibold text-hanbit-forest hover:bg-hanbit-gold hover:text-white shadow-xs inline-flex items-center gap-1.5 transition-all"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge Page</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-hanbit-gold">
                        태양석 매트 · MODEL: TAEYANGSUK-PLUS
                      </span>
                      <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        12,000 Gauss Alternating Field
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-hanbit-forest font-serif leading-snug">
                      TAEYANGSUK PLUS Thermal Physiotherapy Mat
                    </h3>

                    <p className="text-xs sm:text-sm text-hanbit-muted leading-relaxed font-light">
                      Engineered with a dense mosaic of natural 7-mineral Taeyangsuk stone discs, this clinical mat integrates high-power 12,000 Gauss alternating electromagnetism (50–60 Hz), red photon light therapy, and comprehensive Bio-Wave electro-neuromodulation accessories.
                    </p>

                    {/* 4 Multi-Accessory Systems */}
                    <div className="space-y-2.5 pt-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-hanbit-forest block">
                        Included Clinical Bio-Wave Attachments (Page 11):
                      </span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="p-3 rounded-xl bg-hanbit-ivory border border-hanbit-border/50">
                          <span className="text-[11px] font-bold text-hanbit-forest block">1. PHOTON ENERGY</span>
                          <span className="text-[11px] text-hanbit-muted font-light">Low-level red wavelength emitters for cellular mitochondrial stimulation.</span>
                        </div>
                        <div className="p-3 rounded-xl bg-hanbit-ivory border border-hanbit-border/50">
                          <span className="text-[11px] font-bold text-hanbit-forest block">2. BIO-WAVE PAD</span>
                          <span className="text-[11px] text-hanbit-muted font-light">Dual circular conductive pads for targeted knee, shoulder, and lumbar pain.</span>
                        </div>
                        <div className="p-3 rounded-xl bg-hanbit-ivory border border-hanbit-border/50">
                          <span className="text-[11px] font-bold text-hanbit-forest block">3. BIO-WAVE SLIPPERS</span>
                          <span className="text-[11px] text-hanbit-muted font-light">Direct plantar reflexology stimulation to revitalize lower-limb circulation.</span>
                        </div>
                        <div className="p-3 rounded-xl bg-hanbit-ivory border border-hanbit-border/50">
                          <span className="text-[11px] font-bold text-hanbit-forest block">4. BIO-WAVE HANDLES</span>
                          <span className="text-[11px] text-hanbit-muted font-light">Ergonomic dual conductive grips for arm and upper body meridian stimulation.</span>
                        </div>
                      </div>
                    </div>

                    {/* Bone Marrow & Hematopoietic Stimulation */}
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 space-y-1">
                      <strong className="font-semibold block">
                        Bone Marrow & RBC Production Induction:
                      </strong>
                      <p className="font-light leading-relaxed">
                        The alternating North/South poles (50-60 Hz) generate micro-currents that penetrate deep into bone marrow, stimulating healthy red blood cell (RBC), white blood cell (WBC), and platelet formation while restoring cellular electrical equilibrium.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-hanbit-border/40 mt-4">
                  <button
                    onClick={() => setSelectedBrochurePage(brochurePages[4])}
                    className="text-xs font-semibold text-hanbit-forest hover:text-hanbit-gold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Archival Brochure</span>
                  </button>
                  <button
                    onClick={onContactClick}
                    className="px-4 py-2 rounded-full bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Inquire for Taeyangsuk Mat</span>
                    <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: THE 6 FOUNDATIONAL SCIENCES (PAGES 7 & 8) */}
        {(activeTab === 'principles' || activeTab === 'all') && (
          <div className="space-y-8 mb-16 animate-in fade-in duration-300">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest uppercase block mb-1">
                Pages 7 & 8 · Medical Science Foundations
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-hanbit-forest font-serif">
                The 6 Integrated Pillars of Dooroomi Therapy
              </h2>
              <p className="mt-2 text-sm text-hanbit-muted font-light leading-relaxed">
                By fusing centuries of verified Asian meridian medicine with Nobel-recognized Western physical therapies, Dooroomi delivers a holistic therapeutic synergy that treats the root cause rather than transient symptoms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {therapyPrinciples.map((principle) => {
                const IconComp = principle.icon;
                return (
                  <div
                    key={principle.num}
                    className="p-6 sm:p-8 rounded-3xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-serif font-black text-hanbit-gold/40 group-hover:text-hanbit-gold transition-colors">
                          {principle.num}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-hanbit-forest bg-hanbit-ivory px-3 py-1 rounded-full border border-hanbit-border">
                          {principle.tag}
                        </span>
                      </div>

                      {/* Icon & Title */}
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-hanbit-forest text-hanbit-gold flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-hanbit-forest font-serif group-hover:text-hanbit-gold transition-colors leading-snug">
                            {principle.title}
                          </h3>
                          <span className="text-xs font-mono text-hanbit-gold font-semibold block">
                            {principle.koreanNote}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-hanbit-forest/80 font-medium italic mt-2 mb-4 bg-hanbit-ivory/60 p-2.5 rounded-xl border border-hanbit-border/40">
                        {principle.summary}
                      </p>

                      {/* Bulleted Clinical Details */}
                      <ul className="space-y-2 mt-4">
                        {principle.details.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-hanbit-muted leading-relaxed font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-hanbit-gold shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 mt-6 border-t border-hanbit-border/50 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        <span>Clinical Principle</span>
                      </span>
                      <button
                        onClick={() => setSelectedBrochurePage(principle.num <= '03' ? brochurePages[0] : brochurePages[1])}
                        className="text-xs font-bold text-hanbit-forest hover:text-hanbit-gold inline-flex items-center gap-1"
                      >
                        <span>View Brochure</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: TAEYANGSUK 7 MINERALS & PHOTON ENERGY (PAGE 9) */}
        {(activeTab === 'minerals' || activeTab === 'all') && (
          <div className="space-y-12 mb-16 animate-in fade-in duration-300">
            
            {/* Header Description */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-950 via-stone-900 to-hanbit-forest text-white shadow-xl relative overflow-hidden border border-hanbit-gold/40">
              <div className="max-w-3xl space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-hanbit-gold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TAEYANGSUK (태양석) : "The First Ray of Sun"</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold font-serif">
                  A Synthesis of Nature & Korean Biotechnology
                </h2>

                <p className="text-sm sm:text-base text-stone-200/90 font-light leading-relaxed">
                  Taeyangsuk is born of an orchestrated combination of <strong>7 distinct natural therapeutic minerals</strong> fused under high-temperature sintering for the continuous emission of bio-spirit and cellular energy. Sourced from pristine Korean geological formations, these mysterious minerals resonate harmoniously with human cellular physiology.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedBrochurePage(brochurePages[2])}
                    className="px-4 py-2 rounded-full bg-hanbit-gold text-hanbit-dark text-xs font-bold hover:bg-amber-300 transition-all inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Original Page 9 Mineral Diagram</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 7 Minerals Detailed Grid */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest uppercase block mb-1">
                  Geological Formulation
                </span>
                <h3 className="text-2xl font-bold text-hanbit-forest font-serif">
                  The 7 Sacred Healing Minerals of Taeyangsuk
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {taeyangsukMinerals.map((min) => (
                  <div
                    key={min.id}
                    className="p-6 rounded-2xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Mineral Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-br text-white text-xs font-bold font-mono flex items-center justify-center shadow-xs" style={{ backgroundColor: min.accent }}>
                          {min.id}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-hanbit-forest bg-hanbit-ivory px-2.5 py-0.5 rounded-full border border-hanbit-border">
                          {min.korean}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-hanbit-forest font-serif">
                        {min.name}
                      </h4>

                      <span className="text-xs font-semibold text-hanbit-gold block mt-1 mb-3">
                        {min.role}
                      </span>

                      <p className="text-xs text-hanbit-muted leading-relaxed font-light">
                        {min.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-hanbit-border/40 text-[11px] font-mono text-hanbit-muted/80">
                      Standard: 100% High-Purity Natural Ore
                    </div>
                  </div>
                ))}

                {/* Card 8: Photon Energy Highlight */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950 via-rose-900 to-stone-900 text-white shadow-md flex flex-col justify-between border border-red-500/30">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-8 h-8 rounded-full bg-red-600 text-white text-xs font-bold font-mono flex items-center justify-center shadow-xs">
                        ✦
                      </span>
                      <span className="text-[10px] font-mono font-bold text-red-200 bg-red-900/60 px-2.5 py-0.5 rounded-full border border-red-400/40">
                        포톤 에너지 (Photon)
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white font-serif">
                      Photon Energy (Red Light LLLT)
                    </h4>

                    <span className="text-xs font-semibold text-rose-300 block mt-1 mb-3">
                      Cellular Photodynamic Regeneration
                    </span>

                    <p className="text-xs text-rose-100/80 leading-relaxed font-light">
                      A therapeutic technique using red low-level wavelengths of light (630–660nm) to treat skin tissues, reduce wrinkles, soften scars, and promote rapid healing of persistent deep wounds and bedsores.
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-rose-500/30 text-[11px] font-mono text-rose-200">
                    Mitochondrial Cytochrome C Activation
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 4: ARCHIVAL BROCHURE ORIGINAL SCANS (PAGES 7-11) */}
        {(activeTab === 'archival' || activeTab === 'all') && (
          <div className="space-y-8 mb-16 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest uppercase block mb-1">
                  Original Corporate Heritage Documents
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-hanbit-forest font-serif">
                  Official South Korean Medical Brochure Archive
                </h2>
                <p className="text-xs sm:text-sm text-hanbit-muted font-light mt-1">
                  Direct scans from the original Dooroomi Group corporate portfolio. Click any document below to inspect in high definition.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-hanbit-ivory border border-hanbit-border text-xs text-hanbit-forest font-semibold">
                <FileText className="w-4 h-4 text-hanbit-gold" />
                <span>5 Verified Archival Pages</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {brochurePages.map((page) => (
                <div
                  key={page.pageNumber}
                  onClick={() => setSelectedBrochurePage(page)}
                  className="rounded-2xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Thumbnail View */}
                    <div className="relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200 aspect-[3/4] mb-3 flex items-center justify-center">
                      <img 
                        src={page.image} 
                        alt={page.title}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-full bg-white text-hanbit-forest text-xs font-bold inline-flex items-center gap-1.5 shadow-md">
                          <Maximize2 className="w-3.5 h-3.5 text-hanbit-gold" />
                          <span>Inspect Page</span>
                        </span>
                      </div>
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 rounded-full bg-hanbit-forest/90 text-white font-mono text-[10px] font-bold">
                          Page {page.pageNumber}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-hanbit-gold uppercase tracking-wider block">
                      {page.category}
                    </span>

                    <h4 className="text-sm font-bold text-hanbit-forest font-serif mt-0.5 leading-snug group-hover:text-hanbit-gold transition-colors">
                      {page.title}
                    </h4>

                    <p className="text-[11px] text-hanbit-muted font-light mt-1 line-clamp-2">
                      {page.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-hanbit-border/40 flex items-center justify-between text-[11px] text-hanbit-forest font-semibold">
                    <span>View Archival Scan</span>
                    <ArrowRight className="w-3 h-3 text-hanbit-gold group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Quality & Certification Accreditations (Bottom Page 9) */}
        <div className="rounded-3xl bg-white border border-hanbit-border p-8 sm:p-12 mb-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-mono font-bold border border-amber-200">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>Awards & International Accreditations</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-hanbit-forest font-serif">
                Continuous Quality Excellence & Korean Medical Leadership
              </h3>
              <p className="text-xs sm:text-sm text-hanbit-muted font-light leading-relaxed">
                As documented on Page 9 of our official company archive, Dooroomi has received continuous awards of appreciation and quality excellence from governmental and global healthcare certification agencies. Every therapy bed and mat undergoes stringent electrical safety, thermal cut-off validation, and electromagnetic shielding audits.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono font-bold">
                <span className="px-3 py-1 rounded-lg bg-hanbit-ivory border border-hanbit-border text-hanbit-forest">CE Medical (0120)</span>
                <span className="px-3 py-1 rounded-lg bg-hanbit-ivory border border-hanbit-border text-hanbit-forest">US FDA Listed</span>
                <span className="px-3 py-1 rounded-lg bg-hanbit-ivory border border-hanbit-border text-hanbit-forest">UL Safety 60601-1</span>
                <span className="px-3 py-1 rounded-lg bg-hanbit-ivory border border-hanbit-border text-hanbit-forest">Korea MFDS Class II</span>
                <span className="px-3 py-1 rounded-lg bg-hanbit-ivory border border-hanbit-border text-hanbit-forest">GMP Certified</span>
              </div>
            </div>

            <div 
              className="lg:col-span-7 rounded-2xl bg-stone-100 p-4 border border-stone-300 overflow-hidden shadow-inner cursor-pointer group"
              onClick={() => setSelectedBrochurePage(brochurePages[2])}
              title="Click to view full certificates page"
            >
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src="/assets/therapy/therapy-taeyangsuk-minerals-page9.png" 
                  alt="Dooroomi Awards and Quality Certificates Page 9" 
                  className="w-full h-auto object-cover max-h-[300px] object-bottom group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-4 text-white">
                  <span className="text-xs font-semibold">Page 9: International Certification Registry</span>
                  <span className="text-xs font-bold text-hanbit-gold inline-flex items-center gap-1">
                    <span>Inspect</span>
                    <Maximize2 className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Free Therapy Mission Invitation CTA Banner */}
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-hanbit-forest via-emerald-950 to-hanbit-dark text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl border border-hanbit-gold/40">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-hanbit-gold">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Public Health Mission · 사랑 · 봉사 · 친절</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold font-serif leading-snug">
              Experience Dooroomi Therapy in Person — Completely Free
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
              We welcome you and your family to visit any of our 15+ authorized centers across India for daily free sessions on BEDRO Smart-1 and TAEYANGSUK Mat. Experience genuine relief without any sales pressure or obligation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateHome('free-therapy')}
              className="px-6 py-3 rounded-full border border-hanbit-gold text-white hover:bg-hanbit-gold hover:text-hanbit-dark text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              Explore Free Therapy Mission
            </button>
            <button
              onClick={onContactClick}
              className="px-6 py-3 rounded-full bg-hanbit-gold text-hanbit-dark hover:bg-amber-300 text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              Find Closest Center Near You
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

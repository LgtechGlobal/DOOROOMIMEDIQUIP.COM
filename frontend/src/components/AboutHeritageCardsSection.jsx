import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Building2, 
  Globe2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Heart, 
  Eye, 
  Zap, 
  Maximize2, 
  X, 
  Download,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Award
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const AboutHeritageCardsSection = ({ onContactClick, onOpenPdfModal }) => {
  const [activeModalCard, setActiveModalCard] = useState(null);

  // Lock scroll & pause Lenis when modal is open
  useEffect(() => {
    if (activeModalCard) {
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
  }, [activeModalCard]);

  const heritageCards = [
    {
      id: "spine-lifeline",
      badgeGreen: "Spine:- Root of Human Body",
      koreanTitle: "척추 — 인체의 뿌리이자 생명선",
      title: "Spine is Our Lifeline: Central Support & Nervous Highway",
      pageRef: "Official Profile • Page 6",
      imageSrc: "./assets/about/spine-lifeline.png",
      tagline: "The spine connects your brain to every vital organ. Protecting and aligning it restores full-body wellness.",
      summary: "Your spine connects your central musculoskeletal system, housing the spinal cord nerves that regulate every internal organ including the heart, lungs, stomach, kidneys, and liver.",
      keyPoints: [
        { label: "Cervical Spine", desc: "Regulates head circulation, optic nerves, nasal mucosa, and facial glands." },
        { label: "Thoracic Spine", desc: "Direct neural link to heart, lungs, bronchi, stomach, liver, and pancreas." },
        { label: "Lumbar & Sacral", desc: "Governs kidneys, digestive intestine, lower extremities, and cellular excretion." }
      ],
      paragraphs: [
        "Your spine, or backbone, is your body's central support structure. It connects different parts of your musculoskeletal system. Your spine helps you sit, stand, walk, twist, and bend. Back injuries, spinal cord conditions and other problems can damage the spine and cause debilitating pain.",
        "It gives your body structure and support. It allows you to move about freely and to bend with flexibility. The spine is also designed to protect your spinal cord. The spinal cord is a column of nerves that connects your brain with the rest of your body, allowing you to control your movements and involuntary organ functions.",
        "Dooroomi's advanced thermal medical systems (such as BEDRO Smart-1) are engineered specifically around this biological reality: delivering deep far-infrared jade moxibustion (40°C–70°C), spinal traction, and acupressure to decompress vertebral discs and stimulate self-healing across every connected bodily organ."
      ]
    },
    {
      id: "company-intro",
      badgeGreen: "Company Introduction",
      koreanTitle: "주식회사 두루미 메디칼 기업 역사",
      title: "Dooroomi Medical: Global Healing Movement Since 1991",
      pageRef: "Official Profile • Page 3",
      imageSrc: "./assets/about/company-introduction.png",
      tagline: "Formed in 1991 by Mr. Wan Gyeom Kim in Seoul; now operating in 51+ nations with 15+ Free Therapy Centers in India.",
      summary: "Manufacturer and distributor of world-class medical equipment dedicated to the realization of a long-lived society with unconditional 100% Free Daily Therapy across India.",
      keyPoints: [
        { label: "1991 Seoul Genesis", desc: "Formed by Honourable Global CEO Mr. Wan Gyeom Kim with the ethos of 'Love, Service, and Kindness'." },
        { label: "51+ Countries", desc: "Global export footprint expanded since 2004 across the Americas, Europe, Asia, and Middle East." },
        { label: "India Free Therapy", desc: "Led by Honourable India CEO Mrs. Mahi Singh with 15+ centers giving daily unconditional healing." }
      ],
      paragraphs: [
        "Dooroomi Medical Private Limited is a South Korean Company which was formed by Mr. Wan Gyeom Kim (Honourable Global CEO) in the year 1991 and gradually flourished to Dooroomi Global Group with a variety of products related to health.",
        "Dooroomi Medical Private Ltd is a manufacturer as well as a distributor of life-changing medical products. For the first six years, Dooroomi Medical flourished within South Korea and served the people with its world-class products and services. The company was established with the goal of contributing to the realization of a long-lived society. Therefore, the company has developed various medical healthcare products which help people maintain good health and imbibe Happiness in their daily lives. Our products are the best in the healthcare segment across the globe and have been felicitated by various Government agencies of South Korea, USA, Europe and other countries.",
        "In 2004 Dooroomi Group made a foray into the international market, established itself in America, and received several awards and recognitions from the government and related institutions. Now Dooroomi Group is operating successfully in more than 51 countries globally. Dooroomi Group entered India under the leadership of Honourable India CEO Mrs. Mahi Singh with a noble vision of providing Health and Happiness to every Indian household. The company was incorporated on Nov 24, as DOOROOMI MEDICAL PVT LTD in New Delhi.",
        "At present we have more than 15 therapy centers providing services on a pan-India basis. Large numbers of people receive therapeutic sessions at these centres through our unique 100% Free Therapy Program. Our technology is indigenous (developed by our in-house R&D team) and appreciated across the globe for quality and service excellence."
      ],
      certificates: [
        "Certificate of Conformity (CE from Korea, Germany & European Standard)",
        "U.S Food and Drug Administration (Center for Devices and Radiological Health)",
        "Korean Standard Association Quality Compliance",
        "ISO 13485:2003 (SGS United Kingdom Ltd; Medical Systems & Services)",
        "Certificate of GMP (Korea Food and Drug Administration & Korea Electric Testing)"
      ]
    },
    {
      id: "korea-history",
      badgeGreen: "History of Dooroomi Group: Introduction of Korea",
      koreanTitle: "한국의 역사와 세계 일류 바이오 혁신",
      title: "Korean Innovation: 'Land of the Morning Calm' Technology",
      pageRef: "Official Profile • Page 4",
      imageSrc: "./assets/about/korea-history-map.png",
      tagline: "Inheriting South Korea's world-leading biomedical engineering, robotic manufacturing, and natural thermal healing philosophy.",
      summary: "South Korea is recognized globally as the world leader in innovation, precision robotics, and cutting-edge healthcare technology centered in Seoul.",
      keyPoints: [
        { label: "Capital of R&D", desc: "Seoul R&D Center and Songdo Cleanroom Plant power Dooroomi's advanced manufacturing." },
        { label: "Global Innovation Leader", desc: "South Korea is ranked #1 in global innovation index with unmatched precision electronics." },
        { label: "East-West Integration", desc: "Fusing ancient Korean moxibustion (뜸) and jade therapy with modern neuro-stimulation." }
      ],
      paragraphs: [
        "South Korea, officially the Republic of Korea (ROK) and often referred to as Korea, is a country in East Asia. Also known as the 'Land of the Morning Calm' (고요한 아침의 나라), it is neighbored by China to the west and Japan to the east. Its capital is Seoul, the second largest metropolitan city in the world and a major global center.",
        "South Korea lies in a temperate climate region with predominantly mountainous terrain. Its territory covers a total area of 100,032 square kilometers and has a population of over 48 million, making it one of the most vibrant and educated societies in the world.",
        "South Korea is a developed country with the fourth largest economy in Asia and 15th largest in the world. It is the world leader in innovation among major economies and a powerhouse in technologically advanced goods including precision electronics, robotics, automobiles, and medical devices.",
        "Dooroomi inherits this uncompromising tradition of Korean engineering precision: creating medical beds, thermal therapy systems, and bio-mineral mats that conform to strict global medical standards and deliver unconditional health to households worldwide."
      ]
    }
  ];

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-hanbit-gold/40 text-xs font-semibold text-hanbit-forest shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-hanbit-gold" />
          <span className="font-mono text-hanbit-gold font-bold">OFFICIAL PROFILE ARCHIVES</span>
          <span className="text-hanbit-border">|</span>
          <span className="text-[11px] uppercase tracking-wider text-hanbit-muted">Verified Company Documentation</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hanbit-forest font-serif tracking-tight">
          Foundational Medical Science & Corporate Heritage
        </h2>

        <p className="text-xs sm:text-sm text-hanbit-muted font-light leading-relaxed max-w-2xl mx-auto">
          Key pillars excerpted directly from the official Dooroomi Corporate Documentation (Pages 3, 4 & 6). Click any card to explore full anatomical diagrams and archival documents.
        </p>
      </div>

      {/* 3-Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {heritageCards.map((card) => (
          <div
            key={card.id}
            onClick={() => setActiveModalCard(card)}
            className="group rounded-3xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1.5"
          >
            <div>
              {/* Top Olive Green Bar matching official PDF */}
              <div className="bg-[#93af35] px-5 py-3 text-white flex items-center justify-between shadow-xs">
                <span className="font-bold text-xs sm:text-sm tracking-tight truncate">
                  {card.badgeGreen}
                </span>
                <span className="text-[10px] font-mono bg-black/20 px-2 py-0.5 rounded-full shrink-0">
                  {card.pageRef.split('•')[1]?.trim() || 'Doc'}
                </span>
              </div>

              {/* Card Media Preview Area */}
              <div className="relative aspect-[16/10] bg-stone-50 border-b border-stone-100 overflow-hidden flex items-center justify-center p-3">
                <img
                  src={card.imageSrc}
                  alt={card.title}
                  className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500 shadow-sm rounded-lg"
                />
                
                {/* Overlay Click Hint */}
                <div className="absolute inset-0 bg-hanbit-forest/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-hanbit-forest text-xs font-bold shadow-md flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-hanbit-gold" />
                    <span>View Official Page</span>
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-hanbit-gold tracking-wider block">
                    {card.koreanTitle}
                  </span>
                  <h3 className="text-lg font-bold text-hanbit-forest font-serif mt-0.5 group-hover:text-hanbit-gold transition-colors leading-snug">
                    {card.title}
                  </h3>
                </div>

                <p className="text-xs text-hanbit-muted font-light leading-relaxed line-clamp-3">
                  {card.tagline}
                </p>

                {/* Key Points Bullet List */}
                <div className="space-y-2 pt-1 border-t border-stone-100">
                  {card.keyPoints.map((kp, kpIdx) => (
                    <div key={kpIdx} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-hanbit-forest font-semibold">{kp.label}: </strong>
                        <span className="text-stone-600">{kp.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer Bar */}
            <div className="p-5 pt-3 border-t border-stone-100 bg-stone-50/70 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-stone-500 font-medium">
                {card.pageRef}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-hanbit-gold group-hover:translate-x-0.5 transition-transform">
                <span>Read Full Document</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Archival Detail Lightbox Modal */}
      {activeModalCard && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalCard(null)}
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-hanbit-gold/50 flex flex-col max-h-[88vh] h-[88vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
          >
            {/* Top Olive Green Bar matching official PDF */}
            <div className="bg-[#93af35] px-6 sm:px-8 py-4 flex items-center justify-between text-white shadow-xs shrink-0">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-white/90" />
                <h3 className="font-sans font-bold text-base sm:text-xl tracking-tight text-white drop-shadow-xs">
                  {activeModalCard.badgeGreen}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-black/20 px-3 py-1 rounded-full text-white/90 hidden sm:inline-block">
                  {activeModalCard.pageRef}
                </span>
                <button
                  onClick={() => setActiveModalCard(null)}
                  className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
                  aria-label="Close document"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div 
              className="p-6 sm:p-10 overflow-y-auto overscroll-contain space-y-8 flex-1 bg-[#fcfdfa] [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300 hover:[&::-webkit-scrollbar-thumb]:bg-hanbit-gold [&::-webkit-scrollbar-track]:bg-stone-100"
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              
              {/* Header Title & Subtitle */}
              <div className="space-y-2 border-b border-stone-200 pb-5">
                <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest uppercase block">
                  {activeModalCard.koreanTitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif">
                  {activeModalCard.title}
                </h3>
                <p className="text-sm text-stone-600 font-light leading-relaxed">
                  {activeModalCard.tagline}
                </p>
              </div>

              {/* 2-Column Document Showcase: Original Page + Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Original Archival Page Image */}
                <div className="md:col-span-5 space-y-3">
                  <div className="rounded-2xl border-2 border-stone-200 p-2 bg-white shadow-lg overflow-hidden">
                    <img
                      src={activeModalCard.imageSrc}
                      alt={activeModalCard.title}
                      className="w-full h-auto object-contain rounded-xl max-h-[460px] mx-auto"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 font-mono text-center">
                    Original Scan • Dooroomi Corporate Documentation
                  </div>
                </div>

                {/* Right Column: Detailed Verbatim Text & Pillars */}
                <div className="md:col-span-7 space-y-5">
                  <div className="space-y-4 text-stone-800 text-sm sm:text-base leading-relaxed text-justify">
                    {activeModalCard.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Certifications (if company intro) */}
                  {activeModalCard.certificates && (
                    <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
                      <h4 className="text-xs font-bold font-mono uppercase text-hanbit-forest tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-hanbit-gold" />
                        <span>Official Quality Registrations Cited:</span>
                      </h4>
                      <div className="space-y-2">
                        {activeModalCard.certificates.map((cert, cIdx) => (
                          <div key={cIdx} className="flex items-start gap-2 text-xs text-stone-700">
                            <span className="w-2 h-2 rounded-full bg-hanbit-gold shrink-0 mt-1.5" />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Anatomical Key Points (if spine) */}
                  {activeModalCard.keyPoints && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {activeModalCard.keyPoints.map((kp, kIdx) => (
                        <div key={kIdx} className="p-3.5 rounded-2xl bg-stone-100/80 border border-stone-200 space-y-1">
                          <span className="text-[11px] font-bold text-hanbit-forest font-mono block">
                            {kp.label}
                          </span>
                          <p className="text-[11px] text-stone-600 leading-snug">
                            {kp.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Modal Bottom Bar */}
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 shrink-0">
              <span className="font-mono text-[11px] text-stone-500">
                Source: Dooroomi Mediquip Private Limited Official Profile • New Delhi / Seoul
              </span>

              <div className="flex items-center gap-3">

                <button
                  onClick={() => setActiveModalCard(null)}
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

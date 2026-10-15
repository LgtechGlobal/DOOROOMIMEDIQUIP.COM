import React from 'react';
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
  Building2,
  Stethoscope,
  FileCheck
} from 'lucide-react';

export const TherapyPage = ({ onNavigateHome, onNavigateGallery, onContactClick }) => {
  const devices = [
    {
      id: "bedro-900",
      model: "DM-MED-900",
      name: "Bedro Smart Therapeutic Thermal Bed",
      nameKo: "베드로 스마트 온열 마사지 척추 치료기",
      badge: "Clinical Flagship",
      category: "Spinal Thermal Decompression",
      specs: [
        ["Thermal Medium", "Natural Xiuyan Jade Rollers + Carbon Far-Infrared"],
        ["Temperature Range", "30°C – 70°C Precision Thermostat"],
        ["Acupressure Zones", "Cervical, Thoracic, Lumbar & Sacral Focus"],
        ["Medical Approval", "Korea MFDS Class II Medical Device"]
      ],
      desc: "An engineered medical acupressure bed combining automated internal jade roller traction with deep-penetrating far-infrared moxibustion. Aligns spinal vertebrae, relieves neuromuscular impingement, and promotes deep microvascular circulation."
    },
    {
      id: "electro-300",
      model: "DM-MED-300",
      name: "Trans-Dermal Electroporation & Ultrasound Infusion System",
      nameKo: "경피 흡수 일렉트로포레이션 세포 침투기",
      badge: "Dermatological Grade",
      category: "Needle-Free Active Delivery",
      specs: [
        ["Infusion Mode", "High-Voltage Micro-Current Electroporation"],
        ["Acoustic Frequency", "3MHz Focused Ultrasonic Cavitation"],
        ["Penetration Depth", "Up to 5.0mm into Dermal Reticular Layer"],
        ["Active Absorption", "+450% Compared to Manual Topical Application"]
      ],
      desc: "Designed for medical aesthetic clinics. Temporarily opens micro-channels in lipid cellular bilayers via pulsed electroporation, infusing high-molecular hyaluronic acid, copper tripeptides, and vitamins directly into the dermis without pain or bleeding."
    },
    {
      id: "led-500",
      model: "DM-MED-500",
      name: "Clinical Photodynamic Multi-Spectrum Dome",
      nameKo: "광역학 다파장 메디컬 LED 테라피 돔",
      badge: "Hospital Grade",
      category: "Photodynamic Phototherapy",
      specs: [
        ["Wavelength 1", "630nm Red (Fibroblast Collagen Synthesis)"],
        ["Wavelength 2", "415nm Blue (P. Acnes Microbial Sterilization)"],
        ["Wavelength 3", "830nm Near-Infrared (Deep Wound Repair)"],
        ["LED Density", "1,800 Medical-Grade SMD Diodes"]
      ],
      desc: "Ergonomic clinical canopy delivering targeted narrow-band phototherapy. Accelerates post-operative wound healing, quells erythema, and activates mitochondrial ATP energy production for rapid tissue regeneration."
    },
    {
      id: "cryo-200",
      model: "DM-MED-200",
      name: "Precision Cryo-Thermal Contrast Shock Applicator",
      nameKo: "정밀 크라이오 온열 교차 피부 진정기",
      badge: "Rapid Recovery",
      category: "Thermal Vascular Stimulation",
      specs: [
        ["Cryo Range", "-10°C Instant Cooling"],
        ["Thermal Range", "+42°C Deep Vasodilation"],
        ["Target Indication", "Post-Laser Erythema & Inflammatory Edema"],
        ["Pulse Modes", "Alternating Thermal Shock Micro-Pumping"]
      ],
      desc: "Utilizes solid-state Peltier semiconductor modules to cycle between cryogenic soothing and therapeutic thermal warmth. Rapidly closes pores, constricts inflamed capillaries post-procedure, and restores epidermal homeostasis."
    }
  ];

  const clinicalBenefits = [
    {
      icon: Waves,
      title: "Spinal Microcirculation & Neural Relief",
      desc: "Far-infrared heat combined with mechanical jade roller massage promotes deep tissue thermal relaxation, boosting venous return and soothing compressed nerve roots."
    },
    {
      icon: Zap,
      title: "Cellular Electroporation Permeability",
      desc: "Safe micro-electrical pulses rearrange membrane phospholipids for milliseconds, allowing active peptides and botanical serums to bypass the skin barrier safely."
    },
    {
      icon: Flame,
      title: "Mitochondrial ATP Photobiomodulation",
      desc: "Specific light photons at 630nm and 830nm are absorbed by cytochrome c oxidase within cellular mitochondria, boosting cellular metabolism by up to 150%."
    },
    {
      icon: Stethoscope,
      title: "Certified Medical Device Engineering",
      desc: "All Dooroomi therapy equipment is built to medical safety standards, featuring automatic thermal cut-offs, electromagnetic shielding, and clinical safety compliance."
    }
  ];

  return (
    <div className="bg-[#fbfbfa] min-h-screen py-10 sm:py-16">
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
            <span className="text-hanbit-gold font-bold">Therapeutic Health Engineering</span>
          </nav>

          <button
            onClick={() => onNavigateHome('hero')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-hanbit-border bg-white text-xs font-semibold text-hanbit-forest hover:bg-hanbit-sage-light/40 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-hanbit-gold/30 text-xs font-semibold text-hanbit-forest shadow-2xs mb-4">
            <HeartPulse className="w-4 h-4 text-hanbit-gold" />
            <span className="font-mono text-hanbit-gold font-bold">의료 기기 및 치료 시스템</span>
            <span className="text-hanbit-border">|</span>
            <span className="tracking-wider uppercase text-[11px]">Therapeutic Health Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight font-serif">
            Advanced Medical Therapy Equipment & Precision Clinical Systems.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-hanbit-muted font-light leading-relaxed">
            Since 1998, <b>Dooroomi Mediquip (두루미)</b> has engineered medical-grade thermal therapy beds, electroporation trans-dermal infusion systems, and clinical photodynamic devices for hospitals, rehabilitation centers, and premier dermatological clinics worldwide.
          </p>
        </div>

        {/* 4 Clinical Medical Devices Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {devices.map((dev) => (
            <div 
              key={dev.id}
              className="p-8 rounded-3xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hanbit-ivory border border-hanbit-border text-xs font-mono font-bold text-hanbit-forest">
                    <span>{dev.model}</span>
                    <span className="text-hanbit-gold">|</span>
                    <span className="text-[11px] text-hanbit-muted">{dev.category}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                    {dev.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-hanbit-forest font-serif group-hover:text-hanbit-gold transition-colors leading-snug">
                  {dev.name}
                </h3>
                <p className="text-xs font-medium text-hanbit-gold mt-1 font-mono">
                  {dev.nameKo}
                </p>

                <p className="text-xs sm:text-sm text-hanbit-muted mt-4 leading-relaxed font-light">
                  {dev.desc}
                </p>

                {/* Technical Specifications Mini-Table */}
                <div className="mt-6 border-t border-hanbit-border/60 pt-4 bg-hanbit-ivory/50 rounded-2xl p-4 border">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-hanbit-forest block mb-2 font-mono">
                    Technical & Clinical Parameters
                  </span>
                  <div className="space-y-2">
                    {dev.specs.map(([label, val], idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-hanbit-border/30 last:border-b-0">
                        <span className="text-hanbit-muted">{label}</span>
                        <span className="font-semibold text-hanbit-forest text-right ml-2">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-hanbit-border/70 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Certified Medical System</span>
                </span>
                <button
                  onClick={onContactClick}
                  className="px-4 py-2 rounded-full bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Inquire for Device Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Clinical Benefits Grid */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-hanbit-border shadow-sm mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest uppercase block mb-1">
              Clinical Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif">
              Therapeutic Science & Physiological Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {clinicalBenefits.map((ben, idx) => {
              const IconComp = ben.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-hanbit-ivory border border-hanbit-border/60 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-hanbit-border flex items-center justify-center text-hanbit-gold shadow-xs">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-hanbit-forest">
                    {ben.title}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-hanbit-muted leading-relaxed font-light">
                    {ben.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-hanbit-forest via-emerald-950 to-hanbit-dark text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif">
              Hospital & Aesthetic Clinic Equipment Procurement
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed font-light">
              We supply medical equipment and companion therapeutic formulations under turnkey OEM/ODM contracts with international voltage standards (110V–240V, 50/60Hz), clinical documentation, and distributor warranty support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateGallery}
              className="px-6 py-3 rounded-full border border-hanbit-gold text-white hover:bg-hanbit-gold hover:text-hanbit-dark text-xs font-bold transition-all cursor-pointer"
            >
              Explore Companion Formulations
            </button>
            <button
              onClick={onContactClick}
              className="px-6 py-3 rounded-full bg-hanbit-gold text-hanbit-dark hover:bg-amber-300 text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              Request Equipment Catalog & Quotation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

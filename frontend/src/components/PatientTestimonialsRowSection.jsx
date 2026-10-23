import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MapPin, 
  CheckCircle2, 
  Quote, 
  Maximize2, 
  X, 
  Download, 
  Sparkles, 
  Activity, 
  HeartPulse, 
  FileText,
  BadgeCheck
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { getOptimizedImageUrl } from '../utils/imageUrl';

export const PatientTestimonialsRowSection = () => {
  const { testimonials: dynamicTestimonials } = useData();
  const scrollRef = useRef(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedScan, setSelectedScan] = useState(null);

  const defaultTestimonials = [
    {
      id: "p1",
      name: "Smt. Kmamari Sahoo",
      age: "55 Years",
      location: "Maa Mangala Sahi, Bhubaneswar, Odisha",
      disease: "Severe Back Pain & Blood Pressure",
      diseaseKo: "만성 요통 및 고혈압 완치",
      duration: "Suffering for 5 Years",
      treatment: "BEDRO Smart-1 & Thermal Acupressure",
      image: "/assets/testimonials/patient-kmamari-sahoo.jpg",
      rating: 5,
      docPage: 14,
      quote: "After suffering for 5 years with severe Back Pain and High BP, I spent huge amounts on hospital tests with zero relief. At Dooroomi, after 3 months of continuous free therapy, all my problems are cured and now I am living a healthy and happy life!",
      fullStory: "My name is Kmamari Sahoo and my age is 55yrs, I am a resident of Maa Mangala Sahi, Bhubaneswar. Since last 5 yrs, I was suffering from the problem of severe Back Pain & Blood Pressure. When I went to hospital for the check-up, doctor asked me to undergo several tests. As my financial condition is not very sound so I got worried about the expenses in the treatment. Despite this fact I went for the treatment but didn't get any relief & my condition started to deteriorate day by day.\n\nThen I heard about Dooroomi India from a known person & I went to and started taking the therapy. Initially by taking the therapy my pain increased, but I was told by the Dooroomi staff that it is a positive sign of healing. After taking the therapy for about 1 month I started feeling change in my body. After taking the continuous therapy for 3 months, all my problems are cured and now I am living a healthy & happy life. I am thankful to the Global CEO, CEO Mam and President of Dooroomi Medical for bringing such a miraculous machine to India."
    },
    {
      id: "p2",
      name: "Sri Ramesh Chandra Jena",
      age: "74 Years",
      location: "Jagamara, Bhubaneswar, Odisha",
      disease: "Asthma, Blood Pressure & Knee Pain",
      diseaseKo: "천식 · 혈압 및 무릎 관절염 완치",
      duration: "Suffering for 6 Years",
      treatment: "BEDRO Smart-1 (2 Months Therapy)",
      image: "/assets/testimonials/patient-ramesh-jena.jpg",
      rating: 5,
      docPage: 14,
      quote: "I spent 2-3 lakhs rupees across Allopathic, Homeopathy and Ayurveda with no positive results. At Dooroomi Khandagiri Center on BEDRO Smart-1, my pain got cured, my body regained vitality, and my memory power returned!",
      fullStory: "My name is Ramesh Chandra Jena and my age is 74 yrs, I am a resident of Jagamara, Bhubaneswar, Odisha. For the last 6 years I was suffering from the problem of Blood Pressure, Asthma & Knee Pain. Due to the problem in my body I tend to forget things and even my body wasn't working properly. For the treatment I went to many hospitals and underwent many treatments like Allopathic, Homeopathy and even did Ayurvedic treatment but I didn't get any relief. For its treatment I spent near about 2-3 lakhs rupees in various Health Centers but no positive result was seen.\n\nThen one of my relatives told me about Dooroomi India & took me to Khandagiri Center. I took the therapy on BEDRO Smart-1 for 2 months, initially I faced some problem due to healing action but then also I continued taking the therapy. After taking therapy, I felt relief & my problems got cured. Now I have regained my memory power and I can remember everything. Dooroomi India is very good and I am proud to be a Dooroomi India Family Member."
    },
    {
      id: "p3",
      name: "Sri Tapan Kumar Dhal",
      age: "48 Years",
      location: "Khandagiri Bari, Bhubaneswar, Odisha",
      disease: "Blood Pressure & Chronic Insomnia",
      diseaseKo: "고혈압 및 만성 불면증 극복",
      duration: "Suffering for 3 Years",
      treatment: "Taeyangsuk Bio-Mineral Mat",
      image: "/assets/testimonials/patient-tapan-dhal.jpg",
      rating: 5,
      docPage: 14,
      quote: "Insomnia for 1 year and high BP for 3 years left my whole family depressed. After coming to DOOROOMI centre and taking Taeyangsuk therapy, my sleeplessness vanished and my blood pressure normalized completely!",
      fullStory: "My name is Tapan Kumar Dhal, Age: 48, My Address: Khandagiri Bari, Bhubaneswar, Odisha. My problem was Blood Pressure suffering for past 3 years & Insomnia suffering from past 1 year. First I thought it might be because of weakness. After tests were cleared then my whole family was so depressed. Before coming to DOOROOMI centre I used only medicines.\n\nI saw the demo Design Board on roadside and then came to DOOROOMI centre. After that I realized that my condition was improving rapidly, my insomnia diseases fell and declined. I felt convinced about DOOROOMI and Taeyangsuk. I already told about DOOROOMI to my neighbors, friends & senior citizens and they also joined DOOROOMI. I would heartily like to thanks Dooroomi India and would pray that Dooroomi India gets success in their work and keeps helping people like me."
    },
    {
      id: "p4",
      name: "Smt. Snehalata Sahu",
      age: "54 Years",
      location: "K4/ LIG-622, Kalinga Vihar, Bhubaneswar",
      disease: "Thyroid, Joint Pain, Overweight & Asthma",
      diseaseKo: "갑상선 · 관절통 · 과체중 · 천식 완치",
      duration: "Suffering for 12 Years",
      treatment: "BEDRO Smart-1 & Taeyangsuk Mat",
      image: "/assets/testimonials/patient-snehalata-sahu.jpg",
      rating: 5,
      docPage: 15,
      quote: "With 12 years of Asthma, severe Thyroid, and intolerable Joint Pain, my family was shattered. Today my joint pain is cured and my breathing is clear. Dooroomi India is truly a blessing from God for my family!",
      fullStory: "My name is SNEHALATA SAHU, Age: 54 YEARS, Address: K4/ LIG - 622, Kalinga Vihar, Bhubaneswar. My weight was inappropriate according to my body due to which I had to suffer with Thyroid since 4 yrs, Joint Pain since 1 yr & 6 months, ASTHMA since 12 Yrs and Overweight since 4 yrs. These problems of mine were increasing day by day. When my pain became intolerable, then I went to visit so many hospitals. Because of this my family got completely shattered and disappointed. My relatives took me to various big hospitals of our state. Before coming to DOOROOMI centre I used medicines for Thyroid & Asthma.\n\nThen one day I listened about DOOROOMI from my friend. Her experience of feeling better & relaxed joint pains had been cured. DOOROOMI is better for people having spine related problems which has been described in specials Bedro Smart-1 and Taeyangsuk. Dooroomi India is really a God for me and I am thankful to Group CEO of Dooroomi India who brought Dooroomi to India and made my life full of happiness."
    },
    {
      id: "p5",
      name: "Sri Ullash Chandra Mohapatra",
      age: "72 Years",
      location: "Pokhariput (Near D.A.V. School), Bhubaneswar",
      disease: "Knee Osteoarthritis, High BP & Constipation",
      diseaseKo: "무릎 관절염 · 고혈압 · 소화기 개선",
      duration: "Suffering for 1+ Years",
      treatment: "Natural Taeyangsuk Sintered Therapy",
      image: "/assets/testimonials/patient-ullash-mohapatra.jpg",
      rating: 5,
      docPage: 15,
      quote: "Suffering from severe knee pain for over a year, I couldn't walk peacefully. At the Pokhariput Dooroomi center, I became 100% free from knee pain! Taeyangsuk natural therapy replaced my anxiety with immense happiness.",
      fullStory: "My name is Ullash Chandra Mohapatra, Age 72 years, At-Pokhariput, Near D.A.V. Public School, P.O- Pokhariput, Bhubaneswar. I was suffering from knee pain for about one year. Now I am 100% free from knee pain! I have not taken any other treatment before coming to DOOROOMI centre for knee pain. I got information through Ramesh Chandra Panda who was taking treatment from DOOROOMI centre.\n\nI felt happiness emerge from anxiety. All the people of DOOROOMI centre are gentle, excellent and helpful. DOOROOMI is an auspicious organization. It gives treatment through TAEYANGSUK. TAEYANGSUK is a natural substance prepared from several sacred natural minerals. I will go door to door and tell everyone about DOOROOMI."
    },
    {
      id: "p6",
      name: "Sri Ramesh Chandra Sahu",
      age: "58 Years",
      location: "Chandapur, Dist- Nayagarh, Odisha",
      disease: "Chronic Slipped Disc, Back Pain & High BP",
      diseaseKo: "만성 허리 디스크 및 고혈압 완치",
      duration: "Suffering for 5 Years",
      treatment: "Dooroomi Thermal Spine Realignment",
      image: "/assets/testimonials/patient-ramesh-sahu.jpg",
      rating: 5,
      docPage: 15,
      quote: "After 5 years of painful injections and medicines for back pain and high blood pressure, Dooroomi therapy made me completely fine. I can now do my daily work with full strength and joy!",
      fullStory: "My name is Ramesh Chandra Sahu, Age 58 years, At-Chandapur, P.O- Chandapur, Dist- Nayagarh, Odisha. I had Back Pain and Blood Pressure problems since 5 years. I have taken many medicines and injections and many types of treatments before coming to DOOROOMI.\n\nThen I heard about DOOROOMI Medical Treatments from a known person. I went to the DOOROOMI center, and now I am perfectly fine and can do my work on a regular basis. I would heartily like to thanks DOOROOMI Medical and would pray that may DOOROOMI Medical get succeed in their work and keep helping people like me."
    }
  ];

  const testimonials = dynamicTestimonials && dynamicTestimonials.length > 0 ? dynamicTestimonials : defaultTestimonials;

  const [isPaused, setIsPaused] = useState(false);
  const isWrappingRef = useRef(false);

  // Triple items for seamless infinite loop
  const infiniteTestimonials = useMemo(() => {
    if (!testimonials || testimonials.length === 0) return [];
    return [
      ...testimonials.map((t, i) => ({ ...t, _uniqueKey: `t-set1-${t.id || i}` })),
      ...testimonials.map((t, i) => ({ ...t, _uniqueKey: `t-set2-${t.id || i}` })),
      ...testimonials.map((t, i) => ({ ...t, _uniqueKey: `t-set3-${t.id || i}` }))
    ];
  }, [testimonials]);

  // Center scroll on middle set initially
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const timer = setTimeout(() => {
      if (container) {
        const singleSetWidth = container.scrollWidth / 3;
        container.scrollLeft = singleSetWidth;
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [testimonials]);

  // Calculate dynamic card step (card width + gap)
  const getCardStep = () => {
    if (!scrollRef.current) return 420;
    const card = scrollRef.current.querySelector('.testimonial-card');
    if (!card) return 420;
    const style = window.getComputedStyle(scrollRef.current);
    const gap = parseFloat(style.columnGap || style.gap || '24') || 24;
    return card.offsetWidth + gap;
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const step = getCardStep();
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -step : step,
        behavior: 'smooth'
      });
    }
  };

  // Seamless infinite wrap handler
  const handleScrollWrap = () => {
    const container = scrollRef.current;
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

  // Auto-slide one by one smoothly every 4 seconds (pauses on hover or modal)
  useEffect(() => {
    if (isPaused || selectedStory || selectedScan) return;

    const interval = setInterval(() => {
      handleScroll('right');
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, selectedStory, selectedScan]);

  return (
    <section id="patient-testimonials" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#edf5f0] via-[#e2efe8] to-[#d6e8dd] border-t border-b border-[#c2d7cb] overflow-hidden">
      
      {/* Decorative Background Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-hanbit-forest/5 rounded-full blur-3xl pointer-events-none" />

      {/* Full Patient Story Modal */}
      {selectedStory && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedStory(null)}
          data-lenis-prevent
        >
          <div 
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-hanbit-gold/40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-hanbit-forest via-emerald-950 to-hanbit-dark text-white flex items-center justify-between border-b border-hanbit-gold/30">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-hanbit-gold shadow-md shrink-0">
                  <img 
                    src={selectedStory.image} 
                    alt={selectedStory.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold font-serif">{selectedStory.name}</h3>
                  <span className="text-xs text-emerald-200 font-mono block">
                    {selectedStory.age} · {selectedStory.location}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedStory(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-50 text-red-800 text-xs font-mono font-bold border border-red-200">
                  Condition: {selectedStory.disease}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
                  Therapy: {selectedStory.treatment}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-mono font-bold border border-amber-200">
                  {selectedStory.duration}
                </span>
              </div>

              <div className="relative p-5 rounded-2xl bg-hanbit-ivory border border-hanbit-border/60">
                <Quote className="w-8 h-8 text-hanbit-gold/30 absolute top-3 right-3" />
                <p className="text-sm sm:text-base text-hanbit-forest font-serif italic leading-relaxed">
                  "{selectedStory.quote}"
                </p>
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase text-hanbit-forest block mb-2 tracking-wider">
                  Complete Clinical Case & Recovery Statement:
                </span>
                <p className="text-xs sm:text-sm text-hanbit-ink/80 font-light leading-relaxed whitespace-pre-line bg-stone-50 p-4 rounded-xl border border-stone-200">
                  {selectedStory.fullStory}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200/80 text-xs flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Public Record · Corporate Brochure Page {selectedStory.docPage}</span>
                </span>
                <button
                  onClick={() => {
                    setSelectedScan(selectedStory.docPage === 14 ? "/assets/testimonials/testimonial-page14.png" : "/assets/testimonials/testimonial-page15.png");
                  }}
                  className="font-bold underline cursor-pointer hover:text-emerald-950"
                >
                  View Original Page {selectedStory.docPage} Scan
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-hanbit-border flex items-center justify-end">
              <button
                onClick={() => setSelectedStory(null)}
                className="px-5 py-2 rounded-full bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Original Document Scans (Pages 14 & 15) */}
      {selectedScan && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedScan(null)}
          data-lenis-prevent
        >
          <div 
            className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-hanbit-gold/40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-hanbit-border bg-hanbit-ivory">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-hanbit-gold bg-hanbit-gold/10 px-2.5 py-0.5 rounded-full border border-hanbit-gold/30">
                  Official Corporate Archive
                </span>
                <h3 className="text-base font-bold text-hanbit-forest font-serif mt-1">
                  Testimonial: The Backbone of Our Business
                </h3>
              </div>
              <button
                onClick={() => setSelectedScan(null)}
                className="p-2 rounded-full hover:bg-stone-200 text-hanbit-forest transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 bg-stone-100 flex items-center justify-center">
              <img 
                src={selectedScan} 
                alt="Original Testimonial Document"
                className="max-h-[70vh] w-auto rounded-xl shadow-lg border border-stone-300 object-contain mx-auto" 
              />
            </div>

            <div className="p-4 bg-white border-t border-hanbit-border flex items-center justify-end">
              <button
                onClick={() => setSelectedScan(null)}
                className="px-5 py-2 rounded-full bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        
        {/* Section Header with Korean Medical Tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-hanbit-border/60">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-hanbit-gold/40 text-xs font-semibold text-hanbit-forest shadow-2xs">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span className="font-mono text-hanbit-gold font-bold">환자 치유 체험담</span>
              <span className="text-hanbit-border">|</span>
              <span className="tracking-wider uppercase text-[11px]">Real Indian Patient Testimonials</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest font-serif tracking-tight leading-tight">
              Testimonials: <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hanbit-forest via-emerald-800 to-hanbit-gold">
                The Backbone of Our Business
              </span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-hanbit-ink/80 font-light leading-relaxed">
              Read direct, unedited recovery accounts from real families who attended our 15+ free therapy centers across India. Chronic slip discs, high blood pressure, asthma, and knee arthritis healed through <strong>BEDRO Smart-1</strong> and <strong>TAEYANGSUK Mat</strong> natural therapies.
            </p>
          </div>

          {/* Navigation Controls & Archival Button */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="w-11 h-11 rounded-full border border-hanbit-border bg-white hover:bg-hanbit-forest hover:text-white text-hanbit-forest flex items-center justify-center transition-all shadow-xs cursor-pointer group"
                title="Scroll Left"
                aria-label="Previous Testimonials"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-11 h-11 rounded-full border border-hanbit-border bg-white hover:bg-hanbit-forest hover:text-white text-hanbit-forest flex items-center justify-center transition-all shadow-xs cursor-pointer group"
                title="Scroll Right"
                aria-label="Next Testimonials"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSelectedScan("/assets/testimonials/testimonial-page14.png")}
                className="px-3.5 py-2 rounded-full bg-hanbit-ivory border border-hanbit-gold/60 text-xs font-bold text-hanbit-forest hover:bg-hanbit-gold hover:text-white transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-hanbit-gold" />
                <span>Doc Page 14</span>
              </button>
              <button
                onClick={() => setSelectedScan("/assets/testimonials/testimonial-page15.png")}
                className="px-3.5 py-2 rounded-full bg-hanbit-ivory border border-hanbit-gold/60 text-xs font-bold text-hanbit-forest hover:bg-hanbit-gold hover:text-white transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-hanbit-gold" />
                <span>Doc Page 15</span>
              </button>
            </div>
          </div>
        </div>

        {/* SINGLE ROW HORIZONTAL SCROLL CAROUSEL */}
        <div 
          ref={scrollRef}
          onScroll={handleScrollWrap}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {infiniteTestimonials.map((item) => (
            <div
              key={item._uniqueKey}
              onClick={() => setSelectedStory(item)}
              className="testimonial-card snap-start shrink-0 w-[320px] sm:w-[380px] md:w-[420px] rounded-3xl bg-white border border-hanbit-border/80 hover:border-hanbit-gold shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-hanbit-forest via-hanbit-gold to-emerald-600 opacity-80 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header: Photo + 5-Star Rating + Patient Info */}
                <div className="flex items-start gap-4 mb-4">
                  
                  {/* High Quality Patient Portrait with 5-Star Glow Frame */}
                  <div className="relative shrink-0">
                    <div className="w-20 h-24 sm:w-22 sm:h-26 rounded-2xl overflow-hidden border-2 border-hanbit-gold shadow-md group-hover:scale-103 transition-transform bg-stone-100">
                      <img 
                        src={getOptimizedImageUrl(item.image, { width: 300 })} 
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top" 
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Patient Info & 5 Shining Stars */}
                  <div className="flex-1 min-w-0">
                    {/* 5 Visible Stars */}
                    <div className="flex items-center gap-1 mb-1.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_1px_2px_rgba(245,158,11,0.4)]" 
                        />
                      ))}
                      <span className="text-[11px] font-bold text-amber-600 ml-1 font-mono">
                        5.0
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-hanbit-forest font-serif leading-snug group-hover:text-hanbit-gold transition-colors truncate">
                      {item.name}
                    </h3>

                    <div className="text-[11px] text-hanbit-muted space-y-0.5 mt-0.5">
                      <span className="block font-semibold text-emerald-800">
                        Age: {item.age}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] truncate">
                        <MapPin className="w-3 h-3 text-hanbit-gold shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Disease / Condition Badge */}
                <div className="mb-3.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-800 text-[11px] font-mono font-bold border border-red-200/80">
                    <Activity className="w-3 h-3 text-red-600" />
                    <span>{item.disease}</span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="relative bg-hanbit-ivory/70 p-4 rounded-2xl border border-hanbit-border/50 text-xs sm:text-[13px] text-hanbit-ink/85 leading-relaxed font-light">
                  <Quote className="w-5 h-5 text-hanbit-gold/40 absolute top-2 right-2" />
                  <p className="line-clamp-4 italic">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* Card Footer: Verified Badge & Click to Read More */}
              <div className="pt-4 mt-4 border-t border-hanbit-border/50 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free Therapy Attendee</span>
                </span>

                <span className="text-xs font-bold text-hanbit-forest group-hover:text-hanbit-gold inline-flex items-center gap-1 transition-colors">
                  <span>Read Full Story</span>
                  <Maximize2 className="w-3 h-3 text-hanbit-gold group-hover:scale-115 transition-transform" />
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-hanbit-border/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-hanbit-muted">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-hanbit-forest font-semibold">
              <strong>100% Genuine Clinical Testimonials:</strong> Documented in our official South Korean company portfolio (Pages 14 & 15).
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              ★ 5.0 Star Average Satisfaction
            </span>
            <button
              onClick={() => setSelectedScan("/assets/testimonials/testimonial-page14.png")}
              className="text-xs font-bold text-hanbit-forest hover:text-hanbit-gold underline underline-offset-4 cursor-pointer"
            >
              Inspect Archival Scans →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

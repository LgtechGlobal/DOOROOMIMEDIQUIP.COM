import React, { useState, useEffect } from 'react';
import { ArrowUp, ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { SITE_CONFIG, CATEGORIES } from '../data/siteData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectCategory?: (catId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const [showToTop, setShowToTop] = useState(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-hanbit-dark text-emerald-100/75 border-t border-emerald-950/60 pt-16 pb-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
            
            {/* Col 1: Brand & Heritage */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-hanbit-gold via-hanbit-cyan to-amber-300 shadow-md flex items-center justify-center overflow-hidden">
                  <img 
                    src="./assets/img/brand-logo.jpg" 
                    alt="Doumi Beauty 도우미 美 Logo" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white tracking-tight">
                    {SITE_CONFIG.nameEn}
                  </h3>
                  <p className="text-xs font-bold text-hanbit-gold">
                    {SITE_CONFIG.nameKo}
                  </p>
                </div>
              </div>

              <p className="text-xs text-emerald-100/70 leading-relaxed font-light max-w-sm">
                Korean precision bio-cosmetics formulation, clinical verification, and automated cleanroom manufacturing. Certified ISO 22716 & CGMP.
              </p>

              <div className="pt-2 text-xs space-y-1 text-emerald-200/60 font-light">
                <p>• R&D: Gangnam Bio-Venture Valley, Seoul</p>
                <p>• Cleanroom: Songdo Bio-Cluster, Incheon</p>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex items-center space-x-2">
                {['LinkedIn', 'YouTube', 'Naver Blog', 'Instagram'].map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-semibold text-emerald-200 hover:text-white hover:border-hanbit-gold transition-colors cursor-pointer"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('testing')} className="hover:text-white transition-colors">
                    Testing Principle (1M)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('quality')} className="hover:text-white transition-colors">
                    Quality & Certifications
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                    Services & FAQs
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">
                    Facility Gallery
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Product Ranges */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Formulation Series
              </h4>
              <ul className="space-y-2 text-xs">
                {CATEGORIES.map(c => (
                  <li key={c.id}>
                    <button
                      onClick={() => {
                        if (onSelectCategory) onSelectCategory(c.id);
                        onNavigate('products');
                      }}
                      className="hover:text-white transition-colors text-left"
                    >
                      {c.name}: {c.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={() => onNavigate('products')} className="text-amber-200 font-semibold hover:underline block pt-1">
                    Download Technical Catalogues (PDF) →
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Corporate Contact */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Corporate Inquiries
              </h4>
              <div className="space-y-2.5 text-xs">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-hanbit-gold shrink-0" />
                  <span>Toll-Free: {SITE_CONFIG.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-hanbit-gold shrink-0" />
                  <span>{SITE_CONFIG.email}</span>
                </p>
                <p className="flex items-start gap-2 text-emerald-100/60 leading-snug">
                  <MapPin className="w-3.5 h-3.5 text-hanbit-gold shrink-0 mt-0.5" />
                  <span>{SITE_CONFIG.addressEn}</span>
                </p>
                <p className="text-[11px] text-emerald-300/80 pt-1">
                  Hours: {SITE_CONFIG.hours}
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
            <p>
              © {SITE_CONFIG.year} {SITE_CONFIG.legal}. All rights reserved.
            </p>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => setLegalModal('privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setLegalModal('terms')}
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </button>
              <span className="text-emerald-700">|</span>
              <span className="text-[11px] text-amber-300 font-mono">
                Seoul Bio-Venture Cluster
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Back-to-Top Button */}
      {showToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-br from-hanbit-gold to-amber-500 text-hanbit-dark font-bold flex items-center justify-center shadow-xl hover:scale-105 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Legal Privacy / Terms Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-hanbit-dark/80 backdrop-blur-sm" onClick={() => setLegalModal(null)} />
          <div className="relative w-full max-w-2xl bg-white text-hanbit-ink rounded-3xl p-8 z-10 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-hanbit-border mb-4">
              <h3 className="text-xl font-bold text-hanbit-forest">
                {legalModal === 'privacy' ? 'Privacy Policy & Data Protection' : 'Commercial Terms & Conditions'}
              </h3>
              <button onClick={() => setLegalModal(null)} className="text-hanbit-muted hover:text-hanbit-ink">
                ✕
              </button>
            </div>
            <div className="text-xs leading-relaxed space-y-3 text-hanbit-muted font-light">
              <p>
                <b>Hanbit Korea Co., Ltd. (주식회사 한빛코리아)</b> strictly complies with the Personal Information Protection Act (PIPA) of the Republic of Korea, European GDPR, and US CCPA standards.
              </p>
              <p>
                <b>Data Collection Scope:</b> When submitting inquiries or requesting sample dossiers, corporate contact details (name, corporate email, phone number, company name, formulation specifications) are encrypted and stored solely for business transaction and regulatory traceability purposes.
              </p>
              <p>
                <b>Non-Disclosure:</b> Formulation intellectual property and technical specifications submitted via our portal are protected under standard commercial confidentiality protocols. We never sell or share partner information with unauthorized third-party marketing entities.
              </p>
              <p>
                For data privacy requests or formal bilateral NDA requests, contact our Compliance Office at <a href={`mailto:${SITE_CONFIG.email}`} className="text-hanbit-gold font-bold">{SITE_CONFIG.email}</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

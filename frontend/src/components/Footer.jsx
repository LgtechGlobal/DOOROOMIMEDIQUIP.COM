import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { SITE_CONFIG, CATEGORIES } from '../data/siteData';
import { WhatsAppWidget } from './WhatsAppWidget';

export const Footer = ({ onNavigate, onSelectCategory }) => {
  const [showToTop, setShowToTop] = useState(false);
  const [legalModal, setLegalModal] = useState(null);
  const [isKoreanBrand, setIsKoreanBrand] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsKoreanBrand((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="bg-hanbit-dark text-emerald-100/75 border-t border-emerald-950/60 pt-16 pb-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
            
            {/* Col 1: Brand & Heritage */}
            <div className="lg:col-span-4 space-y-4">
              <button 
                onClick={() => onNavigate('hero')}
                className="flex items-center gap-3 text-left group cursor-pointer"
                title="Back to Top / Home"
              >
                <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-hanbit-gold via-hanbit-cyan to-amber-300 shadow-md flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                  <img 
                    src="./assets/img/brand-logo.jpg" 
                    alt="Dooroomi 두루미 Logo" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  {/* Silky-smooth cross-fade transition alternating every 5s */}
                  <div className="inline-grid grid-cols-1 grid-rows-1 items-center min-w-[110px] h-7">
                    {/* English: Dooroomi */}
                    <span 
                      className={`col-start-1 row-start-1 font-extrabold text-xl text-white tracking-tight font-serif transition-all duration-700 ease-in-out select-none ${
                        !isKoreanBrand
                          ? 'opacity-100 translate-y-0 filter-none'
                          : 'opacity-0 -translate-y-2 blur-[0.5px] pointer-events-none'
                      }`}
                    >
                      Dooroomi
                    </span>

                    {/* Korean: 두루미 */}
                    <span 
                      className={`col-start-1 row-start-1 font-extrabold text-xl text-hanbit-gold tracking-tight font-serif transition-all duration-700 ease-in-out select-none ${
                        isKoreanBrand
                          ? 'opacity-100 translate-y-0 filter-none'
                          : 'opacity-0 translate-y-2 blur-[0.5px] pointer-events-none'
                      }`}
                    >
                      두루미
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-emerald-200/70 tracking-wide group-hover:text-emerald-100 transition-colors">
                    Korea Bio-Cosmetics & Mediquip
                  </p>
                </div>
              </button>

              <p className="text-xs text-emerald-100/70 leading-relaxed font-light max-w-sm">
                Korean precision bio-cosmetics formulation, clinical verification, and automated cleanroom manufacturing. Certified ISO 22716 & CGMP.
              </p>

              <div className="pt-2 text-xs space-y-1 text-emerald-200/60 font-light">
                <p>• R&D: Gangnam Bio-Venture Valley, Seoul</p>
                <p>• Cleanroom: Songdo Bio-Cluster, Incheon</p>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex items-center space-x-2.5">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 hover:shadow-[0_0_12px_rgba(10,102,194,0.7)] transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 hover:shadow-[0_0_12px_rgba(255,0,0,0.7)] transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* Naver Blog */}
                <a
                  href="https://blog.naver.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Naver Blog"
                  aria-label="Naver Blog"
                  className="w-8 h-8 rounded-full bg-[#03C75A] text-white flex items-center justify-center hover:scale-110 hover:shadow-[0_0_12px_rgba(3,199,90,0.7)] transition-all duration-200 font-extrabold text-xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:scale-110 hover:shadow-[0_0_12px_rgba(220,39,67,0.7)] transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('certificates')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Certificates & Quality
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Products
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('principle')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Formulation Principle
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('therapy')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Therapy & Equipment
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Services & FAQs
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('contact')} className="hover:text-amber-200 text-emerald-200/90 font-medium transition-colors cursor-pointer text-left">
                    Submit Therapy Inquiry
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
                        onNavigate('gallery');
                      }}
                      className="hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {c.name}: {c.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={() => onNavigate('gallery')} className="text-amber-200 font-semibold hover:underline block pt-1 cursor-pointer">
                    Explore All Products →
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
                <a 
                  href={`tel:${SITE_CONFIG.phoneTel}`}
                  className="flex items-center gap-2 hover:text-white transition-colors group cursor-pointer"
                  title="Call Toll-Free Number"
                >
                  <Phone className="w-3.5 h-3.5 text-hanbit-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Toll-Free: {SITE_CONFIG.phone}</span>
                </a>
                <a 
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors group cursor-pointer"
                  title="Send Corporate Email"
                >
                  <Mail className="w-3.5 h-3.5 text-hanbit-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.indiaHq)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-emerald-100/80 hover:text-white transition-colors leading-snug group cursor-pointer"
                  title="Open India Corporate Office in Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5 text-hanbit-gold shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>{SITE_CONFIG.indiaHq}</span>
                </a>
                <p className="text-[11px] text-emerald-300/80 pt-1">
                  Global HQ: {SITE_CONFIG.addressEn}
                </p>
                <p className="text-[11px] text-emerald-300/70">
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

      {/* Floating Back to Top Button */}
      {showToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-24 left-6 z-40 w-11 h-11 rounded-full bg-hanbit-dark/95 hover:bg-hanbit-forest text-hanbit-gold border border-hanbit-gold/60 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer backdrop-blur-md group"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Classy Floating WhatsApp Chat Widget */}
      <WhatsAppWidget />

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
                <b>{SITE_CONFIG.legal}</b> strictly complies with the Personal Information Protection Act (PIPA) of the Republic of Korea, European GDPR, and US CCPA standards.
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

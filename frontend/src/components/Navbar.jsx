import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X, ArrowRight, ShieldCheck, User, Globe, Handshake } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const Navbar = ({
  activeSection,
  onNavigate,
  onOpenLogin,
  onOpenFranchise,
  isAdminAuthenticated,
  onOpenAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 5-second automatic alternating timer ONLY for the Dooroomi word (English <-> Korean)
  const [isKoreanBrand, setIsKoreanBrand] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsKoreanBrand((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Exactly requested nav items: Home, About Us, Certificates, Gallery, Principle, Therapy, Services, Contact Us
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'principle', label: 'Principle' },
    { id: 'therapy', label: 'Therapy' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  const checkIsActive = (itemId) => {
    if (activeSection === itemId) return true;
    if (itemId === 'hero' && activeSection === 'home') return true;
    if (itemId === 'certificates' && activeSection === 'quality') return true;
    return false;
  };

  return (
    <>
      {/* Top utility bar - Stretched across wide screens */}
      <div className="bg-hanbit-dark text-emerald-100/80 text-xs py-2 border-b border-emerald-900/40 relative z-50">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-[11px] text-emerald-200">
              <Globe className="w-3 h-3 text-hanbit-gold" />
              <span>Dooroomi Mediquip · Korea</span>
            </div>

            <a 
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-hanbit-gold" />
              <span>Toll-Free: {SITE_CONFIG.phone}</span>
            </a>
            <span className="hidden md:inline-block text-emerald-700">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-300/90 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-hanbit-gold" />
              <span>ISO 22716 & Korea CGMP Certified Manufacturer</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* 4 Colorful Social Link Icons */}
            <div className="flex items-center space-x-1.5">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                aria-label="Facebook"
                className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-115 hover:shadow-[0_0_10px_rgba(24,119,242,0.8)] transition-all duration-200"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
                className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:scale-115 hover:shadow-[0_0_10px_rgba(220,39,67,0.8)] transition-all duration-200"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
                className="w-5 h-5 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-115 hover:shadow-[0_0_10px_rgba(10,102,194,0.8)] transition-all duration-200"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
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
                className="w-5 h-5 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-115 hover:shadow-[0_0_10px_rgba(255,0,0,0.8)] transition-all duration-200"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <span className="hidden sm:inline-block text-emerald-800">|</span>

            <a 
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-hanbit-gold" />
              <span className="hidden sm:inline">{SITE_CONFIG.email}</span>
            </a>
            {isAdminAuthenticated ? (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded bg-gradient-to-r from-emerald-900 to-hanbit-forest border border-hanbit-gold text-amber-200 hover:text-white transition-all text-xs font-bold cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-hanbit-gold" />
                <span>Admin Portal</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded bg-hanbit-forest/80 border border-emerald-800/80 text-amber-200 hover:bg-hanbit-gold hover:text-hanbit-dark transition-all text-xs font-medium cursor-pointer"
              >
                <User className="w-3 h-3" />
                <span>B2B Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main sticky navigation - Extended & Stretched */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-hanbit-border' 
            : 'bg-hanbit-ivory/95 backdrop-blur-sm py-3.5 border-b border-hanbit-border/60'
        }`}
      >
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 flex items-center justify-between">
          {/* Brand Logo - Dooroomi alternating 5s English / 5s Korean */}
          <button 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3.5 text-left group shrink-0"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-hanbit-gold via-hanbit-cyan to-amber-300 shadow-md flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
              <img 
                src="./assets/img/brand-logo.jpg" 
                alt="Dooroomi 두루미 Logo" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              {/* Silky-smooth cross-fade transition alternating every 5s without layout jitter */}
              <div className="inline-grid grid-cols-1 grid-rows-1 items-center min-w-[110px] sm:min-w-[125px] h-7 sm:h-8">
                {/* English: Dooroomi */}
                <span 
                  className={`col-start-1 row-start-1 font-extrabold text-xl sm:text-2xl text-hanbit-forest tracking-tight font-serif transition-all duration-700 ease-in-out select-none ${
                    !isKoreanBrand
                      ? 'opacity-100 translate-y-0 filter-none'
                      : 'opacity-0 -translate-y-2 blur-[0.5px] pointer-events-none'
                  }`}
                >
                  Dooroomi
                </span>

                {/* Korean: 두루미 */}
                <span 
                  className={`col-start-1 row-start-1 font-extrabold text-xl sm:text-2xl text-hanbit-forest tracking-tight font-serif transition-all duration-700 ease-in-out select-none ${
                    isKoreanBrand
                      ? 'opacity-100 translate-y-0 filter-none'
                      : 'opacity-0 translate-y-2 blur-[0.5px] pointer-events-none'
                  }`}
                >
                  두루미
                </span>
              </div>
              <p className="text-[10px] tracking-wider uppercase text-hanbit-muted font-medium">
                Korea Bio-Cosmetics & Mediquip · Est. 1998
              </p>
            </div>
          </button>

          {/* Stretched Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8 space-x-1 xl:space-x-2.5 2xl:space-x-4">
            {navItems.map((item) => {
              const isActive = checkIsActive(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 xl:px-4 py-2 text-sm xl:text-[14.5px] font-medium rounded-lg inline-flex items-center gap-1.5 transition-all relative whitespace-nowrap ${
                    isActive 
                      ? 'text-hanbit-forest bg-hanbit-sage-light/60 font-semibold shadow-xs' 
                      : 'text-hanbit-ink/80 hover:text-hanbit-forest hover:bg-hanbit-sage-light/30'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-hanbit-gold rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button: Franchise */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenFranchise && onOpenFranchise()}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-hanbit-forest to-hanbit-dark text-white text-xs xl:text-sm font-semibold hover:shadow-lg hover:from-emerald-950 hover:to-emerald-900 border border-hanbit-gold/40 transition-all inline-flex items-center gap-2 group cursor-pointer"
            >
              <Handshake className="w-4 h-4 text-hanbit-gold group-hover:scale-110 transition-transform" />
              <span>Franchise</span>
              <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-hanbit-forest hover:bg-hanbit-sage-light/50 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-hanbit-border px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const isActive = checkIsActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? 'text-hanbit-forest bg-hanbit-sage-light/60 font-semibold'
                      : 'text-hanbit-ink hover:bg-hanbit-ivory'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-4 border-t border-hanbit-border mt-3 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenFranchise) onOpenFranchise();
                }}
                className="w-full py-2.5 rounded-xl bg-hanbit-forest text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Handshake className="w-4 h-4 text-hanbit-gold" />
                <span>Franchise Application</span>
                <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold" />
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2 rounded-xl border border-hanbit-border text-xs text-hanbit-forest font-medium"
              >
                Client Portal Login
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { Phone, Mail, ChevronDown, Menu, X, ArrowRight, ShieldCheck, Sparkles, User, Globe } from 'lucide-react';
import { SITE_CONFIG, CATEGORIES, PRODUCTS } from '../data/siteData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenLogin: () => void;
  onSelectCategory?: (catId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenLogin,
  onSelectCategory
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'KR'>('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'testing', label: '3D Formulations', badge: '3D' },
    { id: 'quality', label: 'Quality & Certs' },
    { id: 'products', label: 'Products & Catalogue', hasMega: true },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-hanbit-dark text-emerald-100/80 text-xs py-2 border-b border-emerald-900/40 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setLang(lang === 'EN' ? 'KR' : 'EN')}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-[11px] text-emerald-200 hover:text-white transition-colors"
            >
              <Globe className="w-3 h-3 text-hanbit-gold" />
              <span>{lang === 'EN' ? '🇰🇷 한국어 / KR' : '🇺🇸 English / US'}</span>
            </button>
            <a 
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-hanbit-gold" />
              <span>Toll-Free: {SITE_CONFIG.phone}</span>
            </a>
            <span className="hidden md:inline-block text-emerald-700">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-300/90 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-hanbit-gold" />
              <span>ISO 22716 & Korea CGMP Certified Manufacturer</span>
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a 
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-hanbit-gold" />
              <span className="hidden sm:inline">{SITE_CONFIG.email}</span>
            </a>
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1 px-3 py-0.5 rounded bg-hanbit-forest/80 border border-emerald-800/80 text-amber-200 hover:bg-hanbit-gold hover:text-hanbit-dark transition-all text-xs font-medium"
            >
              <User className="w-3 h-3" />
              <span>B2B Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-hanbit-border' 
            : 'bg-hanbit-ivory/90 backdrop-blur-sm py-4 border-b border-hanbit-border/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3.5 text-left group"
          >
            <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-hanbit-gold via-hanbit-cyan to-amber-300 shadow-md flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
              <img 
                src="./assets/img/brand-logo.jpg" 
                alt="Doumi Beauty 도우미 美 Logo" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-lg text-hanbit-forest tracking-tight">
                  {SITE_CONFIG.nameEn}
                </span>
                <span className="text-xs font-bold text-hanbit-gold font-sans">
                  {SITE_CONFIG.nameKo}
                </span>
              </div>
              <p className="text-[10px] tracking-wider uppercase text-hanbit-muted font-medium">
                Korea Bio-Cosmetics · Est. 1998
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              
              if (item.hasMega) {
                return (
                  <div 
                    key={item.id} 
                    className="relative"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg inline-flex items-center gap-1 transition-colors ${
                        isActive 
                          ? 'text-hanbit-forest bg-hanbit-sage-light/60 font-semibold' 
                          : 'text-hanbit-ink/80 hover:text-hanbit-forest hover:bg-hanbit-sage-light/30'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mega Menu Dropdown */}
                    {isMegaMenuOpen && (
                      <div className="absolute top-full right-0 w-[680px] bg-white rounded-2xl shadow-2xl border border-hanbit-border p-6 mt-1 animate-in fade-in-50 slide-in-from-top-2 duration-200 z-50">
                        <div className="grid grid-cols-3 gap-6 pb-6 border-b border-hanbit-border/60">
                          {CATEGORIES.map((cat) => {
                            const prods = PRODUCTS.filter(p => p.cat === cat.id).slice(0, 3);
                            return (
                              <div key={cat.id} className="space-y-3">
                                <div className="border-b border-hanbit-gold/20 pb-1.5">
                                  <span className="text-xs font-bold text-hanbit-gold uppercase tracking-wider block">
                                    {cat.name}
                                  </span>
                                  <h4 className="text-sm font-semibold text-hanbit-forest">
                                    {cat.label}
                                  </h4>
                                </div>
                                <ul className="space-y-2">
                                  {prods.map(p => (
                                    <li key={p.id}>
                                      <button
                                        onClick={() => {
                                          if (onSelectCategory) onSelectCategory(cat.id);
                                          handleNavClick('products');
                                        }}
                                        className="text-left text-xs text-hanbit-muted hover:text-hanbit-gold block line-clamp-1 transition-colors"
                                      >
                                        • {p.name}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                                <button
                                  onClick={() => {
                                    if (onSelectCategory) onSelectCategory(cat.id);
                                    handleNavClick('products');
                                  }}
                                  className="text-[11px] font-semibold text-hanbit-forest hover:text-hanbit-gold inline-flex items-center gap-1 pt-1"
                                >
                                  <span>View Category</span>
                                  <ArrowRight className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        <div className="pt-4 flex items-center justify-between text-xs text-hanbit-muted">
                          <span className="flex items-center gap-1.5 text-hanbit-forest font-medium">
                            <Sparkles className="w-3.5 h-3.5 text-hanbit-gold" />
                            <span>12 Clinical & Precision Formulations Available</span>
                          </span>
                          <button
                            onClick={() => handleNavClick('products')}
                            className="font-semibold text-hanbit-forest hover:text-hanbit-gold inline-flex items-center gap-1"
                          >
                            <span>Browse Master Catalogue</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg inline-flex items-center gap-1.5 transition-colors relative ${
                    isActive 
                      ? 'text-hanbit-forest bg-hanbit-sage-light/60 font-semibold' 
                      : 'text-hanbit-ink/80 hover:text-hanbit-forest hover:bg-hanbit-sage-light/30'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-hanbit-gold text-white tracking-wide">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-hanbit-gold rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-hanbit-forest to-hanbit-dark text-white text-xs font-semibold hover:shadow-md hover:from-emerald-950 hover:to-emerald-900 border border-hanbit-gold/40 transition-all inline-flex items-center gap-1.5"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold" />
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
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  activeSection === item.id
                    ? 'text-hanbit-forest bg-hanbit-sage-light/60 font-semibold'
                    : 'text-hanbit-ink hover:bg-hanbit-ivory'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-hanbit-gold text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            <div className="pt-4 border-t border-hanbit-border mt-3 space-y-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-2.5 rounded-xl bg-hanbit-forest text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <span>Request B2B Quote</span>
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

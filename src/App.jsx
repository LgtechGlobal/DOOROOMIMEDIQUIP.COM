import React, { useState, useEffect } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AllProductsRowSection } from './components/AllProductsRowSection';
import { LeadershipCouncilSection } from './components/LeadershipCouncilSection';
import { DooroomiGroupsSection } from './components/DooroomiGroupsSection';
import { TestimonialVideoSection } from './components/TestimonialVideoSection';
import { AboutUsPage } from './components/AboutUsPage';
import { CertificatesPage } from './components/CertificatesPage';
import { PrinciplePage } from './components/PrinciplePage';
import { TherapyPage } from './components/TherapyPage';
import { ServicesPage } from './components/ServicesPage';
import { ProductsGalleryPage } from './components/ProductsGalleryPage';
import { SingleProductPage } from './components/SingleProductPage';
import { ContactSection } from './components/ContactSection';
import { CeoSection } from './components/CeoSection';
import { FreeTherapyMissionSection } from './components/FreeTherapyMissionSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CompareDrawer } from './components/CompareDrawer';
import { LoginModal } from './components/LoginModal';

const DEDICATED_ROUTES = ['about', 'certificates', 'principle', 'therapy', 'services', 'gallery'];

const parseHash = () => {
  const hash = window.location.hash || '';
  for (const route of DEDICATED_ROUTES) {
    if (hash === `#/${route}` || hash.startsWith(`#/${route}?`)) {
      return { view: route, productId: null };
    }
  }
  if (hash.startsWith('#/gallery/')) {
    const rawId = hash.replace('#/gallery/', '').split('?')[0];
    if (rawId) {
      return { view: 'single-product', productId: rawId };
    }
  }
  return { view: 'home', productId: null };
};

export function App() {
  const [currentRoute, setCurrentRoute] = useState(parseHash);
  const [activeSection, setActiveSection] = useState(() => {
    const initial = parseHash();
    if (DEDICATED_ROUTES.includes(initial.view)) return initial.view;
    if (initial.view === 'single-product') return 'gallery';
    return 'hero';
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [comparedProducts, setComparedProducts] = useState([]);
  const [quoteProduct, setQuoteProduct] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState('all');

  // Listen to hash changes for browser forward/backward and deep links
  useEffect(() => {
    const handleHashChange = () => {
      const route = parseHash();
      setCurrentRoute(route);
      if (DEDICATED_ROUTES.includes(route.view)) {
        setActiveSection(route.view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (route.view === 'single-product') {
        setActiveSection('gallery');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const hash = window.location.hash.replace('#', '');
        const isDedicated = DEDICATED_ROUTES.some(r => hash === `/${r}` || hash.startsWith(`/${r}/`));
        if (hash && !isDedicated) {
          executeScroll(hash);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const executeScroll = (sectionId) => {
    setActiveSection(sectionId);
    let targetId = sectionId;
    if (sectionId === 'home') targetId = 'hero';

    const element = document.getElementById(targetId) || document.getElementById(sectionId);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -70, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (sectionId === 'hero' || sectionId === 'home') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const scrollToSection = (sectionId) => {
    if (DEDICATED_ROUTES.includes(sectionId)) {
      window.location.hash = `/${sectionId}`;
      setCurrentRoute({ view: sectionId, productId: null });
      setActiveSection(sectionId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If navigating from any dedicated route back to home
    if (currentRoute.view !== 'home') {
      window.location.hash = '';
      setCurrentRoute({ view: 'home', productId: null });
      setTimeout(() => {
        executeScroll(sectionId);
      }, 60);
      return;
    }

    executeScroll(sectionId);
  };

  const handleSelectProduct = (productId) => {
    window.location.hash = `/gallery/${productId}`;
    setCurrentRoute({ view: 'single-product', productId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGallery = () => {
    window.location.hash = '/gallery';
    setCurrentRoute({ view: 'gallery', productId: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCompare = (product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 formulations simultaneously.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleSelectForQuote = (product) => {
    setQuoteProduct(product);
    if (currentRoute.view !== 'home') {
      window.location.hash = '';
      setCurrentRoute({ view: 'home', productId: null });
      setTimeout(() => {
        executeScroll('contact');
      }, 60);
    } else {
      executeScroll('contact');
    }
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col font-sans bg-hanbit-ivory text-hanbit-ink selection:bg-hanbit-gold selection:text-white">
        {/* Glowing scroll progress bar at very top */}
        <ScrollProgress />

        {/* Global sticky navigation bar */}
        <Navbar
          activeSection={activeSection}
          onNavigate={scrollToSection}
          onOpenLogin={() => setIsLoginOpen(true)}
          onSelectCategory={(catId) => setSelectedCatId(catId)}
        />

        <main className="flex-1">
          {currentRoute.view === 'about' ? (
            <AboutUsPage
              onNavigateHome={scrollToSection}
              onNavigateGallery={() => scrollToSection('gallery')}
              onContactClick={() => scrollToSection('contact')}
            />
          ) : currentRoute.view === 'certificates' ? (
            <CertificatesPage
              onNavigateHome={scrollToSection}
              onNavigateGallery={() => scrollToSection('gallery')}
              onContactClick={() => scrollToSection('contact')}
            />
          ) : currentRoute.view === 'principle' ? (
            <PrinciplePage
              onNavigateHome={scrollToSection}
              onNavigateGallery={() => scrollToSection('gallery')}
              onContactClick={() => scrollToSection('contact')}
            />
          ) : currentRoute.view === 'therapy' ? (
            <TherapyPage
              onNavigateHome={scrollToSection}
              onNavigateGallery={() => scrollToSection('gallery')}
              onContactClick={() => scrollToSection('contact')}
            />
          ) : currentRoute.view === 'services' ? (
            <ServicesPage
              onNavigateHome={scrollToSection}
              onNavigateGallery={() => scrollToSection('gallery')}
              onContactClick={() => scrollToSection('contact')}
            />
          ) : currentRoute.view === 'gallery' ? (
            <ProductsGalleryPage
              onSelectProduct={handleSelectProduct}
              onNavigateHome={scrollToSection}
              onSelectForQuote={handleSelectForQuote}
              comparedProducts={comparedProducts}
              onToggleCompare={handleToggleCompare}
            />
          ) : currentRoute.view === 'single-product' ? (
            <SingleProductPage
              productId={currentRoute.productId}
              onBackToGallery={handleBackToGallery}
              onNavigateHome={scrollToSection}
              onSelectForQuote={handleSelectForQuote}
              onSelectProduct={handleSelectProduct}
              comparedProducts={comparedProducts}
              onToggleCompare={handleToggleCompare}
            />
          ) : (
            <>
              {/* Hero Section Carousel */}
              <div id="hero">
                <Hero
                  onExploreProducts={() => scrollToSection('gallery')}
                  onRequestQuote={() => scrollToSection('contact')}
                />
              </div>

              {/* All Products Single Row with Side Scroll */}
              <AllProductsRowSection
                onSelectProduct={handleSelectProduct}
                onSelectForQuote={handleSelectForQuote}
                onNavigateGallery={() => scrollToSection('gallery')}
              />

              {/* Dooroomi Global Leadership Council */}
              <LeadershipCouncilSection
                onNavigateAbout={() => scrollToSection('about')}
              />

              {/* CEO Leadership & Vision Section with 2 Executive Photos */}
              <CeoSection
                onNavigateAbout={() => scrollToSection('about')}
                onContactClick={() => scrollToSection('contact')}
              />

              {/* 100% Free Daily Therapy Public Health Mission Section */}
              <FreeTherapyMissionSection
                onContactClick={() => scrollToSection('contact')}
                onNavigateAbout={() => scrollToSection('about')}
              />

              {/* Clinical Video Testimonials */}
              <TestimonialVideoSection />

              {/* Direct Quotation & Consultation Form */}
              <ContactSection
                preselectedProduct={quoteProduct}
                onClearPreselected={() => setQuoteProduct(null)}
              />
            </>
          )}
        </main>

        {/* Korean Luxury Dark Footer */}
        <Footer
          onNavigate={scrollToSection}
          onSelectCategory={(catId) => setSelectedCatId(catId)}
        />

        {/* Quick View Modal Dialog */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onSelectForQuote={handleSelectForQuote}
        />

        {/* Side-by-Side Product Comparison Drawer */}
        <CompareDrawer
          products={comparedProducts}
          onRemove={(p) => setComparedProducts(prev => prev.filter(x => x.id !== p.id))}
          onClear={() => setComparedProducts([])}
          onSelectForQuote={handleSelectForQuote}
        />

        {/* B2B Partner Portal Login Modal */}
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      </div>
    </SmoothScroll>
  );
}

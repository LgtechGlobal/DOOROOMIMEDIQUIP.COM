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
import { PatientTestimonialsRowSection } from './components/PatientTestimonialsRowSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CompareDrawer } from './components/CompareDrawer';
import { LoginModal } from './components/LoginModal';
import { FranchiseModal } from './components/FranchiseModal';
import { API_BASE_URL } from './config/api';
import { AdvertisementModal } from './components/AdvertisementModal';
import { AdminPortalPage } from './components/AdminPortalPage';
import { GoogleAuthPage } from './components/GoogleAuthPage';

const DEDICATED_ROUTES = ['about', 'certificates', 'principle', 'therapy', 'services', 'gallery', 'products', 'admin', 'google-auth'];

const parseHash = () => {
  const hash = window.location.hash || '';
  if (hash === '#/products' || hash.startsWith('#/products?')) {
    return { view: 'gallery', productId: null };
  }
  if (hash.startsWith('#/products/')) {
    const rawId = hash.replace('#/products/', '').split('?')[0];
    if (rawId) {
      return { view: 'single-product', productId: rawId };
    }
  }
  for (const route of DEDICATED_ROUTES) {
    if (hash === `#/${route}` || hash.startsWith(`#/${route}?`)) {
      return { view: route === 'products' ? 'gallery' : route, productId: null };
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
  const [isFranchiseOpen, setIsFranchiseOpen] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState('all');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('dooroomi_admin') === 'true';
  });

  const handleLoginSuccess = (user = null, redirectTarget = null) => {
    setIsAdminAuthenticated(true);
    setIsLoginOpen(false);
    const target = redirectTarget || sessionStorage.getItem('dooroomi_redirect_target');
    if (target === 'updatePassword' || target === 'settings') {
      window.location.hash = '/admin?tab=settings&mode=updatePassword';
      setCurrentRoute({ view: 'admin', productId: null });
      setActiveSection('admin');
    } else {
      window.location.hash = '/admin';
      setCurrentRoute({ view: 'admin', productId: null });
      setActiveSection('admin');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for Google Auth verification messages from child popup window
  useEffect(() => {
    const handlePopupAuthMessage = (event) => {
      if (event.data && event.data.type === 'DOOROOMI_GOOGLE_AUTH_SUCCESS') {
        const { user, token, redirectTarget } = event.data;
        if (token) sessionStorage.setItem('dooroomi_admin_token', token);
        if (user) sessionStorage.setItem('dooroomi_user', JSON.stringify(user));
        sessionStorage.setItem('dooroomi_admin', 'true');
        sessionStorage.setItem('dooroomi_redirect_target', redirectTarget || 'updatePassword');
        handleLoginSuccess(user, redirectTarget || 'updatePassword');
      }
    };

    window.addEventListener('message', handlePopupAuthMessage);
    return () => window.removeEventListener('message', handlePopupAuthMessage);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('dooroomi_admin');
    sessionStorage.removeItem('dooroomi_admin_token');
    sessionStorage.removeItem('dooroomi_user');
    localStorage.removeItem('dooroomi_admin');
    localStorage.removeItem('dooroomi_admin_token');
    localStorage.removeItem('dooroomi_token');
    localStorage.removeItem('dooroomi_user');
    setIsAdminAuthenticated(false);
    window.location.hash = '';
    setCurrentRoute({ view: 'home', productId: null });
    setActiveSection('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Verify active session with backend and purge legacy localStorage cache
  useEffect(() => {
    const legacyKeys = [
      'dooroomi_products',
      'dooroomi_centers',
      'dooroomi_testimonials',
      'dooroomi_ads',
      'dooroomi_admin',
      'dooroomi_admin_token',
      'dooroomi_user',
      'dooroomi_token'
    ];
    legacyKeys.forEach(k => {
      try { localStorage.removeItem(k); } catch (_) {}
    });

    const token = sessionStorage.getItem('dooroomi_admin_token');
    if (token) {
      fetch(`${API_BASE_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (!data || !data.valid) {
            handleLogout();
          }
        })
        .catch(() => {
          // Backend is offline or connection refused - cannot remain logged in
          handleLogout();
        });
    } else if (isAdminAuthenticated) {
      setIsAdminAuthenticated(false);
    }
  }, []);

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
    if (sectionId === 'products') targetId = 'all-products-showroom';

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

  if (currentRoute.view === 'google-auth') {
    return (
      <GoogleAuthPage
        isEmbedded={false}
        onAuthSuccess={(user, target) => handleLoginSuccess(user, target || 'updatePassword')}
      />
    );
  }

  return (
    <SmoothScroll>
      <div className={`min-h-screen flex flex-col font-sans selection:bg-hanbit-gold selection:text-white w-full max-w-full overflow-x-hidden ${
        currentRoute.view === 'admin' ? 'bg-[#07130f] text-neutral-100' : 'bg-hanbit-ivory text-hanbit-ink'
      }`}>
        {/* Glowing scroll progress bar at very top */}
        <ScrollProgress />

        {/* Global sticky navigation bar */}
        <Navbar
          activeSection={activeSection}
          onNavigate={scrollToSection}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenFranchise={() => setIsFranchiseOpen(true)}
          onSelectCategory={(catId) => setSelectedCatId(catId)}
          isAdminAuthenticated={isAdminAuthenticated}
          onOpenAdmin={() => {
            window.location.hash = '/admin';
            setCurrentRoute({ view: 'admin', productId: null });
            setActiveSection('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          {currentRoute.view === 'admin' ? (
            isAdminAuthenticated ? (
              <AdminPortalPage
                onNavigateHome={() => scrollToSection('home')}
                onLogout={handleLogout}
              />
            ) : (
              <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 py-20 px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center space-y-4 border border-stone-200">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-2xl border border-amber-200">
                    🔒
                  </div>
                  <h2 className="text-2xl font-bold text-hanbit-forest font-serif">Admin Authentication Required</h2>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    Access to the Dooroomi Management Portal requires live authentication via our MongoDB backend server.
                  </p>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="w-full py-3 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 transition shadow-md cursor-pointer"
                  >
                    Open Admin Login
                  </button>
                </div>
              </div>
            )
          ) : currentRoute.view === 'about' ? (
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
                onNavigateTherapy={() => scrollToSection('therapy')}
              />

              {/* Real Patient Recovery Testimonials - Single Row Carousel with 5 Stars & Portraits */}
              <PatientTestimonialsRowSection />

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
          onLoginSuccess={handleLoginSuccess}
        />

        {/* Official Franchise Partnership Modal */}
        <FranchiseModal
          isOpen={isFranchiseOpen}
          onClose={() => setIsFranchiseOpen(false)}
        />

        {/* Dynamic Admin-Controlled Advertisement / Announcement Modal (User Facing) */}
        {currentRoute.view !== 'admin' && (
          <AdvertisementModal
            onOpenFranchise={() => setIsFranchiseOpen(true)}
          />
        )}
      </div>
    </SmoothScroll>
  );
}

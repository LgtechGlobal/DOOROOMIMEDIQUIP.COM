import React, { useState, useEffect } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { TestingPipeline } from './components/TestingPipeline';
import { DevelopmentSection } from './components/DevelopmentSection';
import { ProductShowcase } from './components/ProductShowcase';
import { QualitySection } from './components/QualitySection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CompareDrawer } from './components/CompareDrawer';
import { LoginModal } from './components/LoginModal';
import { Product } from './data/siteData';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState('all');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleCompare = (product: Product) => {
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

  const handleSelectForQuote = (product: Product) => {
    setQuoteProduct(product);
    scrollToSection('contact');
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
          {/* Hero Section Carousel */}
          <div id="hero">
            <Hero
              onExploreProducts={() => scrollToSection('products')}
              onRequestQuote={() => scrollToSection('contact')}
            />
          </div>

          {/* Animated Statistics Ribbon */}
          <StatsSection />

          {/* 3D Depth Carousel All Products Showcase */}
          <TestingPipeline
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectForQuote={handleSelectForQuote}
            onToggleCompare={handleToggleCompare}
            comparedProducts={comparedProducts}
          />

          {/* Intermediate Formulation to Mass Production Journey */}
          <DevelopmentSection
            onExploreProducts={() => scrollToSection('products')}
          />

          {/* Master Formulations & Technical Catalogues */}
          <ProductShowcase
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectForQuote={handleSelectForQuote}
            comparedProducts={comparedProducts}
            onToggleCompare={handleToggleCompare}
            selectedCatId={selectedCatId}
          />

          {/* Certified Quality & International Accreditations */}
          <QualitySection
            onViewTesting={() => scrollToSection('testing')}
          />

          {/* About Hanbit Korea Heritage & Cleanroom Cleanliness */}
          <AboutSection
            onContactClick={() => scrollToSection('contact')}
          />

          {/* Turnkey OEM/ODM Services & FAQs */}
          <ServicesSection />

          {/* High-Resolution Facility & Cleanroom Gallery */}
          <GallerySection />

          {/* Direct Quotation & Consultation Form */}
          <ContactSection
            preselectedProduct={quoteProduct}
            onClearPreselected={() => setQuoteProduct(null)}
          />
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

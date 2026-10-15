import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/siteData';
import { ProductCard } from './ProductCard';
import { CatalogueSection } from './CatalogueSection';

export const ProductShowcase = ({
  onQuickView,
  onSelectForQuote,
  comparedProducts = [],
  onToggleCompare,
  selectedCatId = 'all',
}) => {
  const [activeTab, setActiveTab] = useState('products');
  const [selectedCategory, setSelectedCategory] = useState(selectedCatId);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4; // Exactly 4 products per page

  // Update selectedCategory if parent passes new selectedCatId
  useEffect(() => {
    if (selectedCatId && selectedCatId !== 'all') {
      setSelectedCategory(selectedCatId);
      setCurrentPage(1);
    }
  }, [selectedCatId]);

  // Reset page when category or search query changes
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Filter products by category & search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCat = selectedCategory === 'all' || p.cat === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCat;

      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        p.nameKo.includes(query) ||
        p.model.toLowerCase().includes(query) ||
        p.short.toLowerCase().includes(query) ||
        p.keyActives.some((a) => a.toLowerCase().includes(query));

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Total pages based on 4 items per page
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  // Current 4 products for the active page
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <section id="products" className="py-20 lg:py-28 bg-[#fbfbfa] border-t border-hanbit-border relative overflow-hidden">
      {/* Target anchor for Therapy navigation */}
      <div id="therapy" className="absolute -top-24" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-hanbit-gold/5 via-hanbit-cyan/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10">
        
        {/* Luxury Mediquip Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-hanbit-gold/30 text-xs font-semibold text-hanbit-forest shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-hanbit-gold animate-pulse" />
            <span className="font-mono text-hanbit-gold font-bold">두루미 바이오</span>
            <span className="text-hanbit-border">|</span>
            <span className="tracking-wider uppercase text-[11px]">Clinically Verified Formulations</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight font-serif">
            Dooroomi Master Bio-Formulations
          </h2>
          
          <p className="mt-4 text-sm sm:text-base text-hanbit-muted font-light leading-relaxed max-w-2xl mx-auto">
            Engineered in our Seoul bio-laboratories and aseptically manufactured in Incheon cleanrooms. Explore flagship OEM/ODM formulations or inspect clinical dossiers.
          </p>

          {/* Luxury Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-hanbit-border/80 shadow-sm">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'products'
                  ? 'bg-hanbit-forest text-white shadow-md'
                  : 'text-hanbit-muted hover:text-hanbit-forest'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-hanbit-gold" />
              <span>Master Formulations ({PRODUCTS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('catalogue')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'catalogue'
                  ? 'bg-hanbit-forest text-white shadow-md'
                  : 'text-hanbit-muted hover:text-hanbit-forest'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-hanbit-gold" />
              <span>Technical Dossiers (6)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 4-Product Page Showcase */}
        {activeTab === 'products' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Control & Filter Hub */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-hanbit-border shadow-sm">
              {/* Category Pills */}
              <div className="flex items-center flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-hanbit-forest text-white shadow-sm ring-1 ring-hanbit-gold/50'
                      : 'bg-hanbit-ivory text-hanbit-muted hover:bg-hanbit-sage-light hover:text-hanbit-forest border border-hanbit-border/70'
                  }`}
                >
                  All Series ({PRODUCTS.length})
                </button>
                {CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter((p) => p.cat === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-hanbit-forest text-white shadow-sm ring-1 ring-hanbit-gold/50'
                          : 'bg-hanbit-ivory text-hanbit-muted hover:bg-hanbit-sage-light hover:text-hanbit-forest border border-hanbit-border/70'
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Instant Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-hanbit-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search formula, model, active..."
                  className="w-full pl-10 pr-9 py-2.5 text-xs rounded-xl bg-hanbit-ivory border border-hanbit-border text-hanbit-ink placeholder-hanbit-muted focus:outline-none focus:border-hanbit-gold focus:ring-1 focus:ring-hanbit-gold transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-hanbit-muted hover:text-hanbit-ink cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Status Annotation */}
            {(selectedCategory !== 'all' || searchQuery) && (
              <div className="flex items-center justify-between text-xs text-hanbit-muted px-2">
                <span>
                  Showing <b>{filteredProducts.length}</b> of {PRODUCTS.length} formulations
                  {selectedCategory !== 'all' && ` in ${CATEGORIES.find((c) => c.id === selectedCategory)?.name}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </span>
                <button
                  onClick={() => {
                    handleCategoryChange('all');
                    handleSearchChange('');
                  }}
                  className="font-semibold text-hanbit-gold hover:underline cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}

            {/* Products Display Area - Exactly 4 Products on this Page */}
            {filteredProducts.length > 0 ? (
              <div className="space-y-8">
                {/* 4-Product Grid: 4 columns on large screens */}
                <div 
                  key={currentPage} 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 animate-in fade-in duration-300"
                >
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={onQuickView}
                      onSelectForQuote={onSelectForQuote}
                      isCompared={comparedProducts.some((p) => p.id === product.id)}
                      onToggleCompare={onToggleCompare}
                    />
                  ))}
                </div>

                {/* Luxury Pagination Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-4 border-t border-hanbit-border/80">
                  {/* Status Indicator */}
                  <div className="text-xs text-hanbit-muted font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-hanbit-gold inline-block" />
                    <span>
                      Showing formulations{' '}
                      <b className="text-hanbit-forest font-bold">
                        {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                      </b>{' '}
                      –{' '}
                      <b className="text-hanbit-forest font-bold">
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
                      </b>{' '}
                      of{' '}
                      <b className="text-hanbit-forest font-bold">
                        {filteredProducts.length}
                      </b>{' '}
                      (Page {currentPage} of {totalPages})
                    </span>
                  </div>

                  {/* Pagination Navigation Controls */}
                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        currentPage === 1
                          ? 'bg-hanbit-ivory text-hanbit-muted/40 border-hanbit-border/40 cursor-not-allowed'
                          : 'bg-white text-hanbit-forest border-hanbit-border hover:bg-hanbit-forest hover:text-white shadow-xs cursor-pointer'
                      }`}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            currentPage === pageNum
                              ? 'bg-hanbit-forest text-white shadow-sm ring-2 ring-hanbit-gold/60 font-extrabold'
                              : 'bg-white text-hanbit-forest border border-hanbit-border hover:border-hanbit-gold hover:bg-hanbit-sage-light/30'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        currentPage === totalPages
                          ? 'bg-hanbit-ivory text-hanbit-muted/40 border-hanbit-border/40 cursor-not-allowed'
                          : 'bg-white text-hanbit-forest border-hanbit-border hover:bg-hanbit-forest hover:text-white shadow-xs cursor-pointer'
                      }`}
                      aria-label="Next page"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Empty state */
              <div className="py-20 text-center bg-white rounded-3xl border border-hanbit-border p-8">
                <Layers className="w-10 h-10 text-hanbit-muted/50 mx-auto mb-3" />
                <h4 className="text-base font-bold text-hanbit-forest">No formulations matched your criteria</h4>
                <p className="text-xs text-hanbit-muted mt-1 max-w-sm mx-auto">
                  Try adjusting your search query or selecting a different formulation series.
                </p>
                <button
                  onClick={() => {
                    handleCategoryChange('all');
                    handleSearchChange('');
                  }}
                  className="mt-4 px-5 py-2 rounded-full bg-hanbit-forest text-white text-xs font-bold hover:bg-hanbit-dark transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Catalogues Section */}
        {activeTab === 'catalogue' && (
          <div className="animate-in fade-in duration-300">
            <CatalogueSection />
          </div>
        )}

      </div>
    </section>
  );
};

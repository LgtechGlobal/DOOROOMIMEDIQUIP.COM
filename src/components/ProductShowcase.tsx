import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, FileText, ArrowRight, X } from 'lucide-react';
import { Product, PRODUCTS, CATEGORIES } from '../data/siteData';
import { ProductCard } from './ProductCard';
import { CatalogueSection } from './CatalogueSection';

interface ProductShowcaseProps {
  onQuickView: (product: Product) => void;
  onSelectForQuote: (product: Product) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  selectedCatId?: string;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  onQuickView,
  onSelectForQuote,
  comparedProducts,
  onToggleCompare,
  selectedCatId = 'all',
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'catalogue'>('products');
  const [selectedCategory, setSelectedCategory] = useState<string>(selectedCatId);
  const [searchQuery, setSearchQuery] = useState('');

  // Update selectedCategory if parent passes new selectedCatId
  React.useEffect(() => {
    if (selectedCatId && selectedCatId !== 'all') {
      setSelectedCategory(selectedCatId);
    }
  }, [selectedCatId]);

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
        p.keyActives.some(a => a.toLowerCase().includes(query));

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="products" className="py-20 lg:py-28 bg-hanbit-ivory border-t border-hanbit-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-hanbit-gold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Formulations & Technical Library</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight">
            Certified Korean Bio-Formulations.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-hanbit-muted font-light leading-relaxed">
            Browse our core OEM/ODM series, compare clinical specifications side-by-side, or download comprehensive technical dossiers.
          </p>

          {/* Main Tab Switcher: Products vs. Catalogues */}
          <div className="mt-8 inline-flex p-1.5 rounded-full bg-white border border-hanbit-border shadow-sm">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-hanbit-forest text-white shadow-md'
                  : 'text-hanbit-muted hover:text-hanbit-forest'
              }`}
            >
              Master Formulations ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setActiveTab('catalogue')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'catalogue'
                  ? 'bg-hanbit-forest text-white shadow-md'
                  : 'text-hanbit-muted hover:text-hanbit-forest'
              }`}
            >
              Technical Catalogues & Dossiers (6)
            </button>
          </div>
        </div>

        {/* Tab 1: Products Listing */}
        {activeTab === 'products' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Toolbar: Category Filters + Instant Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-hanbit-border shadow-sm">
              {/* Category Pills */}
              <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-hanbit-forest text-white shadow-sm'
                      : 'bg-hanbit-ivory text-hanbit-muted hover:bg-hanbit-sage-light hover:text-hanbit-forest border border-hanbit-border/60'
                  }`}
                >
                  All ({PRODUCTS.length})
                </button>
                {CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter(p => p.cat === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-hanbit-forest text-white shadow-sm'
                          : 'bg-hanbit-ivory text-hanbit-muted hover:bg-hanbit-sage-light hover:text-hanbit-forest border border-hanbit-border/60'
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Instant Search input */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-hanbit-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search formula, model, active..."
                  className="w-full pl-10 pr-9 py-2 text-xs rounded-full bg-hanbit-ivory border border-hanbit-border text-hanbit-ink placeholder-hanbit-muted focus:outline-none focus:border-hanbit-gold focus:ring-1 focus:ring-hanbit-gold"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-hanbit-muted hover:text-hanbit-ink"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Active search filter annotation */}
            {(selectedCategory !== 'all' || searchQuery) && (
              <div className="flex items-center justify-between text-xs text-hanbit-muted px-2">
                <span>
                  Showing <b>{filteredProducts.length}</b> of {PRODUCTS.length} formulations
                  {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="font-semibold text-hanbit-gold hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={onQuickView}
                    onSelectForQuote={onSelectForQuote}
                    isCompared={comparedProducts.some(p => p.id === product.id)}
                    onToggleCompare={onToggleCompare}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-hanbit-border space-y-3">
                <p className="text-sm font-semibold text-hanbit-forest">
                  No formulations found matching your query.
                </p>
                <p className="text-xs text-hanbit-muted max-w-md mx-auto">
                  Try adjusting your search keyword or clearing category filters to view all available products.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-2 px-5 py-2 rounded-full bg-hanbit-forest text-white text-xs font-semibold hover:bg-hanbit-dark"
                >
                  Clear Search & Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Catalogues & Technical PDF Downloads */}
        {activeTab === 'catalogue' && (
          <div className="animate-in fade-in duration-300">
            <CatalogueSection />
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  FlaskConical, 
  Layers, 
  X, 
  ChevronRight, 
  Home, 
  Check, 
  Eye, 
  FileText,
  ShieldCheck
} from 'lucide-react';
import { PRODUCTS as FALLBACK_PRODUCTS, CATEGORIES } from '../data/siteData';
import { useData } from '../context/DataContext';
import { getOptimizedImageUrl } from '../utils/imageUrl';
import { getProductTheme } from '../utils/productTheme';

export const ProductsGalleryPage = ({
  onSelectProduct,
  onNavigateHome,
  onSelectForQuote,
  comparedProducts = [],
  onToggleCompare
}) => {
  const { products: dynamicProducts } = useData();
  const rawProducts = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : FALLBACK_PRODUCTS;
  const productsList = useMemo(() => [...rawProducts].reverse(), [rawProducts]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by category & search query
  const filteredProducts = useMemo(() => {
    return productsList.filter((p) => {
      const matchesCat = selectedCategory === 'all' || p.cat === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCat;

      return (
        matchesCat && (
          p.name.toLowerCase().includes(query) ||
          p.nameKo.toLowerCase().includes(query) ||
          p.model.toLowerCase().includes(query) ||
          p.short.toLowerCase().includes(query) ||
          p.keyActives?.some((a) => a.toLowerCase().includes(query))
        )
      );
    });
  }, [productsList, selectedCategory, searchQuery]);

  return (
    <div className="bg-[#fcfdfa] min-h-screen py-10 sm:py-16 text-hanbit-ink">
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-hanbit-border">
          <nav className="flex items-center space-x-2 text-xs text-hanbit-muted font-medium">
            <button 
              onClick={() => onNavigateHome('hero')}
              className="hover:text-hanbit-forest flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-hanbit-gold" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <span className="text-hanbit-forest font-semibold">Formulation Library</span>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <span className="text-hanbit-gold font-bold">All Master Series</span>
          </nav>

          <span className="text-xs font-mono text-hanbit-muted">
            Showing {filteredProducts.length} of {productsList.length} Formulations
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-hanbit-gold/30 text-xs font-semibold text-hanbit-forest shadow-2xs mb-4">
            <Sparkles className="w-4 h-4 text-hanbit-gold" />
            <span className="font-mono text-hanbit-gold font-bold">두루미 전제품 라인업</span>
            <span className="text-hanbit-border">|</span>
            <span className="tracking-wider uppercase text-[11px]">Comprehensive Medical &amp; Therapeutic Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight font-serif">
            Precision Bio-Active Formulations &amp; Thermal Systems.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-800 font-normal leading-relaxed">
            Engineered under ISO 22716, ISO 13485, and Korea CGMP certifications. Explore our complete series of clinically verified skincare, body therapeutics, and hospital-grade thermal recovery devices.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-hanbit-border">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-hanbit-forest text-white shadow-xs'
                  : 'bg-white hover:bg-hanbit-ivory text-hanbit-muted border border-hanbit-border'
              }`}
            >
              All Series ({productsList.length})
            </button>

            {CATEGORIES.map((cat) => {
              const count = productsList.filter((p) => p.cat === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-hanbit-forest text-white shadow-xs'
                      : 'bg-white hover:bg-hanbit-ivory text-hanbit-muted border border-hanbit-border'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-hanbit-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, model, active..."
              className="w-full pl-10 pr-9 py-2.5 text-xs rounded-xl bg-white border border-hanbit-border text-hanbit-ink placeholder-hanbit-muted focus:outline-none focus:border-hanbit-gold focus:ring-1 focus:ring-hanbit-gold transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-hanbit-muted hover:text-hanbit-ink cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Feedback Notice */}
        {(selectedCategory !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between text-xs text-hanbit-muted mb-8 px-2">
            <span>
              Showing <b>{filteredProducts.length}</b> results
              {selectedCategory !== 'all' && ` in ${CATEGORIES.find((c) => c.id === selectedCategory)?.name}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="font-semibold text-hanbit-gold hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Products Gallery Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {filteredProducts.map((product) => {
              const isCompared = comparedProducts.some((p) => p.id === product.id);
              const phSpec = product.specs?.find(([k]) => k.toLowerCase().includes('ph'))?.[1] || 'Skin Neutral';
              const theme = getProductTheme(product);

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product.id)}
                  className={`group relative bg-white rounded-3xl border border-hanbit-border/80 ${theme.hoverBorder} shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer`}
                >
                  {/* Top Floating Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                    <span className={`px-2.5 py-1 rounded-full backdrop-blur-md border ${theme.modelBadge} text-[10px] font-mono font-bold shadow-sm`}>
                      {product.model}
                    </span>

                    {product.badge ? (
                      <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-hanbit-forest to-emerald-950 text-white text-[10px] font-bold tracking-wide shadow-sm flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-hanbit-gold" />
                        <span>{product.badge}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-hanbit-border text-[10px] font-medium text-slate-700 shadow-xs">
                        {product.catLabel?.split('·')[0]?.trim()}
                      </span>
                    )}
                  </div>

                  {/* Product Image Stage with tailored background color & glow */}
                  <div className={`relative aspect-[4/3.8] w-full ${theme.stageBg} overflow-hidden flex items-center justify-center p-6 border-b ${theme.stageBorder} transition-colors duration-500`}>
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: theme.stageGlow,
                      }}
                    />

                    <img
                      src={getOptimizedImageUrl(product.imgUrl, { width: 600 })}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-500 ease-out group-hover:scale-108 group-hover:-translate-y-1"
                    />

                    {/* Floating Net Volume Tag */}
                    <div className="absolute bottom-2.5 left-3.5 px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] text-slate-700 font-semibold flex items-center gap-1 shadow-xs">
                      <FlaskConical className="w-2.5 h-2.5 text-hanbit-gold" />
                      <span>{product.volume}</span>
                    </div>

                    {/* Open Single Product Indicator Button on Hover */}
                    <div className="absolute bottom-2.5 right-3.5 py-1.5 px-3 rounded-lg bg-hanbit-dark/90 text-white text-[11px] font-semibold backdrop-blur-sm transition-all duration-200 flex items-center gap-1.5 shadow-md opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3 text-hanbit-gold" />
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-3.5">
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold text-hanbit-gold line-clamp-1">
                        {product.nameKo}
                      </p>
                      <h3 className="text-base font-bold text-hanbit-forest leading-snug group-hover:text-hanbit-dark transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed font-normal pt-1">
                        {product.short}
                      </p>
                    </div>

                    {/* Key Actives Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {product.keyActives?.slice(0, 2).map((active, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2 py-0.5 rounded-md bg-hanbit-ivory border border-hanbit-border/70 text-[10px] font-medium text-hanbit-forest flex items-center gap-1 line-clamp-1"
                        >
                          <span className="w-1 h-1 rounded-full bg-hanbit-gold shrink-0" />
                          <span>{active}</span>
                        </span>
                      ))}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-2 border-t border-hanbit-border/60 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-hanbit-forest flex items-center gap-1 group-hover:text-hanbit-gold transition-colors">
                        <span>Open Specification</span>
                        <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold group-hover:translate-x-1 transition-transform" />
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectForQuote(product);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white border border-emerald-700 text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 hover:shadow-md active:scale-95 group/btn"
                        title={`Inquire / Contact Us for ${product.name} at ${product.price || 'Quote'}`}
                      >
                        <span className="font-extrabold text-amber-300 font-mono tracking-tight text-xs sm:text-sm">
                          {product.price || 'Get Quote'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-hanbit-border p-8">
            <Layers className="w-10 h-10 text-hanbit-muted/50 mx-auto mb-3" />
            <h4 className="text-base font-bold text-hanbit-forest">No formulations matched your query</h4>
            <p className="text-xs text-hanbit-muted mt-1 max-w-sm mx-auto">
              Try adjusting your search query or selecting a different series.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-hanbit-forest text-white text-xs font-bold hover:bg-hanbit-dark transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

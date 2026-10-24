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

      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        p.nameKo.includes(query) ||
        p.model.toLowerCase().includes(query) ||
        p.short.toLowerCase().includes(query) ||
        p.keyActives.some((a) => a.toLowerCase().includes(query));

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fbfbfa] pt-6 pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 mb-8">
        <nav className="flex items-center space-x-2 text-xs text-hanbit-muted font-medium py-3 border-b border-hanbit-border/60">
          <button 
            onClick={() => onNavigateHome('hero')}
            className="hover:text-hanbit-forest flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-hanbit-gold" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
          <span className="text-hanbit-forest font-bold">Products Gallery</span>
          <span className="text-hanbit-border">|</span>
          <span className="text-[11px] text-hanbit-gold font-mono">{filteredProducts.length} Available Formulations</span>
        </nav>
      </div>

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        {/* Gallery Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-hanbit-gold/30 text-xs font-semibold text-hanbit-forest shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-hanbit-gold animate-pulse" />
            <span className="font-mono text-hanbit-gold font-bold">두루미 제품 갤러리</span>
            <span className="text-hanbit-border">|</span>
            <span className="tracking-wider uppercase text-[11px]">All Products & Formulations</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight font-serif">
            Dooroomi Master Product Gallery
          </h1>

          <p className="mt-4 text-sm sm:text-base text-hanbit-muted font-light leading-relaxed max-w-2xl mx-auto">
            Click any product below to open its dedicated single product profile, clinical test data, and certified technical specifications.
          </p>
        </div>

        {/* Toolbar: Category Filters + Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-hanbit-border shadow-sm mb-10">
          {/* Category Series Pills */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-hanbit-forest text-white shadow-sm ring-1 ring-hanbit-gold/50'
                  : 'bg-hanbit-ivory text-hanbit-muted hover:bg-hanbit-sage-light hover:text-hanbit-forest border border-hanbit-border/70'
              }`}
            >
              All Formulations ({productsList.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = productsList.filter((p) => p.cat === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
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
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-hanbit-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formula, model, active..."
              className="w-full pl-10 pr-9 py-2.5 text-xs rounded-xl bg-hanbit-ivory border border-hanbit-border text-hanbit-ink placeholder-hanbit-muted focus:outline-none focus:border-hanbit-gold focus:ring-1 focus:ring-hanbit-gold transition-colors"
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

        {/* Filter Status Text */}
        {(selectedCategory !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between text-xs text-hanbit-muted px-2 mb-6">
            <span>
              Showing <b>{filteredProducts.length}</b> of {productsList.length} formulations
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

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product.id)}
                  className="group relative bg-white rounded-3xl border border-hanbit-border/80 hover:border-hanbit-gold/70 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                >
                  {/* Top Floating Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-hanbit-gold/40 text-[10px] font-mono font-bold text-hanbit-gold shadow-sm">
                      {product.model}
                    </span>

                    {product.badge ? (
                      <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-hanbit-forest to-emerald-950 text-white text-[10px] font-bold tracking-wide shadow-sm flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-hanbit-gold" />
                        <span>{product.badge}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-hanbit-border text-[10px] font-medium text-hanbit-muted shadow-xs">
                        {product.catLabel?.split('·')[0]?.trim()}
                      </span>
                    )}
                  </div>

                  {/* Product Image Stage */}
                  <div className="relative aspect-[4/3.8] w-full bg-gradient-to-b from-hanbit-ivory/80 via-white to-hanbit-sage-light/25 overflow-hidden flex items-center justify-center p-6 border-b border-hanbit-border/40">
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: 'radial-gradient(circle at 50% 55%, rgba(197, 160, 89, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
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
                    <div className="absolute bottom-2.5 left-3.5 px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-sm border border-hanbit-border/60 text-[10px] text-hanbit-muted font-medium flex items-center gap-1 shadow-xs">
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
                      <p className="text-xs text-hanbit-muted line-clamp-2 leading-relaxed font-light pt-1">
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

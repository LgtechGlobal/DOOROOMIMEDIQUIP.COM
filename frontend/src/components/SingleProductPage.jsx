import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  FlaskConical, 
  Home, 
  ChevronRight, 
  Check, 
  Eye, 
  FileText 
} from 'lucide-react';
import { PRODUCTS as FALLBACK_PRODUCTS, CATEGORIES } from '../data/siteData';
import { useData } from '../context/DataContext';
import { getOptimizedImageUrl } from '../utils/imageUrl';

export const SingleProductPage = ({
  productId,
  onBackToGallery,
  onNavigateHome,
  onSelectForQuote,
  onSelectProduct,
  comparedProducts = [],
  onToggleCompare,
}) => {
  const { products: dynamicProducts } = useData();
  const productsList = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : FALLBACK_PRODUCTS;

  const [zoomImage, setZoomImage] = useState(false);

  // Find product by id or slug
  const product = productsList.find((p) => p.id === productId || p.slug === productId) || productsList[0];

  // Companion products from same series
  const companionProducts = productsList
    .filter((p) => p.cat === product.cat && p.id !== product.id)
    .slice(0, 3);

  const isCompared = comparedProducts.some((p) => p.id === product.id);

  return (
    <div className="min-h-screen bg-[#fbfbfa] pt-6 pb-24">
      {/* Top Breadcrumb Navigation */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-hanbit-border/60">
          <nav className="flex items-center space-x-2 text-xs text-hanbit-muted font-medium flex-wrap">
            <button 
              onClick={() => onNavigateHome('hero')}
              className="hover:text-hanbit-forest flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-hanbit-gold" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <button
              onClick={onBackToGallery}
              className="hover:text-hanbit-forest cursor-pointer transition-colors"
            >
              Products Gallery
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <span className="text-hanbit-gold font-bold">{product.catLabel.split('·')[0]}</span>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <span className="text-hanbit-forest font-bold truncate max-w-xs">{product.name}</span>
          </nav>

          <button
            onClick={onBackToGallery}
            className="inline-flex items-center gap-2 text-xs font-bold text-hanbit-forest hover:text-hanbit-gold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4 text-hanbit-gold" />
            <span>Back to Products Gallery</span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        {/* Main Product Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Media Stage Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="relative rounded-3xl bg-white border border-hanbit-border/80 shadow-xl overflow-hidden p-8 sm:p-12 flex flex-col items-center justify-center">
              {/* Top Floating Tags */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-hanbit-forest text-white text-xs font-mono font-bold shadow-sm">
                  {product.model}
                </span>

                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-hanbit-gold to-amber-500 text-hanbit-dark text-xs font-bold shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{product.badge}</span>
                  </span>
                )}
              </div>

              {/* Ambient Radial Glow */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-80"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.18) 0%, rgba(255, 255, 255, 0) 70%)',
                }}
              />

              {/* Product Bottle / Device Image */}
              <div 
                onClick={() => setZoomImage(true)}
                className="relative w-full max-w-[360px] aspect-square flex items-center justify-center cursor-zoom-in group"
              >
                <img
                  src={getOptimizedImageUrl(product.imgUrl, { width: 900 })}
                  alt={product.name}
                  decoding="async"
                  className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 p-2 rounded-xl bg-white/90 backdrop-blur-md border border-hanbit-border text-hanbit-forest shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-hanbit-gold" />
                  <span>Click to Expand</span>
                </div>
              </div>

              {/* Specifications Strip */}
              <div className="mt-8 w-full grid grid-cols-2 gap-3 pt-6 border-t border-hanbit-border/70 text-center">
                <div className="p-3 rounded-2xl bg-hanbit-ivory border border-hanbit-border/60">
                  <span className="text-[10px] uppercase font-bold text-hanbit-muted tracking-wider block">Net Volume</span>
                  <span className="text-xs font-bold text-hanbit-forest mt-0.5 block">{product.volume}</span>
                </div>
                <div className="p-3 rounded-2xl bg-hanbit-ivory border border-hanbit-border/60">
                  <span className="text-[10px] uppercase font-bold text-hanbit-muted tracking-wider block">Sensory Texture</span>
                  <span className="text-xs font-bold text-hanbit-forest mt-0.5 block truncate">{product.texture}</span>
                </div>
              </div>
            </div>

            {/* Quality Seals Bar */}
            <div className="p-5 rounded-2xl bg-white border border-hanbit-border shadow-xs flex items-center justify-between text-xs text-hanbit-forest">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4 text-hanbit-gold" />
                <span>ISO 22716 Cleanroom Verified</span>
              </span>
              <span className="text-hanbit-border">|</span>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-4 h-4 text-hanbit-gold" />
                <span>Korea CGMP Certified</span>
              </span>
            </div>
          </div>

          {/* Right Information & Dossier Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header Titles */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-hanbit-gold uppercase tracking-widest">
                  {product.catLabel}
                </span>
                <span className="text-hanbit-border">•</span>
                <span className="text-xs font-mono font-bold text-hanbit-muted">
                  Batch Code: {product.model}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight font-serif">
                {product.name}
              </h1>

              <p className="text-lg font-bold text-hanbit-gold">
                {product.nameKo}
              </p>
            </div>

            {/* Overview Narrative */}
            <div className="p-6 rounded-3xl bg-white border border-hanbit-border shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-hanbit-forest flex items-center gap-2">
                <FileText className="w-4 h-4 text-hanbit-gold" />
                <span>Clinical Formulation Synopsis</span>
              </h3>
              <p className="text-sm sm:text-base text-hanbit-ink/80 leading-relaxed font-light">
                {product.desc}
              </p>
            </div>

            {/* Key Bio-Actives */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-hanbit-forest">
                Proprietary Bio-Actives & Ingredients
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {product.keyActives.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-hanbit-border shadow-xs hover:border-hanbit-gold/60 transition-colors flex items-start gap-2.5"
                  >
                    <Sparkles className="w-4 h-4 text-hanbit-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-hanbit-forest block leading-snug">
                        {act}
                      </span>
                      <span className="text-[10px] text-hanbit-muted mt-0.5 block">
                        Verified active grade
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certified Technical Parameters Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-hanbit-forest">
                Certified Technical Parameters & Compliance
              </h3>
              <div className="rounded-3xl border border-hanbit-border bg-white overflow-hidden shadow-sm">
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-hanbit-border">
                    {product.specs.map(([key, val], idx) => (
                      <tr 
                        key={idx} 
                        className={idx % 2 === 0 ? 'bg-hanbit-ivory/40' : 'bg-white'}
                      >
                        <th className="py-3 px-5 text-left font-medium text-hanbit-muted w-2/5">
                          {key}
                        </th>
                        <td className="py-3 px-5 text-left font-bold text-hanbit-forest">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Bar: Request Quote, Compare, Download PDF */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {/* Primary Quote CTA */}
              <button
                onClick={() => onSelectForQuote(product)}
                className="flex-1 py-4 px-7 rounded-2xl bg-gradient-to-r from-hanbit-forest to-hanbit-dark hover:from-hanbit-dark hover:to-emerald-950 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Sample Batch Quote</span>
                <ArrowRight className="w-4 h-4 text-hanbit-gold" />
              </button>

              {/* Compare Toggle */}
              <button
                onClick={() => onToggleCompare(product)}
                className={`py-4 px-5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isCompared
                    ? 'bg-hanbit-forest text-white border-hanbit-forest shadow-sm'
                    : 'bg-white hover:bg-hanbit-ivory text-hanbit-forest border-hanbit-border'
                }`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  isCompared ? 'bg-hanbit-gold border-hanbit-gold text-white' : 'border-hanbit-border bg-white'
                }`}>
                  {isCompared && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{isCompared ? 'Added to Compare' : 'Compare'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Companion Series Formulations */}
        {companionProducts.length > 0 && (
          <div className="pt-16 border-t border-hanbit-border/80">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-hanbit-gold uppercase tracking-widest block">
                  Same Formulation Series
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest mt-1 font-serif">
                  Explore Companion Formulations
                </h3>
              </div>
              <button
                onClick={onBackToGallery}
                className="text-xs font-bold text-hanbit-gold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Gallery ({productsList.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {companionProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p.id)}
                  className="group p-5 rounded-3xl bg-white border border-hanbit-border hover:border-hanbit-gold/60 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-hanbit-ivory p-2 flex items-center justify-center shrink-0 border border-hanbit-border/50">
                      <img
                        src={getOptimizedImageUrl(p.imgUrl, { width: 300 })}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain filter drop-shadow group-hover:scale-108 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-hanbit-gold uppercase">{p.model}</span>
                      <h4 className="text-sm font-bold text-hanbit-forest group-hover:text-hanbit-gold transition-colors line-clamp-1 mt-0.5">
                        {p.name}
                      </h4>
                      <p className="text-xs text-hanbit-muted line-clamp-1 mt-0.5">{p.nameKo}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-hanbit-border/50 flex items-center justify-between text-xs">
                    <span className="text-hanbit-muted text-[11px]">{p.volume}</span>
                    <span className="text-hanbit-forest font-bold flex items-center gap-1 group-hover:text-hanbit-gold transition-colors">
                      <span>View Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Fullscreen Lightbox Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hanbit-dark/80 backdrop-blur-md cursor-zoom-out"
          onClick={() => setZoomImage(false)}
        >
          <div className="relative max-w-4xl max-h-[85vh] p-6 bg-white rounded-3xl overflow-hidden shadow-2xl border border-hanbit-border">
            <img
              src={getOptimizedImageUrl(product.imgUrl, { width: 1400 })}
              alt={product.name}
              className="max-h-[75vh] w-auto mx-auto object-contain filter drop-shadow-2xl"
            />
            <p className="text-center text-xs font-mono font-bold text-hanbit-forest mt-3">
              {product.name} — {product.model}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

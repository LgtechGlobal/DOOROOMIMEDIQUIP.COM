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
import { getProductTheme } from '../utils/productTheme';

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
  const theme = getProductTheme(product);

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
            <span className="text-hanbit-gold font-bold">{product.catLabel?.split('·')[0]}</span>
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
          
          {/* Left Media Stage Column with tailored background matching product */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className={`relative rounded-3xl ${theme.stageBg} border ${theme.stageBorder} shadow-xl overflow-hidden p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-500`}>
              {/* Top Floating Tags */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span className={`px-3 py-1 rounded-full border ${theme.modelBadge} text-xs font-mono font-bold shadow-sm`}>
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
                  background: theme.stageGlow,
                }}
              />

              {/* Product Bottle / Device Image */}
              <div 
                onClick={() => setZoomImage(true)}
                className="relative w-full max-w-[360px] aspect-square flex items-center justify-center cursor-zoom-in group z-10"
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
              <div className="mt-8 w-full grid grid-cols-2 gap-3 pt-6 border-t border-hanbit-border/70 text-center relative z-10">
                <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-hanbit-border/60">
                  <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider block">Net Volume</span>
                  <span className="text-xs font-bold text-hanbit-forest mt-0.5 block">{product.volume}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-hanbit-border/60">
                  <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider block">Sensory Texture</span>
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
                <span className="text-xs font-mono font-bold text-slate-700">
                  Batch Code: {product.model}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight font-serif">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <p className="text-lg font-bold text-hanbit-gold">
                  {product.nameKo}
                </p>

                {/* Bold & Shine Authorized Price Tag */}
                {product.price && (
                  <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-amber-400/80 shadow-xl overflow-hidden amount-shine-badge">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
                    <span className="text-[11px] font-mono uppercase font-bold text-emerald-200">Price:</span>
                    <span className="font-black text-amber-300 font-mono text-base sm:text-lg tracking-tight drop-shadow-[0_0_12px_rgba(251,191,36,0.95)]">
                      {product.price}
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse ml-0.5" />
                  </div>
                )}
              </div>
            </div>

            {/* Overview Narrative */}
            <div className="p-6 rounded-3xl bg-white border border-hanbit-border shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-hanbit-forest flex items-center gap-2">
                <FileText className="w-4 h-4 text-hanbit-gold" />
                <span>Clinical Formulation Synopsis</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                {product.desc}
              </p>
            </div>

            {/* Key Bio-Actives */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-hanbit-forest">
                Proprietary Bio-Actives & Ingredients
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {product.keyActives?.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-hanbit-border shadow-xs hover:border-hanbit-gold/60 transition-colors flex items-start gap-2.5"
                  >
                    <Sparkles className="w-4 h-4 text-hanbit-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-hanbit-forest block leading-snug">
                        {act}
                      </span>
                      <span className="text-[10px] text-slate-600 mt-0.5 block font-medium">
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
                    {product.specs?.map(([key, val], idx) => (
                      <tr 
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-hanbit-ivory/50' : 'bg-white'}
                      >
                        <td className="px-5 py-3 font-semibold text-slate-700 w-1/2">
                          {key}
                        </td>
                        <td className="px-5 py-3 font-mono font-bold text-hanbit-forest w-1/2">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Actions CTA Footer */}
            <div className="p-6 rounded-3xl bg-white border border-hanbit-border shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onToggleCompare(product)}
                  className={`w-full sm:w-auto px-5 py-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                    isCompared
                      ? 'bg-hanbit-forest text-white border-hanbit-forest shadow-xs'
                      : 'bg-hanbit-ivory hover:bg-hanbit-sage-light text-hanbit-forest border-hanbit-border'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    isCompared ? 'bg-hanbit-gold border-hanbit-gold text-white' : 'border-hanbit-border bg-white'
                  }`}>
                    {isCompared && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>{isCompared ? 'Added to Compare Matrix' : 'Compare Specification'}</span>
                </button>
              </div>

              <button
                onClick={() => onSelectForQuote(product)}
                className="relative overflow-hidden w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group border border-amber-400/40"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
                {product.price && (
                  <span className="font-black text-amber-300 text-sm font-mono mr-1 drop-shadow-sm">
                    {product.price} •
                  </span>
                )}
                <span>Request Quotation &amp; Samples</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>

        {/* Companion Series Products Cross-Navigation */}
        {companionProducts.length > 0 && (
          <div className="pt-12 border-t border-hanbit-border/80 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest uppercase block">
                  Companion Formulations
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-hanbit-forest font-serif mt-1">
                  More from {product.catLabel?.split('·')[0]}
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
              {companionProducts.map((p) => {
                const compTheme = getProductTheme(p);
                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p.id)}
                    className={`group p-5 rounded-3xl bg-white border border-hanbit-border ${compTheme.hoverBorder} shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-20 h-20 rounded-2xl ${compTheme.stageBg} p-2 flex items-center justify-center shrink-0 border ${compTheme.stageBorder}`}>
                        <img
                          src={getOptimizedImageUrl(p.imgUrl, { width: 300 })}
                          alt={p.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain filter drop-shadow group-hover:scale-108 transition-transform"
                        />
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${compTheme.modelBadge}`}>{p.model}</span>
                        <h4 className="text-sm font-bold text-hanbit-forest group-hover:text-hanbit-gold transition-colors line-clamp-1 mt-1">
                          {p.name}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{p.nameKo}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-hanbit-border/50 flex items-center justify-between text-xs">
                      <span className="text-slate-600 text-[11px] font-medium">{p.volume}</span>
                      <span className="text-hanbit-forest font-bold flex items-center gap-1 group-hover:text-hanbit-gold transition-colors">
                        <span>View Dossier</span>
                        <ArrowRight className="w-3.5 h-3.5 text-hanbit-gold group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                );
              })}
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
          <div className={`relative max-w-4xl max-h-[85vh] p-6 ${theme.stageBg} rounded-3xl overflow-hidden shadow-2xl border ${theme.stageBorder}`}>
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

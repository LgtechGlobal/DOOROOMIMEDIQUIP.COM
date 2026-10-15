import React, { useState } from 'react';
import { X, ZoomIn, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/siteData';

export const GallerySection = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  const categories = ['All', 'Laboratory', 'Factory', 'Products'];

  const filteredItems = GALLERY_ITEMS.filter(
    item => activeCat === 'All' || item.cat === activeCat
  );

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-hanbit-ivory border-t border-hanbit-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-hanbit-gold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cleanroom & Facility Visual Tour</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight">
              State-of-the-Art Research & Manufacturing Facilities.
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-hanbit-border shadow-sm">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCat === c
                    ? 'bg-hanbit-forest text-white shadow-sm'
                    : 'text-hanbit-muted hover:text-hanbit-forest'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-hanbit-border shadow-sm hover:shadow-xl transition-all cursor-zoom-in"
            >
              <div className="aspect-[4/3] w-full bg-hanbit-sage-light/30 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-106 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Overlay caption */}
              <div className="p-4 bg-white border-t border-hanbit-border/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-hanbit-gold uppercase tracking-wider block">
                    {item.cat}
                  </span>
                  <h4 className="text-xs font-bold text-hanbit-forest mt-0.5 line-clamp-1 group-hover:text-hanbit-gold transition-colors">
                    {item.title}
                  </h4>
                </div>
                <div className="w-7 h-7 rounded-full bg-hanbit-ivory text-hanbit-muted group-hover:bg-hanbit-forest group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Dialog Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-hanbit-dark/80 backdrop-blur-md transition-opacity"
            onClick={() => setLightboxItem(null)}
          />

          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-hanbit-border z-10 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-hanbit-forest flex items-center justify-center shadow-md border border-hanbit-border"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 bg-hanbit-ivory flex items-center justify-center max-h-[70vh]">
              <img
                src={lightboxItem.img}
                alt={lightboxItem.title}
                className="max-h-[60vh] max-w-full object-contain filter drop-shadow-xl"
              />
            </div>

            <div className="p-6 bg-white border-t border-hanbit-border flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-hanbit-gold uppercase tracking-wider block">
                  {lightboxItem.cat} Archive
                </span>
                <h3 className="text-base font-extrabold text-hanbit-forest mt-0.5">
                  {lightboxItem.title}
                </h3>
              </div>
              <span className="text-xs text-hanbit-muted font-medium">
                Seoul & Songdo Facilities
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

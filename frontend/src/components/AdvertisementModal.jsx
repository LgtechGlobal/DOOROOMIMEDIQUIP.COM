import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  Handshake, 
  PhoneCall, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { getOptimizedImageUrl } from '../utils/imageUrl';

export const AdvertisementModal = ({ onOpenFranchise, forceOpen = false, previewAd = null, onClosePreview }) => {
  const { activeAd } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentAdId, setCurrentAdId] = useState(null);
  const [prevEnabled, setPrevEnabled] = useState(false);

  // The ad to display (either previewAd from admin or activeAd from context)
  const ad = previewAd || activeAd;

  // Clean out any legacy sessionStorage flags that might be permanently blocking ads in existing browser tabs
  useEffect(() => {
    try {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('dooroomi_ad_dismissed_')) {
          sessionStorage.removeItem(key);
        }
      });
    } catch {
      // ignore
    }
  }, []);

  // When activeAd is enabled or changed, reset dismissal so the ad shows immediately!
  useEffect(() => {
    if (activeAd?.id && activeAd.id !== currentAdId) {
      setCurrentAdId(activeAd.id);
      setIsDismissed(false);
    }
    if (activeAd?.isEnabled && !prevEnabled) {
      setIsDismissed(false);
    }
    setPrevEnabled(!!activeAd?.isEnabled);
  }, [activeAd?.id, activeAd?.isEnabled, currentAdId, prevEnabled]);

  useEffect(() => {
    // If it's a force preview in admin portal
    if (forceOpen && previewAd) {
      setIsOpen(true);
      return;
    }

    // Only show if activeAd exists and isEnabled === true and not manually closed by user
    if (activeAd && activeAd.isEnabled && !isDismissed) {
      // Small 500ms delay so visitor sees website landing first, then smooth elegant popup
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [activeAd, forceOpen, previewAd, isDismissed]);

  const handleClose = () => {
    setIsOpen(false);
    setIsDismissed(true);
    if (previewAd && onClosePreview) {
      onClosePreview();
    }
  };

  const handleAction = () => {
    if (!ad) return;

    handleClose();

    if (ad.buttonActionType === 'franchise') {
      if (onOpenFranchise) {
        onOpenFranchise();
      } else {
        window.location.hash = '/therapy';
      }
    } else if (ad.buttonActionType === 'whatsapp') {
      const phone = '919153697636';
      const text = encodeURIComponent(`Hello DOOROOMI Team, I saw the special announcement: "${ad.title}" on your website and would like more details.`);
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    } else if (ad.buttonActionType === 'call') {
      window.location.href = `tel:+919153697636`;
    } else {
      // link
      if (ad.buttonLink?.startsWith('http')) {
        window.open(ad.buttonLink, '_blank');
      } else if (ad.buttonLink) {
        window.location.hash = ad.buttonLink.replace('#', '');
      }
    }
  };

  if (!isOpen || !ad || (!ad.isEnabled && !forceOpen)) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-md max-h-[90vh] flex flex-col bg-gradient-to-b from-[#0b1c16] via-[#081712] to-[#040c09] border border-amber-500/40 rounded-2xl shadow-2xl shadow-emerald-950/90 overflow-hidden transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Ambient Glow Bar */}
        <div className="shrink-0 h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-emerald-500" />

        {/* Close Button ("X" cross section) */}
        <button
          onClick={handleClose}
          aria-label="Close Announcement"
          className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-red-950/90 border border-emerald-700/60 hover:border-red-500/80 text-neutral-300 hover:text-red-300 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* Media / Visual Banner */}
        {ad.imageUrl && (
          <div className="shrink-0 relative w-full h-36 sm:h-40 bg-neutral-900 overflow-hidden group">
            <img 
              src={getOptimizedImageUrl(ad.imageUrl, { width: 600 })} 
              alt={ad.title} 
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90"
              onError={(e) => {
                e.target.src = '/assets/products/product-real-01.jpeg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c16] via-[#0b1c16]/30 to-transparent" />
            
            {/* Discount / Highlight Tag */}
            {ad.discountTag && (
              <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{ad.discountTag}</span>
              </div>
            )}
          </div>
        )}

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-800/80 [&::-webkit-scrollbar-track]:bg-transparent">
          
          {/* Badge & Official Korean Tag */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40 tracking-wider uppercase">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              {ad.badge || 'SPECIAL ANNOUNCEMENT'}
            </span>
            <span className="text-[10px] font-medium text-emerald-400/80 font-mono tracking-wide">
              두루미 · DOOROOMI OFFICIAL
            </span>
          </div>

          {/* Ad Title */}
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug tracking-tight">
            {ad.title}
          </h3>

          {/* Subtitle */}
          {ad.subtitle && (
            <p className="mt-1 text-xs sm:text-sm font-medium text-amber-300/90 leading-snug">
              {ad.subtitle}
            </p>
          )}

          {/* Description */}
          {ad.description && (
            <p className="mt-2 text-[11px] sm:text-xs text-neutral-300/85 leading-relaxed">
              {ad.description}
            </p>
          )}

          {/* Key Advantages Compact Badges */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-neutral-300">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-[10px] sm:text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Korea Clinical Certification</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-[10px] sm:text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
              <span>100% Free Daily Therapy</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row (Pinned Sticky Footer) */}
        <div className="shrink-0 px-4 py-3 sm:px-5 sm:py-3.5 border-t border-emerald-900/60 bg-[#06120e] flex items-center justify-between gap-2">
          <button
            onClick={handleClose}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Dismiss
          </button>

          <button
            onClick={handleAction}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-black font-bold text-xs tracking-wide shadow-md shadow-amber-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            {ad.buttonActionType === 'franchise' && <Handshake className="w-3.5 h-3.5" />}
            {ad.buttonActionType === 'whatsapp' && <MessageCircle className="w-3.5 h-3.5" />}
            {ad.buttonActionType === 'call' && <PhoneCall className="w-3.5 h-3.5" />}
            {ad.buttonActionType === 'link' && <ArrowRight className="w-3.5 h-3.5" />}
            <span>{ad.buttonText || 'Explore Now'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

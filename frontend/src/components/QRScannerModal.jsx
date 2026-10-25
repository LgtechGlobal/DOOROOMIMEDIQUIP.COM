import React, { useState } from 'react';
import {
  QrCode,
  Download,
  ExternalLink,
  X,
  Star,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Camera
} from 'lucide-react';
import { QRCodeSVG, downloadScannerPoster } from '../utils/qrGenerator';

export const QRScannerModal = ({ isOpen, onClose, onOpenRatingPage }) => {
  if (!isOpen) return null;

  const [isDownloading, setIsDownloading] = useState(false);

  // Compute live rating URL
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.dooroomimediquip.com';
  const pathname = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';
  const ratingUrl = `${origin}${pathname}/#/rate`;

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      downloadScannerPoster({
        qrUrl: ratingUrl,
        centerName: "Dooroomi Medical Pvt. Ltd.",
        filename: "Dooroomi-Customer-Feedback-Scanner.png"
      });
    } catch (err) {
      console.error("Poster download error:", err);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handleOpenDirect = () => {
    onClose();
    if (onOpenRatingPage) {
      onOpenRatingPage();
    } else {
      window.location.hash = '/rate';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      data-lenis-prevent
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-amber-400/80 animate-scale-up relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Korean Luxury Medical Header */}
        <div className="bg-gradient-to-r from-[#0d221b] via-[#12362b] to-[#0d221b] p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-[10px] sm:text-xs font-mono font-bold text-amber-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>OFFICIAL SCANNER PORTAL</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
            Customer Feedback & Rating Scanner
          </h3>
          <p className="text-xs text-emerald-200/90 font-light mt-1">
            Scan with your mobile camera to share your therapy rating & recovery story.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 bg-stone-50/50 text-stone-800">
          
          {/* QR Code Presentation Box with Animated Scanner Laser */}
          <div className="relative mx-auto w-fit p-5 sm:p-6 bg-white rounded-2xl border-2 border-stone-200 shadow-lg flex flex-col items-center justify-center group">
            
            {/* Ambient Corner Crosshairs (Camera Scanner Look) */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500 rounded-tl-sm pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500 rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500 rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500 rounded-br-sm pointer-events-none" />

            {/* Simulated Animated Scanner Laser Beam */}
            <div className="absolute inset-x-5 top-5 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_8px_#10b981] animate-pulse pointer-events-none" />

            <div className="relative">
              <QRCodeSVG value={ratingUrl} size={210} fgColor="#0d221b" bgColor="#ffffff" />
            </div>

            {/* Under QR Stars and Badge */}
            <div className="mt-3 flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <span className="text-[11px] font-mono font-bold text-stone-600 mt-1 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-emerald-700" />
              <span>Scan with Any Smartphone Camera</span>
            </span>
          </div>

          {/* 3 Step Instruction Pills */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              How it works
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="flex items-start gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100">
                <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                <span className="text-stone-700 font-medium">Open smartphone camera</span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100">
                <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                <span className="text-stone-700 font-medium">Point at QR code on screen</span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100">
                <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                <span className="text-stone-700 font-medium">Tap link to rate & review</span>
              </div>
            </div>
          </div>

          {/* Direct Rating Page Link Info */}
          <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-700 shrink-0" />
              <div className="truncate max-w-[220px] sm:max-w-xs">
                <span className="font-semibold text-emerald-950 block">Testing on this device?</span>
                <span className="text-[11px] text-emerald-800 font-mono truncate block">{ratingUrl}</span>
              </div>
            </div>
            <button
              onClick={handleOpenDirect}
              className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer transition shadow-xs"
            >
              <span>Open Form</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Modal Footer with Download Poster Option */}
        <div className="p-4 sm:p-5 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>High-res printable poster for centers & stands</span>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
            title="Download QR code poster to print and place at reception desks or free therapy tables"
          >
            <Download className="w-4 h-4 text-stone-950" />
            <span>{isDownloading ? 'Generating Poster...' : 'Download Scanner Poster (PNG)'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default QRScannerModal;

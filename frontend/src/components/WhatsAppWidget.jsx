import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(true);

  // Dooroomi WhatsApp direct international support number
  const WHATSAPP_NUMBER = "82808502026";

  const quickPrompts = [
    {
      id: 1,
      icon: "👋",
      text: "I need a fast quote for custom OEM formulation & cleanroom filling."
    },
    {
      id: 2,
      icon: "⚡",
      text: "Inquire about Bedro smart therapeutic thermal bed specifications."
    },
    {
      id: 3,
      icon: "🔬",
      text: "Request certified ISO 22716 & CGMP cleanroom audit dossier."
    },
    {
      id: 4,
      icon: "📦",
      text: "Can you dispatch laboratory formulation sample kits to our clinic?"
    }
  ];

  const handleSelectPrompt = (promptText) => {
    setMessage(promptText);
  };

  const handleSendWhatsApp = (customText) => {
    const textToSend = customText || message || "Hello Dooroomi Mediquip! I would like to inquire about your bio-cosmetics and medical equipment.";
    const encoded = encodeURIComponent(textToSend);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendWhatsApp(message);
  };

  return (
    <>
      {/* Interactive WhatsApp Chat Popup Window (Matching Screenshot) */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[350px] sm:w-[380px] max-w-[calc(100vw-32px)] bg-[#0b1619] rounded-3xl shadow-[0_12px_45px_rgba(0,0,0,0.55)] border border-emerald-800/60 overflow-hidden flex flex-col font-sans animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#075E54] via-[#0d7367] to-[#128C7E] px-4 py-3.5 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white border border-emerald-300/40 flex items-center justify-center overflow-hidden shadow-sm p-0.5">
                  <img 
                    src={SITE_CONFIG.logoUrl} 
                    alt="Dooroomi Logo" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075E54] animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white tracking-wide leading-tight">
                  DOOROOMIMEDIQUIP
                </h3>
                <p className="text-[11px] text-emerald-100/90 font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  <span>Formulation & Mediquip Desk • Online</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 space-y-3.5 bg-[#0b1619] text-white">
            
            {/* Greeting Speech Bubble */}
            <div className="bg-[#122429] border border-emerald-900/70 rounded-2xl p-3.5 text-xs text-emerald-100/90 leading-relaxed shadow-xs">
              <p>
                Hello! 👋 Welcome to <b className="text-white">DOOROOMIMEDIQUIP</b>. Looking for custom bio-cosmetic OEM/ODM formulation, cleanroom manufacturing, or therapeutic equipment?
              </p>
            </div>

            {/* Quick Prompts List */}
            <div className="space-y-2">
              <p className="text-[11px] text-emerald-200/60 font-medium">
                Select a quick prompt or message us directly:
              </p>
              <div className="space-y-1.5">
                {quickPrompts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPrompt(p.text)}
                    className="w-full text-left p-2.5 rounded-xl bg-[#0e1d21] hover:bg-[#132c32] border border-emerald-800/40 hover:border-[#25D366]/60 text-xs text-emerald-100/90 hover:text-white transition-all flex items-start gap-2 cursor-pointer shadow-2xs"
                  >
                    <span className="shrink-0">{p.icon}</span>
                    <span className="leading-snug">{p.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message Input Form */}
            <form onSubmit={handleSubmit} className="pt-1 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#122429] border border-emerald-900/80 focus:border-[#25D366] text-xs text-white placeholder-emerald-200/40 rounded-xl px-3.5 py-2.5 outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shrink-0 shadow-sm"
                title="Send message on WhatsApp"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>

            {/* Big Green "Chat on WhatsApp" Button */}
            <button
              onClick={() => handleSendWhatsApp(message)}
              className="w-full py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              {/* WhatsApp Icon */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </button>

          </div>

        </div>
      )}

      {/* Floating Bottom-Right Classy Button Widget (Matching Screenshot 3) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        
        {/* Left Floating Pill Tooltip */}
        {!isOpen && showTooltip && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d1b1e]/95 backdrop-blur-md border border-emerald-800/80 text-white text-xs font-semibold shadow-xl cursor-pointer hover:border-[#25D366] transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="group-hover:text-emerald-300 transition-colors whitespace-nowrap">
              Chat With Formulation Specialist
            </span>
          </div>
        )}

        {/* Circular Floating WhatsApp Button with Concentric Pulse Glow */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white flex items-center justify-center shadow-[0_4px_25px_rgba(37,211,102,0.55)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
        >
          {/* Subtle Outer Concentric Pulse Halo */}
          <span className="absolute inset-0 rounded-full border-2 border-emerald-400/60 animate-ping pointer-events-none opacity-40" />

          {isOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current transition-transform group-hover:scale-105" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          )}
        </button>

      </div>
    </>
  );
};

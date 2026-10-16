import React, { useState } from 'react';
import { 
  Building2, 
  Handshake, 
  Sparkles, 
  ShieldCheck, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  HeartHandshake,
  DollarSign,
  TrendingUp,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../data/siteData';

export const FranchiseModal = ({ isOpen, onClose }) => {
  // Step 1: Handshake animation stage ('animating' | 'ready')
  const [stage, setStage] = useState('animating'); // 'animating' -> 'ready'
  
  // Form fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    currentBusiness: '',
    investmentCapacity: '15-25 Lakhs',
    expectedTimeline: 'Immediate (Within 30 Days)',
    message: ''
  });

  const [errors, setErrors] = useState({});

  // Reset animation when opened
  React.useEffect(() => {
    if (isOpen) {
      setStage('animating');
      const timer = setTimeout(() => {
        setStage('ready');
      }, 1600); // 1.6s for hands to meet and shake
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.city.trim()) errs.city = 'City / Location is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const constructFormattedMessage = () => {
    return `*DOOROOMIMEDIQUIP — FRANCHISE & HEALTHCARE CENTER APPLICATION*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤝 *Applicant Name:* ${formData.fullName.trim()}
📱 *Contact Number:* ${formData.phone.trim()}
📧 *Email Address:* ${formData.email.trim() || 'Not Provided'}
📍 *Proposed Location:* ${formData.city.trim()}${formData.state.trim() ? `, ${formData.state.trim()}` : ''}
💼 *Current Occupation / Business:* ${formData.currentBusiness.trim() || 'Not Specified'}
💰 *Investment Capacity:* ${formData.investmentCapacity}
⏱ *Expected Start Timeline:* ${formData.expectedTimeline}

📝 *Applicant Notes / Message:*
${formData.message.trim() || 'Interested in opening a 100% Free Daily Therapy & Healthcare Center in our city. Please share franchise terms, machine packages, and territory exclusivity details.'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
_Sent via Dooroomi Mediquip Official Franchise Portal_`;
  };

  // 1. WhatsApp Handler
  const handleSendWhatsApp = () => {
    if (!validate()) return;
    const msg = constructFormattedMessage();
    // Dooroomi official direct WhatsApp number
    const phone = "919153697636"; 
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // 2. Gmail / Email Handler
  const handleSendGmail = () => {
    if (!validate()) return;
    const recipient = SITE_CONFIG.inquiryEmail || "dooroomimediquip@gmail.com";
    const subject = `Franchise & Center Partnership Application - ${formData.fullName} (${formData.city})`;
    
    const body = `Dear Dooroomi Mediquip Management Team,

I am writing to formally submit my application for establishing a Dooroomi Authorized Free Therapy & Healthcare Franchise Center.

APPLICANT PROFILE:
- Full Name: ${formData.fullName}
- Mobile / WhatsApp: ${formData.phone}
- Email: ${formData.email || 'N/A'}
- City & State: ${formData.city}${formData.state ? `, ${formData.state}` : ''}
- Current Occupation: ${formData.currentBusiness || 'N/A'}
- Proposed Investment Budget: ${formData.investmentCapacity}
- Preferred Setup Timeline: ${formData.expectedTimeline}

ADDITIONAL INFORMATION:
${formData.message || 'I would like to receive the complete franchise model, equipment list (BEDRO Smart-1, Taeyangsuk Mats, BioWave), profit & CSR structure, and territory verification.'}

Looking forward to your prompt response.

Warm regards,
${formData.fullName}
${formData.phone}`;

    // Direct Gmail Web Compose link with fallback to mailto
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Attempt opening Gmail web, with fallback to standard mailto
    const newWindow = window.open(gmailUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
      data-lenis-prevent
    >
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-hanbit-gold/40 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-hanbit-dark via-hanbit-forest to-emerald-950 text-white flex items-center justify-between border-b border-hanbit-gold/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-hanbit-gold/20 border border-hanbit-gold/40 flex items-center justify-center text-hanbit-gold shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-hanbit-gold/20 border border-hanbit-gold/30 text-[10px] font-mono font-bold text-amber-200 mb-0.5">
                <Sparkles className="w-3 h-3 text-hanbit-gold" />
                <span>FRANCHISE PARTNERSHIP PORTAL</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
                Start a Dooroomi Center in Your City
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-8 bg-[#fdfcfa]">
          
          {/* 1. INTERACTIVE 2-HANDS HANDSHAKE ANIMATION */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#0c1e15] to-[#06120c] p-6 sm:p-8 text-white border border-hanbit-gold/30 shadow-inner overflow-hidden text-center">
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(#dfbe7e_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-hanbit-gold/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold block">
                Two Hands Coming Together — The Trust of Partnership
              </span>

              {/* Handshake Animation Container */}
              <div className="h-28 sm:h-32 flex items-center justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {stage === 'animating' ? (
                    <div className="flex items-center justify-center gap-8 relative w-full max-w-sm">
                      {/* Left Hand Moving Right */}
                      <motion.div
                        initial={{ x: -120, opacity: 0, rotate: -25 }}
                        animate={{ x: -6, opacity: 1, rotate: -8 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="text-5xl sm:text-6xl filter drop-shadow-[0_4px_12px_rgba(223,190,126,0.5)] select-none"
                      >
                        🫲
                      </motion.div>

                      {/* Sparkle burst at center */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.8] }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="absolute text-amber-300"
                      >
                        <Sparkles className="w-8 h-8 animate-spin" />
                      </motion.div>

                      {/* Right Hand Moving Left */}
                      <motion.div
                        initial={{ x: 120, opacity: 0, rotate: 25 }}
                        animate={{ x: 6, opacity: 1, rotate: 8 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="text-5xl sm:text-6xl filter drop-shadow-[0_4px_12px_rgba(223,190,126,0.5)] select-none"
                      >
                        🫱
                      </motion.div>
                    </div>
                  ) : (
                    /* Final Connected Handshake */
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: [1, 1.08, 1], opacity: 1 }}
                      transition={{ duration: 0.6, ease: "backOut" }}
                      className="flex flex-col items-center justify-center gap-2"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-hanbit-gold via-amber-400 to-amber-200 text-hanbit-dark flex items-center justify-center shadow-[0_0_35px_rgba(223,190,126,0.6)]">
                        <Handshake className="w-9 h-9 sm:w-11 sm:h-11 text-hanbit-dark" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-emerald-200 font-serif">
                        Dooroomi Medical & Your Enterprise · Joined in Purpose
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="max-w-xl mx-auto">
                <p className="text-xs sm:text-sm text-emerald-100/90 font-light leading-relaxed">
                  Join South Korea's pioneer in natural medical rehabilitation. Over <strong>15+ active free therapy centers</strong> in India and presence across <strong>51+ countries</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* 2. FRANCHISE PERKS & PILLARS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-hanbit-border/80 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-amber-700" />
              </div>
              <h4 className="text-xs font-bold text-hanbit-forest font-serif uppercase tracking-wider">
                Territory Exclusivity
              </h4>
              <p className="text-[11px] text-hanbit-muted font-light leading-relaxed">
                Guaranteed geographic area protection for your therapy center to serve up to 200+ daily patients.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-hanbit-border/80 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="text-xs font-bold text-hanbit-forest font-serif uppercase tracking-wider">
                Full Machine Setup
              </h4>
              <p className="text-[11px] text-hanbit-muted font-light leading-relaxed">
                Direct factory dispatch of BEDRO Smart-1 beds, Taeyangsuk sintered mats, and BioWave devices.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-hanbit-border/80 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 text-blue-700" />
              </div>
              <h4 className="text-xs font-bold text-hanbit-forest font-serif uppercase tracking-wider">
                Staff Training & CSR
              </h4>
              <p className="text-[11px] text-hanbit-muted font-light leading-relaxed">
                On-site clinical operator training, marketing materials, and proven customer delight protocols.
              </p>
            </div>
          </div>

          {/* 3. FRANCHISE APPLICATION & CONTACT OPTIONS */}
          <div className="space-y-5">
            <div className="border-b border-hanbit-border pb-3">
              <span className="text-[11px] font-mono font-bold text-hanbit-gold uppercase tracking-wider block">
                STEP 2 · FILL FRANCHISE APPLICATION
              </span>
              <h3 className="text-lg font-bold text-hanbit-forest font-serif">
                Enter Your Details & Direct Dispatch Method
              </h3>
              <p className="text-xs text-hanbit-muted font-light mt-0.5">
                Fill the information below, then choose whether to send instantly via <strong>Gmail</strong> or <strong>WhatsApp</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-hanbit-forest block mb-1">
                  Full Name / Contact Person *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: null });
                  }}
                  placeholder="e.g. Rajesh Kumar Mohapatra"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-white text-hanbit-ink focus:outline-none focus:ring-1 transition-all ${
                    errors.fullName ? 'border-red-400 focus:ring-red-400' : 'border-hanbit-border focus:border-hanbit-gold focus:ring-hanbit-gold'
                  }`}
                />
                {errors.fullName && <span className="text-[10px] text-red-600 block mt-1">{errors.fullName}</span>}
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="text-xs font-semibold text-hanbit-forest block mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: null });
                  }}
                  placeholder="e.g. +91 94371 00000"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-white text-hanbit-ink focus:outline-none focus:ring-1 transition-all ${
                    errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-hanbit-border focus:border-hanbit-gold focus:ring-hanbit-gold'
                  }`}
                />
                {errors.phone && <span className="text-[10px] text-red-600 block mt-1">{errors.phone}</span>}
              </div>

              {/* Email Address */}
              <div>
                <label className="text-xs font-semibold text-hanbit-forest block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. rajesh@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-hanbit-border text-xs bg-white text-hanbit-ink focus:outline-none focus:border-hanbit-gold focus:ring-1 focus:ring-hanbit-gold transition-all"
                />
              </div>

              {/* Proposed City */}
              <div>
                <label className="text-xs font-semibold text-hanbit-forest block mb-1">
                  Proposed Center City & State *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => {
                    setFormData({ ...formData, city: e.target.value });
                    if (errors.city) setErrors({ ...errors, city: null });
                  }}
                  placeholder="e.g. Bhubaneswar, Odisha"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-white text-hanbit-ink focus:outline-none focus:ring-1 transition-all ${
                    errors.city ? 'border-red-400 focus:ring-red-400' : 'border-hanbit-border focus:border-hanbit-gold focus:ring-hanbit-gold'
                  }`}
                />
                {errors.city && <span className="text-[10px] text-red-600 block mt-1">{errors.city}</span>}
              </div>

              {/* Investment Capacity */}
              <div>
                <label className="text-xs font-semibold text-hanbit-forest block mb-1">
                  Investment Budget Range
                </label>
                <select
                  value={formData.investmentCapacity}
                  onChange={(e) => setFormData({ ...formData, investmentCapacity: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-hanbit-border text-xs bg-white text-hanbit-ink focus:outline-none focus:border-hanbit-gold focus:ring-1 focus:ring-hanbit-gold transition-all"
                >
                  <option value="10-15 Lakhs (Standard Community Center)">₹10 - 15 Lakhs (Community Center)</option>
                  <option value="15-25 Lakhs (Flagship City Center)">₹15 - 25 Lakhs (Flagship City Center)</option>
                  <option value="25-50 Lakhs (Regional Hub & Master Franchise)">₹25 - 50 Lakhs (Regional Hub)</option>
                  <option value="Above 50 Lakhs (State Expansion Directorate)">₹50+ Lakhs (State Expansion)</option>
                </select>
              </div>

              {/* Expected Timeline */}
              <div>
                <label className="text-xs font-semibold text-hanbit-forest block mb-1">
                  Target Setup Timeline
                </label>
                <select
                  value={formData.expectedTimeline}
                  onChange={(e) => setFormData({ ...formData, expectedTimeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-hanbit-border text-xs bg-white text-hanbit-ink focus:outline-none focus:border-hanbit-gold focus:ring-1 focus:ring-hanbit-gold transition-all"
                >
                  <option value="Immediate (Within 30 Days)">Immediate (Within 30 Days)</option>
                  <option value="1 to 2 Months">1 to 2 Months</option>
                  <option value="3 to 6 Months">3 to 6 Months</option>
                  <option value="Exploring Feasibility">Exploring Feasibility</option>
                </select>
              </div>
            </div>

            {/* Custom Notes / Message */}
            <div>
              <label className="text-xs font-semibold text-hanbit-forest block mb-1">
                Premises Details / Specific Requirements (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention available square footage (e.g. 1000-1500 sq.ft), preferred landmark area, previous healthcare experience, etc."
                className="w-full px-3.5 py-2.5 rounded-xl border border-hanbit-border text-xs bg-white text-hanbit-ink focus:outline-none focus:border-hanbit-gold focus:ring-1 focus:ring-hanbit-gold transition-all"
              />
            </div>
          </div>

          {/* 4. TWO ACTION BUTTONS (NO SUBMIT BUTTON — ONLY GMAIL AND WHATSAPP) */}
          <div className="pt-4 border-t border-hanbit-border space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block text-center">
              Send Your Application Directly via Your Preferred Channel:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* BUTTON 1: SEND VIA GMAIL */}
              <button
                type="button"
                onClick={handleSendGmail}
                className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#EA4335] via-[#d93025] to-[#c5221f] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-xl hover:brightness-105 transition-all flex items-center justify-center gap-3 cursor-pointer group active:scale-98"
              >
                {/* Official Gmail Icon */}
                <div className="w-6 h-6 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-xs">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path fill="#4285F4" d="M22 6.5v11c0 .8-.7 1.5-1.5 1.5H19V9.5l-7 4.5-7-4.5V19H3.5C2.7 19 2 18.3 2 17.5v-11c0-.9.9-1.5 1.7-1L12 10.8l8.3-5.3c.8-.5 1.7.1 1.7 1z"/>
                    <path fill="#EA4335" d="M20.5 4H19v5.5l-7 4.5-7-4.5V4H3.5C2.7 4 2 4.7 2 5.5v1c0 .8.7 1.5 1.5 1.5H5v11h14V8h1.5c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block font-bold text-white text-xs sm:text-sm">
                    Send Application via Gmail
                  </span>
                  <span className="text-[10px] text-white/80 block font-normal">
                    Opens professional email draft
                  </span>
                </div>
              </button>

              {/* BUTTON 2: SEND VIA WHATSAPP */}
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-xl hover:brightness-105 transition-all flex items-center justify-center gap-3 cursor-pointer group active:scale-98"
              >
                {/* Official WhatsApp Icon */}
                <div className="w-6 h-6 rounded-lg bg-white p-0.5 flex items-center justify-center shrink-0 shadow-xs">
                  <svg viewBox="0 0 24 24" className="w-full h-full fill-[#25D366]">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block font-bold text-white text-xs sm:text-sm">
                    Send Application via WhatsApp
                  </span>
                  <span className="text-[10px] text-white/80 block font-normal">
                    Instant chat with franchise team
                  </span>
                </div>
              </button>

            </div>

            <p className="text-[11px] text-neutral-400 text-center font-light pt-2">
              Corporate Office: Dooroomi Mediquip Pvt. Ltd. · Toll Free: {SITE_CONFIG.phone} · Direct Helpline: +91 91536 97636
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

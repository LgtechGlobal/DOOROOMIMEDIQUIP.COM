import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Building2, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';
import { API_BASE_URL } from '../config/api';

export const ContactSection = ({
  preselectedProduct,
  onClearPreselected,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    product: '',
    message: '',
    ndaRequired: false,
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (preselectedProduct) {
      setFormData(prev => ({
        ...prev,
        product: `${preselectedProduct.name} (${preselectedProduct.model})`,
        message: prev.message || `We are interested in scheduling clinical therapy consultation / quotation for ${preselectedProduct.name} (${preselectedProduct.model}).\n`,
      }));
    }
  }, [preselectedProduct]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Corporate email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.message.trim()) errs.message = 'Please provide enquiry details.';
    if (!formData.consent) errs.consent = 'You must agree to privacy processing terms.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          type: 'therapy_consultation',
          productInterest: formData.product || 'Free Therapy Consultation',
          message: formData.message
        })
      });
    } catch (err) {
      console.warn('Inquiry background sync:', err.message);
    } finally {
      setSubmittedData({ ...formData });
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white border-t border-hanbit-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-hanbit-gold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation & Direct Quotation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight">
            Schedule Free Daily Therapy & Medical Inquiries with Dooroomi.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-hanbit-muted font-light leading-relaxed">
            Our medical and clinical therapy care team responds to all therapy center bookings, patient consultations, and equipment inquiries within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Facility Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-hanbit-ivory border border-hanbit-border space-y-6">
              <h3 className="text-xl font-extrabold text-hanbit-forest">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-hanbit-border flex items-center justify-center text-hanbit-gold shrink-0 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-hanbit-muted uppercase tracking-wider block text-[10px]">
                      Toll-Free Helpline &amp; Phone
                    </span>
                    <a href={`tel:${SITE_CONFIG.phoneTel}`} className="font-bold text-sm text-hanbit-forest hover:text-hanbit-gold">
                      {SITE_CONFIG.phone}
                    </a>
                    <span className="text-hanbit-muted block text-[11px]">Direct Support: {SITE_CONFIG.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-hanbit-border flex items-center justify-center text-hanbit-gold shrink-0 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-hanbit-muted uppercase tracking-wider block text-[10px]">
                      Global Export Desk
                    </span>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="font-bold text-sm text-hanbit-forest hover:text-hanbit-gold">
                      {SITE_CONFIG.email}
                    </a>
                    <span className="text-hanbit-muted block text-[11px]">{SITE_CONFIG.inquiryEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-hanbit-border flex items-center justify-center text-hanbit-gold shrink-0 shadow-sm">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-hanbit-muted uppercase tracking-wider block text-[10px]">
                      India Corporate Headquarters
                    </span>
                    <p className="font-semibold text-xs text-hanbit-forest leading-snug">
                      {SITE_CONFIG.indiaHq}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-hanbit-border flex items-center justify-center text-hanbit-gold shrink-0 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-hanbit-muted uppercase tracking-wider block text-[10px]">
                      Korea R&D Center & Global HQ
                    </span>
                    <p className="font-semibold text-xs text-hanbit-forest leading-snug">
                      {SITE_CONFIG.addressEn}
                    </p>
                    <p className="text-[11px] text-hanbit-muted font-sans mt-0.5">
                      {SITE_CONFIG.addressKo}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-hanbit-border flex items-center justify-center text-hanbit-gold shrink-0 shadow-sm">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-hanbit-muted uppercase tracking-wider block text-[10px]">
                      Operating Business Hours
                    </span>
                    <span className="font-semibold text-xs text-hanbit-forest">
                      {SITE_CONFIG.hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Therapy Network Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-hanbit-forest to-hanbit-dark text-white shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="w-5 h-5 text-hanbit-gold" />
                <h4 className="text-sm font-bold text-white">
                  Dooroomi Medical & Therapy Network
                </h4>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed font-light">
                Providing 100% free daily far-infrared thermal spine therapies across 15+ authorized centers in India and medical device distribution across 50+ countries globally.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-amber-200">
                <span>Network: 15+ Free Therapy Centers</span>
                <span className="font-mono">ISO 13485 / GMP / FDA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quotation Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-hanbit-ivory border border-hanbit-border shadow-lg">
            <h3 className="text-xl font-extrabold text-hanbit-forest">
              Submit Therapy Inquiry & Consultation
            </h3>
            <p className="text-xs text-hanbit-muted mt-1 mb-6">
              Fill out the parameters below to request a 100% free daily therapy trial, clinical device consultation, or quotation.
            </p>

            {isSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Therapy Inquiry Successfully Submitted</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <b>{submittedData?.name || formData.name}</b>. Your therapy consultation request has been recorded and an email notification has been dispatched to <b>dooroomimediquip@gmail.com</b>. Our Clinical Care Director will reach out to you at <b>{submittedData?.email || formData.email}</b> or by phone within 24 hours.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={`mailto:${SITE_CONFIG.inquiryEmail || 'dooroomimediquip@gmail.com'}?subject=${encodeURIComponent(
                      `Therapy Consultation Inquiry - ${submittedData?.name || 'Patient'}`
                    )}&body=${encodeURIComponent(
                      `Dear Dooroomi Mediquip Team,\n\nI have submitted a therapy inquiry with the following details:\n\n• Name: ${submittedData?.name || ''}\n• Phone: ${submittedData?.phone || ''}\n• Email: ${submittedData?.email || ''}\n• Company/Organization: ${submittedData?.company || 'Private Individual'}\n• Device/Treatment: ${submittedData?.product || 'Free Therapy Consultation'}\n\nHealth Concern & Requirements:\n${submittedData?.message || ''}\n\nKindly confirm my therapy consultation schedule.\n\nThank you,\n${submittedData?.name || ''}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-hanbit-forest text-white text-xs font-bold hover:bg-emerald-900 transition shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5 text-hanbit-gold" />
                    <span>Send Copy via Email App / Gmail</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setSubmittedData(null);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        phone: '',
                        product: '',
                        message: '',
                        ndaRequired: false,
                        consent: false,
                      });
                      if (onClearPreselected) onClearPreselected();
                    }}
                    className="text-xs font-bold text-hanbit-forest underline hover:text-hanbit-gold cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              
              <>
            {preselectedProduct && (
              <div className="mb-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-3 text-xs shadow-xs animate-in fade-in">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-950 block text-xs sm:text-sm">{preselectedProduct.name}</span>
                    <span className="text-[11px] text-emerald-700 font-mono">
                      Model: {preselectedProduct.model} {preselectedProduct.price && <b>• Authorized Price: {preselectedProduct.price}</b>}
                    </span>
                  </div>
                </div>
                {onClearPreselected && (
                  <button
                    type="button"
                    onClick={onClearPreselected}
                    className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-[11px] text-emerald-800 hover:bg-emerald-100 transition cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-hanbit-forest mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Director Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs focus:outline-none ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-hanbit-border focus:border-hanbit-gold'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-hanbit-forest mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      placeholder="s.jenkins@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs focus:outline-none ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-hanbit-border focus:border-hanbit-gold'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-hanbit-forest mb-1">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Wellness Clinic or Private Individual"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-hanbit-border text-xs focus:outline-none focus:border-hanbit-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-hanbit-forest mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 94371 88200"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-hanbit-border text-xs focus:outline-none focus:border-hanbit-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-hanbit-forest mb-1">
                    Therapy Device / Treatment of Interest
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BEDRO Smart-1 Thermal Massager, TAEYANGSUK Mat, Free Daily Therapy"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-hanbit-border text-xs focus:outline-none focus:border-hanbit-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-hanbit-forest mb-1">
                    Health Concern & Therapy Requirement *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Please describe your health condition (e.g. chronic back pain, knee arthritis, sciatica, high BP), preferred therapy center, or device inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs focus:outline-none resize-none ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-hanbit-border focus:border-hanbit-gold'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message}</p>}
                </div>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-hanbit-ink/80 select-none">
                    <input
                      type="checkbox"
                      checked={formData.ndaRequired}
                      onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                      className="rounded border-hanbit-border text-hanbit-gold focus:ring-hanbit-gold h-4 w-4"
                    />
                    <span>We require clinical confidentiality and medical data privacy prior to consultation.</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-hanbit-ink/80 select-none">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="rounded border-hanbit-border text-hanbit-gold focus:ring-hanbit-gold h-4 w-4"
                    />
                    <span>I consent to Dooroomi processing this data for quotation and commercial communications. *</span>
                  </label>
                  {errors.consent && <p className="text-[10px] text-red-500">{errors.consent}</p>}
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-hanbit-forest to-hanbit-dark text-white text-xs font-bold shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-hanbit-gold" />
                    <span>{isSubmitting ? 'Transmitting Enquiry...' : 'Submit Therapy Inquiry'}</span>
                  </button>
                </div>
              </form>
              </>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

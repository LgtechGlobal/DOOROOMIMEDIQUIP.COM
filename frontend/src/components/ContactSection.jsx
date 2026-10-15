import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Building2, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

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

  useEffect(() => {
    if (preselectedProduct) {
      setFormData(prev => ({
        ...prev,
        product: `${preselectedProduct.name} (${preselectedProduct.model})`,
        message: prev.message || `We are interested in receiving OEM/ODM formulation specifications and pricing for ${preselectedProduct.name} (${preselectedProduct.model}).\n`,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
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
            Initiate Your Formulation Project with Dooroomi.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-hanbit-muted font-light leading-relaxed">
            Our chemical engineering and export regulatory team responds to all verified B2B sample, formulation, and manufacturing inquiries within 24 business hours.
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
                      Toll-Free Phone (Korea)
                    </span>
                    <a href={`tel:${SITE_CONFIG.phoneTel}`} className="font-bold text-sm text-hanbit-forest hover:text-hanbit-gold">
                      {SITE_CONFIG.phone}
                    </a>
                    <span className="text-hanbit-muted block text-[11px]">International: +82-2-850-2026</span>
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
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-hanbit-muted uppercase tracking-wider block text-[10px]">
                      R&D Center & Headquarters
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

            {/* Cleanroom Map Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-hanbit-forest to-hanbit-dark text-white shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="w-5 h-5 text-hanbit-gold" />
                <h4 className="text-sm font-bold text-white">
                  Songdo International Bio-Cluster
                </h4>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed font-light">
                Our main cleanroom production facility is strategically located in the Incheon Free Economic Zone (IFEZ) Songdo Bio-Cluster, providing direct 15-minute access to Incheon International Airport (ICN) for cold-chain international shipments.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-amber-200">
                <span>Facility Code: KR-BIO-0988</span>
                <span className="font-mono">Cleanroom Grade A/B</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quotation Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-hanbit-ivory border border-hanbit-border shadow-lg">
            <h3 className="text-xl font-extrabold text-hanbit-forest">
              Submit Your Project Specifications
            </h3>
            <p className="text-xs text-hanbit-muted mt-1 mb-6">
              Fill out the parameters below to request a tailored formulation proposal, batch sample kit, or quotation.
            </p>

            {isSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Enquiry Successfully Submitted</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <b>{formData.name}</b>. Your project inquiry has been assigned to our Technical Sales Director. A formal dossier and quotation will be dispatched to <b>{formData.email}</b> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSuccess(false);
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
                  className="mt-2 text-xs font-bold text-hanbit-forest underline hover:text-hanbit-gold"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
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
                      Corporate Work Email *
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
                      Company Name / Brand
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Solace Skincare LLC"
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
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-hanbit-border text-xs focus:outline-none focus:border-hanbit-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-hanbit-forest mb-1">
                    Formulation / Series of Interest
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HK-A101 Ginseng Bio-Serum or Custom Formulation"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-hanbit-border text-xs focus:outline-none focus:border-hanbit-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-hanbit-forest mb-1">
                    Project Scope & Specifications *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Please mention your target volume, estimated MOQ (e.g. 1,000 to 5,000 units), target launch date, and specific active ingredients or certifications required..."
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
                    <span>We require a bilateral Non-Disclosure Agreement (NDA) prior to disclosing proprietary formulas.</span>
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
                    <span>{isSubmitting ? 'Transmitting Enquiry...' : 'Submit Request for Quote'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

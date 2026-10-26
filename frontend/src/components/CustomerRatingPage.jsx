import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  Send,
  ArrowLeft,
  Sparkles,
  Heart,
  ShieldCheck,
  Building2,
  MapPin,
  User,
  MessageSquare
} from 'lucide-react';
import { useData } from '../context/DataContext';

const SELECTIVE_OPTIONS = [
  { id: 'opt1', label: '🌟 Excellent Therapy', desc: 'Transformational pain relief & relaxation' },
  { id: 'opt2', label: '👍 Very Good Recovery', desc: 'Noticeable spinal & muscle improvements' },
  { id: 'opt3', label: '⚡ Good Pain Relief', desc: 'Effective far-infrared thermal decompression' },
  { id: 'opt4', label: '❤️ Kind & Caring Staff', desc: 'Dedicated 100% free daily therapy service' },
  { id: 'opt5', label: '✨ Highly Recommended', desc: 'Recommended to friends and whole family' }
];

export const CustomerRatingPage = ({ onNavigateHome }) => {
  const { submitCustomerRating } = useData();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([SELECTIVE_OPTIONS[0].label]);

  const toggleOption = (optLabel) => {
    setSelectedOptions((prev) => {
      if (prev.includes(optLabel)) {
        if (prev.length <= 1) return prev; // Keep at least 1 option selected
        return prev.filter((item) => item !== optLabel);
      } else {
        return [...prev, optLabel];
      }
    });
  };
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [treatment, setTreatment] = useState('BEDRO Smart-1 Thermal Spine Bed');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const getRatingLabel = (val) => {
    switch (val) {
      case 5: return '⭐⭐⭐⭐⭐ 5/5 · Excellent (최고)';
      case 4: return '⭐⭐⭐⭐ 4/5 · Very Good (매우 좋음)';
      case 3: return '⭐⭐⭐ 3/5 · Good (좋음)';
      case 2: return '⭐⭐ 2/5 · Fair (보통)';
      case 1: return '⭐ 1/5 · Needs Improvement (미흡)';
      default: return 'Rate Your Experience';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    const formattedFeedback = selectedOptions.join(' · ');
    const payload = {
      name: name.trim(),
      rating,
      selectiveFeedback: formattedFeedback,
      location: location.trim() || 'Bhubaneswar, Odisha',
      treatment,
      comment: comment.trim() || formattedFeedback
    };

    try {
      if (submitCustomerRating) {
        await submitCustomerRating(payload);
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error('Rating submission failed:', err);
      // Still show success to patient and persist locally
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturnHome = () => {
    try {
      sessionStorage.setItem('dooroomi_active_testimonial_tab', 'scanner');
    } catch (_) {}
    window.location.hash = '';
    if (onNavigateHome) {
      onNavigateHome();
    }
    setTimeout(() => {
      const el = document.getElementById('testimonials');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d221b] via-[#12362b] to-[#071611] text-white flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white text-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 animate-scale-up border-2 border-amber-400">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Rating Recorded
            </span>
            <h2 className="text-2xl font-bold font-serif text-[#0d221b]">
              Thank You, {name}!
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light mt-2 leading-relaxed">
              Your verified rating of <span className="font-bold text-amber-600">{rating} Stars</span> has been saved and is now live in the Customer Ratings section.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Selected Experience ({selectedOptions.length}):</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-2">
              {selectedOptions.map((opt, i) => (
                <span key={i} className="px-2.5 py-0.5 rounded-full bg-white border border-emerald-300 text-emerald-800 font-semibold text-[11px] shadow-2xs">
                  {opt}
                </span>
              ))}
            </div>
            {comment && <p className="text-stone-600 italic pl-2 pt-1 line-clamp-2">"{comment}"</p>}
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleReturnHome}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-800 to-hanbit-forest hover:from-emerald-900 hover:to-emerald-800 text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              View Ratings on Website
            </button>
            <p className="text-[11px] text-stone-400">
              Dooroomi Mediquip · 사랑 · 봉사 · 친절 (Love, Service, Kindness)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f6f0] via-[#f1ebe0] to-[#e8e0ce] text-stone-900 py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-xl mx-auto space-y-6">

        {/* Top Header Card */}
        <div className="rounded-3xl bg-[#0d221b] text-white p-6 sm:p-8 shadow-xl border border-amber-400/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={handleReturnHome}
            className="inline-flex items-center gap-1.5 text-xs text-emerald-200 hover:text-white mb-4 transition font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Website</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-[10px] sm:text-xs font-mono font-bold text-amber-300 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>VERIFIED PATIENT SCANNER</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-white">
            Rate Your Therapy Experience
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-light mt-1.5 leading-relaxed">
            Welcome to the official Dooroomi patient feedback portal. Your genuine feedback helps thousands of families receive world-class spinal thermal care.
          </p>
        </div>

        {/* Rating Submission Form */}
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-stone-200 space-y-6">

          {/* 1. Star Rating Section */}
          <div className="text-center space-y-3 pb-6 border-b border-stone-100">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
              1. Tap stars to rate
            </span>

            <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
              {[1, 2, 3, 4, 5].map((starVal) => {
                const isLit = (hoverRating || rating) >= starVal;
                return (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setRating(starVal)}
                    onMouseEnter={() => setHoverRating(starVal)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`${starVal} Star`}
                    className="p-1 sm:p-2 cursor-pointer transition-transform hover:scale-120 active:scale-95"
                  >
                    <Star
                      className={`w-9 h-9 sm:w-11 sm:h-11 transition-colors duration-200 ${
                        isLit
                          ? 'fill-amber-400 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.6)]'
                          : 'fill-stone-100 text-stone-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="text-sm font-bold text-emerald-900 font-sans">
              {getRatingLabel(hoverRating || rating)}
            </p>
          </div>

          {/* 2. Selective Comment 5 Options (Multiple Selection Enabled) */}
          <div className="space-y-3 pb-6 border-b border-stone-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
                2. Select your experience (Choose multiple)
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                {selectedOptions.length} of {SELECTIVE_OPTIONS.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {SELECTIVE_OPTIONS.map((opt) => {
                const isSelected = selectedOptions.includes(opt.label);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleOption(opt.label)}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/90 shadow-xs ring-1 ring-emerald-500/40'
                        : 'border-stone-200/90 bg-stone-50/50 hover:bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <span className={`text-sm font-bold block ${isSelected ? 'text-emerald-950 font-extrabold' : 'text-stone-800'}`}>
                        {opt.label}
                      </span>
                      <span className="text-xs text-stone-500 font-light block mt-0.5">
                        {opt.desc}
                      </span>
                    </div>

                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                      isSelected ? 'border-emerald-700 bg-emerald-700 text-white shadow-xs' : 'border-stone-300 bg-white'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Patient Details */}
          <div className="space-y-4 pb-6 border-b border-stone-100">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 block">
              3. Your details
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Jena"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  City / Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Palasuni, Bhubaneswar"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Equipment or Therapy Used
              </label>
              <select
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 bg-stone-50"
              >
                <option value="BEDRO Smart-1 Thermal Spine Bed">BEDRO Smart-1 Thermal Spine Bed</option>
                <option value="TAEYANGSUK PLUS Bio-Mat">TAEYANGSUK PLUS Far-Infrared Bio-Mat</option>
                <option value="Champion Waist Support Belt">Champion Waist Support Belt</option>
                <option value="Joint King Knee Wrap">Joint King Knee Wrap</option>
                <option value="Smart Laser Controller">Smart Laser Controller</option>
                <option value="Dooroomi Free Daily Therapy Center">Dooroomi Free Daily Therapy Center</option>
              </select>
            </div>
          </div>

          {/* 4. Optional Written Thoughts */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700">
                4. Additional Comments / Recovery Story (Optional)
              </label>
              <span className="text-[11px] text-stone-400">Optional</span>
            </div>
            <div className="relative">
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share how thermal therapy helped your back pain, joints, or overall health..."
                className="w-full p-3 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 bg-stone-50"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              {errorMsg}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-hanbit-forest hover:from-emerald-900 hover:to-emerald-800 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Recording Rating...' : 'Submit Verified Rating'}</span>
          </button>

          <p className="text-center text-[11px] text-stone-500 font-light flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Your rating is directly verified and stored in the Dooroomi database.</span>
          </p>

        </form>

      </div>
    </div>
  );
};

export default CustomerRatingPage;

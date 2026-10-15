import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Building2, 
  Globe2, 
  ChevronRight, 
  Home, 
  Check, 
  Calendar, 
  FileCheck2,
  Lock,
  ArrowLeft,
  Eye,
  ExternalLink,
  X,
  FileBadge2,
  Layers
} from 'lucide-react';
import { CERTIFICATES } from '../data/siteData';

export const CertificatesPage = ({ onNavigateHome, onNavigateGallery, onContactClick }) => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  const auditLogs = [
    {
      year: "2026",
      quarter: "Q1 Regulatory Surveillance Audit",
      agency: "Ministry of Corporate Affairs (ROC, Govt. of India)",
      facility: "Corporate Headquarters & Distribution Operations",
      result: "Active Private Limited Status · 100% Statutory Compliance",
      badge: "Govt. Validated"
    },
    {
      year: "2025",
      quarter: "Annual CE Medical Conformity Inspection",
      agency: "Quality Brains Management (European Conformity Body)",
      facility: "Medical Thermal Systems & Bio-Equipment Assembly",
      result: "CE-MDR Directive Validated · Electrical & Safety Pass",
      badge: "CE Mark Active"
    },
    {
      year: "2025",
      quarter: "Cleanroom Good Manufacturing Practice (GMP) Audit",
      agency: "International Quality Standards Accreditation",
      facility: "Cleanroom Assembly & Thermal Calibration Facility",
      result: "GMP Quality Systems Verified · Zero Critical Deficiencies",
      badge: "GMP Certified"
    },
    {
      year: "2025",
      quarter: "UL Electrical Safety & Thermal Limiter Verification",
      agency: "Underwriters Laboratories Standards Compliance",
      facility: "Internal Dual-Sensor Thermal Cutoff & Jade Heating Systems",
      result: "UL Electrical Safety & Low-EMF Shielding Standards Met",
      badge: "UL Verified"
    },
    {
      year: "2025",
      quarter: "US FDA Establishment Facility Registration",
      agency: "United States Food & Drug Administration (US FDA)",
      facility: "Therapeutic Health Equipment Export Clearance Facility",
      result: "Active Global Facility Listing & Import Compliance",
      badge: "US FDA Listed"
    }
  ];

  const pillars = [
    {
      num: "01",
      title: "End-to-End Lot Genealogy & Traceability",
      desc: "Every medical thermal bed, jade roller assembly, and heating mat carries an encrypted lot identifier. Complete provenance from mineral sourcing to final delivery can be audited with zero delay."
    },
    {
      num: "02",
      title: "ISO & GMP Cleanroom Assembly Protocols",
      desc: "All thermal therapy components and bio-active formulations undergo rigorous assembly in positive-pressure clean environments, verified through particulate air monitoring."
    },
    {
      num: "03",
      title: "Closed-Loop Safety Interlocks & Calibration",
      desc: "Every thermal system integrates dual-stage automatic thermal cutoff switches and low-EMF shielding, preventing excessive temperature rise and ensuring patient safety."
    }
  ];

  const standards = [
    "Government of India Corporate Incorporation (Companies Act 2013)",
    "CE European Conformity Medical Equipment Directives",
    "Good Manufacturing Practice (GMP) Cleanroom Assembly Standards",
    "Underwriters Laboratories (UL) Electrical & Overheat Safety Standards",
    "US FDA Medical Device Establishment Facility Registration",
    "Low-EMF (Electromagnetic Field) Wave Shielding Protection",
    "ISO 22716 International Quality Management System Compliance"
  ];

  const categories = [
    { id: 'all', label: 'All Certificates' },
    { id: 'International', label: 'International (CE / FDA)' },
    { id: 'Safety & Electrical', label: 'Safety & Quality (UL / GMP)' },
    { id: 'Corporate & Legal', label: 'Corporate Legal (Govt. MCA)' },
  ];

  const filteredCertificates = activeTab === 'all' 
    ? CERTIFICATES 
    : CERTIFICATES.filter(c => c.category === activeTab || (activeTab === 'Safety & Electrical' && c.category === 'Manufacturing'));

  return (
    <div className="bg-[#fbfbfa] min-h-screen py-10 sm:py-16 select-none">
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        
        {/* Navigation Breadcrumb & Back Shortcut */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-hanbit-border">
          <nav className="flex items-center space-x-2 text-xs text-hanbit-muted font-medium">
            <button 
              onClick={() => onNavigateHome('hero')}
              className="hover:text-hanbit-forest flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-hanbit-gold" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <span className="text-hanbit-forest font-semibold">Regulatory & Compliance</span>
            <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
            <span className="text-hanbit-gold font-bold">Certificates & Accreditations</span>
          </nav>

          <button
            onClick={() => onNavigateHome('hero')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-hanbit-border bg-white text-xs font-semibold text-hanbit-forest hover:bg-hanbit-sage-light/40 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Page Header Banner */}
        <div className="max-w-4xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-hanbit-gold/30 text-xs font-semibold text-hanbit-forest shadow-2xs mb-4">
            <ShieldCheck className="w-4 h-4 text-hanbit-gold" />
            <span className="font-mono text-hanbit-gold font-bold">국제 품질 및 정부 인가</span>
            <span className="text-hanbit-border">|</span>
            <span className="tracking-wider uppercase text-[11px]">Official Accreditations & Certifications</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight font-serif">
            Class-Leading Accreditations & Official Regulatory Approvals.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-hanbit-muted font-light leading-relaxed">
            Dooroomi Mediquip Private Limited operates under validated international safety directives, including CE Conformity, US FDA Facility Registration, UL Electrical Certification, and ISO/GMP Cleanroom standards. Click any certificate to preview and inspect the official document.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-4 border-b border-hanbit-border/60">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-hanbit-forest text-white shadow-md'
                    : 'bg-white text-hanbit-forest/80 border border-hanbit-border/80 hover:border-hanbit-gold hover:text-hanbit-forest'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Classy Official Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className="p-7 rounded-3xl bg-white border-2 border-[#e8dfd3] hover:border-hanbit-gold shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle Gold Foil Accent Strip at Top */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-hanbit-gold/40 via-hanbit-gold to-hanbit-gold/40 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-5">
                {/* Header: Seal Icon + Status Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-hanbit-ivory border border-hanbit-border flex items-center justify-center text-hanbit-gold shadow-xs group-hover:scale-105 group-hover:bg-hanbit-forest group-hover:text-hanbit-gold transition-all duration-300">
                    <FileBadge2 className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{cert.status}</span>
                  </span>
                </div>

                {/* Title & Issuer */}
                <div>
                  <span className="text-[10px] font-mono font-bold text-hanbit-gold uppercase tracking-widest block mb-1">
                    {cert.badge}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-hanbit-forest leading-snug group-hover:text-hanbit-forest/90 font-serif">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-hanbit-muted mt-1.5">
                    Issuing Authority: <b className="text-hanbit-ink font-semibold">{cert.issuer}</b>
                  </p>
                </div>

                {/* Scope & Doc Ref */}
                <div className="pt-3 text-xs text-hanbit-ink/80 space-y-2 border-t border-hanbit-border/60">
                  <p className="leading-relaxed text-[12px] text-neutral-600 font-light">
                    <span className="font-semibold text-hanbit-forest">Certified Scope:</span> {cert.scope}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-[10px] text-hanbit-muted bg-hanbit-ivory px-2.5 py-1 rounded-md border border-hanbit-border/60 inline-block font-semibold">
                      Ref: {cert.certNumber}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{cert.validity}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Classy Action Buttons */}
              <div className="pt-5 mt-5 border-t border-hanbit-border/80 flex items-center gap-2.5">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-hanbit-forest hover:bg-hanbit-dark text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all hover:shadow-md cursor-pointer group/btn"
                >
                  <Eye className="w-3.5 h-3.5 text-hanbit-gold group-hover/btn:scale-110 transition-transform" />
                  <span>Preview Certificate</span>
                </button>

                <a
                  href={cert.pdfUrl}
                  download={cert.fileName}
                  className="p-2.5 rounded-xl border border-hanbit-border hover:border-hanbit-gold bg-white hover:bg-hanbit-ivory text-hanbit-forest transition-colors shadow-2xs flex items-center justify-center cursor-pointer"
                  title="Download Certificate PDF"
                >
                  <Download className="w-4 h-4" />
                </a>

                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-hanbit-border hover:border-hanbit-gold bg-white hover:bg-hanbit-ivory text-hanbit-forest transition-colors shadow-2xs flex items-center justify-center cursor-pointer"
                  title="Open in new window"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Quality Pillars */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-white border border-hanbit-border shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold text-hanbit-gold tracking-widest uppercase block mb-1">
              Quality Assurance Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif">
              Three Pillars of Medical Equipment Governance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pil, idx) => (
              <div key={idx} className="space-y-3 p-6 rounded-2xl bg-hanbit-ivory border border-hanbit-border/60">
                <span className="text-xs font-mono font-extrabold text-hanbit-gold tracking-widest block">
                  PILLAR {pil.num}
                </span>
                <h4 className="text-base font-bold text-hanbit-forest font-serif">
                  {pil.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-hanbit-muted leading-relaxed font-light">
                  {pil.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log & Compliance Verification Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-hanbit-border p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-hanbit-border">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-hanbit-forest font-serif">
                  Official Facility Inspection & Regulatory Audit Log
                </h3>
                <p className="text-xs text-hanbit-muted mt-0.5">
                  Audits executed by external accreditation bodies and statutory authorities
                </p>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero Deficiencies</span>
              </div>
            </div>

            <div className="space-y-4">
              {auditLogs.map((log, lIdx) => (
                <div key={lIdx} className="p-4 sm:p-5 rounded-2xl bg-hanbit-ivory border border-hanbit-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-xs text-hanbit-forest bg-white px-2 py-0.5 rounded border border-hanbit-border">
                        {log.year}
                      </span>
                      <span className="text-xs font-semibold text-hanbit-gold">
                        {log.quarter}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-hanbit-forest">
                      {log.agency}
                    </h4>
                    <p className="text-xs text-hanbit-muted">
                      Facility: {log.facility}
                    </p>
                    <p className="text-xs text-emerald-800 font-medium">
                      ✓ {log.result}
                    </p>
                  </div>

                  <span className="self-start sm:self-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    {log.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Checklist Box */}
          <div className="lg:col-span-4 bg-gradient-to-br from-hanbit-forest to-hanbit-dark text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck2 className="w-5 h-5 text-hanbit-gold" />
              <h3 className="text-lg font-bold text-white font-serif">Compliance Assurance</h3>
            </div>
            <p className="text-xs text-emerald-100/70 mb-6 leading-relaxed">
              Every medical bed and therapeutic device manufactured and supplied by Dooroomi meets or exceeds these baseline parameters:
            </p>

            <ul className="space-y-3.5 text-xs text-emerald-100/90 font-light">
              {standards.map((std, sIdx) => (
                <li key={sIdx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-hanbit-gold shrink-0 mt-0.5" />
                  <span>{std}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-emerald-800/80">
              <button
                onClick={onContactClick}
                className="w-full py-3 rounded-full bg-gradient-to-r from-hanbit-gold to-amber-300 text-hanbit-dark text-xs font-bold hover:shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Official Audit Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-hanbit-forest via-emerald-950 to-hanbit-dark text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif">
              Need Certified Documentation for Tender or Clinic Setup?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/70 mt-1 max-w-xl">
              We provide authenticated copies of CE certificates, FDA registration, GMP compliance, and ROC incorporation documents for institutional procurement.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateGallery}
              className="px-5 py-2.5 rounded-full border border-hanbit-gold text-white hover:bg-hanbit-gold hover:text-hanbit-dark text-xs font-semibold transition-all cursor-pointer"
            >
              Explore Medical Equipment
            </button>
            <button
              onClick={onContactClick}
              className="px-6 py-2.5 rounded-full bg-hanbit-gold text-hanbit-dark hover:bg-amber-300 text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              Contact Quality Compliance Team
            </button>
          </div>
        </div>

      </div>

      {/* Classy Interactive Certificate Preview Lightbox Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-hanbit-gold/40 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-hanbit-forest text-white flex items-center justify-between border-b border-emerald-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-hanbit-gold/20 flex items-center justify-center text-hanbit-gold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-hanbit-gold text-hanbit-dark">
                      {selectedCert.badge}
                    </span>
                    <span className="text-xs text-emerald-200 font-mono">
                      {selectedCert.certNumber}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-serif truncate max-w-lg">
                    {selectedCert.name}
                  </h3>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={selectedCert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Open full page"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open in Tab</span>
                </a>
                <a
                  href={selectedCert.pdfUrl}
                  download={selectedCert.fileName}
                  className="px-3 py-1.5 rounded-lg bg-hanbit-gold hover:bg-amber-400 text-hanbit-dark text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded PDF Document Viewer */}
            <div className="flex-1 overflow-hidden p-2 sm:p-4 bg-neutral-100 flex flex-col items-center justify-center min-h-[480px]">
              <iframe
                src={`${selectedCert.pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                title={selectedCert.name}
                className="w-full h-full min-h-[500px] sm:min-h-[600px] rounded-2xl border border-neutral-300 bg-white shadow-inner"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between text-xs text-neutral-600 gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-neutral-800">
                  {selectedCert.issuer}
                </span>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500 truncate max-w-sm">
                  {selectedCert.scope}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  Status: {selectedCert.status}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

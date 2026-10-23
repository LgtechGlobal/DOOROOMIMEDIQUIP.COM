import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, RefreshCw, X, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export const CloudinaryImageUploader = ({
  value = '',
  onChange,
  label = 'Image',
  required = false,
  placeholder = 'https://res.cloudinary.com/lgtechglobal/...',
  presets = []
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const isCloudinary = value && (value.includes('cloudinary.com') || value.includes('res.cloudinary.com'));

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || `Upload failed with status ${res.status}`);
      }

      onChange(data.url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      setUploadError(err.message || 'Failed to upload image to Cloudinary');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-2">
      {/* Label and Cloudinary Tag */}
      <div className="flex items-center justify-between">
        <label className="text-neutral-300 font-semibold text-xs flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-amber-400">*</span>}
        </label>

        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Cloudinary: lgtechglobal
        </span>
      </div>

      {/* Upload Drop Zone / Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`flex-1 border-2 border-dashed rounded-xl p-3 flex items-center justify-center gap-3 transition-all cursor-pointer ${
            isUploading
              ? 'border-amber-500/70 bg-amber-950/20'
              : 'border-emerald-800/80 bg-[#07130f] hover:border-emerald-500 hover:bg-emerald-950/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold py-1">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span>Optimizing & Uploading to Cloudinary...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-300 hover:text-white text-xs">
              <UploadCloud className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold">Upload Image from Device</span>
              <span className="text-[10px] text-neutral-400 hidden sm:inline">(JPG, PNG, WEBP auto-saved to Cloudinary)</span>
            </div>
          )}
        </div>

        {/* Clear Image Button if value exists */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            title="Clear Image"
            className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-red-950 hover:border-red-800 text-neutral-400 hover:text-red-300 text-xs transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Success Notification */}
      {uploadSuccess && (
        <div className="p-2 rounded-lg bg-emerald-950/90 border border-emerald-600 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Image successfully uploaded & stored permanently in <strong>lgtechglobal</strong> Cloudinary account!</span>
        </div>
      )}

      {/* Error Notification */}
      {uploadError && (
        <div className="p-2 rounded-lg bg-red-950/90 border border-red-700 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>Upload error: {uploadError}</span>
        </div>
      )}

      {/* Direct URL Input Field with live Cloudinary verification badge */}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-[#07130f] border rounded-xl px-3 py-2 pr-28 text-white font-mono text-xs focus:outline-none transition-colors ${
            isCloudinary
              ? 'border-emerald-600 focus:border-emerald-400 text-emerald-200'
              : 'border-emerald-800 focus:border-amber-400 text-neutral-200'
          }`}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isCloudinary && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/25 text-emerald-300 border border-emerald-500/50">
              Cloudinary
            </span>
          )}
          {value && (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              title="Open full image in new tab"
              className="text-neutral-400 hover:text-white p-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Image Preview Thumbnail */}
      {value && (
        <div className="p-1.5 rounded-xl bg-[#07130f] border border-emerald-900/60 flex items-center gap-2.5">
          <img
            src={value}
            alt="Preview"
            onError={(e) => {
              e.target.src = '/assets/products/bedro-smart-1-traction-bed.png';
            }}
            className="w-11 h-11 rounded-lg object-cover border border-emerald-700/60 shadow shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
              <ImageIcon className="w-3 h-3 text-emerald-400" />
              <span>Live Image Preview</span>
            </div>
            <p className="text-[10px] text-neutral-400 font-mono truncate">
              {value}
            </p>
            {isCloudinary ? (
              <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-medium">
                <CheckCircle2 className="w-2.5 h-2.5" />
                Hosted on Cloudinary CDN (lgtechglobal)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[9px] text-amber-400 font-medium">
                Local / External Path
              </span>
            )}
          </div>
        </div>
      )}

      {/* Optional Preset Buttons */}
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
          <span className="text-neutral-400 text-[10px]">Cloudinary Presets:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(p.url)}
              className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 hover:border-amber-400 text-amber-200 text-[10px] cursor-pointer transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Film, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  ExternalLink, 
  Play, 
  ZoomIn, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  RefreshCw, 
  Video, 
  Image as ImageIcon,
  Layers,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { CloudinaryImageUploader } from './CloudinaryImageUploader';
import { API_BASE_URL } from '../config/api';

const PRESET_CATEGORIES = [
  'Cleanroom & Facility',
  'Medical Equipment',
  'Free Therapy Center',
  'Clinical Trials',
  'Patient Experience',
  'Manufacturing & GMP',
  'General'
];

export const AdminGalleryManager = ({
  galleryItems = [],
  onAddItem,
  onUpdateItem,
  onDeleteItem
}) => {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'image' | 'video'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  // Form states
  const [formType, setFormType] = useState('image'); // 'image' | 'video'
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Cleanroom & Facility');
  const [formCustomCategory, setFormCustomCategory] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formThumbnailUrl, setFormThumbnailUrl] = useState('');
  const [videoInputMode, setVideoInputMode] = useState('file'); // 'file' | 'link'
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoFileInputRef = useRef(null);

  // Filter items
  const filteredItems = galleryItems.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.category && item.category.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query));
    return matchesType && matchesCat && matchesSearch;
  });

  const imageCount = galleryItems.filter(i => i.type === 'image').length;
  const videoCount = galleryItems.filter(i => i.type === 'video').length;

  const openCreateModal = (type = 'image') => {
    setEditingItem(null);
    setFormType(type);
    setFormTitle('');
    setFormCategory('Cleanroom & Facility');
    setFormCustomCategory('');
    setFormDescription('');
    setFormUrl('');
    setFormThumbnailUrl('');
    setVideoInputMode('file');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormType(item.type);
    setFormTitle(item.title || '');
    if (PRESET_CATEGORIES.includes(item.category)) {
      setFormCategory(item.category);
      setFormCustomCategory('');
    } else {
      setFormCategory('Custom');
      setFormCustomCategory(item.category || '');
    }
    setFormDescription(item.description || '');
    setFormUrl(item.url || '');
    setFormThumbnailUrl(item.thumbnailUrl || '');
    setVideoInputMode(item.url && (item.url.includes('youtube.com') || item.url.includes('youtu.be') || item.url.includes('vimeo.com')) ? 'link' : 'file');
    setIsModalOpen(true);
  };

  // Video file upload directly to backend /api/upload
  const handleVideoFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      alert('Video file size exceeds maximum 100MB limit. Please upload a smaller video or provide a YouTube link.');
      return;
    }

    setIsVideoUploading(true);
    try {
      const formData = new FormData();
      formData.append('video', file);

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Video upload failed');
      }

      setFormUrl(data.url);
      setStatusMessage({ type: 'success', text: 'Video file uploaded successfully to Cloudinary!' });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      console.error('Video upload error:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to upload video file.' });
    } finally {
      setIsVideoUploading(false);
      if (videoFileInputRef.current) {
        videoFileInputRef.current.value = '';
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please enter a title for the media item');
      return;
    }
    if (!formUrl.trim()) {
      alert(formType === 'image' ? 'Please upload or specify an image URL' : 'Please upload a video or provide a video URL');
      return;
    }

    const finalCategory = formCategory === 'Custom' ? (formCustomCategory.trim() || 'General') : formCategory;

    let detectedVideoType = 'file';
    if (formType === 'video') {
      const lower = formUrl.toLowerCase();
      if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
        detectedVideoType = 'youtube';
      } else if (lower.includes('vimeo.com')) {
        detectedVideoType = 'vimeo';
      }
    }

    const payload = {
      type: formType,
      title: formTitle.trim(),
      category: finalCategory,
      description: formDescription.trim(),
      url: formUrl.trim(),
      thumbnailUrl: formThumbnailUrl.trim(),
      videoType: detectedVideoType
    };

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await onUpdateItem(editingItem.id || editingItem._id, payload);
        setStatusMessage({ type: 'success', text: 'Media item updated successfully!' });
      } else {
        await onAddItem(payload);
        setStatusMessage({ type: 'success', text: `${formType === 'image' ? 'Image' : 'Video'} added to public gallery!` });
      }
      setIsModalOpen(false);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      console.error('Submit media error:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save media item' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmItem) return;
    try {
      await onDeleteItem(deleteConfirmItem.id || deleteConfirmItem._id);
      setStatusMessage({ type: 'success', text: 'Media item permanently deleted from gallery' });
      setDeleteConfirmItem(null);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      console.error('Delete media error:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete media item' });
    }
  };

  const isEmbedVideo = (url) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return lower.includes('youtube.com') || lower.includes('youtu.be') || lower.includes('vimeo.com');
  };

  const getEmbedVideoUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('youtube.com/embed/')) {
      return url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    }
    if (url.includes('vimeo.com/')) {
      const parts = url.split('vimeo.com/');
      const videoId = parts[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toast Alert */}
      {statusMessage && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 border shadow-md animate-in fade-in duration-200 ${
          statusMessage.type === 'success'
            ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200'
            : 'bg-red-950/80 border-red-500/80 text-red-200'
        }`}>
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span className="text-xs font-semibold">{statusMessage.text}</span>
        </div>
      )}

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0b1c16] border border-emerald-900/50 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-400" />
              <span>Media Gallery Management (Images & Videos)</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              {galleryItems.length} Total
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Upload images and clinical videos here. When blank, the user side shows a clean placeholder; once uploaded, items appear immediately on the public gallery section.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => openCreateModal('image')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Upload Image</span>
          </button>

          <button
            onClick={() => openCreateModal('video')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <Film className="w-3.5 h-3.5" />
            <span>Add Video</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#07130f] border border-emerald-900/40 p-3 rounded-xl">
        {/* Type Tabs */}
        <div className="flex items-center gap-1.5 bg-[#0b1c16] p-1 rounded-lg border border-emerald-900/60">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-amber-500 text-black shadow-xs'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            All ({galleryItems.length})
          </button>
          <button
            onClick={() => setFilterType('image')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              filterType === 'image'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            <span>Images ({imageCount})</span>
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              filterType === 'video'
                ? 'bg-amber-600 text-black shadow-xs'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <Film className="w-3 h-3" />
            <span>Videos ({videoCount})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by title, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#0b1c16] border border-emerald-900/60 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Main Grid of Uploaded Items */}
      {filteredItems.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-3xl bg-[#0b1c16] border-2 border-dashed border-emerald-900/60 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 opacity-70" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">
            No Media Items Found
          </h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto mb-6">
            {galleryItems.length === 0
              ? 'Your media gallery is currently empty (blank state). Upload photos or clinical video links to display them on the public gallery section.'
              : 'No items match your active filter or search query.'}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => openCreateModal('image')}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              + Upload Image
            </button>
            <button
              onClick={() => openCreateModal('video')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-bold transition cursor-pointer"
            >
              + Add Video
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id || item._id}
              className="bg-[#0b1c16] border border-emerald-900/50 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-emerald-700 transition"
            >
              {/* Media Thumbnail */}
              <div className="aspect-[4/3] w-full bg-black relative overflow-hidden flex items-center justify-center">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full relative flex items-center justify-center bg-stone-900">
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover opacity-60"
                        preload="metadata"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Badge top-left */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono shadow-xs ${
                    item.type === 'image'
                      ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700'
                      : 'bg-amber-950/90 text-amber-300 border border-amber-700'
                  }`}>
                    {item.type}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/70 text-neutral-300 backdrop-blur-xs">
                    {item.category || 'General'}
                  </span>
                </div>

                {/* Quick zoom button top-right */}
                <button
                  onClick={() => setPreviewItem(item)}
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center cursor-pointer transition"
                  title="Preview Full Media"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Item Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-amber-400 transition">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="mt-4 pt-3 border-t border-emerald-950 flex items-center justify-between">
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Preview</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-neutral-300 hover:text-white border border-emerald-800 transition cursor-pointer"
                      title="Edit Item"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmItem(item)}
                      className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 hover:text-white border border-red-800/60 transition cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* CREATE / EDIT MODAL */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          />

          <div className="relative max-w-xl w-full bg-[#0b1c16] border border-emerald-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-neutral-100 z-10 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  {formType === 'image' ? <ImageIcon className="w-4 h-4" /> : <Film className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingItem ? 'Edit Media Item' : `Add New ${formType === 'image' ? 'Image' : 'Video'}`}
                  </h3>
                  <span className="text-[11px] text-neutral-400">
                    Saves to MongoDB and live user gallery
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-emerald-950 hover:bg-emerald-900 text-neutral-300 flex items-center justify-center cursor-pointer border border-emerald-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
              {/* Media Type Toggle (only when creating) */}
              {!editingItem && (
                <div className="flex items-center gap-2 p-1 bg-[#07130f] rounded-xl border border-emerald-900/60">
                  <button
                    type="button"
                    onClick={() => { setFormType('image'); setFormUrl(''); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                      formType === 'image'
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Photo / Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFormType('video'); setFormUrl(''); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                      formType === 'video'
                        ? 'bg-amber-500 text-black shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Clinical Video</span>
                  </button>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Title <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={formType === 'image' ? "e.g. Songdo Automated Cleanroom Facility" : "e.g. BEDRO Smart-1 Spinal Traction Demo"}
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130f] border border-emerald-900/70 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130f] border border-emerald-900/70 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {PRESET_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="Custom">+ Custom Category...</option>
                  </select>
                </div>

                {formCategory === 'Custom' && (
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Custom Category Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter category name"
                      value={formCustomCategory}
                      onChange={(e) => setFormCustomCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130f] border border-emerald-900/70 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Caption / Description <span className="text-neutral-500 text-[11px] font-normal">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Provide clinical or facility context..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130f] border border-emerald-900/70 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Image Source Upload */}
              {formType === 'image' && (
                <div className="space-y-3 pt-2 border-t border-emerald-950">
                  <CloudinaryImageUploader
                    value={formUrl}
                    onChange={(url) => setFormUrl(url)}
                    label="Image File"
                    required
                  />

                  {/* Manual URL Input fallback */}
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">
                      Or paste an external Image URL directly:
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formUrl}
                      onChange={(e) => setFormUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#07130f] border border-emerald-900/70 text-xs text-neutral-300 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* Video Source Upload */}
              {formType === 'video' && (
                <div className="space-y-3 pt-2 border-t border-emerald-950">
                  {/* Mode Selector for Video: Upload File vs YouTube/Link */}
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setVideoInputMode('file')}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        videoInputMode === 'file'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-[#07130f] text-neutral-400 border border-emerald-900/50'
                      }`}
                    >
                      Upload Video File (MP4, WebM)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoInputMode('link')}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        videoInputMode === 'link'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-[#07130f] text-neutral-400 border border-emerald-900/50'
                      }`}
                    >
                      YouTube / Vimeo / Video URL
                    </button>
                  </div>

                  {videoInputMode === 'file' ? (
                    <div className="space-y-2">
                      <div
                        onClick={() => !isVideoUploading && videoFileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition ${
                          isVideoUploading
                            ? 'border-amber-500/60 bg-amber-950/20'
                            : 'border-emerald-800/80 bg-[#07130f] hover:border-amber-500/80'
                        }`}
                      >
                        <input
                          ref={videoFileInputRef}
                          type="file"
                          accept="video/mp4,video/webm,video/ogg"
                          onChange={handleVideoFileUpload}
                          className="hidden"
                        />

                        {isVideoUploading ? (
                          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold py-2">
                            <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                            <span>Uploading video file to Cloudinary (up to 100MB)...</span>
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="w-6 h-6 text-amber-400" />
                            <span className="text-xs font-bold text-neutral-200">
                              {formUrl ? 'Replace Video File' : 'Choose Video File from Device'}
                            </span>
                            <span className="text-[10px] text-neutral-400">
                              MP4, WebM (Max 100MB)
                            </span>
                          </>
                        )}
                      </div>

                      {formUrl && (
                        <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-[11px] text-emerald-300 flex items-center justify-between">
                          <span className="truncate max-w-[280px]">Active URL: {formUrl}</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Video URL / YouTube Link <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                        value={formUrl}
                        onChange={(e) => setFormUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130f] border border-emerald-900/70 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}

                  {/* Optional Video Thumbnail */}
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">
                      Custom Video Poster / Thumbnail URL <span className="text-neutral-500">(optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://... image poster for video"
                      value={formThumbnailUrl}
                      onChange={(e) => setFormThumbnailUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#07130f] border border-emerald-900/70 text-xs text-neutral-300 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-emerald-900/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isVideoUploading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black text-xs font-bold shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingItem ? 'Save Changes' : 'Publish to Gallery'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setDeleteConfirmItem(null)}
          />

          <div className="relative max-w-md w-full bg-[#0b1c16] border border-red-900/70 rounded-3xl p-6 shadow-2xl z-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                Delete Media Item?
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Are you sure you want to remove <span className="text-white font-semibold">"{deleteConfirmItem.title}"</span> from the public gallery? This action is permanent.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition cursor-pointer shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PREVIEW MODAL */}
      {/* ========================================================================= */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setPreviewItem(null)}
          />

          <div className="relative max-w-4xl w-full bg-[#0b1c16] border border-emerald-800 rounded-3xl overflow-hidden shadow-2xl z-10">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
              {previewItem.type === 'image' ? (
                <img
                  src={previewItem.url}
                  alt={previewItem.title}
                  className="max-h-[60vh] max-w-full object-contain rounded-lg"
                />
              ) : isEmbedVideo(previewItem.url) ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={getEmbedVideoUrl(previewItem.url)}
                    title={previewItem.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video
                  src={previewItem.url}
                  controls
                  autoPlay
                  className="max-h-[60vh] max-w-full object-contain"
                />
              )}
            </div>

            <div className="p-5 border-t border-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                  {previewItem.category || 'General'} · {previewItem.type.toUpperCase()}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {previewItem.title}
                </h3>
                {previewItem.description && (
                  <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                    {previewItem.description}
                  </p>
                )}
              </div>

              <a
                href={previewItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 hover:text-white border border-emerald-800 text-xs font-semibold transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open URL</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

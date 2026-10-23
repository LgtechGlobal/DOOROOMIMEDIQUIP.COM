import React, { useState, useMemo } from 'react';
import { 
  Home, 
  ChevronRight, 
  Image as ImageIcon, 
  Video, 
  Play, 
  X, 
  ZoomIn, 
  Filter, 
  Sparkles, 
  Film, 
  Camera, 
  Layers, 
  ArrowRight,
  ExternalLink,
  Volume2
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const GalleryPage = ({ onNavigateHome, onNavigateProducts, onContactClick }) => {
  const { galleryItems = [] } = useData();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'images', 'videos'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Separate images and videos
  const imageItems = useMemo(() => {
    return galleryItems.filter(item => item.type === 'image');
  }, [galleryItems]);

  const videoItems = useMemo(() => {
    return galleryItems.filter(item => item.type === 'video');
  }, [galleryItems]);

  // Extract distinct categories
  const allCategories = useMemo(() => {
    const cats = new Set(['All']);
    galleryItems.forEach(item => {
      if (item.category && item.category.trim()) {
        cats.add(item.category.trim());
      }
    });
    return Array.from(cats);
  }, [galleryItems]);

  // Filtered by selected category
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') return imageItems;
    return imageItems.filter(item => item.category === selectedCategory);
  }, [imageItems, selectedCategory]);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'All') return videoItems;
    return videoItems.filter(item => item.category === selectedCategory);
  }, [videoItems, selectedCategory]);

  // Helper to extract YouTube embed URL if applicable
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

  const isEmbedVideo = (url) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return lower.includes('youtube.com') || lower.includes('youtu.be') || lower.includes('vimeo.com');
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] pt-6 pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 mb-8">
        <nav className="flex items-center space-x-2 text-xs text-hanbit-muted font-medium py-3 border-b border-hanbit-border/60">
          <button 
            onClick={() => onNavigateHome ? onNavigateHome('hero') : (window.location.hash = '')}
            className="hover:text-hanbit-forest flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-hanbit-gold" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-hanbit-border" />
          <span className="text-hanbit-forest font-bold">Media Gallery</span>
          <span className="text-hanbit-border">|</span>
          <span className="text-[11px] text-hanbit-gold font-mono">
            {galleryItems.length} Published Media ({imageItems.length} Images, {videoItems.length} Videos)
          </span>
        </nav>
      </div>

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        {/* Gallery Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-hanbit-gold/30 text-xs font-semibold text-hanbit-forest shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-hanbit-gold animate-pulse" />
            <span className="font-mono text-hanbit-gold font-bold">두루미 미디어 갤러리</span>
            <span className="text-hanbit-border">|</span>
            <span className="tracking-wider uppercase text-[11px]">Official Visual Showcase</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest tracking-tight leading-tight font-serif">
            Dooroomi Mediquip Media Gallery
          </h1>

          <p className="mt-4 text-sm sm:text-base text-hanbit-muted font-light leading-relaxed max-w-2xl mx-auto">
            Explore authentic high-definition photo archives and clinical video demonstrations of our Korean thermal therapy systems, GMP manufacturing facilities, and community health centers.
          </p>
        </div>

        {/* View Switcher Bar (All / Images / Videos) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 sm:p-4 rounded-3xl bg-white border border-hanbit-border shadow-sm mb-12">
          {/* Main Media Tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-hanbit-forest text-white shadow-sm ring-1 ring-hanbit-gold/50'
                  : 'bg-hanbit-ivory text-hanbit-muted hover:bg-hanbit-sage-light hover:text-hanbit-forest border border-hanbit-border/70'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-hanbit-gold" />
              <span>All Media ({galleryItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('images')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'images'
                  ? 'bg-hanbit-forest text-white shadow-sm ring-1 ring-hanbit-gold/50'
                  : 'bg-hanbit-ivory text-hanbit-muted hover:bg-hanbit-sage-light hover:text-hanbit-forest border border-hanbit-border/70'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Image Gallery ({imageItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'videos'
                  ? 'bg-hanbit-forest text-white shadow-sm ring-1 ring-hanbit-gold/50'
                  : 'bg-hanbit-ivory text-hanbit-muted hover:bg-hanbit-sage-light hover:text-hanbit-forest border border-hanbit-border/70'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Video Gallery ({videoItems.length})</span>
            </button>
          </div>

          {/* Category Filter Pills (if multiple categories exist) */}
          {allCategories.length > 1 && (
            <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto justify-start sm:justify-end">
              <span className="text-[11px] font-bold text-hanbit-muted uppercase tracking-wider mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-hanbit-gold" />
                Category:
              </span>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-hanbit-gold text-white font-bold shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* IMAGE GALLERY SECTION */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'images') && (
          <div className="mb-20">
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-hanbit-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif">
                    Photo & Facility Gallery
                  </h2>
                  <p className="text-xs sm:text-sm text-hanbit-muted">
                    High-resolution imagery of research cleanrooms, therapy centers, and precision devices
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-white border border-hanbit-border text-hanbit-forest shadow-2xs font-mono">
                {filteredImages.length} Image{filteredImages.length === 1 ? '' : 's'}
              </span>
            </div>

            {/* If NO images uploaded yet: Show clean elegant blank state */}
            {filteredImages.length === 0 ? (
              <div className="p-12 sm:p-16 rounded-3xl bg-white border-2 border-dashed border-stone-200 text-center max-w-2xl mx-auto my-6 shadow-sm">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-inner">
                  <ImageIcon className="w-8 h-8 stroke-1 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-hanbit-forest font-serif mb-2">
                  No Images Uploaded Yet
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-md mx-auto mb-6">
                  Official clinical photographs, cleanroom facility archives, and certified production images will appear here immediately once uploaded via the Administrator Portal.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50/80 px-4 py-2 rounded-xl border border-emerald-200/60">
                  <Sparkles className="w-4 h-4 text-hanbit-gold" />
                  <span>Images uploaded from Admin Portal will instantly sync here live</span>
                </div>
              </div>
            ) : (
              /* Image Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredImages.map((imgItem) => (
                  <div
                    key={imgItem.id || imgItem._id}
                    onClick={() => setLightboxImage(imgItem)}
                    className="group relative rounded-2xl overflow-hidden bg-white border border-hanbit-border shadow-xs hover:shadow-xl transition-all duration-300 cursor-zoom-in flex flex-col"
                  >
                    <div className="aspect-[4/3] w-full bg-stone-100 overflow-hidden relative">
                      <img
                        src={imgItem.url}
                        alt={imgItem.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="w-full flex items-center justify-between text-white">
                          <span className="text-xs font-semibold flex items-center gap-1">
                            <ZoomIn className="w-3.5 h-3.5 text-amber-300" /> Click to enlarge
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs font-mono">
                            {imgItem.category || 'General'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white flex-1 flex flex-col justify-between border-t border-hanbit-border/60">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-bold text-hanbit-gold uppercase tracking-wider">
                            {imgItem.category || 'General'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-hanbit-forest line-clamp-1 group-hover:text-hanbit-gold transition-colors">
                          {imgItem.title}
                        </h4>
                        {imgItem.description && (
                          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                            {imgItem.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIDEO GALLERY SECTION */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <div className="mb-20">
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-hanbit-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                  <Film className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-hanbit-forest font-serif">
                    Clinical & Demonstration Video Gallery
                  </h2>
                  <p className="text-xs sm:text-sm text-hanbit-muted">
                    Watch video tours, device operations, and authentic patient recovery demonstrations
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-white border border-hanbit-border text-hanbit-forest shadow-2xs font-mono">
                {filteredVideos.length} Video{filteredVideos.length === 1 ? '' : 's'}
              </span>
            </div>

            {/* If NO videos uploaded yet: Show clean elegant blank state */}
            {filteredVideos.length === 0 ? (
              <div className="p-12 sm:p-16 rounded-3xl bg-white border-2 border-dashed border-stone-200 text-center max-w-2xl mx-auto my-6 shadow-sm">
                <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-100 shadow-inner">
                  <Video className="w-8 h-8 stroke-1 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-hanbit-forest font-serif mb-2">
                  No Videos Uploaded Yet
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-md mx-auto mb-6">
                  Device walkthroughs, clinic testimonials, and operational training videos will appear here immediately once uploaded or linked by the administrator.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900 bg-amber-50/80 px-4 py-2 rounded-xl border border-amber-200/60">
                  <Sparkles className="w-4 h-4 text-hanbit-gold" />
                  <span>Supports uploaded MP4/WebM files, YouTube demonstrations, and Vimeo streams</span>
                </div>
              </div>
            ) : (
              /* Video Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map((vidItem) => {
                  const isEmbed = isEmbedVideo(vidItem.url);

                  return (
                    <div
                      key={vidItem.id || vidItem._id}
                      className="group rounded-3xl overflow-hidden bg-white border border-hanbit-border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                      {/* Video Player or Thumbnail */}
                      <div className="aspect-video w-full bg-stone-900 relative overflow-hidden flex items-center justify-center">
                        {vidItem.thumbnailUrl ? (
                          <img
                            src={vidItem.thumbnailUrl}
                            alt={vidItem.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : isEmbed ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-stone-400 p-4 text-center">
                            <Film className="w-12 h-12 text-hanbit-gold mb-2 opacity-80" />
                            <span className="text-xs text-stone-300 font-mono">Stream Available</span>
                          </div>
                        ) : (
                          <video
                            src={vidItem.url}
                            className="w-full h-full object-cover"
                            preload="metadata"
                          />
                        )}

                        {/* Big Play Button Overlay */}
                        <button
                          onClick={() => setActiveVideoModal(vidItem)}
                          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/25 transition-colors cursor-pointer group-hover:scale-105"
                          title="Click to play video"
                        >
                          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-900 flex items-center justify-center shadow-2xl ring-4 ring-white/30 group-hover:ring-amber-400/80 transition-all">
                            <Play className="w-6 h-6 fill-current ml-1" />
                          </div>
                        </button>

                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                            {vidItem.category || 'Clinical Video'}
                          </span>
                        </div>
                      </div>

                      {/* Video Info Caption */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-base font-bold text-hanbit-forest font-serif line-clamp-1 group-hover:text-hanbit-gold transition-colors">
                            {vidItem.title}
                          </h4>
                          {vidItem.description && (
                            <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                              {vidItem.description}
                            </p>
                          )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-[11px] text-stone-400 font-mono">
                            {vidItem.videoType === 'youtube' ? 'YouTube HD' : vidItem.videoType === 'vimeo' ? 'Vimeo' : 'Direct MP4 Stream'}
                          </span>
                          <button
                            onClick={() => setActiveVideoModal(vidItem)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-hanbit-forest hover:text-hanbit-gold transition-colors cursor-pointer"
                          >
                            <span>Watch Now</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Bottom Call to Action */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-hanbit-forest via-emerald-950 to-hanbit-forest text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-hanbit-gold/30">
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest font-mono">
              Dooroomi Medical Equipment Global
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
              Interested in Experiencing Our Therapy in Person?
            </h3>
            <p className="text-emerald-100/80 text-xs sm:text-sm mt-2 max-w-xl">
              Visit our 100% Free Daily Therapy Centers across India or contact our medical specialists for clinic equipment quotations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onNavigateProducts && (
              <button
                onClick={onNavigateProducts}
                className="px-6 py-3 rounded-xl bg-white text-hanbit-forest font-bold text-xs hover:bg-stone-100 transition-all cursor-pointer shadow-md"
              >
                Browse Products
              </button>
            )}
            <button
              onClick={() => onContactClick ? onContactClick() : (window.location.hash = '#contact')}
              className="px-6 py-3 rounded-xl bg-hanbit-gold hover:bg-amber-500 text-hanbit-dark font-bold text-xs transition-all cursor-pointer shadow-md"
            >
              Contact Specialists
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* IMAGE LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-hanbit-dark/85 backdrop-blur-md transition-opacity"
            onClick={() => setLightboxImage(null)}
          />

          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-hanbit-border z-10">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-hanbit-forest flex items-center justify-center shadow-lg border border-hanbit-border cursor-pointer transition-all"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 sm:p-8 bg-stone-950 flex items-center justify-center min-h-[300px] max-h-[70vh] overflow-hidden">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[60vh] max-w-full object-contain filter drop-shadow-2xl rounded-lg"
              />
            </div>

            <div className="p-6 bg-white border-t border-hanbit-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-hanbit-gold uppercase tracking-wider block">
                  {lightboxImage.category || 'Gallery Archive'}
                </span>
                <h3 className="text-lg font-extrabold text-hanbit-forest mt-0.5 font-serif">
                  {lightboxImage.title}
                </h3>
                {lightboxImage.description && (
                  <p className="text-xs text-stone-600 mt-1 max-w-xl">
                    {lightboxImage.description}
                  </p>
                )}
              </div>

              <a
                href={lightboxImage.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Full Size</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIDEO PLAYER MODAL */}
      {/* ========================================================================= */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-hanbit-dark/90 backdrop-blur-md transition-opacity"
            onClick={() => setActiveVideoModal(null)}
          />

          <div className="relative max-w-4xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-stone-800 z-10">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-900/90 hover:bg-stone-800 text-white flex items-center justify-center shadow-lg border border-stone-700 cursor-pointer transition-all"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full bg-black flex items-center justify-center">
              {isEmbedVideo(activeVideoModal.url) ? (
                <iframe
                  src={getEmbedVideoUrl(activeVideoModal.url)}
                  title={activeVideoModal.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideoModal.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Your browser does not support HTML5 video streaming.
                </video>
              )}
            </div>

            <div className="p-6 bg-[#0c1f18] border-t border-emerald-950/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block font-mono">
                  {activeVideoModal.category || 'Clinical Video Demonstration'}
                </span>
                <h3 className="text-lg font-bold text-white mt-1 font-serif">
                  {activeVideoModal.title}
                </h3>
                {activeVideoModal.description && (
                  <p className="text-xs text-emerald-100/70 mt-1 max-w-xl">
                    {activeVideoModal.description}
                  </p>
                )}
              </div>

              <span className="text-xs text-emerald-400/80 font-mono px-3 py-1 rounded bg-emerald-950 border border-emerald-800">
                Dooroomi Media Player
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Cloudinary & Web Dynamic Image Optimization Utility
 * Automatically delivers lightweight WebP / AVIF formats with optimal compression
 */

export const getOptimizedImageUrl = (url, { width = 800, quality = 'auto' } = {}) => {
  if (!url || typeof url !== 'string') {
    return '/assets/products/bedro-smart-1-traction-bed.png';
  }

  // If already a Cloudinary URL, inject dynamic auto-format and auto-quality transformation
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    // Avoid double transformation if already present
    if (url.includes('/f_auto,') || url.includes('/q_auto,') || url.includes('/f_auto/')) {
      return url;
    }

    const transformParams = `f_auto,q_${quality},w_${width},c_limit`;
    return url.replace('/upload/', `/upload/${transformParams}/`);
  }

  return url;
};

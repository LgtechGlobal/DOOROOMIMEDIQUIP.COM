/**
 * Utility to get custom product-specific theme colors, gradients, and auras.
 * Each product receives its own distinct background color matching its physical aesthetic:
 * - Bedro Smart-1: Luxury Rose / Crimson Medical warmth
 * - Taeyangsuk Plus: Deep Emerald Nephrite Jade
 * - Taeyangsuk Mini: Refreshing Mint / Sage Jade
 * - Smart Laser: Modern Electric Cyan / Sky Blue Digital
 * - Champion Belt: Warm Amber / Bronze Orthopedic
 * - Knee Joint Wrap: Therapeutic Violet / Indigo
 * - Jade Bracelet: Lustrous Lime / Jadeite Gold
 * - Jade Necklace: Calming Teal / Jade Emerald
 */
export const getProductTheme = (product = {}) => {
  const key = (
    (product.id || '') + ' ' + 
    (product.model || '') + ' ' + 
    (product.slug || '') + ' ' + 
    (product.name || '')
  ).toLowerCase();

  // 1. BEDRO Smart-1 Thermal Spine Traction Bed (Red / Burgundy frame)
  if (key.includes('bst') || key.includes('bedro') || key.includes('traction')) {
    return {
      stageBg: 'bg-gradient-to-b from-rose-100/80 via-red-50/40 to-stone-50/50',
      stageGlow: 'radial-gradient(circle at 50% 55%, rgba(225, 29, 72, 0.20) 0%, rgba(244, 63, 94, 0.06) 50%, transparent 75%)',
      stageBorder: 'border-rose-200/70',
      hoverBorder: 'hover:border-rose-400',
      modelBadge: 'text-rose-900 border-rose-300 bg-rose-50/95',
      accentColor: '#e11d48',
      tagBg: 'bg-rose-50/90 border-rose-200 text-rose-900'
    };
  }

  // 2. TAEYANGSUK PLUS Bio-Mat (Dense hexagonal green jade tiles)
  if (key.includes('tskp') || key.includes('taeyangsuk-plus') || (key.includes('taeyangsuk') && key.includes('plus'))) {
    return {
      stageBg: 'bg-gradient-to-b from-emerald-100/80 via-teal-50/40 to-stone-50/50',
      stageGlow: 'radial-gradient(circle at 50% 55%, rgba(16, 185, 129, 0.24) 0%, rgba(5, 150, 105, 0.08) 50%, transparent 75%)',
      stageBorder: 'border-emerald-200/70',
      hoverBorder: 'hover:border-emerald-400',
      modelBadge: 'text-emerald-900 border-emerald-300 bg-emerald-50/95',
      accentColor: '#059669',
      tagBg: 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
    };
  }

  // 3. Taeyangsuk Mini Biomat (Compact green jade mat with tan badge)
  if (key.includes('tskm') || key.includes('mini')) {
    return {
      stageBg: 'bg-gradient-to-b from-teal-100/80 via-emerald-50/40 to-cyan-50/30',
      stageGlow: 'radial-gradient(circle at 50% 55%, rgba(20, 184, 166, 0.24) 0%, rgba(13, 148, 136, 0.08) 50%, transparent 75%)',
      stageBorder: 'border-teal-200/70',
      hoverBorder: 'hover:border-teal-400',
      modelBadge: 'text-teal-900 border-teal-300 bg-teal-50/95',
      accentColor: '#0d9488',
      tagBg: 'bg-teal-50/90 border-teal-200 text-teal-900'
    };
  }

  // 4. Smart Laser / Digital Controller (500Hz high-tech device)
  if (key.includes('src500') || key.includes('laser') || key.includes('controller') || key.includes('smart-rc')) {
    return {
      stageBg: 'bg-gradient-to-b from-sky-100/80 via-blue-50/40 to-indigo-50/30',
      stageGlow: 'radial-gradient(circle at 50% 55%, rgba(14, 165, 233, 0.24) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 75%)',
      stageBorder: 'border-sky-200/70',
      hoverBorder: 'hover:border-sky-400',
      modelBadge: 'text-sky-900 border-sky-300 bg-sky-50/95',
      accentColor: '#0284c7',
      tagBg: 'bg-sky-50/90 border-sky-200 text-sky-900'
    };
  }

  // 5. Champion Waist Support Belt (Amber/Bronze lumbar tourmaline belt)
  if (key.includes('ch1') || key.includes('champion') || key.includes('belt') || key.includes('waist')) {
    return {
      stageBg: 'bg-gradient-to-b from-amber-100/80 via-orange-50/40 to-stone-50/50',
      stageGlow: 'radial-gradient(circle at 50% 55%, rgba(245, 158, 11, 0.24) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 75%)',
      stageBorder: 'border-amber-200/70',
      hoverBorder: 'hover:border-amber-400',
      modelBadge: 'text-amber-900 border-amber-300 bg-amber-50/95',
      accentColor: '#d97706',
      tagBg: 'bg-amber-50/90 border-amber-200 text-amber-900'
    };
  }

  // 6. Joint King Knee Wrap (Therapeutic joint brace)
  if (key.includes('kw1') || key.includes('knee') || key.includes('wrap') || key.includes('joint')) {
    return {
      stageBg: 'bg-gradient-to-b from-violet-100/80 via-purple-50/40 to-slate-50/50',
      stageGlow: 'radial-gradient(circle at 50% 55%, rgba(139, 92, 246, 0.22) 0%, rgba(109, 40, 217, 0.08) 50%, transparent 75%)',
      stageBorder: 'border-violet-200/70',
      hoverBorder: 'hover:border-violet-400',
      modelBadge: 'text-violet-900 border-violet-300 bg-violet-50/95',
      accentColor: '#7c3aed',
      tagBg: 'bg-violet-50/90 border-violet-200 text-violet-900'
    };
  }

  // 7. Taeyangsuk Health Bracelet (Polished jade links)
  if (key.includes('jb1') || key.includes('bracelet')) {
    return {
      stageBg: 'bg-gradient-to-b from-lime-100/80 via-emerald-50/40 to-amber-50/30',
      stageGlow: 'radial-gradient(circle at 50% 55%, rgba(132, 204, 22, 0.24) 0%, rgba(16, 185, 129, 0.08) 50%, transparent 75%)',
      stageBorder: 'border-lime-200/70',
      hoverBorder: 'hover:border-lime-400',
      modelBadge: 'text-emerald-900 border-lime-300 bg-lime-50/95',
      accentColor: '#65a30d',
      tagBg: 'bg-lime-50/90 border-lime-200 text-emerald-900'
    };
  }

  // 8. Taeyangsuk Health Necklace (Polished jade spheres)
  if (key.includes('jn1') || key.includes('necklace')) {
    return {
      stageBg: 'bg-gradient-to-b from-emerald-100/70 via-teal-50/40 to-stone-50/50',
      stageGlow: 'radial-gradient(circle at 50% 55%, rgba(5, 150, 105, 0.24) 0%, rgba(13, 148, 136, 0.08) 50%, transparent 75%)',
      stageBorder: 'border-emerald-200/70',
      hoverBorder: 'hover:border-emerald-400',
      modelBadge: 'text-teal-900 border-emerald-300 bg-emerald-50/95',
      accentColor: '#059669',
      tagBg: 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
    };
  }

  // Category-based fallback
  if (product.cat === 'flagship') {
    return {
      stageBg: 'bg-gradient-to-b from-rose-100/80 via-red-50/40 to-stone-50/50',
      stageGlow: 'radial-gradient(circle at 50% 55%, rgba(225, 29, 72, 0.20) 0%, rgba(244, 63, 94, 0.06) 50%, transparent 75%)',
      stageBorder: 'border-rose-200/70',
      hoverBorder: 'hover:border-rose-400',
      modelBadge: 'text-rose-900 border-rose-300 bg-rose-50/95',
      accentColor: '#e11d48',
      tagBg: 'bg-rose-50/90 border-rose-200 text-rose-900'
    };
  }

  if (product.cat === 'biominerals') {
    return {
      stageBg: 'bg-gradient-to-b from-emerald-100/80 via-teal-50/40 to-stone-50/50',
      stageGlow: 'radial-gradient(circle at 50% 55%, rgba(16, 185, 129, 0.24) 0%, rgba(5, 150, 105, 0.08) 50%, transparent 75%)',
      stageBorder: 'border-emerald-200/70',
      hoverBorder: 'hover:border-emerald-400',
      modelBadge: 'text-emerald-900 border-emerald-300 bg-emerald-50/95',
      accentColor: '#059669',
      tagBg: 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
    };
  }

  // Default elegant gold / ivory medical theme
  return {
    stageBg: 'bg-gradient-to-b from-amber-100/70 via-stone-50/50 to-white',
    stageGlow: 'radial-gradient(circle at 50% 55%, rgba(197, 160, 89, 0.20) 0%, rgba(255, 255, 255, 0) 70%)',
    stageBorder: 'border-amber-200/60',
    hoverBorder: 'hover:border-amber-400',
    modelBadge: 'text-amber-900 border-amber-300 bg-amber-50/95',
    accentColor: '#c5a059',
    tagBg: 'bg-amber-50/90 border-amber-200 text-amber-900'
  };
};

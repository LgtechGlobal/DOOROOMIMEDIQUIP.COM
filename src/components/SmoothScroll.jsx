import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis smooth momentum scrolling with autoRaf
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      respectReducedMotion: false, // Ensure smooth momentum scroll is always active
      infinite: false,
    });

    window.__lenis = lenis;

    // Recalculate dimensions on window resize and image loads
    const handleResize = () => lenis.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return <>{children}</>;
};

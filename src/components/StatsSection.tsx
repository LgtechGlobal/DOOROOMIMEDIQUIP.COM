import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteData';

export const StatsSection: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // 1.8 seconds
          const startTime = performance.now();
          const targetValues = SITE_CONFIG.stats.map(s => s.value);

          const animateCounts = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const updated = targetValues.map(val => Math.round(val * easeOut));
            setCounts(updated);

            if (progress < 1) {
              requestAnimationFrame(animateCounts);
            }
          };

          requestAnimationFrame(animateCounts);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="bg-white border-b border-hanbit-border py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-hanbit-border/60">
          {SITE_CONFIG.stats.map((stat, idx) => (
            <div key={idx} className={`pt-6 sm:pt-0 ${idx > 0 ? 'sm:pl-8' : ''} space-y-1.5`}>
              <div className="flex items-baseline">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hanbit-forest font-sans tracking-tight">
                  {counts[idx]}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-hanbit-gold ml-0.5">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-hanbit-muted font-medium leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

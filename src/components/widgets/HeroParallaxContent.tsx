'use client';

import { type ReactNode, useEffect, useRef } from 'react';

export default function HeroParallaxContent({ children, distance = 140 }: { children: ReactNode; distance?: number }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const hero = content?.closest<HTMLElement>('#heroOne');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;

    if (!content || !hero || reduceMotion.matches) return;

    const updatePosition = () => {
      frameId = 0;
      const bounds = hero.getBoundingClientRect();
      const progress = Math.min(Math.max(-bounds.top / Math.max(bounds.height, 1), 0), 1);
      content.style.transform = `translate3d(0, ${Math.round(progress * -distance)}px, 0)`;
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      content.style.transform = '';
    };
  }, [distance]);

  return (
    <div ref={contentRef} className="w-full motion-reduce:transform-none" style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}

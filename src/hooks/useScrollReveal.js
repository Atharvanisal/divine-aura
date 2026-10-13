import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered entrance animations.
 * Uses IntersectionObserver for performant, one-time reveal triggers.
 * Automatically respects 'prefers-reduced-motion'.
 * Avoids premature offscreen timers so lower sections only animate when actually scrolled into view.
 */
export function useScrollReveal({
  threshold = 0.08,
  rootMargin = '0px 0px -30px 0px',
  once = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // SSR safe check
    if (typeof window === 'undefined') {
      setIsVisible(true);
      return;
    }

    // Immediately show content if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Check if element is already within the viewport on mount
    const rect = node.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      setIsVisible(true);
      return;
    }

    // Fallback if IntersectionObserver is unsupported in the current browser
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    // Passive scroll check fallback: guarantees elements become visible when scrolled into view
    const handleScrollCheck = () => {
      if (!node) return;
      const r = node.getBoundingClientRect();
      if (r.top <= window.innerHeight - 20) {
        setIsVisible(true);
        if (once) {
          window.removeEventListener('scroll', handleScrollCheck);
          observer.unobserve(node);
        }
      }
    };

    window.addEventListener('scroll', handleScrollCheck, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollCheck);
      if (node) {
        observer.unobserve(node);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}

export default useScrollReveal;

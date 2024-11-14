import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  delay?: number;
  distance?: string;
  duration?: number;
  easing?: string;
  interval?: number;
  opacity?: number;
  origin?: 'top' | 'right' | 'bottom' | 'left';
  scale?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const defaultOptions: ScrollRevealOptions = {
      delay: 200,
      distance: '20px',
      duration: 800,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      interval: 100,
      opacity: 0,
      origin: 'bottom',
      scale: 1,
    };

    const mergedOptions = { ...defaultOptions, ...options };

    async function animate() {
      if (elementRef.current) {
        const ScrollReveal = (await import('scrollreveal')).default;
        ScrollReveal().reveal(elementRef.current, mergedOptions);
      }
    }

    animate();
  }, [options]);

  return elementRef;
}

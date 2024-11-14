'use client';

import { useEffect, useRef } from 'react';

interface MysticalTextProps {
  text: string;
  className?: string;
}

export default function MysticalText({ text, className = '' }: MysticalTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const letters = container.querySelectorAll('.mystical-letter');
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;

      letters.forEach((letter) => {
        const letterRect = (letter as HTMLElement).getBoundingClientRect();
        const letterCenterX = letterRect.left + letterRect.width / 2;
        const letterCenterY = letterRect.top + letterRect.height / 2;

        const deltaX = e.clientX - letterCenterX;
        const deltaY = e.clientY - letterCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 200;
        const intensity = Math.max(0, 1 - distance / maxDistance);

        const moveX = (deltaX / distance) * intensity * 10;
        const moveY = (deltaY / distance) * intensity * 10;
        const scale = 1 + intensity * 0.2;
        const glow = intensity * 20;

        (letter as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
        (letter as HTMLElement).style.textShadow = `0 0 ${glow}px rgba(147, 51, 234, ${intensity})`;
      });
    };

    const handleMouseLeave = () => {
      const letters = container.querySelectorAll('.mystical-letter');
      letters.forEach((letter) => {
        (letter as HTMLElement).style.transform = 'translate(0, 0) scale(1)';
        (letter as HTMLElement).style.textShadow = 'none';
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="mystical-letter inline-block transition-all duration-200"
          style={{ willChange: 'transform' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

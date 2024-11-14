'use client';

import { useEffect, useRef } from 'react';

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowingBorder({ children, className = '' }: GlowingBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for the glow effect
      container.style.setProperty('--x', `${x}px`);
      container.style.setProperty('--y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative group ${className}`}
      style={{
        '--x': '50%',
        '--y': '50%',
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(147,51,234,0.3)_0%,transparent_60%)]" />
      <div className="absolute inset-[1px] rounded-xl bg-black" />
      <div className="relative">{children}</div>
    </div>
  );
}

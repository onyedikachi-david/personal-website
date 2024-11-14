'use client';

import { useEffect, useRef } from 'react';
import type { FC } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$><=!@#%^&*()';

const MatrixRain: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    setCanvasSize();
    
    const debouncedResize = debounce(setCanvasSize, 250);
    window.addEventListener('resize', debouncedResize);

    class Column {
      x: number;
      y: number;
      stackHeight: number;
      chars: string[];
      speed: number;

      constructor(x: number, stackHeight: number) {
        this.x = x;
        this.y = 0;
        this.stackHeight = stackHeight;
        this.chars = Array(stackHeight).fill('').map(() => 
          CHARS[Math.floor(Math.random() * CHARS.length)]
        );
        this.speed = 1 + Math.random() * 0.5; // Reduced speed variation
      }

      draw(ctx: CanvasRenderingContext2D) {
        this.chars.forEach((char, i) => {
          const y = this.y - i * 20;
          if (y < canvas.height && y > -20) {
            const alpha = i === 0 ? 1 : (1 - i / this.stackHeight);
            ctx.fillStyle = `rgba(147, 51, 234, ${alpha})`;
            ctx.fillText(char, this.x, y);
          }
        });

        this.y += this.speed;
        if (this.y > canvas.height + this.stackHeight * 20) {
          this.y = 0;
          this.chars = Array(this.stackHeight).fill('').map(() => 
            CHARS[Math.floor(Math.random() * CHARS.length)]
          );
        }

        // Reduce character change frequency
        if (Math.random() < 0.02) {
          const index = Math.floor(Math.random() * this.stackHeight);
          this.chars[index] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
    }

    const columnWidth = 20;
    const columnCount = Math.min(Math.ceil(canvas.width / columnWidth), 50); // Limit maximum columns
    const columns: Column[] = [];
    
    for (let i = 0; i < columnCount; i++) {
      const stackHeight = Math.floor(Math.random() * 10) + 5; // Reduced stack height
      columns.push(new Column(i * columnWidth, stackHeight));
    }

    let lastTime = 0;
    const fps = 30; // Limit FPS
    const frameInterval = 1000 / fps;

    ctx.font = '16px monospace';

    function animate(currentTime: number) {
      if (!lastTime) lastTime = currentTime;
      
      const elapsed = currentTime - lastTime;
      
      if (elapsed > frameInterval) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        columns.forEach(column => column.draw(ctx));

        lastTime = currentTime - (elapsed % frameInterval);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20"
      style={{ zIndex: 0 }}
    />
  );
};

// Utility function for debouncing resize events
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default MatrixRain;

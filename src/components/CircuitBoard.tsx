'use client';

import { useEffect, useRef } from 'react';
import type { FC } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Circuit {
  points: Point[];
  progress: number;
  speed: number;
}

const CircuitBoard: FC = () => {
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

    const circuits: Circuit[] = [];
    const gridSize = 60; 
    const maxPoints = 6; 
    const circuitCount = Math.min(5, Math.floor(window.innerWidth / 300)); 

    function createCircuit(startX: number, startY: number): Circuit {
      const points: Point[] = [{ x: startX, y: startY }];
      let currentX = startX;
      let currentY = startY;

      for (let i = 0; i < maxPoints - 1; i++) {
        const direction = Math.floor(Math.random() * 4);
        switch (direction) {
          case 0: currentX += gridSize; break;
          case 1: currentY += gridSize; break;
          case 2: currentX -= gridSize; break;
          case 3: currentY -= gridSize; break;
        }
        points.push({ x: currentX, y: currentY });
      }

      return {
        points,
        progress: 0,
        speed: 0.5 + Math.random() * 0.5, 
      };
    }

    for (let i = 0; i < circuitCount; i++) {
      const startX = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
      const startY = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
      circuits.push(createCircuit(startX, startY));
    }

    let lastTime = 0;
    const fps = 30; 
    const frameInterval = 1000 / fps;

    function drawCircuit(circuit: Circuit) {
      if (circuit.points.length < 2) return;

      const currentProgress = circuit.progress * (circuit.points.length - 1);
      const currentIndex = Math.floor(currentProgress);
      const nextIndex = Math.min(currentIndex + 1, circuit.points.length - 1);
      const segmentProgress = currentProgress - currentIndex;

      ctx.beginPath();
      ctx.moveTo(circuit.points[0].x, circuit.points[0].y);
      for (let i = 1; i <= currentIndex; i++) {
        ctx.lineTo(circuit.points[i].x, circuit.points[i].y);
      }

      const currentPoint = circuit.points[currentIndex];
      const nextPoint = circuit.points[nextIndex];
      const currentX = currentPoint.x + (nextPoint.x - currentPoint.x) * segmentProgress;
      const currentY = currentPoint.y + (nextPoint.y - currentPoint.y) * segmentProgress;
      ctx.lineTo(currentX, currentY);

      ctx.strokeStyle = `rgba(147, 51, 234, ${0.3 + Math.sin(circuit.progress * Math.PI) * 0.2})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      circuit.points.forEach((point, index) => {
        if (index <= currentIndex) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(147, 51, 234, 0.5)';
          ctx.fill();
        }
      });
    }

    function animate(currentTime: number) {
      if (!lastTime) lastTime = currentTime;
      
      const elapsed = currentTime - lastTime;
      
      if (elapsed > frameInterval) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        circuits.forEach(circuit => {
          circuit.progress += 0.001 * circuit.speed; 
          if (circuit.progress >= 1) {
            circuit.progress = 0;
            const startX = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
            const startY = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
            const newCircuit = createCircuit(startX, startY);
            circuit.points = newCircuit.points;
            circuit.speed = newCircuit.speed;
          }
          drawCircuit(circuit);
        });

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
      className="fixed inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  );
};

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

export default CircuitBoard;

'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const totalHeight = article.clientHeight - window.innerHeight;
      const windowScrollTop = window.scrollY || document.documentElement.scrollTop;
      const currentProgress = (windowScrollTop / totalHeight) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-16 left-0 w-full h-1 bg-gray-800 z-50">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-150 ease-out"
        style={{ transform: `translateX(${progress - 100}%)` }}
      />
    </div>
  );
}

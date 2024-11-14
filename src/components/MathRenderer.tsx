'use client';

import { useEffect, useRef, useState } from 'react';
import katex from 'katex';

interface MathRendererProps {
  math: string;
  display?: boolean;
}

const MathRenderer: React.FC<MathRendererProps> = ({ math, display = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: display,
          throwOnError: false,
          errorColor: '#ef4444', // red-500
          trust: true,
          strict: false,
          macros: {
            // Add any custom macros here
            "\\RR": "\\mathbb{R}",
            "\\NN": "\\mathbb{N}",
            "\\ZZ": "\\mathbb{Z}",
            "\\QQ": "\\mathbb{Q}",
            "\\CC": "\\mathbb{C}",
          },
        });
        setError(null);
      } catch (err) {
        console.error('Error rendering math:', err);
        setError('Failed to render mathematical expression');
        // Display the original LaTeX in case of error
        if (containerRef.current) {
          containerRef.current.textContent = math;
        }
      }
    }
  }, [math, display]);

  if (error) {
    return (
      <div className="my-4 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
        <p className="text-red-400 mb-2">{error}</p>
        <pre className="overflow-auto p-2 bg-gray-800/50 rounded">
          <code>{math}</code>
        </pre>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`
        overflow-x-auto py-2
        ${display ? 'my-4 flex justify-center' : 'inline-block'}
        hover:bg-purple-500/5 transition-colors duration-300
      `}
    />
  );
};

export default MathRenderer;

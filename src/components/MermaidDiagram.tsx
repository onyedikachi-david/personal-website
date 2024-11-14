'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize with better defaults for dark mode
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'JetBrains Mono',
  darkMode: true,
  themeVariables: {
    primaryColor: '#9333ea',
    primaryTextColor: '#f3f4f6',
    primaryBorderColor: '#7c3aed',
    lineColor: '#9333ea',
    secondaryColor: '#4f46e5',
    tertiaryColor: '#2563eb',
    background: '#1e1e1e',
    mainBkg: '#1e1e1e',
    nodeBorder: '#7c3aed',
    clusterBkg: '#1e1e1e',
    clusterBorder: '#7c3aed',
    titleColor: '#f3f4f6',
    edgeLabelBackground: '#1e1e1e',
  },
});

interface MermaidDiagramProps {
  chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;
      
      try {
        setError(null);
        const { svg } = await mermaid.render('mermaid-diagram', chart.trim());
        containerRef.current.innerHTML = svg;
        
        // Add zoom functionality
        const svgElement = containerRef.current.querySelector('svg');
        if (svgElement) {
          svgElement.style.maxWidth = '100%';
          svgElement.style.cursor = 'pointer';
          svgElement.addEventListener('click', () => {
            svgElement.classList.toggle('zoomed');
          });
        }
      } catch (err) {
        console.error('Error rendering Mermaid diagram:', err);
        setError('Failed to render diagram. Please check your syntax.');
      }
    };

    renderDiagram();
  }, [chart]);

  if (error) {
    return (
      <div className="my-4 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
        <p className="text-red-400 mb-2">{error}</p>
        <pre className="overflow-auto p-2 bg-gray-800/50 rounded">
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="my-4 flex justify-center bg-gray-800/50 rounded-lg p-4 overflow-x-auto"
    />
  );
}

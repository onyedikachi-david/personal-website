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
  const [diagramId] = useState(() => `mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;
      
      try {
        setError(null);
        
        // Clean and validate the chart content
        let cleanChart = typeof chart === 'string' ? chart : '';
        
        // Handle potential JSON or array input
        if (typeof chart !== 'string') {
          try {
            cleanChart = JSON.stringify(chart, null, 2);
          } catch {
            cleanChart = String(chart);
          }
        }

        // Clean up the chart content
        cleanChart = cleanChart
          .replace(/\\n/g, '\n')  // Replace escaped newlines
          .replace(/\n+/g, '\n')  // Remove multiple newlines
          .trim();

        // Ensure the chart has a valid diagram type
        if (!cleanChart.match(/^(graph|sequenceDiagram|classDiagram|stateDiagram|erDiagram|flowchart|gantt|pie|journey)/)) {
          throw new Error('No valid diagram type detected. Chart must start with a diagram type declaration (e.g., graph TD, sequenceDiagram, etc.)');
        }

        // Parse the chart first to validate syntax
        await mermaid.parse(cleanChart);
        
        // If parse succeeds, render the diagram
        const { svg } = await mermaid.render(diagramId, cleanChart);
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        
          // Add zoom functionality
          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.cursor = 'pointer';
            svgElement.style.transition = 'transform 0.3s ease';
            
            const toggleZoom = () => {
              if (svgElement.style.transform === 'scale(1.5)') {
                svgElement.style.transform = 'scale(1)';
              } else {
                svgElement.style.transform = 'scale(1.5)';
              }
            };
            
            svgElement.addEventListener('click', toggleZoom);
            return () => svgElement.removeEventListener('click', toggleZoom);
          }
        }
      } catch (err) {
        console.error('Error rendering Mermaid diagram:', err);
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Failed to render diagram. Please check your syntax.';
        
        setError(errorMessage);
        
        // Show the raw chart content and error message
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="space-y-4">
              <p class="text-red-400">${errorMessage}</p>
              <pre class="text-sm bg-gray-800/50 p-4 rounded overflow-x-auto"><code>${
                typeof chart === 'string' ? chart : JSON.stringify(chart, null, 2)
              }</code></pre>
            </div>
          `;
        }
      }
    };

    renderDiagram();
  }, [chart, diagramId]);

  return (
    <div className="my-4">
      {error && (
        <div className="mb-4 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}
      <div 
        ref={containerRef}
        className="flex justify-center bg-gray-800/50 rounded-lg p-4 overflow-x-auto"
      />
    </div>
  );
}

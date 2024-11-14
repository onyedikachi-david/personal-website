'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import katex from 'katex';

// Initialize mermaid with dark theme and math support
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'JetBrains Mono',
  darkMode: true,
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
    curve: 'basis',
    rankSpacing: 50,
    nodeSpacing: 50,
    padding: 15,
    defaultRenderer: 'dagre-wrapper'
  },
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

// Function to process LaTeX in text
function processLatex(text: string): string {
  return text.replace(/\$([^$]+)\$/g, (match, latex) => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        output: 'html',
        displayMode: false,
      });
    } catch (error) {
      console.error('LaTeX rendering error:', error);
      return match; // Return original text if rendering fails
    }
  });
}

interface MermaidDiagramLoaderProps {
  children: React.ReactNode;
}

export default function MermaidDiagramLoader({ children }: MermaidDiagramLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;

      try {
        // Clean the chart content and ensure it's a string
        let content = String(children)
          .replace(/\\n/g, '\n')
          .replace(/\n+/g, '\n')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .trim();

        // Process LaTeX in node labels
        content = content.replace(/\[(.*?)\]/g, (match, label) => {
          return `[${processLatex(label)}]`;
        });

        // Process LaTeX in edge labels
        content = content.replace(/\|.*?\|/g, (match) => {
          return processLatex(match);
        });

        // Skip if content is empty
        if (!content) {
          throw new Error('Empty diagram content');
        }

        // Log the content for debugging
        console.log('Mermaid content:', content);

        // Generate unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;

        // Render the diagram
        const { svg } = await mermaid.render(id, content);
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;

          // Add zoom functionality
          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement instanceof SVGElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.cursor = 'pointer';
            svgElement.style.transition = 'transform 0.3s ease';
            
            const toggleZoom = () => {
              const currentScale = svgElement.style.transform === 'scale(1.5)' ? '1' : '1.5';
              svgElement.style.transform = `scale(${currentScale})`;
            };
            
            svgElement.addEventListener('click', toggleZoom);
            return () => svgElement.removeEventListener('click', toggleZoom);
          }

          // Process any remaining LaTeX after rendering
          const mathElements = containerRef.current.querySelectorAll('.katex');
          mathElements.forEach(element => {
            if (element instanceof HTMLElement) {
              element.style.display = 'inline-block';
              element.style.verticalAlign = 'middle';
            }
          });
        }
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="p-4 rounded-lg bg-red-900/20 border border-red-500/20">
              <p class="text-red-400 mb-2">Failed to render diagram:</p>
              <pre class="text-sm bg-gray-800/50 p-4 rounded overflow-x-auto">
                <code>${String(children)}</code>
              </pre>
              <p class="text-red-400 mt-2 text-sm">Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
            </div>
          `;
        }
      }
    };

    renderDiagram();
  }, [children]);

  return (
    <div 
      ref={containerRef}
      className="my-4 flex justify-center bg-gray-800/50 rounded-lg p-4 overflow-x-auto"
    >
      <div className="animate-pulse text-gray-400">Loading diagram...</div>
    </div>
  );
}

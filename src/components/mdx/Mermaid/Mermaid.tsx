'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MermaidProps } from './Mermaid.types';

// Initialize mermaid with aggressive Neo-Brutalist theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    padding: 20,
  },
  sequence: {
    actorMargin: 80,
    boxMargin: 20,
    boxTextMargin: 10,
    noteMargin: 15,
    messageMargin: 50,
  },
  class: {
    arrowMarkerAbsolute: true,
  },
  er: {
    fontSize: 16,
    useMaxWidth: true,
  },
});

/**
 * Mermaid Component
 * Renders mermaid diagrams with Neo-Brutalist styling and zoom/pan controls
 */
export function Mermaid({ chart, className }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current || !chart) return;

      try {
        // Generate unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // Render the diagram
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
        setError('');
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Failed to render diagram. Check syntax.');
      }
    };

    renderDiagram();
  }, [chart]);

  // Zoom handlers
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
  };

  if (error) {
    return (
      <div className="my-6 border-[3px] border-red-500 bg-red-50 p-6">
        <div className="font-bold text-red-700 mb-2">Diagram Error</div>
        <pre className="text-sm text-red-600 font-mono">{error}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'my-6 border-[4px] border-foreground shadow-[8px_8px_0px_0px] shadow-foreground relative',
        'bg-white dark:bg-zinc-900',
        className
      )}
    >
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-bg-elevated border-[3px] border-foreground shadow-[4px_4px_0px_0px] shadow-foreground hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] hover:shadow-foreground transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-bg-elevated border-[3px] border-foreground shadow-[4px_4px_0px_0px] shadow-foreground hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] hover:shadow-foreground transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-bg-elevated border-[3px] border-foreground shadow-[4px_4px_0px_0px] shadow-foreground hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] hover:shadow-foreground transition-all"
          title="Reset View"
        >
          <Maximize2 className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Diagram Container */}
      <div
        className="overflow-hidden p-8 cursor-move select-none"
        style={{ minHeight: '400px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {svg ? (
          <div
            ref={diagramRef}
            className="mermaid-diagram flex justify-center items-center transition-transform duration-100 [&_svg]:max-w-full [&_svg]:h-auto"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="text-center text-foreground/60 py-8 font-mono">
            Rendering diagram...
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 left-4 text-xs text-foreground/50 font-mono">
        💡 Drag to pan • Scroll to zoom • Click controls to zoom
      </div>
    </div>
  );
}

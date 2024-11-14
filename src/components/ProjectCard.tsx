'use client';

import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useRef, useEffect } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string;
  sourceCode: string;
  demoLink?: string;
}

export default function ProjectCard({
  title,
  description,
  techStack,
  sourceCode,
  demoLink
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="mystical-card group hover:transform hover:scale-[1.02] transition-all duration-300"
    >
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-3 gradient-text" data-text={title}>
          {title}
        </h3>
        <p className="text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>
        <p className="text-sm text-gray-400 mb-4">
          <span className="font-semibold">Tech Stack:</span> {techStack}
        </p>
        <div className="flex gap-4">
          <a
            href={sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-all transform hover:scale-110"
            aria-label={`View source code for ${title}`}
          >
            <FiGithub size={20} className="hover:animate-pulse" />
          </a>
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-all transform hover:scale-110"
              aria-label={`View demo for ${title}`}
            >
              <FiExternalLink size={20} className="hover:animate-pulse" />
            </a>
          )}
        </div>
      </div>
      
      {/* Mystical hover effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-[-1px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur"></div>
      </div>
    </div>
  );
}

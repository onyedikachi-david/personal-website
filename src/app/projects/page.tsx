'use client';

import { projects } from '@/data/projects';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import type { Project } from '@/data/projects';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="group relative"
    >
      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Link href={`/projects/${projectSlug}`}>
        <div className="backdrop-blur-sm bg-gray-900/50 rounded-lg border border-primary/20 overflow-hidden hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border-b border-primary/20">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center text-sm font-mono text-gray-400">
              project_{index + 1}.config.ts
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden">
            {project.image && (
              <Image
                src={project.image}
                alt={project.imageAlt || project.title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/50">
                {project.title}
              </h3>
              <div className="flex gap-3">
                {project.sourceCode && (
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub className="w-5 h-5" />
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-gray-400 mb-6 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.techStack.split(',').map((tech) => (
                <span
                  key={tech.trim()}
                  className="px-3 py-1 text-sm bg-primary/5 text-primary rounded-lg border border-primary/10 font-mono"
                >
                  <span className="text-primary/70">#_</span>{tech.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="mb-16"
        >
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-gray-900/50 rounded-lg border border-primary/20 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border-b border-primary/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-sm font-mono text-gray-400">
                projects.config.ts
              </div>
            </div>
            <div className="p-6 text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/50 mb-6">
                Featured Projects
              </h1>
              <p className="text-gray-400 text-lg">
                A showcase of my work in web development, blockchain technology, and innovative solutions
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

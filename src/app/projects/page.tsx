'use client';

import { projects } from '@/data/projects';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import type { Project } from '@/data/projects';

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

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="group backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-800/50 hover:border-gray-700/50"
    >
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
      
      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            {project.title}
          </h3>
          <div className="flex gap-3">
            {project.sourceCode && (
              <a
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-300"
                aria-label="View Source Code"
              >
                <FiGithub className="w-5 h-5" />
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-300"
                aria-label="View Live Demo"
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
              className="px-3 py-1 text-sm rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50 transition-all duration-300"
            >
              {tech.trim()}
            </span>
          ))}
        </div>
      </div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-gray-900/20 to-gray-900 pointer-events-none" />
      
      <main className="container mx-auto px-4 py-24 relative">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 mb-6">
            Featured Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my work in web development, blockchain technology, and innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}

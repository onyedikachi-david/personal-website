'use client';

import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiCode } from 'react-icons/fi';
import MysticalText from '@/components/MysticalText';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import Image from 'next/image';
import OpenSource from './OpenSource';
import { AlgoraResponse, ContributionStats } from '@/types/algora';

interface ClientHomeProps {
  contributions: AlgoraResponse;
  stats: ContributionStats;
}

export default function ClientHome({ contributions, stats }: ClientHomeProps) {
  return (
    <main className="min-h-screen">
      <div className="relative">
        {/* Hero Section with Geeky Background */}
        <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <MysticalText text="Onyedikachi David" />
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-8">
                Software Engineer & Open Source Contributor
              </p>
              <div className="flex justify-center gap-6">
                <a
                  href="https://github.com/onyedikachi-david"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiGithub className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/onyedikachi-david"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiLinkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:davidonyedikachi7@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiMail className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Open Source Section */}
        <section id="opensource" className="py-20 px-4 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <MysticalText text="Open Source Contributions" />
            </h2>
            <OpenSource contributions={contributions} stats={stats} />
          </div>
        </section>

        <section id="portfolio" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <MysticalText text="Featured Projects" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative backdrop-blur-sm bg-gray-900/50 rounded-lg border border-primary/20 overflow-hidden hover:border-primary/40 transition-colors"
                >
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
                  <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.split(', ').map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-sm rounded-full bg-gray-800/50 border border-primary/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-end text-sm">
                      <a
                        href={project.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <FiGithub className="w-4 h-4" />
                        Source
                      </a>
                      {project.demoLink && (
                        <>
                          <span className="mx-2 text-gray-600">•</span>
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <FiExternalLink className="w-4 h-4" />
                            Demo
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <MysticalText text="Get in Touch" />
            </h2>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/onyedikachi-david"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiGithub className="w-8 h-8" />
              </a>
              <a
                href="https://linkedin.com/in/onyedikachi-david"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiLinkedin className="w-8 h-8" />
              </a>
              <a
                href="mailto:davidonyedikachi7@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiMail className="w-8 h-8" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

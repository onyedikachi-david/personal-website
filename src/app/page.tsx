'use client';

import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiCode } from 'react-icons/fi';
import MysticBackground from '@/components/MysticBackground';
import MysticalText from '@/components/MysticalText';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative">
        {/* Hero Section with Geeky Background */}
        <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
          
          {/* Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full filter blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/30 rounded-full filter blur-[128px] animate-pulse delay-700" />
          
          {/* Code-like Elements */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-[10%] left-[5%] transform -rotate-12 text-purple-500/50 font-mono text-sm">
              &lt;div className=&quot;hero&quot;&gt;
            </div>
            <div className="absolute top-[20%] right-[10%] transform rotate-12 text-blue-500/50 font-mono text-sm">
              const developer = &quot;passionate&quot;;
            </div>
            <div className="absolute bottom-[15%] left-[15%] transform -rotate-6 text-green-500/50 font-mono text-sm">
              import &#123; Innovation &#125; from &apos;future&apos;;
            </div>
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <MysticalText text='David Anyatonwu' />
            </h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Blockchain Developer & Digital Mystic
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a
                href="#portfolio"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all relative group"
              >
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/50 to-blue-600/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative">View Portfolio</span>
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg bg-transparent border border-purple-500 text-white font-medium hover:bg-purple-500/10 transform hover:scale-105 transition-all relative group"
              >
                <span className="absolute inset-0 rounded-lg bg-purple-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative">Contact Me</span>
              </a>
            </motion.div>
          </motion.div>
        </section>

        <section id="portfolio" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <MysticalText text="Featured Projects" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="mystical-card group hover:scale-[1.02] transition-transform"
                >
                  <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.split(', ').map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-sm bg-purple-500/10 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2"
                      >
                        <FiCode className="text-xl" />
                        <span>Source Code</span>
                      </a>
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2"
                        >
                          <FiExternalLink className="text-xl" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <MysticalText text="Get in Touch" />
            </h2>
            <div className="mystical-card p-6">
              <p className="text-gray-400 text-center mb-8">
                I'm always open to new opportunities and collaborations.
                Feel free to reach out!
              </p>
              <div className="flex justify-center gap-8">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <FiGithub className="text-2xl" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <FiLinkedin className="text-2xl" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <FiMail className="text-2xl" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

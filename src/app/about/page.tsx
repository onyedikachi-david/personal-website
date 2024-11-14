'use client';

import { FiTerminal, FiCpu, FiCode, FiServer, FiBox, FiSend } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactMethods from '@/components/ContactMethods';

const skills = {
  languages: {
    primary: ['TypeScript', 'JavaScript', 'Python'],
    secondary: ['Solidity', 'Rust', 'SQL'],
  },
  frontend: {
    frameworks: ['React.js', 'Next.js', 'Vue.js'],
    styling: ['Tailwind CSS', 'Styled Components', 'SASS'],
    tools: ['Redux', 'GraphQL', 'Jest', 'Webpack'],
  },
  backend: {
    runtime: ['Node.js', 'Express.js', 'NestJS'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis'],
    tools: ['Docker', 'AWS', 'CI/CD', 'Nginx'],
  },
  blockchain: {
    platforms: ['Ethereum', 'Polygon', 'Binance Smart Chain'],
    tools: ['Web3.js', 'Ethers.js', 'Hardhat', 'Truffle'],
    concepts: ['Smart Contracts', 'DeFi', 'NFTs', 'DAOs'],
  },
};

const achievements = [
  '> Deployed 42 smart contracts to mainnet',
  '> Contributed to 137 open source projects',
  '> Wrote 256 technical articles',
  '> Fixed 512 bugs in production',
  '> Survived 1024 merge conflicts',
];

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'BsGithub',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: 'BsTwitter',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'BsLinkedin',
  },
];

const professionalProfile = {
  languages: {
    expert: ['JavaScript', 'TypeScript'],
    proficient: ['Python', 'SQL'],
    familiar: ['Rust', 'Solidity'],
  },
  expertise: {
    'Web Development': {
      core: ['React.js', 'Next.js', 'Node.js', 'Express.js'],
      additional: ['Vue.js', 'NestJS', 'GraphQL'],
    },
    'Database Systems': {
      relational: ['PostgreSQL', 'MySQL'],
      nosql: ['MongoDB', 'Redis'],
    },
    'Cloud & DevOps': {
      platforms: ['AWS', 'Google Cloud'],
      tools: ['Docker', 'Kubernetes', 'CI/CD', 'Nginx'],
    },
    'Blockchain Technology': {
      platforms: ['Ethereum', 'Polygon'],
      development: ['Web3.js', 'Ethers.js', 'Hardhat'],
      concepts: ['Smart Contracts', 'DeFi', 'NFTs'],
    }
  },
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: 2023,
    },
    {
      name: 'Professional Cloud Developer',
      issuer: 'Google Cloud',
      year: 2023,
    },
    {
      name: 'Certified Blockchain Developer',
      issuer: 'Ethereum Foundation',
      year: 2022,
    },
  ],
};

function TerminalPrompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono mb-2">
      <span className="text-green-400">➜</span>
      <span className="text-purple-400"> ~/onyedikachi </span>
      <span className="text-yellow-400">git:(</span>
      <span className="text-red-400">main</span>
      <span className="text-yellow-400">)</span>
      <span className="text-gray-400"> $ </span>
      {children}
    </div>
  );
}

function Matrix() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="matrix-rain opacity-10" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Tech-inspired Background */}
      <div className="fixed inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        {/* Floating Tech Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Binary Rain Effect */}
          <div className="absolute top-0 left-1/4 text-purple-500/10 font-mono text-sm whitespace-pre animate-float">
            01001100 01000101 01010100
          </div>
          <div className="absolute top-0 right-1/4 text-blue-500/10 font-mono text-sm whitespace-pre animate-float-delayed">
            01010101 01010011 00100000
          </div>
          
          {/* Code Snippets */}
          <div className="absolute top-[20%] left-[5%] transform -rotate-12 text-purple-500/20 font-mono text-sm">
            const developer = &#123; passion: &quot;infinite&quot; &#125;;
          </div>
          <div className="absolute top-[40%] right-[10%] transform rotate-12 text-blue-500/20 font-mono text-sm">
            while(alive) &#123; code(); learn(); repeat(); &#125;
          </div>
          <div className="absolute bottom-[30%] left-[15%] transform -rotate-6 text-green-500/20 font-mono text-sm">
            import &#123; Innovation &#125; from &apos;future&apos;;
          </div>
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[128px] animate-pulse delay-700" />
      </div>

      {/* Content */}
      <main className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <motion.section 
          className="mb-16 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 bg-purple-500 rounded-full animate-pulse opacity-20" />
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-purple-500/20 hover:border-purple-500/60 transition-all duration-300"
              priority
            />
            <div className="absolute -inset-2 border-2 border-purple-500/20 rounded-full animate-spin-slow" />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TerminalPrompt>
              <span className="text-green-400">whoami</span>
            </TerminalPrompt>
            
            <h1 className="text-5xl font-bold mb-4 font-mono">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                Onyedikachi
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              &lt;Digital Craftsman /&gt;
            </p>
          </motion.div>
          
          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-all transform hover:scale-110"
              >
                <span className="sr-only">{link.name}</span>
              </Link>
            ))}
          </motion.div>
        </motion.section>

        {/* Introduction Section */}
        <section className="mb-16">
          <TerminalPrompt>
            <span className="text-green-400">cat</span> introduction.md
          </TerminalPrompt>
          <div className="prose prose-invert max-w-none">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="text-gray-300 mb-6">
                I'm a digital craftsman who transforms coffee into code and bugs into features. 
                When I'm not diving deep into the blockchain abyss or crafting pixel-perfect UIs, 
                you can find me contributing to the open-source matrix or exploring the latest tech stacks.
              </p>
              <div className="flex items-center justify-between">
                <ContactMethods variant="minimal" />
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Get in Touch
                  <FiSend className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Profile Section */}
        <section className="mb-16">
          <TerminalPrompt>
            <span className="text-green-400">cat</span> professional_profile.md
          </TerminalPrompt>
          <div className="space-y-8">
            {/* Programming Languages */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
              <h3 className="text-lg font-semibold mb-6 text-purple-300">Programming Languages</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-mono">Expert</h4>
                  <div className="flex flex-wrap gap-2">
                    {professionalProfile.languages.expert.map((lang) => (
                      <span key={lang} className="px-3 py-1.5 bg-green-500/10 text-green-300 rounded-md text-sm font-mono border border-green-500/20">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-mono">Proficient</h4>
                  <div className="flex flex-wrap gap-2">
                    {professionalProfile.languages.proficient.map((lang) => (
                      <span key={lang} className="px-3 py-1.5 bg-blue-500/10 text-blue-300 rounded-md text-sm font-mono border border-blue-500/20">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-mono">Familiar</h4>
                  <div className="flex flex-wrap gap-2">
                    {professionalProfile.languages.familiar.map((lang) => (
                      <span key={lang} className="px-3 py-1.5 bg-purple-500/10 text-purple-300 rounded-md text-sm font-mono border border-purple-500/20">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Expertise */}
            {Object.entries(professionalProfile.expertise).map(([domain, skills]) => (
              <div key={domain} className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
                <h3 className="text-lg font-semibold mb-6 text-purple-300">{domain}</h3>
                <div className="space-y-4">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-mono">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1.5 bg-gray-900/80 text-gray-300 rounded-md text-sm font-mono border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Certifications */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
              <h3 className="text-lg font-semibold mb-6 text-purple-300">Professional Certifications</h3>
              <div className="space-y-4">
                {professionalProfile.certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-gray-900/50 hover:bg-gray-900/80 transition-all group"
                  >
                    <div className="font-mono">
                      <h4 className="text-gray-200 mb-1">{cert.name}</h4>
                      <p className="text-sm text-gray-400">{cert.issuer}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="text-xs font-mono px-2 py-1 rounded-md bg-purple-500/10 text-purple-300 group-hover:text-purple-200 transition-colors">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <TerminalPrompt>
            <span className="text-green-400">cat</span> skills.json
          </TerminalPrompt>
          <div className="space-y-8">
            {/* Languages */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Languages</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400 mb-2 font-mono">Primary</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.primary.map((lang) => (
                      <span key={lang} className="px-3 py-1 bg-green-500/10 text-green-300 rounded-md text-sm font-mono">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-2 font-mono">Secondary</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.secondary.map((lang) => (
                      <span key={lang} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-md text-sm font-mono">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Frontend */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Frontend Development</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400 mb-2 font-mono">Frameworks & Libraries</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.frameworks.map((item) => (
                      <span key={item} className="px-3 py-1 bg-green-500/10 text-green-300 rounded-md text-sm font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-2 font-mono">Styling</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.styling.map((item) => (
                      <span key={item} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-md text-sm font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-2 font-mono">Tools & Testing</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.tools.map((item) => (
                      <span key={item} className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-md text-sm font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Backend Development</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400 mb-2 font-mono">Runtime & Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.runtime.map((item) => (
                      <span key={item} className="px-3 py-1 bg-green-500/10 text-green-300 rounded-md text-sm font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-2 font-mono">Databases</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.databases.map((item) => (
                      <span key={item} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-md text-sm font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-2 font-mono">DevOps & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.tools.map((item) => (
                      <span key={item} className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-md text-sm font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Blockchain Development</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400 mb-2 font-mono">Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.blockchain.platforms.map((item) => (
                      <span key={item} className="px-3 py-1 bg-green-500/10 text-green-300 rounded-md text-sm font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-2 font-mono">Development Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.blockchain.tools.map((item) => (
                      <span key={item} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-md text-sm font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-2 font-mono">Domain Knowledge</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.blockchain.concepts.map((item) => (
                      <span key={item} className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-md text-sm font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-16">
          <TerminalPrompt>
            <span className="text-green-400">git</span> log achievements
          </TerminalPrompt>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
            <div className="font-mono space-y-2">
              {achievements.map((achievement, index) => (
                <p
                  key={index}
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  {achievement}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <TerminalPrompt>
            <span className="text-green-400">ssh</span> contact
          </TerminalPrompt>
          <div className="bg-gray-800/50 p-8 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <p className="text-gray-300 mb-6 font-mono">
              <span className="text-purple-400">const</span>{' '}
              <span className="text-green-400">contact</span> = {'{'}
              <br />
              &nbsp;&nbsp;email: <span className="text-yellow-300">"your.email@example.com"</span>,
              <br />
              &nbsp;&nbsp;status: <span className="text-yellow-300">"Open to interesting projects"</span>,
              <br />
              &nbsp;&nbsp;response_time: <span className="text-orange-400">≈ 24h</span>
              <br />
              {'}'};
            </p>
            <Link
              href="mailto:your.email@example.com"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-105 hover:rotate-1 font-mono"
            >
              Initialize Connection();
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

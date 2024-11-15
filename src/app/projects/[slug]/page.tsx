import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Project, projects } from '@/data/projects';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { notFound } from 'next/navigation';

// This would be replaced with your actual data fetching logic
async function getProjectBySlug(slug: string): Promise<Project> {
  // Convert title to slug format and find matching project
  const project = projects.find(p => 
    p.title.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
  );

  if (!project) {
    notFound();
  }

  return project;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://anyatonwu.dev';

  return {
    title: `${project.title} - David Anyatonwu`,
    description: project.description,
    openGraph: {
      title: `${project.title} - Project`,
      description: project.description,
      type: 'article',
      url: `${baseUrl}/projects/${params.slug}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  const techStack = project.techStack.split(',').map(tech => tech.trim());

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 lg:px-0">
        {/* Header Section */}
        <header className="mb-12 relative">
          {/* Terminal-like header */}
          <div className="mb-6 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border-b border-primary/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-sm font-mono text-gray-400">
                project.config.ts
              </div>
            </div>
            <div className="p-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/50">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-gray-400 text-base mb-6 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span className="text-gray-300">Project Details</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/5 text-primary rounded-lg text-sm 
                             border border-primary/10 font-mono"
                  >
                    <span className="text-primary/70">#_</span>{tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="relative group">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
            <div className="p-6 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-primary/20 
                          transition-all duration-300 group-hover:border-primary/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2 text-primary">
                  <span className="text-xs font-mono">[</span>
                  <span className="text-sm font-medium uppercase tracking-wider">Links</span>
                  <span className="text-xs font-mono">]</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
              <div className="flex gap-4 font-mono text-base">
                {project.sourceCode && (
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
                  >
                    <FaGithub className="text-lg" />
                    <span>View Source</span>
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
                  >
                    <FaExternalLinkAlt className="text-lg" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Project Image */}
        <section className="mt-12 relative group">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/30 to-transparent rounded-full" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 text-primary font-mono">
                <span className="text-sm">const</span>
                <span className="text-white">screenshot</span>
                <span className="text-primary/70">=</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-primary/20">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="mt-12 relative group">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/30 to-transparent rounded-full" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 text-primary font-mono">
                <span className="text-sm">function</span>
                <span className="text-white">getDescription</span>
                <span className="text-primary/70">( )</span>
                <span className="text-primary/70">{" {"}</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
            </div>
            <div className="p-6 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-primary/20">
              <p className="text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="mt-2 text-primary/70 font-mono">{"}"}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

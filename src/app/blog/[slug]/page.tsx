import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts, getRecommendedPosts, BlogPost as BlogPostType } from '@/utils/blog';
import { notFound } from 'next/navigation';
import { generateBlogMetadata } from '@/utils/metadata';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import dynamic from 'next/dynamic';
import { MDXComponents } from 'mdx/types';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { MDXImage } from '@/components/MDXImage';
import Link from 'next/link';
import '@/styles/prism.css';
import '@fontsource/jetbrains-mono';
import 'katex/dist/katex.min.css';
import { compileMDX } from 'next-mdx-remote/rsc';
import React from 'react';

// Import components normally since we're using RSC
import MermaidDiagram from '@/components/MermaidDiagram';
import ReadingProgress from '@/components/ReadingProgress';

interface Post extends BlogPostType {}

// Create client-side wrappers
const ClientMermaidDiagram = dynamic(() => import('@/components/MermaidDiagram'), {
  ssr: false,
  loading: () => (
    <div className="my-4 flex justify-center bg-gray-800/50 rounded-lg p-4">
      <div className="animate-pulse text-gray-400">Loading diagram...</div>
    </div>
  ),
});

const ClientReadingProgress = dynamic(() => import('@/components/ReadingProgress'), {
  ssr: false
});

// Type for MDX component props
type MDXComponentProps = {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
};

const components: MDXComponents = {
  pre: ({ children, ...props }: MDXComponentProps) => {
    // Extract code content if it's a mermaid diagram
    if (props.className?.includes('language-mermaid')) {
      const codeContent = React.Children.toArray(children).find(
        child => React.isValidElement(child) && child.type === 'code'
      ) as React.ReactElement | undefined;
      
      if (codeContent) {
        return <ClientMermaidDiagram chart={String(codeContent.props.children)} />;
      }
    }
    return <pre {...props}>{children}</pre>;
  },
  code: ({ className, children, ...props }: MDXComponentProps) => {
    // Don't process mermaid diagrams here, they're handled in pre
    if (className?.includes('language-mermaid')) {
      return <code className={className} {...props}>{children}</code>;
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  // Use type assertion for img component
  img: MDXImage as (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => JSX.Element,
  Image: MDXImage,
  // Remove h1 from MDX rendering since we're showing the title from frontmatter
  h1: () => null,
};

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return generateBlogMetadata(
    post.title,
    post.excerpt,
    post.tags,
    post.author,
    post.date,
    post.tldr
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params: { slug },
}: {
  params: { slug: string };
}) {
  try {
    const post = await getPostBySlug(slug);
    const recommendedPosts = await getRecommendedPosts(post);

    if (!post) {
      notFound();
    }

    const { content } = await compileMDX({
      source: post.content,
      components,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkMath, remarkGfm],
          rehypePlugins: [
            rehypeKatex,
            rehypeSlug,
            [rehypePrism, { showLineNumbers: true, ignoreMissing: true }]
          ],
          format: 'mdx',
        },
      },
    });

    return (
      <div className="min-h-screen pt-24 pb-16">
        <ClientReadingProgress />
        <article className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-gray-400 mb-8">
              <time dateTime={post.date} className="text-sm">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>·</span>
              <span className="text-sm">{post.readingTime}</span>
            </div>
            {post.excerpt && (
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* TL;DR Section */}
          {post.tldr && (
            <div className="mb-12 max-w-2xl mx-auto">
              <div className="p-6 rounded-xl bg-gray-800/50 border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <svg 
                    className="w-5 h-5 text-purple-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" 
                    />
                  </svg>
                  <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    TL;DR
                  </h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {post.tldr}
                </p>
                <div className="mt-4 pt-4 border-t border-purple-500/20">
                  <div className="flex items-center gap-2 text-sm text-purple-400/80">
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="relative">
            {/* Quick Navigation - Floating */}
            {post.tableOfContents.length > 0 && (
              <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:block">
                <nav className="space-y-2 w-48">
                  {post.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300 ${
                        item.level === 2 ? 'pl-0' : 'pl-3'
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {content}
            </div>
          </div>
        </article>

        {/* Reading Progress Bar */}
        <div className="fixed top-16 left-0 w-full h-1 bg-gray-800">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-0 reading-progress-bar" />
        </div>

        {/* Recommended Posts */}
        {recommendedPosts.length > 0 && (
          <div className="max-w-4xl mx-auto mt-20 px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">More Articles You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedPosts.map((rPost) => (
                <Link
                  key={rPost.slug}
                  href={`/blog/${rPost.slug}`}
                  className="group p-6 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">
                    {rPost.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{rPost.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <time dateTime={rPost.date}>
                      {new Date(rPost.date).toLocaleDateString()}
                    </time>
                    <span>{rPost.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error in BlogPost:', error);
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Error Loading Blog Post</h1>
          <p className="text-gray-400 mb-8">
            We encountered an error while loading this blog post. Please try again later.
          </p>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Blog List
          </Link>
        </div>
      </div>
    );
  }
}

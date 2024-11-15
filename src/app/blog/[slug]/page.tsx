import { getPostBySlug, getAllPosts, getRecommendedPosts } from '@/utils/blog';
import { notFound } from 'next/navigation';
import { generateBlogMetadata } from '@/lib/metadata';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import '@/styles/prism.css';
import '@fontsource/jetbrains-mono';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Create client-side wrapper for ReadingProgress
const ClientReadingProgress = dynamic(() => import('@/components/ReadingProgress'), {
  ssr: false
});

// Create client-side wrapper for Mermaid diagrams
const MermaidDiagramLoader = dynamic(() => import('@/components/MermaidDiagramLoader'), {
  ssr: false,
  loading: () => (
    <div className="my-4 flex justify-center bg-gray-800/50 rounded-lg p-4">
      <div className="animate-pulse text-gray-400">Loading diagram...</div>
    </div>
  )
});

// Extract text content from children
function getTextContent(children: any): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(getTextContent).join('');
  if (children?.props?.children) return getTextContent(children.props.children);
  return '';
}

// Process the content to handle Mermaid diagrams in HTML
function processMermaidContent(content: string) {
  // Replace <pre class="mermaid"> blocks with fenced code blocks
  return content.replace(
    /<pre class="mermaid">\s*([\s\S]*?)\s*<\/pre>/g,
    (_, code) => `\`\`\`mermaid\n${code.trim()}\n\`\`\``
  );
}

const components = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    const content = getTextContent(children).trim();

    if (match?.[1] === 'mermaid') {
      return <MermaidDiagramLoader>{content}</MermaidDiagramLoader>;
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre({ children, className, ...props }: any) {
    // If it's a direct mermaid block
    if (className?.includes('mermaid')) {
      const content = getTextContent(children).trim();
      return <MermaidDiagramLoader>{content}</MermaidDiagramLoader>;
    }

    // For all other pre blocks
    return (
      <pre className={className} {...props}>
        {children}
      </pre>
    );
  },
  img({ src, alt, ...props }: any) {
    if (!src) return null;
    return (
      <img
        src={src}
        alt={alt || ''}
        className="rounded-lg"
        loading="lazy"
        {...props}
      />
    );
  },
  // Remove h1 as we display it from frontmatter
  h1: () => null,
};

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return generateBlogMetadata(post);
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
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const recommendedPosts = await getRecommendedPosts(post);
  
  // Process the content to handle Mermaid diagrams
  const processedContent = processMermaidContent(post.content);

  return (
    <div className="relative pt-24 pb-16">
      {/* Table of Contents - Fixed on the left */}
      {post.tableOfContents && post.tableOfContents.length > 0 && (
        <nav className="hidden lg:block fixed left-12 2xl:left-[calc((100vw-1400px)/4)] top-32 w-72 overflow-auto max-h-[calc(100vh-9rem)]">
          <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
              On this page
            </h2>
            <ul className="space-y-2.5 text-sm">
              {post.tableOfContents.map((item) => (
                <li
                  key={item.id}
                  className="hover:text-primary transition-colors"
                  style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
                >
                  <a 
                    href={`#${item.id}`}
                    className="block hover:text-primary transition-colors line-clamp-2"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/* Main Content */}
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
                blog-post.md
              </div>
            </div>
            <div className="p-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/50">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-400 text-base mb-6 font-mono">
                <time dateTime={post.date} className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span className="text-gray-300">{new Date(post.date).toLocaleDateString()}</span>
                </time>
                <span className="text-gray-600">|</span>
                {post.readingTime && (
                  <span className="flex items-center gap-2">
                    <span className="text-primary">&gt;</span>
                    <span className="text-gray-300">{post.readingTime.text}</span>
                  </span>
                )}
              </div>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="group px-3 py-1 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg text-sm 
                               transition-all duration-300 border border-primary/10 hover:border-primary/30 font-mono"
                    >
                      <span className="text-primary/70 group-hover:text-primary">#_</span>{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TL;DR Section */}
          {post.tldr && (
            <div className="relative group">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
              <div className="p-6 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-primary/20 
                            transition-all duration-300 group-hover:border-primary/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="text-xs font-mono">[</span>
                    <span className="text-sm font-medium uppercase tracking-wider">TL;DR</span>
                    <span className="text-xs font-mono">]</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                </div>
                <div className="font-mono text-base leading-relaxed">
                  <span className="text-primary">const</span>{' '}
                  <span className="text-blue-400">summary</span>{' '}
                  <span className="text-gray-400">=</span>{' '}
                  <span className="text-gray-300">{post.tldr}</span>
                  <span className="text-gray-400">;</span>
                </div>
              </div>
            </div>
          )}
        </header>

        <ClientReadingProgress />

        {/* Article Content */}
        <article className="relative mt-8 group">
          <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-transparent" />
          <div className="prose prose-invert lg:prose-lg max-w-none
            prose-pre:bg-gray-900/50 prose-pre:backdrop-blur-sm 
            prose-pre:border prose-pre:border-primary/20 prose-pre:rounded-lg
            prose-code:text-primary prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
            prose-headings:text-gray-100 prose-headings:font-mono prose-headings:font-medium
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:flex prose-h2:items-center prose-h2:gap-2
            prose-h2:before:content-['##'] prose-h2:before:text-primary/50 prose-h2:before:text-sm
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-h3:flex prose-h3:items-center prose-h3:gap-2
            prose-h3:before:content-['###'] prose-h3:before:text-primary/50 prose-h3:before:text-sm
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80
            prose-strong:text-primary/90 prose-strong:font-medium
            prose-ul:my-6 prose-li:text-gray-300 prose-li:marker:text-primary/50
            prose-blockquote:border-l-primary/50 prose-blockquote:bg-gray-900/30 prose-blockquote:backdrop-blur-sm
            prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:text-gray-300
            prose-img:rounded-lg prose-img:border prose-img:border-gray-800/50">
            <ReactMarkdown
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[
                rehypeKatex,
                rehypeSlug,
                rehypePrism
              ]}
              components={components}
            >
              {processedContent}
            </ReactMarkdown>
          </div>
        </article>

        {/* Recommended Posts Section */}
        {recommendedPosts.length > 0 && (
          <aside className="mt-20 relative group">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/30 to-transparent rounded-full" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 text-primary font-mono">
                  <span className="text-sm">function</span>
                  <span className="text-white">getRecommended</span>
                  <span className="text-primary/70">( )</span>
                  <span className="text-primary/70">{" {"}</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
              <div className="grid gap-4 pl-4 border-l border-primary/10">
                {recommendedPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group/post block p-6 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-primary/10 
                             hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2 font-mono text-sm text-primary/70 group-hover/post:text-primary">
                      <span>return</span>
                      <span>[{index}]</span>
                      <span>=&gt;</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover/post:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 font-mono text-sm">
                      <span className="text-primary/70 group-hover/post:text-primary">//</span> {post.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="mt-2 text-primary/70 font-mono pl-4">{"}"}</div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

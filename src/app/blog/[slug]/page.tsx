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
      <article className="prose prose-invert lg:prose-lg max-w-[1400px] mx-auto">
        <div className="max-w-3xl mx-auto px-4 lg:px-0">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-400 text-base mb-6">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString()}
              </time>
              <span>•</span>
              {post.readingTime && <span>{post.readingTime.text}</span>}
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* TL;DR Section - Right after tags */}
            {post.tldr && (
              <div className="mt-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                  TL;DR
                </h2>
                <p className="text-gray-300 text-base leading-relaxed">{post.tldr}</p>
              </div>
            )}
          </header>

          <ClientReadingProgress />

          <div className="prose prose-invert lg:prose-lg prose-headings:font-semibold prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-700/50 prose-code:text-primary prose-code:font-normal prose-img:rounded-lg">
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

          {recommendedPosts.length > 0 && (
            <aside className="mt-20">
              <h2 className="text-2xl font-bold mb-8">Recommended Posts</h2>
              <div className="grid gap-8">
                {recommendedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                  >
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-400">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </div>
      </article>
    </div>
  );
}

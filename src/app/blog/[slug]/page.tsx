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
    <article className="prose prose-invert max-w-4xl mx-auto pt-24 pb-16 px-4">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-4">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString()}
          </time>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
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
      </header>

      <ClientReadingProgress />

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

      {recommendedPosts.length > 0 && (
        <aside className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Recommended Posts</h2>
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
    </article>
  );
}

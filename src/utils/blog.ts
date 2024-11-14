import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

export const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
  excerpt: string;
  tags: string[];
  tldr?: string;
  tableOfContents: Array<{ id: string; text: string; level: number }>;
  readingTime: string;
}

// Function to calculate reading time
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Function to extract headings for table of contents
function extractHeadings(markdown: string) {
  const headings: Array<{ id: string; text: string; level: number }> = [];
  const ast = unified().use(remarkParse).use(remarkGfm).parse(markdown);

  visit(ast, 'heading', (node: any) => {
    const text = node.children
      .filter((child: any) => child.type === 'text')
      .map((child: any) => child.value)
      .join('');
    
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    headings.push({
      id,
      text,
      level: node.depth,
    });
  });

  return headings;
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  try {
    const fullPath = path.join(BLOG_DIR, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Blog post not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const tableOfContents = extractHeadings(content);
    const readingTime = calculateReadingTime(content);

    // Clean up frontmatter data
    const cleanData = {
      title: data.title || '',
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      author: data.author || 'Anonymous',
      excerpt: data.description || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      tldr: data.tldr || '',
    };

    return {
      slug,
      content,
      ...cleanData,
      tableOfContents,
      readingTime,
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    throw error;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));

  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export async function getRecommendedPosts(currentPost: BlogPost): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  
  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .filter((post) => 
      post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, 3);
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => 
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

import { Metadata } from 'next';
import { getPostsByTag, getAllPosts } from '@/utils/blog';
import { generateMetadata } from '@/lib/metadata';
import MysticalText from '@/components/MysticalText';
import Link from 'next/link';

export async function generateMetadata({
  params: { tag },
}: {
  params: { tag: string };
}): Promise<Metadata> {
  return generateMetadata({
    title: `Posts tagged with "${tag}"`,
    description: `Explore blog posts about ${tag} and related topics`,
  });
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).map((tag) => ({ tag }));
}

export default async function TagPage({
  params: { tag },
}: {
  params: { tag: string };
}) {
  const posts = await getPostsByTag(tag);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <MysticalText
            text={`Posts tagged with "${tag}"`}
            className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
          />
          <p className="text-gray-400">
            Found {posts.length} post{posts.length !== 1 ? 's' : ''}
          </p>
        </header>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="mystical-card p-6 hover:scale-[1.02] transition-transform"
            >
              <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.date}</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

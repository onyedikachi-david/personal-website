import { Metadata } from 'next';
import { getPostsByTag, getAllPosts } from '@/utils/blog';
import { generateSiteMetadata } from '@/utils/metadata';
import MysticalText from '@/components/MysticalText';
import Link from 'next/link';

export async function generateMetadata({
  params: { tag },
}: {
  params: { tag: string };
}): Promise<Metadata> {
  return generateSiteMetadata(
    `Posts tagged with "${tag}"`,
    `Explore blog posts about ${tag} and related topics`
  );
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
              <div className="flex gap-4 text-gray-400 text-sm mb-4">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString()}
                </time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className={`px-3 py-1 text-sm rounded-full ${
                      t === tag
                        ? 'bg-primary text-white'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

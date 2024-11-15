import { getAllPosts } from '@/utils/blog';
import { externalBlogPosts } from '@/data/external-blogs';
import BlogList from '@/components/BlogList';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-black">
      {/* Terminal-like grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <main className="relative pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <BlogList posts={posts} externalBlogPosts={externalBlogPosts} />
        </div>
      </main>
    </div>
  );
}
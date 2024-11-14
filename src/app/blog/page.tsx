import Link from 'next/link';
import { getAllPosts } from '@/utils/blog';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import { externalBlogPosts } from '@/data/external-blogs';
import ExternalBlogCard from '@/components/ExternalBlogCard';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-gray-900/20 to-gray-900 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_#80808012_1px,transparent_1px),linear-gradient(to_bottom,_#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <main className="relative pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 relative">
            <div className="relative inline-block">
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 mb-6">
                Tech Insights
              </h1>
              <div className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-gray-500/10 via-gray-400/10 to-gray-500/10 blur-xl opacity-50" />
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
              Exploring the frontiers of web development, blockchain, and software engineering
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="relative p-6 md:p-8 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500 overflow-hidden">
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-transparent to-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative">
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-4 group-hover:from-white group-hover:to-gray-200 transition-all duration-300">
                      {post.title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-4 h-4" />
                        <time>{new Date(post.date).toLocaleDateString()}</time>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiUser className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 mb-6 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50 transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        <span className="text-sm font-medium">Read More</span>
                        <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* External Blog Posts */}
          {externalBlogPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold mb-6">Posts from Around the Web</h2>
              <div className="grid gap-6">
                {externalBlogPosts.map((post) => (
                  <ExternalBlogCard key={post.url} post={post} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

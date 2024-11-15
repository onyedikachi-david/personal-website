'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowRight, FiTerminal } from 'react-icons/fi';
import ExternalBlogCard from '@/components/ExternalBlogCard';
import { Post } from '@/types/post';
import { ExternalBlogPost } from '@/types/ExternalBlog';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

interface BlogListProps {
  posts: Post[];
  externalBlogPosts: ExternalBlogPost[];
}

export default function BlogList({ posts, externalBlogPosts }: BlogListProps) {
  return (
    <React.Fragment>
      {/* Terminal Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-block bg-gray-900/80 rounded-t-xl p-3 backdrop-blur-sm border border-purple-500/20">
          <div className="flex items-center gap-2 px-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-gray-400 text-sm font-mono ml-2">~/blog</div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mt-8 mb-4">
          Tech Insights
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Exploring the frontiers of web development, blockchain, and software engineering
        </p>
      </motion.div>

      {/* Blog Posts Terminal Window */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gray-900/80 rounded-xl backdrop-blur-sm border border-purple-500/20 overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="border-b border-gray-800 p-4 flex items-center gap-2">
          <FiTerminal className="text-purple-400" />
          <span className="text-gray-400 font-mono text-sm">blog_posts.md</span>
        </div>

        {/* Blog Posts List */}
        <div className="p-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              variants={itemVariants}
              className="group mb-6 last:mb-0"
            >
              <Link href={`/blog/${post.slug}`}>
                <article className="relative p-4 rounded-lg hover:bg-purple-500/10 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-200 group-hover:text-purple-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 mt-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiUser className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* External Blog Posts */}
      {externalBlogPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-200 mb-8">External Publications</h2>
          <div className="grid gap-6">
            {externalBlogPosts.map((post, index) => (
              <ExternalBlogCard key={index} post={post} />
            ))}
          </div>
        </motion.div>
      )}
    </React.Fragment>
  );
}
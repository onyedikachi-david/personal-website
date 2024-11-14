'use client';

import { ExternalBlogPost } from '@/types/ExternalBlog';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaDev, FaMedium } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import {SiHashnode} from 'react-icons/si'

const platformIcons = {
  'Medium': FaMedium,
  'Dev.to': FaDev,
  'Hashnode': SiHashnode,
  'Other': HiExternalLink
};

export default function ExternalBlogCard({ post }: { post: ExternalBlogPost }) {
  const PlatformIcon = platformIcons[post.platform];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-lg bg-gray-800/50 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-400">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
        <div className="flex items-center gap-2">
          <PlatformIcon className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-400">{post.platform}</span>
        </div>
      </div>

      <Link 
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
          {post.title}
        </h3>
      </Link>

      <p className="text-gray-400 mb-4">{post.excerpt}</p>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-sm rounded-full bg-purple-500/10 text-purple-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

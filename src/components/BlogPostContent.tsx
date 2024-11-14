'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { mdxComponents } from './MDXComponents';
import { Suspense } from 'react';

interface BlogPostContentProps {
  source: MDXRemoteSerializeResult;
}

export default function BlogPostContent({ source }: BlogPostContentProps) {
  return (
    <Suspense fallback={<div>Loading content...</div>}>
      <MDXRemote {...source} components={mdxComponents} />
    </Suspense>
  );
}

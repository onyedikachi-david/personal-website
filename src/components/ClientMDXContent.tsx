'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from './MDXComponents';

interface ClientMDXContentProps {
  content: string;
}

export default function ClientMDXContent({ content }: ClientMDXContentProps) {
  return (
    <MDXRemote 
      source={content} 
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [
            require('remark-math'),
            require('remark-gfm'),
          ],
          rehypePlugins: [
            require('rehype-katex'),
            require('rehype-slug'),
          ],
        },
      }}
    />
  );
}

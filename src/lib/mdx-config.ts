import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { MDXOptions } from 'next-mdx-remote/rsc';

export const mdxOptions: MDXOptions = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
  // Add any other MDX plugins you want to use
};

// Add this to your layout or page where you render MDX content
export const stylesheets = [
  'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css'
];

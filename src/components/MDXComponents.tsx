'use client';

import { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import MermaidDiagram from './MermaidDiagram';
import MathRenderer from './MathRenderer';
import CodeBlock from './CodeBlock';

export const mdxComponents: MDXComponents = {
  // Override the default components
  img: (props) => {
    const { src, alt, width = 800, height = 400 } = props;
    return (
      <Image
        src={src as string}
        alt={alt as string}
        width={Number(width)}
        height={Number(height)}
        className="rounded-lg shadow-md my-4"
      />
    );
  },
  a: ({ href = '', ...props }) => (
    <Link href={href} {...props} className="text-purple-400 hover:text-purple-300 transition-colors" />
  ),
  // Code blocks
  pre: (props) => (
    <pre className="relative rounded-lg p-4 bg-gray-800 overflow-x-auto">
      {props.children}
    </pre>
  ),
  code: (props) => {
    const { children, className } = props;
    const language = className?.replace('language-', '');
    
    if (language === 'mermaid') {
      return <MermaidDiagram chart={children as string} />;
    }
    
    return (
      <CodeBlock className={className}>
        {children}
      </CodeBlock>
    );
  },
  // Custom components for math and diagrams
  MathDisplay: ({ children }: { children: string }) => (
    <div className="my-4">
      <MathRenderer math={children} display={true} />
    </div>
  ),
  MathInline: ({ children }: { children: string }) => (
    <span className="mx-1">
      <MathRenderer math={children} display={false} />
    </span>
  ),
  Mermaid: ({ chart }: { chart: string }) => (
    <MermaidDiagram chart={chart} />
  ),
  // Style basic HTML elements
  h1: (props) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
  ),
  p: (props) => (
    <p className="my-4 leading-relaxed" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc list-inside my-4 space-y-2" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside my-4 space-y-2" {...props} />
  ),
  li: (props) => (
    <li className="ml-4" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-4 border-purple-500 pl-4 my-4 italic" {...props} />
  ),
  hr: () => (
    <hr className="my-8 border-gray-700" />
  ),
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-700" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" {...props} />
  ),
  td: (props) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400" {...props} />
  ),
};

// Remark plugins for math and mermaid
export const remarkPlugins = {
  math: {
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
  },
  mermaid: {
    // Convert ```mermaid blocks to <Mermaid> components
    name: 'mermaid',
    element: 'Mermaid',
    value: 'chart',
  },
};

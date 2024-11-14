'use client';

import React, { useState } from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (typeof children === 'string') {
      try {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div className="code-block relative group">
      <button
        onClick={copyToClipboard}
        className="copy-button opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className={className}>{children}</pre>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useState } from 'react';

// Helper function to handle image paths
const getImagePath = (src: string) => {
  if (src.startsWith('http')) {
    return src;
  }
  // Handle local images from public directory
  if (src.startsWith('/')) {
    return src;
  }
  // Handle relative paths by prefixing with /images/blog/
  return `/images/blog/${src}`;
};

interface MDXImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function MDXImage({ src, alt, width = 800, height = 400, className }: MDXImageProps) {
  const [isError, setIsError] = useState(false);
  const imagePath = getImagePath(src);

  if (isError || !src) {
    return null;
  }

  // Use span instead of div to avoid hydration issues when wrapped in p tags
  return (
    <span className={`block my-8 ${className || ''}`}>
      <Image
        src={imagePath}
        alt={alt || ''}
        width={width}
        height={height}
        className="rounded-lg w-full"
        priority={true}
        onError={() => setIsError(true)}
      />
    </span>
  );
}

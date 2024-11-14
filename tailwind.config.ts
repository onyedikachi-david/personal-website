import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6200ff',
        secondary: '#4f46e5',
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              fontFamily: 'Fira Code, monospace',
              fontWeight: '400',
              backgroundColor: 'rgb(30, 30, 45)',
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: 'rgb(20, 20, 35)',
              code: {
                backgroundColor: 'transparent',
                padding: '0',
                fontFamily: 'Fira Code, monospace',
                fontSize: '0.875em',
              }
            },
            a: {
              color: '#8b5cf6',
              '&:hover': {
                color: '#7c3aed',
              },
            },
            h1: {
              color: '#fff',
              fontWeight: '700',
            },
            h2: {
              color: '#fff',
              fontWeight: '600',
            },
            h3: {
              color: '#fff',
              fontWeight: '600',
            },
            h4: {
              color: '#fff',
              fontWeight: '600',
            },
            p: {
              color: '#d1d5db',
            },
            strong: {
              color: '#fff',
            },
            blockquote: {
              color: '#9ca3af',
              borderLeftColor: '#6366f1',
            },
            'ul > li::before': {
              backgroundColor: '#6366f1',
            },
            'ol > li::before': {
              color: '#9ca3af',
            },
            hr: {
              borderColor: 'rgba(99, 102, 241, 0.2)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;

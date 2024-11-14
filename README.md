# David Anyatonwu's Portfolio Website

A modern, tech-forward portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a dynamic blog system, interactive UI elements, and sophisticated animations.

![Portfolio Preview](public/preview.png)

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Server Components**: Utilizing React Server Components for optimal performance
- **Dynamic Blog System**: MDX-based blog with:
  - Syntax highlighting with Prism.js
  - Math equations with KaTeX
  - Mermaid diagrams support
  - Reading progress indicator
  - Table of contents generation
- **OpenGraph Integration**: Enhanced social media sharing with dynamic metadata
- **Interactive UI**: Smooth animations and transitions using Framer Motion
- **Responsive Design**: Mobile-first approach with a clean, modern aesthetic
- **Performance Optimized**: Fast page loads and optimal SEO setup

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Content**: MDX
- **Icons**: React Icons
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/onyedikachi-david/personal-website.git
   cd personal-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Blog Post Creation

Create new blog posts in `src/content/blog` with the following frontmatter:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-01"
author: "David Anyatonwu"
tags: ["tag1", "tag2"]
tldr: "A brief summary of the post"
excerpt: "A longer description for previews"
---

Your content here...
```

### Supported MDX Features

- **Code Blocks**: Syntax highlighting with line numbers
  ````markdown
  ```typescript
  const hello = "world";
  ```
  ````

- **Math Equations**: Using KaTeX
  ```markdown
  Inline math: $E = mc^2$
  Block math: $$F = G\frac{m_1m_2}{r^2}$$
  ```

- **Mermaid Diagrams**:
  ````markdown
  ```mermaid
  graph TD;
      A-->B;
      B-->C;
  ```
  ````

## 🎨 Customization

### Theme Colors

The color scheme can be customized in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Your custom colors
    }
  }
}
```

### Animations

Animation configurations can be found in:
- `src/components/animations/`: Framer Motion animations
- `src/app/globals.css`: CSS animations

## 📱 Features by Page

### Home (/)
- Animated hero section
- Dynamic background effects
- Featured projects showcase

### About (/about)
- Professional background
- Skills and expertise
- Interactive elements

### Projects (/projects)
- Project cards with hover effects
- Filtering capabilities
- Detailed project information

### Blog (/blog)
- MDX-powered blog posts
- Reading progress indicator
- Table of contents
- Social sharing optimization

### Contact (/contact)
- Contact form
- Social media links
- Professional connections

## 🔧 Development

### Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript compiler

### Project Structure

```
personal-website/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── content/       # MDX content
│   ├── styles/        # Global styles
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── public/            # Static assets
└── tailwind.config.js # Tailwind configuration
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📬 Contact

David Anyatonwu - [@davidanyatonwu](https://twitter.com/davidanyatonwu)

Project Link: [https://github.com/onyedikachi-david/personal-website](https://github.com/onyedikachi-david/personal-website)

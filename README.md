# Learn Webiny - Course Platform

A modern, interactive learning platform built with Next.js, MDX, and TypeScript. Create beautiful, engaging courses with syntax-highlighted code examples, quizzes, and custom components.

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
yarn

# Start development server with auto-registry updates
yarn dev

# Build for production
yarn build
```

## 📚 Creating Content

### 1. Registering Chapters

Chapters are defined in `lib/chapter-metadata.ts`. This is the single source of truth for chapter information.

**File:** `lib/chapter-metadata.ts`

```typescript
export const chapterMetadata: Record<string, ChapterMetadata> = {
  'your-chapter-slug': {
    number: 7,                           // Chapter order
    title: 'Your Chapter Title',         // Display name
    description: 'Brief description',    // Chapter description
    icon: 'rocket'                       // Icon type (see below)
  }
}
```

#### Available Icons

- `book` - Documentation/reading
- `rocket` - Getting started/launch
- `palette` - Design/visual
- `edit` - Editing/CMS
- `cloud` - Cloud/serverless
- `zap` - Performance/speed

### 2. Creating Lessons

Lessons are automatically discovered from the file system. Just create a `.mdx` file in the appropriate chapter folder!

#### Step 1: Create the MDX file

```bash
# Create a new lesson file
mkdir -p content/lessons/your-chapter-slug
touch content/lessons/your-chapter-slug/your-lesson.mdx
```

#### Step 2: Add frontmatter

Every lesson needs frontmatter at the top:

```mdx
---
title: "Your Lesson Title"
description: "Brief description of what this lesson covers"
author: "Your Name"
date: "2024-01-15"
estimatedTime: "15 min"
difficulty: "beginner"
---

# Your Lesson Content Here

This is your lesson content...
```

#### Step 3: Write your content

Use Markdown and custom MDX components (see below).

#### Step 4: Auto-reload

If you're running `npm run dev:auto`, the lesson will **automatically appear** in the sidebar!

### File Structure

```
content/
  lessons/
    chapter-slug/
      lesson-1.mdx
      lesson-2.mdx
      another-lesson.mdx
```

**Slug Format:**
- If filename matches chapter: `chapter-slug` → `/course/chapter-slug`
- Otherwise: `chapter-slug/lesson-name` → `/course/chapter-slug/lesson-name`

---

## 🎨 MDX Components

Your lessons have access to powerful custom components. Here's how to use them:

### CodeBlock

Display syntax-highlighted code with copy functionality.

**Basic Usage:**
```mdx
<CodeBlock language="typescript" filename="example.ts" code={`
function hello(name: string) {
  return \`Hello, \${name}!\`;
}
`} />
```

**With Pre-defined Variable:**
```mdx
export const myCode = `
const greeting = "Hello World";
console.log(greeting);
`;

<CodeBlock language="javascript" filename="app.js" code={myCode} />
```

**Props:**
- `language` (required): `typescript`, `javascript`, `jsx`, `tsx`, `python`, `bash`, `json`, etc.
- `filename` (optional): Shows filename in header
- `code` (required): The code string to display

**Features:**
- ✅ Syntax highlighting with Shiki
- ✅ Theme-aware (light/dark mode)
- ✅ Copy to clipboard button
- ✅ File type icons
- ✅ Line numbers

---

### Image

Display images with click-to-fullscreen functionality.

**Basic Usage:**
```mdx
<Image src="/images/screenshot.png" alt="Dashboard screenshot" />
```

**With Caption:**
```mdx
<Image 
  src="/images/diagram.png" 
  alt="Architecture diagram"
  title="The complete system architecture - click to enlarge"
/>
```

**Custom Dimensions:**
```mdx
<Image 
  src="/images/photo.jpg" 
  alt="Photo"
  width={1200}
  height={800}
/>
```

**Props:**
- `src` (required): Path to image (place images in `public/images/`)
- `alt` (optional): Alt text for accessibility
- `title` (optional): Caption shown below image
- `width` (optional): Width in pixels (default: 800)
- `height` (optional): Height in pixels (default: 600)

**Features:**
- ✅ Click to view fullscreen
- ✅ ESC or click outside to close
- ✅ Next.js Image optimization
- ✅ Responsive
- ✅ Zoom indicator on hover

---

### ExternalLink

Create external links that open in a new tab with proper security.

**Basic Usage:**
```mdx
<ExternalLink href="https://www.webiny.com">Visit Webiny</ExternalLink>
```

**Without Icon:**
```mdx
<ExternalLink href="https://docs.webiny.com" showIcon={false}>
  Documentation
</ExternalLink>
```

**In Lists:**
```mdx
Resources:
- <ExternalLink href="https://docs.webiny.com">Documentation</ExternalLink>
- <ExternalLink href="https://github.com/webiny/webiny-js">GitHub</ExternalLink>
- <ExternalLink href="https://www.webiny.com/blog">Blog</ExternalLink>
```

**Props:**
- `href` (required): URL to link to
- `children` (required): Link text
- `showIcon` (optional): Show external link icon (default: true)

**Features:**
- ✅ Opens in new tab
- ✅ Security attributes (`rel="noopener noreferrer"`)
- ✅ External link icon
- ✅ Theme-aware styling

---

### Quiz

Add interactive quizzes to test knowledge.

**Basic Usage:**
```mdx
<Quiz 
  question="What is Webiny built with?"
  options={[
    "PHP and MySQL",
    "Node.js and React",
    "Ruby on Rails",
    "Python and Django"
  ]}
  correctAnswer={1}
  explanation="Webiny is built with Node.js on the backend and React on the frontend."
/>
```

**Props:**
- `question` (required): The question text
- `options` (required): Array of answer options
- `correctAnswer` (required): Index of correct answer (0-based)
- `explanation` (optional): Explanation shown after answering

**Features:**
- ✅ Interactive selection
- ✅ Instant feedback
- ✅ Explanation on answer
- ✅ Visual indicators (correct/incorrect)

---

### Callout

Highlight important information with styled callouts.

**Types:**

**Info (default):**
```mdx
<Callout>
This is an informational callout with useful tips.
</Callout>
```

**Warning:**
```mdx
<Callout type="warning">
⚠️ **Warning:** This action cannot be undone!
</Callout>
```

**Tip:**
```mdx
<Callout type="tip">
💡 **Pro Tip:** Use keyboard shortcuts to speed up your workflow.
</Callout>
```

**Error:**
```mdx
<Callout type="error">
❌ **Error:** Make sure to install dependencies first.
</Callout>
```

**Props:**
- `type` (optional): `info`, `warning`, `tip`, `error` (default: `info`)
- `children` (required): Content to display

**Features:**
- ✅ Color-coded by type
- ✅ Icon indicators
- ✅ Markdown support in content
- ✅ Theme-aware

---

### ChapterOverview

Display a list of chapter topics at the beginning of a lesson.

**Usage:**
```mdx
<ChapterOverview 
  items={[
    { icon: "file", text: "Setting up your environment" },
    { icon: "pencil", text: "Creating your first project" },
    { icon: "code", text: "Building with components" },
    { icon: "check", text: "Testing and deployment" }
  ]} 
/>
```

**Available Icons:**
- `file` - Files/documents
- `pencil` - Editing/writing
- `code` - Coding/development
- `check` - Completion/success
- `alert` - Warnings/important
- `info` - Information

**Features:**
- ✅ Clean, organized layout
- ✅ Icon indicators
- ✅ Responsive design

---

## 📝 Complete Lesson Example

Here's a full example showing multiple components:

```mdx
---
title: "Building Your First Component"
description: "Learn how to create reusable React components"
author: "Your Name"
date: "2024-01-15"
estimatedTime: "20 min"
difficulty: "beginner"
---

# Building Your First Component

In this lesson, you'll learn how to create reusable React components.

<ChapterOverview 
  items={[
    { icon: "file", text: "Understanding component structure" },
    { icon: "code", text: "Writing your first component" },
    { icon: "check", text: "Testing your component" }
  ]} 
/>

## What You'll Build

<Image 
  src="/images/component-example.png" 
  alt="Example component"
  title="The component we'll build in this lesson"
/>

## Getting Started

First, create a new file for your component:

export const componentCode = \`
import React from 'react';

export function HelloWorld() {
  return <h1>Hello, World!</h1>;
}
\`;

<CodeBlock language="tsx" filename="HelloWorld.tsx" code={componentCode} />

<Callout type="tip">
💡 **Pro Tip:** Always use PascalCase for component names!
</Callout>

## Learn More

Check out the official <ExternalLink href="https://react.dev">React documentation</ExternalLink> for more details.

<Quiz 
  question="What naming convention should you use for React components?"
  options={[
    "camelCase",
    "PascalCase",
    "snake_case",
    "kebab-case"
  ]}
  correctAnswer={1}
  explanation="React components should use PascalCase (e.g., HelloWorld, UserProfile)."
/>
```

---

## 🎯 Best Practices

### Writing Great Lessons

1. **Start with frontmatter** - Always include title, description, and metadata
2. **Use ChapterOverview** - Give learners a roadmap at the start
3. **Break up content** - Use headings to organize sections
4. **Add visuals** - Include images and diagrams
5. **Use Callouts** - Highlight important information
6. **Include examples** - Show code with CodeBlock
7. **Test knowledge** - Add quizzes at the end
8. **Link to resources** - Use ExternalLink for additional reading

### Code Examples

- Use descriptive filenames
- Keep code snippets focused and concise
- Explain what the code does
- Use comments in complex examples

### Images

- Place images in `public/images/`
- Use descriptive filenames
- Always provide alt text
- Keep file sizes under 2MB
- Use appropriate formats (PNG for screenshots, JPG for photos, SVG for diagrams)

---

## 🛠️ Technical Details

### Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **MDX:** @next/mdx
- **Code Highlighting:** Shiki
- **Icons:** Lucide React
- **UI Components:** Radix UI

### Project Structure

```
learn-webiny/
├── app/                      # Next.js app directory
│   ├── course/              # Course pages
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # UI primitives
│   └── ...                  # Custom components
├── content/
│   └── lessons/             # Lesson MDX files
│       ├── chapter-1/
│       ├── chapter-2/
│       └── ...
├── lib/
│   ├── chapter-metadata.ts  # Chapter definitions
│   ├── mdx-registry.ts      # Auto-generated registry
│   └── mdx-loader.ts        # MDX loading logic
├── scripts/
│   ├── generate-mdx-registry.mjs  # Registry generator
│   └── watch-mdx-lessons.mjs      # File watcher
├── mdx-components.tsx       # MDX component mappings
└── next.config.mjs          # Next.js configuration
```

### Auto-Registry System

The lesson registry is automatically managed:

1. **Development** (`npm run dev:auto`):
   - Generates registry on start
   - Watches for file changes
   - Auto-regenerates when lessons added/removed

2. **Production** (`npm run build`):
   - Regenerates registry before build
   - Ensures all lessons included
   - No manual intervention needed

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Connect your GitHub repo to Vercel
# Vercel will automatically:
# 1. Run npm run build (which includes registry generation)
# 2. Deploy your site
```

### Other Platforms

Make sure your build command runs:
```bash
npm run build
```

This automatically:
1. Generates the MDX registry
2. Builds the Next.js application

---

## 📖 Additional Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **MDX Documentation:** https://mdxjs.com
- **Tailwind CSS:** https://tailwindcss.com
- **Webiny:** https://www.webiny.com

---

## 🤝 Contributing

1. Create a new chapter in `lib/chapter-metadata.ts`
2. Add lesson files to `content/lessons/your-chapter/`
3. Use MDX components to enhance content
4. Test locally with `yarn dev`
5. Submit a pull request

---

## 📄 License

MIT 

---

**Built with ❤️ for the Webiny community**


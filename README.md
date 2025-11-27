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
    icon: 'rocket_launch'                // Material Icon name (see below)
  }
}
```

#### Available Icons

Chapters use **Google Material Icons**. You can use any icon from [Google Material Icons](https://fonts.google.com/icons).

**Popular Chapter Icons:**
- `menu_book` - Documentation/reading
- `rocket_launch` - Getting started/launch
- `palette` - Design/visual
- `edit` - Editing/CMS
- `cloud` - Cloud/serverless
- `bolt` - Performance/speed
- `emoji_events` - Foundation/achievement
- `school` - Learning/education
- `construction` - Building/setup
- `api` - APIs/integration
- `security` - Security/permissions
- `storage` - Database/storage

**More icons:** Browse the full collection at [Google Material Icons](https://fonts.google.com/icons)

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
order: 1                                 # Optional: Controls lesson order in sidebar (lower = first)
author: "Your Name"                      # Optional
date: "2024-01-15"                       # Optional
estimatedTime: "15 min"                  # Optional
difficulty: "beginner | intermediate | advanced"  # Optional
---

# Your Lesson Content Here

This is your lesson content...
```

**Lesson Ordering:**
- Add an `order` field to control the sequence of lessons within a chapter
- Lessons with lower order numbers appear first (e.g., `order: 1`, `order: 2`, `order: 3`)
- Lessons without an `order` field are sorted alphabetically and appear after ordered lessons
- The order only affects lessons within the same chapter

**Example:**
```mdx
# First lesson in the chapter
---
title: "Introduction"
order: 1
---

# Second lesson in the chapter
---
title: "Getting Started"
order: 2
---

# Third lesson in the chapter
---
title: "Advanced Topics"
order: 3
---
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
<Image src="/images/screenshot.png" title="Dashboard screenshot" />
```

**Alt text usage:**
```mdx
<Image src="/images/screenshot.png" alt="Dashboard screenshot" />
```

A title prop is displayed as a caption below the image. An alt prop provides accessibility text and is not visible.
An image requires either a `title` or `alt` prop for accessibility. If both are not provided, an error will be shown.

**Custom Dimensions:**
```mdx
<Image 
  src="/images/photo.jpg" 
  title="Photo"
  width={1200}
  height={800}
/>
```

**Props:**
- `src` (required): Path to image (place images in `public/images/`)
- `title` (optional): Caption shown below image
- `alt` (optional): Alt text for accessibility
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
- `explanation` (optional): Explanation shown after answering correctly
- `hint` Hint shown after answering incorrectly

**Features:**
- ✅ Interactive selection
- ✅ Instant feedback
- ✅ Explanation on answer
- ✅ Visual indicators (correct/incorrect)

---

### Callout

Highlight important information with styled callouts.

**Types:**

**Info:**
```mdx
<Callout type="info">
This is an informational callout with useful tips.
</Callout>
```

**Warning:**
```mdx
<Callout type="warning">
⚠️ **Warning:** This action cannot be undone!
</Callout>
```

**Hint:**
```mdx
<Callout type="hint">
💡 **Tip:** Use keyboard shortcuts to speed up your workflow.
</Callout>
```

**Success:**
```mdx
<Callout type="success">
✅ **Success:** Your project is now deployed!
</Callout>
```

**Question:**
```mdx
<Callout type="question">
🤔 **Think about it:** How would you structure this for scalability?
</Callout>
```

**Props:**
- `type` (optional): `info`, `warning`, `hint`, `success`, `question` (default: `info`)
- `title` (optional): Custom title to display
- `children` (required): Content to display

**Features:**
- ✅ Color-coded by type
- ✅ Icon indicators
- ✅ Markdown support in content
- ✅ Theme-aware
- ✅ Custom titles

---

### PaidFeature

Highlight features that are only available in paid Webiny tiers.

**Business Tier (includes Enterprise):**
```mdx
<PaidFeature tier="business">
Advanced multi-tenancy features including custom tenant hierarchies and granular access control are available in Webiny Business and Enterprise tiers.
</PaidFeature>
```

**Enterprise Tier Only:**
```mdx
<PaidFeature tier="enterprise">
SSO integration and advanced security features are exclusively available in Webiny Enterprise tier.
</PaidFeature>
```

**With Custom Message:**
```mdx
<PaidFeature tier="business" message="Custom branding options require a Business or Enterprise license.">
Learn how to customize your Webiny instance branding.
</PaidFeature>
```

**Props:**
- `tier` (required): `"business"` or `"enterprise"`
  - `business`: Feature available in Business AND Enterprise tiers
  - `enterprise`: Feature available ONLY in Enterprise tier
- `message` (optional): Custom message to display
- `children` (optional): Custom content (alternative to message)

**Features:**
- ✅ Visual tier badge (💎 Business or 💎 Enterprise)
- ✅ Color-coded by tier (blue for business, purple for enterprise)
- ✅ Clear availability indication
- ✅ Theme-aware styling
- ✅ Icon indicators

**Default Messages:**
- Business: "This feature is available in Webiny Business and Enterprise tiers."
- Enterprise: "This feature is available exclusively in Webiny Enterprise tier."

---

### ChapterOverview

Display a list of chapter topics at the beginning of a lesson.

**Usage:**
```mdx
<ChapterOverview 
  items={[
    { icon: "description", text: "Setting up your environment" },
    { icon: "edit", text: "Creating your first project" },
    { icon: "code", text: "Building with components" },
    { icon: "check_circle", text: "Testing and deployment" }
  ]} 
/>
```

**Icon Options:**

You can use **any icon** from [Google Material Icons](https://fonts.google.com/icons). Just use the icon name in lowercase with underscores.

**Popular Icons:**
- `description` - Files/documents
- `edit` - Editing/writing
- `code` - Coding/development
- `check_circle` - Completion/success
- `warning` - Warnings/alerts
- `info` - Information
- `settings` - Configuration
- `folder` - Folders/organization
- `terminal` - Command line
- `api` - APIs/endpoints
- `security` - Security/permissions
- `database` - Databases
- `cloud` - Cloud/hosting
- `bolt` - Performance/speed
- `lock` - Security/privacy
- `shield` - Protection/safety

**More Icons:** Browse the full collection at [Google Material Icons](https://fonts.google.com/icons)

**Props:**
- `items` (required): Array of `{ icon: string, text: string }` objects
- `topics` (alternative): Same as `items` (supports both prop names)

**Features:**
- ✅ Clean, organized layout
- ✅ Access to 2000+ Material Icons
- ✅ Theme-aware styling
- ✅ Responsive design

---

### IconTitle

Create visually appealing headings with Material Icons.

**Basic Usage (default h2):**
```mdx
<IconTitle icon="rocket_launch" title="Getting Started" />
```

**With Different Heading Levels:**
```mdx
<IconTitle icon="settings" title="Configuration" heading="h3" />
<IconTitle icon="code" title="Implementation Details" heading="h4" />
<IconTitle icon="info" title="Important Note" heading="h5" />
```

**Examples with Different Icons:**
```mdx
<IconTitle icon="lightbulb" title="Key Concepts" heading="h2" />
<IconTitle icon="terminal" title="Command Line Usage" heading="h3" />
<IconTitle icon="shield" title="Security Best Practices" heading="h2" />
<IconTitle icon="database" title="Database Schema" heading="h3" />
```

**Props:**
- `icon` (required): Material Icon name (e.g., `"rocket_launch"`, `"code"`, `"settings"`)
- `title` (required): The heading text to display
- `heading` (optional): Heading level - `"h1"`, `"h2"`, `"h3"`, `"h4"`, `"h5"`, `"h6"` (default: `"h2"`)

**Icon Options:**

Use **any icon** from [Google Material Icons](https://fonts.google.com/icons). Popular choices:
- `rocket_launch` - Launch/getting started
- `lightbulb` - Ideas/tips
- `terminal` - Command line
- `code` - Code/development
- `settings` - Configuration
- `shield` - Security
- `database` - Data/storage
- `api` - APIs
- `build` - Building/construction
- `speed` - Performance

**Features:**
- ✅ Automatic icon sizing per heading level
- ✅ Theme-aware icon colors (primary)
- ✅ 2000+ Material Icons available
- ✅ Semantic HTML headings

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

---

## 🔍 SEO & Discoverability

The platform includes comprehensive SEO features for optimal discoverability:

### Metadata

Every page includes optimized metadata:

- **Homepage:** Default metadata with Open Graph and Twitter Card tags
- **Course Page:** Overview metadata with course information
- **Lesson Pages:** Dynamic metadata generated from lesson frontmatter
  - Includes chapter context
  - Uses lesson title and description
  - Proper meta tags for social sharing

### Sitemap (sitemap.xml)

Automatically generated sitemap includes:
- Homepage
- Course overview page
- All lesson pages (dynamically discovered)

**Location:** `/sitemap.xml`  
**Updates:** Automatically regenerates based on MDX registry

### Robots.txt

Configures search engine crawling behavior:
- Allows all crawlers
- References sitemap location
- Ready for future private route exclusions

**Locations:**
- Dynamic: `app/robots.ts` (Next.js App Router)
- Static: `public/robots.txt` (fallback)

### AI Training Files

Support for AI/LLM training and context:

#### llm.txt / llms.txt

Comprehensive documentation for AI models including:
- Platform overview and purpose
- Content structure and organization
- Topics covered in the course
- Technical stack information
- Available MDX components
- Learning features
- Best use cases for AI training
- Attribution and contact information

**Locations:**
- `public/llm.txt`
- `public/llms.txt` (both files have identical content for compatibility)

These files help AI models understand the platform structure and provide better assistance to users learning Webiny.

### SEO Best Practices

When creating content:

1. **Frontmatter is Critical**
   ```mdx
   ---
   title: "Clear, Descriptive Title"
   description: "Compelling 150-160 character description"
   ---
   ```

2. **Use Semantic Heading Structure**
   - One `<h1>` per lesson (automatically from title)
   - Use `##` for main sections
   - Use `###` for subsections

3. **Add Title Text to Images**
   ```mdx
   <Image src="/path/to/image.png" title="Descriptive alt text" />
   ```

4. **Link to External Resources**
   ```mdx
   <ExternalLink href="https://docs.webiny.com">Official Documentation</ExternalLink>
   ```

---

## 🚀 Deployment### Other Platforms

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


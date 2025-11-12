# Complete Guide: Using Frontmatter in Your Lessons

## Quick Start

### 1. Install Required Packages

```bash
pnpm add remark-frontmatter remark-mdx-frontmatter
```

Or use the helper script:
```bash
chmod +x install-frontmatter-support.sh
./install-frontmatter-support.sh
```

### 2. Restart Development Server

```bash
pnpm dev
```

---

## Adding Frontmatter to Your Lessons

### Basic Example

```mdx
---
title: "My Lesson Title"
---

# My Lesson Title

Your content here...
```

### Enhanced Example with All Fields

```mdx
---
title: "Advanced Serverless Patterns"
description: "Deep dive into advanced serverless architectures with Webiny"
author: "Webiny Team"
date: "2025-11-11"
difficulty: "advanced"
estimatedTime: "45 minutes"
tags: ["serverless", "advanced", "architecture", "aws"]
prerequisites: ["serverless/architecture", "serverless/deployment"]
---

# Advanced Serverless Patterns

Your content here...
```

---

## Displaying Metadata in Your Lessons

### Option 1: Use the LessonMetadata Component

I've created a ready-to-use component at `components/lesson-metadata.tsx`.

**Add it to your lesson page:**

```tsx
// In app/course/[...slug]/page.tsx
import { LessonMetadata } from "@/components/lesson-metadata"

// Inside your component:
<LessonContentWrapper>
  <LessonMetadata frontmatter={frontmatter} />
  <MDXComponent />
</LessonContentWrapper>
```

This will automatically display:
- Author with icon
- Date with icon
- Estimated time with icon
- Difficulty badge
- Description
- Tags as badges
- Prerequisites list

### Option 2: Custom Implementation

Access frontmatter directly in your page component:

```tsx
const { Component: MDXComponent, frontmatter } = mdxContent

// Use any field:
{frontmatter.description && (
  <p className="text-muted-foreground mb-4">
    {frontmatter.description}
  </p>
)}

{frontmatter.tags && (
  <div className="flex gap-2 mb-4">
    {frontmatter.tags.map(tag => (
      <Badge key={tag}>{tag}</Badge>
    ))}
  </div>
)}
```

---

## Complete Integration Example

### Update your lesson page:

```tsx
// app/course/[...slug]/page.tsx
import { notFound } from "next/navigation"
import { CourseSidebar } from "@/components/course-sidebar"
import { LessonHeader } from "@/components/lesson-header"
import { LessonContentWrapper } from "@/components/lesson-content-wrapper"
import { LessonNavigation } from "@/components/lesson-navigation"
import { LessonMetadata } from "@/components/lesson-metadata"
import { getLessonBySlug, getNextLesson, getPreviousLesson, isLastLessonInChapter } from "@/lib/course-data"
import { loadMDXContent } from "@/lib/mdx-loader"

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params
  const lessonSlug = slug.join("/")

  const lessonData = getLessonBySlug(lessonSlug)
  if (!lessonData) notFound()

  const { chapter, lesson } = lessonData
  const mdxContent = await loadMDXContent(lessonSlug)
  if (!mdxContent) notFound()

  const { Component: MDXComponent, frontmatter } = mdxContent
  const displayTitle = frontmatter.title || lesson.title

  const nextLesson = getNextLesson(lessonSlug)
  const previousLesson = getPreviousLesson(lessonSlug)
  const isLastLesson = isLastLessonInChapter(lessonSlug)

  return (
    <div className="flex min-h-screen">
      <CourseSidebar />

      <div className="flex-1 flex flex-col">
        <LessonHeader title={displayTitle} chapterTitle={chapter.title} />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <LessonContentWrapper 
              lessonSlug={lessonSlug} 
              lessonTitle={displayTitle} 
              chapterTitle={chapter.title}
            >
              {/* Display lesson metadata */}
              <LessonMetadata frontmatter={frontmatter} />
              
              {/* Render MDX content */}
              <MDXComponent />
            </LessonContentWrapper>

            <LessonNavigation
              currentSlug={lessonSlug}
              previousLesson={previousLesson}
              nextLesson={nextLesson}
              isLastLessonInChapter={isLastLesson}
              currentChapterId={chapter.id}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
```

---

## Available Frontmatter Fields

### Standard Fields (predefined in interface)

- `title` - Lesson title
- `description` - Short description
- `date` - Publication date
- `author` - Author name
- `tags` - Array of tags

### Custom Fields (you can add anything!)

```yaml
---
title: "My Lesson"
difficulty: "beginner"
estimatedTime: "20 minutes"
prerequisites: ["lesson-1", "lesson-2"]
videoUrl: "https://youtube.com/..."
githubRepo: "https://github.com/..."
relatedLessons: ["lesson-x", "lesson-y"]
---
```

Access custom fields with TypeScript:

```tsx
// TypeScript knows about custom fields via [key: string]: any
const difficulty = frontmatter.difficulty
const time = frontmatter.estimatedTime
```

---

## TypeScript Types

The frontmatter is fully typed:

```typescript
interface MDXFrontmatter {
  title?: string
  description?: string
  date?: string
  author?: string
  tags?: string[]
  [key: string]: any  // Allows any custom fields
}

interface MDXContent {
  Component: ComponentType
  frontmatter: MDXFrontmatter
}
```

---

## Advanced Usage Ideas

### 1. Filter Lessons by Tag

```tsx
// In a new page: app/tags/[tag]/page.tsx
const allLessons = await getAllLessonsWithFrontmatter()
const filteredLessons = allLessons.filter(lesson => 
  lesson.frontmatter.tags?.includes(params.tag)
)
```

### 2. Display Prerequisites with Links

```tsx
{frontmatter.prerequisites && (
  <div className="mb-4 p-4 border rounded-lg">
    <h3>Prerequisites</h3>
    <ul>
      {frontmatter.prerequisites.map(slug => {
        const prereqLesson = getLessonBySlug(slug)
        return (
          <li key={slug}>
            <Link href={`/course/${slug}`}>
              {prereqLesson?.lesson.title || slug}
            </Link>
          </li>
        )
      })}
    </ul>
  </div>
)}
```

### 3. Sort Lessons by Difficulty

```tsx
const sortedLessons = lessons.sort((a, b) => {
  const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 }
  return difficultyOrder[a.frontmatter.difficulty] - 
         difficultyOrder[b.frontmatter.difficulty]
})
```

### 4. Generate SEO Meta Tags

```tsx
// In your page component:
export async function generateMetadata({ params }) {
  const slug = params.slug.join("/")
  const mdxContent = await loadMDXContent(slug)
  
  return {
    title: mdxContent?.frontmatter.title,
    description: mdxContent?.frontmatter.description,
    authors: [{ name: mdxContent?.frontmatter.author }],
    keywords: mdxContent?.frontmatter.tags,
  }
}
```

---

## Files Reference

- `lib/mdx-loader.ts` - Core loader with frontmatter support
- `components/lesson-metadata.tsx` - Ready-to-use metadata display component
- `EXAMPLE_ENHANCED_MDX.mdx` - Complete example with all fields
- `FRONTMATTER_SUPPORT.md` - Detailed technical documentation

---

## Troubleshooting

### Frontmatter not showing?

1. Make sure packages are installed:
   ```bash
   pnpm add remark-frontmatter remark-mdx-frontmatter
   ```

2. Restart the dev server:
   ```bash
   pnpm dev
   ```

3. Check console for logs:
   ```
   [MDX Loader] Successfully loaded MDX for slug: introduction { title: "..." }
   ```

### TypeScript errors?

Make sure you're destructuring correctly:
```tsx
const { Component, frontmatter } = mdxContent
// NOT: const MDXComponent = mdxContent
```

---

## Summary

You now have full frontmatter support! 🎉

✅ Extract metadata from MDX files
✅ Display lesson metadata beautifully
✅ Add custom fields as needed
✅ Type-safe with TypeScript
✅ Ready-to-use component included
✅ No breaking changes

Start adding rich metadata to your lessons and enhance the learning experience!


# Frontmatter Support Added

## Overview

Frontmatter parsing has been successfully added to the MDX loader. The application can now extract and use metadata from the frontmatter section of MDX files.

## Changes Made

### 1. Updated `lib/mdx-loader.ts`
- Added `MDXFrontmatter` interface for type-safe frontmatter data
- Added `MDXContent` interface that includes both Component and frontmatter
- Modified `loadMDXContent()` to return both the MDX component and its frontmatter
- Extracts frontmatter from the MDX module's exports

### 2. Updated `app/course/[...slug]/page.tsx`
- Modified to destructure MDX content into `Component` and `frontmatter`
- Uses frontmatter title if available, otherwise falls back to lesson title from course data
- Logs frontmatter data for debugging

### 3. Updated `next.config.mjs`
- Added `remark-frontmatter` plugin to parse frontmatter syntax
- Added `remark-mdx-frontmatter` plugin to export frontmatter as named exports

## Required Package Installation

**IMPORTANT**: You need to install the remark plugins for frontmatter support:

```bash
pnpm add remark-frontmatter remark-mdx-frontmatter
```

Or if using npm:
```bash
npm install remark-frontmatter remark-mdx-frontmatter
```

## How It Works

### Frontmatter in MDX Files

MDX files can include frontmatter at the top using YAML syntax:

```mdx
---
title: "Welcome to Learn Webiny"
description: "A comprehensive guide to building serverless applications"
author: "Webiny Team"
date: "2025-11-11"
tags: ["webiny", "serverless", "tutorial"]
---

# Your content here
```

### Accessing Frontmatter

The frontmatter is now available throughout your application:

```typescript
const mdxContent = await loadMDXContent("introduction")

if (mdxContent) {
  const { Component, frontmatter } = mdxContent
  
  console.log(frontmatter.title)       // "Welcome to Learn Webiny"
  console.log(frontmatter.description) // "A comprehensive guide..."
  console.log(frontmatter.author)      // "Webiny Team"
  console.log(frontmatter.tags)        // ["webiny", "serverless", "tutorial"]
}
```

## Current Usage

The lesson page now:
1. Loads MDX content with `loadMDXContent()`
2. Extracts both the Component and frontmatter
3. Uses the frontmatter title as the display title (with fallback to course data title)
4. Logs frontmatter data to console for debugging

## Frontmatter Interface

```typescript
export interface MDXFrontmatter {
  title?: string
  description?: string
  date?: string
  author?: string
  tags?: string[]
  [key: string]: any  // Allows any additional custom fields
}
```

## Examples of What You Can Do

### 1. Display Lesson Metadata
```tsx
{frontmatter.description && (
  <p className="text-muted-foreground">{frontmatter.description}</p>
)}
```

### 2. Show Author and Date
```tsx
{frontmatter.author && (
  <div className="text-sm">
    By {frontmatter.author} on {frontmatter.date}
  </div>
)}
```

### 3. Filter by Tags
```tsx
{frontmatter.tags && (
  <div className="flex gap-2">
    {frontmatter.tags.map(tag => (
      <Badge key={tag}>{tag}</Badge>
    ))}
  </div>
)}
```

### 4. Use Custom Fields
```mdx
---
title: "Advanced Lesson"
difficulty: "advanced"
estimatedTime: "30 minutes"
prerequisites: ["lesson-1", "lesson-2"]
---
```

Access with:
```typescript
console.log(frontmatter.difficulty)      // "advanced"
console.log(frontmatter.estimatedTime)   // "30 minutes"
console.log(frontmatter.prerequisites)   // ["lesson-1", "lesson-2"]
```

## Testing

After installing the packages:

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the dev server:
   ```bash
   pnpm dev
   ```

3. Navigate to any lesson page

4. Check the browser console - you should see:
   ```
   [MDX Loader] Successfully loaded MDX for slug: introduction { title: "Welcome to Learn Webiny" }
   [v0] MDX component loaded successfully { frontmatter: { title: "Welcome to Learn Webiny" } }
   ```

## Current Frontmatter in Lessons

The introduction lesson already has frontmatter:
```yaml
---
title: "Welcome to Learn Webiny"
---
```

You can add more fields to any MDX file and they will be automatically extracted and available.

## Next Steps

You can now:
- Add more frontmatter fields to your MDX files
- Use frontmatter data in your components
- Create filters or navigation based on metadata
- Generate SEO meta tags from frontmatter
- Display lesson metadata to users
- Sort or categorize lessons by tags, difficulty, etc.


# Automatic Lesson Discovery - Implementation Complete ✅

## Overview
The MDX loader has been refactored to automatically discover and load lessons from the filesystem. You no longer need to manually register each lesson!

## What Changed

### Before (Manual Registration Required)
```typescript
// Had to manually add each lesson to a switch statement
switch (slug) {
  case "introduction":
    mdxModule = await import("@/content/lessons/introduction/introduction.mdx")
    break
  case "getting-started/setup":
    mdxModule = await import("@/content/lessons/getting-started/setup.mdx")
    break
  // ... many more cases
}

// And also maintain a separate pathMap
const pathMap: Record<string, string> = {
  "introduction": path.join(contentDir, "introduction", "introduction.mdx"),
  "getting-started/setup": path.join(contentDir, "getting-started", "setup.mdx"),
  // ... many more entries
}
```

### After (Automatic Discovery)
```typescript
// Automatically scans the filesystem
function discoverLessons(): Record<string, string> {
  const contentDir = path.join(process.cwd(), "content", "lessons")
  const pathMap: Record<string, string> = {}

  // Read all chapter directories
  const chapters = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))

  for (const chapter of chapters) {
    const chapterPath = path.join(contentDir, chapter.name)
    
    // Read all MDX files in the chapter directory
    const files = fs.readdirSync(chapterPath)
      .filter(file => file.endsWith('.mdx'))

    for (const file of files) {
      const fileName = file.replace('.mdx', '')
      const filePath = path.join(chapterPath, file)
      
      // Create slug automatically
      const slug = fileName === chapter.name 
        ? chapter.name 
        : `${chapter.name}/${fileName}`
      
      pathMap[slug] = filePath
    }
  }

  return pathMap
}

// Uses glob imports to load all MDX files dynamically
const modules = import.meta.glob<{ default: ComponentType }>(
  "@/content/lessons/**/*.mdx",
  { eager: false }
)
```

## How to Add New Lessons

### 1. Create Your MDX File
Simply drop a new `.mdx` file in the appropriate chapter directory:

```bash
content/
  lessons/
    your-chapter/
      your-lesson.mdx    # ← Just add this file!
```

### 2. Slug Generation Rules

The system automatically generates slugs based on file paths:

| File Path | Generated Slug |
|-----------|---------------|
| `introduction/introduction.mdx` | `introduction` |
| `getting-started/setup.mdx` | `getting-started/setup` |
| `headless-cms/graphql-api.mdx` | `headless-cms/graphql-api` |

**Special case:** If the filename matches the directory name, it uses just the directory name as the slug.

### 3. That's It! 🎉

No manual registration needed. The system will:
- ✅ Automatically discover your new lesson
- ✅ Generate the appropriate slug
- ✅ Load the MDX component dynamically
- ✅ Extract frontmatter metadata
- ✅ Make it available at `/course/your-slug`

## Example: Adding a New Lesson

Let's say you want to add a lesson about database integration:

```bash
# 1. Create the file
touch content/lessons/getting-started/database-integration.mdx

# 2. Add content
cat > content/lessons/getting-started/database-integration.mdx << 'EOF'
---
title: Database Integration
description: Learn how to integrate databases with Webiny
date: 2024-01-15
tags: [database, backend, tutorial]
---

# Database Integration

Your lesson content here...
EOF

# 3. Visit the URL
# http://localhost:3000/course/getting-started/database-integration
# ✅ It just works!
```

## Technical Details

### Filesystem Scanning
- Scans `content/lessons/` directory at runtime
- Filters out hidden directories (starting with `.`)
- Only includes `.mdx` files
- Results are cached for performance

### Dynamic Imports
- Uses `import.meta.glob()` for Next.js compatibility
- Glob pattern: `@/content/lessons/**/*.mdx`
- Lazy loading (eager: false) for better performance
- Matches slugs to file paths automatically

### Frontmatter Extraction
- Reads raw MDX file content
- Parses YAML frontmatter with `gray-matter`
- Extracts metadata (title, description, tags, etc.)
- Returns both component and metadata

### Caching
- Filesystem scan results are cached
- Cache invalidated on server restart
- Development: changes reflected on refresh
- Production: fully optimized at build time

## API Reference

### `loadMDXContent(slug: string)`
Loads an MDX lesson by its slug.

**Parameters:**
- `slug`: The lesson slug (e.g., "introduction" or "getting-started/setup")

**Returns:**
```typescript
{
  Component: ComponentType,    // React component to render
  frontmatter: MDXFrontmatter  // Metadata from YAML frontmatter
}
```

### `getAllLessonSlugs()`
Gets all available lesson slugs by scanning the filesystem.

**Returns:**
```typescript
string[]  // Array of lesson slugs
```

**Usage:**
```typescript
// Generate static paths for all lessons
export function generateStaticParams() {
  return getAllLessonSlugs().map(slug => ({
    slug: slug.split('/')
  }))
}
```

## Benefits

### 👍 Pros
1. **No Manual Registration** - Just add files and go
2. **Scalable** - Add hundreds of lessons without code changes
3. **Maintainable** - Single source of truth (the filesystem)
4. **Type-Safe** - Full TypeScript support
5. **Next.js Compatible** - Works with App Router and static generation
6. **Flexible** - Easy to reorganize content structure

### 📋 Best Practices
1. Keep consistent naming conventions
2. Use descriptive filenames (they become slugs)
3. Always include frontmatter metadata
4. Organize lessons logically by chapter
5. Use lowercase and hyphens in filenames

## Troubleshooting

### Lesson not loading?
1. Check the filename ends with `.mdx`
2. Verify it's in a chapter directory under `content/lessons/`
3. Check console logs for slug resolution
4. Ensure no typos in the URL path

### Slug not matching?
1. Remember: filename becomes part of slug
2. Special case: `chapter/chapter.mdx` → `chapter`
3. Normal case: `chapter/lesson.mdx` → `chapter/lesson`

### Module not found?
1. Restart dev server after adding new lessons
2. Check glob pattern matches your file path
3. Verify `@/` alias points to project root

## Migration Guide

If you had manually registered lessons before, here's what changed:

### Old Code (Delete This)
```typescript
// ❌ No longer needed
switch (slug) {
  case "introduction":
    mdxModule = await import("...")
    break
  // ... more cases
}

const pathMap: Record<string, string> = {
  "introduction": "...",
  // ... more entries
}
```

### New Code (Already Implemented)
```typescript
// ✅ Automatic discovery
const modules = import.meta.glob("@/content/lessons/**/*.mdx")
// Finds and loads lessons automatically
```

## Summary

The MDX loader now:
- 🔍 Automatically discovers lessons from the filesystem
- 🚀 Dynamically imports and loads MDX components
- 📝 Extracts frontmatter metadata
- 🎯 Generates appropriate slugs
- ⚡ Caches results for performance
- 🔧 Requires zero manual registration

**Just drop in your MDX files and they're ready to use!** 🎉


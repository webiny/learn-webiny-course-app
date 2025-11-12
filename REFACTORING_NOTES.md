# MDX Content Refactoring

## Overview

The application has been refactored to load MDX lesson content dynamically from the filesystem (`content/lessons/`) instead of using a hardcoded registry.

## Changes Made

### 1. New MDX Loader (`lib/mdx-loader.ts`)

Created a new utility that dynamically imports MDX files based on lesson slugs:

- **Function**: `loadMDXContent(slug: string)`
- **Purpose**: Async function that loads MDX components on-demand
- **Approach**: Uses a switch statement with dynamic imports (required by Next.js for static analysis)

### 2. Updated Lesson Page (`app/course/[...slug]/page.tsx`)

Modified the lesson page to use the new async loader:

- Changed from synchronous `getMDXComponent()` to async `loadMDXContent()`
- Now properly handles async MDX loading in server components

### 3. Added Best Practices Chapter (`lib/course-data.ts`)

Added the "Best Practices" chapter to the course structure:

- **Chapter ID**: `best-practices`
- **Lessons**: 
  - Performance Optimization (`best-practices/performance`)
  - Security Best Practices (`best-practices/security`)

## File Structure

```
content/lessons/
├── introduction/
│   └── introduction.mdx
├── getting-started/
│   ├── setup.mdx
│   └── project-structure.mdx
├── headless-cms/
│   ├── content-models.mdx
│   └── graphql-api.mdx
├── page-builder/
│   ├── creating-pages.mdx
│   └── custom-elements.mdx
├── serverless/
│   ├── architecture.mdx
│   └── deployment.mdx
└── best-practices/
    ├── performance.mdx
    └── security.mdx
```

## Adding New Lessons

To add a new lesson:

1. Create an MDX file in the appropriate chapter folder under `content/lessons/`
2. Add the lesson to the course data in `lib/course-data.ts`
3. Add a case for the slug in `lib/mdx-loader.ts` switch statement

Example:

```typescript
// In lib/course-data.ts
{
  id: "new-lesson",
  title: "New Lesson Title",
  slug: "chapter-name/new-lesson",
}

// In lib/mdx-loader.ts
case "chapter-name/new-lesson":
  mdxModule = await import("@/content/lessons/chapter-name/new-lesson.mdx")
  break
```

## Benefits

1. **Cleaner Architecture**: Content is separated from code
2. **Better Organization**: MDX files are organized by chapter in the filesystem
3. **Easier Content Management**: Non-developers can edit MDX files without touching code
4. **Performance**: Next.js can optimize and bundle MDX files at build time
5. **Scalability**: Easy to add new lessons by dropping MDX files in folders

## Deprecated Files

The following files are no longer used and can be removed:

- `lib/mdx-registry.tsx` (old hardcoded registry)
- `lib/mdx-content-registry.tsx` (if exists)
- `content/lessons/**/*.tsx` (empty .tsx placeholder files)

## Testing

To verify the refactoring works:

1. Run `npm run dev` or `pnpm dev`
2. Navigate to each lesson page
3. Verify MDX content loads correctly
4. Check browser console for "[MDX Loader]" messages

All 11 lesson pages should load successfully:
- introduction
- getting-started/setup
- getting-started/project-structure
- headless-cms/content-models
- headless-cms/graphql-api
- page-builder/creating-pages
- page-builder/custom-elements
- serverless/architecture
- serverless/deployment
- best-practices/performance
- best-practices/security


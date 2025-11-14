# 🔧 Fix Applied: Course Data Auto-Generation

## The Problem

The watcher was detecting file changes and regenerating the MDX registry, but new lessons weren't appearing in the sidebar/navigation. 

**Root Cause:** There were TWO sources of truth:
1. **MDX Registry** (`lib/mdx-registry.ts`) - For loading lesson content ✅ Auto-generated
2. **Course Data** (`lib/course-data.ts`) - For sidebar/navigation ❌ Was manual

The watcher was only updating #1, but the sidebar uses #2!

## The Solution

Now BOTH files are auto-generated when you add/edit/remove lessons!

### New Script: `generate-course-data.mjs`

This script:
- Scans `content/lessons/` directory
- Reads frontmatter from each `.mdx` file to get the title
- Generates the complete `course-data.ts` with all lessons
- Preserves all helper functions (getLessonBySlug, getNextLesson, etc.)
- Maintains chapter metadata (you still configure chapter titles/descriptions manually)

### Updated Watcher

The file watcher now regenerates BOTH:
1. MDX registry (for content loading)
2. Course data (for sidebar/navigation)

## How to Use

### Automatic (Recommended)

```bash
# Start dev server with watcher
npm run dev:watch

# Create a lesson
echo "---
title: My New Lesson
---
# Content" > content/lessons/chapter/new-lesson.mdx

# The watcher automatically:
# 1. Detects the new file
# 2. Regenerates mdx-registry.ts
# 3. Regenerates course-data.ts
# 4. Next.js hot-reloads
# 5. Lesson appears in sidebar!
```

### Manual (Still Works)

```bash
# Generate everything manually
npm run generate-all

# Or generate individually
npm run generate-mdx-registry
npm run generate-course-data
```

## What's Auto-Generated vs Manual

### Auto-Generated ✅
- **Lesson list** - Discovered from filesystem
- **Lesson titles** - Read from MDX frontmatter
- **Lesson slugs** - Generated from file paths
- **Lesson IDs** - Generated from filenames

### Manual Configuration 🔧
- **Chapter metadata** - Edit `scripts/generate-course-data.mjs`
  - Chapter numbers
  - Chapter titles
  - Chapter descriptions
  - Chapter icons

The chapter metadata is in this object:

```javascript
const chapterMetadata = {
  'introduction': {
    number: 1,
    title: 'Introduction',
    description: 'Dive into the course materials',
    icon: 'book'
  },
  'getting-started': {
    number: 2,
    title: 'Getting Started',
    description: 'Learn how to create a Webiny application...',
    icon: 'rocket'
  },
  // Add more chapters here
}
```

## Testing Your Lesson

Your `test-page.mdx` file should now appear! Let's verify:

1. Make sure the watcher is running:
   ```bash
   npm run dev:watch
   ```

2. Check the console output - you should see:
   ```
   [watch] 🔄 Regenerating MDX registry and course data...
   [watch] ✅ Registry and course data updated!
   ```

3. Visit: http://localhost:3000/course/website-builder/test-page

4. Check the sidebar - "This is a Test" should appear under "Website Builder"

## Files Created/Modified

### New Files
- ✅ `scripts/generate-course-data.mjs` - Course data generator

### Modified Files
- ✅ `scripts/watch-mdx-lessons.mjs` - Now regenerates both files
- ✅ `package.json` - Added new scripts
- ✅ `lib/course-data.ts` - Will be regenerated with your lessons

### Unchanged
- ✅ `scripts/generate-mdx-registry.mjs` - Still works as before
- ✅ `lib/mdx-loader.ts` - No changes needed

## New npm Scripts

```bash
# Generate both registry and course data
npm run generate-all

# Generate just the MDX registry
npm run generate-mdx-registry

# Generate just the course data
npm run generate-course-data

# Dev server with auto-generation
npm run dev:watch
```

## Console Output

When you add/edit a lesson with the watcher running:

```
[watch] 📝 Detected change: test-page.mdx
[watch] 🔄 Regenerating MDX registry and course data...
[watch] 🔍 Discovering lessons and generating course data...
[watch] ✅ Found 6 chapters with 12 lessons
[watch] 📝 Generated course data at: lib/course-data.ts
[watch] ✅ Registry and course data updated!
[next]  ⚡ Compiled in 234ms
```

## Adding New Chapters

To add a new chapter:

1. Create the directory: `mkdir content/lessons/new-chapter`
2. Add chapter metadata to `scripts/generate-course-data.mjs`:
   ```javascript
   'new-chapter': {
     number: 7,
     title: 'New Chapter',
     description: 'Learn about new things',
     icon: 'sparkles'
   }
   ```
3. Add lessons: `touch content/lessons/new-chapter/lesson-1.mdx`
4. The watcher will auto-regenerate everything!

## Lesson Title Priority

The lesson title comes from (in order):
1. **Frontmatter `title`** (if present) ← Preferred
2. **Filename** (converted to Title Case) ← Fallback

Example:
```markdown
---
title: "Custom Title Here"  ← This wins!
---
```

If no frontmatter title, `test-page.mdx` becomes "Test Page"

## Summary

✅ **Both MDX registry AND course data now auto-generate**  
✅ **Your test lesson will now appear in the sidebar**  
✅ **No manual editing of course-data.ts needed**  
✅ **Chapter metadata still manual (easy to configure)**  

---

**Your lesson should now be visible! Restart the dev:watch if it's already running:**

```bash
# Stop the current dev:watch (Ctrl+C)
npm run dev:watch
```

Then visit: http://localhost:3000/course/website-builder/test-page


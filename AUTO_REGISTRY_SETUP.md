# Automatic MDX Registry Regeneration

## Overview
Your project is already set up to automatically regenerate the MDX registry when you add, remove, or modify lesson files. No manual commands needed!

## How to Use

### Start Development with Auto-Regeneration
Instead of running `npm run dev`, use:

```bash
npm run dev:watch
```

This starts:
1. **Next.js dev server** - Your regular development server
2. **File watcher** - Automatically watches for changes in `content/lessons/`

### What It Watches
The watcher monitors:
- ✅ New `.mdx` files added
- ✅ Existing `.mdx` files modified
- ✅ `.mdx` files deleted
- ✅ New chapter folders created
- ✅ Chapter folders removed

### What Happens Automatically
When you add/remove/modify a lesson:
1. 🔍 File watcher detects the change
2. 🔄 Regenerates `lib/mdx-registry.ts` with updated lesson data
3. 🔄 Regenerates `lib/course-data.ts` with updated chapter/lesson structure
4. ✅ Your sidebar and lesson metadata automatically update
5. 🔥 Next.js hot-reloads the changes

### Package.json Scripts

```json
{
  "dev": "next dev",                    // Regular dev server (no auto-regeneration)
  "dev:watch": "concurrently ...",      // Dev server + file watcher (recommended)
  "watch-mdx": "node scripts/watch-mdx-lessons.mjs",  // Just the file watcher
  "generate-mdx-registry": "node scripts/generate-mdx-registry.mjs",  // Manual regeneration
  "generate-all": "npm run generate-mdx-registry && npm run generate-course-data"  // Regenerate both
}
```

## Workflow

### Adding a New Lesson
1. Create a new `.mdx` file in `content/lessons/[chapter-name]/[lesson-name].mdx`
2. Add frontmatter at the top:
   ```yaml
   ---
   title: "Your Lesson Title"
   description: "Lesson description"
   author: "Your Name"
   date: "2024-01-01"
   estimatedTime: "15 min"
   difficulty: "beginner"
   chapterTitle: "Chapter Name"
   chapterNumber: 1
   chapterIcon: "book"
   ---
   ```
3. Write your lesson content
4. **That's it!** The registry auto-updates, sidebar shows the new lesson

### Adding a New Chapter
1. Create a new folder: `content/lessons/[new-chapter]/`
2. Add at least one `.mdx` file inside
3. Include chapter metadata in the frontmatter (see above)
4. **Done!** The new chapter appears in the sidebar automatically

### Removing a Lesson
1. Delete the `.mdx` file
2. **Done!** Registry updates, sidebar removes the lesson

## Manual Regeneration
If you need to manually regenerate (e.g., after pulling changes):

```bash
npm run generate-all
```

Or just the registry:
```bash
npm run generate-mdx-registry
```

## Troubleshooting

### Sidebar is Empty
1. Make sure you're running `npm run dev:watch` (not just `npm run dev`)
2. Check that lessons have proper frontmatter with `title` field
3. Manually run: `npm run generate-mdx-registry`

### Changes Not Reflecting
1. Stop the dev server
2. Run: `npm run generate-mdx-registry`
3. Restart with: `npm run dev:watch`

### Watcher Not Detecting Changes
1. Verify you're in the right directory: `content/lessons/`
2. Check file extension is `.mdx`
3. Restart the watcher

## Files Involved
- `scripts/watch-mdx-lessons.mjs` - File watcher script
- `scripts/generate-mdx-registry.mjs` - Registry generator
- `lib/mdx-registry.ts` - Generated registry (auto-updated)
- `lib/course-data.ts` - Generated course structure (auto-updated)

---

**🎉 Enjoy hassle-free lesson management with automatic registry updates!**


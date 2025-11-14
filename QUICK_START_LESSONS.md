# Quick Reference: Lesson Management

## 🔥 Hot Reload Enabled!

MDX lessons now auto-reload! No manual registry regeneration needed.

## Adding a New Lesson

### Step 1: Start Dev Server with Auto-Reload

```bash
npm run dev:watch
```

This starts Next.js + the MDX watcher.

### Step 2: Create Your Lesson File

```bash
# Create the file
touch content/lessons/chapter-name/lesson-name.mdx

# Add content with frontmatter
cat > content/lessons/chapter-name/lesson-name.mdx << 'EOF'
---
title: Your Lesson Title
description: Brief description
tags: [tag1, tag2]
---

# Your Lesson Title

Your content here...
EOF
```

### Step 3: That's It! 🎉

The watcher automatically:
1. Detects your new file
2. Regenerates the registry
3. Next.js hot-reloads
4. Your lesson is ready at: `http://localhost:3000/course/chapter-name/lesson-name`

## Commands

### Recommended (with auto-reload)
```bash
npm run dev:watch
```

### Manual mode (if preferred)
```bash
npm run dev
npm run generate-mdx-registry  # Run this when adding lessons
```

## How It Works

A file watcher monitors `content/lessons/` and automatically regenerates the import registry when you:
- ✅ Add new `.mdx` files
- ✅ Remove `.mdx` files
- ✅ Rename `.mdx` files
- ✅ Add/remove chapter directories

## Slug Generation Rules

| File Path | Slug |
|-----------|------|
| `chapter/chapter.mdx` | `chapter` |
| `chapter/lesson.mdx` | `chapter/lesson` |

## File Structure

```
content/lessons/
├── chapter-1/
│   ├── lesson-1.mdx
│   └── lesson-2.mdx
└── chapter-2/
    └── lesson-1.mdx

lib/
└── mdx-registry.ts  ← Auto-generated!
```

## Workflow Summary

```bash
# 1. Start once (runs in background)
npm run dev:watch

# 2. Create/edit MDX files
# 3. Save
# 4. Automatically reloads! ✨
```

## Troubleshooting

### Need to install dependencies?
```bash
npm install
```

### Watcher not detecting changes?
- Make sure you're running `npm run dev:watch`
- Check file is in `content/lessons/` with `.mdx` extension
- Look for console messages from the watcher

### Manual regeneration still works
```bash
npm run generate-mdx-registry
```

## See Also

- **`HOT_RELOAD_ENABLED.md`** - Complete hot reload documentation
- **`MDX_LOADER_FINAL.md`** - Technical implementation details

---

**Developer experience: ✨ Excellent!**



# 🚀 Quick Start: Automatic Registry Updates

## TL;DR

**Instead of running:**
```bash
npm run dev
```

**Run this:**
```bash
npm run dev:watch
```

That's it! Now when you add, remove, or modify any lesson file in `content/lessons/`, the registry will automatically regenerate and your sidebar will update instantly.

---

## What This Does

`npm run dev:watch` runs two processes simultaneously:
1. **Next.js dev server** (your app)
2. **File watcher** (monitors `content/lessons/` for changes)

When you add/remove/edit a `.mdx` file, the watcher:
- Automatically regenerates `lib/mdx-registry.ts`
- Automatically regenerates `lib/course-data.ts`
- Your app hot-reloads with the new data
- Sidebar shows the updated lessons immediately

---

## Testing It Out

1. **Start the dev server with watcher:**
   ```bash
   npm run dev:watch
   ```

2. **Add a new lesson** (in another terminal or your editor):
   ```bash
   # Create a new lesson file
   touch content/lessons/getting-started/new-lesson.mdx
   ```

3. **Add some content to the file:**
   ```markdown
   ---
   title: "My New Lesson"
   description: "Testing automatic registry"
   chapterTitle: "Getting Started"
   chapterNumber: 2
   chapterIcon: "rocket"
   ---

   # My New Lesson

   This is a test lesson!
   ```

4. **Watch the magic happen:**
   - Terminal shows: "🔄 Regenerating MDX registry..."
   - Terminal shows: "✅ Registry and course data updated!"
   - Your browser hot-reloads
   - New lesson appears in the sidebar

---

## No More Manual Commands!

❌ **Before:**
```bash
npm run dev                    # Start dev server
# ... add a lesson ...
npm run generate-mdx-registry  # Manually regenerate
# ... refresh browser ...
```

✅ **Now:**
```bash
npm run dev:watch              # Start dev server with auto-regeneration
# ... add a lesson ...
# ... that's it, auto-updates! ...
```

---

## What Gets Watched

- ✅ Adding new `.mdx` files
- ✅ Removing `.mdx` files  
- ✅ Modifying `.mdx` files (frontmatter or content)
- ✅ Creating new chapter folders
- ✅ Removing chapter folders

---

## Pro Tips

### Keep the watcher running
Leave `npm run dev:watch` running while you develop. It will catch all your changes automatically.

### Check the terminal output
The watcher logs every change it detects:
```
📝 Detected change: new-lesson.mdx
🔄 Regenerating MDX registry...
✅ Registry and course data updated!
```

### First-time setup
If you just cloned the repo or the registry is out of sync, run once:
```bash
npm run generate-mdx-registry
```

Then start with `npm run dev:watch` for automatic updates going forward.

---

**🎉 You're all set! Happy lesson creating!**


# ✨ SOLUTION: No More Manual Registry Commands!

## The Problem (Before)
Every time you added or removed a lesson, you had to:
1. Create/delete the `.mdx` file
2. Run `npm run generate-mdx-registry` manually
3. Wait for it to finish
4. Refresh the browser

This was tedious and broke your flow.

---

## The Solution (Now)

### 🎯 One Command to Rule Them All

Run this **once** at the start of your dev session:

```bash
npm run dev:auto
```

**What it does:**
1. Generates the MDX registry (if needed)
2. Starts Next.js dev server
3. Starts the file watcher
4. **Automatically regenerates** the registry whenever you add/remove/modify lessons

---

## How It Works

### Auto-Detection
The file watcher monitors `content/lessons/` and triggers regeneration when:
- ✅ You create a new `.mdx` file
- ✅ You delete an `.mdx` file
- ✅ You modify an `.mdx` file (change frontmatter, content, etc.)
- ✅ You create a new chapter folder
- ✅ You delete a chapter folder

### What Gets Updated Automatically
- `lib/mdx-registry.ts` - The full lesson registry with metadata
- `lib/course-data.ts` - Chapter and lesson structure
- Your sidebar - Shows updated lessons instantly
- Lesson metadata - Reflects current frontmatter

---

## Usage Examples

### Example 1: Adding a New Lesson

```bash
# 1. Start development (only need to do this once)
npm run dev:auto

# 2. In another terminal or your editor, create a lesson:
mkdir -p content/lessons/my-chapter
cat > content/lessons/my-chapter/my-lesson.mdx << 'EOF'
---
title: "My Awesome Lesson"
description: "Learn something cool"
chapterTitle: "My Chapter"
chapterNumber: 7
chapterIcon: "sparkles"
---

# My Awesome Lesson

Content goes here!
EOF

# 3. Watch your terminal - you'll see:
#    📝 Detected change: my-lesson.mdx
#    🔄 Regenerating MDX registry...
#    ✅ Registry updated!

# 4. Check your browser - the lesson appears in the sidebar!
```

### Example 2: Removing a Lesson

```bash
# Just delete the file
rm content/lessons/my-chapter/my-lesson.mdx

# The watcher detects it and updates everything automatically!
```

### Example 3: Updating Lesson Frontmatter

```bash
# Edit the file to change the title
# The watcher detects it and updates the sidebar immediately!
```

---

## Available Scripts

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm run dev:auto` | **Recommended!** Generate registry + start dev with auto-updates | Start of your dev session |
| `npm run dev:watch` | Start dev server with auto-regeneration (no initial generation) | If registry is already up-to-date |
| `npm run dev` | Regular dev server (no auto-regeneration) | If you don't want automatic updates |
| `npm run generate-mdx-registry` | Manually regenerate registry | One-time fix if something is out of sync |

---

## First Time Setup

If this is your first time or the registry is empty:

```bash
# Option 1: Use dev:auto (it generates first, then starts)
npm run dev:auto

# Option 2: Generate manually, then start watching
npm run generate-mdx-registry
npm run dev:watch
```

---

## Troubleshooting

### Sidebar is empty
```bash
# Stop the dev server, then:
npm run generate-mdx-registry
npm run dev:watch
```

### Changes not reflecting
1. Check the terminal output - you should see "📝 Detected change" messages
2. Verify you're running `npm run dev:auto` or `npm run dev:watch` (not just `npm run dev`)
3. Make sure your lesson has proper frontmatter with a `title` field

### Watcher not detecting changes
1. Verify the file is in `content/lessons/` directory
2. Verify the file extension is `.mdx`
3. Restart the watcher: Stop the dev server and run `npm run dev:auto` again

---

## Summary

### ❌ Old Workflow
```bash
npm run dev
# ... add lesson ...
npm run generate-mdx-registry
# ... wait ...
# ... refresh browser ...
```

### ✅ New Workflow
```bash
npm run dev:auto
# ... add/remove/edit lessons ...
# ... everything updates automatically! ...
```

---

## 🎉 You're Done!

From now on, just run `npm run dev:auto` and focus on creating great lessons. The registry will take care of itself!

**Happy lesson creating! 🚀**


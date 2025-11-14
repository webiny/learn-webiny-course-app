# 🔥 Hot Reload for MDX Lessons - ENABLED!

## What's New?

Your MDX lessons now **automatically hot-reload**! No more running `npm run generate-mdx-registry` manually every time you add or modify a lesson.

## How It Works

A file watcher runs in the background and:
1. Monitors `content/lessons/` directory
2. Detects when you add, remove, or rename `.mdx` files
3. Automatically regenerates the `lib/mdx-registry.ts`
4. Next.js detects the change and hot-reloads your app

**It's completely automatic!** 🎉

## Usage

### New Command (Recommended)

Use the new combined dev command that runs both Next.js and the watcher:

```bash
npm run dev:watch
```

This starts:
- ✅ Next.js dev server (with hot reload)
- ✅ MDX lesson watcher (auto-regenerates registry)

### Traditional Command (Still Works)

You can still use the regular dev command:

```bash
npm run dev
```

But you'll need to manually run `npm run generate-mdx-registry` when adding lessons.

## Adding a New Lesson

### With Auto-Reload (Recommended)

```bash
# 1. Start dev server with watcher
npm run dev:watch

# 2. Create your lesson file
echo "---
title: My New Lesson
---

# My Awesome Content
" > content/lessons/chapter/new-lesson.mdx

# 3. That's it! The watcher will:
#    - Detect the new file
#    - Regenerate the registry
#    - Next.js will hot-reload
#    - Visit: http://localhost:3000/course/chapter/new-lesson
```

**Zero manual steps!** Just save your file and refresh your browser.

### Without Auto-Reload (Manual)

```bash
# 1. Start regular dev server
npm run dev

# 2. Create your lesson file
echo "..." > content/lessons/chapter/new-lesson.mdx

# 3. Manually regenerate registry
npm run generate-mdx-registry

# 4. Refresh browser
```

## What Gets Watched?

The watcher monitors:
- ✅ New `.mdx` files added
- ✅ Existing `.mdx` files removed
- ✅ `.mdx` files renamed
- ✅ New chapter directories created
- ✅ Chapter directories removed

It automatically updates the registry for any of these changes!

## Console Output

When running `npm run dev:watch`, you'll see colored output:

```
[next]  ▲ Next.js 16.0.0
[next]  - Local:        http://localhost:3000
[watch] 👀 Watching for lesson changes...
[watch] ✓ Watching: introduction/
[watch] ✓ Watching: getting-started/
[watch] ✓ Watching: headless-cms/
[watch] 🎉 File watcher is ready!
```

When you add a lesson:

```
[watch] 📝 Detected change: new-lesson.mdx
[watch] 🔄 Regenerating MDX registry...
[watch] ✅ Registry updated!
[next]  ⚡ Compiled /course/chapter/new-lesson in 234ms
```

## Performance

The watcher is:
- ⚡ **Fast** - Uses native Node.js `fs.watch()` API
- 🪶 **Lightweight** - Minimal CPU usage
- 🎯 **Smart** - Only regenerates when needed
- 🚫 **Debounced** - Prevents duplicate regenerations

## Files Created

### New Scripts
- **`scripts/watch-mdx-lessons.mjs`** - The file watcher
- Already had: `scripts/generate-mdx-registry.mjs` - Registry generator

### Updated Files
- **`package.json`** - Added new scripts and `concurrently` dependency

## Available Commands

```bash
# Development with auto-reload (RECOMMENDED)
npm run dev:watch

# Development without auto-reload
npm run dev

# Just the watcher (if running Next.js separately)
npm run watch-mdx

# Manual registry generation
npm run generate-mdx-registry

# Production build
npm run build

# Production server
npm run start
```

## Installation

If you just pulled these changes, install the new dependency:

```bash
npm install
# or
pnpm install
```

This installs `concurrently` which allows running multiple scripts simultaneously.

## Stopping the Server

Press `Ctrl+C` to stop both the Next.js server and the watcher gracefully.

## Troubleshooting

### "command not found: concurrently"

Run `npm install` to install dependencies.

### Watcher not detecting changes?

1. Check that you're running `npm run dev:watch`
2. Make sure the file is in `content/lessons/`
3. Verify the file has `.mdx` extension
4. Check the console for any error messages

### Registry not updating?

Manually regenerate it:
```bash
npm run generate-mdx-registry
```

Then check if the watcher shows any errors.

### Changes not appearing in browser?

1. Wait a few seconds for the watcher to regenerate
2. Look for the "Registry updated!" message
3. Refresh your browser (Cmd+R / Ctrl+R)
4. Check the Next.js console for compilation messages

## Benefits

### Before (Manual Process) ❌
```bash
1. Create lesson file
2. Run: npm run generate-mdx-registry
3. Wait for registry to regenerate
4. Refresh browser
5. Repeat steps 2-4 for every change
```

### After (Auto-Reload) ✅
```bash
1. Run: npm run dev:watch (once)
2. Create/edit lesson files
3. Save
4. Automatically reloads!
```

**~75% fewer manual steps!** 🎉

## Advanced Usage

### Running in Production

The watcher is for development only. In production:

```bash
npm run generate-mdx-registry  # Generate final registry
npm run build                   # Build for production
npm run start                   # Start production server
```

### Multiple Terminal Windows

If you prefer separate windows:

```bash
# Terminal 1: Next.js
npm run dev

# Terminal 2: Watcher
npm run watch-mdx
```

### Custom Watch Patterns

Edit `scripts/watch-mdx-lessons.mjs` to customize:
- Which directories to watch
- Which file extensions to monitor
- Debounce timing
- Custom actions on file changes

## Summary

🔥 **Hot Reload Enabled**
- Just run `npm run dev:watch`
- Create/edit `.mdx` files
- Registry auto-regenerates
- Browser auto-reloads
- **Perfect developer experience!**

---

**No more manual registry regeneration!** 🚀


# ✅ Build Script Updated - Auto Registry Regeneration

## What Changed

### Build Script Update
**File:** `package.json`

The `build` script now automatically regenerates the MDX registry before building:

**Before:**
```json
"build": "next build"
```

**After:**
```json
"build": "npm run generate-mdx-registry && next build"
```

## Why This Matters

### Problem Solved
Previously, if you:
1. Added or removed lesson files
2. Forgot to run `npm run generate-mdx-registry`
3. Ran `npm run build`

The build would use an **outdated registry** and your new/removed lessons wouldn't be included in the production build.

### Solution
Now when you run `npm run build`, it will:
1. **First**: Regenerate the MDX registry (discover all lessons)
2. **Then**: Build the Next.js application

This ensures the registry is **always up-to-date** in production builds.

## Benefits

### ✅ Always Fresh
- Registry is regenerated on every build
- No stale lesson data in production
- New lessons automatically included

### ✅ No Manual Steps
- Don't need to remember to run `generate-mdx-registry`
- One command does everything: `npm run build`
- Foolproof deployment process

### ✅ CI/CD Friendly
- Works perfectly in automated deployments
- Vercel, Netlify, etc. will automatically regenerate
- No manual intervention needed

### ✅ Team-Friendly
- Team members don't need to know about the registry
- Just `git pull` and `npm run build` works
- Reduces onboarding complexity

## How It Works

### Build Process Flow

```
npm run build
    ↓
1. Run: npm run generate-mdx-registry
    ↓
   - Scans content/lessons/ directory
   - Discovers all .mdx files
   - Extracts frontmatter metadata
   - Generates lib/mdx-registry.ts
    ↓
2. Run: next build
    ↓
   - Next.js builds the application
   - Uses the freshly generated registry
   - Includes all discovered lessons
    ↓
✅ Production build complete!
```

### Script Execution Order
```bash
# When you run:
npm run build

# It executes:
npm run generate-mdx-registry && next build

# Which is equivalent to:
node scripts/generate-mdx-registry.mjs && next build
```

## All Scripts Overview

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `npm run build` | Generate registry + build for production | **Deploy to production** |
| `npm run dev` | Start dev server (no registry regen) | Quick development |
| `npm run dev:auto` | Generate registry + start dev with watcher | **Recommended for development** |
| `npm run dev:watch` | Start dev server with file watcher | Development with auto-updates |
| `npm run generate-mdx-registry` | Manually regenerate registry | One-time updates |

## Testing the Change

### Test It Works
```bash
# 1. Add a new lesson file
touch content/lessons/test-chapter/test-lesson.mdx

# 2. Run build (it should include the new lesson)
npm run build

# 3. Check that the registry was updated
cat lib/mdx-registry.ts | grep "test-lesson"
```

You should see the new lesson in the generated registry!

## Development Workflow

### Recommended Setup

**For Development:**
```bash
npm run dev:auto
```
- Generates registry once on start
- Watches for file changes
- Auto-regenerates on lesson add/remove/change

**For Production Build:**
```bash
npm run build
```
- Always regenerates registry
- Builds for production
- Ensures fresh data

**For Deployment:**
Most deployment platforms just need:
```bash
npm run build
npm run start
```

## CI/CD Integration

### Vercel
No changes needed! Vercel will automatically:
1. Install dependencies
2. Run `npm run build` (which now includes registry generation)
3. Deploy

### Netlify
Your `netlify.toml` should have:
```toml
[build]
  command = "npm run build"
  publish = ".next"
```

### GitHub Actions
Your workflow should include:
```yaml
- name: Build
  run: npm run build
```

The registry generation happens automatically!

## Troubleshooting

### Build Fails at Registry Generation
If the build fails during registry generation:

1. **Check lesson files** - Make sure all `.mdx` files have valid frontmatter
2. **Check content directory** - Ensure `content/lessons/` exists
3. **Run manually** - Test with `npm run generate-mdx-registry`

### Registry Not Updating
If lessons don't appear after building:

1. **Clear build cache** - Delete `.next/` folder
2. **Rebuild** - Run `npm run build` again
3. **Check registry file** - Look at `lib/mdx-registry.ts` to verify it was updated

### Slow Builds
Registry generation adds ~1-3 seconds to build time:
- **Development**: Use `dev:auto` or `dev:watch` for hot reloading
- **Production**: The extra time is worth ensuring correctness
- **Optimization**: Already optimized, only scans lesson files once

## Summary

### What Changed
- ✅ `build` script now includes `generate-mdx-registry`

### Why It Matters
- ✅ Registry always up-to-date in production
- ✅ No manual steps required
- ✅ Works with CI/CD automatically
- ✅ Prevents stale lesson data

### Action Required
- ✅ **None!** Just use `npm run build` as normal
- ✅ The registry will automatically regenerate

---

**🎉 Build process is now foolproof! The registry always stays in sync.**

**Next time you deploy:** Just run `npm run build` and everything works automatically!


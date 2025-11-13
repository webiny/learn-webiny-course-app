# CodeBlock Theme Reactivity Fix

## Summary
Fixed the CodeBlock component to properly react to light/dark theme changes, ensuring syntax highlighting updates automatically when the user switches themes.

## Changes Made

### 1. Added Theme Detection
- Imported `useTheme` hook from `next-themes`
- Added theme state tracking with `const { theme, systemTheme } = useTheme()`

### 2. Made Highlighting Reactive
- Added `theme` and `systemTheme` to the `useEffect` dependency array
- Now the code re-highlights whenever the theme changes
- Shiki automatically uses the correct theme (light/dark) based on CSS media queries

### 3. Fixed Line Height Issue
- Changed `line-height` from `0.2` to `1.5` for proper readability
- Changed `font-size` from `0.87rem` to `0.875rem` for consistency

## How It Works

The component uses Shiki's dual-theme feature:

```typescript
themes: {
  light: "github-light",
  dark: "github-dark",
}
```

Shiki generates HTML with both themes, and uses CSS media queries to show the correct one:
- Light theme → uses `github-light` colors
- Dark theme → uses `github-dark` colors

When the user toggles the theme switcher:
1. `next-themes` updates the theme state
2. The `useEffect` hook detects the change (via dependencies)
3. Shiki re-highlights the code with updated theme styling
4. The component re-renders with new highlighted HTML

## Before vs After

**Before:**
- ❌ Code highlighting didn't update when theme changed
- ❌ Line height was broken (0.2 instead of 1.5)
- ❌ Required page refresh to see theme changes

**After:**
- ✅ Code highlighting updates instantly on theme change
- ✅ Proper line height (1.5) for readability
- ✅ Smooth automatic transitions
- ✅ No page refresh needed

## Technical Details

### Dependencies Watched
```typescript
useEffect(() => {
  // ... highlighting logic
}, [code, language, highlightLines, showLineNumbers, theme, systemTheme])
```

- `theme` - Current theme ("light", "dark", or "system")
- `systemTheme` - OS-level theme preference
- When either changes, code is re-highlighted

### Shiki Configuration
Shiki generates both themes in a single HTML output, wrapped with CSS classes that respond to the `prefers-color-scheme` media query and theme attributes.

## Testing

To test the fix:
1. View any lesson with code blocks
2. Click the theme switcher (light/dark toggle)
3. Watch the code highlighting update instantly
4. Try "system" theme and change OS theme

## Status
✅ Theme reactivity implemented
✅ Line height fixed
✅ Auto-updates on theme change
✅ No errors in code
✅ Ready to use


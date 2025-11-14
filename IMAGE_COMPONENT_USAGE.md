# Image Component for MDX

## Overview
A custom Image component for MDX lessons with click-to-fullscreen functionality.

## Features
- ✅ Display images in lessons with Next.js Image optimization
- ✅ Click to view fullscreen
- ✅ Optional title/caption
- ✅ Responsive and accessible
- ✅ Zoom indicator on hover
- ✅ ESC key to close fullscreen
- ✅ Click outside to close

## Usage in MDX Files

### Basic Usage
```mdx
<Image src="/images/my-image.png" alt="Description of image" />
```

### With Title/Caption
```mdx
<Image 
  src="/images/my-image.png" 
  alt="Description of image"
  title="This is the image caption that appears below"
/>
```

### Custom Dimensions
```mdx
<Image 
  src="/images/my-image.png" 
  alt="Description of image"
  width={1200}
  height={800}
/>
```

### Full Example
```mdx
<Image 
  src="/images/webiny-dashboard.png" 
  alt="Webiny Dashboard Screenshot"
  title="The Webiny dashboard showing all available applications"
  width={1200}
  height={800}
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `src` | `string` | ✅ Yes | - | Path to the image file (relative to public folder or absolute URL) |
| `alt` | `string` | No | `""` | Alternative text for accessibility |
| `title` | `string` | No | - | Caption displayed below the image |
| `width` | `number` | No | `800` | Image width in pixels |
| `height` | `number` | No | `600` | Image height in pixels |
| `className` | `string` | No | - | Additional CSS classes |

## Image File Location

Place your images in the `public` folder:

```
public/
  images/
    screenshot1.png
    diagram.svg
    photo.jpg
```

Then reference them in MDX:
```mdx
<Image src="/images/screenshot1.png" alt="Screenshot" />
```

## Behavior

### Click to Fullscreen
- Click on any image to view it in fullscreen mode
- Zoom indicator appears on hover to indicate clickability

### Fullscreen Controls
- **Click outside**: Close fullscreen
- **ESC key**: Close fullscreen
- **X button**: Close fullscreen

### Responsive
- Images automatically scale to fit the container
- Fullscreen images scale to fit the viewport (max 95% of screen)

## Example in a Lesson

```mdx
---
title: "Getting Started with Webiny"
---

# Getting Started with Webiny

First, you'll see the Webiny dashboard after logging in:

<Image 
  src="/images/webiny-dashboard.png" 
  alt="Webiny Dashboard"
  title="The main Webiny dashboard with all applications"
/>

The dashboard provides access to all core features...
```

## Styling

The component uses Tailwind CSS classes and respects your theme (light/dark mode).

### Image Container
- Rounded corners with border
- Hover effect (slight opacity change)
- Cursor pointer to indicate clickability

### Fullscreen Modal
- Dark backdrop (95% opacity)
- Centered image
- High-quality rendering (100% quality in fullscreen)
- Title overlay at bottom (if provided)

## Accessibility

- ✅ `alt` text for screen readers
- ✅ Keyboard navigation (Tab + Enter/Space to open)
- ✅ ESC key to close
- ✅ ARIA labels for modal
- ✅ Focus management

## Tips

### Image Optimization
- Use Next.js optimized formats (WebP, AVIF)
- Keep images under 2MB for faster loading
- Use appropriate dimensions to avoid excessive scaling

### Alt Text
- Always provide meaningful alt text
- Describe what's in the image for accessibility
- Keep it concise but descriptive

### File Naming
- Use descriptive filenames: `webiny-dashboard.png` not `img1.png`
- Use lowercase and hyphens: `my-screenshot.png`
- Organize by lesson: `images/lesson1/`, `images/lesson2/`

## Example Images for Testing

Create some test images in `public/images/`:
- `public/images/example.png`
- `public/images/test-screenshot.png`

Then use in MDX:
```mdx
<Image src="/images/example.png" alt="Example" title="Test image" />
```

---

**Component Location:** `/components/image.tsx`
**Registration:** `/mdx-components.tsx`


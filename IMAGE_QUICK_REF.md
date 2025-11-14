# Image Component - Quick Reference

## Basic Syntax
```mdx
<Image src="/images/photo.png" alt="Description" />
```

## With Title
```mdx
<Image 
  src="/images/photo.png" 
  alt="Description"
  title="This appears as a caption below the image"
/>
```

## Props
- **src** (required): Path to image (e.g., `/images/screenshot.png`)
- **alt**: Alt text for accessibility
- **title**: Caption shown below image
- **width**: Width in pixels (default: 800)
- **height**: Height in pixels (default: 600)

## Features
- ✅ Click to view fullscreen
- ✅ ESC or click outside to close
- ✅ Responsive and optimized
- ✅ Zoom indicator on hover

## Where to Put Images
```
public/
  images/
    your-image.png  ← Put images here
```

## Example
```mdx
<Image 
  src="/images/dashboard.png" 
  alt="Webiny dashboard"
  title="Main dashboard view - click to enlarge"
  width={1200}
  height={800}
/>
```

## See Also
- Full docs: `IMAGE_COMPONENT_USAGE.md`
- Example lesson: `/course/getting-started/using-images`


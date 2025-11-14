# ExternalLink Component for MDX

## Overview
A custom ExternalLink component for MDX lessons that opens links in a new tab with proper security attributes and a visual indicator icon.

## Features
- ✅ Opens in new tab automatically
- ✅ Security attributes (`rel="noopener noreferrer"`)
- ✅ External link icon indicator
- ✅ Optional icon display
- ✅ Hover effects
- ✅ Accessible
- ✅ Theme-aware styling

## Usage in MDX Files

### Basic Usage
```mdx
<ExternalLink href="https://www.webiny.com">Visit Webiny</ExternalLink>
```

### Without Icon
```mdx
<ExternalLink href="https://www.webiny.com" showIcon={false}>
  Visit Webiny
</ExternalLink>
```

### In Text
```mdx
Check out the <ExternalLink href="https://www.webiny.com/docs">documentation</ExternalLink> for more details.
```

### Multiple Links in a List
```mdx
## Helpful Resources

- <ExternalLink href="https://www.webiny.com/docs">Official Documentation</ExternalLink>
- <ExternalLink href="https://github.com/webiny/webiny-js">GitHub Repository</ExternalLink>
- <ExternalLink href="https://www.webiny.com/blog">Webiny Blog</ExternalLink>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `href` | `string` | ✅ Yes | - | The URL to link to |
| `children` | `React.ReactNode` | ✅ Yes | - | The link text/content |
| `showIcon` | `boolean` | No | `true` | Whether to show the external link icon |
| `className` | `string` | No | - | Additional CSS classes |

## Security Features

### `target="_blank"`
Opens the link in a new tab/window, preventing navigation away from the lesson.

### `rel="noopener noreferrer"`
Important security attributes:
- **`noopener`**: Prevents the new page from accessing `window.opener`, protecting against reverse tabnabbing attacks
- **`noreferrer`**: Prevents the browser from sending referrer information to the target site

## Visual Design

### Default Appearance
- Primary color text (theme-aware)
- Small external link icon (3.5 x 3.5 rem)
- Inline-flex layout (icon aligned with text)
- Hover underline effect

### Hover State
- Underline appears
- Slightly reduced opacity (80%)
- Smooth transition

### Icon
- Uses Lucide's `ExternalLink` icon
- Positioned inline after the link text
- Same color as the text
- Scales with text size

## Examples

### In a Paragraph
```mdx
Webiny is a serverless CMS built with Node.js and React. Learn more on the 
<ExternalLink href="https://www.webiny.com">official website</ExternalLink>.
```

### Call to Action
```mdx
<Callout type="info">
Want to learn more? Check out the 
<ExternalLink href="https://www.webiny.com/docs/tutorials">official tutorials</ExternalLink>
for step-by-step guides.
</Callout>
```

### In Code Documentation
```mdx
## API Reference

For detailed API documentation, visit:
<ExternalLink href="https://www.webiny.com/docs/api-reference">
  Webiny API Reference
</ExternalLink>
```

### Multiple Links in Content
```mdx
## Learning Resources

Before you begin, familiarize yourself with:

1. <ExternalLink href="https://reactjs.org">React basics</ExternalLink>
2. <ExternalLink href="https://nodejs.org">Node.js fundamentals</ExternalLink>
3. <ExternalLink href="https://www.webiny.com/serverless-app/introduction">Serverless concepts</ExternalLink>
```

## Comparison with Default Links

### Default MDX Link (from mdx-components.tsx)
```mdx
[Visit Webiny](https://www.webiny.com)
```
- Opens in new tab
- Has external link indicator
- Standard appearance

### ExternalLink Component
```mdx
<ExternalLink href="https://www.webiny.com">Visit Webiny</ExternalLink>
```
- Opens in new tab
- Has customizable icon
- Can disable icon if needed
- More control over styling
- More explicit in MDX code

## Best Practices

### When to Use ExternalLink
- ✅ Links to external websites
- ✅ Links to documentation sites
- ✅ Links to GitHub repositories
- ✅ Links to blog posts on other sites
- ✅ Any link that should open in a new tab

### When to Use Regular Links
- ✅ Internal navigation within the course
- ✅ Links to other lessons
- ✅ Links to chapter pages
- ✅ Anchor links within the same page

### Link Text Best Practices
- **Be descriptive**: "View the documentation" not "Click here"
- **Indicate purpose**: "Download the starter template"
- **Keep it concise**: Short but meaningful
- **Avoid generic text**: Use specific descriptions

### Accessibility
- Always provide meaningful link text
- Avoid "click here" or "read more" without context
- Link text should make sense when read out of context
- Use descriptive phrases that explain where the link goes

## Styling Customization

### Custom Classes
```mdx
<ExternalLink 
  href="https://www.webiny.com" 
  className="font-bold text-lg"
>
  Important Resource
</ExternalLink>
```

### No Icon Version
For cleaner inline text:
```mdx
As mentioned in the <ExternalLink href="https://..." showIcon={false}>previous article</ExternalLink>, we can...
```

## Technical Details

### Component Location
`/components/external-link.tsx`

### Dependencies
- `lucide-react` - For the external link icon
- `@/lib/utils` - For the `cn()` utility

### Browser Support
- ✅ All modern browsers
- ✅ Mobile devices
- ✅ Touch-friendly
- ✅ Keyboard accessible

### Performance
- Lightweight component
- No additional bundle size impact
- Uses Next.js optimized imports

## Example in Action

See the example in `/content/lessons/website-builder/creating-pages.mdx`:

```mdx
## External Links

Check out these resources:
- <ExternalLink href="https://www.webiny.com/docs">Webiny Documentation</ExternalLink>
- <ExternalLink href="https://github.com/webiny/webiny-js">Webiny GitHub Repository</ExternalLink>
- <ExternalLink href="https://www.webiny.com/blog">Webiny Blog</ExternalLink>
```

## Quick Reference

```mdx
<!-- Basic usage -->
<ExternalLink href="URL">Link Text</ExternalLink>

<!-- Without icon -->
<ExternalLink href="URL" showIcon={false}>Link Text</ExternalLink>

<!-- With custom styling -->
<ExternalLink href="URL" className="custom-class">Link Text</ExternalLink>
```

---

**Component:** `/components/external-link.tsx`  
**Registration:** `/mdx-components.tsx`  
**Example:** `/content/lessons/website-builder/creating-pages.mdx`


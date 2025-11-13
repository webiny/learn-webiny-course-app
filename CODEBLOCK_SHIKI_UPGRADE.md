# CodeBlock Component - Shiki Implementation

## Summary
Improved the CodeBlock component to use Shiki for professional syntax highlighting. Shiki uses the same engine as VS Code for accurate, beautiful code highlighting.

## Installation Required

Before using the updated component, install Shiki:

```bash
pnpm add shiki
```

Or if you prefer npm:
```bash
npm install shiki
```

## What's New

### Features Added:
1. **Shiki Integration** - Uses VS Code's syntax highlighting engine
2. **Dual Theme Support** - Automatically switches between light/dark themes
3. **Line Highlighting** - Highlight specific lines with blue accent
4. **Line Numbers** - Optional line numbers (enabled by default)
5. **Better Language Support** - Added JSON, bash, and shell support
6. **Copy to Clipboard** - Copy button with visual feedback
7. **Filename Display** - Shows file icon badges and names
8. **Error Handling** - Graceful fallback if highlighting fails

### Improvements:
- Better color accuracy matching VS Code
- Proper token parsing (keywords, strings, functions, etc.)
- Smooth theme transitions
- Better accessibility
- Improved performance with async highlighting

## Usage

### Basic Usage
```tsx
<CodeBlock
  code={`const greeting = "Hello, World!";
console.log(greeting);`}
  language="typescript"
/>
```

### With Filename
```tsx
<CodeBlock
  code={`import React from 'react';`}
  language="tsx"
  filename="App.tsx"
/>
```

### With Line Numbers and Highlighting
```tsx
<CodeBlock
  code={`function add(a, b) {
  return a + b;
}
console.log(add(2, 3));`}
  language="javascript"
  filename="math.js"
  showLineNumbers={true}
  highlightLines={[2, 4]}
/>
```

## Supported Languages

- `javascript` / `jsx`
- `typescript` / `tsx`
- `css`
- `html`
- `json`
- `bash` / `shell`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | required | The code to display |
| `language` | `string` | required | Programming language |
| `filename` | `string` | optional | Display filename in header |
| `highlightLines` | `number[]` | `[]` | Array of line numbers to highlight |
| `showLineNumbers` | `boolean` | `true` | Show/hide line numbers |

## Themes

The component uses Shiki's built-in themes:
- **Light Mode**: `github-light`
- **Dark Mode**: `github-dark`

These themes automatically switch based on your app's theme (via CSS variables).

## Styling Features

### Line Numbers
- Positioned absolutely on the left
- Muted color with 50% opacity
- Non-selectable (won't be copied)

### Highlighted Lines
- Blue background tint
- Blue left border accent
- Maintains line number positioning

### File Header
- Language badge with color coding
- Filename display
- Copy button with success state

## Performance

The component uses:
- **Async highlighting** to avoid blocking UI
- **useEffect** for client-side only rendering
- **Memoization** through React's rendering cycle
- **Fallback rendering** for errors

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid/Flexbox
- CSS Custom Properties
- Clipboard API

## Example in MDX

You can use this in your MDX files:

\`\`\`mdx
<CodeBlock
  code={\`
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
\`}
  language="javascript"
  filename="fibonacci.js"
  highlightLines={[2, 3]}
  showLineNumbers={true}
/>
\`\`\`

## Next Steps

After installing shiki with `pnpm add shiki`, the component will work automatically. The syntax highlighting will be significantly better than the previous manual implementation, with accurate token recognition and beautiful colors.


# CodeBlock Component - Usage Fix

## ✅ Issue Resolved

**Problem:** CodeBlock components weren't rendering code correctly when template literals were used inline in JSX props.

**Root Cause:** MDX doesn't properly parse template literals when they're used directly in JSX attribute values like `code={`...`}`.

## ✅ Solution

Export code strings as constants at the top of the MDX file, then reference them in the CodeBlock component.

### ❌ Before (Broken)

```mdx
---
title: "My Lesson"
---

# My Lesson

<CodeBlock
  language="typescript"
  filename="example.ts"
  code={`const hello = "world";
console.log(hello);`}
/>
```

This doesn't work because MDX can't properly parse the template literal in the JSX attribute.

### ✅ After (Fixed)

```mdx
---
title: "My Lesson"
---

export const exampleCode = `const hello = "world";
console.log(hello);`;

# My Lesson

<CodeBlock
  language="typescript"
  filename="example.ts"
  code={exampleCode}
/>
```

This works because:
1. MDX properly handles `export const` with template literals
2. The variable reference `code={exampleCode}` works correctly in JSX

## 📝 Best Practices

### 1. Export Code at the Top

Always export your code strings right after the frontmatter:

```mdx
---
title: "Lesson Title"
---

export const codeExample1 = `...`;
export const codeExample2 = `...`;

# Lesson Content
```

### 2. Use Descriptive Names

Name your constants clearly:

```mdx
export const setupCommandCode = `npm install webiny`;
export const configFileCode = `module.exports = {...}`;
export const componentCode = `export const MyComponent = () => {...}`;
```

### 3. Escape Template Literals

If your code contains template literal syntax (backticks or `${}`), escape them:

```mdx
export const exampleCode = `const price = \${item.price}`;
//                                        ↑ escaped with backslash
```

Or use `$\{` for template literal placeholders:

```mdx
export const exampleCode = `<p>Price: $\{price}/mo</p>`;
```

## 🎯 Fixed Example

The `custom-elements.mdx` file has been updated with this pattern:

```mdx
---
title: "Custom Page Elements"
---

export const pricingCardCode = `import React from 'react';
// ... rest of the code
`;

export const registerElementCode = `import { PbEditorPageElementPlugin } from '@webiny/app-page-builder/types';
// ... rest of the code
`;

# Custom Page Elements

<CodeBlock
  language="typescript"
  filename="PricingCard.tsx"
  code={pricingCardCode}
/>

<CodeBlock
  language="typescript"
  filename="index.tsx"
  code={registerElementCode}
/>
```

## 🔧 CodeBlock Props

The CodeBlock component accepts:

```typescript
interface CodeBlockProps {
  code: string                    // Required: The code to display
  language: "javascript" | "typescript" | "tsx" | "jsx" | "css" | "html" | "plaintext"
  filename?: string               // Optional: Show filename in header
  highlightLines?: number[]       // Optional: Highlight specific lines
  showLineNumbers?: boolean       // Optional: Show line numbers
}
```

### Usage Examples

**Basic:**
```mdx
export const code = `console.log("Hello");`;

<CodeBlock language="javascript" code={code} />
```

**With Filename:**
```mdx
export const code = `console.log("Hello");`;

<CodeBlock 
  language="javascript" 
  filename="app.js"
  code={code} 
/>
```

**With Line Highlighting:**
```mdx
export const code = `line 1
line 2
line 3`;

<CodeBlock 
  language="javascript" 
  highlightLines={[2]} 
  code={code} 
/>
```

**With Line Numbers:**
```mdx
export const code = `const x = 1;
const y = 2;`;

<CodeBlock 
  language="javascript" 
  showLineNumbers={true}
  code={code} 
/>
```

## ✅ Summary

**Issue:** Template literals in JSX props don't work in MDX
**Solution:** Export code as constants, then reference them
**Pattern:** 
```mdx
export const myCode = `...`;
<CodeBlock code={myCode} />
```

This pattern ensures CodeBlock components render properly in all MDX lessons! 🎉


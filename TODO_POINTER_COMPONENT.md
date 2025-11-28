# TodoPointer Component

## Overview

The `TodoPointer` component is a development-only tool for marking incomplete or in-progress sections in MDX lesson files. It provides prominent visual indicators that are automatically hidden in production builds and can be detected during the build process.

## Features

### Development Only
- ✅ Only renders in development (`NODE_ENV === 'development'`)
- ✅ Automatically hidden in production builds
- ✅ Zero performance impact in production

### Visual Design
- 🚨 **Highly Prominent**: Red border with large warning styling
- 🔴 **Warning Icon**: Clear alert symbol
- 💎 **TODO Badge**: Distinctive red badge with emoji
- 📝 **Detailed Message**: Space for comprehensive notes

### Build Integration
- ✅ **Automatic Detection**: Script scans MDX files for TodoPointer components
- ✅ **Watch Mode**: Real-time detection during development
- ✅ **Build Blocking**: Production builds fail if TodoPointers found
- ✅ **CI/CD Ready**: Prevents incomplete content from being deployed

## Usage

### Basic Example

```mdx
<TodoPointer 
  title="Add Production Deployment Examples" 
  message="Need to add concrete examples of production deployment configurations and best practices. Include screenshots of the deployment process and common pitfalls to avoid."
/>
```

### Another Example

```mdx
<TodoPointer 
  title="Review Technical Accuracy" 
  message="This section needs to be reviewed by a technical expert to ensure all code examples are correct and follow current best practices."
/>
```

### In Context

```mdx
## Deployment Configuration

<TodoPointer 
  title="Add Environment Variables Section" 
  message="Document the required environment variables for production deployments, including AWS credentials, API keys, and other configuration options."
/>

When deploying to production, you'll need to configure...
```

## Props

```typescript
interface TodoPointerProps {
  title: string    // Short title describing what needs to be done
  message: string  // Detailed description of the task or issue
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | Short, clear title of what needs to be done |
| `message` | `string` | ✅ | Detailed description, instructions, or notes |

## Visual Design

### Layout

```
┌─────────────────────────────────────────────────────┐
│ ⚠️  [🚨 TODO] [Development Only]                    │
│                                                      │
│ Add Production Deployment Examples                   │
│                                                      │
│ Need to add concrete examples of production         │
│ deployment configurations and best practices...      │
│                                                      │
│ ─────────────────────────────────────────────────── │
│ ⚠️ This component will not appear in production...  │
└─────────────────────────────────────────────────────┘
```

### Styling

**Colors:**
- Border: 4px solid red (`border-red-500`)
- Background: Light red (`bg-red-50` / `dark:bg-red-950/30`)
- Badge: Red with white text (`bg-red-600`)
- Text: Dark red for readability

**Components:**
- Warning icon in red circle
- TODO badge with 🚨 emoji
- "Development Only" label
- Title in large bold text
- Message in readable paragraph
- Footer note about production behavior

## Checking for TODOs

### Manual Check

Run the check script manually:

```bash
npm run check-todos
```

**Output Example:**

```
🔍 Checking for TodoPointer components in MDX files...

⚠️  Found 2 file(s) with TodoPointer components:

1. content/lessons/getting-started/webiny-deployments.mdx
   1) Line 95: "Add Production Deployment Examples"

2. content/lessons/headless-cms/content-models.mdx
   1) Line 45: "Add Content Model Screenshot"
   2) Line 120: "Review API Examples"

📝 Summary:
   - Files with TODOs: 2
   - Total TODOs: 3

⚠️  Please review and remove TodoPointer components before deploying to production.
```

### Watch Mode (Development)

When running `npm run dev`, TodoPointers are automatically detected:

```bash
npm run dev
```

The watch mode runs in the background and alerts you whenever you add or modify files containing TodoPointer components.

### Build Check

The build process automatically checks for TodoPointers:

```bash
npm run build
```

If TodoPointers are found:
- ❌ **Development**: Shows warning but continues
- ❌ **Production**: Build fails with error message

## Integration

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "npm run generate-mdx-registry && npm run dev:watch",
    "dev:watch": "concurrently \"next dev\" \"npm run watch-mdx\" \"npm run watch-todos\" ...",
    "watch-todos": "nodemon --watch content/lessons --ext mdx --exec \"node scripts/check-todo-pointers.mjs\" --delay 1",
    "check-todos": "node scripts/check-todo-pointers.mjs",
    "build": "npm run check-todos && npm run generate-mdx-registry && next build"
  }
}
```

### Files

**Component:**
- `/components/todo-pointer.tsx` - React component

**Script:**
- `/scripts/check-todo-pointers.mjs` - Detection script

**Registry:**
- `/mdx-components.tsx` - Component registered for MDX

## Use Cases

### 1. Incomplete Sections

```mdx
<TodoPointer 
  title="Complete API Examples" 
  message="Add 3-5 practical examples of using the GraphQL API with different query patterns."
/>
```

### 2. Pending Reviews

```mdx
<TodoPointer 
  title="Technical Review Required" 
  message="This section needs review by the engineering team to ensure accuracy of the serverless architecture description."
/>
```

### 3. Missing Assets

```mdx
<TodoPointer 
  title="Add Screenshots" 
  message="Need screenshots of the admin interface showing the content model creation process. Take screenshots at 2x resolution for retina displays."
/>
```

### 4. Placeholder Content

```mdx
<TodoPointer 
  title="Replace Lorem Ipsum" 
  message="This section currently contains placeholder text. Replace with actual content about deployment configurations."
/>
```

### 5. Collaborative Notes

```mdx
<TodoPointer 
  title="Question for Subject Matter Expert" 
  message="@john - Can you confirm if multi-region deployments are available in the Business tier or only Enterprise?"
/>
```

## Best Practices

### ✅ Do

- **Be Specific**: Include clear, actionable details in the message
- **Use Early**: Add TodoPointers as you draft content
- **Remove Before Publishing**: Clean up all TodoPointers before marking lesson complete
- **Include Context**: Mention what information is needed or who should review
- **Use for Collaboration**: Great for marking sections that need expert input

### ❌ Don't

- **Don't Deploy with TODOs**: Build process prevents this, but always check manually
- **Don't Be Vague**: "Fix this later" isn't helpful - be specific
- **Don't Use in Production**: Component won't render but still shouldn't be committed
- **Don't Overuse**: Too many TODOs in one lesson can be overwhelming
- **Don't Forget**: Set reminders to address TodoPointers before deadlines

## Workflow

### Content Creation Workflow

1. **Draft**: Write lesson content, add TodoPointers for incomplete sections
2. **Review**: Check `npm run check-todos` to see all pending items
3. **Complete**: Address each TodoPointer systematically
4. **Verify**: Run `npm run check-todos` again to confirm all removed
5. **Build**: Run `npm run build` to ensure clean build
6. **Deploy**: Deploy with confidence knowing no incomplete content exists

### Team Workflow

1. **Author**: Creates lesson, adds TodoPointers for unclear sections
2. **SME Review**: Subject matter expert addresses technical TodoPointers
3. **Editor Review**: Editor addresses writing/clarity TodoPointers
4. **QA Check**: Run `npm run check-todos` to verify all addressed
5. **Approval**: Content approved for publication
6. **Deploy**: Clean build with no TodoPointers

## Production Safety

### Build Process

The build script includes TodoPointer checking:

```bash
npm run build
# Runs: npm run check-todos && npm run generate-mdx-registry && next build
```

If TodoPointers exist:
- Development: Warning shown, build continues
- Production: Error thrown, build fails

### Environment Detection

```typescript
if (process.env.NODE_ENV !== 'development') {
  return null
}
```

Even if TodoPointers slip through to production code, they won't render.

### CI/CD Integration

Add to CI/CD pipeline:

```yaml
- name: Check for TODOs
  run: npm run check-todos
  
- name: Build
  run: npm run build
```

## Troubleshooting

### TodoPointer Not Showing

**Problem**: Component not appearing in development

**Solutions:**
- Check `NODE_ENV` is set to `development`
- Verify component is imported in `mdx-components.tsx`
- Check for syntax errors in MDX file
- Restart development server

### Check Script Not Finding TODOs

**Problem**: Script doesn't detect TodoPointers

**Solutions:**
- Ensure TodoPointer uses exact case (`TodoPointer` not `todopointer`)
- Check file is in `content/lessons/` directory
- Verify file has `.mdx` extension
- Check for syntax errors in component usage

### Build Not Failing

**Problem**: Production build succeeds with TodoPointers present

**Solutions:**
- Check `NODE_ENV` is set to `production`
- Verify `check-todos` is in build script
- Run `npm run check-todos` manually to test
- Check script permissions and execution

## Summary

The TodoPointer component:
- ✅ Development-only visual indicator
- ✅ Highly prominent red warning design
- ✅ Automatic detection during build
- ✅ Watch mode for real-time alerts
- ✅ Production build protection
- ✅ CI/CD integration ready
- ✅ Perfect for collaborative content development

Never ship incomplete content again! 🚨


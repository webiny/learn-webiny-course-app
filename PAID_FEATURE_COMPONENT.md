# PaidFeature Component

## Overview

The `PaidFeature` component is used in MDX lesson files to highlight features that are only available in paid Webiny tiers (Business or Enterprise). It provides clear visual indication of feature availability and licensing requirements.

## Component Features

### Visual Design

**Business Tier:**
- 💎 Blue color scheme
- Icon: Building/office icon
- Badge: "Business"
- Availability: "Business & Enterprise"

**Enterprise Tier:**
- 💎 Purple color scheme
- Icon: Lock icon
- Badge: "Enterprise"
- Availability: "Enterprise only"

### Automatic Tier Logic

- **`tier="business"`**: Feature is available in BOTH Business AND Enterprise tiers
- **`tier="enterprise"`**: Feature is available ONLY in Enterprise tier

This follows the logical pricing model where Enterprise tier includes all Business tier features.

## Usage Examples

### Basic Usage - Business Tier

```mdx
<PaidFeature tier="business">
Advanced multi-tenancy features including custom tenant hierarchies, granular access control, and automated tenant provisioning are available in Webiny Business and Enterprise tiers.
</PaidFeature>
```

**Result:**
- Blue callout box
- Badge: "💎 Business"
- Text: "Business & Enterprise"
- Default message about Business and Enterprise availability

### Basic Usage - Enterprise Tier

```mdx
<PaidFeature tier="enterprise">
SSO integration with SAML 2.0 and advanced security features are exclusively available in Webiny Enterprise tier.
</PaidFeature>
```

**Result:**
- Purple callout box
- Badge: "💎 Enterprise"
- Text: "Enterprise only"
- Default message about Enterprise-only availability

### With Custom Message

```mdx
<PaidFeature tier="business" message="Custom branding requires a Business or Enterprise license.">
You can customize logos, colors, and themes to match your brand identity.
</PaidFeature>
```

**Result:**
- Uses custom message instead of default
- Children content is also displayed

### Without Children (Message Only)

```mdx
<PaidFeature tier="enterprise" message="Dedicated support requires an Enterprise subscription." />
```

**Result:**
- Only displays the custom message
- No additional content

## Props

```typescript
interface PaidFeatureProps {
  tier: "business" | "enterprise"
  message?: string
  children?: React.ReactNode
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `tier` | `"business"` \| `"enterprise"` | Yes | Determines which tier the feature is available in |
| `message` | `string` | No | Custom message to display instead of default |
| `children` | `React.ReactNode` | No | Custom content (can be used with or instead of message) |

## Default Messages

### Business Tier
```
This feature is available in Webiny Business and Enterprise tiers.
```

### Enterprise Tier
```
This feature is available exclusively in Webiny Enterprise tier.
```

## Design Specifications

### Business Tier

**Colors:**
- Border: `border-blue-200` / `dark:border-blue-800`
- Background: `bg-blue-50` / `dark:bg-blue-950`
- Badge: `bg-blue-600` / `dark:bg-blue-700`
- Text: `text-blue-900` / `dark:text-blue-100`

**Icon:**
- Building/office icon (represents business/company)

### Enterprise Tier

**Colors:**
- Border: `border-purple-200` / `dark:border-purple-800`
- Background: `bg-purple-50` / `dark:bg-purple-950`
- Badge: `bg-purple-600` / `dark:bg-purple-700`
- Text: `text-purple-900` / `dark:text-purple-100`

**Icon:**
- Lock icon (represents security/exclusivity)

## Real-World Example

From the multi-tenancy lesson (`content/lessons/foundation/multi-tenancy.mdx`):

```mdx
## Advanced Multi-Tenancy Features

<PaidFeature tier="business">
Advanced multi-tenancy features including custom tenant hierarchies, granular access control, and automated tenant provisioning are available in Webiny Business and Enterprise tiers.
</PaidFeature>

Webiny offers several advanced features to enhance multi-tenancy management:
- **Custom Tenant Hierarchies**: Extend the default tenant structure...
- **Granular Access Control**: Implement fine-grained access control policies...
- **Tenant-Specific Configurations**: Customize settings for each tenant...
```

## When to Use

Use the `PaidFeature` component when:

1. **Introducing a paid feature** - At the beginning of a section discussing paid functionality
2. **Mixed content** - When a lesson covers both free and paid features
3. **Feature comparison** - When explaining what's available in different tiers
4. **Upgrade prompts** - When showing what users can access with a paid plan

## Best Practices

### ✅ Do

- Place at the beginning of sections about paid features
- Use descriptive content that explains what's included
- Be specific about what features are available
- Use `tier="business"` for features in both Business and Enterprise
- Use `tier="enterprise"` only for truly Enterprise-exclusive features

### ❌ Don't

- Don't overuse throughout the lesson (one per major section is enough)
- Don't use vague descriptions ("Premium features available")
- Don't use `tier="enterprise"` for features also in Business tier
- Don't hide critical learning content behind paid indicators

## Component Location

**File:** `/components/paid-feature.tsx`

**Registered in:** `/mdx-components.tsx`

**Available in:** All MDX lesson files

## Styling

The component uses:
- Tailwind CSS for styling
- Color-coded borders and backgrounds
- Theme-aware (light/dark mode)
- Left border accent (4px)
- Icon and badge indicators
- Responsive layout

## Accessibility

- Clear visual hierarchy
- Color + icon + text for differentiation (not color alone)
- Readable contrast ratios
- Semantic HTML structure
- Works with screen readers

## Testing

Test the component by:

1. **View in browser:**
   ```
   http://localhost:3000/course/foundation/multi-tenancy
   ```

2. **Check both themes:**
   - Toggle light/dark mode
   - Verify colors are appropriate in both

3. **Check responsiveness:**
   - Mobile view
   - Tablet view
   - Desktop view

## Future Enhancements

Possible improvements:
- [ ] Add link to pricing page
- [ ] Add "Learn more" button
- [ ] Track which features users are interested in
- [ ] Add tooltip with tier details
- [ ] Add comparison table option
- [ ] Support for trial/demo availability

## Summary

The `PaidFeature` component:
- ✅ Clearly indicates paid features
- ✅ Distinguishes between Business and Enterprise tiers
- ✅ Provides visual hierarchy with icons and badges
- ✅ Supports custom messages
- ✅ Works in all MDX lesson files
- ✅ Theme-aware and responsive
- ✅ Follows Webiny's tier logic (Business features included in Enterprise)

Perfect for transparently communicating feature availability while maintaining a professional, educational tone in your lessons!


# Font Size Control Feature

## ✅ Feature Added

A font size control has been added next to the theme switcher, allowing users to adjust the reading font size across the entire application.

## 🎯 Features

### Font Size Options
- **Small** - 14px base font size
- **Medium** - 16px base font size (default)
- **Large** - 18px base font size

### User Experience
- **Dropdown menu** - Clean interface with three size options
- **Persistent preference** - Choice saved to localStorage
- **Global application** - Font size applies to entire app via `document.documentElement`
- **Visual feedback** - Current selection shown in bold
- **Type icon** - Clear typography icon using lucide-react

## 📁 Files Created/Modified

### New File
**`components/font-size-control.tsx`**
- Client-side component for font size control
- Uses localStorage to persist user preference
- Dropdown menu with three font size options
- Icon button using lucide-react `Type` icon

### Modified Files

1. **`components/lesson-header.tsx`**
   - Added FontSizeControl import
   - Placed next to ThemeSwitcher in header

2. **`app/page.tsx`** (Home page)
   - Added FontSizeControl import
   - Placed next to ThemeSwitcher in nav

3. **`app/course/page.tsx`** (Course overview)
   - Added FontSizeControl import
   - Placed next to ThemeSwitcher in header

## 🎨 Implementation Details

### Component Structure

```typescript
type FontSize = "small" | "medium" | "large"

const fontSizeMap = {
  small: "14px",
  medium: "16px",
  large: "18px",
}
```

### How It Works

1. **Initialization**
   - Checks localStorage for saved preference
   - Defaults to "medium" (16px) if no preference
   - Applies font size to `document.documentElement.style.fontSize`

2. **User Interaction**
   - Click Type icon to open dropdown
   - Select desired font size
   - Preference saved to localStorage
   - Font size applied immediately

3. **Hydration Safety**
   - Uses `mounted` state to avoid hydration mismatches
   - Shows placeholder during SSR

### Global Application

Font size is applied to the root HTML element:
```typescript
document.documentElement.style.fontSize = fontSizeMap[newSize]
```

This affects all relative font size units (rem, em) throughout the application.

## 🎯 Placement

The font size control appears next to the theme switcher on:

1. **Lesson pages** - In the LessonHeader component
2. **Home page** - In the top navigation bar
3. **Course overview** - In the header

### Visual Layout
```
[Progress] [FontSize] [Theme] [Other Actions]
    ↓          ↓         ↓
  Progress   [Aa]    [🌙/☀️]
```

## 🧪 Testing

### Test the Feature

1. **Navigate to any page**
   ```
   http://localhost:3000
   http://localhost:3000/course
   http://localhost:3000/course/introduction
   ```

2. **Click the Type icon** (Aa)

3. **Select a font size** from dropdown

4. **Verify:**
   - ✅ Font size changes immediately
   - ✅ Change persists on page reload
   - ✅ Works across all pages
   - ✅ Current selection shown in bold
   - ✅ Icon button styled consistently with theme toggle

### Expected Behavior

- **Small (14px)**: Compact reading experience
- **Medium (16px)**: Default comfortable reading
- **Large (18px)**: Larger text for better readability

## 💡 Technical Notes

### localStorage Key
```typescript
localStorage.setItem("fontSize", newSize)
localStorage.getItem("fontSize")
```

### CSS Application
```typescript
// Applied to root element
document.documentElement.style.fontSize = "16px"
```

### Hydration Handling
```typescript
if (!mounted) {
  return <Button>...</Button> // Placeholder during SSR
}
```

## 🎨 Design Decisions

1. **Three sizes** - Simple choice, covers most needs
2. **Absolute values** - 14px, 16px, 18px for consistency
3. **Root application** - Affects entire app via html element
4. **Dropdown menu** - Cleaner than slider, clear options
5. **Type icon** - Universal typography symbol
6. **Persistent** - Remembers user choice via localStorage

## 🚀 Future Enhancements

Potential improvements:
- Add more font size options (e.g., extra-small, extra-large)
- Allow custom font size input
- Add keyboard shortcuts (Ctrl+Plus, Ctrl+Minus)
- Sync with system preferences
- Add accessibility presets
- Font family selection

## ✅ Summary

**Feature:** Font size control
**Location:** Next to theme switcher
**Options:** Small (14px), Medium (16px), Large (18px)
**Persistence:** localStorage
**Scope:** Global (entire application)
**Icon:** Type icon (lucide-react)

Users can now customize their reading experience by adjusting the font size to their preference! 🎉


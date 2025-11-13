# Lesson Number Scoping Fix - Complete

## Summary
Fixed the lesson numbering to be scoped to the current chapter instead of counting across all chapters in the course.

## The Issue
The lesson number was counting sequentially across ALL chapters:
- Chapter 1, Lesson 1 → displayed as "1"
- Chapter 2, Lesson 1 → displayed as "2" ❌ (should be "1")
- Chapter 2, Lesson 2 → displayed as "3" ❌ (should be "2")

## The Fix
Lesson numbers now restart at 1 for each chapter:
- Chapter 1, Lesson 1 → displays as "1"
- Chapter 2, Lesson 1 → displays as "1" ✅
- Chapter 2, Lesson 2 → displays as "2" ✅

## Changes Made

### 1. Lesson Page (`app/course/[...slug]/page.tsx`)
- Changed import from `getLessonNumber` to `getLessonNumberInChapter`
- Uses `getLessonNumberInChapter(lessonSlug)` to calculate lesson position within current chapter only
- Passes `lessonNumber` to `LessonContentWrapper`

### 2. LessonH1 Component (`components/lesson-h1.tsx`)
- Uses `lessonNumber` from context (now scoped to chapter)
- Displays "Chapter X" (without chapter title) to match reference image
- Shows large lesson number that resets per chapter

## Visual Output

For the 9th lesson of Chapter 9:
```
   9        Chapter 9
            Streaming
```

- **Large "9"**: Lesson number within Chapter 9 (100px, 15% opacity)
- **"Chapter 9"**: Simple chapter label
- **"Streaming"**: Lesson title

## Implementation Details

The `getLessonNumberInChapter()` function:
```typescript
export function getLessonNumberInChapter(slug: string): number {
  const result = getLessonBySlug(slug)
  if (!result) return 0

  const { chapter, lesson } = result
  const lessonIndex = chapter.lessons.findIndex((l) => l.id === lesson.id)
  return lessonIndex !== -1 ? lessonIndex + 1 : 0
}
```

This finds the lesson's index within its chapter's lessons array and returns a 1-based number.

## Status
✅ Lesson numbering scoped to current chapter
✅ Visual display matches reference image
✅ All components properly wired
✅ Ready to use


# Lesson H1 Update - Display Lesson Number

## Summary
Updated the lesson h1 heading to display the overall lesson number (across all chapters) instead of the chapter number, while still showing chapter information in the subtitle.

## Changes Made

### 1. Added Helper Functions (`lib/course-data.ts`)
- `getLessonNumber(slug: string)`: Returns the overall lesson number (1-based) across all chapters
- `getLessonNumberInChapter(slug: string)`: Returns the lesson number within its chapter (utility function)

### 2. Updated Lesson Context (`components/lesson-context.tsx`)
- Added `lessonNumber: number` to `LessonContextType`
- Updated `LessonProvider` to accept and provide `lessonNumber`

### 3. Updated Lesson Content Wrapper (`components/lesson-content-wrapper.tsx`)
- Added `lessonNumber` prop to interface
- Passes `lessonNumber` to `LessonProvider`

### 4. Updated Lesson Page (`app/course/[...slug]/page.tsx`)
- Imported `getLessonNumber` function
- Calculates lesson number using `getLessonNumber(lessonSlug)`
- Passes `lessonNumber` to `LessonContentWrapper`

### 5. Updated LessonH1 Component (`components/lesson-h1.tsx`)
- Now uses `lessonNumber` from context instead of `chapterNumber`
- Large number displays the overall lesson number (e.g., 9)
- Subtitle shows "Chapter X: Chapter Title"
- Main heading displays the lesson title

## Visual Layout

```
   9        Chapter 3: Website Builder
            Creating Pages
```

- **Large "9"**: Overall lesson number across all chapters (100px, 15% opacity)
- **"Chapter 3: Website Builder"**: Shows which chapter this lesson belongs to
- **"Creating Pages"**: The lesson title

## Lesson Numbering

The lesson numbers are calculated sequentially across all chapters:
- Chapter 1, Lesson 1 → Lesson #1
- Chapter 2, Lesson 1 → Lesson #2
- Chapter 2, Lesson 2 → Lesson #3
- etc.

This provides a continuous count of progress through the entire course rather than restarting at 1 for each chapter.

## Status
✅ Helper functions added
✅ Context updated with lesson number
✅ All components updated
✅ No TypeScript errors
✅ Ready to test


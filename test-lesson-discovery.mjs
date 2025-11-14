// Test script to verify automatic lesson discovery
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function discoverLessons() {
  const contentDir = path.join(__dirname, "content", "lessons")
  const pathMap = {}

  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory not found: ${contentDir}`)
    return pathMap
  }

  // Read all chapter directories
  const chapters = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))

  for (const chapter of chapters) {
    const chapterPath = path.join(contentDir, chapter.name)

    // Read all MDX files in the chapter directory
    const files = fs.readdirSync(chapterPath)
      .filter(file => file.endsWith('.mdx'))

    for (const file of files) {
      const fileName = file.replace('.mdx', '')
      const filePath = path.join(chapterPath, file)

      // Create slug: for files named same as directory, use just directory name
      // Otherwise use directory/filename format
      const slug = fileName === chapter.name
        ? chapter.name
        : `${chapter.name}/${fileName}`

      pathMap[slug] = filePath
    }
  }

  return pathMap
}

console.log('🔍 Discovering lessons...\n')
const lessons = discoverLessons()

console.log(`Found ${Object.keys(lessons).length} lessons:\n`)
for (const [slug, filePath] of Object.entries(lessons)) {
  const relativePath = path.relative(__dirname, filePath)
  console.log(`  ✓ ${slug.padEnd(40)} → ${relativePath}`)
}

console.log('\n✅ Lesson discovery complete!')


import { ComponentType } from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { mdxImportRegistry } from "./mdx-registry"

/**
 * Frontmatter metadata extracted from MDX files
 */
export interface MDXFrontmatter {
  title?: string
  description?: string
  date?: string
  author?: string
  tags?: string[]
  [key: string]: any
}

/**
 * Result of loading an MDX file, including component and metadata
 */
export interface MDXContent {
  Component: ComponentType
  frontmatter: MDXFrontmatter
}

/**
 * Scans the lessons directory and returns a map of slug to file path
 * This runs at build time and runtime to discover all available lessons
 */
function discoverLessons(): Record<string, string> {
  const contentDir = path.join(process.cwd(), "content", "lessons")
  const pathMap: Record<string, string> = {}

  if (!fs.existsSync(contentDir)) {
    console.warn(`[MDX Loader] Content directory not found: ${contentDir}`)
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

// Cache the discovered lessons to avoid repeated filesystem scans
let lessonsCache: Record<string, string> | null = null

/**
 * Gets the file path for a lesson slug
 */
function getLessonFilePath(slug: string): string {
  if (!lessonsCache) {
    lessonsCache = discoverLessons()
  }
  return lessonsCache[slug] || ""
}

/**
 * Dynamically loads an MDX file based on the lesson slug
 * Uses Next.js-compatible dynamic imports via static registry
 * The registry is auto-generated from filesystem - see lib/mdx-registry.ts
 *
 * @param slug - The lesson slug (e.g., "introduction", "getting-started/setup")
 * @returns An object containing the MDX component and its frontmatter metadata
 */
export async function loadMDXContent(slug: string): Promise<MDXContent | null> {
  try {
    console.log(`[MDX Loader] Attempting to load MDX for slug: ${slug}`)

    // Check if we have an import function for this slug
    const importFn = mdxImportRegistry[slug]

    if (!importFn) {
      console.error(`[MDX Loader] No import registered for slug: ${slug}`)
      console.error(`[MDX Loader] Available slugs:`, Object.keys(mdxImportRegistry))
      return null
    }

    // Import the MDX module
    const mdxModule = await importFn()

    if (!mdxModule || !mdxModule.default) {
      console.error(`[MDX Loader] No default export found for slug: ${slug}`)
      return null
    }

    // Extract frontmatter by reading the raw file
    let frontmatter: MDXFrontmatter = {}

    try {
      const filePath = getLessonFilePath(slug)
      if (filePath && fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8")
        const { data } = matter(fileContent)
        frontmatter = data as MDXFrontmatter
      }
    } catch (error) {
      console.warn(`[MDX Loader] Could not extract frontmatter for slug: ${slug}`, error)
      // Continue with empty frontmatter rather than failing
    }

    console.log(`[MDX Loader] Successfully loaded MDX for slug: ${slug}`)

    return {
      Component: mdxModule.default as ComponentType,
      frontmatter
    }
  } catch (error) {
    console.error(`[MDX Loader] Failed to load MDX for slug: ${slug}`, error)
    return null
  }
}

/**
 * Get all available lesson slugs by scanning the filesystem
 * Useful for generating static paths
 */
export function getAllLessonSlugs(): string[] {
  if (!lessonsCache) {
    lessonsCache = discoverLessons()
  }
  return Object.keys(lessonsCache)
}


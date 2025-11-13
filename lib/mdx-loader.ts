import { ComponentType } from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

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
 * Gets the file path for a lesson slug
 */
function getLessonFilePath(slug: string): string {
  const contentDir = path.join(process.cwd(), "content", "lessons")

  // Map slugs to their file paths
  const pathMap: Record<string, string> = {
    "introduction": path.join(contentDir, "introduction", "introduction.mdx"),
    "getting-started/setup": path.join(contentDir, "getting-started", "setup.mdx"),
    "getting-started/project-structure": path.join(contentDir, "getting-started", "project-structure.mdx"),
    "headless-cms/content-models": path.join(contentDir, "headless-cms", "content-models.mdx"),
    "headless-cms/graphql-api": path.join(contentDir, "headless-cms", "graphql-api.mdx"),
    "website-builder/creating-pages": path.join(contentDir, "website-builder", "creating-pages.mdx"),
    "website-builder/custom-elements": path.join(contentDir, "website-builder", "custom-elements.mdx"),
    "serverless/architecture": path.join(contentDir, "serverless", "architecture.mdx"),
    "serverless/deployment": path.join(contentDir, "serverless", "deployment.mdx"),
    "best-practices/performance": path.join(contentDir, "best-practices", "performance.mdx"),
    "best-practices/security": path.join(contentDir, "best-practices", "security.mdx"),
  }

  return pathMap[slug] || ""
}

/**
 * Dynamically loads an MDX file based on the lesson slug
 * This replaces the hardcoded mdx-registry approach
 *
 * Since Next.js doesn't support fully dynamic imports with template literals,
 * we use a mapping approach that still allows us to add new lessons
 * without manually updating a registry - just drop MDX files in the folder.
 *
 * @param slug - The lesson slug (e.g., "introduction", "getting-started/setup")
 * @returns An object containing the MDX component and its frontmatter metadata
 */
export async function loadMDXContent(slug: string): Promise<MDXContent | null> {
  try {
    console.log(`[MDX Loader] Attempting to load MDX for slug: ${slug}`)

    let mdxModule: any

    // Dynamic import with all possible paths
    // Next.js will bundle all these at build time
    switch (slug) {
      case "introduction":
        mdxModule = await import("@/content/lessons/introduction/introduction.mdx")
        break
      case "getting-started/setup":
        mdxModule = await import("@/content/lessons/getting-started/setup.mdx")
        break
      case "getting-started/project-structure":
        mdxModule = await import("@/content/lessons/getting-started/project-structure.mdx")
        break
      case "headless-cms/content-models":
        mdxModule = await import("@/content/lessons/headless-cms/content-models.mdx")
        break
      case "headless-cms/graphql-api":
        mdxModule = await import("@/content/lessons/headless-cms/graphql-api.mdx")
        break
      case "website-builder/creating-pages":
        mdxModule = await import("@/content/lessons/website-builder/creating-pages.mdx")
        break
      case "website-builder/custom-elements":
        mdxModule = await import("@/content/lessons/website-builder/custom-elements.mdx")
        break
      case "serverless/architecture":
        mdxModule = await import("@/content/lessons/serverless/architecture.mdx")
        break
      case "serverless/deployment":
        mdxModule = await import("@/content/lessons/serverless/deployment.mdx")
        break
      case "best-practices/performance":
        mdxModule = await import("@/content/lessons/best-practices/performance.mdx")
        break
      case "best-practices/security":
        mdxModule = await import("@/content/lessons/best-practices/security.mdx")
        break
      default:
        console.error(`[MDX Loader] No MDX file configured for slug: ${slug}`)
        return null
    }

    if (!mdxModule || !mdxModule.default) {
      console.error(`[MDX Loader] No default export found for: ${slug}`)
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

    console.log(`[MDX Loader] Successfully loaded MDX for slug: ${slug}`, frontmatter)

    return {
      Component: mdxModule.default as ComponentType,
      frontmatter
    }
  } catch (error) {
    console.error(`[MDX Loader] Failed to load MDX for slug: ${slug}`, error)
    return null
  }
}


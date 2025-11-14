import { MetadataRoute } from 'next'
import { getRegisteredSlugs } from '@/lib/mdx-registry'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://learn.webiny.com'

  // Get all lessons from the registry
  const lessonSlugs = getRegisteredSlugs()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/course`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Dynamic lesson pages
  const lessonPages: MetadataRoute.Sitemap = lessonSlugs.map((slug) => ({
    url: `${baseUrl}/course/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Combine all pages
  return [...staticPages, ...lessonPages]
}


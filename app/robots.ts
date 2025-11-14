import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow private routes if needed in the future
      // disallow: ['/admin/', '/api/private/'],
    },
    sitemap: 'https://learn.webiny.com/sitemap.xml',
  }
}


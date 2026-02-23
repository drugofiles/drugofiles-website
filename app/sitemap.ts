import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.drugofiles.com'

  // Static pages (always included)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  try {
    // Fetch all projects
    const projects = await prisma.project.findMany({
      select: { slug: true, updatedAt: true },
    })

    // Fetch all macro areas (services)
    const macroAreas = await prisma.macroArea.findMany({
      select: { slug: true, updatedAt: true },
    })

    // Project pages
    const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Service pages
    const servicePages: MetadataRoute.Sitemap = macroAreas.map((area) => ({
      url: `${baseUrl}/services/${area.slug}`,
      lastModified: area.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    return [...staticPages, ...projectPages, ...servicePages]
  } catch (error) {
    console.error('Sitemap generation error:', error)
    // Return only static pages if database fails
    return staticPages
  }
}

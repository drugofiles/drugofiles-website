import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Rigenera ogni ora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://drugofiles.com'

  // Fetch all projects
  const projects = await prisma.project.findMany({
    select: { slug: true, updatedAt: true },
  })

  // Fetch all macro areas (services)
  const macroAreas = await prisma.macroArea.findMany({
    select: { slug: true, updatedAt: true },
  })

  // Fetch all case studies
  const caseStudies = await prisma.caseStudy.findMany({
    select: { slug: true, updatedAt: true },
  })

  // Static pages
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

  // Case study pages
  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: cs.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages, ...servicePages, ...caseStudyPages]
}

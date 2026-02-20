import { HeroSection } from '@/components/hero-section'
import { LogosSection } from '@/components/logos-section'
import { ShowreelSection } from '@/components/showreel-section'
import { PortfolioPreview } from '@/components/portfolio-preview'
import { CTASection } from '@/components/cta-section'
import { PageWrapper } from '@/components/page-wrapper'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

async function getFeaturedProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      include: { macroArea: true },
      orderBy: { createdAt: 'asc' },
      take: 6,
    })
    return projects
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

export default async function Home() {
  const projects = await getFeaturedProjects()

  return (
    <PageWrapper showLoading={true}>
      <main className="bg-[#dedacf] pb-4">
        <HeroSection />
        <LogosSection />
        <ShowreelSection />
        <PortfolioPreview projects={projects} />
        <CTASection />
      </main>
    </PageWrapper>
  )
}

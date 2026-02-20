import { HeroSection } from '@/components/hero-section'
import { LogosSection } from '@/components/logos-section'
import { ShowreelSection } from '@/components/showreel-section'
import { PortfolioPreview } from '@/components/portfolio-preview'
import { CTASection } from '@/components/cta-section'
import { PageWrapper } from '@/components/page-wrapper'

async function getFeaturedProjects() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/projects?featured=true&limit=6`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.projects || []
  } catch {
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

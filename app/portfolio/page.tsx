import { PageWrapper } from '@/components/page-wrapper'
import { CTASection } from '@/components/cta-section'
import { prisma } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = "force-dynamic"

export const metadata = {
  title: 'Progetti | Drugofiles Productions',
  description: 'Esplora i nostri progetti video: campagne pubblicitarie, video musicali, eventi privati e molto altro.',
}

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    include: {
      macroArea: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <PageWrapper showLoading={false}>
      <main className="bg-[#dedacf] pb-4">
        {/* Header */}
        <section className="pt-24 sm:pt-28 pb-12 sm:pb-16">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D1321] mb-4" style={{ letterSpacing: '-0.02em' }}>
              Progetti<span className="text-[#DFD295]">.</span>
            </h1>
            <p className="text-[#0D1321]/60 text-base sm:text-lg max-w-lg" style={{ lineHeight: '1.7' }}>
              Ogni progetto racconta una storia unica. Scopri come trasformiamo le idee in esperienze visive memorabili.
            </p>
          </div>
        </section>

        {/* Projects Grid - Same style as homepage */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto px-2 sm:px-3 lg:px-4">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {projects.map((project, index) => (
                  <Link 
                    key={project.id} 
                    href={`/portfolio/${project.slug}`}
                    className="group relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/10] block bg-[#0D1321]/10"
                  >
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} - ${project.macroArea?.name || 'Video'} per ${project.client} | Portfolio Drugofiles Pordenone`}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1321]/80 via-[#0D1321]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag: string) => (
                          <span 
                            key={tag} 
                            className="px-3 py-1 text-xs font-semibold bg-[#7353BA] text-[#FFF8F0] rounded-md shadow-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Project info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <p className="text-[#FFF8F0]/70 text-sm mb-1 font-medium">
                        {project.client}
                      </p>
                      <h2 className="text-[#FFF8F0] text-xl sm:text-2xl lg:text-3xl font-bold" style={{ letterSpacing: '-0.01em' }}>
                        {project.title}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-[#0D1321]/60 text-lg">Nessun progetto disponibile al momento.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>
    </PageWrapper>
  )
}

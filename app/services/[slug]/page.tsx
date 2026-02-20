import { PageWrapper } from '@/components/page-wrapper'
import { CTASection } from '@/components/cta-section'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = "force-dynamic"
export const revalidate = 0

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps) {
  const macroArea = await prisma.macroArea.findUnique({
    where: { slug: params.slug },
  })
  return {
    title: macroArea ? `${macroArea.name} | Drugofiles Productions` : 'Servizio',
    description: macroArea?.description ?? 'Scopri i nostri servizi',
  }
}

export default async function ServicePage({ params }: PageProps) {
  const macroArea = await prisma.macroArea.findUnique({
    where: { slug: params.slug },
    include: {
      projects: {
        take: 6,
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!macroArea) {
    notFound()
  }

  return (
    <PageWrapper showLoading={false}>
      <main className="bg-[#dedacf] pb-4">
        {/* Header */}
        <section className="pt-24 sm:pt-28 pb-12">
          <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
            <Link 
              href="/" 
              className="text-[#7353BA] hover:text-[#5D4399] transition-colors duration-200 text-sm font-medium mb-8 inline-block"
            >
              ← Torna alla home
            </Link>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#0D1321]" style={{ letterSpacing: '-0.02em' }}>
              {macroArea.name}<span className="text-[#DFD295]">.</span>
            </h1>
            
            {macroArea.description && (
              <p className="text-[#0D1321]/60 text-lg sm:text-xl" style={{ lineHeight: '1.7', maxWidth: '700px' }}>
                {macroArea.description}
              </p>
            )}
          </div>
        </section>

        {/* Projects in this category */}
        {macroArea.projects.length > 0 && (
          <section className="mx-2 sm:mx-3 my-2 rounded-2xl bg-[#DFD295] shadow-card overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1321] mb-12" style={{ letterSpacing: '-0.02em' }}>
                Progetti Recenti<span className="text-[#7353BA]">.</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {macroArea.projects.map((project) => (
                  <Link key={project.id} href={`/portfolio/${project.slug}`}>
                    <div className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                      <div className="relative aspect-video bg-[#dedacf]">
                        <Image
                          src={project.thumbnail ?? ''}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1321]/80 via-[#0D1321]/30 to-transparent" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-[#FFF8F0] mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-[#FFF8F0]/70 font-medium">
                          {project.client} {project.year && `• ${project.year}`}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <CTASection />
      </main>
    </PageWrapper>
  )
}

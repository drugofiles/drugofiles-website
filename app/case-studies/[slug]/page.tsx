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
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { slug: params.slug },
  })
  return {
    title: caseStudy ? `${caseStudy.title} | Drugofiles Productions` : 'Case Study',
    description: caseStudy?.challenge ?? 'Scopri i dettagli di questo case study',
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { slug: params.slug },
    include: {
      macroArea: true,
    },
  })

  if (!caseStudy) {
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
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-[#0D1321]" style={{ letterSpacing: '-0.02em' }}>
              {caseStudy.title}<span className="text-[#DFD295]">.</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-[#0D1321]/60 mb-6">
              {caseStudy.client && <span className="font-medium">Cliente: {caseStudy.client}</span>}
              {caseStudy.year && <span>• {caseStudy.year}</span>}
              {caseStudy.macroArea && <span>• {caseStudy.macroArea.name}</span>}
            </div>

            {caseStudy.tags && caseStudy.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm font-semibold bg-[#7353BA] text-[#FFF8F0] rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Case Study Image */}
        {caseStudy.thumbnail && (
          <section className="mx-2 sm:mx-3 my-2 rounded-2xl overflow-hidden shadow-card">
            <div className="relative aspect-video bg-[#dedacf]">
              <Image
                src={caseStudy.thumbnail}
                alt={caseStudy.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </section>
        )}

        {/* Content Sections */}
        <section className="mx-2 sm:mx-3 my-2 rounded-2xl bg-[#DFD295] shadow-card overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 space-y-12">
            {/* Challenge */}
            {caseStudy.challenge && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1321] mb-4" style={{ letterSpacing: '-0.02em' }}>
                  La Sfida<span className="text-[#7353BA]">.</span>
                </h2>
                <p className="text-[#0D1321]/70 text-base sm:text-lg" style={{ lineHeight: '1.7', maxWidth: '700px' }}>
                  {caseStudy.challenge}
                </p>
              </div>
            )}

            {/* Solution */}
            {caseStudy.solution && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1321] mb-4" style={{ letterSpacing: '-0.02em' }}>
                  La Soluzione<span className="text-[#7353BA]">.</span>
                </h2>
                <p className="text-[#0D1321]/70 text-base sm:text-lg" style={{ lineHeight: '1.7', maxWidth: '700px' }}>
                  {caseStudy.solution}
                </p>
              </div>
            )}

            {/* Results */}
            {caseStudy.results && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1321] mb-4" style={{ letterSpacing: '-0.02em' }}>
                  I Risultati<span className="text-[#7353BA]">.</span>
                </h2>
                <p className="text-[#0D1321]/70 text-base sm:text-lg" style={{ lineHeight: '1.7', maxWidth: '700px' }}>
                  {caseStudy.results}
                </p>
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

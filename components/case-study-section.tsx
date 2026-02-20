'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface CaseStudy {
  id: string
  title: string
  slug: string
  client?: string
  excerpt?: string
  thumbnail?: string | null
  tags?: string[]
}

interface CaseStudySectionProps {
  caseStudies: CaseStudy[]
}

export function CaseStudySection({ caseStudies }: CaseStudySectionProps) {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[#2d2a3e]">
        <motion.div
          className="absolute inset-0 opacity-50"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(139, 127, 255, 0.1) 50%, transparent 100%)'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-16 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-4">
              Case Studies
            </h2>
            <p className="text-white/60 text-sm sm:text-lg max-w-md">
              Storie di successo e risultati concreti
            </p>
          </div>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/case-studies/${study.slug}`}>
                <div className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-grape-light/30 transition-all">
                  {/* Image */}
                  <div className="relative aspect-video">
                    {study.thumbnail ? (
                      <Image
                        src={study.thumbnail}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-grape-light/30 to-grape/30" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2d2a3e] via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    {study.client && (
                      <p className="text-grape-light text-xs sm:text-sm mb-2">{study.client}</p>
                    )}
                    <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 group-hover:text-grape-light transition-colors">
                      {study.title}
                    </h3>
                    {study.excerpt && (
                      <p className="text-white/60 text-sm line-clamp-2">
                        {study.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

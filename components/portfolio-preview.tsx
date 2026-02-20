'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  slug: string
  client?: string | null
  description?: string | null
  thumbnail?: string | null
  tags?: string[] | null
  macroArea?: {
    name: string
    slug: string
  } | null
}

interface PortfolioPreviewProps {
  projects: Project[]
}

export function PortfolioPreview({ projects }: PortfolioPreviewProps) {
  const projectList = Array.isArray(projects) ? projects : []
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})
  
  // Only show real projects from database (max 6)
  const displayProjects = projectList.slice(0, 6)

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }))
  }

  // If no projects, don't render the section
  if (displayProjects.length === 0) {
    return null
  }

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto px-2 sm:px-3 lg:px-4">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16 gap-4 px-2 sm:px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D1321] mb-3" style={{ letterSpacing: '-0.02em' }}>
              Progetti<span className="text-[#DFD295]">.</span>
            </h2>
            <p className="text-[#0D1321]/60 text-base sm:text-lg max-w-md" style={{ lineHeight: '1.7' }}>
              Soluzioni <span className="highlight-text font-semibold">uniche</span> per ogni progetto
            </p>
          </div>
          <Link
            href="/portfolio"
            className="text-[#7353BA] hover:text-[#5D4399] transition-colors duration-200 font-semibold text-sm sm:text-base"
          >
            Vedi tutti i progetti →
          </Link>
        </motion.div>

        {/* Projects Grid - max 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/portfolio/${project.slug}`}>
                <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/10] bg-[#0D1321]/10">
                  <Image
                    src={project.thumbnail || '/projects/project1.jpg'}
                    alt={`${project.title} - Video per ${project.client} | Drugofiles Productions Pordenone`}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(index)}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1321]/80 via-[#0D1321]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Tags */}
                  {project.tags && Array.isArray(project.tags) && project.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-semibold bg-[#7353BA] text-[#FFF8F0] rounded-md shadow-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Project info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    {project.client && (
                      <p className="text-[#FFF8F0]/70 text-sm mb-1 font-medium">
                        {project.client}
                      </p>
                    )}
                    <h3 className="text-[#FFF8F0] text-xl sm:text-2xl lg:text-3xl font-bold" style={{ letterSpacing: '-0.01em' }}>
                      {project.title}
                    </h3>
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

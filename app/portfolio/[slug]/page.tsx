/**
 * PROJECT PAGE - Media Layout Rules
 * ==================================
 * 
 * MEDIA NAMING CONVENTION (from CSV):
 * - Files ending with "_v" or "-v" → VERTICAL (9:16 aspect ratio)
 * - All other files → HORIZONTAL (16:9 aspect ratio)
 * - Files containing "Video" in name → VIDEO (.mp4 in /videos/ folder)
 * - Other files → IMAGE (.jpg/.png in /projects/ folder)
 * 
 * DATABASE COLUMNS & THEIR PURPOSE:
 * - local_video: Hero video (horizontal 16:9), plays behind title
 * - thumbnail: Hero image fallback if no video
 * - vertical_videos: Vertical media in smartphone mockups (can be videos .mp4 OR images .png)
 *   → If name contains "Video" → video (.mp4)
 *   → Otherwise → image (.png for screenshots)
 * - media_section_1: Media for "Obiettivo" section
 * - media_section_2: Media for "Il Progetto" section  
 * - media_section_3: Media for "Risultati" section
 * - gallery_images: Additional gallery media
 * 
 * ASPECT RATIOS:
 * - Horizontal: 16:9 (aspect-video)
 * - Vertical: 9:16 (aspect-[9/16])
 */

import { PageWrapper } from '@/components/page-wrapper'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ContactButton } from '@/components/contact-button'
import Link from 'next/link'
import { ProjectHero } from '@/components/project-hero'
import { StatsChart } from '@/components/stats-chart'
import { AnimatedStat } from '@/components/animated-stat'
import { MediaGallery } from '@/components/media-gallery'

export const dynamic = "force-dynamic"
export const revalidate = 0

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: { macroArea: true },
  })
  
  if (!project) {
    return {
      title: 'Progetto | Drugofiles Productions',
      description: 'Scopri i dettagli di questo progetto video',
    }
  }

  const categoryName = project.macroArea?.name || 'Video'
  const description = project.tagline 
    ? `${project.tagline} | ${categoryName} per ${project.client} - Produzione video Pordenone`
    : `${project.title} - ${categoryName} realizzato per ${project.client} da Drugofiles Productions, agenzia video produzione Pordenone.`
  
  return {
    title: `${project.title} | ${categoryName} per ${project.client}`,
    description: description.slice(0, 160),
    keywords: [
      project.title.toLowerCase(),
      project.client?.toLowerCase() || '',
      categoryName.toLowerCase(),
      'video produzione pordenone',
      'drugofiles productions',
      ...(project.tags || []).map(t => t.toLowerCase())
    ].filter(Boolean),
    openGraph: {
      title: `${project.title} | Drugofiles Productions`,
      description: description.slice(0, 160),
      type: 'video.other',
      images: project.thumbnail ? [`/projects/${project.thumbnail}`] : [],
    },
  }
}

// Helper to check if file is vertical based on naming convention
// IMPORTANT: Files ending with "_v" or "-v" (with or without extension) are VERTICAL (9:16)
// All other files are HORIZONTAL (16:9)
function isVerticalFile(path: string): boolean {
  const filename = path.toLowerCase()
  // Remove extension to check the base name
  const baseName = filename.replace(/\.(mp4|webm|mov|avi|jpg|jpeg|png|webp|gif)$/i, '')
  
  return (
    baseName.endsWith('_v') ||        // ends with _v (most common)
    baseName.endsWith('-v') ||        // ends with -v (alternative)
    filename.includes('_vertical') ||
    filename.includes('_9x16') ||
    filename.includes('vertical_') ||
    filename.includes('_reel') ||
    filename.includes('_story') ||
    filename.includes('_tiktok')
  )
}

// Helper to check if file is video
function isVideoFile(path: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi']
  return videoExtensions.some(ext => path.toLowerCase().endsWith(ext))
}

// Helper to determine if item is a video based on naming convention
// RULE: If filename contains "Video" (case-insensitive) → it's a video
// Otherwise → it's an image
function isVideoItem(item: string): boolean {
  // If has video extension, it's definitely a video
  if (isVideoFile(item)) return true
  // If contains "video" in name (without extension), it's a video
  return item.toLowerCase().includes('video')
}

// Helper to get the correct path for media
// RULES:
// - Videos go in /videos/ folder with .mp4 extension
// - Images go in /projects/ folder with .jpg extension (unless already has extension)
function getMediaPath(item: string): string {
  if (item.startsWith('/')) return item
  
  const hasExtension = item.includes('.')
  const isVideo = isVideoItem(item)
  
  if (hasExtension) {
    // Already has extension - put in correct folder
    return isVideo ? `/videos/${item}` : `/projects/${item}`
  }
  
  // No extension - add appropriate one
  return isVideo ? `/videos/${item}.mp4` : `/projects/${item}.jpg`
}

// Component for rendering a single media item - organic layout (no mockup)
// MEDIA RULES:
// - Files ending with "_v" or "-v" are VERTICAL (9:16 aspect ratio)
// - All other files are HORIZONTAL (16:9 aspect ratio)
// - Files containing "Video" in name are videos (.mp4)
// - Other files are images (.jpg)
function OrganicMediaItem({ item, projectTitle, index, priority = false, section = '' }: { item: string; projectTitle: string; index: number; priority?: boolean; section?: string }) {
  const isVideo = isVideoItem(item)
  const isVertical = isVerticalFile(item)
  const mediaPath = getMediaPath(item)
  
  // Generate descriptive alt text
  const orientation = isVertical ? 'verticale' : 'orizzontale'
  const sectionText = section ? ` - ${section}` : ''
  const altText = `${projectTitle}${sectionText} - Immagine ${index + 1} ${orientation} | Video produzione Drugofiles Pordenone`
  
  if (isVideo) {
    return (
      <div className={`relative rounded-xl overflow-hidden shadow-lg bg-[#0D1321]/10 ${
        isVertical ? 'aspect-[9/16] w-full max-w-[280px] mx-auto' : 'aspect-video w-full'
      }`}>
        <video
          src={mediaPath}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
          aria-label={altText}
        />
      </div>
    )
  }
  
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg bg-[#0D1321]/10 ${
      isVertical ? 'aspect-[9/16] w-full max-w-[280px] mx-auto' : 'aspect-video w-full'
    }`}>
      <Image
        src={mediaPath}
        alt={altText}
        fill
        priority={priority}
        sizes={isVertical ? '280px' : '(max-width: 1024px) 100vw, 50vw'}
        className="object-cover object-center"
      />
    </div>
  )
}

// Check if the file is an image
function isImageFile(path: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
  return imageExtensions.some(ext => path.toLowerCase().endsWith(ext))
}

// Social mockup component is now imported from '@/components/social-mockup'
// Supports: _ig (Instagram), _tiktok (TikTok), _fb (Facebook), or generic smartphone mockup

export default async function ProjectPage({ params }: PageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      macroArea: true,
    },
  })

  if (!project) {
    notFound()
  }

  // Determine stats display type
  const showViewsComparison = project.viewsBefore && project.viewsBefore > 0 && project.viewsAfter
  const showSubsComparison = project.subsBefore && project.subsBefore > 0 && project.subsAfter
  const showViewsAnimated = !showViewsComparison && project.viewsAfter && project.viewsAfter > 0
  const showSubsAnimated = !showSubsComparison && project.subsAfter && project.subsAfter > 0
  const hasStats = showViewsAnimated || showSubsAnimated || showViewsComparison || showSubsComparison

  // Count total metrics (charts + animated stats)
  const metricsCount = 
    (showViewsAnimated ? 1 : 0) + 
    (showSubsAnimated ? 1 : 0) + 
    (showViewsComparison ? 1 : 0) + 
    (showSubsComparison ? 1 : 0)

  // Check if media sections have vertical content
  const objectiveMediaHasVertical = project.objectiveMedia?.some(item => isVerticalFile(item)) || false
  const descriptionMediaHasVertical = project.descriptionMedia?.some(item => isVerticalFile(item)) || false
  const resultMediaHasVertical = project.resultMedia?.some(item => isVerticalFile(item)) || false
  const hasObjectiveMedia = project.objectiveMedia && project.objectiveMedia.length > 0
  const hasDescriptionMedia = project.descriptionMedia && project.descriptionMedia.length > 0
  const hasResultMedia = project.resultMedia && project.resultMedia.length > 0

  // Generate structured data for SEO
  const baseUrl = process.env.NEXTAUTH_URL || 'https://drugofiles.com'
  const categoryName = project.macroArea?.name || 'Video'
  
  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": `${baseUrl}/portfolio`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `${baseUrl}/portfolio/${project.slug}`
      }
    ]
  }

  // VideoObject Schema (if project has video)
  const videoSchema = (project.videoUrl || project.localVideo) ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": project.title,
    "description": project.tagline || project.description || `${categoryName} realizzato per ${project.client}`,
    "thumbnailUrl": project.thumbnail ? `${baseUrl}/projects/${project.thumbnail}` : undefined,
    "uploadDate": project.createdAt?.toISOString(),
    "contentUrl": project.localVideo ? `${baseUrl}/videos/${project.localVideo}` : project.videoUrl,
    "embedUrl": project.videoUrl,
    "producer": {
      "@type": "Organization",
      "name": "Drugofiles Productions",
      "url": baseUrl
    }
  } : null

  // Creative Work Schema
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.tagline || project.description,
    "creator": {
      "@type": "Organization",
      "name": "Drugofiles Productions",
      "url": baseUrl
    },
    "dateCreated": project.year?.toString(),
    "keywords": project.tags?.join(', '),
    "genre": categoryName,
    "image": project.thumbnail ? `${baseUrl}/projects/${project.thumbnail}` : undefined
  }

  return (
    <PageWrapper showLoading={false}>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      
      <main className="bg-[#0D1321]">
        {/* Hero Section */}
        <ProjectHero 
          title={project.title}
          client={project.client}
          year={project.year}
          category={project.macroArea?.name}
          tagline={project.tagline}
          thumbnail={project.thumbnail}
          videoUrl={project.videoUrl}
          localVideo={project.localVideo}
          tags={project.tags}
        />

        {/* Objective Section with Media */}
        {(project.objective || hasObjectiveMedia) && (
          <section className="bg-[#DFD295]">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
              <div className={`grid gap-8 lg:gap-12 ${
                hasObjectiveMedia 
                  ? project.objective
                    ? objectiveMediaHasVertical 
                      ? 'lg:grid-cols-[1fr_auto] items-center' 
                      : 'lg:grid-cols-2 items-center'
                    : 'grid-cols-1 justify-items-center'
                  : 'grid-cols-1'
              }`}>
                {project.objective && (
                  <div className={hasObjectiveMedia ? '' : 'max-w-3xl'}>
                    <span className="text-[#0D1321]/40 text-sm font-medium uppercase tracking-wider block mb-4">Obiettivo</span>
                    <div className="text-[#0D1321] text-lg sm:text-xl lg:text-2xl font-light" style={{ lineHeight: '1.7' }}>
                      {project.objective}
                    </div>
                  </div>
                )}
                {hasObjectiveMedia && (
                  <div className={`flex justify-center ${objectiveMediaHasVertical ? 'lg:w-[300px]' : project.objective ? '' : 'max-w-2xl'}`}>
                    {project.objectiveMedia!.map((item, idx) => (
                      <OrganicMediaItem key={idx} item={item} projectTitle={project.title} index={idx} section="Obiettivo" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Description Section with Media */}
        {(project.description || hasDescriptionMedia) && (
          <section className="bg-[#dedacf]">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
              <div className={`grid gap-8 lg:gap-12 ${
                hasDescriptionMedia 
                  ? project.description
                    ? descriptionMediaHasVertical
                      ? 'lg:grid-cols-[auto_1fr] items-center'
                      : 'lg:grid-cols-2 items-center'
                    : 'grid-cols-1 justify-items-center'
                  : 'grid-cols-1'
              }`}>
                {hasDescriptionMedia && (
                  <div className={`flex justify-center ${project.description ? 'order-2 lg:order-1' : ''} ${descriptionMediaHasVertical ? 'lg:w-[300px]' : project.description ? '' : 'max-w-2xl'}`}>
                    {project.descriptionMedia!.map((item, idx) => (
                      <OrganicMediaItem key={idx} item={item} projectTitle={project.title} index={idx} section="Il Progetto" />
                    ))}
                  </div>
                )}
                {project.description && (
                  <div className={`${hasDescriptionMedia ? 'order-1 lg:order-2' : 'max-w-3xl'}`}>
                    <span className="text-[#0D1321]/40 text-sm font-medium uppercase tracking-wider block mb-4">Il Progetto</span>
                    <div className="text-[#0D1321] text-lg sm:text-xl lg:text-2xl font-light" style={{ lineHeight: '1.7' }}>
                      {project.description}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Results Section */}
        {(project.results || hasStats || hasResultMedia) && (
          <section className="bg-[#7353BA]">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
              
              {/* CASE 1: media3 is VERTICAL → Metrics above, then text + vertical media side by side */}
              {resultMediaHasVertical && hasStats && (
                <>
                  {/* All Metrics in a single row */}
                  <div className="mb-16">
                    <div className={`grid gap-8 sm:gap-12 ${
                      metricsCount === 1 ? 'grid-cols-1 max-w-xl mx-auto' : 
                      metricsCount === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto' :
                      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto'
                    }`}>
                      {showViewsAnimated && project.viewsAfter && (
                        <AnimatedStat value={project.viewsAfter} label="Visualizzazioni" suffix="+" />
                      )}
                      {showViewsComparison && project.viewsBefore && project.viewsAfter && (
                        <StatsChart label="Visualizzazioni" before={project.viewsBefore} after={project.viewsAfter} color="#DFD295" />
                      )}
                      {showSubsAnimated && project.subsAfter && (
                        <AnimatedStat value={project.subsAfter} label="Followers" suffix="+" />
                      )}
                      {showSubsComparison && project.subsBefore && project.subsAfter && (
                        <StatsChart label="Followers" before={project.subsBefore} after={project.subsAfter} color="#FFF8F0" />
                      )}
                    </div>
                  </div>
                  {/* Text + vertical media */}
                  <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_auto] items-center">
                    {project.results && (
                      <div>
                        <span className="text-[#FFF8F0]/60 text-sm font-medium uppercase tracking-wider block mb-4">Risultati</span>
                        <div className="text-[#FFF8F0] text-lg sm:text-xl lg:text-2xl font-light" style={{ lineHeight: '1.7' }}>
                          {project.results}
                        </div>
                      </div>
                    )}
                    {hasResultMedia && (
                      <div className="flex justify-center lg:w-[300px]">
                        {project.resultMedia!.map((item, idx) => (
                          <OrganicMediaItem key={idx} item={item} projectTitle={project.title} index={idx} section="Risultati" />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* CASE 2: media3 is HORIZONTAL → Text + Metrics side by side, media below */}
              {hasResultMedia && !resultMediaHasVertical && hasStats && (
                <>
                  {/* Text + Metrics row */}
                  <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-start mb-16">
                    {project.results && (
                      <div>
                        <span className="text-[#FFF8F0]/60 text-sm font-medium uppercase tracking-wider block mb-4">Risultati</span>
                        <div className="text-[#FFF8F0] text-lg sm:text-xl lg:text-2xl font-light" style={{ lineHeight: '1.7' }}>
                          {project.results}
                        </div>
                      </div>
                    )}
                    <div className={`grid gap-8 ${
                      metricsCount === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                    }`}>
                      {showViewsAnimated && project.viewsAfter && (
                        <AnimatedStat value={project.viewsAfter} label="Visualizzazioni" suffix="+" />
                      )}
                      {showViewsComparison && project.viewsBefore && project.viewsAfter && (
                        <StatsChart label="Visualizzazioni" before={project.viewsBefore} after={project.viewsAfter} color="#DFD295" />
                      )}
                      {showSubsAnimated && project.subsAfter && (
                        <AnimatedStat value={project.subsAfter} label="Followers" suffix="+" />
                      )}
                      {showSubsComparison && project.subsBefore && project.subsAfter && (
                        <StatsChart label="Followers" before={project.subsBefore} after={project.subsAfter} color="#FFF8F0" />
                      )}
                    </div>
                  </div>
                  {/* Horizontal media below */}
                  <div className="w-full max-w-4xl mx-auto">
                    {project.resultMedia!.map((item, idx) => (
                      <OrganicMediaItem key={idx} item={item} projectTitle={project.title} index={idx} section="Risultati" />
                    ))}
                  </div>
                </>
              )}

              {/* CASE 3: Has stats but NO media3 → Text + Metrics side by side */}
              {!hasResultMedia && hasStats && (
                <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-start">
                  {project.results && (
                    <div>
                      <span className="text-[#FFF8F0]/60 text-sm font-medium uppercase tracking-wider block mb-4">Risultati</span>
                      <div className="text-[#FFF8F0] text-lg sm:text-xl lg:text-2xl font-light" style={{ lineHeight: '1.7' }}>
                        {project.results}
                      </div>
                    </div>
                  )}
                  <div className={`grid gap-8 ${
                    metricsCount === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                  }`}>
                    {showViewsAnimated && project.viewsAfter && (
                      <AnimatedStat value={project.viewsAfter} label="Visualizzazioni" suffix="+" />
                    )}
                    {showViewsComparison && project.viewsBefore && project.viewsAfter && (
                      <StatsChart label="Visualizzazioni" before={project.viewsBefore} after={project.viewsAfter} color="#DFD295" />
                    )}
                    {showSubsAnimated && project.subsAfter && (
                      <AnimatedStat value={project.subsAfter} label="Followers" suffix="+" />
                    )}
                    {showSubsComparison && project.subsBefore && project.subsAfter && (
                      <StatsChart label="Followers" before={project.subsBefore} after={project.subsAfter} color="#FFF8F0" />
                    )}
                  </div>
                </div>
              )}

              {/* CASE 4: Has media3 but NO stats → Text + Media side by side */}
              {hasResultMedia && !hasStats && (
                <div className={`grid gap-8 lg:gap-12 ${
                  resultMediaHasVertical ? 'lg:grid-cols-[1fr_auto] items-center' : 'lg:grid-cols-2 items-center'
                }`}>
                  {project.results && (
                    <div>
                      <span className="text-[#FFF8F0]/60 text-sm font-medium uppercase tracking-wider block mb-4">Risultati</span>
                      <div className="text-[#FFF8F0] text-lg sm:text-xl lg:text-2xl font-light" style={{ lineHeight: '1.7' }}>
                        {project.results}
                      </div>
                    </div>
                  )}
                  <div className={`flex justify-center ${resultMediaHasVertical ? 'lg:w-[300px]' : ''}`}>
                    {project.resultMedia!.map((item, idx) => (
                      <OrganicMediaItem key={idx} item={item} projectTitle={project.title} index={idx} section="Risultati" />
                    ))}
                  </div>
                </div>
              )}

              {/* CASE 5: Only text, no stats, no media3 */}
              {!hasResultMedia && !hasStats && project.results && (
                <div className="max-w-3xl">
                  <span className="text-[#FFF8F0]/60 text-sm font-medium uppercase tracking-wider block mb-4">Risultati</span>
                  <div className="text-[#FFF8F0] text-lg sm:text-xl lg:text-2xl font-light" style={{ lineHeight: '1.7' }}>
                    {project.results}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Vertical Media Gallery - from mockupVideos field */}
        {/* Click to open fullscreen lightbox */}
        {project.mockupVideos && project.mockupVideos.length > 0 && (
          <section className="bg-[#0D1321] py-16 sm:py-24">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
              <MediaGallery 
                items={project.mockupVideos.map(item => {
                  const isVideo = isVideoItem(item)
                  if (item.startsWith('/')) return item
                  if (item.includes('.')) return isVideo ? `/videos/${item}` : `/projects/${item}`
                  return isVideo ? `/videos/${item}.mp4` : `/projects/${item}.png`
                })}
                title={project.title}
                basePath=""
              />
            </div>
          </section>
        )}

        {/* Gallery Section - Uses same media rules as above */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <section className="bg-[#dedacf] py-12 sm:py-16">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {project.galleryImages.map((item, index) => {
                  const isVertical = isVerticalFile(item)
                  const isVideo = isVideoItem(item)
                  const itemPath = getMediaPath(item)
                  
                  // Vertical videos → tall card (9:16 aspect)
                  if (isVideo && isVertical) {
                    return (
                      <div key={index} className="group relative rounded-xl overflow-hidden cursor-pointer row-span-2 bg-[#0D1321]/10">
                        <div className="relative aspect-[9/16]">
                          <video
                            src={itemPath}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                            autoPlay
                          />
                          <div className="absolute inset-0 bg-[#0D1321]/0 group-hover:bg-[#0D1321]/20 transition-colors duration-300" />
                        </div>
                      </div>
                    )
                  }
                  
                  // Vertical images → tall card with hover (9:16 aspect)
                  if (isVertical) {
                    return (
                      <div key={index} className="group relative rounded-xl overflow-hidden cursor-pointer row-span-2 bg-[#0D1321]/10">
                        <div className="relative aspect-[9/16]">
                          <Image
                            src={itemPath}
                            alt={`${project.title} - Gallery immagine verticale ${index + 1} | Video produzione ${project.client} Drugofiles Pordenone`}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-[#0D1321]/0 group-hover:bg-[#0D1321]/20 transition-colors duration-300" />
                        </div>
                      </div>
                    )
                  }
                  
                  // Horizontal videos → standard video player (16:9 aspect)
                  if (isVideo) {
                    return (
                      <div key={index} className="relative rounded-xl overflow-hidden">
                        <div className="relative aspect-video">
                          <video
                            src={itemPath}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                            autoPlay
                          />
                        </div>
                      </div>
                    )
                  }
                  
                  // Horizontal images → standard card with hover (16:9 aspect)
                  return (
                    <div key={index} className="group relative rounded-xl overflow-hidden cursor-pointer bg-[#0D1321]/10">
                      <div className="relative aspect-video">
                        <Image
                          src={itemPath}
                          alt={`${project.title} - Gallery immagine ${index + 1} | Video produzione ${project.client} Drugofiles Pordenone`}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-[#0D1321]/0 group-hover:bg-[#0D1321]/20 transition-colors duration-300" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-[#dedacf] py-16 sm:py-24">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="text-center mb-12">
              <Link 
                href="/portfolio" 
                className="inline-flex items-center gap-2 text-[#7353BA] hover:text-[#5D4399] transition-colors duration-200 text-sm font-semibold uppercase tracking-wider"
              >
                <span>←</span>
                <span>Tutti i progetti</span>
              </Link>
            </div>
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D1321] mb-6">
                Hai un progetto in mente<span className="text-[#DFD295]">?</span>
              </h2>
              <p className="text-[#0D1321]/60 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
                Raccontaci la tua idea e trasformiamola insieme in qualcosa di straordinario.
              </p>
              <ContactButton
                className="inline-flex items-center gap-2 bg-[#0D1321] text-[#FFF8F0] px-8 py-4 rounded-full text-base font-semibold hover:bg-[#7353BA] transition-colors duration-200"
              >
                Contattaci
              </ContactButton>
            </div>
          </div>
        </section>
      </main>
    </PageWrapper>
  )
}

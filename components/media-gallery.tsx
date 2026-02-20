'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MediaLightbox } from './media-lightbox'

interface MediaGalleryProps {
  items: string[]
  title: string
  basePath?: string
}

function isVideoFile(filename: string): boolean {
  const ext = filename.toLowerCase().split('.').pop()
  return ['mp4', 'webm', 'mov'].includes(ext || '')
}

function getMediaPath(item: string, basePath: string): string {
  if (item.startsWith('http') || item.startsWith('/')) {
    return item
  }
  return `${basePath}/${item}`
}

export function MediaGallery({ items, title, basePath = '/projects' }: MediaGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (!items || items.length === 0) return null

  const mediaItems = items.map(item => ({
    src: getMediaPath(item, basePath),
    isVideo: isVideoFile(item)
  }))

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {mediaItems.map((item, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label={`Apri ${title} ${index + 1}`}
          >
            <div className="relative w-[160px] sm:w-[200px] md:w-[240px] aspect-[9/16] bg-[#0D1321]/10">
              {item.isVideo ? (
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  loop
                  autoPlay
                />
              ) : (
                <Image
                  src={item.src}
                  alt={`${title} - Media ${index + 1}`}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              )}
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                  Clicca per ingrandire
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <MediaLightbox
        items={mediaItems}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}

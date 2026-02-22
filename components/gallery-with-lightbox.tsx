'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MediaLightbox } from './media-lightbox'

interface GalleryWithLightboxProps {
  items: string[]
  title: string
  client?: string | null
}

function isVideoFile(filename: string): boolean {
  const ext = filename.toLowerCase().split('.').pop()
  return ['mp4', 'webm', 'mov'].includes(ext || '')
}

function isVerticalFile(filename: string): boolean {
  const lower = filename.toLowerCase()
  return lower.includes('-v.') || lower.includes('_v.') || 
         lower.includes('-v_') || lower.includes('_v_') ||
         lower.endsWith('-v') || lower.endsWith('_v')
}

function getMediaPath(item: string): string {
  if (item.startsWith('/') || item.startsWith('http')) return item
  const isVideo = isVideoFile(item) || item.toLowerCase().includes('video')
  if (item.includes('.')) {
    return isVideo ? `/videos/${item}` : `/projects/${item}`
  }
  return isVideo ? `/videos/${item}.mp4` : `/projects/${item}.jpg`
}

export function GalleryWithLightbox({ items, title, client }: GalleryWithLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (!items || items.length === 0) return null

  const mediaItems = items.map(item => ({
    src: getMediaPath(item),
    isVideo: isVideoFile(item) || item.toLowerCase().includes('video'),
    isVertical: isVerticalFile(item)
  }))

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {mediaItems.map((item, index) => {
          const altText = `${title} - Gallery ${index + 1}${client ? ` | ${client}` : ''}`
          
          // Vertical content
          if (item.isVertical) {
            return (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative rounded-xl overflow-hidden cursor-pointer row-span-2 bg-[#0D1321]/10"
                aria-label={`Apri ${altText}`}
              >
                <div className="relative aspect-[9/16]">
                  {item.isVideo ? (
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      loop
                      muted
                      playsInline
                      autoPlay
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={altText}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                      Clicca per ingrandire
                    </span>
                  </div>
                </div>
              </button>
            )
          }
          
          // Horizontal content
          return (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative rounded-xl overflow-hidden cursor-pointer bg-[#0D1321]/10"
              aria-label={`Apri ${altText}`}
            >
              <div className="relative aspect-video">
                {item.isVideo ? (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={altText}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                    Clicca per ingrandire
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <MediaLightbox
        items={mediaItems.map(m => ({ src: m.src, isVideo: m.isVideo }))}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}

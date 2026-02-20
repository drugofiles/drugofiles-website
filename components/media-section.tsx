'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

interface MediaSectionProps {
  items: string[]
  className?: string
}

function isVideo(path: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi']
  return videoExtensions.some(ext => path.toLowerCase().endsWith(ext))
}

// Detect vertical content from filename
// Naming convention: filename_v.mp4, filename_vertical.mp4, filename_9x16.mp4, vertical_filename.mp4
function isVertical(path: string): boolean {
  const filename = path.toLowerCase()
  return (
    filename.includes('_v.') ||
    filename.includes('_vertical.') ||
    filename.includes('_9x16.') ||
    filename.includes('vertical_') ||
    filename.includes('_reel') ||
    filename.includes('_story') ||
    filename.includes('_tiktok')
  )
}

export function MediaSection({ items, className = '' }: MediaSectionProps) {
  const [playingVideos, setPlayingVideos] = useState<Record<number, boolean>>({})
  const [mutedVideos, setMutedVideos] = useState<Record<number, boolean>>(
    items.reduce((acc, _, i) => ({ ...acc, [i]: true }), {})
  )
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      if (playingVideos[index]) {
        video.pause()
      } else {
        video.play()
      }
      setPlayingVideos(prev => ({ ...prev, [index]: !prev[index] }))
    }
  }

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      video.muted = !mutedVideos[index]
      setMutedVideos(prev => ({ ...prev, [index]: !prev[index] }))
    }
  }

  if (!items || items.length === 0) return null

  // Analyze content types
  const itemsWithMeta = items.map(item => ({
    path: item,
    isVideo: isVideo(item),
    isVertical: isVertical(item)
  }))

  const verticalCount = itemsWithMeta.filter(i => i.isVertical).length
  const horizontalCount = itemsWithMeta.filter(i => !i.isVertical).length

  // Smart grid layout based on content mix
  const getGridClass = () => {
    // All vertical - show them side by side
    if (verticalCount === items.length) {
      if (items.length === 1) return 'flex justify-center'
      if (items.length === 2) return 'flex justify-center gap-4 sm:gap-6'
      return 'flex justify-center gap-4 sm:gap-6 flex-wrap'
    }
    // All horizontal
    if (horizontalCount === items.length) {
      if (items.length === 1) return 'grid grid-cols-1'
      if (items.length === 2) return 'grid grid-cols-1 md:grid-cols-2 gap-4'
      return 'grid grid-cols-1 md:grid-cols-2 gap-4'
    }
    // Mixed - use flex for flexibility
    return 'flex flex-wrap justify-center gap-4 sm:gap-6'
  }

  return (
    <div className={`${getGridClass()} ${className}`}>
      {itemsWithMeta.map((item, index) => {
        const itemPath = item.path.startsWith('/') ? item.path : `/projects/${item.path}`
        const videoPath = item.isVideo 
          ? (item.path.startsWith('/') ? item.path : `/videos/${item.path}`)
          : itemPath

        // Determine sizing based on orientation and total items
        const getItemStyle = () => {
          if (item.isVertical) {
            // Vertical items - phone-like aspect ratio
            return {
              width: items.length === 1 ? '280px' : items.length === 2 ? '260px' : '220px',
              maxWidth: '100%'
            }
          }
          // Horizontal items
          if (horizontalCount === items.length) {
            return { width: '100%' }
          }
          // Mixed layout - horizontal takes more space
          return { 
            width: '100%',
            maxWidth: items.length <= 2 ? '600px' : '500px'
          }
        }

        return (
          <motion.div
            key={index}
            className={`relative rounded-2xl overflow-hidden ${
              !item.isVertical && horizontalCount === items.length && items.length > 2 && index === 0 
                ? 'md:col-span-2' 
                : ''
            }`}
            style={getItemStyle()}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {item.isVideo ? (
              // Video item
              <div className={`relative bg-[#0D1321] ${item.isVertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
                <video
                  ref={el => { videoRefs.current[index] = el }}
                  src={videoPath}
                  className="w-full h-full object-cover"
                  loop
                  muted={mutedVideos[index]}
                  playsInline
                  onClick={() => togglePlay(index)}
                />
                
                {/* Play overlay */}
                {!playingVideos[index] && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
                    onClick={() => togglePlay(index)}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FFF8F0]/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#FFF8F0]/30 transition-colors">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFF8F0] ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Video controls */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button
                    onClick={() => togglePlay(index)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0D1321]/60 backdrop-blur-sm flex items-center justify-center hover:bg-[#0D1321]/80 transition-colors"
                  >
                    {playingVideos[index] ? (
                      <Pause className="w-4 h-4 text-[#FFF8F0]" fill="currentColor" />
                    ) : (
                      <Play className="w-4 h-4 text-[#FFF8F0] ml-0.5" fill="currentColor" />
                    )}
                  </button>
                  <button
                    onClick={() => toggleMute(index)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0D1321]/60 backdrop-blur-sm flex items-center justify-center hover:bg-[#0D1321]/80 transition-colors"
                  >
                    {mutedVideos[index] ? (
                      <VolumeX className="w-4 h-4 text-[#FFF8F0]" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-[#FFF8F0]" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              // Image item
              <div className={`relative bg-[#dedacf] ${item.isVertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
                <Image
                  src={itemPath}
                  alt={`Media ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

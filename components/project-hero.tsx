'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProjectHeroProps {
  title: string
  client?: string | null
  year: number
  category?: string | null
  tagline?: string | null
  thumbnail: string
  videoUrl?: string | null
  localVideo?: string | null
  tags?: string[] | null
}

export function ProjectHero({ 
  title, 
  client, 
  year, 
  category, 
  tagline, 
  thumbnail, 
  videoUrl,
  localVideo,
  tags 
}: ProjectHeroProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => setShowControls(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showControls])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoClick = () => {
    setShowControls(true)
  }

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background Video or Image */}
      <div className="absolute inset-0 z-0">
        {localVideo ? (
          // Self-hosted video - grape.ua style
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={localVideo}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onClick={handleVideoClick}
            />
            {/* Subtle dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1321] via-[#0D1321]/40 to-[#0D1321]/20 pointer-events-none" />
          </>
        ) : (
          // Fallback to image
          <>
            <Image
              src={thumbnail.startsWith('/') ? thumbnail : `/${thumbnail}`}
              alt={`${title}${client ? ` - ${category || 'Video'} per ${client}` : ''} | Video produzione Drugofiles Pordenone`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1321] via-[#0D1321]/60 to-[#0D1321]/30" />
          </>
        )}
      </div>

      {/* Video Controls - appear on click/tap */}
      {localVideo && (
        <motion.div 
          className="absolute bottom-28 sm:bottom-32 right-6 sm:right-10 z-20 flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-[#FFF8F0]/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#FFF8F0]/30 transition-colors duration-200"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-[#FFF8F0]" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5 text-[#FFF8F0] ml-0.5" fill="currentColor" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="w-12 h-12 rounded-full bg-[#FFF8F0]/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#FFF8F0]/30 transition-colors duration-200"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-[#FFF8F0]" />
            ) : (
              <Volume2 className="w-5 h-5 text-[#FFF8F0]" />
            )}
          </button>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20 pt-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
          {/* Category & Year */}
          <div className="flex items-center gap-3 mb-6">
            {category && (
              <span className="text-[#FFF8F0]/60 text-sm font-medium">{category}</span>
            )}
            {category && year && <span className="text-[#FFF8F0]/40">•</span>}
            {year && (
              <span className="text-[#FFF8F0]/60 text-sm">{year}</span>
            )}
          </div>

          {/* Title */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#FFF8F0] mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            {title}<span className="text-[#DFD295]">®</span>
          </h1>

          {/* Tagline */}
          {tagline && (
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#FFF8F0] font-light mb-8" style={{ lineHeight: '1.4' }}>
              {tagline}
            </p>
          )}

          {/* Sound hint & Tags Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Sound hint for self-hosted video */}
            {localVideo && (
              <button
                onClick={() => { setShowControls(true); toggleMute(); }}
                className="flex items-center gap-3 group"
              >
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#DFD295] flex items-center justify-center group-hover:bg-[#FFF8F0] transition-colors duration-200">
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-[#0D1321]" />
                  ) : (
                    <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#0D1321]" />
                  )}
                </span>
                <span className="text-[#FFF8F0] font-medium text-sm sm:text-base">
                  {isMuted ? 'Attiva audio' : 'Disattiva audio'}
                </span>
              </button>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-xs sm:text-sm font-medium bg-[#FFF8F0]/10 text-[#FFF8F0] rounded-full border border-[#FFF8F0]/20 hover:bg-[#FFF8F0]/20 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Client */}
          {client && (
            <div className="mt-8 pt-8 border-t border-[#FFF8F0]/10">
              <span className="text-[#FFF8F0]/40 text-sm">Cliente: </span>
              <span className="text-[#FFF8F0] text-sm font-medium">{client}</span>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-[#FFF8F0]/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#FFF8F0]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  )
}

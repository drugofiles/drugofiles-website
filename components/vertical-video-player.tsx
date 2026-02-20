'use client'

import { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

interface VerticalVideoPlayerProps {
  videos: string[]
}

export function VerticalVideoPlayer({ videos }: VerticalVideoPlayerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({})
  const [isMuted, setIsMuted] = useState<Record<number, boolean>>(
    videos.reduce((acc, _, i) => ({ ...acc, [i]: true }), {})
  )
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      if (isPlaying[index]) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(prev => ({ ...prev, [index]: !prev[index] }))
    }
  }

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      video.muted = !isMuted[index]
      setIsMuted(prev => ({ ...prev, [index]: !prev[index] }))
    }
  }

  if (videos.length === 0) return null

  return (
    <section className="bg-[#0D1321] py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-[#DFD295] text-sm font-medium uppercase tracking-wider">Social Content</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#FFF8F0] mt-2">Video Verticali</h3>
          <p className="text-[#FFF8F0]/60 mt-2">Ottimizzati per TikTok, Instagram Reels e Stories</p>
        </div>

        {/* Videos grid - phone mockup style */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Phone frame */}
              <div className="relative bg-[#1a1a2e] rounded-[2.5rem] p-2 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#0D1321] rounded-full z-10" />
                
                {/* Video container */}
                <div className="relative w-[200px] sm:w-[240px] h-[430px] sm:h-[520px] rounded-[2rem] overflow-hidden bg-black">
                  <video
                    ref={el => { videoRefs.current[index] = el }}
                    src={video.startsWith('/') ? video : `/videos/${video}`}
                    className="w-full h-full object-cover"
                    loop
                    muted={isMuted[index]}
                    playsInline
                    onClick={() => togglePlay(index)}
                  />

                  {/* Play/Pause overlay */}
                  {!isPlaying[index] && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                      onClick={() => togglePlay(index)}
                    >
                      <div className="w-16 h-16 rounded-full bg-[#FFF8F0]/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-8 h-8 text-[#FFF8F0] ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}

                  {/* Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <button
                      onClick={() => togglePlay(index)}
                      className="w-10 h-10 rounded-full bg-[#FFF8F0]/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      {isPlaying[index] ? (
                        <Pause className="w-4 h-4 text-[#FFF8F0]" fill="currentColor" />
                      ) : (
                        <Play className="w-4 h-4 text-[#FFF8F0] ml-0.5" fill="currentColor" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleMute(index)}
                      className="w-10 h-10 rounded-full bg-[#FFF8F0]/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      {isMuted[index] ? (
                        <VolumeX className="w-4 h-4 text-[#FFF8F0]" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#FFF8F0]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

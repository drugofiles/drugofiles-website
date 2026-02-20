'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const services = [
  {
    id: 1,
    title: 'Commercial',
    subtitle: 'Brand & Campaigns',
    description: 'Spot pubblicitari, video di lancio brand/prodotti, reel strategici per crescita social.',
    image: '/services/entertainment.jpg',
    tags: ['#advertising', '#branding', '#social', '#strategy']
  },
  {
    id: 2,
    title: 'Entertainment',
    subtitle: 'Music & Events',
    description: 'Video musicali, aftermovie di eventi e festival, visual per artisti e DJ.',
    image: '/services/commercial.jpg',
    tags: ['#musicvideo', '#festival', '#artistic', '#events']
  },
  {
    id: 3,
    title: 'Premium',
    subtitle: 'Private Stories',
    description: 'Matrimoni, battesimi, eventi privati esclusivi.',
    image: '/services/premium.jpg',
    tags: ['#wedding', '#exclusive', '#memories', '#luxury']
  }
]

export function ShowreelSection() {
  const [currentService, setCurrentService] = useState(0)
  const [progress, setProgress] = useState(0)
  const [imagesPreloaded, setImagesPreloaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Preload all images on mount
  useEffect(() => {
    const preloadImages = async () => {
      const promises = services.map((service) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = service.image
        })
      })
      await Promise.all(promises)
      setImagesPreloaded(true)
    }
    preloadImages()
  }, [])

  const startTimer = () => {
    setProgress(0)
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    const startTime = Date.now()
    const duration = 4000
    
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)
      
      if (elapsed >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setCurrentService((prev) => (prev + 1) % services.length)
      }
    }, 50)
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentService])

  const handleServiceClick = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCurrentService(index)
  }

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="relative mx-2 sm:mx-3 my-2 rounded-2xl bg-[#9D8EC2] shadow-card"
      style={{ minHeight: '85vh' }}
    >
      {/* Progress bars at top */}
      <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-10 sm:right-10 flex items-center gap-3 sm:gap-4 z-20">
        <span className="text-[#FFF8F0] text-sm font-semibold">Categorie</span>
        <div className="flex gap-2 flex-1 max-w-xs">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => handleServiceClick(index)}
              className="h-1.5 flex-1 rounded-full overflow-hidden bg-[#FFF8F0]/20 cursor-pointer"
            >
              <div
                className="h-full bg-[#DFD295] transition-all duration-100 ease-linear"
                style={{
                  width: index === currentService 
                    ? `${progress}%` 
                    : index < currentService 
                      ? '100%' 
                      : '0%'
                }}
              />
            </button>
          ))}
        </div>
        <span className="text-[#FFF8F0] text-sm font-medium">{currentService + 1}/{services.length}</span>
      </div>

      {/* Main content - Two column layout */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: '85vh' }}>
        {/* Left side - Text content */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-20 pb-6 lg:pt-24 lg:pb-0">
          <motion.h2
            key={`title-${currentService}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[#FFF8F0] text-3xl sm:text-5xl md:text-6xl lg:text-[5vw] leading-tight font-bold"
            style={{ letterSpacing: '-0.02em' }}
          >
            {services[currentService].title}<span className="text-[#DFD295]">.</span>
          </motion.h2>

          <motion.p
            key={`subtitle-${currentService}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-[#FFF8F0] text-lg sm:text-2xl mt-2 sm:mt-3 font-medium"
          >
            {services[currentService].subtitle}
          </motion.p>

          <motion.p
            key={`desc-${currentService}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-[#FFF8F0] text-sm sm:text-lg max-w-md mt-3 sm:mt-6 line-clamp-3 sm:line-clamp-none"
            style={{ lineHeight: '1.6' }}
          >
            {services[currentService].description}
          </motion.p>

          {/* Tags as hashtags */}
          <motion.div
            key={`tags-${currentService}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-8"
          >
            {services[currentService].tags.map((tag) => (
              <span 
                key={tag} 
                className="text-[#DFD295] text-xs sm:text-base font-semibold hover:text-[#FFF8F0] transition-colors duration-200 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right side - Image */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10 pb-10 lg:pb-16">
          <motion.div
            key={`media-${currentService}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md sm:max-w-xl lg:max-w-2xl aspect-[4/3] rounded-xl overflow-hidden bg-[#FFF8F0]/5 border border-[#FFF8F0]/10"
          >
            <Image
              src={services[currentService].image}
              alt={services[currentService].title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 672px"
              className={`object-cover transition-opacity duration-300 ${imagesPreloaded ? 'opacity-100' : 'opacity-0'}`}
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

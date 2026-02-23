'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const progressRef = useRef(0)
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    // Preload only essential images (reduced list for faster loading)
    const imagesToPreload = [
      '/services/commercial.jpg',
      '/services/entertainment.jpg',
      '/services/premium.jpg',
    ]

    let loadedCount = 0
    const totalImages = imagesToPreload.length
    const minDuration = 500 // 0.5 seconds minimum - faster experience
    startTimeRef.current = Date.now()

    // Preload each image
    imagesToPreload.forEach((src) => {
      const img = new window.Image()
      img.onload = () => {
        loadedCount++
      }
      img.onerror = () => {
        loadedCount++
      }
      img.src = src
    })

    // Smooth progress animation - update every 30ms
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const timeProgress = Math.min((elapsed / minDuration) * 100, 100)
      const imageProgress = (loadedCount / totalImages) * 100
      
      // Use the slower of the two progress values to ensure minimum duration
      const targetProgress = Math.min(timeProgress, 100)
      
      // Smoothly animate towards target
      if (progressRef.current < targetProgress) {
        progressRef.current = Math.min(progressRef.current + 2, targetProgress)
        setProgress(Math.round(progressRef.current))
      }
      
      // Complete when both time and images are done
      if (elapsed >= minDuration && loadedCount >= totalImages && progressRef.current >= 99) {
        clearInterval(interval)
        setProgress(100)
        
        // Small delay before fade out
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(onComplete, 400)
        }, 200)
      }
    }, 30)

    return () => {
      clearInterval(interval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0D1321]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Centered percentage - grape.ua style */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Large percentage number */}
            <p
              className="text-[25vw] sm:text-[18vw] lg:text-[14vw] font-bold text-[#FFF8F0] leading-none tabular-nums"
              style={{ letterSpacing: '-0.03em' }}
            >
              {progress}
            </p>
            
            {/* Progress bar */}
            <div className="w-[60vw] sm:w-[40vw] lg:w-[30vw] h-1 bg-[#FFF8F0]/20 rounded-full mt-4 overflow-hidden">
              <motion.div
                className="h-full bg-[#DFD295] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Bottom branding */}
          <motion.div
            className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-[#FFF8F0]/50 text-xs sm:text-sm tracking-widest uppercase">
              drugofiles productions
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

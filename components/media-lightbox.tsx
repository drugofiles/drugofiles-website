'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface MediaItem {
  src: string
  isVideo: boolean
}

interface MediaLightboxProps {
  items: MediaItem[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export function MediaLightbox({ items, initialIndex, isOpen, onClose }: MediaLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }
    
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, currentIndex])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))
  }, [items.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))
  }, [items.length])

  if (!isOpen || items.length === 0) return null

  const currentItem = items[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Chiudi"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Navigation arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Precedente"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Successivo"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </>
        )}

        {/* Media content */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-[90vw] h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {currentItem.isVideo ? (
            <video
              src={currentItem.src}
              className="max-w-full max-h-full object-contain"
              controls
              autoPlay
              loop
              playsInline
            />
          ) : (
            <Image
              src={currentItem.src}
              alt="Media fullscreen"
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          )}
        </motion.div>

        {/* Counter */}
        {items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {currentIndex + 1} / {items.length}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

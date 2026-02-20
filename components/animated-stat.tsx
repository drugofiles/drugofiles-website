'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedStatProps {
  value: number
  label: string
  suffix?: string
}

export function AnimatedStat({ value, label, suffix = '' }: AnimatedStatProps) {
  // Initialize with final value to prevent hydration issues and "0" flash
  const [displayValue, setDisplayValue] = useState<number>(value)
  const [hasStartedAnimation, setHasStartedAnimation] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-50px' })
  const animationRef = useRef<NodeJS.Timeout | null>(null)
  const cycleRef = useRef<NodeJS.Timeout | null>(null)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K'
    return num.toString()
  }

  const runAnimation = useCallback(() => {
    // Start from small percentage, never from 0
    const startValue = Math.max(1, Math.floor(value * 0.05))
    setDisplayValue(startValue)
    setHasStartedAnimation(true)
    
    const duration = 1500
    const steps = 50
    let step = 0

    if (animationRef.current) clearInterval(animationRef.current)

    animationRef.current = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.max(1, Math.floor(value * eased))
      setDisplayValue(current)

      if (step >= steps) {
        setDisplayValue(value)
        if (animationRef.current) clearInterval(animationRef.current)
      }
    }, duration / steps)
  }, [value])

  useEffect(() => {
    if (!isInView) {
      if (animationRef.current) clearInterval(animationRef.current)
      if (cycleRef.current) clearInterval(cycleRef.current)
      // Reset to final value (not 0) when out of view
      setDisplayValue(value)
      setHasStartedAnimation(false)
      return
    }

    runAnimation()

    cycleRef.current = setInterval(() => {
      runAnimation()
    }, 4000) // Increased interval

    return () => {
      if (animationRef.current) clearInterval(animationRef.current)
      if (cycleRef.current) clearInterval(cycleRef.current)
    }
  }, [isInView, runAnimation, value])

  // Format the display - NEVER show "0"
  const getDisplayText = () => {
    if (value <= 0) return '—'
    // Always show something positive
    const safeValue = Math.max(1, displayValue)
    return `${formatNumber(safeValue)}${suffix}`
  }

  return (
    <motion.div
      ref={ref}
      className="text-center w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Label centered above */}
      <p className="text-[#FFF8F0]/60 text-xs uppercase tracking-wider mb-4">
        {label}
      </p>
      <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#DFD295] min-h-[1.2em]">
        {getDisplayText()}
      </div>
    </motion.div>
  )
}

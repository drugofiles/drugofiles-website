'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

interface StatsChartProps {
  label: string
  before: number
  after: number
  color?: string
}

export function StatsChart({ label, before, after, color = '#DFD295' }: StatsChartProps) {
  // Initialize with final values to prevent hydration issues
  const [displayBefore, setDisplayBefore] = useState<number>(before)
  const [displayAfter, setDisplayAfter] = useState<number>(after)
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
    const startBefore = Math.max(1, Math.floor(before * 0.05))
    const startAfter = Math.max(1, Math.floor(after * 0.05))
    setDisplayBefore(startBefore)
    setDisplayAfter(startAfter)
    
    const duration = 1500
    const steps = 50
    let step = 0

    if (animationRef.current) clearInterval(animationRef.current)

    animationRef.current = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayBefore(Math.max(1, Math.floor(before * eased)))
      setDisplayAfter(Math.max(1, Math.floor(after * eased)))

      if (step >= steps) {
        setDisplayBefore(before)
        setDisplayAfter(after)
        if (animationRef.current) clearInterval(animationRef.current)
      }
    }, duration / steps)
  }, [before, after])

  useEffect(() => {
    if (!isInView) {
      if (animationRef.current) clearInterval(animationRef.current)
      if (cycleRef.current) clearInterval(cycleRef.current)
      // Reset to final values when out of view
      setDisplayBefore(before)
      setDisplayAfter(after)
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
  }, [isInView, runAnimation, before, after])

  const maxValue = Math.max(before, after)
  const beforePercent = maxValue > 0 ? (displayBefore / maxValue) * 100 : 0
  const afterPercent = maxValue > 0 ? (displayAfter / maxValue) * 100 : 0

  // Format display values - NEVER show "0"
  const getBeforeText = () => {
    if (before <= 0) return '—'
    const safeValue = Math.max(1, displayBefore)
    return formatNumber(safeValue)
  }
  
  const getAfterText = () => {
    if (after <= 0) return '—'
    const safeValue = Math.max(1, displayAfter)
    return formatNumber(safeValue)
  }

  return (
    <motion.div
      ref={ref}
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Label centered above */}
      <p className="text-[#FFF8F0]/60 text-xs uppercase tracking-wider text-center mb-4">
        {label}
      </p>
      
      <div className="space-y-3">
        {/* Before bar */}
        <div className="flex items-center gap-3">
          <span className="text-[#FFF8F0]/50 text-xs w-12 text-right">Prima</span>
          <div className="flex-1 h-8 bg-[#FFF8F0]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color, opacity: 0.4, width: `${beforePercent}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${beforePercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-[#FFF8F0]/70 text-sm font-medium w-14">
            {getBeforeText()}
          </span>
        </div>
        
        {/* After bar */}
        <div className="flex items-center gap-3">
          <span className="text-[#FFF8F0]/50 text-xs w-12 text-right">Dopo</span>
          <div className="flex-1 h-8 bg-[#FFF8F0]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color, width: `${afterPercent}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${afterPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="font-bold text-sm w-14" style={{ color }}>
            {getAfterText()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { Navigation } from './navigation'
import { LoadingScreen } from './loading-screen'

interface PageWrapperProps {
  children: React.ReactNode
  showLoading?: boolean
}

export function PageWrapper({ children, showLoading = true }: PageWrapperProps) {
  const [isLoading, setIsLoading] = useState(showLoading)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loaded = sessionStorage.getItem('drugofiles_loaded')
      if (loaded) {
        setIsLoading(false)
        setHasLoaded(true)
      }
    }
  }, [])

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
    setHasLoaded(true)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('drugofiles_loaded', 'true')
    }
  }, [])

  return (
    <>
      {isLoading && !hasLoaded && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      
      <div className={`${isLoading && !hasLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <Navigation />
        {children}
      </div>
    </>
  )
}

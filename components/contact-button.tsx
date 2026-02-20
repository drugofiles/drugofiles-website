'use client'

import { useState } from 'react'
import { ContactOverlay } from './contact-overlay'

interface ContactButtonProps {
  className?: string
  children?: React.ReactNode
}

export function ContactButton({ className, children }: ContactButtonProps) {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsContactOpen(true)}
        className={className}
      >
        {children || 'Contattaci'}
      </button>
      <ContactOverlay 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </>
  )
}

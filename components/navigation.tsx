'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContactOverlay } from './contact-overlay'

const navItems = [
  { label: 'Progetti', href: '/portfolio' },
  { label: 'Info', href: '/about' },
]

const slogans = [
  "Make them watch, make them care",
  "Turning vision into motion",
  "It's not what you look at, it's what you see",
  "We shoot ideas, not just videos",
  "Designed to be remembered",
  "Your image matters"
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [currentSlogan, setCurrentSlogan] = useState(0)
  const [revealedWords, setRevealedWords] = useState<number[]>([])
  const [bgOpacity, setBgOpacity] = useState(1)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Scroll-based background opacity (from 100% to 60%)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = 300
      const minOpacity = 0.6
      const newOpacity = Math.max(minOpacity, 1 - (scrollY / maxScroll) * (1 - minOpacity))
      setBgOpacity(newOpacity)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Word-by-word reveal effect
  useEffect(() => {
    const words = slogans[currentSlogan].split(' ')
    const indices = words.map((_, i) => i)
    const shuffled = [...indices].sort(() => Math.random() - 0.5)
    
    setRevealedWords([])
    
    shuffled.forEach((wordIndex, i) => {
      setTimeout(() => {
        setRevealedWords(prev => [...prev, wordIndex])
      }, i * 60)
    })
    
    timeoutRef.current = setTimeout(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length)
    }, shuffled.length * 60 + 2500)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentSlogan])

  const currentWords = slogans[currentSlogan].split(' ')

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Main nav content with opacity background */}
        <div 
          className="relative px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-colors duration-150"
          style={{ backgroundColor: `rgba(222, 218, 207, ${bgOpacity})` }}
        >
          <div className="flex items-center justify-between">
            {/* Left - Logo + Navigation Links */}
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="relative h-6 sm:h-7 w-[110px] sm:w-[130px] hover:opacity-80 transition-opacity duration-200"
              >
                <Image
                  src="/logo.png"
                  alt="Drugofiles Productions"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </Link>
              
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-[#0D1321]/70 hover:text-[#7353BA] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Center - Word-by-word reveal Slogans (Desktop only) */}
            <div className="hidden lg:flex flex-1 justify-center mx-6 overflow-hidden">
              <p className="text-base lg:text-lg font-medium text-[#FFF8F0] italic">
                "
                {currentWords.map((word, index) => (
                  <span
                    key={`${currentSlogan}-${index}`}
                    className={`inline-block mr-[0.3em] transition-opacity duration-150 ${
                      revealedWords.includes(index) ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {word}
                  </span>
                ))}
                "
              </p>
            </div>

            {/* Right - Contattaci button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setShowContact(true)}
                className="px-5 py-2.5 bg-[#DFD295] text-[#0D1321] text-sm font-semibold rounded-lg hover:shadow-button-hover transition-all duration-200 shadow-button"
              >
                Contattaci
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setShowContact(true)}
                className="px-4 py-2 bg-[#DFD295] text-[#0D1321] text-xs font-semibold rounded-lg hover:shadow-button-hover transition-all duration-200 shadow-button"
              >
                Contattaci
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[#0D1321] hover:text-[#7353BA] transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-3 right-3 mt-2 bg-[#DFD295] rounded-xl shadow-card-hover overflow-hidden"
            >
              <div className="py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-6 py-3 text-[#0D1321] hover:bg-[#0D1321]/10 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Contact Overlay */}
      <ContactOverlay isOpen={showContact} onClose={() => setShowContact(false)} />
    </>
  )
}

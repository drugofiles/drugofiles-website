'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

// Word-by-word reveal effect
const introWords = ['We', 'create', 'daring', 'ideas,', 'stories,', 'brands', 'and', 'video', 'productions.']
const taglineWords = ['Trasformiamo', 'storie', 'in', 'esperienze', 'memorabili', 'per', 'brand,', 'artisti', 'e', 'privati', 'esigenti', 'in', 'Italia.']

export function HeroSection() {
  const [revealedIntro, setRevealedIntro] = useState<number[]>([])
  const [revealedWords, setRevealedWords] = useState<number[]>([])

  useEffect(() => {
    // Random order reveal for intro - fast, no movement
    const introIndices = introWords.map((_, i) => i)
    const introShuffled = [...introIndices].sort(() => Math.random() - 0.5)
    
    // Reveal intro words one by one
    introShuffled.forEach((wordIndex, i) => {
      setTimeout(() => {
        setRevealedIntro(prev => [...prev, wordIndex])
      }, i * 50)
    })
    
    // Start tagline reveal after intro completes
    const introCompleteTime = introShuffled.length * 50 + 100
    
    const taglineIndices = taglineWords.map((_, i) => i)
    const taglineShuffled = [...taglineIndices].sort(() => Math.random() - 0.5)
    
    taglineShuffled.forEach((wordIndex, i) => {
      setTimeout(() => {
        setRevealedWords(prev => [...prev, wordIndex])
      }, introCompleteTime + i * 50)
    })
  }, [])

  const scrollToServices = () => {
    const servicesSection = document.getElementById('logos')
    servicesSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative pt-24 sm:pt-28 pb-16 sm:pb-20">
      <div className="px-2 sm:px-3 lg:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start pt-8 sm:pt-12">
          
          {/* Left Column - Main Title */}
          <div className="lg:col-span-7">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5vw] text-[#0D1321] leading-[1.05] font-semibold"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ letterSpacing: '-0.02em' }}
            >
              <span className="font-bold">Drugofiles®</span>
              <br />
              <span className="text-[#FFF8F0]">agenzia indipendente di</span>
              <br />
              <span className="highlight-text">video produzione<span className="text-[#DFD295]">.</span></span>
            </motion.h1>

            {/* Scroll Indicator */}
            <motion.div
              className="mt-16 flex items-center gap-2 text-[#0D1321]/40 cursor-pointer hover:text-[#7353BA] transition-colors duration-200"
              onClick={scrollToServices}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-sm tracking-wider font-medium">Scroll down</span>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Right Column - Description with word reveal */}
          <div className="lg:col-span-5 flex flex-col gap-8 pt-4 lg:pt-8 lg:pl-8">
            <motion.div
              className="space-y-6 lg:ml-auto lg:max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Word-by-word reveal intro */}
              <p className="text-[#FFF8F0] text-base lg:text-lg leading-relaxed" style={{ lineHeight: '1.7' }}>
                {introWords.map((word, index) => (
                  <span
                    key={index}
                    className={`inline-block mr-[0.3em] transition-opacity duration-200 ${
                      revealedIntro.includes(index) ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </p>
              
              {/* Word-by-word reveal tagline */}
              <p className="text-[#0D1321] text-lg lg:text-xl xl:text-2xl leading-relaxed font-medium" style={{ lineHeight: '1.7' }}>
                {taglineWords.map((word, index) => (
                  <span
                    key={index}
                    className={`inline-block mr-[0.3em] transition-opacity duration-150 ${
                      revealedWords.includes(index) ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </p>

              <Link 
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-[#0D1321] text-[#FFF8F0] text-sm font-semibold rounded-lg hover:bg-[#0D1321]/80 transition-all duration-200 shadow-button"
              >
                Scopri di più
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Controlla se l'utente ha già fatto una scelta
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Mostra il banner dopo un breve delay
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)
    // Attiva Google Analytics
    window.dispatchEvent(new Event('cookie-consent-granted'))
  }

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)
    // Non attiva Google Analytics
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
      >
        <div className="max-w-4xl mx-auto bg-[#0D1321] border border-[#dedacf]/20 rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col gap-4">
            {/* Testo principale */}
            <div className="text-[#dedacf]">
              <h3 className="text-lg font-semibold mb-2">🍪 Questo sito utilizza i cookie</h3>
              <p className="text-sm text-[#dedacf]/80">
                Utilizziamo cookie tecnici necessari per il funzionamento del sito e cookie analitici 
                (Google Analytics) per capire come i visitatori interagiscono con il sito. 
                I cookie analitici vengono attivati solo con il tuo consenso.
              </p>
            </div>

            {/* Dettagli espandibili */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#dedacf]/10 rounded-lg p-4 text-sm text-[#dedacf]/80">
                    <div className="mb-3">
                      <strong className="text-[#dedacf]">Cookie necessari</strong>
                      <p>Essenziali per il funzionamento del sito. Non possono essere disattivati.</p>
                    </div>
                    <div>
                      <strong className="text-[#dedacf]">Cookie analitici (Google Analytics)</strong>
                      <p>Ci aiutano a capire come viene utilizzato il sito, quali pagine sono più visitate e come migliorare l'esperienza. I dati sono anonimi e aggregati.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottoni */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-[#dedacf]/60 hover:text-[#dedacf] underline transition-colors"
                >
                  {showDetails ? 'Nascondi dettagli' : 'Maggiori informazioni'}
                </button>
                <Link
                  href="/privacy"
                  className="text-[#dedacf]/60 hover:text-[#dedacf] underline transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={acceptNecessary}
                  className="px-5 py-2.5 text-sm font-medium text-[#dedacf] border border-[#dedacf]/30 rounded-full hover:bg-[#dedacf]/10 transition-colors"
                >
                  Solo necessari
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 text-sm font-medium bg-[#7353BA] text-white rounded-full hover:bg-[#7353BA]/90 transition-colors"
                >
                  Accetta tutti
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

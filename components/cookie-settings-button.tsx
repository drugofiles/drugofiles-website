'use client'

import { useState } from 'react'
import { Cookie } from 'lucide-react'

export function CookieSettingsButton() {
  const [showBanner, setShowBanner] = useState(false)

  const openSettings = () => {
    // Rimuovi il consenso precedente per far riapparire il banner
    localStorage.removeItem('cookie-consent')
    localStorage.removeItem('cookie-consent-date')
    // Ricarica la pagina per mostrare il banner
    window.location.reload()
  }

  return (
    <button
      onClick={openSettings}
      className="fixed bottom-4 left-4 z-[9998] p-3 bg-[#0D1321] text-[#dedacf] rounded-full shadow-lg hover:bg-[#0D1321]/90 transition-all hover:scale-110 group"
      aria-label="Impostazioni cookie"
      title="Gestisci preferenze cookie"
    >
      <Cookie className="w-5 h-5" />
      <span className="absolute left-full ml-2 px-2 py-1 bg-[#0D1321] text-[#dedacf] text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Gestisci cookie
      </span>
    </button>
  )
}

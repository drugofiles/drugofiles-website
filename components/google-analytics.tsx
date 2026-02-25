'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function GoogleAnalytics() {
  const [consentGranted, setConsentGranted] = useState(false)

  useEffect(() => {
    // Controlla se il consenso è già stato dato
    const consent = localStorage.getItem('cookie-consent')
    if (consent === 'all') {
      setConsentGranted(true)
    }

    // Ascolta l'evento di consenso
    const handleConsent = () => {
      setConsentGranted(true)
    }

    window.addEventListener('cookie-consent-granted', handleConsent)
    return () => window.removeEventListener('cookie-consent-granted', handleConsent)
  }, [])

  // Non caricare GA se non c'è l'ID o se non c'è consenso
  if (!GA_MEASUREMENT_ID || !consentGranted) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });
          `,
        }}
      />
    </>
  )
}

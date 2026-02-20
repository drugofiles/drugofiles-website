import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { GoogleAnalytics } from '@/components/google-analytics'
import { ErrorBoundary } from '@/components/error-boundary'
import { TranslateFix } from '@/components/translate-fix'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: 'Drugofiles Productions | Video Produzione Pordenone | Agenzia Video Friuli',
    template: '%s | Drugofiles Productions'
  },
  description: 'Agenzia video produzione a Pordenone. Video matrimoni, battesimi, eventi, videoclip musicali, contenuti social e video aziendali. Serviamo Friuli Venezia Giulia, Veneto e Nord Italia.',
  keywords: [
    // Servizi principali
    'video matrimonio pordenone', 'videomaker matrimonio friuli', 'video matrimoni udine',
    'video battesimo pordenone', 'video battesimi friuli venezia giulia',
    'video eventi pordenone', 'riprese eventi friuli', 'video eventi aziendali nord est',
    'video musicali pordenone', 'videoclip musicali friuli', 'produzione videoclip italia',
    'video social pordenone', 'reels instagram agenzia', 'contenuti social video', 'tiktok video agenzia',
    // Località
    'video produzione pordenone', 'agenzia video friuli', 'filmmaker pordenone',
    'videomaker udine', 'video produzione treviso', 'filmmaker trieste', 'video produzione venezia',
    // Generici
    'video aziendali nord est', 'spot pubblicitari friuli venezia giulia', 'produzione video italia',
    'agenzia video nord italia', 'video promozionali aziende'
  ],
  authors: [{ name: 'Drugofiles Productions' }],
  creator: 'Drugofiles Productions',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Drugofiles Productions | Video Produzione Pordenone',
    description: 'Agenzia video produzione a Pordenone. Spot pubblicitari, video aziendali, contenuti social per il Nord Est Italia.',
    images: ['/og-image.png'],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drugofiles Productions | Video Produzione Pordenone',
    description: 'Agenzia video produzione a Pordenone. Spot pubblicitari, video aziendali, contenuti social.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        {/* Schema Markup LocalBusiness - Service Area Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Drugofiles Productions",
              "description": "Agenzia indipendente di video produzione. Realizziamo spot pubblicitari, video aziendali, contenuti social e video eventi per aziende del Nord Est Italia.",
              "@id": "https://drugofiles.com",
              "url": "https://drugofiles.com",
              "telephone": "+39 351 552 0097",
              "email": "info@drugofiles.com",
              "image": "https://drugofiles.com/og-image.png",
              "priceRange": "€€",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pordenone",
                "addressRegion": "Friuli-Venezia Giulia",
                "addressCountry": "IT"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 45.9564,
                "longitude": 12.6615
              },
              "areaServed": [
                {
                  "@type": "State",
                  "name": "Friuli-Venezia Giulia"
                },
                {
                  "@type": "State", 
                  "name": "Veneto"
                },
                {
                  "@type": "City",
                  "name": "Pordenone"
                },
                {
                  "@type": "City",
                  "name": "Udine"
                },
                {
                  "@type": "City",
                  "name": "Treviso"
                },
                {
                  "@type": "City",
                  "name": "Venezia"
                },
                {
                  "@type": "City",
                  "name": "Trieste"
                }
              ],
              "sameAs": [
                "https://www.instagram.com/drugofiles"
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servizi Video Produzione",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Video Matrimonio",
                      "description": "Video matrimonio cinematografico a Pordenone, Udine, Friuli e Veneto. Riprese professionali del tuo giorno speciale."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Video Battesimo",
                      "description": "Video battesimo e cerimonie religiose. Ricordi emozionanti del battesimo del tuo bambino in Friuli Venezia Giulia."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Video Eventi",
                      "description": "Copertura video professionale di eventi aziendali, feste private, compleanni e occasioni speciali a Pordenone e Nord Italia."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Video Musicali e Videoclip",
                      "description": "Produzione videoclip musicali per artisti e band. Qualità cinematografica per il tuo progetto musicale."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Contenuti Social e Reels",
                      "description": "Produzione video per Instagram Reels, TikTok, YouTube Shorts. Contenuti social professionali per aziende e influencer."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Video Aziendali e Spot",
                      "description": "Video corporate, spot pubblicitari e presentazioni aziendali per imprese del Nord Est Italia."
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <TranslateFix />
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}

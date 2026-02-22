import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Redirect map: old URLs → new URLs
const redirects: Record<string, string> = {
  // Old category/service pages
  '/produzione-video': '/portfolio',
  '/foto-ritratti': '/portfolio',
  '/foto-ritratti-commerciali': '/portfolio',
  '/servizi': '/portfolio',
  '/video-production': '/portfolio',
  '/portfolio/video-production': '/portfolio',
  
  // Old project URLs with different slugs
  '/thats-amore': '/portfolio/ThatsAmore',
  '/portfolio/thats-amore': '/portfolio/ThatsAmore',
  '/commercial-per-vbm': '/portfolio/VBM-Domobar',
  '/portfolio/commercial-per-vbm': '/portfolio/VBM-Domobar',
  '/portfolio/vbm': '/portfolio/VBM-Domobar',
  '/battesimo-di-bella': '/portfolio/battesimo-bella',
  '/portfolio/battesimo-di-bella': '/portfolio/battesimo-bella',
  
  // Common old patterns
  '/projects': '/portfolio',
  '/works': '/portfolio',
  '/lavori': '/portfolio',
  '/contatti': '/#contact',
  '/contact': '/#contact',
  '/chi-siamo': '/about',
  '/about-us': '/about',
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase()
  
  // Check for exact match redirect
  const redirectTo = redirects[pathname]
  if (redirectTo) {
    const url = request.nextUrl.clone()
    url.pathname = redirectTo
    return NextResponse.redirect(url, 301)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next/static|_next/image|favicon|.*\\..*|robots.txt|sitemap.xml).*)',
  ],
}

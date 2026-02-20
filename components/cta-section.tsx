'use client'

import { motion } from 'framer-motion'

export function CTASection() {
  const phoneNumber = '393273752441'
  
  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      <div className="px-2 sm:px-3 lg:px-4">
        {/* Header */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0D1321] mb-4" style={{ letterSpacing: '-0.02em' }}>
            Iniziamo a <span className="highlight-text">creare</span> insieme<span className="text-[#DFD295]">.</span>
          </h2>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Left - Contact details */}
          <div className="space-y-5">
            <p className="text-[#FFF8F0] text-sm font-medium uppercase tracking-wider">Contatti</p>
            
            <div className="space-y-3">
              <p className="flex items-center gap-4">
                <span className="text-[#FFF8F0]/50">↳</span>
                <a 
                  href="mailto:info@drugofiles.com" 
                  className="text-[#0D1321] text-xl sm:text-2xl lg:text-3xl font-semibold hover:text-[#7353BA] transition-colors duration-200"
                >
                  info@drugofiles.com
                </a>
              </p>
              <p className="pl-8">
                <a 
                  href="tel:+393273752441" 
                  className="text-[#0D1321] text-xl sm:text-2xl lg:text-3xl font-semibold hover:text-[#7353BA] transition-colors duration-200"
                >
                  +39 327 375 2441
                </a>
              </p>
            </div>

            <p className="text-[#FFF8F0] text-sm sm:text-base pt-4 font-medium">
              Pordenone, Italia
            </p>
          </div>

          {/* Right - Social & Tag */}
          <div className="lg:text-right">
            <p className="text-[#FFF8F0] text-sm font-medium uppercase tracking-wider mb-5">Seguici</p>
            
            <p className="text-[#7353BA] font-bold text-2xl sm:text-3xl mb-6">#drugofiles</p>
            
            <div className="flex gap-6 lg:justify-end">
              <a 
                href="https://www.instagram.com/drugofiles/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#0D1321]/60 hover:text-[#7353BA] transition-colors duration-200 font-medium"
              >
                Instagram
              </a>
              <a 
                href={`https://api.whatsapp.com/send?phone=${phoneNumber}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#0D1321]/60 hover:text-[#7353BA] transition-colors duration-200 font-medium"
              >
                WhatsApp
              </a>
              <a 
                href={`https://t.me/+${phoneNumber}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#0D1321]/60 hover:text-[#7353BA] transition-colors duration-200 font-medium"
              >
                Telegram
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Large Year Watermark */}
      <div className="absolute bottom-4 left-0 right-0 pointer-events-none">
        <p className="text-[15vw] sm:text-[12vw] lg:text-[10vw] font-bold text-[#0D1321]/[0.08] leading-none tracking-tighter text-center">
          ©2026
        </p>
      </div>
    </section>
  )
}

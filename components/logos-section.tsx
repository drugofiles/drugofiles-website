'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const clients = [
  { name: 'PR1ME', logo: '/clients/pr1me-logo.png', invert: false },
  { name: 'Vennari', logo: '/clients/vennari-logo.png', invert: false },
  { name: 'Radio Wow', logo: '/clients/radiowow-logo.png', invert: false },
  { name: 'Setumismo', logo: '/clients/setumismo-logo.png', invert: false },
  { name: 'MOV', logo: '/clients/mov-logo.png', invert: true },
  { name: 'Padel Chions', logo: '/clients/padelchions-logo.png', invert: true },
  { name: 'Papi OTB', logo: '/clients/papiotb-logo.png', invert: false },
  { name: "That's Amore", logo: '/clients/thatsamore-logo.png', invert: false },
  { name: 'Fuori Tutti', logo: '/clients/fuoritutti-logo.png', invert: false },
  { name: 'BMS', logo: '/clients/bms-logo.png', invert: false },
  { name: 'MNL', logo: '/clients/mnl-logo.png', invert: false },
  { name: 'Naonian', logo: '/clients/naonian-logo.png', invert: false },
  { name: 'Alba Pluma', logo: '/clients/albapluma-logo.png', invert: true },
  { name: 'FEIN', logo: '/clients/fein-logo.png', invert: false },
  { name: "Tutt'Altro", logo: '/clients/tuttaltro-logo.png', invert: false },
  { name: 'Vivila Così', logo: '/clients/vivilacosi-logo.png', invert: false },
]

export function LogosSection() {
  // Duplicate the array to create seamless infinite loop
  const duplicatedClients = [...clients, ...clients]

  return (
    <section id="logos" className="relative py-6 sm:py-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden"
      >
        {/* Logos closer together on mobile: mx-4 instead of mx-8 */}
        <div className="flex whitespace-nowrap animate-marquee-infinite" style={{ width: 'fit-content' }}>
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="mx-4 sm:mx-8 lg:mx-12 flex items-center justify-center min-w-[100px] sm:min-w-[140px] lg:min-w-[200px] h-16 sm:h-24 flex-shrink-0"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={96}
                className={`object-contain opacity-90 hover:opacity-100 transition-opacity duration-200 w-[100px] sm:w-[120px] lg:w-[180px] h-auto max-h-16 sm:max-h-24 ${client.invert ? 'brightness-0 invert' : ''}`}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

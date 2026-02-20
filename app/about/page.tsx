'use client'

import { motion } from 'framer-motion'
import { PageWrapper } from '@/components/page-wrapper'
import { CTASection } from '@/components/cta-section'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ContactOverlay } from '@/components/contact-overlay'

const stats = [
  { value: '200+', label: 'Progetti Realizzati' },
  { value: '100+', label: 'Clienti Soddisfatti' },
  { value: '20M+', label: 'Views Generate' },
  { value: '6', label: 'Anni di Esperienza' },
]

const processSteps = [
  {
    number: '01',
    title: 'Briefing & Concept',
    subtitle: 'Ascoltiamo, poi creiamo',
    description: 'Ogni progetto inizia con una chiamata. Capiamo i tuoi obiettivi, il tuo pubblico e cosa vuoi comunicare. Da lì sviluppiamo un concept creativo su misura — script, storyboard, mood board. Niente template, solo idee pensate per te.',
    image: '/projects/4Processo.jpg',
  },
  {
    number: '02',
    title: 'Produzione',
    subtitle: 'Il set è il nostro habitat',
    description: 'Riprese con camere cinema (RED, Blackmagic, Sony FX), ottiche cinematografiche, stabilizzatori e luci professionali. Che sia uno studio, una location esterna o un evento live — ci adattiamo. Il team si espande in base alle esigenze: operatori, fonici, droni, tutto quello che serve.',
    image: '/projects/5Processo.jpg',
  },
  {
    number: '03',
    title: 'Post-Produzione',
    subtitle: 'Dove la magia prende forma',
    description: "Montaggio dinamico con ritmo studiato per mantenere l'attenzione. Color grading cinematografico che definisce l'atmosfera. Sound design, motion graphics, sottotitoli. Ogni frame viene curato come se fosse l'ultimo.",
    image: '/projects/6Processo.jpg',
  },
  {
    number: '04',
    title: 'Consegna & Supporto',
    subtitle: 'Non finisce qui',
    description: 'Consegna in tutti i formati necessari — orizzontale, verticale, quadrato. Ottimizzato per ogni piattaforma. E se hai bisogno di modifiche o nuove versioni? Siamo sempre disponibili. Il supporto post-progetto è incluso.',
    image: '/projects/7Processo.jpg',
  },
]

const expertise = [
  'Video promozionali & spot',
  'Videoclip musicali',
  'Contenuti social (Reels, TikTok, Shorts)',
  'Video aziendali & corporate',
  'Documentari & storytelling',
  'Eventi & matrimoni cinematografici',
  'Branding video & lanci prodotto',
  'Contenuti per e-commerce',
]

export default function AboutPage() {
  const [showContact, setShowContact] = useState(false)

  return (
    <PageWrapper showLoading={false}>
      <main className="bg-[#dedacf]">
        
        {/* Hero Section */}
        <section className="pt-28 sm:pt-32 pb-16 sm:pb-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link 
                  href="/" 
                  className="text-[#7353BA] hover:text-[#5D4399] transition-colors duration-200 text-sm font-medium mb-8 inline-block"
                >
                  ← Torna alla home
                </Link>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0D1321] mb-8" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                  Non facciamo video<span className="text-[#DFD295]">.</span><br />
                  <span className="text-[#7353BA]">Costruiamo percezioni</span><span className="text-[#DFD295]">.</span>
                </h1>
                
                <p className="text-[#0D1321]/70 text-lg sm:text-xl lg:text-2xl" style={{ lineHeight: '1.7' }}>
                  Drugofiles Productions è una video production agency con base in Friuli-Venezia Giulia. 
                  Aiutiamo brand, artisti e creator a trasformare idee in contenuti video 
                  che catturano l'attenzione e generano risultati concreti.
                </p>
              </motion.div>
              
              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/projects/1CostruiamoPercezioni.png"
                    alt="Drugofiles Productions - Costruiamo Percezioni"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* La Storia / Il Fondatore */}
        <section className="mx-2 sm:mx-3 my-2 rounded-2xl bg-[#0D1321] shadow-card overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[#DFD295] text-sm font-medium uppercase tracking-wider mb-4 block">Chi c'è dietro</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF8F0] mb-6" style={{ letterSpacing: '-0.02em' }}>
                  Misha Kryzhevskykh<span className="text-[#DFD295]">.</span>
                </h2>
                <div className="space-y-4 text-[#FFF8F0]/80 text-base sm:text-lg" style={{ lineHeight: '1.8' }}>
                  <p>
                    Ucraino di origine, italiano di adozione. Ho iniziato a fare video quando ancora 
                    pensavo che bastasse una buona camera per fare bei contenuti. <span className="text-[#FFF8F0]/50 italic">Spoiler: no.</span>
                  </p>
                  <p>
                    Dopo 6 anni, oltre 200 progetti e qualche notte insonne in color grading, 
                    ho capito che il vero segreto sta nella psicologia — capire cosa fa fermare 
                    lo scroll, cosa fa emozionare, cosa fa agire.
                  </p>
                  <p>
                    Ho lavorato con artisti musicali, aziende di ogni dimensione, e privati 
                    che volevano immortalare momenti importanti. Ogni progetto mi ha insegnato qualcosa.
                  </p>
                  <p className="text-[#DFD295] font-medium">
                    Oggi Drugofiles non sono solo io — è un network di professionisti 
                    pronti a gestire anche i progetti più complessi. Ma l'approccio resta lo stesso: 
                    curare ogni dettaglio come se fosse il nostro progetto personale.
                  </p>
                </div>
              </motion.div>
              
              {/* Foto fondatore */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FFF8F0]/5 border border-[#FFF8F0]/10">
                  <Image
                    src="/projects/2.Misha.jpg"
                    alt="Misha Kryzhevskykh - Founder di Drugofiles Productions"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA #1 - Emotivo */}
        <section className="mx-2 sm:mx-3 my-2 rounded-2xl bg-[#7353BA] shadow-card overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-between gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#FFF8F0] mb-2">
                  Hai un'idea che vuoi realizzare?
                </h3>
                <p className="text-[#FFF8F0]/70 text-base sm:text-lg">
                  Raccontami il tuo progetto. La prima call è gratuita e senza impegno.
                </p>
              </div>
              <button
                onClick={() => setShowContact(true)}
                className="shrink-0 inline-flex items-center gap-2 bg-[#DFD295] text-[#0D1321] px-8 py-4 rounded-full text-base font-semibold hover:bg-[#FFF8F0] transition-colors duration-200"
              >
                Parliamone →
              </button>
            </motion.div>
          </div>
        </section>

        {/* Le Idee Section */}
        <section className="mx-2 sm:mx-3 my-2 rounded-2xl bg-[#dedacf] shadow-card overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <motion.div
                className="relative order-2 lg:order-1"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/projects/3Idee.jpg"
                    alt="Le nostre idee creative"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Text */}
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[#7353BA] text-sm font-medium uppercase tracking-wider mb-4 block">La Nostra Filosofia</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D1321] mb-6" style={{ letterSpacing: '-0.02em' }}>
                  Idee che fanno<br />la differenza<span className="text-[#7353BA]">.</span>
                </h2>
                <div className="space-y-4 text-[#0D1321]/70 text-base sm:text-lg" style={{ lineHeight: '1.8' }}>
                  <p>
                    Ogni progetto parte da un&apos;idea. Ma non un&apos;idea qualsiasi — un&apos;idea 
                    studiata per funzionare. Analizziamo il mercato, il pubblico target, 
                    e i competitor prima ancora di accendere la camera.
                  </p>
                  <p>
                    Il nostro approccio combina creatività e strategia. Non facciamo video 
                    &quot;belli e basta&quot; — creiamo contenuti che parlano alle persone giuste, 
                    nel modo giusto, al momento giusto.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Il Nostro Processo - Con foto alternate */}
        <section className="mx-2 sm:mx-3 my-2 rounded-2xl bg-[#DFD295] shadow-card overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#7353BA] text-sm font-medium uppercase tracking-wider mb-4 block">Il Processo</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D1321] mb-4" style={{ letterSpacing: '-0.02em' }}>
                Dalla tua idea al video finale<span className="text-[#7353BA]">.</span>
              </h2>
              <p className="text-[#0D1321]/60 max-w-2xl mx-auto text-base sm:text-lg">
                Un workflow collaudato in centinaia di progetti. Zero sorprese, massima trasparenza.
              </p>
            </motion.div>

            <div className="space-y-12 sm:space-y-16">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Text */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}>
                    <div className="bg-[#dedacf] rounded-xl p-6 sm:p-8 shadow-card">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-[#7353BA] text-4xl sm:text-5xl font-bold opacity-40">
                          {step.number}
                        </span>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-[#0D1321]">
                            {step.title}
                          </h3>
                          <p className="text-[#7353BA] text-sm font-medium">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-[#0D1321]/60 text-base" style={{ lineHeight: '1.7' }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cosa Facciamo - Con video verticali */}
        <section className="mx-2 sm:mx-3 my-2 rounded-2xl bg-[#0D1321] shadow-card overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
            {/* Desktop layout: videos - text - videos */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_2fr_1fr] gap-8 items-start">
              {/* Left videos */}
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
                  <video
                    src="/videos/8Servizi.mp4"
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                </div>
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
                  <video
                    src="/videos/9Servizi.mp4"
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                </div>
              </div>

              {/* Center text */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[#DFD295] text-sm font-medium uppercase tracking-wider mb-4 block">Servizi</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF8F0] mb-6" style={{ letterSpacing: '-0.02em' }}>
                  Cosa possiamo<br />fare per te<span className="text-[#DFD295]">.</span>
                </h2>
                <p className="text-[#FFF8F0]/70 text-base sm:text-lg mb-8" style={{ lineHeight: '1.7' }}>
                  Dalla strategia alla consegna finale, copriamo ogni aspetto della produzione video. 
                  Se non lo facciamo direttamente, abbiamo il collaboratore giusto nel network.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {expertise.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-[#FFF8F0]/5 border border-[#FFF8F0]/10 rounded-lg px-4 py-3 text-[#FFF8F0] text-sm sm:text-base text-left"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-[#DFD295] font-semibold hover:text-[#FFF8F0] transition-colors"
                >
                  Vedi i progetti realizzati →
                </Link>
              </motion.div>

              {/* Right videos */}
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
                  <video
                    src="/videos/10Servizi.mp4"
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                </div>
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
                  <video
                    src="/videos/11Servizi.mp4"
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                </div>
              </div>
            </div>

            {/* Mobile/Tablet layout */}
            <div className="lg:hidden">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <span className="text-[#DFD295] text-sm font-medium uppercase tracking-wider mb-4 block">Servizi</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#FFF8F0] mb-6" style={{ letterSpacing: '-0.02em' }}>
                  Cosa possiamo<br />fare per te<span className="text-[#DFD295]">.</span>
                </h2>
                <p className="text-[#FFF8F0]/70 text-base sm:text-lg mb-8" style={{ lineHeight: '1.7' }}>
                  Dalla strategia alla consegna finale, copriamo ogni aspetto della produzione video. 
                  Se non lo facciamo direttamente, abbiamo il collaboratore giusto nel network.
                </p>
              </motion.div>

              {/* Videos row on mobile */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
                  <video
                    src="/videos/8Servizi.mp4"
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                </div>
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
                  <video
                    src="/videos/10Servizi.mp4"
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {expertise.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-[#FFF8F0]/5 border border-[#FFF8F0]/10 rounded-lg px-4 py-3 text-[#FFF8F0] text-sm sm:text-base"
                  >
                    {item}
                  </div>
                ))}
              </div>
              
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-[#DFD295] font-semibold hover:text-[#FFF8F0] transition-colors"
              >
                Vedi i progetti realizzati →
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mx-2 sm:mx-3 my-2 rounded-2xl bg-[#DFD295] shadow-card overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#7353BA] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-[#0D1321]/60 text-sm sm:text-base font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA #2 - Razionale */}
        <section className="mx-2 sm:mx-3 my-2 rounded-2xl bg-[#0D1321] shadow-card overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF8F0] mb-6" style={{ letterSpacing: '-0.02em' }}>
                Pronto a creare qualcosa<br />
                di memorabile<span className="text-[#DFD295]">?</span>
              </h2>
              <p className="text-[#FFF8F0]/70 text-lg sm:text-xl mb-8" style={{ lineHeight: '1.7' }}>
                Che tu sia un'azienda che vuole aumentare la visibilità, un artista che sta 
                per lanciare il prossimo singolo, o semplicemente vuoi immortalare un momento 
                importante — parliamone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowContact(true)}
                  className="inline-flex items-center justify-center gap-2 bg-[#DFD295] text-[#0D1321] px-8 py-4 rounded-full text-base font-semibold hover:bg-[#FFF8F0] transition-colors duration-200"
                >
                  Inizia il tuo progetto
                </button>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#FFF8F0]/30 text-[#FFF8F0] px-8 py-4 rounded-full text-base font-semibold hover:border-[#FFF8F0] hover:bg-[#FFF8F0]/10 transition-colors duration-200"
                >
                  Esplora i progetti
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer CTA */}
        <CTASection />

        {/* Contact Overlay */}
        <ContactOverlay isOpen={showContact} onClose={() => setShowContact(false)} />
      </main>
    </PageWrapper>
  )
}

import { PrismaClient, MacroAreaType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Adding real projects...')

  // Get macro areas
  const brandArea = await prisma.macroArea.findFirst({
    where: { type: MacroAreaType.BRAND_CAMPAIGNS }
  })
  
  const premiumArea = await prisma.macroArea.findFirst({
    where: { type: MacroAreaType.PRIVATE_STORIES }
  })

  if (!brandArea || !premiumArea) {
    console.error('Macro areas not found!')
    return
  }

  // Delete old test projects
  await prisma.project.deleteMany({})
  console.log('Deleted old projects')

  // Add Alba Pluma
  await prisma.project.create({
    data: {
      title: 'Alba Pluma video di lancio',
      slug: 'alba-pluma-video-di-lancio',
      description: 'Video promozionale realizzato per albaPluma, brand italiano di calzature che unisce eleganza, comfort e benessere. In questo filmato, raccontiamo visivamente l\'identità del marchio, valorizzando lo stile raffinato e l\'artigianalità delle scarpe, pensate per una donna moderna, dinamica e attenta al proprio equilibrio interiore.',
      tagline: 'Equilibrio tra Stile e Benessere',
      thumbnail: '/projects/Albapluma3.jpg',
      videoUrl: 'https://youtu.be/30OwIkoKpww',
      galleryImages: ['/projects/Albapluma1.jpg', '/projects/Albapluma2.jpg', '/projects/Albapluma3.jpg'],
      tags: ['branding', 'video', 'social', 'videolancio'],
      year: 2025,
      client: 'AlbaPluma',
      featured: true,
      macroAreaId: brandArea.id,
    }
  })
  console.log('Added: Alba Pluma')

  // Add Battesimo di Bella
  await prisma.project.create({
    data: {
      title: 'Battesimo di Bella',
      slug: 'battesimo-bella',
      description: 'In questo film cinematografico raccontiamo il battesimo della piccola Bella, con immagini emozionanti, voiceover coinvolgente, musica su misura e uno sguardo intimo sui momenti più significativi della giornata.',
      tagline: 'Un battesimo, una famiglia, un ricordo',
      thumbnail: '/projects/BattesimoBella1.jpg',
      videoUrl: 'https://youtu.be/90BHLP-KR-c',
      galleryImages: ['/projects/BattesimoBella1.jpg', '/projects/BattesimoBella2.jpg', '/projects/BattesimoBella3.jpg', '/projects/BattesimoBella4.jpg'],
      tags: ['battesimo', 'cinematic', 'film'],
      year: 2025,
      client: 'Genitori di Bella',
      featured: false,
      macroAreaId: premiumArea.id,
    }
  })
  console.log('Added: Battesimo di Bella')

  // Add ISOLA (Vennari)
  await prisma.project.create({
    data: {
      title: 'ISOLA',
      slug: 'isola-vennari',
      description: 'Una serie di video promozionali realizzati per il brand di gioielli italiano, con l\'obbiettivo di associare il brand alla piccola e favolosa Isola di Cavallo. Riprese effettuate nell\'acqua, sulla sabbia e sulle rocce. Sole splendente e spiagge scelte accuratamente per rappresentare al meglio lo stile del brand.',
      tagline: '41°22\'05"N 9°15\'50"E',
      thumbnail: '/projects/Vennari1.jpg',
      videoUrl: 'https://youtu.be/JFev5sJOlkI',
      galleryImages: ['/projects/Vennari1.jpg', '/projects/Vennari2.jpg', '/projects/Vennari3.jpg', '/projects/Vennari4.jpg', '/projects/Vennari5.jpg', '/projects/Vennari6.jpg'],
      tags: ['branding', 'luxury', 'gioielli', 'madeinitaly'],
      year: 2023,
      client: 'Vennari',
      featured: true,
      macroAreaId: brandArea.id,
    }
  })
  console.log('Added: ISOLA (Vennari)')

  console.log('Done! All real projects added.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { PrismaClient, MacroAreaType } from '@prisma/client';

const prisma = new PrismaClient();

const macroAreas = [
  {
    id: "cmltytxru0000uoutmyglgbn5",
    name: "Commercial",
    slug: "commercial",
    type: MacroAreaType.BRAND_CAMPAIGNS,
    title: "Comunicazione aziendale e commerciale",
    description: "Spot pubblicitari, video di lancio brand/prodotti, reel strategici per crescita social. Contenuti che fanno crescere il brand e aumentano la conversione.",
    thumbnail: "/projects/Albapluma3.jpg",
    order: 1
  },
  {
    id: "cmltytxs90001uoutdnd75sgn",
    name: "Entertainment",
    slug: "entertainment",
    type: MacroAreaType.ENTERTAINMENT_MUSIC,
    title: "Contenuti per artisti ed eventi",
    description: "Video musicali, aftermovie di eventi e festival, visual per artisti e DJ. Contenuti che emozionano e coinvolgono il pubblico.",
    thumbnail: "/projects/Betta4.jpg",
    order: 2
  },
  {
    id: "cmltytxsb0002uoutytlxy5rz",
    name: "Premium",
    slug: "premium",
    type: MacroAreaType.PRIVATE_STORIES,
    title: "Eventi e ricordi di valore",
    description: "Matrimoni, battesimi, eventi privati esclusivi. Momenti unici trasformati in ricordi immortali.",
    thumbnail: "/projects/MatrimonioFabrice1.jpg",
    order: 3
  }
];

async function main() {
  await prisma.caseStudy.deleteMany()
  await prisma.project.deleteMany()
  await prisma.clientLogo.deleteMany()
  await prisma.macroArea.deleteMany()

  console.log('Cleaned existing data')

  // Seed MacroAreas
  const createdMacroAreas = await Promise.all(
    macroAreas.map((area) =>
      prisma.macroArea.create({
        data: area,
      })
    )
  )
  console.log('Seeded macro areas')

  // Seed Client Logos
  const clients = [
    { name: 'AlbaPluma', logoUrl: '/logos/albapluma.png', order: 1 },
    { name: 'Vennari', logoUrl: '/logos/vennari.png', order: 2 },
    { name: 'Loris', logoUrl: '/logos/loris.png', order: 3 },
    { name: 'MNL Auto', logoUrl: '/logos/mnlauto.png', order: 4 },
    { name: 'VBM', logoUrl: '/logos/vbm.png', order: 5 },
    { name: "That's Amore", logoUrl: '/logos/thatsamore.png', order: 6 },
    { name: 'Se Tu Mismo', logoUrl: '/logos/setumismo.png', order: 7 },
    { name: 'Wisee', logoUrl: '/logos/wisee.png', order: 8 },
  ]

  await prisma.clientLogo.createMany({
    data: clients,
  })
  console.log('Seeded client logos')

  // Get area IDs
  const commercialArea = createdMacroAreas.find(
    (area) => area.type === MacroAreaType.BRAND_CAMPAIGNS
  )
  const entertainmentArea = createdMacroAreas.find(
    (area) => area.type === MacroAreaType.ENTERTAINMENT_MUSIC
  )
  const premiumArea = createdMacroAreas.find(
    (area) => area.type === MacroAreaType.PRIVATE_STORIES
  )

  // Projects from CSV 260219 - in order
  const projectsData = [
    // 1. Alba Pluma (Commercial, Featured)
    {
      title: 'Alba Pluma video di lancio',
      slug: 'alba-pluma-video-di-lancio',
      client: 'AlbaPluma',
      year: 2025,
      tagline: 'Equilibrio tra Stile e Benessere',
      thumbnail: '/projects/Albapluma3.jpg',
      localVideo: '/videos/AlbaplumaVideo1.mp4',
      objective: "L'obbiettivo del progetto con AlbaPluma era creare un video di lancio dinamico, per rappresentare il brand e i suoi valori. Eleganza, comfort, leggerezza.",
      description: "Video promozionale realizzato per albaPluma, brand italiano di calzature che unisce eleganza, comfort e benessere. In questo filmato, raccontiamo visivamente l'identità del marchio, valorizzando lo stile raffinato e l'artigianalità delle scarpe, pensate per una donna moderna, dinamica e attenta al proprio equilibrio interiore.",
      objectiveMedia: ['Albapluma1.jpg'],
      descriptionMedia: ['Albapluma2.jpg'],
      resultMedia: ['Albapluma3.jpg'],
      tags: ['branding', 'video', 'social', 'videolancio'],
      featured: true,
      macroAreaId: commercialArea!.id,
    },
    // 2. Battesimo di Bella (Premium)
    {
      title: 'Battesimo di Bella',
      slug: 'battesimo-bella',
      client: 'Genitori di Bella',
      year: 2025,
      tagline: 'Un battesimo, una famiglia, un ricordo',
      thumbnail: '/projects/BattesimoBella1.jpg',
      localVideo: '/videos/BattesimoBellaVideo1.mp4',
      description: "In questo film cinematografico raccontiamo il battesimo della piccola Bella, con immagini emozionanti, voiceover coinvolgente, musica su misura e uno sguardo intimo sui momenti più significativi della giornata.",
      galleryImages: ['BattesimoBella1.jpg', 'BattesimoBella2.jpg', 'BattesimoBella3.jpg', 'BattesimoBella4.jpg'],
      tags: ['battesimo', 'cinematic', 'film'],
      featured: false,
      macroAreaId: premiumArea!.id,
    },
    // 3. ISOLA (Commercial, Featured)
    {
      title: 'ISOLA',
      slug: 'isola-vennari',
      client: 'Vennari',
      year: 2023,
      tagline: '41°22\'05"N 9°15\'50"E',
      thumbnail: '/projects/Vennari1.jpg',
      localVideo: '/videos/VennariVideo1.mp4',
      objective: "Una campagna video ripresa intaramente sull'Isola di Cavallo, con lo scopo di assocciare il brand di gioielli alla natura inconfondibile del posto.",
      description: "Una serie di video promozionali realizzati per il brand di gioielli italiano, con l'obbiettivo di associare il brand alla piccola e favolosa Isola di Cavallo. Riprese effettuate nell'acqua, sulla sabbia e sulle rocce. Sole splendente e spiagge scelte accuratamente per rappresentare al meglio lo stile del brand.",
      results: 'Oltre i 10 video prodotti di altissima qualità visiva e strutturale.',
      objectiveMedia: ['Vennari1.jpg'],
      descriptionMedia: ['VennariVideo2_v'],
      resultMedia: ['Vennari2.jpg'],
      galleryImages: ['Vennari3.jpg', 'Vennari4.jpg', 'Vennari5.jpg', 'Vennari6.jpg'],
      tags: ['branding', 'luxury', 'gioielli', 'madeinitaly'],
      featured: true,
      macroAreaId: commercialArea!.id,
    },
    // 4. LA STORIA DI BETTA (Entertainment, Featured)
    {
      title: 'LA STORIA DI BETTA',
      slug: 'Betta',
      client: 'Loris',
      year: 2024,
      thumbnail: '/projects/Betta6.jpg',
      localVideo: '/videos/BettaVideo1.mp4',
      objective: 'Il progetto aveva un obbiettivo molto preciso, raccontare la storia di betta ed entrare nei cuori. Ragazze e ragazzi adoloscenti sin da subito era il target principale, considerando che la canzone parla di una ragazzina di 14 anni.',
      description: 'Ho ricevuto una lettera che mi ha spezzato il cuore, una ragazza di nome Elisabetta mi ha raccontato la sua storia difficile e mi ha pregato di mandarle un saluto, ma io invece di un saluto le ho scritto una canzone, chissà come reagirà quando lo scoprirà!',
      results: 'La storia ha raggiunto cuori, e tanti... Oltre 1.8 milioni di visualizzazioni su YouTube, e diversi milioni sui social con i contenuti verticali. Pubblico commosso e il brand di Loris ancora più consolidato.',
      viewsAfter: 1800000,
      objectiveMedia: ['Betta1'],
      descriptionMedia: ['Betta3'],
      resultMedia: ['Betta2'],
      galleryImages: ['Betta4'],
      tags: ['music', 'entertainment', 'loris', 'lastoriadibetta'],
      featured: true,
      macroAreaId: entertainmentArea!.id,
    },
    // 5. Brand di MNL Auto (Commercial, Featured)
    {
      title: 'Brand di MNL Auto',
      slug: 'MNL-Auto',
      client: 'MNL Auto',
      year: 2025,
      tagline: 'Se non ti batte il cuore, non è la tua.',
      thumbnail: '/projects/MNL1.jpg',
      localVideo: '/videos/MNLVideo1.mp4',
      objective: "Quando è nata la collaborazione tra Drugofiles e MNL l'obbiettivo del progetto non erano semplicemente numeri, ma consolidamento del nome e del brand. Ovviamente il modo migliore per sviluppare il nome riconoscibile in tutto il paese era quello di conquistare i social con i video verticali autentici e virali.",
      description: 'Semplici video con script non sono mai stati autentici quanto la voce delle persone che rappresentano il brand. MNL auto ha sempre avuto la fiducia e il rispetto dei propri clienti, bastava solo ampliare il pubblico e la clientela con il branding accurato e le views organiche.',
      results: "Decine migliaia di nuovi iscritti, milioni di visualizzazioni, nuovi clienti, ma sopratutto il brand di MNL è ormai conosciuto in ogni angolo del paese italiano.",
      viewsAfter: 10000000,
      subsBefore: 9000,
      subsAfter: 35000,
      objectiveMedia: ['MNLVideo2-v'],
      descriptionMedia: ['MNLVideo3-v'],
      resultMedia: ['MNLVideo4-v'],
      mockupVideos: ['MNL1-v.png', 'MNL2-v.png', 'MNL3-v.png', 'MNL4-v.png'],
      tags: ['Branding', 'Cars', 'MNL'],
      featured: true,
      macroAreaId: commercialArea!.id,
    },
    // 6. Coffee Machine (Commercial)
    {
      title: 'Coffee Machine',
      slug: 'VBM-Domobar',
      client: 'VBM',
      year: 2023,
      tagline: 'Un espresso di qualità anche a casa.',
      thumbnail: '/projects/VBM1.jpg',
      localVideo: '/videos/VBMVideo1.mp4',
      objective: "L'obbietivo era semplice, ma allo stesso tempo complesso: l'eleganza.",
      description: "Uno dei modi migliori per presentare il made in Italy, è quello di farlo in modo pulito ed elegante. Studio, la luce curata nei minimi dettagli, movimenti fluidi della camera e color grading luxury sono tutti elementi essenziali utilizzati nella mini presentazione visiva della macchina da caffè della linea Domobar.",
      results: 'Il risultato del progetto è stato un video elegante, utilizzabile sia sul sito che sui social, che sulle grafiche.',
      objectiveMedia: ['VBM2'],
      descriptionMedia: ['VBM1'],
      tags: ['Commercial', 'CoffeMachine', 'Studio'],
      featured: false,
      macroAreaId: commercialArea!.id,
    },
    // 7. Matrimonio di Fabrice & Silvia (Premium, Featured)
    {
      title: 'Matrimonio di Fabrice & Silvia',
      slug: 'Fabrice-Silvia',
      client: 'Fabrice & Silvia',
      year: 2025,
      tagline: 'Pensato per durare nel tempo',
      thumbnail: '/projects/MatrimonioFabrice1.jpg',
      localVideo: '/videos/MatrimonioFabriceVideo1.mp4',
      objective: "L'obbiettivo di un video matrimoniale non è solo documentare, ma di emozionare e durare nel tempo.",
      description: 'Immagini che raccontano il matrimonio di Fabrice & Silvia, una giornata intensa e autentica trasformata in un film emozionante, pensato per durare nel tempo.',
      results: 'Siamo stati felici di poter consegnare alla coppia un pacchetto di video commuovente, curato nella qualità e nei dettagli.',
      objectiveMedia: ['MatrimonioFabrice2'],
      descriptionMedia: ['MatrimonioFabrice3'],
      resultMedia: ['MatrimonioFabrice4'],
      tags: ['Matrimonio', 'video'],
      featured: true,
      macroAreaId: premiumArea!.id,
    },
    // 8. Sono Wisee (Entertainment)
    {
      title: 'Sono Wisee',
      slug: 'Wisee',
      client: 'Wisee',
      year: 2026,
      tagline: 'Yo ma chi sei? Sono Wisee bro!',
      thumbnail: '/projects/Wisee1.jpg',
      mockupVideos: ['WiseeVideo1_V'],
      objective: "L'obbiettivo principale del progetto musicale, non era solo la musica, ma l'aumento del pubblico. Video verticali, strutturati appositamente per colpire il pubblico target e andare virali.",
      description: 'Giovane rapper di Spilimbergo conquista il friuli con una serie di video virali. Il progetto strutturato in modo semplice ed efficiente.',
      results: "Milioni di views e decine di migliaia di followers, senza neanche un euro speso in promozione. Tutto questo già nei primi 2 mesi dall'inizio del progetto.",
      viewsBefore: 5000,
      viewsAfter: 5000000,
      subsBefore: 1000,
      subsAfter: 20000,
      objectiveMedia: ['WiseeVideo1_V'],
      descriptionMedia: ['WiseeVideo2_V'],
      resultMedia: ['WiseeVideo3_V'],
      tags: ['Music', 'Brand', 'Wisee'],
      featured: false,
      macroAreaId: entertainmentArea!.id,
    },
    // 9. Io Sono Robot (Entertainment)
    {
      title: 'Io Sono Robot',
      slug: 'Robot',
      client: 'Loris',
      year: 2024,
      thumbnail: '/projects/Robot1.jpg',
      localVideo: '/videos/RobotVideo1.mp4',
      objective: 'Per creare un video musicale di successo, bisogna fare molta attenzione alla sintonia tra la canzone e la parte visiva. In questo caso la canzone parla di un Robot freddo e gelido.',
      description: "Questa canzone è ambientata nel 2074, in un futuro nel quale i Robot e l'IA ci avranno conquistato e sottomesso. L'essere umano perderà completamente i suoi valori, la sua libertà, il proprio io e la sua anima. Il ritornello rappresenta la lotta interiore per tornare a impadronirci della nostra essenza, ed è un appello a pensare con la propria testa e lottare col proprio cuore, anche se gelido, prima che sia troppo tardi.",
      results: 'Un milione di visualizzazioni e un video che attira gli sguardi.',
      viewsAfter: 1000000,
      objectiveMedia: ['Robot2'],
      descriptionMedia: ['RobotVideo2'],
      resultMedia: ['Robot3'],
      tags: ['Music', 'VideoMusicale', 'Cinematografico'],
      featured: false,
      macroAreaId: entertainmentArea!.id,
    },
    // 10. Battesimo di Nicholas (Premium)
    {
      title: 'Battesimo di Nicholas',
      slug: 'Nicholas',
      client: 'Genitori di Nicholas',
      year: 2025,
      thumbnail: '/projects/BattesimoNicholas1.jpg',
      localVideo: '/videos/BattesimoNicholasVideo1.mp4',
      description: 'Un pacchetto di video emozionante prodotto per ricordare la giornata speciale di Nicholas e la sua famiglia.',
      descriptionMedia: ['BattesimoNicholas3'],
      tags: ['battesimo', 'cinematic', 'film'],
      featured: false,
      macroAreaId: premiumArea!.id,
    },
    // 11. 24 ORE (Commercial)
    {
      title: '24 ORE',
      slug: '24h',
      client: 'Ion',
      year: 2026,
      tagline: '24 ore di corsa NON STOP!',
      thumbnail: '/projects/24H1.png',
      localVideo: '/videos/24HVideo1.mp4',
      description: 'In questo film documentiamo la grande sfida intrapresa dal giovane Ion. Un obbiettivo che sembra impossibile da raggiungere senza anni di allenamento. 24 ore di corsa consecutiva nella città di Jesolo.',
      tags: ['Sfida', 'YouTube', '24ore'],
      featured: false,
      macroAreaId: commercialArea!.id,
    },
    // 12. Scuola di danza (Commercial)
    {
      title: 'Scuola di danza',
      slug: 'SeTuMismo',
      client: 'Se Tu Mismo',
      year: 2025,
      thumbnail: '/projects/SeTuMismo1.jpg',
      objective: "L'obbiettivo era trasmettere l'amore per la danza ad un pubblico più ampio sfruttando video cinematografici e commuoventi.",
      description: 'La scuola di danza Se Tu Mismo situata a Chions, gestita da Silvia e Leidel ha sfruttato il mondo dei social per raggiungere un pubblico più ampio di ballerini.',
      results: 'Video di danza, masterclass ed eventi hanno aiutato Se Tu Mismo a crescere e a conquistare i cuori degli amanti della danza.',
      viewsBefore: 2000,
      viewsAfter: 300000,
      objectiveMedia: ['SeTuMismoVideo2-v'],
      descriptionMedia: ['SeTuMismoVideo3-v'],
      resultMedia: ['SeTuMismo2-v'],
      mockupVideos: ['SeTuMismoVideo1-v'],
      tags: ['Danza', 'Scuola', 'Eventi'],
      featured: false,
      macroAreaId: commercialArea!.id,
    },
    // 13. That's Amore (Commercial, Featured)
    {
      title: "That's Amore",
      slug: 'ThatsAmore',
      client: "That's Amore",
      year: 2025,
      tagline: 'Cultura afro in Italia',
      thumbnail: '/projects/ThatsAmore5.jpg',
      objective: "L'obbiettivo della collaborazione di That's Amore e Drugofiles era quello di usare il contenuto media per diffondere la nuova realtà afro.",
      description: "That's Amore, come suggerisce il nome, nasce dall'amore autentico di due giovani ragazzi per le culture africane e dal dialogo continuo con la comunità afro, di cui fanno parte e con cui si interfacciano.",
      results: "Oltre 40 video prodotti e milioni di views raggiunti. That's amore!",
      viewsAfter: 3000000,
      objectiveMedia: ['ThatsAmoreVideo1_v'],
      descriptionMedia: ['ThatsAmoreVideo2_v'],
      resultMedia: ['ThatsAmore4_v'],
      tags: ['Danza', 'Scuola', 'Eventi'],
      featured: true,
      macroAreaId: commercialArea!.id,
    },
    // 14. Berraquera (Entertainment)
    {
      title: 'Berraquera',
      slug: 'Berraquera',
      client: 'Xabri',
      year: 2025,
      tagline: 'Estate, mare, sole.',
      thumbnail: '/projects/Berraquera2.jpg',
      localVideo: '/videos/BerraqueraVideo1.mp4',
      objective: "L'obbiettivo del progetto con Sabrina era quello di creare un video musicale che rappresenta la canzone. Sole, mare e felicità.",
      description: 'Un gruppo di ragazze, una giornata di sole al mare, musica e danza.',
      results: 'Un video estivo che conquista con il suo ritmo e fa ballare',
      objectiveMedia: ['Berraquera5'],
      descriptionMedia: ['Berraquera3'],
      resultMedia: ['Berraquera1'],
      tags: ['VideoMusicale', 'Artista', 'Estate'],
      featured: false,
      macroAreaId: entertainmentArea!.id,
    },
    // 15. Inarrestabile (Entertainment)
    {
      title: 'Inarrestabile',
      slug: 'Inarrestabile',
      client: 'Loris',
      year: 2025,
      thumbnail: '/projects/Inarrestabile1.jpg',
      localVideo: '/videos/InarrestabileVideo2.mp4',
      description: 'Un video cinematografico, pensato per raccontare una storia tragica, nel modo più artistico possibile. Curato nei minimi dettagli di ripresa, montaggio e color grading.',
      viewsAfter: 150000,
      descriptionMedia: ['Inarrestabile5'],
      resultMedia: ['InarrestabileVideo1'],
      tags: ['Videomusicale', 'artista', 'cinematografico'],
      featured: false,
      macroAreaId: entertainmentArea!.id,
    },
  ]

  // Create projects sequentially to maintain order
  for (const projectData of projectsData) {
    await prisma.project.create({
      data: projectData,
    })
    console.log(`Created project: ${projectData.title}`)
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

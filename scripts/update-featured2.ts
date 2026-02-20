import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const p7 = await prisma.project.updateMany({
    where: { slug: 'fabrice-silvia' },
    data: { featured: true }
  })
  console.log('Updated Matrimonio Fabrice:', p7.count)

  const p13 = await prisma.project.updateMany({
    where: { slug: 'thatsamore' },
    data: { featured: true }
  })
  console.log('Updated Thats Amore:', p13.count)

  const featured = await prisma.project.findMany({
    where: { featured: true },
    select: { title: true, slug: true },
    orderBy: { createdAt: 'asc' }
  })
  console.log('\nAll 6 featured projects:')
  featured.forEach((p, i) => console.log(`${i+1}. ${p.title}`))
}

main().finally(() => prisma.$disconnect())

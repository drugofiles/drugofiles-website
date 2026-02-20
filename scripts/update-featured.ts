import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Update Matrimonio di Fabrice & Silvia (project 7) to featured
  const p7 = await prisma.project.updateMany({
    where: { slug: 'Fabrice-Silvia' },
    data: { featured: true }
  })
  console.log('Updated Matrimonio Fabrice:', p7.count)

  // Update That's Amore (project 13) to featured
  const p13 = await prisma.project.updateMany({
    where: { slug: 'ThatsAmore' },
    data: { featured: true }
  })
  console.log('Updated That\'s Amore:', p13.count)

  // Verify
  const featured = await prisma.project.findMany({
    where: { featured: true },
    select: { title: true, slug: true },
    orderBy: { createdAt: 'asc' }
  })
  console.log('\nAll featured projects:')
  featured.forEach((p, i) => console.log(`${i+1}. ${p.title} (${p.slug})`))
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())

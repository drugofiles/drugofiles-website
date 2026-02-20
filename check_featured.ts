import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const featured = await prisma.project.findMany({
    where: { featured: true },
    select: { id: true, title: true, client: true, featured: true }
  })
  console.log('PROGETTI FEATURED (homepage):')
  console.log(featured)
  
  console.log('\n\nTUTTI I PROGETTI:')
  const all = await prisma.project.findMany({
    select: { id: true, title: true, client: true, featured: true },
    orderBy: { createdAt: 'asc' }
  })
  console.log(all)
}

main().finally(() => prisma.$disconnect())

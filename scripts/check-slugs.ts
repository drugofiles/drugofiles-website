import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const projects = await prisma.project.findMany({
    select: { title: true, slug: true, featured: true },
    orderBy: { createdAt: 'asc' }
  })
  projects.forEach((p, i) => console.log(`${i+1}. ${p.title} | slug: ${p.slug} | featured: ${p.featured}`))
}

main().finally(() => prisma.$disconnect())

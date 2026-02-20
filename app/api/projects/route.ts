import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const macroArea = searchParams.get('macroArea')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    const where: any = {}
    if (macroArea) {
      where.macroArea = { slug: macroArea }
    }
    if (featured === 'true') {
      where.featured = true
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        macroArea: true,
      },
      orderBy: {
        createdAt: 'asc', // Keep original insertion order from CSV
      },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

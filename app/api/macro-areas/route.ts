import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const macroAreas = await prisma.macroArea.findMany({
      orderBy: {
        order: 'asc',
      },
    })

    return NextResponse.json({ macroAreas })
  } catch (error) {
    console.error('Error fetching macro areas:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

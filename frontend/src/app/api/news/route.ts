import { NextRequest, NextResponse } from 'next/server'
import { ensurePrisma } from '@/lib/prisma'

// GET /api/news - Get all published news (public)
export async function GET(request: NextRequest) {
    try {
        const prisma = ensurePrisma()
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '10')
        const category = searchParams.get('category')

        const where: any = { isPublished: true }
        if (category) {
            where.category = category
        }

        const news = await prisma.news.findMany({
            where,
            orderBy: { publishedAt: 'desc' },
            take: limit,
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                category: true,
                imageUrl: true,
                publishedAt: true,
            }
        })

        return NextResponse.json({ news })
    } catch (error) {
        console.error('Error fetching news:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

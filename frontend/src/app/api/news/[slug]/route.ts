import { NextRequest, NextResponse } from 'next/server'
import { ensurePrisma } from '@/lib/prisma'

// GET /api/news/[slug] - Get single published news article by slug (public)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const prisma = ensurePrisma()
        const { slug } = await params

        const news = await prisma.news.findFirst({
            where: {
                slug,
                isPublished: true
            }
        })

        if (!news) {
            return NextResponse.json({ error: 'News article not found' }, { status: 404 })
        }

        return NextResponse.json({ news })
    } catch (error) {
        console.error('Error fetching news article:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

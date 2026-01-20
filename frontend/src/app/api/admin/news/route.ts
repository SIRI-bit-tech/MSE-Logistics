import { NextRequest, NextResponse } from 'next/server'
import { ensurePrisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/jwt-config'
import { z } from 'zod'

const createNewsSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    excerpt: z.string().min(1, 'Excerpt is required'),
    content: z.string().min(1, 'Content is required'),
    category: z.enum(['TRADE_UPDATE', 'SUSTAINABILITY', 'TECHNOLOGY', 'COMPANY_NEWS', 'INDUSTRY_INSIGHTS']),
    imageUrl: z.string().url().optional(),
    isPublished: z.boolean().default(false),
})

// GET /api/admin/news - Get all news (admin only)
export async function GET(request: NextRequest) {
    try {
        const prisma = ensurePrisma()
        const userId = await getUserFromToken(request)

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check if user has admin role
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        })

        if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
        }

        const news = await prisma.news.findMany({
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json({ news })
    } catch (error) {
        console.error('Error fetching news:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// POST /api/admin/news - Create news (admin only)
export async function POST(request: NextRequest) {
    try {
        const prisma = ensurePrisma()
        const userId = await getUserFromToken(request)

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check if user has admin role
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        })

        if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
        }

        const body = await request.json()
        const validatedData = createNewsSchema.parse(body)

        // Generate slug from title
        const slug = validatedData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

        const news = await prisma.news.create({
            data: {
                ...validatedData,
                slug,
                authorId: userId,
                publishedAt: validatedData.isPublished ? new Date() : null,
            }
        })

        return NextResponse.json({ news }, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                error: 'Validation error',
                details: error.issues
            }, { status: 400 })
        }
        console.error('Error creating news:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

import { NextRequest, NextResponse } from 'next/server'
import { ensurePrisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/jwt-config'
import { z } from 'zod'

const updateNewsSchema = z.object({
    title: z.string().min(1).optional(),
    excerpt: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    category: z.enum(['TRADE_UPDATE', 'SUSTAINABILITY', 'TECHNOLOGY', 'COMPANY_NEWS', 'INDUSTRY_INSIGHTS']).optional(),
    imageUrl: z.string().url().optional(),
    isPublished: z.boolean().optional(),
})

// GET /api/admin/news/[id] - Get single news (admin only)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const prisma = ensurePrisma()
        const { id } = await params
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

        const news = await prisma.news.findUnique({
            where: { id }
        })

        if (!news) {
            return NextResponse.json({ error: 'News not found' }, { status: 404 })
        }

        return NextResponse.json({ news })
    } catch (error) {
        console.error('Error fetching news:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// PATCH /api/admin/news/[id] - Update news (admin only)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const prisma = ensurePrisma()
        const { id } = await params
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
        const validatedData = updateNewsSchema.parse(body)

        const updateData: any = { ...validatedData }

        // Update slug if title changed
        if (validatedData.title) {
            updateData.slug = validatedData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
        }

        // Set publishedAt if publishing for the first time
        if (validatedData.isPublished !== undefined) {
            const existingNews = await prisma.news.findUnique({ where: { id } })
            if (validatedData.isPublished && !existingNews?.publishedAt) {
                updateData.publishedAt = new Date()
            } else if (!validatedData.isPublished) {
                updateData.publishedAt = null
            }
        }

        const news = await prisma.news.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json({ news })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                error: 'Validation error',
                details: error.issues
            }, { status: 400 })
        }
        console.error('Error updating news:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// DELETE /api/admin/news/[id] - Delete news (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const prisma = ensurePrisma()
        const { id } = await params
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

        await prisma.news.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'News deleted successfully' })
    } catch (error) {
        console.error('Error deleting news:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

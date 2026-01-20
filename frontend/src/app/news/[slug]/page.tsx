"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface NewsArticle {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    imageUrl?: string
    publishedAt: string
}

const getCategoryColor = (category: string) => {
    switch (category) {
        case 'TRADE_UPDATE':
            return 'bg-yellow-500 text-white'
        case 'SUSTAINABILITY':
            return 'bg-green-500 text-white'
        case 'TECHNOLOGY':
            return 'bg-blue-500 text-white'
        case 'COMPANY_NEWS':
            return 'bg-purple-500 text-white'
        case 'INDUSTRY_INSIGHTS':
            return 'bg-orange-500 text-white'
        default:
            return 'bg-gray-500 text-white'
    }
}

const formatCategory = (category: string) => {
    return category.replace(/_/g, ' ')
}

export default function NewsArticlePage() {
    const params = useParams()
    const router = useRouter()
    const slug = params.slug as string
    const [article, setArticle] = useState<NewsArticle | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`/api/news/${slug}`)
                if (response.ok) {
                    const data = await response.json()
                    setArticle(data.news)
                } else {
                    router.push('/404')
                }
            } catch (error) {
                console.error('Error fetching article:', error)
                router.push('/404')
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchArticle()
        }
    }, [slug, router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">Loading article...</div>
            </div>
        )
    }

    if (!article) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <Link href="/">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <Card>
                    {/* Featured Image */}
                    {article.imageUrl && (
                        <div className="relative h-96 w-full overflow-hidden rounded-t-lg">
                            <Image
                                src={article.imageUrl}
                                alt={article.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <CardContent className="p-8">
                        {/* Category and Date */}
                        <div className="flex items-center gap-4 mb-6">
                            <Badge className={getCategoryColor(article.category)}>
                                {formatCategory(article.category)}
                            </Badge>
                            <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">
                            {article.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            {article.excerpt}
                        </p>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none">
                            {article.content.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Back Button */}
                        <div className="mt-12 pt-8 border-t">
                            <Link href="/">
                                <Button variant="outline">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

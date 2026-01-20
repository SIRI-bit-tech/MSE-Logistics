"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
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
        <div className="min-h-screen bg-white">
            {/* Hero Image Section */}
            {article.imageUrl && (
                <div className="relative w-full h-[50vh] min-h-[400px]">
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="max-w-4xl w-full px-4 text-center">
                            <Badge className={`${getCategoryColor(article.category)} mb-6 px-4 py-1 text-sm font-semibold uppercase tracking-wider`}>
                                {formatCategory(article.category)}
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-md leading-tight">
                                {article.title}
                            </h1>
                            <div className="flex items-center justify-center text-white/90 text-base font-medium">
                                <Calendar className="w-5 h-5 mr-3" />
                                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!article.imageUrl && (
                <div className="pt-24 pb-12 bg-[#003873] text-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <Badge className={`${getCategoryColor(article.category)} mb-6`}>
                            {formatCategory(article.category)}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {article.title}
                        </h1>
                    </div>
                </div>
            )}

            {/* Article Content */}
            <div className={`max-w-4xl mx-auto px-4 py-16 ${!article.imageUrl ? 'pt-8' : ''}`}>
                {/* Excerpt */}
                <p className="text-2xl text-gray-700 font-medium mb-12 leading-relaxed border-l-4 border-msc-yellow pl-8 italic">
                    {article.excerpt}
                </p>

                {/* Content Body */}
                <article className="prose prose-xl max-w-none text-gray-800 leading-loose">
                    {article.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-6">
                            {paragraph}
                        </p>
                    ))}
                </article>

                {/* Bottom Navigation */}
                <div className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
                    <Link href="/news">
                        <Button variant="outline" className="gap-2 text-[#003873] border-[#003873] hover:bg-[#003873] hover:text-white transition-all duration-300">
                            <ArrowLeft className="w-4 h-4" />
                            Return to News Hub
                        </Button>
                    </Link>
                    <div className="text-gray-400 text-sm italic">
                        Mediterranean Shipping Express News Hub
                    </div>
                </div>
            </div>
        </div>
    )
}

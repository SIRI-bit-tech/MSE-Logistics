"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronRight, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface NewsArticle {
    id: string
    title: string
    slug: string
    excerpt: string
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

export default function NewsPage() {
    const [news, setNews] = useState<NewsArticle[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news')
                if (response.ok) {
                    const data = await response.json()
                    setNews(data.news || [])
                }
            } catch (error) {
                console.error('Error fetching news:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    const filteredNews = news.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-msc-yellow border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading latest updates...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-[#003873] pt-32 pb-20 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6"
                    >
                        MSE News Hub
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
                    >
                        Stay updated with the latest trends, trade alerts, and company insights from the world of global logistics.
                    </motion.p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-gray-900 border-none shadow-xl focus:ring-2 focus:ring-msc-yellow outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* News Grid */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                {filteredNews.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-xl">No articles found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredNews.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col">
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden bg-gray-100">
                                        {article.imageUrl ? (
                                            <Image
                                                src={article.imageUrl}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#003873] to-[#0066CC]">
                                                <span className="text-white text-4xl font-black opacity-10">MSE</span>
                                            </div>
                                        )}
                                        <Badge className={`absolute top-4 left-4 z-10 ${getCategoryColor(article.category)} border-none shadow-md`}>
                                            {formatCategory(article.category)}
                                        </Badge>
                                    </div>

                                    <CardContent className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center text-gray-400 text-sm mb-4">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0066CC] transition-colors line-clamp-2">
                                            {article.title}
                                        </h2>
                                        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                        <div className="mt-auto">
                                            <Link href={`/news/${article.slug}`}>
                                                <Button
                                                    variant="link"
                                                    className="p-0 text-msc-yellow hover:text-yellow-600 font-bold flex items-center gap-2 group/btn"
                                                >
                                                    READ FULL ARTICLE
                                                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

export default function CustomerAdvisories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const itemsPerView = 3

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news?limit=6')
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

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= news.length - itemsPerView + 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, news.length - itemsPerView) : prev - 1
    )
  }

  const visibleItems = news.slice(currentIndex, currentIndex + itemsPerView)

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading news...</div>
        </div>
      </section>
    )
  }

  if (news.length === 0) {
    return null // Don't show the section if there's no news
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Latest News</h2>
          <Button
            asChild
            variant="link"
            className="text-[#FFD700] hover:text-[#D4AF37] font-semibold"
          >
            <Link href="/news">
              View All News →
            </Link>
          </Button>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex gap-4 overflow-hidden">
            {visibleItems.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-80"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    {article.imageUrl ? (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        width={800}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                        <span className="text-white text-4xl font-bold opacity-20">MSE</span>
                      </div>
                    )}
                    <Badge
                      className={`absolute top-4 left-4 ${getCategoryColor(article.category)}`}
                    >
                      {formatCategory(article.category)}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Button
                      asChild
                      variant="link"
                      className="text-[#FFD700] hover:text-[#D4AF37] p-0 h-auto font-semibold"
                    >
                      <Link href={`/news/${article.slug}`}>
                        READ FULL ARTICLE →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows - Only show if there are enough items */}
          {news.length > itemsPerView && (
            <>
              <Button
                onClick={prevSlide}
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </Button>

              <Button
                onClick={nextSlide}
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

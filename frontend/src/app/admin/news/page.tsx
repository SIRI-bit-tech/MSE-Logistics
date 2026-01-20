"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"
import { Newspaper, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

interface News {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    imageUrl?: string
    isPublished: boolean
    publishedAt?: string
    createdAt: string
}

export default function NewsManagementPage() {
    const { isAuthenticated, isLoading: authLoading } = useAuth()
    const [news, setNews] = useState<News[]>([])
    const [loading, setLoading] = useState(false)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editingNews, setEditingNews] = useState<News | null>(null)

    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "COMPANY_NEWS",
        imageUrl: "",
        isPublished: false,
    })

    const fetchNews = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/admin/news', {
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setNews(data.news || [])
            } else {
                toast.error('Failed to fetch news')
            }
        } catch (error) {
            console.error('Error fetching news:', error)
            toast.error('Error fetching news')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchNews()
        }
    }, [isAuthenticated])

    const handleCreate = async () => {
        try {
            const response = await fetch('/api/admin/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                toast.success('News article created successfully')
                setIsCreateOpen(false)
                setFormData({
                    title: "",
                    excerpt: "",
                    content: "",
                    category: "COMPANY_NEWS",
                    imageUrl: "",
                    isPublished: false,
                })
                fetchNews()
            } else {
                const data = await response.json()
                toast.error(data.error || 'Failed to create news')
            }
        } catch (error) {
            console.error('Error creating news:', error)
            toast.error('Error creating news')
        }
    }

    const handleEdit = async () => {
        if (!editingNews) return

        try {
            const response = await fetch(`/api/admin/news/${editingNews.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                toast.success('News article updated successfully')
                setIsEditOpen(false)
                setEditingNews(null)
                fetchNews()
            } else {
                const data = await response.json()
                toast.error(data.error || 'Failed to update news')
            }
        } catch (error) {
            console.error('Error updating news:', error)
            toast.error('Error updating news')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this news article?')) return

        try {
            const response = await fetch(`/api/admin/news/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (response.ok) {
                toast.success('News article deleted successfully')
                fetchNews()
            } else {
                toast.error('Failed to delete news')
            }
        } catch (error) {
            console.error('Error deleting news:', error)
            toast.error('Error deleting news')
        }
    }

    const openEditDialog = (newsItem: News) => {
        setEditingNews(newsItem)
        setFormData({
            title: newsItem.title,
            excerpt: newsItem.excerpt,
            content: newsItem.content,
            category: newsItem.category,
            imageUrl: newsItem.imageUrl || "",
            isPublished: newsItem.isPublished,
        })
        setIsEditOpen(true)
    }

    const togglePublish = async (newsItem: News) => {
        try {
            const response = await fetch(`/api/admin/news/${newsItem.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ isPublished: !newsItem.isPublished })
            })

            if (response.ok) {
                toast.success(`News ${!newsItem.isPublished ? 'published' : 'unpublished'} successfully`)
                fetchNews()
            } else {
                toast.error('Failed to update news status')
            }
        } catch (error) {
            console.error('Error updating news status:', error)
            toast.error('Error updating news status')
        }
    }

    if (authLoading) {
        return <div className="p-8">Loading...</div>
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-[#003873]">News Management</h1>
                    <p className="text-gray-600 mt-2">Create and manage news articles</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/admin/dashboard">
                        <Button variant="outline">Back to Dashboard</Button>
                    </Link>
                    <Button onClick={() => setIsCreateOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create News
                    </Button>
                </div>
            </div>

            {/* News Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Newspaper className="w-5 h-5" />
                        All News Articles
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8">Loading...</div>
                    ) : news.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No news articles yet. Create your first one!
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Published</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {news.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.title}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {item.category.replace('_', ' ')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {item.isPublished ? (
                                                <Badge className="bg-green-100 text-green-800">Published</Badge>
                                            ) : (
                                                <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.publishedAt
                                                ? new Date(item.publishedAt).toLocaleDateString()
                                                : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => togglePublish(item)}
                                                    title={item.isPublished ? 'Unpublish' : 'Publish'}
                                                >
                                                    {item.isPublished ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => openEditDialog(item)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Create Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Create News Article</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter news title"
                            />
                        </div>
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TRADE_UPDATE">Trade Update</SelectItem>
                                    <SelectItem value="SUSTAINABILITY">Sustainability</SelectItem>
                                    <SelectItem value="TECHNOLOGY">Technology</SelectItem>
                                    <SelectItem value="COMPANY_NEWS">Company News</SelectItem>
                                    <SelectItem value="INDUSTRY_INSIGHTS">Industry Insights</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="imageUrl">Image URL (optional)</Label>
                            <Input
                                id="imageUrl"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div>
                            <Label htmlFor="excerpt">Excerpt</Label>
                            <Textarea
                                id="excerpt"
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                placeholder="Brief summary of the article"
                                rows={3}
                            />
                        </div>
                        <div>
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Full article content"
                                rows={10}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isPublished"
                                checked={formData.isPublished}
                                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <Label htmlFor="isPublished">Publish immediately</Label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreate}>Create Article</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit News Article</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                                id="edit-title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter news title"
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TRADE_UPDATE">Trade Update</SelectItem>
                                    <SelectItem value="SUSTAINABILITY">Sustainability</SelectItem>
                                    <SelectItem value="TECHNOLOGY">Technology</SelectItem>
                                    <SelectItem value="COMPANY_NEWS">Company News</SelectItem>
                                    <SelectItem value="INDUSTRY_INSIGHTS">Industry Insights</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="edit-imageUrl">Image URL (optional)</Label>
                            <Input
                                id="edit-imageUrl"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-excerpt">Excerpt</Label>
                            <Textarea
                                id="edit-excerpt"
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                placeholder="Brief summary of the article"
                                rows={3}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-content">Content</Label>
                            <Textarea
                                id="edit-content"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Full article content"
                                rows={10}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="edit-isPublished"
                                checked={formData.isPublished}
                                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <Label htmlFor="edit-isPublished">Published</Label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleEdit}>Update Article</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

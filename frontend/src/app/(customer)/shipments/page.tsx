"use client"

import { Button } from "@/components/ui/button"
import { Package, CheckCircle, Truck, Archive, FileText, Plus } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/dashboard/sidebar"
import MobileHeader from "@/components/dashboard/mobile-header"
import StatsCard from "@/components/dashboard/stats-card"
import RecentShipmentsTable from "@/components/dashboard/recent-shipments-table"
import QuickSupport from "@/components/dashboard/quick-support"

interface DashboardStats {
  activeShipments: number
  delivered: number
  inTransit: number
  totalPackages: number
  changes: {
    activeShipments: number
    delivered: number
    inTransit: number
    totalPackages: number
  }
}

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    activeShipments: 0,
    delivered: 0,
    inTransit: 0,
    totalPackages: 0,
    changes: {
      activeShipments: 0,
      delivered: 0,
      inTransit: 0,
      totalPackages: 0
    }
  })
  const [loading, setLoading] = useState(true)

  const welcomeName = user?.firstName || 'User'

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return
      
      try {
        const response = await fetch('/api/shipments/stats', {
          credentials: 'include',
        })
        
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user?.id])

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNewShipment = () => {
    router.push('/shipments/new')
  }

  const handleReports = () => {
    router.push('/reports')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar}
      />
      
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <MobileHeader 
          onMenuToggle={toggleSidebar}
          title="Dashboard"
        />
        
        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-4">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 truncate">
                Welcome back, {welcomeName}!
              </h1>
              <p className="text-sm sm:text-base text-gray-600">Here's what's happening with your shipments today.</p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 text-sm sm:text-base"
                onClick={handleReports}
                size="sm"
              >
                <FileText className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Reports</span>
                <span className="sm:hidden">Reports</span>
              </Button>
              <Button 
                className="bg-[#FFD700] text-black hover:bg-[#D4AF37] text-sm sm:text-base"
                onClick={handleNewShipment}
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">New Shipment</span>
                <span className="sm:hidden">New</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <StatsCard
              title="Active Shipments"
              value={loading ? "..." : stats.activeShipments}
              icon={Package}
              change={loading ? "..." : `${stats.changes.activeShipments > 0 ? '+' : ''}${stats.changes.activeShipments}%`}
              changeType={stats.changes.activeShipments >= 0 ? "positive" : "negative"}
            />
            <StatsCard
              title="Delivered"
              value={loading ? "..." : stats.delivered}
              icon={CheckCircle}
              change={loading ? "..." : `${stats.changes.delivered > 0 ? '+' : ''}${stats.changes.delivered}%`}
              changeType={stats.changes.delivered >= 0 ? "positive" : "negative"}
            />
            <StatsCard
              title="In Transit"
              value={loading ? "..." : stats.inTransit}
              icon={Truck}
              change={loading ? "..." : `${stats.changes.inTransit > 0 ? '+' : ''}${stats.changes.inTransit}%`}
              changeType={stats.changes.inTransit >= 0 ? "positive" : "negative"}
            />
            <StatsCard
              title="Total Packages"
              value={loading ? "..." : stats.totalPackages}
              icon={Archive}
              change={loading ? "..." : `${stats.changes.totalPackages > 0 ? '+' : ''}${stats.changes.totalPackages}%`}
              changeType={stats.changes.totalPackages >= 0 ? "positive" : "negative"}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Recent Shipments - Takes up 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <RecentShipmentsTable />
            </div>

            {/* Quick Support - Takes up 1 column */}
            <div>
              <QuickSupport />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

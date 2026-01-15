"use client"

import { Button } from "@/components/ui/button"
import { Package, CheckCircle, Truck, Archive, FileText, Plus } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/dashboard/sidebar"
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

  const handleNewShipment = () => {
    router.push('/shipments/new')
  }

  const handleReports = () => {
    router.push('/reports')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        {/* Main Content */}
        <div className="p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {welcomeName}!
              </h1>
              <p className="text-gray-600">Here's what's happening with your shipments today.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700"
                onClick={handleReports}
              >
                <FileText className="w-4 h-4 mr-2" />
                Reports
              </Button>
              <Button 
                className="bg-[#FFD700] text-black hover:bg-[#D4AF37]"
                onClick={handleNewShipment}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Shipment
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Shipments - Takes up 2 columns */}
            <div className="lg:col-span-2">
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

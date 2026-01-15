"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Download, FileText } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState("monthly")

  const reports = [
    { name: "January 2024", date: "2024-01-31", shipments: 3450, revenue: "$127,500" },
    { name: "December 2023", date: "2023-12-31", shipments: 3200, revenue: "$118,400" },
    { name: "November 2023", date: "2023-11-30", shipments: 2890, revenue: "$106,520" },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Reports</h1>
          <p className="text-foreground-600">Generate and download business reports</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="space-y-2 max-w-xs flex-1">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="reportType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Report</SelectItem>
                    <SelectItem value="quarterly">Quarterly Report</SelectItem>
                    <SelectItem value="annual">Annual Report</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-[#0066CC] hover:bg-[#0052A3]">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </Card>
        </motion.div>

        <Tabs defaultValue="recent" className="mb-8">
          <TabsList>
            <TabsTrigger value="recent">Recent Reports</TabsTrigger>
            <TabsTrigger value="archived">Archived Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 mt-6">
              {reports.map((report, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <FileText className="w-8 h-8 text-[#0066CC] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-foreground">{report.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{report.date}</p>
                        <div className="flex gap-6 mt-2">
                          <span className="text-sm text-muted-foreground">{report.shipments} shipments</span>
                          <span className="text-sm font-semibold text-[#0066CC]">{report.revenue} revenue</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="archived" className="w-full">
            <div className="mt-6 text-center p-8 text-muted-foreground">No archived reports yet</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

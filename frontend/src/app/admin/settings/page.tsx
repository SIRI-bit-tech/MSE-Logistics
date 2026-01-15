"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { useState } from "react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "Mediterranean Shipping Express",
    supportEmail: "support@mse.com",
    defaultCurrency: "USD",
    maintenanceMode: false,
    enableRegistration: true,
    requireEmailVerification: true,
  })

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          Platform Settings
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-6 text-foreground">General Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select
                  value={settings.defaultCurrency}
                  onValueChange={(value) => setSettings({ ...settings, defaultCurrency: value })}
                >
                  <SelectTrigger id="currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Separator />

          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-6 text-foreground">Security & Features</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <p className="font-semibold text-foreground">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">Put platform in maintenance mode</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>

              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <p className="font-semibold text-foreground">Enable Registration</p>
                  <p className="text-sm text-muted-foreground">Allow new users to sign up</p>
                </div>
                <Switch
                  checked={settings.enableRegistration}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableRegistration: checked })}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-foreground">Require Email Verification</p>
                  <p className="text-sm text-muted-foreground">New users must verify email</p>
                </div>
                <Switch
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline">Reset to Defaults</Button>
            <Button className="bg-[#0066CC] hover:bg-[#0052A3]">
              Save Settings
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

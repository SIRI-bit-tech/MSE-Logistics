"use client"

import { Button, Card, Input, Select, SelectItem, Switch, Divider } from "@nextui-org/react"
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
              <Input
                label="Company Name"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
              <Input
                label="Support Email"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              />
              <Select
                label="Default Currency"
                selectedKeys={[settings.defaultCurrency]}
                onChange={(e) => setSettings({ ...settings, defaultCurrency: e.target.value })}
              >
                <SelectItem key="USD" value="USD">
                  USD
                </SelectItem>
                <SelectItem key="EUR" value="EUR">
                  EUR
                </SelectItem>
                <SelectItem key="GBP" value="GBP">
                  GBP
                </SelectItem>
              </Select>
            </div>
          </Card>

          <Divider />

          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-6 text-foreground">Security & Features</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-divider">
                <div>
                  <p className="font-semibold text-foreground">Maintenance Mode</p>
                  <p className="text-sm text-foreground-600">Put platform in maintenance mode</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                />
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-divider">
                <div>
                  <p className="font-semibold text-foreground">Enable Registration</p>
                  <p className="text-sm text-foreground-600">Allow new users to sign up</p>
                </div>
                <Switch
                  checked={settings.enableRegistration}
                  onChange={(e) => setSettings({ ...settings, enableRegistration: e.target.checked })}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-foreground">Require Email Verification</p>
                  <p className="text-sm text-foreground-600">New users must verify email</p>
                </div>
                <Switch
                  checked={settings.requireEmailVerification}
                  onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button variant="bordered">Reset to Defaults</Button>
            <Button color="primary" className="bg-[#0066CC]">
              Save Settings
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

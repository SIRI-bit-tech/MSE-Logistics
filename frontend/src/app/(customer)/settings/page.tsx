"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: false,
    twoFactor: true,
    publicProfile: false,
    marketingEmails: true,
  })

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          Account Settings
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 text-foreground">Security</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-divider">
                <div>
                  <p className="font-semibold text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-foreground-600">Add an extra layer of security</p>
                </div>
                <Switch
                  checked={settings.twoFactor}
                  onCheckedChange={(checked) => setSettings({ ...settings, twoFactor: checked })}
                />
              </div>
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </Card>

          <Separator />

          <Card className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 text-foreground">Privacy</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-divider">
                <div>
                  <p className="font-semibold text-foreground">Public Profile</p>
                  <p className="text-sm text-foreground-600">Make your profile visible to others</p>
                </div>
                <Switch
                  checked={settings.publicProfile}
                  onCheckedChange={(checked) => setSettings({ ...settings, publicProfile: checked })}
                />
              </div>
            </div>
          </Card>

          <Separator />

          <Card className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 text-foreground">Preferences</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-divider">
                <div>
                  <p className="font-semibold text-foreground">Marketing Emails</p>
                  <p className="text-sm text-foreground-600">Receive updates and offers</p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => setSettings({ ...settings, marketingEmails: checked })}
                />
              </div>
            </div>
          </Card>

          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

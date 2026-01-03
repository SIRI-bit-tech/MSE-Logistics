"use client"

import type React from "react"

import { NextUIProvider } from "@nextui-org/react"
import { Toaster } from "react-hot-toast"
import Auth0Provider from "./auth0-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider>
      <NextUIProvider>
        {children}
        <Toaster position="top-right" />
      </NextUIProvider>
    </Auth0Provider>
  )
}

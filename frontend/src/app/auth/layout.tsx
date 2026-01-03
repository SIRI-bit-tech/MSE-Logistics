import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - Mediterranean Shipping Express",
  description: "Login or create an account to access Mediterranean Shipping Express services",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
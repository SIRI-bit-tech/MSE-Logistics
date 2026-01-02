import { Suspense } from "react"
import { ResetPasswordForm } from "./reset-password-form"

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 px-4">
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}

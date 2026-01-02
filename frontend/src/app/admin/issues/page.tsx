import { Suspense } from "react"
import IssuesContent from "./issues-content"

export default function AdminIssuesPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <IssuesContent />
        </Suspense>
      </div>
    </div>
  )
}

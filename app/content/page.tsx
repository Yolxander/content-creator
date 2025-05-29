"use client"

import { useSearchParams } from "next/navigation"
import SidebarNav from "@/components/ui/SidebarNav"
import MainDashboardContent from "@/components/ui/MainDashboardContent"

export default function ContentPage() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "articles"
  return (
    <div className="flex h-screen bg-[#f6f3ef]">
      <SidebarNav />
      <MainDashboardContent contentType={type} />
    </div>
  )
} 
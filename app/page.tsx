"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Search, Plus, Upload, MoreHorizontal, Edit, Trash2, Grid3X3, List, ChevronDown, Filter, PanelLeft, Users, LayoutList, BookOpen, Timer, Library, Trophy, Palette, Clapperboard, BarChart3, Settings, Bell, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import SidebarNav from "@/components/ui/SidebarNav"
import MainDashboardContent from "@/components/ui/MainDashboardContent"

const courses = [
  {
    id: 1,
    title: "Management 101",
    status: "Draft",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "07/03/2025",
    version: "Version 1",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Leading with Impact: Strategies for Effective Leadership",
    status: "Published",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "21/05/2025",
    version: "Version 2",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Unleashing Creativity: Innovative Thinking for the Modern Workplace",
    status: "Published",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "17/03/2025",
    version: "Version 4",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "Code Mastery: From Basics to Advanced Programming Techniques",
    status: "In Review",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "24/05/2025",
    version: "Version 1",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    title: "Team Dynamics: Building Cohesion and Collaboration",
    status: "Published",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "24/07/2024",
    version: "Version 3",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    title: "Agile Mindset: Navigating Change in a Fast-Paced World",
    status: "In Review",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "19/05/2025",
    version: "Version 1",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    title: "Data-Driven Decisions: Harnessing Analytics for Business Success",
    status: "Published",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "30/04/2025",
    version: "Version 1",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    title: "Emotional Intelligence: The Key to Personal and Professional Growth",
    status: "Published",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "12/07/2023",
    version: "Version 1",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Draft":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    case "In Review":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export default function Page() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth")
    }
  }, [user, loading, router])

  const [selectedCourses, setSelectedCourses] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [contentType, setContentType] = useState("articles")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCourses(courses.map((course) => course.id))
    } else {
      setSelectedCourses([])
    }
  }

  const handleSelectCourse = (courseId: number, checked: boolean) => {
    if (checked) {
      setSelectedCourses([...selectedCourses, courseId])
    } else {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId))
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarNav onContentTypeChange={setContentType} />
      {/* Main Content */}
      <MainDashboardContent contentType={contentType} />
    </div>
  )
}

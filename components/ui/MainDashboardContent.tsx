"use client"

import { useState, useEffect } from "react"
import { BookOpen, ChevronRight, Upload, Plus, Search, Filter, Grid3X3, List, Edit, MoreHorizontal, Trash2, ChevronDown, FileText, Headphones, Layers, Rss } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

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

export default function MainDashboardContent({ contentType = "articles" }) {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  // Example audio data
  const audioData = [
    {
      id: 1,
      title: "Intro to Podcasting",
      status: "Published",
      language: "🇫🇷🇬🇧",
      lastEdit: "2 days ago",
      duration: "12:34",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Music Theory Basics",
      status: "Draft",
      language: "🇫🇷🇬🇧",
      lastEdit: "5 days ago",
      duration: "08:21",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Example modules data
  const modulesData = [
    {
      id: 1,
      title: "React Basics Module",
      status: "Published",
      language: "🇫🇷🇬🇧",
      lastEdit: "1 day ago",
      lessons: 8,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Advanced CSS Module",
      status: "Draft",
      language: "🇫🇷🇬🇧",
      lastEdit: "4 days ago",
      lessons: 5,
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Example feeds data
  const feedsData = [
    {
      id: 1,
      title: "Tech News Feed",
      status: "Published",
      language: "🇫🇷🇬🇧",
      lastEdit: "6 hours ago",
      source: "RSS",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Design Weekly",
      status: "Draft",
      language: "🇫🇷🇬🇧",
      lastEdit: "2 days ago",
      source: "Atom",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const isFeeds = contentType === "feeds"
  const isModules = contentType === "modules"
  const isAudio = contentType === "audio"
  const data = isFeeds ? feedsData : isModules ? modulesData : isAudio ? audioData : courses

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCourses(data.map((item) => item.id))
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
    <div className="flex-1 flex flex-col bg-[#f6f3ef] p-4 pt-0 h-screen">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-base text-[#05AFF2] mb-2">
          <span>Content</span>
          <ChevronRight className="w-4 h-4 mx-1 text-[#05AFF2]" />
          {isFeeds ? (
            <Rss className="w-5 h-5 text-[#05AFF2]" />
          ) : isModules ? (
            <Layers className="w-5 h-5 text-[#05AFF2]" />
          ) : isAudio ? (
            <Headphones className="w-5 h-5 text-[#05AFF2]" />
          ) : (
            <FileText className="w-5 h-5 text-[#05AFF2]" />
          )}
          <span className="text-[#05AFF2] font-bold ml-1">{isFeeds ? "Feeds" : isModules ? "Modules" : isAudio ? "Audio" : "Articles"}</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-[#05AFF2] tracking-tight">{isFeeds ? "Feeds" : isModules ? "Modules" : isAudio ? "Audio" : "Articles"}</h1>
          <div className="flex gap-3">
            <Button className="bg-white text-[#05AFF2] rounded-full px-6 py-3 flex gap-2 shadow-md border border-[#05AFF2] hover:bg-[#e6f8fd] font-semibold">
              <Upload className="w-5 h-5" />
              Import
            </Button>
            <Button className="bg-[#05AFF2] text-white rounded-full px-6 py-3 flex gap-2 shadow-md hover:bg-[#059fd2] font-semibold">
              <Plus className="w-5 h-5 text-white" />
              Create
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-3 mt-4 mb-4 bg-white rounded-3xl px-6 py-4 ">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#05AFF2] w-6 h-6" />
          <Input placeholder="Search..." className="pl-16 h-14 rounded-full border-none bg-white text-base focus:ring-2 focus:ring-[#F2C438]" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40 h-14 rounded-full border-none bg-white text-base focus:ring-2 focus:ring-[#F2C438]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="review">In Review</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40 h-14 rounded-full border-none bg-white text-base focus:ring-2 focus:ring-[#F2C438]">
            <SelectValue placeholder="Languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Languages</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-white text-[#05AFF2] rounded-full h-14 px-6 flex gap-2 border border-[#05AFF2] font-semibold focus:ring-2 focus:ring-[#F2C438]">
          <Filter className="w-6 h-6" />
          Filters
          <ChevronDown className="w-5 h-5" />
        </Button>
        <div className="flex border border-[#05AFF2] rounded-full overflow-hidden ml-2 bg-white ">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className={`rounded-none ${viewMode === "grid" ? "bg-[#e6f8fd] text-[#05AFF2]" : "bg-white text-[#05AFF2]"}`}
          >
            <Grid3X3 className="w-6 h-6" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className={`rounded-none ${viewMode === "list" ? "bg-[#e6f8fd] text-[#05AFF2]" : "bg-white text-[#05AFF2]"}`}
          >
            <List className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-md border border-[#e7e3de] overflow-hidden min-h-[500px]">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-0 py-5 px-8 bg-[#f6f3ef] text-sm text-[#05AFF2] items-center">
          <div className="col-span-1 flex items-center px-4">
            <Checkbox checked={selectedCourses.length === data.length} onCheckedChange={handleSelectAll} className="accent-[#05AFF2] scale-110" />
          </div>
          <div className="col-span-4 flex items-center gap-2 px-4">
            {isFeeds ? <Rss className="w-6 h-6 text-[#05AFF2]" /> : isModules ? <Layers className="w-6 h-6 text-[#05AFF2]" /> : isAudio ? <Headphones className="w-6 h-6 text-[#05AFF2]" /> : <FileText className="w-6 h-6 text-[#05AFF2]" />}
            <span>Title</span>
          </div>
          <div className="col-span-1 px-4">Status</div>
          <div className="col-span-1 px-4">Language</div>
          <div className="col-span-2 text-right px-4">Last edit</div>
          {isFeeds ? (
            <div className="col-span-2 text-right px-4">Source</div>
          ) : isModules ? (
            <div className="col-span-2 text-right px-4">Lessons</div>
          ) : isAudio ? (
            <div className="col-span-2 text-right px-4">Duration</div>
          ) : (
            <div className="col-span-2 text-right px-4">Version</div>
          )}
          <div className="col-span-1 px-4 text-right">Actions</div>
        </div>
        {/* Table Rows */}
        {data.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12 gap-0 px-2 py-6 items-center border-t border-[#f6f3ef] hover:bg-[#f6f3ef] group text-sm">
            <div className="col-span-1 flex items-center px-4">
              <Checkbox
                checked={selectedCourses.includes(item.id)}
                onCheckedChange={(checked) => handleSelectCourse(item.id, checked as boolean)}
                className="accent-[#05AFF2] scale-110"
              />
            </div>
            <div className="col-span-4 flex items-center gap-3 min-w-0 px-4">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-14 h-14 rounded-2xl object-cover border border-[#e7e3de] shadow-sm"
              />
              <span className="truncate text-base text-[#181A20]">{item.title}</span>
            </div>
            <div className="col-span-1 px-4">
              <Badge variant="secondary" className={getStatusColor(item.status) + " px-4 py-2 rounded-full text-xs"}>
                {item.status}
              </Badge>
            </div>
            <div className="col-span-1 flex items-center gap-1 px-4">
              <span className="text-base">🇫🇷</span>
              <span className="text-base">🇬🇧</span>
              <span className="ml-1 text-[10px] bg-[#f6f3ef] text-[#05AFF2] rounded-full px-2 py-0.5">+3</span>
            </div>
            <div className="col-span-2 text-right text-xs text-[#b6b0a6] px-4 whitespace-nowrap">{item.lastEdit}</div>
            {isFeeds ? (
              <div className="col-span-2 text-right text-xs text-[#181A20] px-4 whitespace-nowrap">{'source' in item ? item.source : ''}</div>
            ) : isModules ? (
              <div className="col-span-2 text-right text-xs text-[#181A20] px-4 whitespace-nowrap">{'lessons' in item ? item.lessons : ''}</div>
            ) : isAudio ? (
              <div className="col-span-2 text-right text-xs text-[#181A20] px-4 whitespace-nowrap">{'duration' in item ? item.duration : ''}</div>
            ) : (
              <div className="col-span-2 text-right text-xs text-[#181A20] px-4 whitespace-nowrap">{'version' in item ? (<span>Version</span>) : ''} {'version' in item ? item.version.replace('Version ', '') : ''}</div>
            )}
            <div className="col-span-1 flex items-center justify-end gap-2 px-4">
              <Button variant="ghost" size="icon" className="hover:bg-[#e6f8fd] rounded-full">
                <Edit className="w-5 h-5 text-[#05AFF2]" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-[#e6f8fd] rounded-full">
                    <MoreHorizontal className="w-5 h-5 text-[#05AFF2]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Selection Bar */}
      {selectedCourses.length > 0 && (
        <div className="fixed left-1/2 bottom-8 -translate-x-1/2 z-50 bg-[#05AFF2] text-white px-10 py-4 rounded-full shadow-2xl flex items-center gap-8 min-w-[360px] justify-center">
          <span className="text-lg font-semibold">{selectedCourses.length} selected</span>
          <Button variant="ghost" size="icon" onClick={() => setSelectedCourses([])} className="text-white">
            ✕
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Edit className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Trash2 className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>
      )}
    </div>
  )
} 
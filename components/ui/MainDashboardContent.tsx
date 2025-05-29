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
    <div className="flex-1 flex flex-col bg-[#FAFAFB] p-6">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Content</span>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-300" />
          {isFeeds ? (
            <Rss className="w-5 h-5 text-[#05AFF2]" />
          ) : isModules ? (
            <Layers className="w-5 h-5 text-[#05AFF2]" />
          ) : isAudio ? (
            <Headphones className="w-5 h-5 text-[#05AFF2]" />
          ) : (
            <FileText className="w-5 h-5 text-[#05AFF2]" />
          )}
          <span className="text-gray-900 font-semibold ml-1">{isFeeds ? "Feeds" : isModules ? "Modules" : isAudio ? "Audio" : "Articles"}</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{isFeeds ? "Feeds" : isModules ? "Modules" : isAudio ? "Audio" : "Articles"}</h1>
          <div className="flex gap-3">
            <Button className="bg-[#181A20] text-white rounded-lg px-5 py-2 flex gap-2 shadow-none hover:bg-[#23242a]">
              <Upload className="w-4 h-4" />
              Import
            </Button>
            <Button className="bg-gradient-to-r from-[#0583F2] via-[#0597F2] via-[#05AFF2] to-[#5CC8F2] text-white rounded-lg px-5 py-2 flex gap-2 shadow-none hover:brightness-110">
              <Plus className="w-4 h-4 text-white" />
              Create
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-3 mt-8 mb-4 bg-white rounded-xl px-4 py-3 shadow-sm">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input placeholder="Search..." className="pl-12 h-11 rounded-lg border-gray-200 bg-[#F5F6FA] text-base" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-36 h-11 rounded-lg border-gray-200 bg-[#F5F6FA] text-base">
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
          <SelectTrigger className="w-36 h-11 rounded-lg border-gray-200 bg-[#F5F6FA] text-base">
            <SelectValue placeholder="Languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Languages</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-[#F5F6FA] text-gray-700 rounded-lg h-11 px-4 flex gap-2 border border-gray-200 shadow-none">
          <Filter className="w-5 h-5" />
          Filters
          <ChevronDown className="w-4 h-4" />
        </Button>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden ml-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className={`rounded-none ${viewMode === "grid" ? "bg-[#F5F6FA]" : "bg-white"}`}
          >
            <Grid3X3 className="w-5 h-5" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className={`rounded-none ${viewMode === "list" ? "bg-[#F5F6FA]" : "bg-white"}`}
          >
            <List className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-0 py-3 px-6 bg-[#F5F6FA] text-base font-semibold text-gray-700 items-center">
          <div className="col-span-1 flex items-center px-4">
            <Checkbox checked={selectedCourses.length === data.length} onCheckedChange={handleSelectAll} />
          </div>
          <div className="col-span-4 flex items-center gap-2 px-4">
            {isFeeds ? <Rss className="w-5 h-5 text-[#05AFF2]" /> : isModules ? <Layers className="w-5 h-5 text-[#05AFF2]" /> : isAudio ? <Headphones className="w-5 h-5 text-[#05AFF2]" /> : <FileText className="w-5 h-5 text-[#05AFF2]" />}
            Title
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
          <div key={item.id} className="grid grid-cols-12 gap-0 px-2 py-5 items-center border-t border-gray-100 hover:bg-[#FAFAFB] group">
            <div className="col-span-1 flex items-center px-4">
              <Checkbox
                checked={selectedCourses.includes(item.id)}
                onCheckedChange={(checked) => handleSelectCourse(item.id, checked as boolean)}
                className="scale-110"
              />
            </div>
            <div className="col-span-4 flex items-center gap-3 min-w-0 px-4">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
              />
              <span className="font-medium truncate text-base text-gray-900">{item.title}</span>
            </div>
            <div className="col-span-1 px-4">
              <Badge variant="secondary" className={getStatusColor(item.status) + " px-3 py-1 rounded-full text-sm font-semibold"}>
                {item.status}
              </Badge>
            </div>
            <div className="col-span-1 flex items-center gap-1 px-4">
              <span className="text-base">🇫🇷</span>
              <span className="text-base">🇬🇧</span>
              <span className="ml-1 text-xs bg-gray-100 text-gray-700 rounded px-2 py-0.5 font-medium">+3</span>
            </div>
            <div className="col-span-2 text-right text-base text-gray-500 px-4 whitespace-nowrap">{item.lastEdit}</div>
            {isFeeds ? (
              <div className="col-span-2 text-right text-base text-gray-700 px-4 whitespace-nowrap">{'source' in item ? item.source : ''}</div>
            ) : isModules ? (
              <div className="col-span-2 text-right text-base text-gray-700 px-4 whitespace-nowrap">{'lessons' in item ? item.lessons : ''}</div>
            ) : isAudio ? (
              <div className="col-span-2 text-right text-base text-gray-700 px-4 whitespace-nowrap">{'duration' in item ? item.duration : ''}</div>
            ) : (
              <div className="col-span-2 text-right text-base text-gray-700 px-4 whitespace-nowrap">{'version' in item ? (<span className="font-semibold">Version</span>) : ''} {'version' in item ? item.version.replace('Version ', '') : ''}</div>
            )}
            <div className="col-span-1 flex items-center justify-end gap-2 px-4">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Edit className="w-4 h-4 text-gray-400" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
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
        <div className="fixed left-1/2 bottom-8 -translate-x-1/2 z-50 bg-[#181A20] text-white px-8 py-3 rounded-2xl shadow-xl flex items-center gap-6 min-w-[340px] justify-center">
          <span className="text-base font-semibold">{selectedCourses.length} selected</span>
          <Button variant="ghost" size="icon" onClick={() => setSelectedCourses([])} className="text-white">
            ✕
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Edit className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Trash2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  )
} 
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import {
  Calendar,
  ChevronDown,
  Download,
  FileText,
  HelpCircle,
  Home,
  Inbox,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Trash2,
  TrendingUp,
  Users,
  Briefcase,
  Database,
  BarChart3,
  Grid3X3,
  GitBranch,
  ArrowUpRight,
  ChevronUp,
  Globe,
  Eye,
  Headphones,
  Clock,
  Languages,
  FileAudio,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"
import { BottomActionBar } from "@/components/BottomActionBar"

const audioFiles = [
  {
    id: 1,
    title: "Marketing Podcast Episode 1",
    author: "Adam Rogers",
    category: "MARKETING",
    status: "PUBLISHED",
    duration: "45:30",
    languages: 3,
    lastModified: "Sep 12, 2024",
    selected: false,
  },
  {
    id: 2,
    title: "Business Strategy Discussion",
    author: "Mike Fitzgerald",
    category: "STRATEGY",
    status: "IN_REVIEW",
    duration: "32:15",
    languages: 2,
    lastModified: "Sep 11, 2024",
    selected: true,
  },
  {
    id: 3,
    title: "Tech News Roundup",
    author: "Sarah Johnson",
    category: "TECH",
    status: "DRAFT",
    duration: "28:45",
    languages: 1,
    lastModified: "Sep 10, 2024",
    selected: false,
  },
  {
    id: 4,
    title: "Industry Insights",
    author: "Adam Rogers",
    category: "INDUSTRY",
    status: "PUBLISHED",
    duration: "52:10",
    languages: 5,
    lastModified: "Sep 9, 2024",
    selected: true,
  },
  {
    id: 5,
    title: "Expert Interview Series",
    author: "Emily Chen",
    category: "INTERVIEW",
    status: "PENDING_APPROVAL",
    duration: "38:20",
    languages: 2,
    lastModified: "Sep 8, 2024",
    selected: true,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "PUBLISHED":
      return "bg-green-100 text-green-800"
    case "IN_REVIEW":
      return "bg-orange-100 text-orange-800"
    case "DRAFT":
      return "bg-gray-100 text-gray-800"
    case "PENDING_APPROVAL":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "MARKETING":
      return "bg-purple-100 text-purple-800"
    case "STRATEGY":
      return "bg-blue-100 text-blue-800"
    case "TECH":
      return "bg-green-100 text-green-800"
    case "INDUSTRY":
      return "bg-red-100 text-red-800"
    case "INTERVIEW":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AudioPage() {
  const [selectedAudio, setSelectedAudio] = useState(audioFiles.filter((audio) => audio.selected))
  const [groupEnabled, setGroupEnabled] = useState(false)

  const toggleAudioSelection = (audioId: number) => {
    const audio = audioFiles.find((a) => a.id === audioId)
    if (audio) {
      if (selectedAudio.find((a) => a.id === audioId)) {
        setSelectedAudio(selectedAudio.filter((a) => a.id !== audioId))
      } else {
        setSelectedAudio([...selectedAudio, audio])
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Audio</h1>
            <div className="flex items-center gap-2">
              <Link href="/audio/new">
                <Button className={"bg-[#05AFF2]"}>
                  <Plus className="w-4 h-4 mr-2" />
                  New audio
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuItem>Import</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-gray-900">
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Grid
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Timeline
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={groupEnabled}
                  onCheckedChange={setGroupEnabled}
                  className="data-[state=checked]:bg-gray-900"
                />
                <span className="text-sm text-gray-600">Group by category</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search audio files..." className="pl-9 w-64" />
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FileAudio className="w-4 h-4" />
                    AUDIO
                  </div>
                </th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">AUTHOR</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORY</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">DURATION</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">LANGUAGES</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    LAST MODIFIED
                    <ChevronUp className="w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {audioFiles.map((audio) => (
                <tr key={audio.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedAudio.some((a) => a.id === audio.id)}
                        onCheckedChange={() => toggleAudioSelection(audio.id)}
                      />
                      <div>
                        <div className="font-medium text-gray-900">{audio.title}</div>
                        <div className="text-sm text-gray-500">ID: {audio.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {audio.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900">{audio.author}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className={getCategoryColor(audio.category)}>
                      {audio.category}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className={getStatusColor(audio.status)}>
                      {audio.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{audio.duration}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Languages className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{audio.languages}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-500">{audio.lastModified}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BottomActionBar selectedCount={selectedAudio.length} itemType="audio" />
      </div>
    </div>
  )
} 
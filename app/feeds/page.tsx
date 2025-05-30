"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Rss,
  History,
  Target,
  Lock,
  Globe2,
  Pin,
  ArrowUpDown,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"
import { BottomActionBar } from "@/components/BottomActionBar"

const feeds = [
  {
    id: 1,
    title: "Marketing Essentials",
    description: "Core marketing content for new team members",
    type: "MANUAL",
    visibility: "PUBLIC",
    contentCount: 24,
    languages: 3,
    lastModified: "Sep 12, 2024",
    selected: false,
  },
  {
    id: 2,
    title: "Tech News Roundup",
    description: "Latest technology news and updates",
    type: "AUTO",
    visibility: "ORG_ONLY",
    contentCount: 156,
    languages: 2,
    lastModified: "Sep 11, 2024",
    selected: true,
  },
  {
    id: 3,
    title: "Leadership Development",
    description: "Resources for emerging leaders",
    type: "MANUAL",
    visibility: "INTERNAL",
    contentCount: 42,
    languages: 1,
    lastModified: "Sep 10, 2024",
    selected: false,
  },
  {
    id: 4,
    title: "Product Training",
    description: "Product knowledge and training materials",
    type: "AUTO",
    visibility: "PUBLIC",
    contentCount: 89,
    languages: 5,
    lastModified: "Sep 9, 2024",
    selected: true,
  },
  {
    id: 5,
    title: "Customer Success Stories",
    description: "Case studies and success stories",
    type: "MANUAL",
    visibility: "ORG_ONLY",
    contentCount: 32,
    languages: 2,
    lastModified: "Sep 8, 2024",
    selected: true,
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case "MANUAL":
      return "bg-blue-100 text-blue-800"
    case "AUTO":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getVisibilityColor = (visibility: string) => {
  switch (visibility) {
    case "PUBLIC":
      return "bg-green-100 text-green-800"
    case "ORG_ONLY":
      return "bg-orange-100 text-orange-800"
    case "INTERNAL":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function FeedsPage() {
  const [selectedFeeds, setSelectedFeeds] = useState(feeds.filter((feed) => feed.selected))
  const [groupEnabled, setGroupEnabled] = useState(false)

  const toggleFeedSelection = (feedId: number) => {
    const feed = feeds.find((f) => f.id === feedId)
    if (feed) {
      if (selectedFeeds.find((f) => f.id === feedId)) {
        setSelectedFeeds(selectedFeeds.filter((f) => f.id !== feedId))
      } else {
        setSelectedFeeds([...selectedFeeds, feed])
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
            <h1 className="text-2xl font-semibold text-gray-900">Feeds</h1>
            <div className="flex items-center gap-2">
              <Link href="/feeds/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New feed
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

          {/* Stats cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Time Period</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8">
                      Last 7 days
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Total Feeds</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-semibold">156</div>
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12%
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Auto Feeds</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-semibold">42</div>
                  <div className="flex items-center text-orange-600 text-sm">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +8%
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Manual Feeds</div>
                <div className="text-2xl font-semibold">23</div>
              </CardContent>
            </Card>
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
                <span className="text-sm text-gray-600">Group by type</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search feeds..." className="pl-9 w-64" />
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
                    <Rss className="w-4 h-4" />
                    FEED
                  </div>
                </th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">TYPE</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">VISIBILITY</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">CONTENT</th>
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
              {feeds.map((feed) => (
                <tr key={feed.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedFeeds.some((f) => f.id === feed.id)}
                        onCheckedChange={() => toggleFeedSelection(feed.id)}
                      />
                      <div>
                        <div className="font-medium text-gray-900">{feed.title}</div>
                        <div className="text-sm text-gray-500">{feed.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className={getTypeColor(feed.type)}>
                      {feed.type}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className={getVisibilityColor(feed.visibility)}>
                      {feed.visibility.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{feed.contentCount} items</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Globe2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{feed.languages}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-500">{feed.lastModified}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BottomActionBar selectedCount={selectedFeeds.length} itemType="feeds" />
      </div>
    </div>
  )
} 
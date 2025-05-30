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
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"
import { BottomActionBar } from "@/components/BottomActionBar"

const articles = [
  {
    id: 1,
    title: "Building a Podcast Studio (for Marketers)",
    author: "Adam Rogers",
    category: "MARKETING",
    status: "PUBLISHED",
    views: "1,200",
    languages: 3,
    lastModified: "Sep 12, 2024",
    selected: false,
  },
  {
    id: 2,
    title: "The Future of Content Marketing",
    author: "Mike Fitzgerald",
    category: "STRATEGY",
    status: "IN_REVIEW",
    views: "856",
    languages: 2,
    lastModified: "Sep 11, 2024",
    selected: true,
  },
  {
    id: 3,
    title: "SEO Best Practices for 2024",
    author: "Sarah Johnson",
    category: "SEO",
    status: "DRAFT",
    views: "0",
    languages: 1,
    lastModified: "Sep 10, 2024",
    selected: false,
  },
  {
    id: 4,
    title: "Video Marketing Strategies",
    author: "Adam Rogers",
    category: "VIDEO",
    status: "PUBLISHED",
    views: "2,100",
    languages: 5,
    lastModified: "Sep 9, 2024",
    selected: true,
  },
  {
    id: 5,
    title: "Social Media Trends 2024",
    author: "Emily Chen",
    category: "SOCIAL",
    status: "PENDING_APPROVAL",
    views: "0",
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
    case "SEO":
      return "bg-green-100 text-green-800"
    case "VIDEO":
      return "bg-red-100 text-red-800"
    case "SOCIAL":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ArticlesPage() {
  const [selectedArticles, setSelectedArticles] = useState(articles.filter((article) => article.selected))
  const [groupEnabled, setGroupEnabled] = useState(false)

  const toggleArticleSelection = (articleId: number) => {
    const article = articles.find((a) => a.id === articleId)
    if (article) {
      if (selectedArticles.find((a) => a.id === articleId)) {
        setSelectedArticles(selectedArticles.filter((a) => a.id !== articleId))
      } else {
        setSelectedArticles([...selectedArticles, article])
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
            <h1 className="text-2xl font-semibold text-[">Articles</h1>
            <div className="flex items-center gap-2">
              <Link href="/articles/new">
                <Button className={"bg-[#05AFF2]"}>
                  <Plus className="w-4 h-4 mr-2" />
                  New article
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
                <div className="text-sm text-gray-500 mb-1">Published</div>
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
                <div className="text-sm text-gray-500 mb-1">In Review</div>
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
                <div className="text-sm text-gray-500 mb-1">Drafts</div>
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
                <span className="text-sm text-gray-600">Group by category</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search articles..." className="pl-9 w-64" />
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
                    <FileText className="w-4 h-4" />
                    ARTICLE
                  </div>
                </th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">AUTHOR</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORY</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">VIEWS</th>
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
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedArticles.some((a) => a.id === article.id)}
                        onCheckedChange={() => toggleArticleSelection(article.id)}
                      />
                      <div>
                        <div className="font-medium text-gray-900">{article.title}</div>
                        <div className="text-sm text-gray-500">ID: {article.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {article.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900">{article.author}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className={getStatusColor(article.status)}>
                      {article.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{article.views}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{article.languages}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-500">{article.lastModified}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BottomActionBar selectedCount={selectedArticles.length} itemType="articles" />
      </div>
    </div>
  )
}

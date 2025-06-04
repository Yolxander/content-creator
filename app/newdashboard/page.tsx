"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { NewSidebar } from "@/components/NewSidebar"
import { BottomActionBar } from "@/components/BottomActionBar"
import { AddContentModal } from "@/components/AddContentModal"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const articles = [
  {
    id: 1,
    title: "How to Build a Successful Content Strategy",
    author: "Adam Rogers",
    category: "MARKETING",
    status: "PUBLISHED",
    views: 1234,
    lastModified: "Sep 12, 2024",
    selected: false,
    type: "article",
    wordCount: 2500,
  },
  {
    id: 2,
    title: "Marketing Podcast Episode 1",
    author: "Mike Fitzgerald",
    category: "STRATEGY",
    status: "IN_REVIEW",
    views: 856,
    lastModified: "Sep 11, 2024",
    selected: true,
    type: "audio",
    duration: "45:30",
  },
  {
    id: 3,
    title: "Content Review Request",
    author: "Sarah Johnson",
    category: "TECH",
    status: "DRAFT",
    views: 0,
    lastModified: "Sep 10, 2024",
    selected: false,
    type: "submission",
    priority: "High",
  },
  {
    id: 4,
    title: "Content Marketing Trends 2024",
    author: "Adam Rogers",
    category: "INDUSTRY",
    status: "PUBLISHED",
    views: 2345,
    lastModified: "Sep 9, 2024",
    selected: true,
    type: "article",
    wordCount: 1800,
  },
  {
    id: 5,
    title: "Expert Interview Series",
    author: "Emily Chen",
    category: "INTERVIEW",
    status: "PENDING_APPROVAL",
    views: 567,
    lastModified: "Sep 8, 2024",
    selected: true,
    type: "audio",
    duration: "32:15",
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

export default function NewDashboardPage() {
  const [selectedArticles, setSelectedArticles] = useState(articles.filter((article) => article.selected))
  const [groupEnabled, setGroupEnabled] = useState(false)
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false)

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
    <div className="flex min-h-screen">
      <NewSidebar />
      
      <div className="flex-1 md:pl-72">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Button variant="default" onClick={() => setIsAddContentModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Content
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuItem>Import</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Period</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8">
                      Last 7 days
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Published</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Review</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-orange-600">+8%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  Active drafts
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <List className="mr-2 h-4 w-4" />
                List
              </Button>
              <Button variant="ghost" size="sm">
                <Grid3X3 className="mr-2 h-4 w-4" />
                Grid
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search content..."
                className="h-8 w-[150px] lg:w-[250px]"
              />
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedArticles.some((a) => a.id === article.id)}
                          onCheckedChange={() => toggleArticleSelection(article.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {article.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {article.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{article.author}</TableCell>
                      <TableCell>{article.lastModified}</TableCell>
                      <TableCell>{article.views}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddContentModal
        open={isAddContentModalOpen}
        onOpenChange={setIsAddContentModalOpen}
      />
    </div>
  )
} 
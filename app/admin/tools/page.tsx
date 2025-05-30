"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  ChevronUp,
  Filter,
  ArrowUpRight,
  CheckCircle,
  XCircle,
  MessageSquare,
  Shield,
  FileText,
  FileAudio,
  Search,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"

const submissions = [
  {
    id: 2,
    title: "Content Strategy Podcast",
    type: "audio",
    author: "Jane Smith",
    submittedAt: "3 hours ago",
    status: "pending",
    statusColor: "bg-orange-100 text-orange-800",
    selected: false,
  },
  {
    id: 1,
    title: "Getting Started with Content Creation",
    type: "article",
    author: "John Doe",
    submittedAt: "2 hours ago",
    status: "pending",
    statusColor: "bg-orange-100 text-orange-800",
    selected: false,
  },
  {
    id: 3,
    title: "Digital Marketing Insights",
    type: "article",
    author: "Mike Brown",
    submittedAt: "5 hours ago",
    status: "pending",
    statusColor: "bg-orange-100 text-orange-800",
    selected: false,
  },
]

const getTypeBadge = (type: string) => {
  switch (type) {
    case "audio":
      return "bg-purple-100 text-purple-800 lowercase"
    case "article":
      return "bg-blue-100 text-blue-800 lowercase"
    default:
      return "bg-gray-100 text-gray-800 lowercase"
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-orange-100 text-orange-800 lowercase"
    case "approved":
      return "bg-green-100 text-green-800 lowercase"
    case "declined":
      return "bg-red-100 text-red-800 lowercase"
    default:
      return "bg-gray-100 text-gray-800 lowercase"
  }
}

export default function AdminToolsPage() {
  const [selectedSubmissions, setSelectedSubmissions] = useState(submissions.filter((s) => s.selected))
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const toggleSubmissionSelection = (submissionId: number) => {
    const submission = submissions.find((s) => s.id === submissionId)
    if (submission) {
      if (selectedSubmissions.find((s) => s.id === submissionId)) {
        setSelectedSubmissions(selectedSubmissions.filter((s) => s.id !== submissionId))
      } else {
        setSelectedSubmissions([...selectedSubmissions, submission])
      }
    }
  }

  const filteredSubmissions = submissions.filter((s) => {
    const matchesStatus = statusFilter === "all" || s.status === statusFilter
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Reviewer Tool</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button>
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          {/* Stats cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Pending Reviews</div>
                <div className="text-2xl font-semibold">12</div>
                <div className="text-xs text-gray-500">+2 from yesterday</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Approved Today</div>
                <div className="text-2xl font-semibold">8</div>
                <div className="text-xs text-gray-500">+3 from yesterday</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Declined Today</div>
                <div className="text-2xl font-semibold">3</div>
                <div className="text-xs text-gray-500">-1 from yesterday</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Resubmissions</div>
                <div className="text-2xl font-semibold">5</div>
                <div className="text-xs text-gray-500">+2 from yesterday</div>
              </CardContent>
            </Card>
          </div>
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search submissions..."
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8">
                    {statusFilter === "all" ? "All Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("approved")}>Approved</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("declined")}>Declined</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                    <Shield className="w-4 h-4" />
                    SUBMISSION
                  </div>
                </th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">TYPE</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">AUTHOR</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    SUBMITTED
                    <ChevronUp className="w-3 h-3" />
                  </div>
                </th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedSubmissions.some((s) => s.id === submission.id)}
                        onCheckedChange={() => toggleSubmissionSelection(submission.id)}
                      />
                      <div>
                        <div className="font-medium text-gray-900">{submission.title}</div>
                        <div className="text-sm text-gray-500">ID: {submission.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className={getTypeBadge(submission.type)}>
                      {submission.type}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {submission.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900">{submission.author}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className={getStatusBadge(submission.status)}>
                      {submission.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-500">{submission.submittedAt}</span>
                  </td>
                  <td className="p-4">
                    <Link href={`/admin/review/${submission.id}?type=${submission.type}`}>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Bottom action bar */}
        {selectedSubmissions.length > 0 && (
          <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
            <span className="text-sm">{selectedSubmissions.length} selected submissions</span>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve All
              </Button>
              <Button variant="secondary" size="sm">
                <XCircle className="w-4 h-4 mr-2" />
                Decline All
              </Button>
              <Button variant="secondary" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Feedback
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
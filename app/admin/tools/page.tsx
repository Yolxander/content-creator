"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  FileText,
  FileAudio,
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  Search,
  Filter,
  ArrowUpRight,
  ChevronUp,
  Shield,
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

export default function AdminToolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSubmissions, setSelectedSubmissions] = useState([])

  const toggleSubmissionSelection = (submissionId) => {
    const submission = submissions.find((s) => s.id === submissionId)
    if (submission) {
      if (selectedSubmissions.find((s) => s.id === submissionId)) {
        setSelectedSubmissions(selectedSubmissions.filter((s) => s.id !== submissionId))
      } else {
        setSelectedSubmissions([...selectedSubmissions, submission])
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
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Admin Tools</h1>
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
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Clock className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-500">+2 from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-gray-500">+3 from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Declined Today</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-gray-500">-1 from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resubmissions</CardTitle>
                <MessageSquare className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-gray-500">+2 from yesterday</p>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search submissions..." 
                  className="pl-9 w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border">
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
              <tbody className="divide-y divide-gray-200">
                {submissions.map((submission) => (
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
                      <Badge variant="secondary" className={submission.type === "article" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}>
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
                      <Badge variant="secondary" className={submission.statusColor}>
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
            <div className="bg-gray-900 text-white p-4 flex items-center justify-between mt-4 rounded-lg">
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
    </div>
  )
} 
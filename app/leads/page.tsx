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
  ArrowDownRight,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"

const leads = [
  {
    id: 1,
    name: "Andy Shepard",
    email: "a.shepard@gmail.com",
    source: "ORGANIC",
    status: "PRE-SALE",
    size: "$120,000",
    probability: "MID",
    lastAction: "Sep 12, 2024",
    selected: false,
  },
  {
    id: 2,
    name: "Emily Thompson",
    email: "a.shepard@gmail.com",
    source: "SB2024",
    status: "CLOSED",
    size: "$200,000",
    probability: "HIGH",
    lastAction: "Engage",
    selected: true,
  },
  {
    id: 3,
    name: "Michael Carter",
    email: "a.shepard@gmail.com",
    source: "SUMMER2",
    status: "PRE-SALE",
    size: "$45,000",
    probability: "LOW",
    lastAction: "Sep 12, 2024",
    selected: false,
  },
  {
    id: 4,
    name: "David Anderson",
    email: "a.shepard@gmail.com",
    source: "DTJ25",
    status: "PRE-SALE",
    size: "$80,000",
    probability: "HIGH",
    lastAction: "Sep 12, 2024",
    selected: true,
  },
  {
    id: 5,
    name: "Lily Hernandez",
    email: "a.shepard@gmail.com",
    source: "ORGANIC",
    status: "LOST",
    size: "$110,000",
    probability: "LOW",
    lastAction: "Sep 12, 2024",
    selected: true,
  },
  {
    id: 6,
    name: "Christopher Wilson",
    email: "a.shepard@gmail.com",
    source: "SB2024",
    status: "CLOSED",
    size: "$2,120,000",
    probability: "MID",
    lastAction: "Sep 12, 2024",
    selected: true,
  },
  {
    id: 7,
    name: "Isabella Lopez",
    email: "a.shepard@gmail.com",
    source: "ORGANIC",
    status: "CLOSING",
    size: "$20,000",
    probability: "HIGH",
    lastAction: "Sep 12, 2024",
    selected: true,
  },
  {
    id: 8,
    name: "Sophia Morgan",
    email: "a.shepard@gmail.com",
    source: "AFF20",
    status: "NEW",
    size: "$95,000",
    probability: "LOW",
    lastAction: "Sep 11, 2024",
    selected: true,
  },
  {
    id: 9,
    name: "John Davis",
    email: "a.shepard@gmail.com",
    source: "ORGANIC",
    status: "PRE-SALE",
    size: "$200,000",
    probability: "MID",
    lastAction: "Sep 11, 2024",
    selected: true,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "CLOSED":
      return "bg-green-100 text-green-800"
    case "PRE-SALE":
      return "bg-orange-100 text-orange-800"
    case "LOST":
      return "bg-red-100 text-red-800"
    case "NEW":
      return "bg-blue-100 text-blue-800"
    case "CLOSING":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getProbabilityColor = (probability: string) => {
  switch (probability) {
    case "HIGH":
      return "bg-green-100 text-green-800"
    case "MID":
      return "bg-yellow-100 text-yellow-800"
    case "LOW":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const MiniChart = () => (
  <svg width="40" height="20" viewBox="0 0 40 20" className="text-gray-400">
    <path d="M2 18 L8 12 L14 15 L20 8 L26 11 L32 5 L38 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

export default function LeadsPage() {
  const [selectedLeads, setSelectedLeads] = useState(leads.filter((lead) => lead.selected))
  const [groupEnabled, setGroupEnabled] = useState(false)

  const toggleLeadSelection = (leadId: number) => {
    const lead = leads.find((l) => l.id === leadId)
    if (lead) {
      if (selectedLeads.find((l) => l.id === leadId)) {
        setSelectedLeads(selectedLeads.filter((l) => l.id !== leadId))
      } else {
        setSelectedLeads([...selectedLeads, lead])
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <span className="font-semibold text-gray-900">Meetalo</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
              <Home className="w-4 h-4 mr-3" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
              <Inbox className="w-4 h-4 mr-3" />
              Inbox
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
              <FileText className="w-4 h-4 mr-3" />
              My work
              <Badge variant="secondary" className="ml-auto bg-orange-100 text-orange-800">
                24
              </Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
              <Calendar className="w-4 h-4 mr-3" />
              Calendar
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
              <BarChart3 className="w-4 h-4 mr-3" />
              Campaigns
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
              <Briefcase className="w-4 h-4 mr-3" />
              Deals
            </Button>
            <Button variant="default" className="w-full justify-start bg-gray-100 text-gray-900 hover:bg-gray-200">
              <Users className="w-4 h-4 mr-3" />
              Leads
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
              <Users className="w-4 h-4 mr-3" />
              Address book
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
              <Database className="w-4 h-4 mr-3" />
              Data room
            </Button>
          </div>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 mb-2">
            <HelpCircle className="w-4 h-4 mr-3" />
            Help
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 mb-4">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>

          {/* Usage indicator */}
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">86% of free records are used.</div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-orange-500 h-1 rounded-full" style={{ width: "86%" }}></div>
            </div>
          </div>

          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 mb-4">
            <ArrowUpRight className="w-4 h-4 mr-3" />
            Upgrade subscription
          </Button>

          {/* User profile */}
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">Simon Prusin</div>
              <div className="text-xs text-gray-500 truncate">simonprusin@gmail.com</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
            <div className="flex items-center gap-2">
              <Link href="/leads/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New lead
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

          {/* Time filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mb-6">
                Last 7 days
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem>Last 90 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Stats cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">New</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-semibold">326</div>
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +24%
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Closed</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-semibold">46</div>
                  <div className="flex items-center text-red-600 text-sm">
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                    -4%
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Lost</div>
                <div className="text-2xl font-semibold">3</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Total closed</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-semibold">$1,287,500</div>
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3%
                  </div>
                </div>
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
                  Board
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Pipeline
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={groupEnabled}
                  onCheckedChange={setGroupEnabled}
                  className="data-[state=checked]:bg-gray-900"
                />
                <span className="text-sm text-gray-600">Group</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search..." className="pl-9 w-64" />
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
                    <Users className="w-4 h-4" />
                    LEAD
                  </div>
                </th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">SOURCE</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">SIZE</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">INTEREST</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PROBABILITY
                </th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    LAST ACTION
                    <ChevronUp className="w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedLeads.some((l) => l.id === lead.id)}
                        onCheckedChange={() => toggleLeadSelection(lead.id)}
                      />
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-900">{lead.source}</span>
                      {lead.source !== "ORGANIC" && <ArrowUpRight className="w-3 h-3 text-gray-400" />}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-gray-900">{lead.size}</td>
                  <td className="p-4">
                    <MiniChart />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <Badge variant="secondary" className={getProbabilityColor(lead.probability)}>
                        {lead.probability}
                      </Badge>
                    </div>
                  </td>
                  <td className="p-4">
                    {lead.lastAction === "Engage" ? (
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        Engage
                        <MoreHorizontal className="w-3 h-3 ml-1" />
                      </Button>
                    ) : (
                      <span className="text-sm text-gray-500">{lead.lastAction}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom action bar */}
        {selectedLeads.length > 0 && (
          <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
            <span className="text-sm">{selectedLeads.length} selected leads</span>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                Engage
              </Button>
              <Button variant="secondary" size="sm">
                Create group
              </Button>
              <Button variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download as CSV
              </Button>
              <Button variant="secondary" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete leads
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

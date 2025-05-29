"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Clock, Plus, Upload, UserPlus, TrendingUp, BarChart3, CheckCircle, UserCheck, ChevronRight, User } from "lucide-react"
import SidebarNav from "@/components/ui/SidebarNav"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Building2 } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

type Organization = {
  id: string
  name: string
}

const mockContentSummary = {
  total: 128,
  drafts: 12,
  published: 100,
  scheduled: 16,
  lastEdited: [
    { title: "How to Use the CMS", date: "2024-06-01", link: "#" },
    { title: "Welcome Post", date: "2024-05-30", link: "#" },
  ],
}

const mockRecentActivity = [
  { user: "Alice", action: "edited", what: "Home Page", when: "2m ago", icon: <FileText className="w-4 h-4 text-[#05AFF2]" /> },
  { user: "Bob", action: "published", what: "Blog Post", when: "10m ago", icon: <CheckCircle className="w-4 h-4 text-[#05AFF2]" /> },
  { user: "Eve", action: "commented on", what: "Product Launch", when: "1h ago", icon: <User className="w-4 h-4 text-[#05AFF2]" /> },
  { user: "Alice", action: "scheduled", what: "Newsletter", when: "2h ago", icon: <Clock className="w-4 h-4 text-[#05AFF2]" /> },
  { user: "Bob", action: "uploaded", what: "Media File", when: "3h ago", icon: <Upload className="w-4 h-4 text-[#05AFF2]" /> },
]

const mockUserStats = {
  activeToday: 5,
  activeWeek: 18,
  topContributors: ["Alice", "Bob", "Eve"],
  pendingApprovals: 2,
}

const mockPerformance = {
  viewsToday: 1200,
  viewsWeek: 8200,
  mostPopular: "How to Use the CMS",
  engagement: { likes: 320, comments: 45, shares: 12 },
}

export default function OverviewPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null)

  useEffect(() => {
    async function loadOrganizations() {
      try {
        const { data: orgsData } = await supabase
          .from('organizations')
          .select('*')
          .order('name')
        setOrganizations(orgsData || [])
        
        // Get current user's organization
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('organization_id')
            .eq('id', user.id)
            .single()
          
          if (profile?.organization_id) {
            const currentOrg = orgsData?.find(org => org.id === profile.organization_id)
            setCurrentOrg(currentOrg || null)
          }
        }
      } catch (error) {
        console.error('Error loading organizations:', error)
      }
    }
    loadOrganizations()
  }, [])

  const handleOrgChange = async (orgId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('profiles')
        .update({ organization_id: orgId })
        .eq('id', user.id)

      if (error) throw error

      const newOrg = organizations.find(org => org.id === orgId)
      setCurrentOrg(newOrg || null)
    } catch (error) {
      console.error('Error updating organization:', error)
    }
  }

  return (
    <div className="flex h-screen bg-[#f6f3ef]">
      <SidebarNav />
      <div className="flex-1 flex flex-col p-10 pt-2 min-h-screen">
        {/* Header & Breadcrumb */}
        <div className="flex flex-col gap-6 mb-4">
          <div className="flex items-center gap-2 text-base text-[#05AFF2] mb-2">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1 text-[#05AFF2]" />
            <FileText className="w-5 h-5 text-[#05AFF2]" />
            <span className="text-[#05AFF2] font-bold ml-1">Overview</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-extrabold text-[#05AFF2] tracking-tight">Overview</h1>
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-white text-[#05AFF2] rounded-full px-6 py-3 flex gap-2 shadow-md border border-[#05AFF2] hover:bg-[#e6f8fd] font-semibold">
                    <Building2 className="w-5 h-5" />
                    {currentOrg?.name || 'Select Organization'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {organizations.map((org) => (
                    <DropdownMenuItem
                      key={org.id}
                      onClick={() => handleOrgChange(org.id)}
                      className="cursor-pointer"
                    >
                      {org.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="bg-[#05AFF2] text-white rounded-full px-6 py-3 flex gap-2 shadow-md hover:bg-[#059fd2] font-semibold">
                <Plus className="w-5 h-5 text-white" />
                Create
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Content Summary */}
          <Card className="rounded-3xl p-6 bg-white shadow-md flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-[#05AFF2]" />
              <span className="text-lg text-[#05AFF2] font-semibold">Content Summary</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-2">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#05AFF2]">{mockContentSummary.total}</span>
                <span className="text-xs text-[#b6b0a6]">Total</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#b6b0a6]">{mockContentSummary.drafts}</span>
                <span className="text-xs text-[#b6b0a6]">Drafts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-green-500">{mockContentSummary.published}</span>
                <span className="text-xs text-[#b6b0a6]">Published</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#F2C438]">{mockContentSummary.scheduled}</span>
                <span className="text-xs text-[#b6b0a6]">Scheduled</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-[#b6b0a6]">Last edited:</span>
              <ul className="mt-1 space-y-1">
                {mockContentSummary.lastEdited.map((item, i) => (
                  <li key={i}>
                    <a href={item.link} className="text-sm text-[#05AFF2] hover:underline">{item.title}</a>
                    <span className="ml-2 text-xs text-[#b6b0a6]">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          {/* User Stats */}
          <Card className="rounded-3xl p-6 bg-white shadow-md flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-[#05AFF2]" />
              <span className="text-lg text-[#05AFF2] font-semibold">User Stats</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-2">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#05AFF2]">{mockUserStats.activeToday}</span>
                <span className="text-xs text-[#b6b0a6]">Active Today</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#05AFF2]">{mockUserStats.activeWeek}</span>
                <span className="text-xs text-[#b6b0a6]">Active This Week</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#F2C438]">{mockUserStats.pendingApprovals}</span>
                <span className="text-xs text-[#b6b0a6]">Pending Approvals</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-[#b6b0a6]">Top Contributors:</span>
              <div className="flex gap-2 mt-1">
                {mockUserStats.topContributors.map((user, i) => (
                  <Badge key={i} className="bg-[#05AFF2] text-white rounded-full px-3 py-1 text-xs">{user}</Badge>
                ))}
              </div>
            </div>
          </Card>
          {/* Performance Snapshot */}
          <Card className="rounded-3xl p-6 bg-white shadow-md flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-[#05AFF2]" />
              <span className="text-lg text-[#05AFF2] font-semibold">Performance Snapshot</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-2">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#05AFF2]">{mockPerformance.viewsToday}</span>
                <span className="text-xs text-[#b6b0a6]">Views Today</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#05AFF2]">{mockPerformance.viewsWeek}</span>
                <span className="text-xs text-[#b6b0a6]">Views This Week</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-[#b6b0a6]">Most Popular:</span>
              <span className="ml-2 text-sm text-[#05AFF2]">{mockPerformance.mostPopular}</span>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex flex-col items-center">
                <span className="text-base text-[#05AFF2]">👍</span>
                <span className="text-xs text-[#b6b0a6]">{mockPerformance.engagement.likes} Likes</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base text-[#05AFF2]">💬</span>
                <span className="text-xs text-[#b6b0a6]">{mockPerformance.engagement.comments} Comments</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base text-[#05AFF2]">🔗</span>
                <span className="text-xs text-[#b6b0a6]">{mockPerformance.engagement.shares} Shares</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="rounded-3xl p-6 bg-white shadow-md flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-[#05AFF2]" />
              <span className="text-lg text-[#05AFF2] font-semibold">Recent Activity</span>
            </div>
            <ul className="divide-y divide-[#f6f3ef]">
              {mockRecentActivity.map((item, i) => (
                <li key={i} className="flex items-center gap-3 py-2">
                  {item.icon}
                  <span className="text-sm text-[#181A20]">{item.user} <span className="text-[#b6b0a6]">{item.action}</span> <span className="text-[#05AFF2] font-medium">{item.what}</span></span>
                  <span className="ml-auto text-xs text-[#b6b0a6]">{item.when}</span>
                </li>
              ))}
            </ul>
          </Card>
          {/* Quick Actions */}
          <Card className="rounded-3xl p-6 bg-white shadow-md flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-[#05AFF2]" />
              <span className="text-lg text-[#05AFF2] font-semibold">Quick Actions</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#05AFF2] text-white rounded-full px-6 py-3 flex gap-2 shadow-md hover:bg-[#059fd2] font-semibold">
                <Plus className="w-5 h-5 text-white" />
                Create New Post
              </Button>
              <Button className="bg-[#F2C438] text-[#181A20] rounded-full px-6 py-3 flex gap-2 shadow-md hover:bg-[#e6d16a] font-semibold">
                <Upload className="w-5 h-5 text-[#181A20]" />
                Upload Media
              </Button>
              <Button className="bg-white text-[#05AFF2] border border-[#05AFF2] rounded-full px-6 py-3 flex gap-2 shadow-md font-semibold">
                <UserPlus className="w-5 h-5 text-[#05AFF2]" />
                Add User
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 
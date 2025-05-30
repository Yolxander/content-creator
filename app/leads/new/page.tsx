"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  ArrowLeft,
  CalendarIcon,
  ChevronDown,
  Eye,
  MoreHorizontal,
  Save,
  Share,
  Users,
  Sparkles,
  Target,
  Mail,
  Home,
  Inbox,
  FileText,
  Briefcase,
  Database,
  HelpCircle,
  Settings,
  BarChart3,
  Plus,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"

const versions = [
  { id: 1, name: "Version 1", date: "Aug 9, 2024", active: true },
  { id: 2, name: "Version 2", date: "Aug 8, 2024", active: false },
  { id: 3, name: "Version 3", date: "Aug 7, 2024", active: false },
]

export default function NewLeadPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [activeVersion, setActiveVersion] = useState(1)
  const [isPublished, setIsPublished] = useState(false)
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [autoAssign, setAutoAssign] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Same as main dashboard */}
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
              <CalendarIcon className="w-4 h-4 mr-3" />
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/leads">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-900">Create New Lead</h1>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  DRAFT
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <div className="flex items-center gap-1">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">AR</AvatarFallback>
                </Avatar>
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">MF</AvatarFallback>
                </Avatar>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Lead
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex">
          {/* Left Panel */}
          <div className="w-2/3 p-6 overflow-auto">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="qualification">Qualification</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Basic Information
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Sparkles className="w-4 h-4 mr-1" />
                        AI Generated
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter first name" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter last name" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Enter company name" />
                    </div>
                    <div>
                      <Label htmlFor="title">Job Title</Label>
                      <Input id="title" placeholder="Enter job title" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter email address" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="Enter phone number" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter lead description and notes..."
                        className="min-h-[100px]"
                      />
                      <div className="text-xs text-gray-500 mt-1">248/250</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Settings */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">High Priority Lead</span>
                      </div>
                      <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">Enable Notifications</span>
                      </div>
                      <Switch checked={enableNotifications} onCheckedChange={setEnableNotifications} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">Auto-assign to Team</span>
                      </div>
                      <Switch checked={autoAssign} onCheckedChange={setAutoAssign} />
                    </div>
                  </CardContent>
                </Card>

                {/* Schedule Follow-up */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Schedule Follow-up</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="rounded-md border"
                        />
                      </div>
                      <div className="w-32 space-y-2">
                        <div className="text-sm font-medium">Time</div>
                        <div className="space-y-1">
                          {["8:00 am", "8:30 am", "9:00 am", "9:30 am", "10:00 am"].map((time) => (
                            <Button key={time} variant="outline" size="sm" className="w-full justify-start text-xs">
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Lead Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="assignee">Assigned to</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adam">Adam Rogers</SelectItem>
                          <SelectItem value="mike">Mike Fitzgerald</SelectItem>
                          <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="source">Lead Source</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="organic">Organic</SelectItem>
                          <SelectItem value="sb2024">SB2024</SelectItem>
                          <SelectItem value="summer2">SUMMER2</SelectItem>
                          <SelectItem value="dtj25">DTJ25</SelectItem>
                          <SelectItem value="aff20">AFF20</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="qualification" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lead Qualification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">Under $10,000</SelectItem>
                          <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="over-100k">Over $100,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeline">Decision Timeline</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (0-30 days)</SelectItem>
                          <SelectItem value="short">Short term (1-3 months)</SelectItem>
                          <SelectItem value="medium">Medium term (3-6 months)</SelectItem>
                          <SelectItem value="long">Long term (6+ months)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="authority">Decision Authority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select authority level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="decision-maker">Decision Maker</SelectItem>
                          <SelectItem value="influencer">Influencer</SelectItem>
                          <SelectItem value="user">End User</SelectItem>
                          <SelectItem value="gatekeeper">Gatekeeper</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lead Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Add detailed notes about this lead, conversation history, pain points, etc..."
                      className="min-h-[200px]"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Preview & Versions */}
          <div className="w-1/3 bg-white border-l border-gray-200 flex flex-col">
            {/* Version Controls */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Lead Preview</h3>
                <div className="flex items-center gap-2">
                  <Select
                    value={activeVersion.toString()}
                    onValueChange={(value) => setActiveVersion(Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {versions.map((version) => (
                        <SelectItem key={version.id} value={version.id.toString()}>
                          {version.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Save Version
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{versions.find((v) => v.id === activeVersion)?.date}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active</span>
                  <Switch
                    checked={versions.find((v) => v.id === activeVersion)?.active || false}
                    onCheckedChange={() => {}}
                  />
                </div>
              </div>
            </div>

            {/* Versions List */}
            <div className="flex-1 p-6 overflow-auto">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 mb-4">Saved Versions</h3>

                {versions.map((version) => (
                  <div
                    key={version.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      activeVersion === version.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveVersion(version.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{version.name}</h4>
                      <div className="flex items-center gap-2">
                        {version.active && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                            Active
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{version.date}</p>
                    <div className="text-xs text-gray-500">Last modified by Simon Prusin</div>
                  </div>
                ))}

                {/* Add New Version */}
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Version
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

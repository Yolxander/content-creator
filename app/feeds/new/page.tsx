"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
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
  Globe,
  Video,
  ImageIcon,
  Upload,
  Languages,
  CheckCircle,
  Clock,
  FileAudio,
  Calendar,
  Tag,
  FileText as FileTextIcon,
  Rss,
  History,
  Lock,
  Globe2,
  Pin,
  ArrowUpDown,
  Search,
  Filter,
  AlertCircle,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"

const contentTypes = [
  { id: "articles", name: "Articles", icon: FileText },
  { id: "audio", name: "Audio", icon: FileAudio },
]

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
]

const organizations = [
  { id: 1, name: "Marketing Team" },
  { id: 2, name: "Sales Team" },
  { id: 3, name: "Product Team" },
  { id: 4, name: "Customer Success" },
]

const exampleContent = {
  articles: [
    {
      id: "a1",
      title: "Getting Started with Content Creation",
      author: "John Doe",
      date: "Sep 12, 2024",
      status: "Published",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: "a2",
      title: "Content Marketing Best Practices",
      author: "Sarah Wilson",
      date: "Sep 11, 2024",
      status: "In Review",
      statusColor: "bg-orange-100 text-orange-800",
    },
  ],
  audio: [
    {
      id: "au1",
      title: "Content Strategy Podcast",
      author: "Jane Smith",
      date: "Sep 11, 2024",
      status: "In Review",
      statusColor: "bg-orange-100 text-orange-800",
    },
    {
      id: "au2",
      title: "Digital Marketing Insights",
      author: "Mike Brown",
      date: "Sep 10, 2024",
      status: "Published",
      statusColor: "bg-green-100 text-green-800",
    },
  ],
  video: [
    {
      id: "v1",
      title: "Video Production Tips",
      author: "Mike Johnson",
      date: "Sep 10, 2024",
      status: "Draft",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: "v2",
      title: "Content Creation Tutorial",
      author: "Emily Davis",
      date: "Sep 9, 2024",
      status: "Published",
      statusColor: "bg-green-100 text-green-800",
    },
  ],
}

export default function NewFeedPage() {
  const [feedType, setFeedType] = useState("manual")
  const [visibility, setVisibility] = useState("public")
  const [selectedLanguages, setSelectedLanguages] = useState(["en"])
  const [selectedOrgs, setSelectedOrgs] = useState([])
  const [autoRules, setAutoRules] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedContentType, setSelectedContentType] = useState("articles")
  const [selectedContent, setSelectedContent] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("content")

  // Calculate completion status for each tab
  const getTabStatus = () => {
    const status = {
      content: false,
      selection: false,
      rules: false,
      targeting: false,
      settings: false,
    }

    // Content tab validation
    status.content = title.trim() !== "" && description.trim() !== ""

    // Selection tab validation
    status.selection = selectedContent.length > 0

    // Rules tab validation (if auto feed)
    status.rules = feedType === "manual" || autoRules.length > 0

    // Targeting tab validation
    status.targeting = selectedLanguages.length > 0

    // Settings tab validation
    status.settings = true // Always true as it's optional

    return status
  }

  const tabStatus = getTabStatus()
  const completionPercentage = Math.round(
    (Object.values(tabStatus).filter(Boolean).length / Object.keys(tabStatus).length) * 100
  )

  const handleContentTypeSelect = (type) => {
    setSelectedContentType(type)
  }

  const handleContentSelect = (content) => {
    if (selectedContent.find((item) => item.id === content.id)) {
      setSelectedContent(selectedContent.filter((item) => item.id !== content.id))
    } else {
      setSelectedContent([...selectedContent, content])
    }
  }

  const handleSelectAll = () => {
    const currentTypeContent = exampleContent[selectedContentType]
    if (selectedContent.length === currentTypeContent.length) {
      setSelectedContent([])
    } else {
      setSelectedContent(currentTypeContent)
    }
  }

  const getActionButtons = (context) => {
    switch (context) {
      case "feed":
        return (
          <>
            <Button variant="ghost" size="sm">
              <Pin className="w-4 h-4 mr-2" />
              Pin to Top
            </Button>
            <Button variant="ghost" size="sm">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Change Order
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </>
        )
      case "selection":
        return (
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add to Feed
          </Button>
        )
      default:
        return null
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
            <div className="flex items-center gap-4">
              <Link href="/feeds">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-900">Create New Feed</h1>
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
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Feed
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Feed completion</span>
              <span className="text-sm font-medium text-gray-900">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Tabs defaultValue="feed" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="targeting">Targeting</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feed Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg divide-y">
                    <div className="p-4 bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="select-all-feed" 
                          checked={selectedContent.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                        <Label htmlFor="select-all-feed" className="text-sm font-medium">Select All</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        {getActionButtons("feed")}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {selectedContent.map((content) => (
                          <div key={content.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                            <Checkbox 
                              id={`feed-${content.id}`}
                              checked={selectedContent.some((item) => item.id === content.id)}
                              onCheckedChange={() => handleContentSelect(content)}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                {content.id.startsWith("a") && <FileText className="w-4 h-4 text-gray-400" />}
                                {content.id.startsWith("au") && <FileAudio className="w-4 h-4 text-gray-400" />}
                                {content.id.startsWith("v") && <Video className="w-4 h-4 text-gray-400" />}
                                <div className="font-medium">{content.title}</div>
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                Published by {content.author} • {content.date}
                              </div>
                            </div>
                            <Badge variant="secondary" className={content.statusColor}>
                              {content.status}
                            </Badge>
                          </div>
                        ))}
                        {selectedContent.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <Button 
                              variant="link" 
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => document.querySelector('[value="content"]').click()}
                            >
                              No content added to feed yet. Click here to select content.
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Selection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    {contentTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={selectedContentType === type.id ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => handleContentTypeSelect(type.id)}
                      >
                        <type.icon className="w-4 h-4 mr-2" />
                        {type.name}
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Search content..." 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="border rounded-lg divide-y">
                    <div className="p-4 bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="select-all" 
                          checked={selectedContent.length === exampleContent[selectedContentType].length}
                          onCheckedChange={handleSelectAll}
                        />
                        <Label htmlFor="select-all" className="text-sm font-medium">Select All</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        {getActionButtons("selection")}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {exampleContent[selectedContentType].map((content) => (
                          <div key={content.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                            <Checkbox 
                              id={content.id}
                              checked={selectedContent.some((item) => item.id === content.id)}
                              onCheckedChange={() => handleContentSelect(content)}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                {selectedContentType === "articles" && <FileText className="w-4 h-4 text-gray-400" />}
                                {selectedContentType === "audio" && <FileAudio className="w-4 h-4 text-gray-400" />}
                                {selectedContentType === "video" && <Video className="w-4 h-4 text-gray-400" />}
                                <div className="font-medium">{content.title}</div>
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                Published by {content.author} • {content.date}
                              </div>
                            </div>
                            <Badge variant="secondary" className={content.statusColor}>
                              {content.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rules" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Auto-Inclusion Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Filter className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Content Type</div>
                        <div className="text-sm text-gray-600">Select types of content to include</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Add Rule
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Tags & Categories</div>
                        <div className="text-sm text-gray-600">Filter by tags and categories</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Add Rule
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Author & Organization</div>
                        <div className="text-sm text-gray-600">Filter by content creators</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Add Rule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="targeting" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Targeting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Language Selection */}
                  <div>
                    <Label className="text-base font-medium">Languages</Label>
                    <div className="mt-3 space-y-3">
                      {languages.map((lang) => (
                        <div key={lang.code} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{lang.flag}</span>
                            <div>
                              <div className="font-medium">{lang.name}</div>
                              <div className="text-sm text-gray-600">
                                {lang.code === "en" ? "Default" : "Additional"}
                              </div>
                            </div>
                          </div>
                          <Switch
                            checked={selectedLanguages.includes(lang.code)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedLanguages([...selectedLanguages, lang.code])
                              } else {
                                setSelectedLanguages(selectedLanguages.filter((code) => code !== lang.code))
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Organization Selection */}
                  <div>
                    <Label className="text-base font-medium">Organizations</Label>
                    <div className="mt-3 space-y-3">
                      {organizations.map((org) => (
                        <div key={org.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-medium">{org.name}</div>
                              <div className="text-sm text-gray-600">Team members: 12</div>
                            </div>
                          </div>
                          <Switch
                            checked={selectedOrgs.includes(org.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedOrgs([...selectedOrgs, org.id])
                              } else {
                                setSelectedOrgs(selectedOrgs.filter((id) => id !== org.id))
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feed Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Feed Information */}
                  <div>
                    <Label className="text-base font-medium mb-4">Feed Information</Label>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input 
                          id="title" 
                          placeholder="Enter feed title" 
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Enter feed description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Feed Type</Label>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={feedType === "manual"}
                                onCheckedChange={(checked) => setFeedType(checked ? "manual" : "auto")}
                              />
                              <span className="text-sm">Manual</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={feedType === "auto"}
                                onCheckedChange={(checked) => setFeedType(checked ? "auto" : "manual")}
                              />
                              <span className="text-sm">Auto</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label>Visibility</Label>
                          <Select value={visibility} onValueChange={setVisibility}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="org_only">Organization Only</SelectItem>
                              <SelectItem value="internal">Internal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Display Settings */}
                  <div>
                    <Label className="text-base font-medium">Display Settings</Label>
                    <div className="mt-3 space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Pin className="w-5 h-5 text-blue-500" />
                          <div>
                            <div className="font-medium">Pin Important Content</div>
                            <div className="text-sm text-gray-600">Keep important items at the top</div>
                          </div>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <ArrowUpDown className="w-5 h-5 text-blue-500" />
                          <div>
                            <div className="font-medium">Content Order</div>
                            <div className="text-sm text-gray-600">Set how content is ordered</div>
                          </div>
                        </div>
                        <Select defaultValue="recent">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="manual">Manual Order</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Version History */}
                  <div>
                    <Label className="text-base font-medium">Version History</Label>
                    <div className="mt-3 space-y-3">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Initial Version</div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Current
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Created by Simon Prusin</p>
                        <p className="text-xs text-gray-500 mt-1">Sep 12, 2024</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 
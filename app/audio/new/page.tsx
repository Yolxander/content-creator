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
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"

const versions = [
  { id: 1, name: "Version 1", date: "Aug 9, 2024", active: true, language: "English" },
  { id: 2, name: "Version 2", date: "Aug 8, 2024", active: false, language: "Spanish" },
  { id: 3, name: "Version 3", date: "Aug 7, 2024", active: false, language: "French" },
]

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
]

export default function NewAudioPage() {
  const [activeVersion, setActiveVersion] = useState(1)
  const [isPublished, setIsPublished] = useState(false)
  const [enableComments, setEnableComments] = useState(true)
  const [autoTranslate, setAutoTranslate] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [scheduleDate, setScheduleDate] = useState("")

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/audio">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-900">Create New Audio</h1>
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
                Save Audio
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex">
          {/* Left Panel */}
          <div className="w-2/3 p-6 overflow-auto">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="meta">Meta Tags</TabsTrigger>
                <TabsTrigger value="translation">Translation</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Audio Content
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Sparkles className="w-4 h-4 mr-1" />
                        AI Generated
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="audio">Audio File</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileAudio className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Upload audio file</p>
                        <p className="text-xs text-gray-500 mb-4">Supports MP3, WAV, M4A (max 500MB)</p>
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select author" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="adam">Adam Rogers</SelectItem>
                            <SelectItem value="mike">Mike Fitzgerald</SelectItem>
                            <SelectItem value="sarah">Sarah Johnson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="strategy">Strategy</SelectItem>
                            <SelectItem value="tech">Tech</SelectItem>
                            <SelectItem value="industry">Industry</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="meta" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Meta Tags & Transcript</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Meta Tags */}
                    <div>
                      <Label className="text-base font-medium">Meta Tags</Label>
                      <div className="mt-2 space-y-4">
                        <div>
                          <Label htmlFor="keywords">Keywords</Label>
                          <Input id="keywords" placeholder="Enter keywords separated by commas" />
                        </div>
                        <div>
                          <Label htmlFor="description">Meta Description</Label>
                          <Textarea id="description" placeholder="Enter meta description..." className="min-h-[80px]" />
                        </div>
                      </div>
                    </div>

                    {/* Transcript */}
                    <div>
                      <Label className="text-base font-medium">Transcript</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Upload transcript file</p>
                        <p className="text-xs text-gray-500 mb-4">Supports TXT, SRT, VTT (max 10MB)</p>
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="translation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Translation Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Auto-translation toggle */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Languages className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="font-medium">Auto-translation</div>
                          <div className="text-sm text-gray-600">Automatically translate to selected languages</div>
                        </div>
                      </div>
                      <Switch checked={autoTranslate} onCheckedChange={setAutoTranslate} />
                    </div>

                    {/* Language versions */}
                    <div>
                      <Label className="text-base font-medium">Language Versions</Label>
                      <div className="mt-3 space-y-3">
                        {languages.map((lang) => (
                          <div key={lang.code} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{lang.flag}</span>
                              <div>
                                <div className="font-medium">{lang.name}</div>
                                <div className="text-sm text-gray-600">
                                  {lang.code === "en" ? "Original" : "Translation"}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {lang.code === "en" ? (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Complete
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                  Pending
                                </Badge>
                              )}
                              <Button variant="outline" size="sm">
                                {lang.code === "en" ? "Edit" : "Translate"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Publishing Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Schedule Settings */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="font-medium">Schedule Publishing</div>
                          <div className="text-sm text-gray-600">Set a specific date and time for publishing</div>
                        </div>
                      </div>
                      <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                    </div>

                    {/* Date and Time Selection */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="publishDate">Publish Date</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <Input type="date" id="publishDate" />
                          <Input type="time" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC</SelectItem>
                            <SelectItem value="est">EST</SelectItem>
                            <SelectItem value="pst">PST</SelectItem>
                            <SelectItem value="gmt">GMT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Versions */}
          <div className="w-1/3 bg-white border-l border-gray-200 flex flex-col">
            {/* Version Controls */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Audio Versions</h3>
                <div className="flex items-center gap-2">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
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
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{version.language}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Last modified by Simon Prusin</div>
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
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

export default function NewArticlePage() {
  const [activeVersion, setActiveVersion] = useState(1)
  const [isPublished, setIsPublished] = useState(false)
  const [enableComments, setEnableComments] = useState(true)
  const [autoTranslate, setAutoTranslate] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/articles">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-900">Create New Article</h1>
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
                Save Article
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
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="translation">Translation</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Article Content
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Sparkles className="w-4 h-4 mr-1" />
                        AI Generated
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Enter article title" />
                      <div className="text-xs text-gray-500 mt-1">41/60 characters</div>
                    </div>
                    <div>
                      <Label htmlFor="summary">Summary</Label>
                      <Textarea id="summary" placeholder="Enter article summary..." className="min-h-[80px]" />
                      <div className="text-xs text-gray-500 mt-1">248/250 characters</div>
                    </div>
                    <div>
                      <Label htmlFor="body">Body</Label>
                      <Textarea id="body" placeholder="Write your article content here..." className="min-h-[300px]" />
                      <div className="text-xs text-gray-500 mt-1">Rich text editor with formatting options</div>
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
                            <SelectItem value="seo">SEO</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Media Assets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Video Upload */}
                    <div>
                      <Label className="text-base font-medium">Video (Multi-platform)</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Upload video files</p>
                        <p className="text-xs text-gray-500 mb-4">Supports MP4, MOV, AVI (max 500MB)</p>
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    {/* Images Upload */}
                    <div>
                      <Label className="text-base font-medium">Images</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Upload images</p>
                        <p className="text-xs text-gray-500 mb-4">Supports JPG, PNG, WebP (max 10MB each)</p>
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Images
                        </Button>
                      </div>
                    </div>

                    {/* Subtitles */}
                    <div>
                      <Label className="text-base font-medium">Subtitles</Label>
                      <div className="mt-2 space-y-2">
                        {languages.slice(0, 3).map((lang) => (
                          <div key={lang.code} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{lang.flag}</span>
                              <span className="font-medium">{lang.name}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-1" />
                              Upload SRT
                            </Button>
                          </div>
                        ))}
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

                    {/* Approval workflow */}
                    <div>
                      <Label className="text-base font-medium">Approval Workflow</Label>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">Require approval for translations</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">Auto-publish approved translations</span>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Article Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">Featured Article</span>
                      </div>
                      <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">Enable Comments</span>
                      </div>
                      <Switch checked={enableComments} onCheckedChange={setEnableComments} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">SEO Optimization</span>
                      </div>
                      <Switch defaultChecked />
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
                <h3 className="font-medium text-gray-900">Article Versions</h3>
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

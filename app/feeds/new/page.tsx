"use client"

import { useState, useEffect } from "react"
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
import { useToast } from "@/hooks/use-toast"
import { createSimpleFeed, Feed, FeedContent } from "@/actions/feed-actions"
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
import { FeedsSidebar } from "@/components/feeds/FeedsSidebar"

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

// Mock feed data for development
const mockFeed = {
  name: '',
  description: '',
  sourceUrl: '',
  schedule: 'daily',
  lastFetched: null,
  status: 'draft',
}

export default function NewFeedPage() {
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState('details')
  const [activeSubsection, setActiveSubsection] = useState<string | undefined>()
  const [feed, setFeed] = useState(mockFeed)
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
  const [isLoading, setIsLoading] = useState(false)
  const [programId, setProgramId] = useState<number>(1) // Default program ID

  const handleContentSelect = (content) => {
    if (selectedContent.find((item) => item.id === content.id)) {
      setSelectedContent(selectedContent.filter((item) => item.id !== content.id));
      toast({
        title: "Content Removed",
        description: `${content.title} has been removed from selection`,
      })
    } else {
      setSelectedContent([...selectedContent, content]);
      toast({
        title: "Content Added",
        description: `${content.title} has been added to selection`,
      })
    }
  };

  const handleSelectAll = (contentType) => {
    const currentTypeContent = exampleContent[contentType];
    if (selectedContent.length === currentTypeContent.length) {
      setSelectedContent([]);
    } else {
      setSelectedContent(currentTypeContent);
    }
  };

  const handleSectionChange = (section: string, subsection?: string) => {
    setActiveSection(section)
    setActiveSubsection(subsection)
    
    if (subsection) {
      // Find the element and scroll to it
      const element = document.getElementById(subsection)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const handleSaveFeed = async () => {
    if (!feed.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a feed name",
        variant: "destructive",
      })
      return
    }

    if (!feed.description.trim()) {
      toast({
        title: "Error",
        description: "Please enter a feed description",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Prepare content data if any content is selected
      let contentData: Partial<FeedContent> | undefined
      if (selectedContent.length > 0) {
        const firstContent = selectedContent[0]
        contentData = {
          title: firstContent.title,
          description: `Content from ${firstContent.author}`,
          type: firstContent.id.startsWith('a') ? 'Article' : 'Audio',
          content_url: `https://example.com/content/${firstContent.id}`,
          metadata: {
            author: firstContent.author,
            date: firstContent.date,
            status: firstContent.status
          }
        }
      }

      const result = await createSimpleFeed(
        feed.name,
        feed.description,
        programId,
        contentData
      )

      if (result.success) {
        toast({
          title: "Success",
          description: "Feed created successfully!",
        })
        
        // Reset form
        setFeed(mockFeed)
        setSelectedContent([])
        setActiveSection('details')
        
        // Optionally redirect to feeds list
        // router.push('/feeds')
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create feed",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error creating feed:', error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while creating the feed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form
    setFeed(mockFeed)
    setSelectedContent([])
    setActiveSection('details')
    
    toast({
      title: "Cancelled",
      description: "Feed creation cancelled",
    })
  }

  const renderFeedSection = () => {
    switch (activeSection) {
      case 'details':
  return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Feed Details</h3>
              <p className="text-sm text-gray-500">Basic information about your feed</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Feed Name</label>
                <Input
                  type="text"
                  placeholder="Enter feed name"
                  className="mt-1"
                  value={feed.name}
                  onChange={(e) => setFeed({ ...feed, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  rows={3}
                  placeholder="Enter feed description"
                  value={feed.description}
                  onChange={(e) => setFeed({ ...feed, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Program</label>
                <Select value={programId.toString()} onValueChange={(value) => setProgramId(parseInt(value))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Program 1</SelectItem>
                    <SelectItem value="2">Program 2</SelectItem>
                    <SelectItem value="3">Program 3</SelectItem>
                    <SelectItem value="4">Program 4</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  Select the program this feed will be associated with
                </p>
              </div>
            </div>
          </div>
        );
      case 'content':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Content Selection</h3>
              <p className="text-sm text-gray-500">Manage content connected to this feed</p>
            </div>
            <div className="space-y-6">
              {/* Connected Content Section */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-base font-medium">Connected Content</h4>
                    <p className="text-sm text-gray-500">Content currently connected to this feed</p>
                      </div>
                      <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Connect Content
                    </Button>
                      </div>
                    </div>
                                    <div className="space-y-4">
                {selectedContent.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No content connected to this feed yet</p>
                    <p className="text-sm">Select content from the tabs above to add to your feed</p>
                  </div>
                ) : (
                  selectedContent.map((content) => (
                    <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          {content.id.startsWith('a') ? (
                            <FileText className="h-5 w-5 text-gray-500" />
                          ) : (
                            <FileAudio className="h-5 w-5 text-gray-500" />
                          )}
                          <div>
                                <div className="font-medium">{content.title}</div>
                            <div className="text-sm text-gray-500">
                              By {content.author} • {content.date}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                          {content.id.startsWith('a') ? 'Article' : 'Audio'}
                        </Badge>
                        <Select defaultValue="public">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                            <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => {
                            // Handle detach content
                            setSelectedContent(selectedContent.filter(item => item.id !== content.id))
                            toast({
                              title: "Content Removed",
                              description: `${content.title} has been removed from the feed`,
                            })
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                            </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              </div>

              {/* Feed Settings */}
              <div className="bg-white rounded-lg border p-6">
                <h4 className="text-base font-medium mb-4">Feed Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Default Content Visibility</div>
                      <div className="text-sm text-gray-500">Set default visibility for newly connected content</div>
                    </div>
                    <Select defaultValue="public">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Auto-connect New Content</div>
                      <div className="text-sm text-gray-500">Automatically connect new content to this feed</div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'configuration':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Feed Configuration</h3>
              <p className="text-sm text-gray-500">Configure feed settings and behavior</p>
            </div>
            <div className="space-y-6">
              {/* Source Settings */}
              <div id="source" className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-base font-medium">Source Settings</h4>
                    <p className="text-sm text-gray-500">Configure the source URL and parsing options</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Source URL</label>
                    <Input 
                      type="url"
                      placeholder="https://example.com/feed"
                      className="mt-1"
                      value={feed.sourceUrl}
                      onChange={(e) => setFeed({ ...feed, sourceUrl: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Schedule Settings */}
              <div id="schedule" className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-base font-medium">Schedule</h4>
                    <p className="text-sm text-gray-500">Set up when and how often to fetch the feed</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Update Frequency</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      value={feed.schedule}
                      onChange={(e) => setFeed({ ...feed, schedule: e.target.value })}
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Targeting Settings */}
              <div id="targeting" className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-base font-medium">Targeting</h4>
                    <p className="text-sm text-gray-500">Configure audience targeting settings</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Targeting settings will be available soon.</p>
                  </div>
                </div>
              </div>

              {/* Rules Settings */}
              <div id="rules" className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-base font-medium">Rules</h4>
                    <p className="text-sm text-gray-500">Configure content inclusion rules</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Rules configuration will be available soon.</p>
                  </div>
                </div>
              </div>

              {/* Analytics Settings */}
              <div id="analytics" className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-base font-medium">Analytics</h4>
                    <p className="text-sm text-gray-500">View feed performance and statistics</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Analytics will be available after the feed is created and starts fetching content.</p>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div id="advanced" className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-base font-medium">Advanced Settings</h4>
                    <p className="text-sm text-gray-500">Configure advanced feed options</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Enable automatic content categorization
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Enable content deduplication
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'content-articles':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Article Selection</h3>
              <p className="text-sm text-gray-500">Select articles to include in your feed</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                    id="select-all-articles"
                    checked={selectedContent.length === exampleContent.articles.length}
                    onCheckedChange={() => handleSelectAll('articles')}
                        />
                  <Label htmlFor="select-all-articles">Select All Articles</Label>
                      </div>
                    </div>
              <div className="space-y-2">
                {exampleContent.articles.map((content) => (
                  <div key={content.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <Checkbox 
                              id={content.id}
                              checked={selectedContent.some((item) => item.id === content.id)}
                              onCheckedChange={() => handleContentSelect(content)}
                            />
                    <div className="flex-1">
                                <div className="font-medium">{content.title}</div>
                      <div className="text-sm text-gray-500">
                        By {content.author} • {content.date}
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
        );
      case 'content-audio':
        return (
          <div className="space-y-6">
                      <div>
              <h3 className="text-lg font-medium">Audio Selection</h3>
              <p className="text-sm text-gray-500">Select audio content to include in your feed</p>
                      </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                  <Checkbox
                    id="select-all-audio"
                    checked={selectedContent.length === exampleContent.audio.length}
                    onCheckedChange={() => handleSelectAll('audio')}
                  />
                  <Label htmlFor="select-all-audio">Select All Audio</Label>
                      </div>
                    </div>
              <div className="space-y-2">
                {exampleContent.audio.map((content) => (
                  <div key={content.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox
                      id={content.id}
                      checked={selectedContent.some((item) => item.id === content.id)}
                      onCheckedChange={() => handleContentSelect(content)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{content.title}</div>
                      <div className="text-sm text-gray-500">
                        By {content.author} • {content.date}
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
        );
      default:
        return null;
                              }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <FeedsSidebar activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                {activeSection === 'details' ? 'Create New Feed' : 
                 activeSection === 'content-articles' ? 'Article Selection' :
                 activeSection === 'content-audio' ? 'Audio Selection' :
                 activeSection === 'configuration' ? 'Feed Configuration' :
                 'Create New Feed'}
              </h1>
              {activeSection === 'details' && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  DRAFT
                </Badge>
              )}
                            </div>
                            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveFeed}
                disabled={isLoading || !feed.name.trim() || !feed.description.trim()}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  'Save Feed'
                )}
              </Button>
                    </div>
                  </div>

          {/* Search */}
                        <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search feed settings..." className="pl-9 w-64" />
                      </div>
                    </div>

          {/* Feed Summary */}
          {activeSection === 'details' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-medium text-blue-900">Feed Summary</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Name:</span>
                  <span className="ml-2 text-blue-900">
                    {feed.name || 'Not set'}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">Program:</span>
                  <span className="ml-2 text-blue-900">
                    Program {programId}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">Content Items:</span>
                  <span className="ml-2 text-blue-900">
                    {selectedContent.length} selected
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">Status:</span>
                  <span className="ml-2 text-blue-900">
                    {feed.name && feed.description ? 'Ready to create' : 'Incomplete'}
                  </span>
                </div>
              </div>
            </div>
          )}
                  </div>

        {/* Feed Content */}
        <div className="flex-1 overflow-auto p-6">
          {renderFeedSection()}
        </div>
      </div>
    </div>
  );
} 
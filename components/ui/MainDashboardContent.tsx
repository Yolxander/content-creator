"use client"

import { useState, useEffect } from "react"
import { BookOpen, ChevronRight, Upload, Plus, Search, Filter, Grid3X3, List, Edit, MoreHorizontal, Trash2, ChevronDown, FileText, Headphones, Layers, Rss, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import ArticleWizard from "@/app/content/wizards/ArticleWizard"
import AudioWizard from "@/app/content/wizards/AudioWizard"
import ModuleWizard from "@/app/content/wizards/ModuleWizard"
import FeedWizard from "@/app/content/wizards/FeedWizard"
import { DateRange } from "react-day-picker"
import { useSearchParams, useRouter } from "next/navigation"

const courses = [
  {
    id: 1,
    title: "Management 101",
    status: "Draft",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "07/03/2025",
    version: "Version 1",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Leading with Impact: Strategies for Effective Leadership",
    status: "Published",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "21/05/2025",
    version: "Version 2",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Unleashing Creativity: Innovative Thinking for the Modern Workplace",
    status: "Published",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "17/03/2025",
    version: "Version 4",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "Code Mastery: From Basics to Advanced Programming Techniques",
    status: "In Review",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "24/05/2025",
    version: "Version 1",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    title: "Team Dynamics: Building Cohesion and Collaboration",
    status: "Published",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "24/07/2024",
    version: "Version 3",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    title: "Agile Mindset: Navigating Change in a Fast-Paced World",
    status: "In Review",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "19/05/2025",
    version: "Version 1",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    title: "Data-Driven Decisions: Harnessing Analytics for Business Success",
    status: "Published",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "30/04/2025",
    version: "Version 1",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    title: "Emotional Intelligence: The Key to Personal and Professional Growth",
    status: "Published",
    language: "🇫🇷🇬🇧",
    lastEdit: "3 days ago",
    createdOn: "12/07/2023",
    version: "Version 1",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Draft":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    case "In Review":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export default function MainDashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedCourses, setSelectedCourses] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [wizardStep, setWizardStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [contentType, setContentType] = useState("articles")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [articleData, setArticleData] = useState({
    title: "",
    summary: "",
    body: "",
    author: "",
    category: "",
    media: [],
    subtitles: [],
    translations: [],
    autoTranslate: false,
    approvals: []
  })
  const [audioData, setAudioData] = useState({
    title: "",
    description: "",
    languages: [],
    metaTags: [],
    transcripts: [],
    publishDate: "",
    autoTranslate: false,
    approvals: []
  })

  // Sync contentType with URL query param
  useEffect(() => {
    const typeParam = searchParams.get("type")
    if (typeParam && ["articles", "audio", "modules", "feeds"].includes(typeParam)) {
      setContentType(typeParam)
    } else {
      setContentType("articles")
    }
  }, [searchParams])

  // When user changes type via UI, update the URL
  const handleTypeChange = (value: string) => {
    setContentType(value)
    router.replace(`/content?type=${value}`)
  }

  // Example audio data
  const audioDataExample = [
    {
      id: 1,
      title: "Intro to Podcasting",
      status: "Published",
      language: "🇫🇷🇬🇧",
      lastEdit: "2 days ago",
      duration: "12:34",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Music Theory Basics",
      status: "Draft",
      language: "🇫🇷🇬🇧",
      lastEdit: "5 days ago",
      duration: "08:21",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Example modules data
  const modulesData = [
    {
      id: 1,
      title: "React Basics Module",
      status: "Published",
      language: "🇫🇷🇬🇧",
      lastEdit: "1 day ago",
      lessons: 8,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Advanced CSS Module",
      status: "Draft",
      language: "🇫🇷🇬🇧",
      lastEdit: "4 days ago",
      lessons: 5,
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Example feeds data
  const feedsData = [
    {
      id: 1,
      title: "Tech News Feed",
      status: "Published",
      language: "🇫🇷🇬🇧",
      lastEdit: "6 hours ago",
      source: "RSS",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Design Weekly",
      status: "Draft",
      language: "🇫🇷🇬🇧",
      lastEdit: "2 days ago",
      source: "Atom",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const isFeeds = contentType === "feeds"
  const isModules = contentType === "modules"
  const isAudio = contentType === "audio"
  const data = isFeeds ? feedsData : isModules ? modulesData : isAudio ? audioDataExample : courses

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCourses(data.map((item) => item.id))
    } else {
      setSelectedCourses([])
    }
  }

  const handleSelectCourse = (courseId: number, checked: boolean) => {
    if (checked) {
      setSelectedCourses([...selectedCourses, courseId])
    } else {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId))
    }
  }

  const handleCreateClick = () => {
    setIsCreating(true)
  }

  const handleBackToList = () => {
    setIsCreating(false)
    setWizardStep(1)
    setArticleData({
      title: "",
      summary: "",
      body: "",
      author: "",
      category: "",
      media: [],
      subtitles: [],
      translations: [],
      autoTranslate: false,
      approvals: []
    })
    setAudioData({
      title: "",
      description: "",
      languages: [],
      metaTags: [],
      transcripts: [],
      publishDate: "",
      autoTranslate: false,
      approvals: []
    })
  }

  const handleSubmit = (data: any) => {
    console.log("Submitted data:", data)
    setIsCreating(false)
  }

  const renderWizardStep = () => {
    if (contentType === "articles") {
      switch (wizardStep) {
        case 1:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Basic Information</h3>
              <Input 
                placeholder="Title" 
                required 
                value={articleData.title}
                onChange={(e) => setArticleData({...articleData, title: e.target.value})}
                className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
              />
              <Input 
                placeholder="Summary" 
                required 
                value={articleData.summary}
                onChange={(e) => setArticleData({...articleData, summary: e.target.value})}
                className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
              />
              <Textarea 
                placeholder="Body" 
                rows={6} 
                required 
                value={articleData.body}
                onChange={(e) => setArticleData({...articleData, body: e.target.value})}
                className="rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
              />
            </div>
          )
        case 2:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Author & Category</h3>
              <Input 
                placeholder="Author" 
                required 
                value={articleData.author}
                onChange={(e) => setArticleData({...articleData, author: e.target.value})}
                className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
              />
              <Input 
                placeholder="Category" 
                required 
                value={articleData.category}
                onChange={(e) => setArticleData({...articleData, category: e.target.value})}
                className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
              />
            </div>
          )
        case 3:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Media Upload</h3>
              <div className="space-y-4 bg-[#f6f3ef] p-4 rounded-xl">
                <div className="space-y-2">
                  <label className="text-sm text-[#b6b0a6]">Images & Videos</label>
                  <Input 
                    type="file" 
                    accept="image/*,video/*" 
                    multiple 
                    className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#b6b0a6]">Subtitles</label>
                  <Input 
                    type="file" 
                    accept=".vtt,.srt" 
                    multiple 
                    className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                  />
                </div>
              </div>
            </div>
          )
        case 4:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Translation & Approval</h3>
              <div className="space-y-4 bg-[#f6f3ef] p-4 rounded-xl">
                <div className="space-y-2">
                  <label className="text-sm text-[#b6b0a6]">Translation per field</label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-fit rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                  >
                    Add Translation
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="auto-translation" 
                    className="accent-[#05AFF2]"
                    checked={articleData.autoTranslate}
                    onChange={(e) => setArticleData({...articleData, autoTranslate: e.target.checked})}
                  />
                  <label htmlFor="auto-translation" className="text-sm">Enable Auto-translation</label>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#b6b0a6]">Approval per language version</label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-fit rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                  >
                    Manage Approvals
                  </Button>
                </div>
              </div>
            </div>
          )
      }
    } else if (contentType === "audio") {
      switch (wizardStep) {
        case 1:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Basic Information</h3>
              <Input 
                placeholder="Title" 
                required 
                value={audioData.title}
                onChange={(e) => setAudioData({...audioData, title: e.target.value})}
                className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
              />
              <Textarea 
                placeholder="Description" 
                rows={4} 
                required 
                value={audioData.description}
                onChange={(e) => setAudioData({...audioData, description: e.target.value})}
                className="rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
              />
            </div>
          )
        case 2:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Language Uploads</h3>
              <div className="space-y-4 bg-[#f6f3ef] p-4 rounded-xl">
                <div className="space-y-2">
                  <label className="text-sm text-[#b6b0a6]">Audio Files</label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-base">🇬🇧</span>
                      <Input 
                        type="file" 
                        accept="audio/*" 
                        className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base">🇫🇷</span>
                      <Input 
                        type="file" 
                        accept="audio/*" 
                        className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-fit rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                    >
                      Add Language
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        case 3:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Meta Tags & Transcripts</h3>
              <div className="space-y-4 bg-[#f6f3ef] p-4 rounded-xl">
                <div className="space-y-2">
                  <label className="text-sm text-[#b6b0a6]">Meta Tags</label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add meta tag" 
                      className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="px-3 py-1 rounded-full bg-[#e6f8fd] text-[#05AFF2]">
                      podcast
                      <button className="ml-2 text-[#05AFF2] hover:text-[#059fd2]">×</button>
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 rounded-full bg-[#e6f8fd] text-[#05AFF2]">
                      audio
                      <button className="ml-2 text-[#05AFF2] hover:text-[#059fd2]">×</button>
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#b6b0a6]">Transcripts</label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-base">🇬🇧</span>
                      <Input 
                        type="file" 
                        accept=".txt,.srt,.vtt" 
                        className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base">🇫🇷</span>
                      <Input 
                        type="file" 
                        accept=".txt,.srt,.vtt" 
                        className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        case 4:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Publishing & Translation</h3>
              <div className="space-y-4 bg-[#f6f3ef] p-4 rounded-xl">
                <div className="space-y-2">
                  <label className="text-sm text-[#b6b0a6]">Schedule Publishing</label>
                  <Input 
                    type="datetime-local" 
                    className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                    value={audioData.publishDate}
                    onChange={(e) => setAudioData({...audioData, publishDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#b6b0a6]">Auto-translation</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="audio-auto-translate" 
                      className="accent-[#05AFF2]"
                      checked={audioData.autoTranslate}
                      onChange={(e) => setAudioData({...audioData, autoTranslate: e.target.checked})}
                    />
                    <label htmlFor="audio-auto-translate" className="text-sm">Enable auto-translation for titles and descriptions</label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#b6b0a6]">Language-specific Review</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🇬🇧</span>
                        <span>English</span>
                      </div>
                      <Select defaultValue="pending">
                        <SelectTrigger className="w-32 rounded-full border-[#e7e3de]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🇫🇷</span>
                        <span>French</span>
                      </div>
                      <Select defaultValue="pending">
                        <SelectTrigger className="w-32 rounded-full border-[#e7e3de]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f6f3ef] p-4 pt-2 h-screen">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-base text-[#05AFF2] mb-2">
          <span>Content</span>
          <ChevronRight className="w-4 h-4 mx-1 text-[#05AFF2]" />
          {isFeeds ? (
            <Rss className="w-5 h-5 text-[#05AFF2]" />
          ) : isModules ? (
            <Layers className="w-5 h-5 text-[#05AFF2]" />
          ) : isAudio ? (
            <Headphones className="w-5 h-5 text-[#05AFF2]" />
          ) : (
            <FileText className="w-5 h-5 text-[#05AFF2]" />
          )}
          <span className="text-[#05AFF2] font-bold ml-1">{isFeeds ? "Feeds" : isModules ? "Modules" : isAudio ? "Audio" : "Articles"}</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-[#05AFF2] tracking-tight">
            {isCreating
              ? `Create New ${
                  contentType === "audio"
                    ? "Audio"
                    : contentType === "modules"
                    ? "Module"
                    : contentType === "feeds"
                    ? "Feed"
                    : "Article"
                }`
              : "Content Management"}
          </h1>
          <div className="flex gap-3">
            {isCreating ? (
              <Button
                onClick={handleBackToList}
                className="bg-white text-[#05AFF2] rounded-full px-6 py-3 flex gap-2 shadow-md border border-[#05AFF2] hover:bg-[#e6f8fd] font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                Exit
              </Button>
            ) : (
              <>
                <Button className="bg-white text-[#05AFF2] rounded-full px-6 py-3 flex gap-2 shadow-md border border-[#05AFF2] hover:bg-[#e6f8fd] font-semibold">
                  <Upload className="w-5 h-5" />
                  Import
                </Button>
                <Button
                  className="bg-[#05AFF2] text-white rounded-full px-6 py-3 flex gap-2 shadow-md hover:bg-[#059fd2] font-semibold"
                  onClick={handleCreateClick}
                >
                  <Plus className="w-5 h-5 text-white" />
                  Create
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      {!isCreating && (
        <div className="flex items-center gap-3 mt-4 mb-4 bg-white rounded-3xl px-6 py-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#05AFF2] w-6 h-6" />
            <Input placeholder="Search..." className="pl-16 h-14 rounded-full border-none bg-white text-base focus:ring-2 focus:ring-[#F2C438]" />
          </div>
          <Select value={contentType} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-32 h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="articles">Articles</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="modules">Modules</SelectItem>
              <SelectItem value="feeds">Feeds</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40 h-14 rounded-full border-none bg-white text-base focus:ring-2 focus:ring-[#F2C438]">
              <SelectValue placeholder="Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Languages</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-white text-[#05AFF2] rounded-full h-14 px-6 flex gap-2 border border-[#05AFF2] font-semibold focus:ring-2 focus:ring-[#F2C438]">
            <Filter className="w-6 h-6" />
            Filters
            <ChevronDown className="w-5 h-5" />
          </Button>
          <div className="flex border border-[#05AFF2] rounded-full overflow-hidden ml-2 bg-white ">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={`rounded-none ${viewMode === "grid" ? "bg-[#e6f8fd] text-[#05AFF2]" : "bg-white text-[#05AFF2]"}`}
            >
              <Grid3X3 className="w-6 h-6" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={`rounded-none ${viewMode === "list" ? "bg-[#e6f8fd] text-[#05AFF2]" : "bg-white text-[#05AFF2]"}`}
            >
              <List className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-3xl shadow-md border border-[#e7e3de] overflow-hidden min-h-[500px] flex flex-col  mt-4">
        {isCreating ? (
          contentType === "articles" ? (
            <ArticleWizard onBack={handleBackToList} onSubmit={handleSubmit} />
          ) : contentType === "audio" ? (
            <AudioWizard onBack={handleBackToList} onSubmit={handleSubmit} />
          ) : contentType === "modules" ? (
            <ModuleWizard onBack={handleBackToList} onSubmit={handleSubmit} />
          ) : contentType === "feeds" ? (
            <FeedWizard onBack={handleBackToList} onSubmit={handleSubmit} />
          ) : null
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-0 py-5 px-8 bg-[#f6f3ef] text-sm text-[#05AFF2] items-center sticky top-0 z-10">
              <div className="col-span-1 flex items-center px-4">
                <Checkbox checked={selectedCourses.length === data.length} onCheckedChange={handleSelectAll} className="accent-[#05AFF2] scale-110" />
              </div>
              <div className="col-span-4 flex items-center gap-2 px-4">
                {isFeeds ? <Rss className="w-6 h-6 text-[#05AFF2]" /> : isModules ? <Layers className="w-6 h-6 text-[#05AFF2]" /> : isAudio ? <Headphones className="w-6 h-6 text-[#05AFF2]" /> : <FileText className="w-6 h-6 text-[#05AFF2]" />}
                <span>Title</span>
              </div>
              <div className="col-span-1 px-4">Status</div>
              <div className="col-span-1 px-4">Language</div>
              <div className="col-span-2 text-right px-4">Last edit</div>
              {isFeeds ? (
                <div className="col-span-2 text-right px-4">Source</div>
              ) : isModules ? (
                <div className="col-span-2 text-right px-4">Lessons</div>
              ) : isAudio ? (
                <div className="col-span-2 text-right px-4">Duration</div>
              ) : (
                <div className="col-span-2 text-right px-4">Version</div>
              )}
              <div className="col-span-1 px-4 text-right">Actions</div>
            </div>
            {/* Table Body */}
            <div className="overflow-y-auto flex-1">
              {data.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-0 px-2 py-6 items-center border-t border-[#f6f3ef] hover:bg-[#f6f3ef] group text-sm">
                  <div className="col-span-1 flex items-center px-4">
                    <Checkbox
                      checked={selectedCourses.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectCourse(item.id, checked as boolean)}
                      className="accent-[#05AFF2] scale-110"
                    />
                  </div>
                  <div className="col-span-4 flex items-center gap-3 min-w-0 px-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-14 h-14 rounded-2xl object-cover border border-[#e7e3de] shadow-sm"
                    />
                    <span className="truncate text-base text-[#181A20]">{item.title}</span>
                  </div>
                  <div className="col-span-1 px-4">
                    <Badge variant="secondary" className={getStatusColor(item.status) + " px-4 py-2 rounded-full text-xs"}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="col-span-1 flex items-center gap-1 px-4">
                    <span className="text-base">🇫🇷</span>
                    <span className="text-base">🇬🇧</span>
                    <span className="ml-1 text-[10px] bg-[#f6f3ef] text-[#05AFF2] rounded-full px-2 py-0.5">+3</span>
                  </div>
                  <div className="col-span-2 text-right text-xs text-[#b6b0a6] px-4 whitespace-nowrap">{item.lastEdit}</div>
                  {isFeeds ? (
                    <div className="col-span-2 text-right text-xs text-[#181A20] px-4 whitespace-nowrap">{'source' in item ? item.source : ''}</div>
                  ) : isModules ? (
                    <div className="col-span-2 text-right text-xs text-[#181A20] px-4 whitespace-nowrap">{'lessons' in item ? item.lessons : ''}</div>
                  ) : isAudio ? (
                    <div className="col-span-2 text-right text-xs text-[#181A20] px-4 whitespace-nowrap">{'duration' in item ? item.duration : ''}</div>
                  ) : (
                    <div className="col-span-2 text-right text-xs text-[#181A20] px-4 whitespace-nowrap">{'version' in item ? (<span>Version</span>) : ''} {'version' in item ? item.version.replace('Version ', '') : ''}</div>
                  )}
                  <div className="col-span-1 flex items-center justify-end gap-2 px-4">
                    <Button variant="ghost" size="icon" className="hover:bg-[#e6f8fd] rounded-full">
                      <Edit className="w-5 h-5 text-[#05AFF2]" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-[#e6f8fd] rounded-full">
                          <MoreHorizontal className="w-5 h-5 text-[#05AFF2]" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Selection Bar */}
      {selectedCourses.length > 0 && !isCreating && (
        <div className="fixed left-1/2 bottom-8 -translate-x-1/2 z-50 bg-[#05AFF2] text-white px-10 py-4 rounded-full shadow-2xl flex items-center gap-8 min-w-[360px] justify-center">
          <span className="text-lg font-semibold">{selectedCourses.length} selected</span>
          <Button variant="ghost" size="icon" onClick={() => setSelectedCourses([])} className="text-white">
            ✕
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Edit className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Trash2 className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>
      )}
    </div>
  )
} 
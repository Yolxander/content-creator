"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getArticle } from "@/actions/article-actions"
import { fetchUserOrganizationProgramsSafe } from "@/actions/program-actions"
import { getArticleCategoriesForDropdown } from "@/actions/article-actions"
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
  User,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { TranslationEditModal } from "@/components/TranslationEditModal"
import { InitialTranslationModal } from "@/components/InitialTranslationModal"
import { ArticleSidebar } from "@/components/articles/ArticleSidebar"

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

export default function EditArticlePage() {
  const params = useParams()
  const articleId = params.id as string
  
  const [activeVersion, setActiveVersion] = useState(1)
  const [isPublished, setIsPublished] = useState(false)
  const [enableComments, setEnableComments] = useState(true)
  const [autoTranslate, setAutoTranslate] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState(["en"])
  const [selectedOrgs, setSelectedOrgs] = useState([])
  const [autoRules, setAutoRules] = useState([])
  const [activeSection, setActiveSection] = useState("content")
  const [isTranslationModalOpen, setIsTranslationModalOpen] = useState(false)
  const [selectedLanguageForTranslation, setSelectedLanguageForTranslation] = useState<typeof languages[0] | null>(null)
  const [summary, setSummary] = useState("")
  const [isInitialTranslationModalOpen, setIsInitialTranslationModalOpen] = useState(false)
  const [isTranslationOptionsModalOpen, setIsTranslationOptionsModalOpen] = useState(false)
  const [articleData, setArticleData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [programs, setPrograms] = useState<Array<{id: number, name: string}>>([])
  const [categories, setCategories] = useState<any[]>([])
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(false)
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)
  
  // Media form state
  const [mediaForm, setMediaForm] = useState({
    thumbnail: "",
    youtube: "",
    vimeo: "",
    humancontact_video: "",
    qumu: ""
  })
  
  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    is_featured: false,
    program_id: 58,
    category_id: "",
    is_show_track_articles_only: false,
    article_date_and_time: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: ""
  })

  // Fetch article details when component mounts
  useEffect(() => {
    console.log('EditArticlePage component mounted, article ID:', articleId)
    
    const fetchArticleDetails = async () => {
      if (!articleId) {
        console.log('No article ID provided')
        return
      }
      
      try {
        setLoading(true)
        console.log('Fetching article details for ID:', articleId)
        
        const response = await getArticle({
          article_id: parseInt(articleId),
          locale: 'en'
        })
        
        console.log('Article details API response:', response)
        
        if (response && response.data) {
          const article = response.data
          setArticleData(article)
          
          // Populate form fields with article data
          setTitle(article.article_name || article.title || '')
          setSummary(article.summary || '')
          setContent(article.article_body || '')
          setAuthor(article.author || article.article_author || '')
          setCategory(article.category?.id?.toString() || '')
          
          // Populate media form fields
          if (article.translation) {
            setMediaForm({
              thumbnail: article.translation.thumbnail || '',
              youtube: article.translation.youtube || '',
              vimeo: article.translation.vimeo || '',
              humancontact_video: article.translation.humancontact_video || '',
              qumu: article.translation.qumu || ''
            })
          }
          
          // Populate settings form fields
          setSettingsForm({
            is_featured: article.is_featured === 1 || false,
            program_id: article.program?.id || 58,
            is_show_track_articles_only: false, // Default value
            article_date_and_time: article.article_date_and_time || '',
            start_date: article.start_date || '',
            start_time: article.start_time || '',
            end_date: article.end_date || '',
            end_time: article.end_time || ''
          })
          
          console.log('Article data populated:', {
            title: article.article_name || article.title,
            summary: article.summary,
            content: article.article_body,
            author: article.author || article.article_author,
            category: article.category,
            media: {
              thumbnail: article.translation?.thumbnail,
              youtube: article.translation?.youtube,
              vimeo: article.translation?.vimeo,
              humancontact_video: article.translation?.humancontact_video,
              qumu: article.translation?.qumu
            },
            settings: {
              is_featured: article.is_featured,
              program_id: article.program?.id,
              article_date_and_time: article.article_date_and_time,
              start_date: article.start_date,
              start_time: article.start_time,
              end_date: article.end_date,
              end_time: article.end_time
            }
          })
        }
      } catch (error) {
        console.error('Error fetching article details:', error)
      } finally {
        setLoading(false)
        console.log('Article details loading completed')
      }
    }

    fetchArticleDetails()
  }, [articleId])

  // Load programs and categories
  useEffect(() => {
    const loadData = async () => {
      // Load programs from localStorage (same as articles page)
      setIsLoadingPrograms(true)
      try {
        const storedPrograms = localStorage.getItem('currentOrganizationPrograms')
        if (storedPrograms) {
          const parsedPrograms = JSON.parse(storedPrograms)
          const transformedPrograms = parsedPrograms.map((program: any) => ({
            id: program.program_id,
            name: program.name
          }))
          setPrograms(transformedPrograms)
        }
      } catch (error) {
        console.error('Failed to load programs:', error)
      } finally {
        setIsLoadingPrograms(false)
      }

      // Load categories based on selected program
      setIsLoadingCategories(true)
      try {
        if (settingsForm.program_id) {
          const categoriesData = await getArticleCategoriesForDropdown(settingsForm.program_id, 'en')
          setCategories(categoriesData)
        }
      } catch (error) {
        console.error('Failed to load categories:', error)
        setCategories([])
      } finally {
        setIsLoadingCategories(false)
      }
    }

    loadData()
  }, [settingsForm.program_id])

  // Calculate completion status for each section
  const getSectionStatus = () => {
    const status = {
      content: false,
      media: false,
      translation: false,
      settings: false,
    }

    // Content section validation
    status.content = title.trim() !== "" && content.trim() !== ""

    // Media section validation
    status.media = true // Optional for articles

    // Translation section validation
    status.translation = selectedLanguages.length > 0

    // Settings section validation
    status.settings = true // Always true as it's optional

    return status
  }

  const sectionStatus = getSectionStatus()
  const completionPercentage = Math.round(
    (Object.values(sectionStatus).filter(Boolean).length / Object.keys(sectionStatus).length) * 100
  )

  const handleTranslationSave = (translation: { title: string; summary: string; content: string }) => {
    // TODO: Implement saving translation
    console.log("Saving translation:", translation)
  }

  const handleInitialTranslate = async () => {
    // TODO: Implement actual translation API call
    // This is a mock translation for demonstration
    await new Promise(resolve => setTimeout(resolve, 5000))
    console.log("Initial translation completed")
  }

  const handleManualTranslation = () => {
    setIsTranslationOptionsModalOpen(false)
    if (selectedLanguageForTranslation) {
      setIsTranslationModalOpen(true)
    }
  }

  const handleAITranslation = async () => {
    setIsTranslationOptionsModalOpen(false)
    if (selectedLanguageForTranslation) {
      setIsInitialTranslationModalOpen(true)
    }
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'content':
        return (
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
                <Input 
                  id="title" 
                  placeholder="Enter article title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                />
                <div className="text-xs text-gray-500 mt-1">41/60 characters</div>
              </div>
              <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea 
                  id="summary" 
                  placeholder="Enter article summary..." 
                  className="min-h-[80px]" 
                  value={summary} 
                  onChange={(e) => setSummary(e.target.value)}
                  disabled={loading}
                />
                <div className="text-xs text-gray-500 mt-1">248/250 characters</div>
              </div>
              <div>
                <Label htmlFor="body">Content</Label>
                <Textarea 
                  id="body" 
                  placeholder="Write your article content..." 
                  className="min-h-[200px]" 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input 
                  id="author"
                  placeholder="Enter author name" 
                  value={author} 
                  onChange={(e) => setAuthor(e.target.value)} 
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>
        )
      case 'media':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Media Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Featured Image Upload */}
              <div>
                <Label className="text-base font-medium">Featured Image</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Upload featured image</p>
                  <p className="text-xs text-gray-500 mb-4">Supports JPG, PNG, WebP (max 10MB)</p>
                  <Button variant="outline" disabled={loading}>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Image
                  </Button>
                </div>
                <Input 
                  placeholder="Or enter image URL" 
                  value={mediaForm.thumbnail}
                  onChange={(e) => setMediaForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                  className="mt-2"
                  disabled={loading}
                />
              </div>

              {/* Video Links */}
              <div>
                <Label className="text-base font-medium">Video Links</Label>
                <div className="space-y-3 mt-2">
                  <div>
                    <Label htmlFor="youtube">YouTube URL</Label>
                    <Input 
                      id="youtube"
                      placeholder="https://www.youtube.com/watch?v=..." 
                      value={mediaForm.youtube}
                      onChange={(e) => setMediaForm(prev => ({ ...prev, youtube: e.target.value }))}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="vimeo">Vimeo URL</Label>
                    <Input 
                      id="vimeo"
                      placeholder="https://vimeo.com/..." 
                      value={mediaForm.vimeo}
                      onChange={(e) => setMediaForm(prev => ({ ...prev, vimeo: e.target.value }))}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="humancontact">HumanContact Video URL</Label>
                    <Input 
                      id="humancontact"
                      placeholder="https://humancontact.com/..." 
                      value={mediaForm.humancontact_video}
                      onChange={(e) => setMediaForm(prev => ({ ...prev, humancontact_video: e.target.value }))}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="qumu">Qumu URL</Label>
                    <Input 
                      id="qumu"
                      placeholder="https://qumu.com/..." 
                      value={mediaForm.qumu}
                      onChange={(e) => setMediaForm(prev => ({ ...prev, qumu: e.target.value }))}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Media Upload */}
              <div>
                <Label className="text-base font-medium">Additional Media</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Upload additional media files</p>
                  <p className="text-xs text-gray-500 mb-4">Supports MP4, MOV, AVI (max 500MB)</p>
                  <Button variant="outline" disabled={loading}>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
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
                      <Button variant="outline" size="sm" disabled={loading}>
                        <Upload className="w-4 h-4 mr-1" />
                        Upload SRT
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case 'translation':
        return (
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            if (lang.code === "en") {
                              setSelectedLanguageForTranslation(lang)
                              setIsTranslationModalOpen(true)
                            } else {
                              setSelectedLanguageForTranslation(lang)
                              setIsTranslationOptionsModalOpen(true)
                            }
                          }}
                        >
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
        )
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Article Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Program and Category Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Article Classification</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="program">Program</Label>
                    <Select 
                      value={settingsForm.program_id.toString()} 
                      onValueChange={(value) => {
                        const programId = parseInt(value)
                        setSettingsForm(prev => ({ ...prev, program_id: programId }))
                      }}
                      disabled={loading || isLoadingPrograms}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingPrograms ? "Loading programs..." : "Select program"} />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingPrograms ? (
                          <SelectItem value="loading" disabled>Loading programs...</SelectItem>
                        ) : programs.length > 0 ? (
                          programs.map((program) => (
                            <SelectItem key={program.id} value={program.id.toString()}>
                              {program.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-programs" disabled>No programs available</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">Select which program this article belongs to</p>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory} disabled={loading || isLoadingCategories}>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingCategories ? "Loading categories..." : "Select category"} />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingCategories ? (
                          <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                        ) : categories.length > 0 ? (
                          categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.title}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-categories" disabled>No categories available</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">Select the article category</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Date and Time Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Publishing Schedule</h3>
                
                <div>
                  <Label htmlFor="article_date_and_time">Article Date and Time</Label>
                  <Input 
                    id="article_date_and_time"
                    type="datetime-local"
                    value={settingsForm.article_date_and_time}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, article_date_and_time: e.target.value }))}
                    className="mt-1"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">When the article should be published</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input 
                      id="start_date"
                      type="date"
                      value={settingsForm.start_date}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, start_date: e.target.value }))}
                      className="mt-1"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="start_time">Start Time</Label>
                    <Input 
                      id="start_time"
                      type="time"
                      value={settingsForm.start_time}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, start_time: e.target.value }))}
                      className="mt-1"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="end_date">End Date</Label>
                    <Input 
                      id="end_date"
                      type="date"
                      value={settingsForm.end_date}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, end_date: e.target.value }))}
                      className="mt-1"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_time">End Time</Label>
                    <Input 
                      id="end_time"
                      type="time"
                      value={settingsForm.end_time}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, end_time: e.target.value }))}
                      className="mt-1"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Other Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Article Options</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Featured Article</span>
                  </div>
                  <Switch 
                    checked={settingsForm.is_featured} 
                    onCheckedChange={(checked) => setSettingsForm(prev => ({ ...prev, is_featured: checked }))} 
                    disabled={loading}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Enable Comments</span>
                  </div>
                  <Switch checked={enableComments} onCheckedChange={setEnableComments} disabled={loading} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">SEO Optimization</span>
                  </div>
                  <Switch defaultChecked disabled={loading} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Show Track Articles Only</span>
                  </div>
                  <Switch 
                    checked={settingsForm.is_show_track_articles_only} 
                    onCheckedChange={(checked) => setSettingsForm(prev => ({ ...prev, is_show_track_articles_only: checked }))} 
                    disabled={loading}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <ArticleSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

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
                <h1 className="text-xl font-semibold text-gray-900">
                  {loading ? 'Loading...' : title || 'Edit Article'}
                </h1>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  {articleData?.status || 'DRAFT'}
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
              <Button className={"bg-[#05AFF2]"}>
                <Save className="w-4 h-4 mr-2" />
                Save Article
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Article completion</span>
              <span className="text-sm font-medium text-[#05AFF2]">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#05AFF2] mx-auto mb-2"></div>
              <p className="text-gray-500">Loading article details...</p>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <div className="flex-1 overflow-auto p-6">
            {renderSection()}
          </div>
        )}
      </div>

      {/* Add TranslationEditModal */}
      {selectedLanguageForTranslation && (
        <TranslationEditModal
          isOpen={isTranslationModalOpen}
          onClose={() => {
            setIsTranslationModalOpen(false)
            setSelectedLanguageForTranslation(null)
          }}
          language={selectedLanguageForTranslation}
          originalTitle={title}
          originalSummary={summary}
          originalContent={content}
          onSave={handleTranslationSave}
        />
      )}

      {/* Add InitialTranslationModal */}
      {selectedLanguageForTranslation && (
        <InitialTranslationModal
          isOpen={isInitialTranslationModalOpen}
          onClose={() => {
            setIsInitialTranslationModalOpen(false)
            setSelectedLanguageForTranslation(null)
          }}
          language={selectedLanguageForTranslation}
          onTranslate={handleInitialTranslate}
        />
      )}

      {/* Translation Options Modal */}
      {selectedLanguageForTranslation && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isTranslationOptionsModalOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsTranslationOptionsModalOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{selectedLanguageForTranslation.flag}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Translate to {selectedLanguageForTranslation.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Choose how you want to translate this article
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  onClick={handleManualTranslation}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Manual Translation</div>
                      <div className="text-sm text-gray-600">
                        Translate the content yourself with full control
                      </div>
                    </div>
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  onClick={handleAITranslation}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">AI Auto-Translate</div>
                      <div className="text-sm text-gray-600">
                        Use AI to automatically translate the content
                      </div>
                    </div>
                  </div>
                </Button>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button
                  variant="ghost"
                  onClick={() => setIsTranslationOptionsModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

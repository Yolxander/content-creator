"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Eye,
  MoreHorizontal,
  Save,
  Share,
  Sparkles,
  Target,
  Mail,
  Globe,
  Video,
  ImageIcon,
  Upload,
  Languages,
  CheckCircle,
  Clock,
  FileText,
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
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { TranslationEditModal } from "@/components/TranslationEditModal"
import { InitialTranslationModal } from "@/components/InitialTranslationModal"
import { createArticleFromWizard, CreateArticleData, getArticleCategoriesForDropdown, ArticleCategory } from "@/actions/article-actions"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
]

const steps = [
  { id: 'content', title: 'Content', description: 'Write your article content' },
  { id: 'media', title: 'Media', description: 'Add images and videos' },
  { id: 'translation', title: 'Translation', description: 'Manage translations' },
  { id: 'settings', title: 'Settings', description: 'Configure article settings' },
]

// Types for the data structure
interface ArticleCreator {
  id?: number
  title: string
  article_category_id: number
  program_id: number
  article_author: string
  article_date_and_time: string
  start_date: string | null
  start_time: string | null
  end_date: string | null
  end_time: string | null
  is_featured: number
  created_at?: string
  updated_at?: string
  import_id?: string | null
}

interface ArticleCreatorTranslation {
  id?: number
  article_creator_id?: number
  locale: string
  article_name: string
  summary: string
  thumbnail: string | null
  humancontact_video: string | null
  youtube: string | null
  vimeo: string | null
  qumu: string | null
  article_body: string
  created_at?: string
  updated_at?: string
}

interface ArticleSettings {
  id?: number
  program_id: number
  title: string
  is_show_track_articles_only: number
  created_at?: string
  updated_at?: string
}

interface WizardData {
  article_creators: ArticleCreator[]
  article_creator_translation: ArticleCreatorTranslation[]
  article_settings: ArticleSettings[]
}

export default function NewArticlePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPublished, setIsPublished] = useState(false)
  const [enableComments, setEnableComments] = useState(true)
  const [autoTranslate, setAutoTranslate] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [summary, setSummary] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState(["en"])
  const [isTranslationModalOpen, setIsTranslationModalOpen] = useState(false)
  const [selectedLanguageForTranslation, setSelectedLanguageForTranslation] = useState<typeof languages[0] | null>(null)
  const [isInitialTranslationModalOpen, setIsInitialTranslationModalOpen] = useState(false)
  
  // New state for wizard data
  const [wizardData, setWizardData] = useState<WizardData>({
    article_creators: [],
    article_creator_translation: [],
    article_settings: []
  })
  
  // Form state for each step
  const [contentForm, setContentForm] = useState({
    title: "",
    summary: "",
    content: "",
    author: "",
    category: "",
    program_id: 58 // Default program ID
  })
  
  const [mediaForm, setMediaForm] = useState({
    thumbnail: "",
    youtube: "",
    vimeo: "",
    humancontact_video: "",
    qumu: ""
  })
  
  const [settingsForm, setSettingsForm] = useState({
    is_featured: false,
    program_id: 58,
    is_show_track_articles_only: false,
    article_date_and_time: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: ""
  })
  
  const [translations, setTranslations] = useState<Record<string, ArticleCreatorTranslation>>({})
  const [categories, setCategories] = useState<ArticleCategory[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true)
      try {
        const categoriesData = await getArticleCategoriesForDropdown()
        setCategories(categoriesData)
      } catch (error) {
        console.error('Failed to load categories:', error)
      } finally {
        setIsLoadingCategories(false)
      }
    }

    loadCategories()
  }, [])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final step - save the article
      handleSaveArticle()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleTranslationSave = (translation: { title: string; summary: string; content: string }) => {
    if (selectedLanguageForTranslation) {
      const newTranslation: ArticleCreatorTranslation = {
        locale: selectedLanguageForTranslation.code,
        article_name: translation.title,
        summary: translation.summary,
        thumbnail: mediaForm.thumbnail,
        humancontact_video: mediaForm.humancontact_video,
        youtube: mediaForm.youtube,
        vimeo: mediaForm.vimeo,
        qumu: mediaForm.qumu,
        article_body: translation.content
      }
      
      setTranslations(prev => ({
        ...prev,
        [selectedLanguageForTranslation.code]: newTranslation
      }))
    }
  }

  const handleInitialTranslate = async () => {
    // TODO: Implement actual translation API call
    // This is a mock translation for demonstration
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (selectedLanguageForTranslation) {
      // Mock translation - in real implementation, this would call an API
      const mockTranslation: ArticleCreatorTranslation = {
        locale: selectedLanguageForTranslation.code,
        article_name: `${contentForm.title} - ${selectedLanguageForTranslation.name}`,
        summary: `Translated summary for ${selectedLanguageForTranslation.name}`,
        thumbnail: mediaForm.thumbnail,
        humancontact_video: mediaForm.humancontact_video,
        youtube: mediaForm.youtube,
        vimeo: mediaForm.vimeo,
        qumu: mediaForm.qumu,
        article_body: `Translated content for ${selectedLanguageForTranslation.name}...`
      }
      
      setTranslations(prev => ({
        ...prev,
        [selectedLanguageForTranslation.code]: mockTranslation
      }))
    }
  }

  const handleSaveArticle = async () => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
    
    // Create article_creators entry
    const articleCreator: ArticleCreator = {
      title: contentForm.title,
      article_category_id: parseInt(contentForm.category) || 1,
      program_id: settingsForm.program_id,
      article_author: contentForm.author,
      article_date_and_time: settingsForm.article_date_and_time || now,
      start_date: settingsForm.start_date || null,
      start_time: settingsForm.start_time || null,
      end_date: settingsForm.end_date || null,
      end_time: settingsForm.end_time || null,
      is_featured: settingsForm.is_featured ? 1 : 0,
      created_at: now,
      updated_at: now
    }
    
    // Create article_creator_translation entries
    const translationEntries: ArticleCreatorTranslation[] = []
    
    // Add English (original) translation
    translationEntries.push({
      locale: "en",
      article_name: contentForm.title,
      summary: contentForm.summary,
      thumbnail: mediaForm.thumbnail,
      humancontact_video: mediaForm.humancontact_video,
      youtube: mediaForm.youtube,
      vimeo: mediaForm.vimeo,
      qumu: mediaForm.qumu,
      article_body: contentForm.content,
      created_at: now,
      updated_at: now
    })
    
    // Add other translations
    Object.values(translations).forEach(translation => {
      translationEntries.push({
        ...translation,
        created_at: now,
        updated_at: now
      })
    })
    
    // Create or update article_settings
    const articleSettings: ArticleSettings = {
      program_id: settingsForm.program_id,
      title: "Articles",
      is_show_track_articles_only: settingsForm.is_show_track_articles_only ? 1 : 0,
      created_at: now,
      updated_at: now
    }
    
    const finalData: CreateArticleData = {
      article_creators: [articleCreator],
      article_creator_translation: translationEntries,
      article_settings: [articleSettings]
    }
    
    try {
      console.log("Sending article data to API:", finalData)
      const result = await createArticleFromWizard(finalData)
      console.log("Article created successfully:", result)
      alert("Article saved successfully!")
      
      // Redirect to articles list or edit page
      // window.location.href = '/articles'
    } catch (error) {
      console.error("Failed to save article:", error)
      alert("Failed to save article. Please try again.")
    }
  }

  const renderStep = () => {
    switch (steps[currentStep].id) {
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
                  value={contentForm.title} 
                  onChange={(e) => setContentForm(prev => ({ ...prev, title: e.target.value }))} 
                />
                <div className="text-xs text-gray-500 mt-1">{contentForm.title.length}/60 characters</div>
              </div>
              <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea 
                  id="summary" 
                  placeholder="Enter article summary..." 
                  className="min-h-[80px]" 
                  value={contentForm.summary} 
                  onChange={(e) => setContentForm(prev => ({ ...prev, summary: e.target.value }))} 
                />
                <div className="text-xs text-gray-500 mt-1">{contentForm.summary.length}/250 characters</div>
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Write your article content..." 
                  className="min-h-[200px]" 
                  value={contentForm.content} 
                  onChange={(e) => setContentForm(prev => ({ ...prev, content: e.target.value }))} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Select value={contentForm.author} onValueChange={(value) => setContentForm(prev => ({ ...prev, author: value }))}>
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
                  <Select value={contentForm.category} onValueChange={(value) => setContentForm(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger disabled={isLoadingCategories}>
                      <SelectValue placeholder={isLoadingCategories ? "Loading categories..." : "Select category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingCategories ? (
                        <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                      ) : categories.length > 0 ? (
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.title}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-categories" disabled>No categories available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
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
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Image
                  </Button>
                </div>
                <Input 
                  placeholder="Or enter image URL" 
                  value={mediaForm.thumbnail}
                  onChange={(e) => setMediaForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                  className="mt-2"
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
                    />
                  </div>
                  <div>
                    <Label htmlFor="vimeo">Vimeo URL</Label>
                    <Input 
                      id="vimeo"
                      placeholder="https://vimeo.com/..." 
                      value={mediaForm.vimeo}
                      onChange={(e) => setMediaForm(prev => ({ ...prev, vimeo: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="humancontact">HumanContact Video URL</Label>
                    <Input 
                      id="humancontact"
                      placeholder="https://humancontact.com/..." 
                      value={mediaForm.humancontact_video}
                      onChange={(e) => setMediaForm(prev => ({ ...prev, humancontact_video: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="qumu">Qumu URL</Label>
                    <Input 
                      id="qumu"
                      placeholder="https://qumu.com/..." 
                      value={mediaForm.qumu}
                      onChange={(e) => setMediaForm(prev => ({ ...prev, qumu: e.target.value }))}
                    />
                  </div>
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
                  {languages.map((lang) => {
                    const hasTranslation = translations[lang.code]
                    return (
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
                          ) : hasTranslation ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Translated
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
                                setIsInitialTranslationModalOpen(true)
                              }
                            }}
                          >
                            {lang.code === "en" ? "Edit" : hasTranslation ? "Edit" : "Translate"}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
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
                  />
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Show Track Articles Only</span>
                  </div>
                  <Switch 
                    checked={settingsForm.is_show_track_articles_only} 
                    onCheckedChange={(checked) => setSettingsForm(prev => ({ ...prev, is_show_track_articles_only: checked }))} 
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
              <Button 
                className={"bg-[#05AFF2]"}
                onClick={handleSaveArticle}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Article
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Article completion</span>
              <span className="text-sm font-medium text-[#05AFF2]">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>

          {/* Steps */}
          <div className="mt-6">
            <div className="flex items-center justify-between relative">
              {/* Progress line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10" />

              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center relative"
                >
                  {/* Step circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      index === currentStep
                        ? "bg-[#05AFF2] text-white ring-4 ring-[#05AFF2]/20"
                        : index < currentStep
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  
                  {/* Step text */}
                  <div className="text-center">
                    <div className={`font-medium ${
                      index === currentStep
                        ? "text-[#05AFF2]"
                        : index < currentStep
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              className={"bg-[#05AFF2]"}
              onClick={handleNext}
              disabled={false}
            >
              {currentStep === steps.length - 1 ? "Save Article" : "Next"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
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
          originalTitle={contentForm.title}
          originalSummary={contentForm.summary}
          originalContent={contentForm.content}
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
    </div>
  )
}
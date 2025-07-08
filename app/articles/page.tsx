"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  ChevronUp,
  Globe,
  Eye,
  User,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"
import { BottomActionBar } from "@/components/BottomActionBar"
import { BulkActionModal } from "@/components/BulkActionModal"
import { getArticles } from "@/actions/article-actions"
import { useAuth } from "@/lib/auth-context"

// Interface for the article data structure
interface Article {
  id: number
  title: string
  author: string
  category: string
  status: string
  views: string
  languages: number
  lastModified: string
  selected: boolean
}

// Default empty articles array
const defaultArticles: Article[] = []

const getStatusColor = (status: string) => {
  switch (status) {
    case "PUBLISHED":
      return "bg-green-100 text-green-800"
    case "IN_REVIEW":
      return "bg-orange-100 text-orange-800"
    case "DRAFT":
      return "bg-gray-100 text-gray-800"
    case "PENDING_APPROVAL":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "MARKETING":
      return "bg-purple-100 text-purple-800"
    case "STRATEGY":
      return "bg-blue-100 text-blue-800"
    case "SEO":
      return "bg-green-100 text-green-800"
    case "VIDEO":
      return "bg-red-100 text-red-800"
    case "SOCIAL":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Helper to group articles by category
const groupArticlesByCategory = (articles: Article[]) => {
  return articles.reduce((acc: Record<string, Article[]>, article) => {
    if (!acc[article.category]) acc[article.category] = [];
    acc[article.category].push(article);
    return acc;
  }, {});
};

export default function ArticlesPage() {
  const { user } = useAuth()
  const [articles, setArticles] = useState<Article[]>(defaultArticles)
  const [selectedArticles, setSelectedArticles] = useState<Article[]>([])
  const [groupEnabled, setGroupEnabled] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'timeline'>('list')
  const [loading, setLoading] = useState(true)
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null)
  const [availablePrograms, setAvailablePrograms] = useState<Array<{id: number, name: string}>>([])
  const [bulkActionModal, setBulkActionModal] = useState<{
    isOpen: boolean
    action: 'publish' | 'translate' | 'export' | 'delete' | null
  }>({
    isOpen: false,
    action: null
  })

  // Load programs from localStorage (from organization switcher)
  useEffect(() => {
    const storedPrograms = localStorage.getItem('currentOrganizationPrograms')
    if (storedPrograms) {
      try {
        const parsedPrograms = JSON.parse(storedPrograms)
        
        // Transform programs to match the expected format for the dropdown
        const transformedPrograms = parsedPrograms.map((program: any) => ({
          id: program.program_id,
          name: program.name // Use name instead of title to avoid HTML content
        }))
        
        setAvailablePrograms(transformedPrograms)
        
        // Set the first program as default selected if no program is currently selected
        if (transformedPrograms.length > 0 && !selectedProgramId) {
          setSelectedProgramId(transformedPrograms[0].id)
        }
      } catch (error) {
        setAvailablePrograms([])
      }
    } else {
      setAvailablePrograms([])
    }
  }, [user])

  // Fetch programs for current organization if not already stored
  useEffect(() => {
    if (user?.organization && availablePrograms.length === 0) {
      const storedPrograms = localStorage.getItem('currentOrganizationPrograms')
      if (!storedPrograms) {
        // Fetch programs for current organization
        fetchProgramsForCurrentOrganization()
      }
    }
  }, [user, availablePrograms.length])

  // Listen for localStorage changes (when organization is switched)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentOrganizationPrograms') {
        // Reload programs from localStorage
        const storedPrograms = localStorage.getItem('currentOrganizationPrograms')
        if (storedPrograms) {
          try {
            const parsedPrograms = JSON.parse(storedPrograms)
            const transformedPrograms = parsedPrograms.map((program: any) => ({
              id: program.program_id,
              name: program.name // Use name instead of title to avoid HTML content
            }))
            setAvailablePrograms(transformedPrograms)
            
            // Set the first program as default selected if no program is currently selected
            if (transformedPrograms.length > 0 && !selectedProgramId) {
              setSelectedProgramId(transformedPrograms[0].id)
            }
          } catch (error) {
            // Handle error silently
          }
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Helper function to fetch programs for current organization
  const fetchProgramsForCurrentOrganization = async () => {
    if (!user?.organization) return
    
    try {
      const { fetchUserOrganizationProgramsSafe } = await import('@/actions/program-actions')
      
      const { success, data: programs, error } = await fetchUserOrganizationProgramsSafe({
        locale: 'en',
        organization_id: user.organization.id
      })
      
      if (success && programs.length > 0) {
        // Store programs in localStorage
        localStorage.setItem('currentOrganizationPrograms', JSON.stringify(programs))
        
        // Transform and set programs for dropdown
        const transformedPrograms = programs.map((program: any) => ({
          id: program.program_id,
          name: program.name // Use name instead of title to avoid HTML content
        }))
        
        setAvailablePrograms(transformedPrograms)
        
        // Set the first program as default selected if no program is currently selected
        if (transformedPrograms.length > 0 && !selectedProgramId) {
          setSelectedProgramId(transformedPrograms[0].id)
        }
      } else {
        setAvailablePrograms([])
      }
    } catch (error) {
      setAvailablePrograms([])
    }
  }

    // Fetch articles from the API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        
        const response = await getArticles({
          program_id: selectedProgramId || user?.organization?.default_program_id || 58, // Use selected program or default
          locale: 'en',
          limit: 50,
          offset: 0
        })
        
        // Transform the API response to match our Article interface
        if (response && response.data && response.data.length > 0) {
          const transformedArticles: Article[] = response.data.map((article: any, index: number) => ({
            id: article.id || index + 1,
            title: article.article_name || article.title || `Article ${index + 1}`,
            author: article.author || article.article_author || 'Unknown Author',
            category: article.category || 'GENERAL',
            status: article.status || 'DRAFT',
            views: article.views || '0',
            languages: article.languages || 1,
            lastModified: article.date || article.updated_at || article.created_at || new Date().toLocaleDateString(),
            selected: false
          }))
          
          setArticles(transformedArticles)
        } else {
          // No articles found for this program
          setArticles([])
          setSelectedArticles([])
        }
      } catch (error) {
        // Set empty articles array to show no articles message
        setArticles([])
        setSelectedArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [selectedProgramId, user?.organization?.default_program_id])

  const toggleArticleSelection = (articleId: number) => {
    const article = articles.find((a) => a.id === articleId)
    if (article) {
      if (selectedArticles.find((a) => a.id === articleId)) {
        setSelectedArticles(selectedArticles.filter((a) => a.id !== articleId))
      } else {
        setSelectedArticles([...selectedArticles, article])
      }
    }
  }

  // Bulk action handlers
  const handleBulkAction = (action: 'publish' | 'translate' | 'export' | 'delete') => {
    setBulkActionModal({
      isOpen: true,
      action
    })
  }

  const handleBulkActionConfirm = async (action: string, articleIds: number[]) => {
    try {
      switch (action) {
        case 'publish':
          console.log('Publishing articles:', articleIds)
          // TODO: Implement publish API call
          break
        case 'translate':
          console.log('Translating articles:', articleIds)
          // TODO: Implement translate API call
          break
        case 'export':
          console.log('Exporting articles:', articleIds)
          // TODO: Implement export API call
          break
        case 'delete':
          console.log('Deleting articles:', articleIds)
          // TODO: Implement delete API call
          break
        default:
          console.warn('Unknown action:', action)
      }
      
      // Clear selection after successful action
      setSelectedArticles([])
    } catch (error) {
      console.error('Bulk action failed:', error)
      throw error
    }
  }

  const closeBulkActionModal = () => {
    setBulkActionModal({
      isOpen: false,
      action: null
    })
  }

  const renderNoArticlesMessage = () => {
    const selectedProgram = availablePrograms.find(p => p.id === selectedProgramId) || 
                           availablePrograms.find(p => p.id === user?.organization?.default_program_id)
    
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-6">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500 mb-6">
              {selectedProgram 
                ? `There are no articles in the "${selectedProgram.name}" program yet.`
                : "There are no articles for this program yet."
              }
            </p>
          </div>
          <Link href="/articles/new">
            <Button className="bg-[#05AFF2] hover:bg-[#05AFF2]/90">
              <Plus className="w-4 h-4 mr-2" />
              Create your first article
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const renderTimelineView = () => {
    // Group articles by date
    const groupedArticles = articles.reduce((acc, article) => {
      const date = article.lastModified
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(article)
      return acc
    }, {})

    return (
      <div className="p-6 space-y-8">
        {Object.entries(groupedArticles).map(([date, articles]) => (
          <div key={date} className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-gray-200 border-4 border-white" />
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{date}</h3>
              </div>
              <div className="space-y-4">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedArticles.some((a) => a.id === article.id)}
                          onCheckedChange={() => toggleArticleSelection(article.id)}
                        />
                        <div>
                          <div className="font-medium text-gray-900">{article.title}</div>
                          <div className="text-sm text-gray-500">ID: {article.id}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(article.status)}>
                        {article.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {article.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span>{article.languages}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderGridView = () => {
    if (groupEnabled) {
      const grouped = groupArticlesByCategory(articles);
      return (
        <div className="flex-1 overflow-auto p-6">
          {Object.entries(grouped).map(([category, group]) => (
            <div key={category} className="mb-8">
              <h2 className="text-lg font-semibold mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {group.map((article, index) => (
                  <div 
                    key={article.id} 
                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: 'fadeInUp 0.5s ease-out forwards'
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <Checkbox
                          checked={selectedArticles.some((a) => a.id === article.id)}
                          onCheckedChange={() => toggleArticleSelection(article.id)}
                        />
                        <Badge variant="secondary" className={getStatusColor(article.status)}>
                          {article.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <Link href={`/articles/edit/${article.id}`} className="block">
                        <div className="mb-3">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                            {article.title}
                          </h3>
                          <div className="text-sm text-gray-500">ID: {article.id}</div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{article.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className={getCategoryColor(article.category)}>
                              {article.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{article.views} views</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{article.languages} languages</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 border-t pt-2">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.lastModified}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    // Existing code for ungrouped grid view
    return (
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <div 
              key={article.id} 
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'fadeInUp 0.5s ease-out forwards'
              }}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Checkbox
                    checked={selectedArticles.some((a) => a.id === article.id)}
                    onCheckedChange={() => toggleArticleSelection(article.id)}
                  />
                  <Badge variant="secondary" className={getStatusColor(article.status)}>
                    {article.status.replace("_", " ")}
                  </Badge>
                </div>
                
                <Link href={`/articles/edit/${article.id}`} className="block">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                    <div className="text-sm text-gray-500">ID: {article.id}</div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{article.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{article.views} views</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{article.languages} languages</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 border-t pt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.lastModified}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Articles</h1>
            <div className="flex items-center gap-2">
              <Link href="/articles/new">
                <Button className={"bg-[#05AFF2]"}>
                  <Plus className="w-4 h-4 mr-2" />
                  New article
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

          {/*/!* Stats cards *!/*/}
          {/*<div className="grid grid-cols-4 gap-6 mb-6">*/}
          {/*  <Card>*/}
          {/*    <CardContent className="p-4">*/}
          {/*      <div className="text-sm text-gray-500 mb-1">Time Period</div>*/}
          {/*      <DropdownMenu>*/}
          {/*        <DropdownMenuTrigger asChild>*/}
          {/*          <Button variant="ghost" size="sm" className="h-8">*/}
          {/*            Last 7 days*/}
          {/*            <ChevronDown className="w-4 h-4 ml-2" />*/}
          {/*          </Button>*/}
          {/*        </DropdownMenuTrigger>*/}
          {/*        <DropdownMenuContent align="end">*/}
          {/*          <DropdownMenuItem>Last 7 days</DropdownMenuItem>*/}
          {/*          <DropdownMenuItem>Last 30 days</DropdownMenuItem>*/}
          {/*          <DropdownMenuItem>Last 90 days</DropdownMenuItem>*/}
          {/*        </DropdownMenuContent>*/}
          {/*      </DropdownMenu>*/}
          {/*    </CardContent>*/}
          {/*  </Card>*/}
          {/*  <Card>*/}
          {/*    <CardContent className="p-4">*/}
          {/*      <div className="text-sm text-gray-500 mb-1">Published</div>*/}
          {/*      <div className="flex items-center gap-2">*/}
          {/*        <div className="text-2xl font-semibold">156</div>*/}
          {/*        <div className="flex items-center text-green-600 text-sm">*/}
          {/*          <TrendingUp className="w-3 h-3 mr-1" />*/}
          {/*          +12%*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </CardContent>*/}
          {/*  </Card>*/}
          {/*  <Card>*/}
          {/*    <CardContent className="p-4">*/}
          {/*      <div className="text-sm text-gray-500 mb-1">In Review</div>*/}
          {/*      <div className="flex items-center gap-2">*/}
          {/*        <div className="text-2xl font-semibold">42</div>*/}
          {/*        <div className="flex items-center text-orange-600 text-sm">*/}
          {/*          <ArrowUpRight className="w-3 h-3 mr-1" />*/}
          {/*          +8%*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </CardContent>*/}
          {/*  </Card>*/}
          {/*  <Card>*/}
          {/*    <CardContent className="p-4">*/}
          {/*      <div className="text-sm text-gray-500 mb-1">Drafts</div>*/}
          {/*      <div className="text-2xl font-semibold">23</div>*/}
          {/*    </CardContent>*/}
          {/*  </Card>*/}
          {/*</div>*/}

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={viewMode === 'list' ? "text-gray-900" : "text-gray-500"}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={viewMode === 'grid' ? "text-gray-900" : "text-gray-500"}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Grid
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={viewMode === 'timeline' ? "text-gray-900" : "text-gray-500"}
                  onClick={() => setViewMode('timeline')}
                >
                  <GitBranch className="w-4 h-4 mr-2" />
                  Timeline
                </Button>
              </div>
              <div className="flex items-center gap-2  mr-2">
                <Switch
                  checked={groupEnabled}
                  onCheckedChange={setGroupEnabled}
                  className="data-[state=checked]:bg-gray-900"
                />
                <span className="text-sm text-gray-600">Group by category</span>
              </div>
              <div className="flex items-center gap-2">

                <Select
                    value={selectedProgramId?.toString() || ""}
                    onValueChange={(value) => {
                      setSelectedProgramId(value ? parseInt(value) : null)
                    }}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select program"/>
                  </SelectTrigger>
                  <SelectContent>
                    {availablePrograms.map((program) => (
                        <SelectItem key={program.id} value={program.id.toString()}>
                          {program.name}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-600">Program</span>
              </div >
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search articles..." className="pl-9 w-64" />
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#05AFF2] mx-auto mb-2"></div>
              <p className="text-gray-500">Loading articles...</p>
            </div>
          </div>
        ) : (
          <>
            {articles.length === 0 ? (
              renderNoArticlesMessage()
            ) : (
              <>
                {viewMode === 'timeline' ? (
                  renderTimelineView()
                ) : viewMode === 'grid' ? (
                  renderGridView()
                ) : (
                  <div className="flex-1 overflow-auto">
                    {groupEnabled ? (
                      (() => {
                        const grouped = groupArticlesByCategory(articles);
                        return Object.entries(grouped).map(([category, group]) => (
                          <div key={category} className="mb-8">
                            <h2 className="text-lg font-semibold mb-4">{category}</h2>
                            <table className="w-full">
                              <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                      <FileText className="w-4 h-4" />
                                      ARTICLE
                                    </div>
                                  </th>
                                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">AUTHOR</th>
                                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORY</th>
                                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">VIEWS</th>
                                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">LANGUAGES</th>
                                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center gap-1">
                                      LAST MODIFIED
                                      <ChevronUp className="w-3 h-3" />
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {group.map((article, index) => (
                                  <tr 
                                    key={article.id} 
                                    className="hover:bg-gray-50 group relative transition-all duration-300 ease-in-out"
                                    style={{
                                      animationDelay: `${index * 50}ms`,
                                      animation: 'fadeInUp 0.5s ease-out forwards'
                                    }}
                                  >
                                    <td className="p-4">
                                      <div className="flex items-center gap-3">
                                        <Checkbox
                                          checked={selectedArticles.some((a) => a.id === article.id)}
                                          onCheckedChange={() => toggleArticleSelection(article.id)}
                                        />
                                        <Link href={`/articles/edit/${article.id}`} className="flex-1">
                                        <div>
                                          <div className="font-medium text-gray-900">{article.title}</div>
                                          <div className="text-sm text-gray-500">ID: {article.id}</div>
                                        </div>
                                        </Link>
                                      </div>
                                    </td>
                                    <td className="p-4">
                                      <Link href={`/articles/edit/${article.id}`} className="block">
                                      <span className="text-sm text-gray-900">{article.author}</span>
                                      </Link>
                                    </td>
                                    <td className="p-4">
                                      <Link href={`/articles/edit/${article.id}`} className="block">
                                      <Badge variant="secondary" className={getCategoryColor(article.category)}>
                                        {article.category}
                                      </Badge>
                                      </Link>
                                    </td>
                                    <td className="p-4">
                                      <Link href={`/articles/edit/${article.id}`} className="block">
                                      <Badge variant="secondary" className={getStatusColor(article.status)}>
                                        {article.status.replace("_", " ")}
                                      </Badge>
                                      </Link>
                                    </td>
                                    <td className="p-4">
                                      <Link href={`/articles/edit/${article.id}`} className="block">
                                      <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">{article.views}</span>
                                      </div>
                                      </Link>
                                    </td>
                                    <td className="p-4">
                                      <Link href={`/articles/edit/${article.id}`} className="block">
                                      <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">{article.languages}</span>
                                      </div>
                                      </Link>
                                    </td>
                                    <td className="p-4">
                                      <Link href={`/articles/edit/${article.id}`} className="block">
                                      <span className="text-sm text-gray-500">{article.lastModified}</span>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ));
                      })()
                    ) : (
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              ARTICLE
                            </div>
                          </th>
                          <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">AUTHOR</th>
                          <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORY</th>
                          <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                          <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">VIEWS</th>
                          <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">LANGUAGES</th>
                          <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-1">
                              LAST MODIFIED
                              <ChevronUp className="w-3 h-3" />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {articles.map((article, index) => (
                          <tr 
                            key={article.id} 
                            className="hover:bg-gray-50 group relative transition-all duration-300 ease-in-out"
                            style={{
                              animationDelay: `${index * 50}ms`,
                              animation: 'fadeInUp 0.5s ease-out forwards'
                            }}
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  checked={selectedArticles.some((a) => a.id === article.id)}
                                  onCheckedChange={() => toggleArticleSelection(article.id)}
                                />
                                <Link href={`/articles/edit/${article.id}`} className="flex-1">
                                <div>
                                  <div className="font-medium text-gray-900">{article.title}</div>
                                  <div className="text-sm text-gray-500">ID: {article.id}</div>
                                </div>
                                </Link>
                              </div>
                            </td>
                            <td className="p-4">
                              <Link href={`/articles/edit/${article.id}`} className="block">
                              <span className="text-sm text-gray-900">{article.author}</span>
                              </Link>
                            </td>
                            <td className="p-4">
                              <Link href={`/articles/edit/${article.id}`} className="block">
                              <Badge variant="secondary" className={getCategoryColor(article.category)}>
                                {article.category}
                              </Badge>
                              </Link>
                            </td>
                            <td className="p-4">
                              <Link href={`/articles/edit/${article.id}`} className="block">
                              <Badge variant="secondary" className={getStatusColor(article.status)}>
                                {article.status.replace("_", " ")}
                              </Badge>
                              </Link>
                            </td>
                            <td className="p-4">
                              <Link href={`/articles/edit/${article.id}`} className="block">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-900">{article.views}</span>
                              </div>
                              </Link>
                            </td>
                            <td className="p-4">
                              <Link href={`/articles/edit/${article.id}`} className="block">
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-900">{article.languages}</span>
                              </div>
                              </Link>
                            </td>
                            <td className="p-4">
                              <Link href={`/articles/edit/${article.id}`} className="block">
                              <span className="text-sm text-gray-500">{article.lastModified}</span>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}

        <BottomActionBar 
          selectedCount={selectedArticles.length} 
          itemType="articles" 
          selectedItems={selectedArticles}
          onPublish={() => handleBulkAction('publish')}
          onTranslate={() => handleBulkAction('translate')}
          onExport={() => handleBulkAction('export')}
          onDelete={() => handleBulkAction('delete')}
        />
      </div>
    </div>
    
    <BulkActionModal
      isOpen={bulkActionModal.isOpen}
      onClose={closeBulkActionModal}
      action={bulkActionModal.action}
      selectedArticles={selectedArticles}
      onConfirm={handleBulkActionConfirm}
    />
    </>
  )
}

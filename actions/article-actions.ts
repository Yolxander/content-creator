// Types for article data structures
export interface ArticleCreator {
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

export interface ArticleCreatorTranslation {
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

export interface ArticleSettings {
  id?: number
  program_id: number
  title: string
  is_show_track_articles_only: number
  created_at?: string
  updated_at?: string
}

export interface CreateArticleData {
  article_creators: ArticleCreator[]
  article_creator_translation: ArticleCreatorTranslation[]
  article_settings: ArticleSettings[]
}

export interface UpdateArticleData {
  article_id: number
  article_creators: Partial<ArticleCreator>[]
  article_creator_translation: Partial<ArticleCreatorTranslation>[]
}

export interface ListArticlesParams {
  program_id: number
  locale: string
  limit?: number
  offset?: number
}

export interface ViewArticleParams {
  article_id: number
  locale: string
}

export interface ArticleSettingsParams {
  program_id: number
  locale: string
}

export interface ArticleCategory {
  id: number
  program_id: number
  title: string
  description?: string
  created_at?: string
  updated_at?: string
}

export interface ArticleCategoriesParams {
  locale: string
  program_id: number
}

export interface UpdateArticleSettingsData {
  program_id: number
  article_settings: Partial<ArticleSettings>
  article_setting_translations?: any[]
}

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const API_VERSION = 'v3'

// Function to generate version header (matching auth context)
function generateVersionHeader(): string {
  const version = "0.46" // Minimum supported version
  const versionData = `Version:${version}`
  return btoa(versionData)
}

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  method: 'GET' | 'POST' = 'POST',
  data?: any,
  requiresAuth: boolean = false
): Promise<T> {
  const url = `${API_BASE_URL}/api/${API_VERSION}${endpoint}`
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'organization_id': '2', // Default organization ID
  }

  // Add version header for non-auth endpoints
  if (!endpoint.includes('/auth/')) {
    const versionHeader = generateVersionHeader()
    headers['version'] = versionHeader
  }

  // Add authentication header if required
  if (requiresAuth) {
    const token = localStorage.getItem('authToken') // Use the correct key from auth context
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      console.warn('No auth token found for protected endpoint:', endpoint)
    }
  }

  const config: RequestInit = {
    method,
    headers,
  }

  if (data && method === 'POST') {
    config.body = JSON.stringify(data)
  }

  try {
    console.log('Making API request to:', url)
    console.log('Auth token available:', requiresAuth ? !!localStorage.getItem('authToken') : 'N/A')
    console.log('Request headers:', config.headers)
    if (data) {
      console.log('Request body:', data)
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API call failed: Status: ${response.status}, Response: ${errorText}`)
      throw new Error(`API call failed: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    console.log('API Response:', result)
    return result
  } catch (error) {
    console.error('API call error:', error)
    throw error
  }
}

// Public API endpoints (no authentication required)

/**
 * Get articles by program
 */
export async function getArticles(params: ListArticlesParams) {
  return apiCall('/articles/list', 'POST', params)
}

/**
 * Get single article by ID
 */
export async function getArticle(params: ViewArticleParams) {
  return apiCall('/articles/view', 'POST', params)
}

/**
 * Get article settings for a program
 */
export async function getArticleSettings(params: ArticleSettingsParams) {
  return apiCall('/articles/settings', 'POST', params)
}

/**
 * Get article categories
 */
export async function getArticleCategories(params: ArticleCategoriesParams) {
  return apiCall<{ 
    success: boolean
    statusCode: number
    message: string
    data: ArticleCategory[] 
  }>('/articles/categories', 'POST', params)
}

// Protected API endpoints (require authentication)

/**
 * Create new article with related data
 */
export async function createArticle(data: CreateArticleData) {
  return apiCall('/articles/create', 'POST', data, true)
}

/**
 * Update existing article
 */
export async function updateArticle(data: UpdateArticleData) {
  return apiCall('/articles/update', 'POST', data, true)
}

/**
 * Delete article
 */
export async function deleteArticle(articleId: number) {
  return apiCall('/articles/delete', 'POST', { article_id: articleId }, true)
}

/**
 * Update article settings
 */
export async function updateArticleSettings(data: UpdateArticleSettingsData) {
  return apiCall('/articles/settings/update', 'POST', data, true)
}

// Convenience functions for common operations

/**
 * Create a new article from wizard data
 */
export async function createArticleFromWizard(wizardData: CreateArticleData) {
  try {
    const result = await createArticle(wizardData)
    console.log('Article created successfully:', result)
    return result
  } catch (error) {
    console.error('Failed to create article:', error)
    throw error
  }
}

/**
 * Get articles for a specific program with pagination
 */
export async function getProgramArticles(
  programId: number, 
  locale: string = 'en', 
  limit: number = 10, 
  offset: number = 0
) {
  try {
    const result = await getArticles({
      program_id: programId,
      locale,
      limit,
      offset
    })
    return result
  } catch (error) {
    console.error('Failed to get program articles:', error)
    throw error
  }
}

/**
 * Get a single article with full details
 */
export async function getArticleDetails(articleId: number, locale: string = 'en') {
  try {
    const result = await getArticle({
      article_id: articleId,
      locale
    })
    return result
  } catch (error) {
    console.error('Failed to get article details:', error)
    throw error
  }
}

/**
 * Update article content and translations
 */
export async function updateArticleContent(
  articleId: number,
  articleData: Partial<ArticleCreator>,
  translations: Partial<ArticleCreatorTranslation>[]
) {
  try {
    const result = await updateArticle({
      article_id: articleId,
      article_creators: [articleData],
      article_creator_translation: translations
    })
    console.log('Article updated successfully:', result)
    return result
  } catch (error) {
    console.error('Failed to update article:', error)
    throw error
  }
}

/**
 * Delete article and all related data
 */
export async function deleteArticleAndRelated(articleId: number) {
  try {
    const result = await deleteArticle(articleId)
    console.log('Article deleted successfully:', result)
    return result
  } catch (error) {
    console.error('Failed to delete article:', error)
    throw error
  }
}

/**
 * Get or create article settings for a program
 */
export async function getOrCreateArticleSettings(
  programId: number, 
  locale: string = 'en'
) {
  try {
    const result = await getArticleSettings({
      program_id: programId,
      locale
    })
    return result
  } catch (error) {
    console.error('Failed to get article settings:', error)
    throw error
  }
}

/**
 * Get article categories for dropdown
 */
export async function getArticleCategoriesForDropdown(programId: number = 58, locale: string = 'en') {
  try {
    console.log('Fetching article categories with params:', { locale, program_id: programId })
    const result = await getArticleCategories({
      locale,
      program_id: programId
    })
    console.log('Article categories API response:', result)
    console.log('Article categories data:', result.data)
    return result.data || []
  } catch (error) {
    console.error('Failed to get article categories:', error)
    // Return empty array as fallback
    return []
  }
}

/**
 * Update article settings for a program
 */
export async function updateProgramArticleSettings(
  programId: number,
  settings: Partial<ArticleSettings>,
  translations?: any[]
) {
  try {
    const result = await updateArticleSettings({
      program_id: programId,
      article_settings: settings,
      article_setting_translations: translations
    })
    console.log('Article settings updated successfully:', result)
    return result
  } catch (error) {
    console.error('Failed to update article settings:', error)
    throw error
  }
}

// Error handling utilities

export class ArticleAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message)
    this.name = 'ArticleAPIError'
  }
}

/**
 * Handle API errors with proper error types
 */
export function handleArticleAPIError(error: any, endpoint: string): never {
  if (error instanceof ArticleAPIError) {
    throw error
  }
  
  throw new ArticleAPIError(
    error.message || 'Unknown API error',
    error.statusCode,
    endpoint
  )
} 
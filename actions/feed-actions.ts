// Types for feed data structures
export interface Feed {
  id?: number
  title: string
  description?: string
  logo?: string
  published_at: string
  is_active?: number
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}

export interface FeedContent {
  id?: number
  feed_id?: number
  locale: string
  title: string
  description?: string
  type: 'Video' | 'Audio' | 'File' | 'Article'
  content_url?: string
  thumbnail?: string
  duration?: number
  file_size?: number
  metadata?: Record<string, any>
  created_at?: string
  updated_at?: string
}

export interface FeedSubscription {
  id?: number
  feed_id: number
  subscriber_id: number
  subscriber_type: 'App\\Models\\Organization' | 'App\\Models\\Program'
  created_at?: string
  updated_at?: string
}

export interface FeedProgram {
  id?: number
  feed_id: number
  program_id: number
  created_at?: string
  updated_at?: string
}

export interface FeedContentLibrary {
  id?: number
  feed_content_id: number
  library_id: number
  library_type: 'App\\Models\\Article' | 'App\\Models\\Video'
  created_at?: string
  updated_at?: string
}

export interface ProgramFeaturedFeed {
  id?: number
  program_id: number
  feed_id: number
  sort_order?: number
  created_at?: string
  updated_at?: string
}

export interface UserHiddenFeed {
  id?: number
  user_id: number
  feed_id: number
  created_at?: string
  updated_at?: string
}

export interface UserFavoriteFeed {
  id?: number
  user_id: number
  feed_id: number
  created_at?: string
  updated_at?: string
}

// Request/Response interfaces for API calls
export interface CreateFeedData {
  feeds: Feed[]
  feed_contents?: FeedContent[]
  feed_subscriptions?: FeedSubscription[]
  feed_programs?: FeedProgram[]
  feed_content_libraries?: FeedContentLibrary[]
}

export interface UpdateFeedData {
  feed_id: number
  feeds: Partial<Feed>[]
  feed_contents?: Partial<FeedContent>[]
  feed_subscriptions?: Partial<FeedSubscription>[]
  feed_programs?: Partial<FeedProgram>[]
}

export interface ListFeedsParams {
  program_id?: number
  locale?: string
  limit?: number
  offset?: number
  include_hidden?: boolean
  include_favorites?: boolean
}

export interface ViewFeedParams {
  feed_id: number
  locale?: string
  include_content?: boolean
}

export interface FeedContentParams {
  feed_id: number
  locale?: string
  content_type?: 'Video' | 'Audio' | 'File' | 'Article'
  limit?: number
  offset?: number
}

export interface SubscribeFeedParams {
  feed_id: number
  subscriber_id: number
  subscriber_type: 'App\\Models\\Organization' | 'App\\Models\\Program'
}

export interface UnsubscribeFeedParams {
  feed_id: number
  subscriber_id: number
  subscriber_type: 'App\\Models\\Organization' | 'App\\Models\\Program'
}

export interface HideFeedParams {
  feed_id: number
  user_id: number
}

export interface ShowFeedParams {
  feed_id: number
  user_id: number
}

export interface FavoriteFeedParams {
  feed_id: number
  user_id: number
}

export interface GetFavoritesParams {
  user_id: number
  locale?: string
  limit?: number
  offset?: number
}

// API Response interfaces
export interface FeedListResponse {
  success: boolean
  message: string
  data: {
    feeds: Feed[]
    total: number
    limit: number
    offset: number
  } | null
}

export interface FeedViewResponse {
  success: boolean
  message: string
  data: {
    feed: Feed
    contents?: FeedContent[]
    subscriptions?: FeedSubscription[]
    programs?: FeedProgram[]
  } | null
}

export interface FeedContentResponse {
  success: boolean
  message: string
  data: {
    contents: FeedContent[]
    total: number
    limit: number
    offset: number
  } | null
}

export interface FeedActionResponse {
  success: boolean
  message: string
  data: any
}

export interface FavoritesResponse {
  success: boolean
  message: string
  data: {
    favorites: Feed[]
    total: number
    limit: number
    offset: number
  } | null
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
    const token = localStorage.getItem('authToken')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      console.warn('No auth token found for protected endpoint:', endpoint)
      throw new Error('Authentication token not found')
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
      
      // Try to parse error response
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      
      throw new FeedAPIError(
        errorData.message || `API call failed: ${response.status} ${response.statusText}`,
        response.status,
        endpoint
      )
    }

    const result = await response.json()
    console.log('API Response:', result)
    return result
  } catch (error) {
    console.error('API call error:', error)
    if (error instanceof FeedAPIError) {
      throw error
    }
    throw new FeedAPIError(
      error instanceof Error ? error.message : 'Unknown API error',
      undefined,
      endpoint
    )
  }
}

// Public API endpoints (no authentication required)

/**
 * Get feeds for a program
 */
export async function getFeeds(params: ListFeedsParams): Promise<FeedListResponse> {
  return apiCall<FeedListResponse>('/feeds/list', 'POST', params)
}

/**
 * Get specific feed with content
 */
export async function getFeed(params: ViewFeedParams): Promise<FeedViewResponse> {
  return apiCall<FeedViewResponse>('/feeds/view', 'POST', params)
}

/**
 * Get detailed feed content
 */
export async function getFeedContent(params: FeedContentParams): Promise<FeedContentResponse> {
  return apiCall<FeedContentResponse>('/feeds/content', 'POST', params)
}

// Protected API endpoints (authentication required)

/**
 * Create new feeds with content
 */
export async function createFeed(data: CreateFeedData): Promise<FeedActionResponse> {
  return apiCall<FeedActionResponse>('/feeds/create', 'POST', data, true)
}

/**
 * Update existing feeds
 */
export async function updateFeed(data: UpdateFeedData): Promise<FeedActionResponse> {
  return apiCall<FeedActionResponse>('/feeds/update', 'POST', data, true)
}

/**
 * Delete feeds (soft delete)
 */
export async function deleteFeed(feedId: number): Promise<FeedActionResponse> {
  return apiCall<FeedActionResponse>('/feeds/delete', 'POST', { feed_id: feedId }, true)
}

/**
 * Subscribe to feeds
 */
export async function subscribeToFeed(params: SubscribeFeedParams): Promise<FeedActionResponse> {
  return apiCall<FeedActionResponse>('/feeds/subscribe', 'POST', params, true)
}

/**
 * Unsubscribe from feeds
 */
export async function unsubscribeFromFeed(params: UnsubscribeFeedParams): Promise<FeedActionResponse> {
  return apiCall<FeedActionResponse>('/feeds/unsubscribe', 'POST', params, true)
}

/**
 * Hide feeds for users
 */
export async function hideFeed(params: HideFeedParams): Promise<FeedActionResponse> {
  return apiCall<FeedActionResponse>('/feeds/hide', 'POST', params, true)
}

/**
 * Show hidden feeds
 */
export async function showFeed(params: ShowFeedParams): Promise<FeedActionResponse> {
  return apiCall<FeedActionResponse>('/feeds/show', 'POST', params, true)
}

/**
 * Add feed to favorites
 */
export async function addToFavorites(params: FavoriteFeedParams): Promise<FeedActionResponse> {
  return apiCall<FeedActionResponse>('/feeds/favorite/add', 'POST', params, true)
}

/**
 * Remove feed from favorites
 */
export async function removeFromFavorites(params: FavoriteFeedParams): Promise<FeedActionResponse> {
  return apiCall<FeedActionResponse>('/feeds/favorite/remove', 'POST', params, true)
}

/**
 * Get user's favorite feeds
 */
export async function getFavorites(params: GetFavoritesParams): Promise<FavoritesResponse> {
  return apiCall<FavoritesResponse>('/feeds/favorites', 'POST', params, true)
}

// Convenience functions for common operations

/**
 * Get feeds for current user's organization
 */
export async function getCurrentUserFeeds(
  programId?: number,
  locale: string = 'en',
  limit: number = 20,
  offset: number = 0
): Promise<{ success: boolean; data: Feed[]; error?: string }> {
  try {
    const response = await getFeeds({
      program_id: programId,
      locale,
      limit,
      offset
    })
    
    if (response.success && response.data) {
      return {
        success: true,
        data: response.data.feeds
      }
    } else {
      return {
        success: false,
        data: [],
        error: response.message || 'Failed to fetch feeds'
      }
    }
  } catch (error) {
    console.error('Error fetching feeds:', error)
    
    if (error instanceof FeedAPIError) {
      return {
        success: false,
        data: [],
        error: error.message
      }
    }
    
    return {
      success: false,
      data: [],
      error: 'Unknown error occurred while fetching feeds'
    }
  }
}

/**
 * Create a simple feed with basic content
 */
export async function createSimpleFeed(
  title: string,
  description: string,
  programId: number,
  content?: Partial<FeedContent>
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const feedData: CreateFeedData = {
      feeds: [{
        title,
        description,
        published_at: new Date().toISOString(),
        is_active: 1
      }],
      feed_programs: [{
        feed_id: 0, // Will be set by the API
        program_id: programId
      }]
    }

    if (content) {
      feedData.feed_contents = [{
        locale: 'en',
        title: content.title || title,
        description: content.description || description,
        type: content.type || 'Article',
        ...content
      }]
    }

    const response = await createFeed(feedData)
    
    if (response.success) {
      return {
        success: true,
        data: response.data
      }
    } else {
      return {
        success: false,
        error: response.message || 'Failed to create feed'
      }
    }
  } catch (error) {
    console.error('Error creating feed:', error)
    
    if (error instanceof FeedAPIError) {
      return {
        success: false,
        error: error.message
      }
    }
    
    return {
      success: false,
      error: 'Unknown error occurred while creating feed'
    }
  }
}

/**
 * Get feed details with content
 */
export async function getFeedDetails(
  feedId: number,
  locale: string = 'en',
  includeContent: boolean = true
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await getFeed({
      feed_id: feedId,
      locale,
      include_content: includeContent
    })
    
    if (response.success && response.data) {
      return {
        success: true,
        data: response.data
      }
    } else {
      return {
        success: false,
        error: response.message || 'Failed to fetch feed details'
      }
    }
  } catch (error) {
    console.error('Error fetching feed details:', error)
    
    if (error instanceof FeedAPIError) {
      return {
        success: false,
        error: error.message
      }
    }
    
    return {
      success: false,
      error: 'Unknown error occurred while fetching feed details'
    }
  }
}

/**
 * Update feed content
 */
export async function updateFeedContent(
  feedId: number,
  feedData: Partial<Feed>,
  contents?: Partial<FeedContent>[]
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const updateData: UpdateFeedData = {
      feed_id: feedId,
      feeds: [feedData]
    }

    if (contents) {
      updateData.feed_contents = contents
    }

    const response = await updateFeed(updateData)
    
    if (response.success) {
      return {
        success: true,
        data: response.data
      }
    } else {
      return {
        success: false,
        error: response.message || 'Failed to update feed'
      }
    }
  } catch (error) {
    console.error('Error updating feed:', error)
    
    if (error instanceof FeedAPIError) {
      return {
        success: false,
        error: error.message
      }
    }
    
    return {
      success: false,
      error: 'Unknown error occurred while updating feed'
    }
  }
}

/**
 * Toggle feed favorite status
 */
export async function toggleFeedFavorite(
  feedId: number,
  userId: number
): Promise<{ success: boolean; isFavorite: boolean; error?: string }> {
  try {
    // First check if it's already a favorite
    const favoritesResponse = await getFavorites({
      user_id: userId,
      limit: 1000 // Get all favorites to check
    })

    const isCurrentlyFavorite = favoritesResponse.success && 
      favoritesResponse.data?.favorites.some(feed => feed.id === feedId)

    if (isCurrentlyFavorite) {
      // Remove from favorites
      const response = await removeFromFavorites({ feed_id: feedId, user_id: userId })
      return {
        success: response.success,
        isFavorite: false,
        error: response.success ? undefined : response.message
      }
    } else {
      // Add to favorites
      const response = await addToFavorites({ feed_id: feedId, user_id: userId })
      return {
        success: response.success,
        isFavorite: true,
        error: response.success ? undefined : response.message
      }
    }
  } catch (error) {
    console.error('Error toggling feed favorite:', error)
    
    if (error instanceof FeedAPIError) {
      return {
        success: false,
        isFavorite: false,
        error: error.message
      }
    }
    
    return {
      success: false,
      isFavorite: false,
      error: 'Unknown error occurred while toggling favorite'
    }
  }
}

/**
 * Subscribe current user's organization to a feed
 */
export async function subscribeCurrentOrganizationToFeed(
  feedId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get organization ID from localStorage
    const fullAuthResponse = localStorage.getItem('fullAuthResponse')
    let organizationId = 2 // Default fallback
    
    if (fullAuthResponse) {
      try {
        const authData = JSON.parse(fullAuthResponse)
        organizationId = authData.data.organization?.id || 2
      } catch (error) {
        console.error('Error parsing fullAuthResponse:', error)
      }
    }

    const response = await subscribeToFeed({
      feed_id: feedId,
      subscriber_id: organizationId,
      subscriber_type: 'App\\Models\\Organization'
    })

    return {
      success: response.success,
      error: response.success ? undefined : response.message
    }
  } catch (error) {
    console.error('Error subscribing to feed:', error)
    
    if (error instanceof FeedAPIError) {
      return {
        success: false,
        error: error.message
      }
    }
    
    return {
      success: false,
      error: 'Unknown error occurred while subscribing to feed'
    }
  }
}

// Error handling classes and utilities

export class FeedAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message)
    this.name = 'FeedAPIError'
  }
}

export function handleFeedAPIError(error: any, endpoint: string): never {
  if (error instanceof FeedAPIError) {
    console.error(`Feed API Error at ${endpoint}:`, error.message)
    throw error
  }
  
  console.error(`Unexpected error at ${endpoint}:`, error)
  throw new FeedAPIError(
    error instanceof Error ? error.message : 'Unknown error occurred',
    undefined,
    endpoint
  )
}

// Utility functions for feed data

export function formatFeedDate(feed: Feed): string {
  if (!feed.published_at) return 'No date'
  
  try {
    const date = new Date(feed.published_at)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return 'Invalid date'
  }
}

export function formatFeedTime(feed: Feed): string {
  if (!feed.published_at) return 'No time'
  
  try {
    const date = new Date(feed.published_at)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Invalid time'
  }
}

export function isFeedActive(feed: Feed): boolean {
  return feed.is_active === 1
}

export function getFeedContentByType(contents: FeedContent[], type: string): FeedContent[] {
  return contents.filter(content => content.type === type)
}

export function getFeedContentByLocale(contents: FeedContent[], locale: string): FeedContent[] {
  return contents.filter(content => content.locale === locale)
}

export function sortFeedsByDate(feeds: Feed[], ascending: boolean = false): Feed[] {
  return [...feeds].sort((a, b) => {
    const dateA = new Date(a.published_at || 0)
    const dateB = new Date(b.published_at || 0)
    return ascending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
  })
}

export function filterActiveFeeds(feeds: Feed[]): Feed[] {
  return feeds.filter(feed => isFeedActive(feed))
}

export function truncateFeedDescription(description: string, maxLength: number = 150): string {
  if (!description) return ''
  if (description.length <= maxLength) return description
  return description.substring(0, maxLength) + '...'
} 
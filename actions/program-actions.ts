// Types for program data structures
export interface Program {
  program_id: number
  name: string
  title: string
  logo: string | null
  description: string
  start_date: string
  start_time: string
  end_date: string
  end_time: string
  is_live: boolean
  is_count_down: number
  is_registration: number
  user_registered: boolean | null
}

export interface FetchUserOrganizationProgramsParams {
  locale: string
  organization_id: number
}

export interface FetchUserOrganizationProgramsResponse {
  success: boolean
  message: string
  data: {
    organization_id: number
    programs: Program[]
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
  requiresAuth: boolean = true
): Promise<T> {
  const url = `${API_BASE_URL}/api/${API_VERSION}${endpoint}`
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
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
      
      throw new ProgramAPIError(
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
    if (error instanceof ProgramAPIError) {
      throw error
    }
    throw new ProgramAPIError(
      error instanceof Error ? error.message : 'Unknown API error',
      undefined,
      endpoint
    )
  }
}

/**
 * Fetch user organization programs
 * Fetches all programs that the user has access to in a specific organization
 */
export async function fetchUserOrganizationPrograms(
  params: FetchUserOrganizationProgramsParams
): Promise<FetchUserOrganizationProgramsResponse> {
  return apiCall<FetchUserOrganizationProgramsResponse>(
    '/programs/fetch-user-organization',
    'POST',
    params
  )
}

/**
 * Fetch user organization programs with error handling
 * Wrapper function that provides better error handling and fallback data
 */
export async function fetchUserOrganizationProgramsSafe(
  params: FetchUserOrganizationProgramsParams
): Promise<{ success: boolean; data: Program[]; error?: string }> {
  try {
    const response = await fetchUserOrganizationPrograms(params)
    
    if (response.success && response.data) {
      return {
        success: true,
        data: response.data.programs
      }
    } else {
      return {
        success: false,
        data: [],
        error: response.message || 'Failed to fetch programs'
      }
    }
  } catch (error) {
    console.error('Error fetching user organization programs:', error)
    
    if (error instanceof ProgramAPIError) {
      return {
        success: false,
        data: [],
        error: error.message
      }
    }
    
    return {
      success: false,
      data: [],
      error: 'Unknown error occurred while fetching programs'
    }
  }
}

/**
 * Get programs for current user's organization
 * Convenience function that uses the current user's organization ID
 */
export async function getCurrentUserPrograms(
  locale: string = 'en'
): Promise<{ success: boolean; data: Program[]; error?: string }> {
  // Get organization ID from localStorage or use default
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
  
  return fetchUserOrganizationProgramsSafe({
    locale,
    organization_id: organizationId
  })
}

/**
 * Get a specific program by ID
 * Fetches detailed information about a specific program
 */
export async function getProgramById(
  programId: number,
  locale: string = 'en',
  organizationId?: number
): Promise<Program | null> {
  try {
    const orgId = organizationId || 2 // Default fallback
    
    const response = await fetchUserOrganizationProgramsSafe({
      locale,
      organization_id: orgId
    })
    
    if (response.success) {
      return response.data.find(program => program.program_id === programId) || null
    }
    
    return null
  } catch (error) {
    console.error('Error fetching program by ID:', error)
    return null
  }
}

/**
 * Get live programs
 * Returns only programs that are currently live
 */
export async function getLivePrograms(
  locale: string = 'en',
  organizationId?: number
): Promise<Program[]> {
  try {
    const orgId = organizationId || 2 // Default fallback
    
    const response = await fetchUserOrganizationProgramsSafe({
      locale,
      organization_id: orgId
    })
    
    if (response.success) {
      return response.data.filter(program => program.is_live)
    }
    
    return []
  } catch (error) {
    console.error('Error fetching live programs:', error)
    return []
  }
}

/**
 * Get upcoming programs
 * Returns programs that haven't started yet
 */
export async function getUpcomingPrograms(
  locale: string = 'en',
  organizationId?: number
): Promise<Program[]> {
  try {
    const orgId = organizationId || 2 // Default fallback
    
    const response = await fetchUserOrganizationProgramsSafe({
      locale,
      organization_id: orgId
    })
    
    if (response.success) {
      const now = new Date()
      return response.data.filter(program => {
        const startDate = new Date(`${program.start_date} ${program.start_time}`)
        return startDate > now
      })
    }
    
    return []
  } catch (error) {
    console.error('Error fetching upcoming programs:', error)
    return []
  }
}

/**
 * Get user registered programs
 * Returns programs where the user is registered
 */
export async function getUserRegisteredPrograms(
  locale: string = 'en',
  organizationId?: number
): Promise<Program[]> {
  try {
    const orgId = organizationId || 2 // Default fallback
    
    const response = await fetchUserOrganizationProgramsSafe({
      locale,
      organization_id: orgId
    })
    
    if (response.success) {
      return response.data.filter(program => program.user_registered === true)
    }
    
    return []
  } catch (error) {
    console.error('Error fetching user registered programs:', error)
    return []
  }
}

// Error handling classes
export class ProgramAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message)
    this.name = 'ProgramAPIError'
  }
}

export function handleProgramAPIError(error: any, endpoint: string): never {
  if (error instanceof ProgramAPIError) {
    throw error
  }
  
  const message = error instanceof Error ? error.message : 'Unknown program API error'
  throw new ProgramAPIError(message, undefined, endpoint)
}

// Utility functions
export function formatProgramDate(program: Program): string {
  const startDate = new Date(`${program.start_date} ${program.start_time}`)
  const endDate = new Date(`${program.end_date} ${program.end_time}`)
  
  const startFormatted = startDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  
  const endFormatted = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  
  return `${startFormatted} - ${endFormatted}`
}

export function formatProgramTime(program: Program): string {
  const startTime = new Date(`2000-01-01 ${program.start_time}`)
  const endTime = new Date(`2000-01-01 ${program.end_time}`)
  
  return `${startTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })} - ${endTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })}`
}

export function isProgramLive(program: Program): boolean {
  const now = new Date()
  const startDate = new Date(`${program.start_date} ${program.start_time}`)
  const endDate = new Date(`${program.end_date} ${program.end_time}`)
  
  return now >= startDate && now <= endDate && program.is_live
}

export function isProgramUpcoming(program: Program): boolean {
  const now = new Date()
  const startDate = new Date(`${program.start_date} ${program.start_time}`)
  
  return startDate > now
}

export function isProgramPast(program: Program): boolean {
  const now = new Date()
  const endDate = new Date(`${program.end_date} ${program.end_time}`)
  
  return endDate < now
} 
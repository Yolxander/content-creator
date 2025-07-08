"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type Profile = {
  id: number
  user_id: number
  name: string
  email: string
  phone?: string
  website?: string
  role: "web dev" | "designer"
  description: string
  slug: string
  is_verified: boolean
  is_active: boolean
  settings: Record<string, any>
  created_at: string
  updated_at: string
}

type User = {
  id: string
  email?: string
  name?: string
  profile?: Profile
  token?: string
  firebase_uuid?: string
  roles?: string[]
  is_notifications?: boolean
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, firstName: string, lastName: string, emailConfirmation: string, passwordConfirmation: string, terms: boolean) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Function to generate version header (simplified without encryption for now)
function generateVersionHeader(): string {
  const version = "0.46" // Minimum supported version
  const versionData = `Version:${version}`
  // For now, just return base64 encoded version data
  return btoa(versionData)
}

// Function to get CSRF token from cookies
function getCSRFToken(): string | null {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === 'XSRF-TOKEN') {
        return decodeURIComponent(value)
      }
    }
  }
  return null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const API_BASE_URL = "http://127.0.0.1:8000/api/v3" // Updated to v3
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  // Helper function to handle API requests
  const apiRequest = async (endpoint: string, method = "GET", body?: any, headers?: any) => {
    const url = `${API_BASE_URL}${endpoint}`
    
    // Generate version header
    const versionHeader = generateVersionHeader()
    
    // Get auth token from localStorage (except for login/register endpoints)
    const isAuthEndpoint = endpoint.includes('/auth/login') || endpoint.includes('/auth/register')
    const authToken = !isAuthEndpoint ? localStorage.getItem('authToken') : null
    
    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "organization_id": "2",
        ...(authToken && { "Authorization": `Bearer ${authToken}` }),
        ...headers,
      },
    }

    // Only add version header for non-auth endpoints (temporarily)
    if (!isAuthEndpoint) {
      config.headers = {
        ...config.headers,
        "version": versionHeader,
      }
    }

    if (body) {
      config.body = JSON.stringify(body)
    }

    console.log('Making API request to:', url)
    console.log('Auth token available:', !!authToken)
    console.log('Request headers:', config.headers)
    if (body) {
      console.log('Request body:', body)
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json()
        console.error(`API Request Failed: Status: ${response.status}, Body: ${JSON.stringify(errorData)}`)
        throw new Error(`HTTP error! status: ${response.status}, body: ${JSON.stringify(errorData)}`)
      }

      if (response.status === 204) {
        // No content
        return null
      }

      const data = await response.json()
      console.log('API Response:', data)
      return data
    } catch (error: any) {
      console.error("API Request Error:", error)
      throw new Error(error.message || "An error occurred during the API request")
    }
  }

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("authToken")

    async function initializeAuth() {
      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)

          // Check if we need to redirect based on profile status
          const currentPath = pathname
          const validPaths = ["/clients", "/projects", "/tasks", "/messaging", "/calendar", "/files", "/profile", "/proposals", "/deliverables", "/tools", "/intake", "/marketplace"]
          const publicPaths = ["/", "/auth", "/about"]
          const isValidPath = validPaths.some((path) => currentPath.startsWith(path))
          const isPublicPath = publicPaths.some((path) => currentPath === path)

          if (!isValidPath && !isPublicPath) {
            // If user has no profile and isn't on onboarding, redirect to onboarding
            if (!parsedUser.profile && currentPath !== "/onboarding") {
              router.push("/onboarding")
            }
            // If user has profile and is on onboarding, redirect to dashboard
            else if (parsedUser.profile && currentPath === "/onboarding") {
              router.push("/dashboard")
            }
          }
        } catch (error) {
          console.error("Error parsing user from localStorage:", error)
          localStorage.removeItem("user")
          localStorage.removeItem("authToken")
          router.push("/auth")
        }
      } else if (window.location.pathname !== "/auth" && window.location.pathname !== "/" && window.location.pathname !== "/about") {
        // If no user is stored and we're not on a public page, redirect to auth
        router.push("/auth")
      }
      setLoading(false)
    }

    initializeAuth()
  }, [router, pathname])

  const signIn = async (email: string, password: string) => {
    setError(null)
    setLoading(true)
    try {
      // Updated request body format for v3 API
      const requestBody = {
        email,
        password,
        organization_id: 2
      }

      const data = await apiRequest("/auth/login", "POST", requestBody)

      if (data && data.success && data.data && data.data.token) {
        console.log('Auth token received:', data.data.token)
        console.log('Full auth response:', data)
        console.log('Profile data in response:', data.data.profile)
        
        const user = {
          id: data.data.firebase_uuid || '1', // Use firebase_uuid as id
          email: email,
          name: data.data.name,
          token: data.data.token,
          firebase_uuid: data.data.firebase_uuid,
          roles: data.data.roles,
          is_notifications: data.data.is_notifications,
          profile: data.data.profile || null // Use profile from response if available
        }
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("authToken", data.data.token)
        
        // Also set token in cookie for middleware
        document.cookie = `authToken=${data.data.token}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
        
        // Log the stored token for debugging
        const storedToken = localStorage.getItem('authToken')
        console.log('Auth token stored in localStorage:', storedToken)
        console.log('Token length:', storedToken?.length)
        console.log('User object saved to localStorage:', user)

        // Redirect based on profile status
        console.log('User profile status:', user.profile)
        if (user.profile) {
          console.log('User has profile, redirecting to home')
          router.push("/")
        } else {
          console.log('User has no profile, redirecting to onboarding')
          router.push("/onboarding")
        }

        return { error: null }
      } else {
        const message = data?.message || "Login failed"
        console.error("Sign-in error:", message, data)
        throw new Error(message)
      }
    } catch (error: any) {
      console.error("Sign-in error:", error)
      setError(error.message)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, firstName: string, lastName: string, emailConfirmation: string, passwordConfirmation: string, terms: boolean) => {
    setError(null)
    setLoading(true)
    try {
      // Note: The v3 API documentation doesn't show a register endpoint
      // You may need to check with your backend team for the correct register endpoint
      const data = await apiRequest("/auth/register", "POST", {
        first_name: firstName,
        last_name: lastName,
        email,
        email_confirmation: emailConfirmation,
        password,
        password_confirmation: passwordConfirmation,
        terms: terms,
        organization_id: 2
      })

      if (data && data.success) {
        console.log('Registration successful:', data.message)
        
        // For successful registration, we don't get a token immediately
        // The user needs to wait for approval, so we don't set user state
        // Just show success message and redirect to login
        return { error: null }
      } else {
        // Handle validation errors
        if (data && !data.success && data.message) {
          // Extract error messages from the message array
          let errorMessage = "Registration failed"
          if (Array.isArray(data.message)) {
            // Handle array of validation errors
            const errorMessages = data.message.map((error: any) => {
              const field = Object.keys(error)[0]
              return error[field]
            }).join(', ')
            errorMessage = errorMessages
          } else if (typeof data.message === 'string') {
            // Handle single error message
            errorMessage = data.message
          }
          throw new Error(errorMessage)
        } else {
          throw new Error("Registration failed")
        }
      }
    } catch (error: any) {
      console.error("Sign-up error:", error)
      setError(error.message)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      const token = localStorage.getItem("authToken")
      if (token) {
        console.log('Logging out with token:', token)
        // Call the v3 API logout endpoint
        await apiRequest("/api/v3/auth/logout", "POST", {
          organization_id: 2
        }, {
          Authorization: `Bearer ${token}`,
        })
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Remove all user data from localStorage
      localStorage.removeItem("user")
      localStorage.removeItem("authToken")
      // Remove token from cookie
      document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      // Clear user state
      setUser(null)
      // Redirect to auth page
      router.push("/auth")
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 
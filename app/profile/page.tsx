"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import SidebarNav from "@/components/ui/SidebarNav"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown, User, Building2, Users, Key } from "lucide-react"
import { createClient, User as SupabaseUser } from '@supabase/supabase-js'
import { useToast } from "@/components/ui/use-toast"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  role: 'creator' | 'admin' | 'reviewer' | 'super-admin'
  is_independent_mode: boolean
  organization_id: string | null
  segment_id: string | null
  program_id: string | null
  created_at: string
  updated_at: string
}

type Organization = {
  id: string
  name: string
}

type Segment = {
  id: string
  name: string
  organization_id: string
}

type Program = {
  id: string
  name: string
  segment_id: string
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [segments, setSegments] = useState<Segment[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          toast({
            title: "Error",
            description: "Not authenticated",
            variant: "destructive"
          })
          return
        }

        // Load profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        // If profile doesn't exist, create it
        if (!profileData) {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              {
                id: user.id,
                email: user.email,
                full_name: user.email?.split('@')[0] || 'New User',
                avatar_url: null,
                role: 'creator',
                is_independent_mode: false,
                organization_id: null,
                segment_id: null,
                program_id: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            ])
            .select()
            .single()

          if (createError) {
            throw createError
          }

          setProfile(newProfile)
        } else {
          setProfile(profileData)
        }

        // Load organizations
        const { data: orgsData } = await supabase
          .from('organizations')
          .select('*')
          .order('name')

        setOrganizations(orgsData || [])

        if (profileData?.organization_id) {
          // Load segments
          const { data: segmentsData } = await supabase
            .from('segments')
            .select('*')
            .eq('organization_id', profileData.organization_id)
            .order('name')

          setSegments(segmentsData || [])

          if (profileData.segment_id) {
            // Load programs
            const { data: programsData } = await supabase
              .from('programs')
              .select('*')
              .eq('segment_id', profileData.segment_id)
              .order('name')

            setPrograms(programsData || [])
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [toast])

  const handleOrganizationChange = async (orgId: string) => {
    try {
      const { data: segmentsData } = await supabase
        .from('segments')
        .select('*')
        .eq('organization_id', orgId)
        .order('name')

      setSegments(segmentsData || [])
      setPrograms([])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load segments",
        variant: "destructive"
      })
    }
  }

  const handleSegmentChange = async (segmentId: string) => {
    try {
      const { data: programsData } = await supabase
        .from('programs')
        .select('*')
        .eq('segment_id', segmentId)
        .order('name')

      setPrograms(programsData || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load programs",
        variant: "destructive"
      })
    }
  }

  const handleProfileSubmit = async (formData: FormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Show loading toast
      toast({
        title: "Updating Profile",
        description: "Please wait while we save your changes...",
        duration: 2000,
      })

      // Get form values with proper type checking
      const full_name = formData.get('full_name') as string
      const role = formData.get('role') as Profile['role']
      const is_independent_mode = formData.get('is_independent_mode') === 'true'
      const organization_id = formData.get('organization_id') as string || null
      const segment_id = formData.get('segment_id') as string || null
      const program_id = formData.get('program_id') as string || null
      const avatar_url = formData.get('avatar_url') as string || null

      // Validate required fields
      if (!full_name || !role) {
        throw new Error('Full name and role are required')
      }

      const updates = {
        full_name,
        role,
        is_independent_mode,
        organization_id,
        segment_id,
        program_id,
        avatar_url,
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) {
        console.error('Update error:', error)
        throw error
      }

      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null)

      // Show success toast
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        duration: 5000,
        className: "bg-green-50 border-green-200",
      })
    } catch (error) {
      console.error('Profile update error:', error)
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  const handlePasswordSubmit = async (formData: FormData) => {
    try {
      // Show loading toast
      toast({
        title: "Updating Password",
        description: "Please wait while we update your password...",
        duration: 2000,
      })

      const newPassword = formData.get('new_password') as string
      const confirmPassword = formData.get('confirm_password') as string

      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match')
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      // Show success toast
      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated.",
        duration: 5000,
        className: "bg-green-50 border-green-200",
      })
    } catch (error) {
      console.error('Password update error:', error)
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update password",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#f6f3ef]">
        <SidebarNav />
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex h-screen bg-[#f6f3ef]">
        <SidebarNav />
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-[#05AFF2] mb-8">Profile Not Found</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#f6f3ef]">
      <SidebarNav />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#05AFF2] mb-8">User Profile</h1>
          
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-6 mb-8">
              <Avatar className="w-24 h-24 rounded-full shadow-md">
                <AvatarImage src={profile.avatar_url || "/placeholder.svg?height=96&width=96"} />
                <AvatarFallback>{profile.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-[#05AFF2]">{profile.full_name}</h2>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-sm text-gray-500">Member since {new Date(profile.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <form action={handleProfileSubmit} className="space-y-6">
              {/* Basic Information Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#05AFF2]" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input 
                      name="full_name" 
                      defaultValue={profile.full_name}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label>Avatar URL</Label>
                    <Input 
                      name="avatar_url" 
                      defaultValue={profile.avatar_url || ''}
                      placeholder="Enter avatar URL"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Role & Access Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#05AFF2]" />
                  Role & Access
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>User Role</Label>
                    <Select name="role" defaultValue={profile.role}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="creator">Creator</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="reviewer">Reviewer</SelectItem>
                        <SelectItem value="super-admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Organization Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#05AFF2]" />
                  Organization
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Independent Mode</Label>
                    <Switch
                      name="is_independent_mode"
                      defaultChecked={profile.is_independent_mode}
                    />
                  </div>
                  
                  {!profile.is_independent_mode && (
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label>Primary Organization</Label>
                        <Select 
                          name="organization_id" 
                          defaultValue={profile.organization_id || undefined}
                          onValueChange={handleOrganizationChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization" />
                          </SelectTrigger>
                          <SelectContent>
                            {organizations.map(org => (
                              <SelectItem key={org.id} value={org.id}>
                                {org.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Segment</Label>
                        <Select 
                          name="segment_id"
                          defaultValue={profile.segment_id || undefined}
                          onValueChange={handleSegmentChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select segment" />
                          </SelectTrigger>
                          <SelectContent>
                            {segments.map(segment => (
                              <SelectItem key={segment.id} value={segment.id}>
                                {segment.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Program</Label>
                        <Select 
                          name="program_id"
                          defaultValue={profile.program_id || undefined}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            {programs.map(program => (
                              <SelectItem key={program.id} value={program.id}>
                                {program.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Security Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Key className="w-5 h-5 text-[#05AFF2]" />
                  Security
                </h3>
                <form action={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input name="current_password" type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input name="new_password" type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <Label>Confirm New Password</Label>
                    <Input name="confirm_password" type="password" placeholder="Confirm new password" />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-[#05AFF2] hover:bg-[#05AFF2]/90">
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit" className="bg-[#05AFF2] hover:bg-[#05AFF2]/90">
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
} 
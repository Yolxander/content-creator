'use server'

import { supabase } from '@/utils/supabase/client'
import { revalidatePath } from 'next/cache'

export type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  role: 'creator' | 'admin' | 'reviewer' | 'super-admin'
  is_independent_mode: boolean
  organization_id: string | null
  segment_id: string | null
  program_id: string | null
}

export type Organization = {
  id: string
  name: string
}

export type Segment = {
  id: string
  name: string
  organization_id: string
}

export type Program = {
  id: string
  name: string
  segment_id: string
}

export async function getProfile(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

export async function updateProfile(formData: FormData) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const updates = {
    full_name: formData.get('full_name') as string,
    role: formData.get('role') as Profile['role'],
    is_independent_mode: formData.get('is_independent_mode') === 'true',
    organization_id: formData.get('organization_id') as string || null,
    segment_id: formData.get('segment_id') as string || null,
    program_id: formData.get('program_id') as string || null,
  }

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)

  if (error) throw error

  revalidatePath('/profile')
  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const currentPassword = formData.get('current_password') as string
  const newPassword = formData.get('new_password') as string

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) throw error

  return { success: true }
}

export async function getOrganizations(): Promise<Organization[]> {
  const { data: organizations } = await supabase
    .from('organizations')
    .select('*')
    .order('name')

  return organizations || []
}

export async function getSegments(organizationId: string): Promise<Segment[]> {
  const { data: segments } = await supabase
    .from('segments')
    .select('*')
    .eq('organization_id', organizationId)
    .order('name')

  return segments || []
}

export async function getPrograms(segmentId: string): Promise<Program[]> {
  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .eq('segment_id', segmentId)
    .order('name')

  return programs || []
} 
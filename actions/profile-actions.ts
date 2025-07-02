import { toast } from '@/components/ui/use-toast'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export type OnboardingData = {
  organization_id: number;
  company: string;
  address: string;
  title: string;
  preferred_language: string;
  terms: boolean;
};

export type ProfileUpdateData = {
  program_id: number;
  first_name?: string;
  last_name?: string;
  profile_picture?: string;
  title?: string;
  address?: string;
  company?: string;
  organization_id: number;
};

export type NotificationUpdateData = {
  notifications: boolean;
  organization_id: number;
};

export type BadgeEarned = {
  badge_name: string;
  points_earned: number;
};

export type ProfileResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  badge_earned?: BadgeEarned;
};

export async function submitOnboarding(data: OnboardingData): Promise<ProfileResponse | null> {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}/api/v3/user/profile/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        program_id: 1, // Default program ID, can be made configurable
        organization_id: data.organization_id,
        company: data.company,
        address: data.address,
        title: data.title,
        // Note: preferred_language and terms are not part of the profile update API
        // These might need to be handled separately or stored differently
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit onboarding data')
    }

    toast({
      title: "Success",
      description: "Onboarding completed successfully!",
    })

    // Show badge earned notification if applicable
    if (result.data?.badge_earned) {
      toast({
        title: "Badge Earned!",
        description: `Congratulations! You earned the "${result.data.badge_earned.badge_name}" badge and ${result.data.badge_earned.points_earned} points!`,
      })
    }

    return result
  } catch (error) {
    console.error('Error submitting onboarding data:', error)
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to submit onboarding data",
      variant: "destructive",
    })
    return null
  }
}

export async function getUserProfile(programId: number, organizationId: number): Promise<any> {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}/api/v3/user/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        program_id: programId,
        organization_id: organizationId
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to fetch user profile')
    }

    const result = await response.json()
    return result.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to fetch user profile",
      variant: "destructive",
    })
    return null
  }
}

export async function updateUserProfile(data: ProfileUpdateData): Promise<ProfileResponse | null> {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}/api/v3/user/profile/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to update user profile')
    }

    toast({
      title: "Success",
      description: result.message || "User profile updated successfully!",
    })

    // Show badge earned notification if applicable
    if (result.data?.badge_earned) {
      toast({
        title: "Badge Earned!",
        description: `Congratulations! You earned the "${result.data.badge_earned.badge_name}" badge and ${result.data.badge_earned.points_earned} points!`,
      })
    }

    return result
  } catch (error) {
    console.error('Error updating user profile:', error)
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to update user profile",
      variant: "destructive",
    })
    return null
  }
}

export async function updateNotificationSettings(data: NotificationUpdateData): Promise<boolean> {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_URL}/api/v3/user/notifications/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to update notification settings')
    }

    toast({
      title: "Success",
      description: result.message || "Notification settings updated successfully!",
    })
    return true
  } catch (error) {
    console.error('Error updating notification settings:', error)
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to update notification settings",
      variant: "destructive",
    })
    return false
  }
} 
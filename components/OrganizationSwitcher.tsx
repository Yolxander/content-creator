"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { fetchUserOrganizationProgramsSafe } from "@/actions/program-actions"

interface Organization {
  id: number
  legal_name: string
  dashboard_url: string
  default_program_id: number
  pivot?: any
}

export function OrganizationSwitcher() {
  const { user } = useAuth()
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)

  // Load organizations from auth response and fetch programs for current organization
  useEffect(() => {
    if (user?.organization) {
      // Load all organizations from localStorage
      const fullAuthResponse = localStorage.getItem('fullAuthResponse')
      if (fullAuthResponse) {
        try {
          const authData = JSON.parse(fullAuthResponse)
          if (authData.data.all_organizations && authData.data.all_organizations.length > 0) {
            setOrganizations(authData.data.all_organizations)
            
            // Set current organization as selected
            const currentOrg = authData.data.all_organizations.find(
              (org: Organization) => org.id === user.organization?.id
            )
            if (currentOrg) {
              setSelectedOrg(currentOrg)
              
              // Fetch programs for current organization if not already stored
              const storedPrograms = localStorage.getItem('currentOrganizationPrograms')
              if (!storedPrograms) {
                fetchProgramsForOrganization(currentOrg.id)
              }
            } else {
              // Fallback to first organization
              const firstOrg = authData.data.all_organizations[0]
              setSelectedOrg(firstOrg)
              
              // Fetch programs for first organization
              fetchProgramsForOrganization(firstOrg.id)
            }
          }
        } catch (error) {
          console.error('Error parsing fullAuthResponse:', error)
        }
      }
    }
  }, [user])

  // Helper function to fetch programs for an organization
  const fetchProgramsForOrganization = async (organizationId: number) => {
    try {
      console.log('Fetching programs for organization on load:', organizationId)
      const { success, data: programs, error } = await fetchUserOrganizationProgramsSafe({
        locale: 'en',
        organization_id: organizationId
      })
      
      if (success && programs.length > 0) {
        console.log('Programs fetched on load:', programs)
        localStorage.setItem('currentOrganizationPrograms', JSON.stringify(programs))
      } else {
        console.error('Failed to fetch programs on load:', error)
        localStorage.setItem('currentOrganizationPrograms', JSON.stringify([]))
      }
    } catch (error) {
      console.error('Error fetching programs on load:', error)
      localStorage.setItem('currentOrganizationPrograms', JSON.stringify([]))
    }
  }

  // Handle organization switching
  const handleOrganizationSwitch = async (organization: Organization) => {
    setSelectedOrg(organization)
    
    try {
      // Fetch programs for the selected organization
      console.log('Fetching programs for organization:', organization.id)
      const { success, data: programs, error } = await fetchUserOrganizationProgramsSafe({
        locale: 'en',
        organization_id: organization.id
      })
      
      if (success && programs.length > 0) {
        console.log('Programs fetched successfully:', programs)
        
        // Store programs in localStorage
        localStorage.setItem('currentOrganizationPrograms', JSON.stringify(programs))
        console.log('Programs stored in localStorage')
      } else {
        console.error('Failed to fetch programs:', error)
        // Store empty array if no programs found
        localStorage.setItem('currentOrganizationPrograms', JSON.stringify([]))
      }
      
      // Update localStorage with new organization
      const fullAuthResponse = localStorage.getItem('fullAuthResponse')
      if (fullAuthResponse) {
        const authData = JSON.parse(fullAuthResponse)
        authData.data.organization = {
          id: organization.id,
          name: organization.legal_name,
          dashboard_url: organization.dashboard_url,
          default_program_id: organization.default_program_id
        }
        localStorage.setItem('fullAuthResponse', JSON.stringify(authData))
        
        // Also update user object in localStorage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          userData.organization = {
            id: organization.id,
            name: organization.legal_name,
            dashboard_url: organization.dashboard_url,
            default_program_id: organization.default_program_id
          }
          localStorage.setItem('user', JSON.stringify(userData))
        }
        
        // Reload page to reflect new organization
        window.location.reload()
      }
    } catch (error) {
      console.error('Error switching organization:', error)
      // Still reload the page even if program fetch fails
      window.location.reload()
    }
  }

  // Get organization logo/initial
  const getOrganizationLogo = (org: Organization) => {
    return org.legal_name.charAt(0).toUpperCase()
  }

  // Don't render if no organizations
  if (organizations.length === 0 || !selectedOrg) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          className="w-full justify-between text-sm font-medium"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#05AFF2] flex items-center justify-center text-white text-xs font-medium">
              {getOrganizationLogo(selectedOrg)}
            </div>
            <span>{selectedOrg.legal_name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="w-[200px]">
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              selectedOrg.id === org.id && "bg-accent"
            )}
            onClick={() => handleOrganizationSwitch(org)}
          >
            <div className="w-6 h-6 rounded-md bg-[#05AFF2] flex items-center justify-center text-white text-xs font-medium">
              {getOrganizationLogo(org)}
            </div>
            <span className="flex-1">{org.legal_name}</span>
            {selectedOrg.id === org.id && (
              <Check className="h-4 w-4 text-[#05AFF2]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
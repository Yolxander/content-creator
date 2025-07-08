"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"

interface Program {
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

// Mock data for organizations and segments (keeping these for now)
const mockOrganizations = [
  { id: 1, name: "Organization 1", role: "Admin" },
  { id: 2, name: "Organization 2", role: "Member" },
]

const mockSegments = [
  { id: 1, name: "Segment 1", type: "Type A" },
  { id: 2, name: "Segment 2", type: "Type B" },
]

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [programs, setPrograms] = useState<Program[]>([])
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null)
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([])

  // Load programs from localStorage
  useEffect(() => {
    const storedPrograms = localStorage.getItem('currentOrganizationPrograms')
    if (storedPrograms) {
      try {
        const parsedPrograms = JSON.parse(storedPrograms)
        setPrograms(parsedPrograms)
        setFilteredPrograms(parsedPrograms)
        console.log('Programs loaded from localStorage:', parsedPrograms)
      } catch (error) {
        console.error('Error parsing stored programs:', error)
        setPrograms([])
        setFilteredPrograms([])
      }
    } else {
      console.log('No programs found in localStorage')
      setPrograms([])
      setFilteredPrograms([])
    }
  }, [])

  // Filter programs when selected program changes
  useEffect(() => {
    if (selectedProgramId) {
      const filtered = programs.filter(program => program.program_id === selectedProgramId)
      setFilteredPrograms(filtered)
    } else {
      setFilteredPrograms(programs)
    }
  }, [selectedProgramId, programs])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ""} disabled />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={user?.name || ""} />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizations">
          <Card>
            <CardHeader>
              <CardTitle>Organizations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrganizations.map((org) => (
                  <div key={org.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{org.name}</div>
                      <div className="text-sm text-gray-500">{org.role}</div>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments">
          <Card>
            <CardHeader>
              <CardTitle>Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSegments.map((segment) => (
                  <div key={segment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{segment.name}</div>
                      <div className="text-sm text-gray-500">{segment.type}</div>
                    </div>
                    <Button variant="outline">Edit</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs">
          <Card>
            <CardHeader>
              <CardTitle>Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Program Filter */}
                <div className="flex items-center gap-4 mb-4">
                  <Label htmlFor="program-filter">Filter by Program:</Label>
                  <Select
                    value={selectedProgramId?.toString() || ""}
                    onValueChange={(value) => setSelectedProgramId(value ? parseInt(value) : null)}
                  >
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="All programs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All programs</SelectItem>
                      {programs.map((program) => (
                        <SelectItem key={program.program_id} value={program.program_id.toString()}>
                          {program.title || program.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Programs List */}
                {filteredPrograms.length > 0 ? (
                  <div className="space-y-4">
                    {filteredPrograms.map((program) => (
                      <div key={program.program_id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{program.title || program.name}</div>
                          <div className="text-sm text-gray-500 space-y-1">
                            <div>Description: {program.description}</div>
                            <div>Start: {new Date(`${program.start_date} ${program.start_time}`).toLocaleString()}</div>
                            <div>End: {new Date(`${program.end_date} ${program.end_time}`).toLocaleString()}</div>
                            <div className="flex gap-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                program.is_live ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {program.is_live ? 'Live' : 'Not Live'}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                program.user_registered ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {program.user_registered ? 'Registered' : 'Not Registered'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline">View Details</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {programs.length === 0 ? (
                      <div>
                        <p>No programs found for this organization.</p>
                        <p className="text-sm mt-2">Programs will be loaded when you switch organizations.</p>
                      </div>
                    ) : (
                      <p>No programs match the selected filter.</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
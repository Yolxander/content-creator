"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"

// Mock data
const mockOrganizations = [
  { id: 1, name: "Organization 1", role: "Admin" },
  { id: 2, name: "Organization 2", role: "Member" },
]

const mockSegments = [
  { id: 1, name: "Segment 1", type: "Type A" },
  { id: 2, name: "Segment 2", type: "Type B" },
]

const mockPrograms = [
  { id: 1, name: "Program 1", status: "Active" },
  { id: 2, name: "Program 2", status: "Inactive" },
]

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")

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
                {mockPrograms.map((program) => (
                  <div key={program.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{program.name}</div>
                      <div className="text-sm text-gray-500">{program.status}</div>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

// Mock data
const mockContent = [
  { id: 1, title: "Getting Started Guide", type: "article", status: "published", date: "2024-03-15" },
  { id: 2, title: "Product Overview", type: "article", status: "draft", date: "2024-03-14" },
  { id: 3, title: "Welcome Podcast", type: "audio", status: "published", date: "2024-03-13" },
]

export default function MainDashboardContent() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Content Dashboard</h1>
        <Button className="bg-[#05AFF2]">Create New Content</Button>
      </div>

      {/* Content List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockContent.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">
                    {item.type} • {item.status} • {item.date}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
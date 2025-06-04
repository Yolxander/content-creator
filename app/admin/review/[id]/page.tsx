"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  FileText,
  FileAudio,
  ArrowLeft,
  Calendar,
  User,
  AlertCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  FileText as TranscriptIcon,
  Subtitles,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"

// Mock data - replace with actual data fetching
const mockSubmissions = {
  audio: {
    id: 2,
    title: "Content Strategy Podcast",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "audio",
    author: "Jane Smith",
    submittedAt: "3 hours ago",
    submissionDate: "Sep 12, 2024",
    status: "pending",
    statusColor: "bg-orange-100 text-orange-800",
    audioUrl: "/sample-audio.mp3",
    duration: "15:30",
    transcript: "Speaker 1: Welcome to our podcast about content strategy...\nSpeaker 2: Thanks for having me...",
    subtitles: [
      { start: "00:00", end: "00:05", text: "Welcome to our podcast about content strategy" },
      { start: "00:05", end: "00:10", text: "Thanks for having me on the show today" },
    ],
    feedbackHistory: [
      {
        id: 1,
        admin: "Admin",
        timestamp: "2 hours ago",
        message: "Please improve the audio quality in the first 5 minutes.",
      },
      {
        id: 2,
        admin: "Jane Smith",
        timestamp: "1 hour ago",
        message: "Audio has been re-recorded with better equipment.",
      },
    ],
  },
  article: {
    id: 1,
    title: "Getting Started with Content Creation",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "article",
    author: "John Doe",
    submittedAt: "2 hours ago",
    submissionDate: "Sep 12, 2024",
    status: "pending",
    statusColor: "bg-orange-100 text-orange-800",
    feedbackHistory: [
      {
        id: 1,
        admin: "Admin",
        timestamp: "2 hours ago",
        message: "Please add more examples in the introduction section.",
      },
      {
        id: 2,
        admin: "John Doe",
        timestamp: "1 hour ago",
        message: "Content has been resubmitted with requested changes.",
      },
    ],
  },
}

export default function ReviewSubmissionPage({ params }) {
  const searchParams = useSearchParams()
  const contentType = searchParams.get("type") || "article"
  const submissionId = parseInt(params.id)
  const [submission, setSubmission] = useState(null)
  const [feedback, setFeedback] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    // In a real application, this would be an API call
    const mockSubmission = mockSubmissions[contentType]
    if (mockSubmission && mockSubmission.id === submissionId) {
      setSubmission(mockSubmission)
    }
  }, [contentType, submissionId])

  if (!submission) {
    return <div>Loading...</div>
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime)
  }

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration)
  }

  const renderContentPreview = () => {
    if (submission.type === "audio") {
      return (
        <Card>
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Audio Review</CardTitle>
              <Badge variant="secondary" className={submission.statusColor}>
                {submission.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{submission.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {submission.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {submission.submissionDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <FileAudio className="w-4 h-4" />
                    {submission.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {submission.duration}
                  </div>
                </div>
              </div>

              {/* Audio Player */}
              <div className="bg-gray-50 rounded-lg p-4">
                <audio
                  src={submission.audioUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  className="w-full"
                />
                <div className="flex items-center gap-4 mt-4">
                  <Button variant="ghost" size="icon" onClick={handlePlayPause}>
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <div className="flex-1">
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleMute}>
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleFullscreen}>
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              {/* Transcript and Subtitles Tabs */}
              <Tabs defaultValue="transcript" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="transcript" className="flex items-center gap-2">
                    <TranscriptIcon className="w-4 h-4" />
                    Transcript
                  </TabsTrigger>
                  <TabsTrigger value="subtitles" className="flex items-center gap-2">
                    <Subtitles className="w-4 h-4" />
                    Subtitles
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="transcript" className="mt-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                      {submission.transcript}
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="subtitles" className="mt-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    {submission.subtitles.map((subtitle, index) => (
                      <div key={index} className="mb-2 last:mb-0">
                        <div className="text-xs text-gray-500 mb-1">
                          {subtitle.start} - {subtitle.end}
                        </div>
                        <div className="text-sm text-gray-700">{subtitle.text}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      )
    }

    // Default article view
    return (
      <Card>
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Content Review</CardTitle>
            <Badge variant="secondary" className={submission.statusColor}>
              {submission.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{submission.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {submission.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {submission.submissionDate}
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {submission.type}
                </div>
              </div>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{submission.content}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/tools">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Review Submission</h1>
                <p className="text-sm text-gray-500">ID: {submission.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <XCircle className="w-4 h-4 mr-2" />
                Decline
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-3 gap-6">
            {/* Main content */}
            <div className="col-span-2 space-y-6">
              {renderContentPreview()}

              {/* Feedback Form */}
              <Card>
                <CardHeader className="border-b border-gray-200">
                  <CardTitle className="text-lg font-semibold">Add Feedback</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Enter your feedback here..."
                      className="min-h-[120px]"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button className={"bg-[#05AFF2]"}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Feedback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Card */}
              <Card>
                <CardHeader className="border-b border-gray-200">
                  <CardTitle className="text-lg font-semibold">Review Status</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Current Status</div>
                      <Badge variant="secondary" className={submission.statusColor}>
                        {submission.status}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Submission Date</div>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Calendar className="w-4 h-4" />
                        {submission.submissionDate}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Content Type</div>
                      <div className="flex items-center gap-2 text-gray-900">
                        {submission.type === "article" ? (
                          <FileText className="w-4 h-4" />
                        ) : (
                          <FileAudio className="w-4 h-4" />
                        )}
                        {submission.type}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback History */}
              <Card>
                <CardHeader className="border-b border-gray-200">
                  <CardTitle className="text-lg font-semibold">Feedback History</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {submission.feedbackHistory.map((feedback) => (
                      <div key={feedback.id} className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {feedback.admin
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{feedback.admin}</span>
                            <span className="text-sm text-gray-500">{feedback.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{feedback.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
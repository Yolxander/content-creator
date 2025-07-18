"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Eye,
  MoreHorizontal,
  Save,
  Share,
  Sparkles,
  Target,
  Mail,
  Globe,
  Video,
  ImageIcon,
  Upload,
  Languages,
  CheckCircle,
  Clock,
  FileText,
  Calendar,
  Tag,
  FileAudio,
  Headphones,
  Waveform,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"
import { Progress } from "@/components/ui/progress"
import { TranslationEditModal } from "@/components/TranslationEditModal"
import { InitialTranslationModal } from "@/components/InitialTranslationModal"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
]

const steps = [
  { id: 'audio', title: 'Audio', description: 'Upload and edit audio' },
  { id: 'media', title: 'Media', description: 'Add cover art and images' },
  { id: 'translation', title: 'Translation', description: 'Manage translations' },
  { id: 'settings', title: 'Settings', description: 'Configure audio settings' },
]

export default function NewAudioPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPublished, setIsPublished] = useState(false)
  const [enableComments, setEnableComments] = useState(true)
  const [autoTranslate, setAutoTranslate] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState(["en"])
  const [isTranslationModalOpen, setIsTranslationModalOpen] = useState(false)
  const [selectedLanguageForTranslation, setSelectedLanguageForTranslation] = useState<typeof languages[0] | null>(null)
  const [isInitialTranslationModalOpen, setIsInitialTranslationModalOpen] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleTranslationSave = (translation: { title: string; summary: string; content: string }) => {
    // TODO: Implement saving translation
    console.log("Saving translation:", translation)
  }

  const handleInitialTranslate = async () => {
    // TODO: Implement actual translation API call
    // This is a mock translation for demonstration
    await new Promise(resolve => setTimeout(resolve, 5000))
    console.log("Initial translation completed")
  }

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case 'audio':
  return (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Audio Content
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Sparkles className="w-4 h-4 mr-1" />
                  AI Enhanced
                      </Button>
                    </CardTitle>
                  </CardHeader>
            <CardContent className="space-y-6">
              {/* Audio Upload */}
                    <div>
                <Label className="text-base font-medium">Audio File</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileAudio className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Upload audio file</p>
                        <p className="text-xs text-gray-500 mb-4">Supports MP3, WAV, M4A (max 500MB)</p>
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                      </div>
              </div>

              {/* Audio Details */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter audio title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <div className="text-xs text-gray-500 mt-1">41/60 characters</div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter audio description..." className="min-h-[100px]" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select author" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="adam">Adam Rogers</SelectItem>
                            <SelectItem value="mike">Mike Fitzgerald</SelectItem>
                            <SelectItem value="sarah">Sarah Johnson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="strategy">Strategy</SelectItem>
                            <SelectItem value="tech">Tech</SelectItem>
                            <SelectItem value="industry">Industry</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                          </SelectContent>
                        </Select>
                  </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
        )
      case 'media':
        return (
                <Card>
                  <CardHeader>
              <CardTitle>Media Assets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
              {/* Cover Art Upload */}
                    <div>
                <Label className="text-base font-medium">Cover Art</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Upload cover art</p>
                  <p className="text-xs text-gray-500 mb-4">Supports JPG, PNG, WebP (max 10MB)</p>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Image
                  </Button>
                      </div>
                    </div>

              {/* Additional Media */}
                    <div>
                <Label className="text-base font-medium">Additional Media</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Upload additional media</p>
                  <p className="text-xs text-gray-500 mb-4">Supports images, videos, and documents</p>
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
        )
      case 'translation':
        return (
                <Card>
                  <CardHeader>
                    <CardTitle>Translation Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Auto-translation toggle */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Languages className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="font-medium">Auto-translation</div>
                          <div className="text-sm text-gray-600">Automatically translate to selected languages</div>
                        </div>
                      </div>
                      <Switch checked={autoTranslate} onCheckedChange={setAutoTranslate} />
                    </div>

                    {/* Language versions */}
                    <div>
                      <Label className="text-base font-medium">Language Versions</Label>
                      <div className="mt-3 space-y-3">
                        {languages.map((lang) => (
                          <div key={lang.code} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{lang.flag}</span>
                              <div>
                                <div className="font-medium">{lang.name}</div>
                                <div className="text-sm text-gray-600">
                                  {lang.code === "en" ? "Original" : "Translation"}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {lang.code === "en" ? (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Complete
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                  Pending
                                </Badge>
                              )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            if (lang.code === "en") {
                              setSelectedLanguageForTranslation(lang)
                              setIsTranslationModalOpen(true)
                            } else {
                              setSelectedLanguageForTranslation(lang)
                              setIsInitialTranslationModalOpen(true)
                            }
                          }}
                        >
                                {lang.code === "en" ? "Edit" : "Translate"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

              {/* Approval workflow */}
              <div>
                <Label className="text-base font-medium">Approval Workflow</Label>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">Require approval for translations</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">Auto-publish approved translations</span>
                    <Switch />
                  </div>
                </div>
              </div>
                  </CardContent>
                </Card>
        )
      case 'settings':
        return (
                <Card>
                  <CardHeader>
              <CardTitle>Audio Settings</CardTitle>
                  </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Featured Audio</span>
                      </div>
                      <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                    </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Enable Comments</span>
                        </div>
                <Switch checked={enableComments} onCheckedChange={setEnableComments} />
                      </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">SEO Optimization</span>
                      </div>
                <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
        )
      default:
        return null
    }
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
              <Link href="/audio">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-900">Create New Audio</h1>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  DRAFT
                </Badge>
              </div>
          </div>
                <div className="flex items-center gap-2">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <div className="flex items-center gap-1">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">AR</AvatarFallback>
                </Avatar>
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">MF</AvatarFallback>
                </Avatar>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className={"bg-[#05AFF2]"}>
                <Save className="w-4 h-4 mr-2" />
                Save Audio
                  </Button>
                </div>
              </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Audio completion</span>
              <span className="text-sm font-medium text-[#05AFF2]">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
            </div>

          {/* Steps */}
          <div className="mt-6">
            <div className="flex items-center justify-between relative">
              {/* Progress line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10" />

              {steps.map((step, index) => (
                  <div
                  key={step.id}
                  className="flex flex-col items-center relative"
                >
                  {/* Step circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      index === currentStep
                        ? "bg-[#05AFF2] text-white ring-4 ring-[#05AFF2]/20"
                        : index < currentStep
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                      </div>
                  
                  {/* Step text */}
                  <div className="text-center">
                    <div className={`font-medium ${
                      index === currentStep
                        ? "text-[#05AFF2]"
                        : index < currentStep
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              className={"bg-[#05AFF2]"}
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Add TranslationEditModal */}
      {selectedLanguageForTranslation && (
        <TranslationEditModal
          isOpen={isTranslationModalOpen}
          onClose={() => {
            setIsTranslationModalOpen(false)
            setSelectedLanguageForTranslation(null)
          }}
          language={selectedLanguageForTranslation}
          originalTitle={title}
          originalSummary={description}
          originalContent={description}
          onSave={handleTranslationSave}
        />
      )}

      {/* Add InitialTranslationModal */}
      {selectedLanguageForTranslation && (
        <InitialTranslationModal
          isOpen={isInitialTranslationModalOpen}
          onClose={() => {
            setIsInitialTranslationModalOpen(false)
            setSelectedLanguageForTranslation(null)
          }}
          language={selectedLanguageForTranslation}
          onTranslate={handleInitialTranslate}
        />
      )}
    </div>
  )
} 
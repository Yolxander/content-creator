"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AudioWizardProps {
  onBack: () => void
  onSubmit: (data: any) => void
}

export default function AudioWizard({ onBack, onSubmit }: AudioWizardProps) {
  const [wizardStep, setWizardStep] = useState(1)
  const [audioData, setAudioData] = useState({
    title: "",
    description: "",
    languages: [],
    metaTags: [],
    transcripts: [],
    publishDate: "",
    autoTranslate: false,
    approvals: []
  })

  const renderWizardStep = () => {
    switch (wizardStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Basic Information</h3>
            <Input 
              placeholder="Title" 
              required 
              value={audioData.title}
              onChange={(e) => setAudioData({...audioData, title: e.target.value})}
              className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
            />
            <Textarea 
              placeholder="Description" 
              rows={4} 
              required 
              value={audioData.description}
              onChange={(e) => setAudioData({...audioData, description: e.target.value})}
              className="rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
            />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Language Uploads</h3>
            <div className="space-y-4 bg-[#f6f3ef] p-4 rounded-xl">
              <div className="space-y-2">
                <label className="text-sm text-[#b6b0a6]">Audio Files</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-base">🇬🇧</span>
                    <Input 
                      type="file" 
                      accept="audio/*" 
                      className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base">🇫🇷</span>
                    <Input 
                      type="file" 
                      accept="audio/*" 
                      className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-fit rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                  >
                    Add Language
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Meta Tags & Transcripts</h3>
            <div className="space-y-4 bg-[#f6f3ef] p-4 rounded-xl">
              <div className="space-y-2">
                <label className="text-sm text-[#b6b0a6]">Meta Tags</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add meta tag" 
                    className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary" className="px-3 py-1 rounded-full bg-[#e6f8fd] text-[#05AFF2]">
                    podcast
                    <button className="ml-2 text-[#05AFF2] hover:text-[#059fd2]">×</button>
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1 rounded-full bg-[#e6f8fd] text-[#05AFF2]">
                    audio
                    <button className="ml-2 text-[#05AFF2] hover:text-[#059fd2]">×</button>
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#b6b0a6]">Transcripts</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-base">🇬🇧</span>
                    <Input 
                      type="file" 
                      accept=".txt,.srt,.vtt" 
                      className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base">🇫🇷</span>
                    <Input 
                      type="file" 
                      accept=".txt,.srt,.vtt" 
                      className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Publishing & Translation</h3>
            <div className="space-y-4 bg-[#f6f3ef] p-4 rounded-xl">
              <div className="space-y-2">
                <label className="text-sm text-[#b6b0a6]">Schedule Publishing</label>
                <Input 
                  type="datetime-local" 
                  className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                  value={audioData.publishDate}
                  onChange={(e) => setAudioData({...audioData, publishDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#b6b0a6]">Auto-translation</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="audio-auto-translate" 
                    className="accent-[#05AFF2]"
                    checked={audioData.autoTranslate}
                    onChange={(e) => setAudioData({...audioData, autoTranslate: e.target.checked})}
                  />
                  <label htmlFor="audio-auto-translate" className="text-sm">Enable auto-translation for titles and descriptions</label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#b6b0a6]">Language-specific Review</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🇬🇧</span>
                      <span>English</span>
                    </div>
                    <Select defaultValue="pending">
                      <SelectTrigger className="w-32 rounded-full border-[#e7e3de]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🇫🇷</span>
                      <span>French</span>
                    </div>
                    <Select defaultValue="pending">
                      <SelectTrigger className="w-32 rounded-full border-[#e7e3de]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="p-8">
      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="mb-6 text-[#05AFF2] hover:bg-[#e6f8fd] rounded-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to List
      </Button>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === wizardStep 
                ? 'bg-[#05AFF2] text-white' 
                : step < wizardStep 
                  ? 'bg-[#e6f8fd] text-[#05AFF2]' 
                  : 'bg-[#f6f3ef] text-[#b6b0a6]'
            }`}>
              {step}
            </div>
            <span className="text-xs mt-2 text-[#b6b0a6]">
              {step === 1 ? 'Basic Info' : 
               step === 2 ? 'Language Uploads' : 
               step === 3 ? 'Meta & Transcripts' : 'Publishing'}
            </span>
          </div>
        ))}
      </div>

      {/* Wizard Content */}
      {renderWizardStep()}

      {/* Wizard Navigation */}
      <div className="flex justify-end mt-8">
        {wizardStep > 1 ? (
          <Button 
            onClick={() => setWizardStep(prev => prev - 1)}
            variant="outline"
            className="rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd] mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        ) : null}
        {wizardStep < 4 ? (
          <Button 
            onClick={() => setWizardStep(prev => prev + 1)}
            className="bg-[#05AFF2] text-white rounded-full hover:bg-[#059fd2]"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={() => onSubmit(audioData)}
            className="bg-[#05AFF2] text-white rounded-full hover:bg-[#059fd2]"
          >
            Create Audio
          </Button>
        )}
      </div>
    </div>
  )
} 
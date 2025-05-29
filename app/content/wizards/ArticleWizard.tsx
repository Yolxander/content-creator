"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ArticleWizardProps {
  onBack: () => void
  onSubmit: (data: any) => void
}

export default function ArticleWizard({ onBack, onSubmit }: ArticleWizardProps) {
  const [wizardStep, setWizardStep] = useState(1)
  const [articleData, setArticleData] = useState({
    title: "",
    summary: "",
    body: "",
    author: "",
    category: "",
    media: [],
    subtitles: [],
    translations: [],
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
              value={articleData.title}
              onChange={(e) => setArticleData({...articleData, title: e.target.value})}
              className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
            />
            <Textarea 
              placeholder="Summary" 
              rows={4} 
              required 
              value={articleData.summary}
              onChange={(e) => setArticleData({...articleData, summary: e.target.value})}
              className="rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
            />
            <Textarea 
              placeholder="Body" 
              rows={8} 
              required 
              value={articleData.body}
              onChange={(e) => setArticleData({...articleData, body: e.target.value})}
              className="rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
            />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Author & Category</h3>
            <div className="space-y-4 bg-[#f6f3ef] p-4 rounded-xl">
              <div className="space-y-2">
                <label className="text-sm text-[#b6b0a6]">Author</label>
                <Input 
                  placeholder="Author name" 
                  required 
                  value={articleData.author}
                  onChange={(e) => setArticleData({...articleData, author: e.target.value})}
                  className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#b6b0a6]">Category</label>
                <Select 
                  value={articleData.category}
                  onValueChange={(value) => setArticleData({...articleData, category: value})}
                >
                  <SelectTrigger className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="feature">Feature</SelectItem>
                    <SelectItem value="opinion">Opinion</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Media Upload</h3>
            <div className="space-y-4 bg-[#f6f3ef] p-4 rounded-xl">
              <div className="space-y-2">
                <label className="text-sm text-[#b6b0a6]">Featured Image</label>
                <Input 
                  type="file" 
                  accept="image/*" 
                  className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#b6b0a6]">Video</label>
                <Input 
                  type="file" 
                  accept="video/*" 
                  className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#b6b0a6]">Subtitles</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-base">🇬🇧</span>
                    <Input 
                      type="file" 
                      accept=".srt,.vtt" 
                      className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base">🇫🇷</span>
                    <Input 
                      type="file" 
                      accept=".srt,.vtt" 
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
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Translation & Approval</h3>
            <div className="space-y-4 bg-[#f6f3ef] p-4 rounded-xl">
              <div className="space-y-2">
                <label className="text-sm text-[#b6b0a6]">Auto-translation</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="article-auto-translate" 
                    className="accent-[#05AFF2]"
                    checked={articleData.autoTranslate}
                    onChange={(e) => setArticleData({...articleData, autoTranslate: e.target.checked})}
                  />
                  <label htmlFor="article-auto-translate" className="text-sm">Enable auto-translation for all fields</label>
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
               step === 2 ? 'Author & Category' : 
               step === 3 ? 'Media Upload' : 'Translation'}
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
            onClick={() => onSubmit(articleData)}
            className="bg-[#05AFF2] text-white rounded-full hover:bg-[#059fd2]"
          >
            Create Article
          </Button>
        )}
      </div>
    </div>
  )
} 
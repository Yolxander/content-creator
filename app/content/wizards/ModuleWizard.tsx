"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface ModuleWizardProps {
  onBack: () => void
  onSubmit: (data: any) => void
}

export default function ModuleWizard({ onBack, onSubmit }: ModuleWizardProps) {
  const [wizardStep, setWizardStep] = useState(1)
  const [moduleData, setModuleData] = useState({
    title: "",
    description: "",
    registration: false,
    pricing: "free",
    price: "",
    visibility: "public",
    attendeeLimit: "",
    languages: ["en"],
    liveType: "none",
    liveUrl: "",
    onDemand: false,
  })

  const renderWizardStep = () => {
    switch (wizardStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Settings</h3>
            <Input
              placeholder="Module Title"
              required
              value={moduleData.title}
              onChange={e => setModuleData({ ...moduleData, title: e.target.value })}
              className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
            />
            <Textarea
              placeholder="Module Description"
              rows={4}
              value={moduleData.description}
              onChange={e => setModuleData({ ...moduleData, description: e.target.value })}
              className="rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
            />
            <div className="flex items-center gap-4">
              <Switch
                checked={moduleData.registration}
                onCheckedChange={checked => setModuleData({ ...moduleData, registration: checked })}
                id="registration-switch"
              />
              <label htmlFor="registration-switch" className="text-sm">Enable Registration</label>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm">Pricing</label>
              <Select
                value={moduleData.pricing}
                onValueChange={value => setModuleData({ ...moduleData, pricing: value })}
              >
                <SelectTrigger className="w-32 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]">
                  <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
              {moduleData.pricing === "paid" && (
                <Input
                  placeholder="Price"
                  type="number"
                  min="0"
                  value={moduleData.price}
                  onChange={e => setModuleData({ ...moduleData, price: e.target.value })}
                  className="w-32 h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                />
              )}
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm">Visibility</label>
              <Select
                value={moduleData.visibility}
                onValueChange={value => setModuleData({ ...moduleData, visibility: value })}
              >
                <SelectTrigger className="w-32 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]">
                  <SelectValue placeholder="Visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="unlisted">Unlisted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Attendee Limits</h3>
            <Input
              placeholder="Max Attendees (leave blank for unlimited)"
              type="number"
              min="0"
              value={moduleData.attendeeLimit}
              onChange={e => setModuleData({ ...moduleData, attendeeLimit: e.target.value })}
              className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
            />
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Language Toggling</h3>
            <div className="flex flex-wrap gap-3">
              {['en', 'fr', 'es', 'de', 'zh'].map(lang => (
                <Button
                  key={lang}
                  type="button"
                  variant={moduleData.languages.includes(lang) ? "default" : "outline"}
                  className={
                    moduleData.languages.includes(lang)
                      ? "bg-[#05AFF2] text-white rounded-full"
                      : "rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                  }
                  onClick={() => {
                    setModuleData({
                      ...moduleData,
                      languages: moduleData.languages.includes(lang)
                        ? moduleData.languages.filter(l => l !== lang)
                        : [...moduleData.languages, lang],
                    })
                  }}
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Live & Simulated Live Stream</h3>
            <div className="flex items-center gap-4">
              <label className="text-sm">Stream Type</label>
              <Select
                value={moduleData.liveType}
                onValueChange={value => setModuleData({ ...moduleData, liveType: value })}
              >
                <SelectTrigger className="w-40 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]">
                  <SelectValue placeholder="Stream Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="simulated">Simulated Live</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(moduleData.liveType === "live" || moduleData.liveType === "simulated") && (
              <Input
                placeholder="Stream URL"
                value={moduleData.liveUrl}
                onChange={e => setModuleData({ ...moduleData, liveUrl: e.target.value })}
                className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
              />
            )}
          </div>
        )
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">On-demand Playback</h3>
            <div className="flex items-center gap-4">
              <Switch
                checked={moduleData.onDemand}
                onCheckedChange={checked => setModuleData({ ...moduleData, onDemand: checked })}
                id="on-demand-switch"
              />
              <label htmlFor="on-demand-switch" className="text-sm">Enable On-demand Playback after Live Sessions</label>
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
        {[1, 2, 3, 4, 5].map((step) => (
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
              {step === 1 ? 'Settings' : 
               step === 2 ? 'Attendee Limit' : 
               step === 3 ? 'Languages' : 
               step === 4 ? 'Live/Sim Live' : 'On-demand'}
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
        {wizardStep < 5 ? (
          <Button 
            onClick={() => setWizardStep(prev => prev + 1)}
            className="bg-[#05AFF2] text-white rounded-full hover:bg-[#059fd2]"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={() => onSubmit(moduleData)}
            className="bg-[#05AFF2] text-white rounded-full hover:bg-[#059fd2]"
          >
            Create Module
          </Button>
        )}
      </div>
    </div>
  )
} 
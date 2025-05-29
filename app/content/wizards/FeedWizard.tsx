"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface FeedWizardProps {
  onBack: () => void
  onSubmit: (data: any) => void
}

export default function FeedWizard({ onBack, onSubmit }: FeedWizardProps) {
  const [wizardStep, setWizardStep] = useState(1)
  const [feedData, setFeedData] = useState({
    name: "",
    description: "",
    autoAdd: false,
    manualItems: [],
    editContent: "",
    changeNotes: [],
    curationTags: [],
    targeting: "all",
    newManualItem: "",
    newChangeNote: "",
    newCurationTag: "",
    editingNoteIdx: null,
    editingNoteText: "",
    regions: [],
    groups: [],
  })

  const renderWizardStep = () => {
    switch (wizardStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Manual & Auto-addition</h3>
            <Input
              placeholder="Feed Name"
              required
              value={feedData.name}
              onChange={e => setFeedData({ ...feedData, name: e.target.value })}
              className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
            />
            <Textarea
              placeholder="Feed Description"
              rows={3}
              value={feedData.description}
              onChange={e => setFeedData({ ...feedData, description: e.target.value })}
              className="rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
            />
            <div className="flex items-center gap-4">
              <Switch
                checked={feedData.autoAdd}
                onCheckedChange={checked => setFeedData({ ...feedData, autoAdd: checked })}
                id="auto-add-switch"
              />
              <label htmlFor="auto-add-switch" className="text-sm">Enable Auto-addition of Content</label>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#b6b0a6]">Manually Add Content</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add item URL or ID"
                  value={feedData.newManualItem}
                  onChange={e => setFeedData({ ...feedData, newManualItem: e.target.value })}
                  className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                  onClick={() => {
                    if (feedData.newManualItem.trim()) {
                      setFeedData({
                        ...feedData,
                        manualItems: [...feedData.manualItems, feedData.newManualItem],
                        newManualItem: "",
                      })
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {feedData.manualItems.map((item, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-[#e6f8fd] text-[#05AFF2] text-xs flex items-center gap-1">
                    {item}
                    <button
                      className="ml-1 text-[#05AFF2] hover:text-[#059fd2]"
                      onClick={() => setFeedData({ ...feedData, manualItems: feedData.manualItems.filter((_, i) => i !== idx) })}
                    >×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Edit Feed</h3>
            <Textarea
              placeholder="Edit feed content directly (JSON, XML, or text)"
              rows={8}
              value={feedData.editContent}
              onChange={e => setFeedData({ ...feedData, editContent: e.target.value })}
              className="rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
            />
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Track Feed Changes</h3>
            <div className="space-y-2">
              <label className="text-sm text-[#b6b0a6]">Change Timeline</label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Describe a change (e.g. Updated feed source, added new item)"
                  value={feedData.newChangeNote}
                  onChange={e => setFeedData({ ...feedData, newChangeNote: e.target.value })}
                  className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && feedData.newChangeNote.trim()) {
                      e.preventDefault();
                      setFeedData({
                        ...feedData,
                        changeNotes: [
                          { text: feedData.newChangeNote.trim(), timestamp: new Date().toLocaleString() },
                          ...feedData.changeNotes,
                        ],
                        newChangeNote: "",
                      })
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                  onClick={() => {
                    if (feedData.newChangeNote.trim()) {
                      setFeedData({
                        ...feedData,
                        changeNotes: [
                          { text: feedData.newChangeNote.trim(), timestamp: new Date().toLocaleString() },
                          ...feedData.changeNotes,
                        ],
                        newChangeNote: "",
                      })
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="space-y-3 mt-2">
                {feedData.changeNotes.length === 0 && (
                  <div className="text-xs text-[#b6b0a6]">No changes tracked yet.</div>
                )}
                {feedData.changeNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-[#f6f3ef] rounded-xl p-3 relative group">
                    <div className="flex-1">
                      {feedData.editingNoteIdx === idx ? (
                        <div className="flex gap-2 items-center">
                          <Input
                            value={feedData.editingNoteText}
                            onChange={e => setFeedData({ ...feedData, editingNoteText: e.target.value })}
                            className="h-10 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                          />
                          <Button
                            size="sm"
                            className="bg-[#05AFF2] text-white rounded-full hover:bg-[#059fd2]"
                            onClick={() => {
                              const updated = [...feedData.changeNotes]
                              updated[idx].text = feedData.editingNoteText
                              setFeedData({ ...feedData, changeNotes: updated, editingNoteIdx: null, editingNoteText: "" })
                            }}
                          >Save</Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                            onClick={() => setFeedData({ ...feedData, editingNoteIdx: null, editingNoteText: "" })}
                          >Cancel</Button>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm text-[#181A20]">{note.text}</div>
                          <div className="text-xs text-[#b6b0a6] mt-1">{note.timestamp}</div>
                        </>
                      )}
                    </div>
                    {feedData.editingNoteIdx !== idx && (
                      <div className="flex gap-1 absolute right-3 top-3 opacity-70 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-[#05AFF2] hover:bg-[#e6f8fd]"
                          onClick={() => setFeedData({ ...feedData, editingNoteIdx: idx, editingNoteText: note.text })}
                        >
                          Edit
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-[#05AFF2] hover:bg-[#e6f8fd]"
                          onClick={() => {
                            setFeedData({ ...feedData, changeNotes: feedData.changeNotes.filter((_, i) => i !== idx) })
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#05AFF2] mb-4">Curation & Targeting</h3>
            {/* Curation Tags */}
            <div className="space-y-2">
              <label className="text-sm text-[#b6b0a6]">Curation Tags</label>
              <p className="text-xs text-[#b6b0a6] mb-1">Add tags to help organize and filter feed content. Suggestions: news, tech, sports, featured, trending.</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag (e.g. news, tech)"
                  value={feedData.newCurationTag}
                  onChange={e => setFeedData({ ...feedData, newCurationTag: e.target.value })}
                  className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438]"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && feedData.newCurationTag.trim()) {
                      e.preventDefault();
                      if (!feedData.curationTags.includes(feedData.newCurationTag.trim())) {
                        setFeedData({
                          ...feedData,
                          curationTags: [...feedData.curationTags, feedData.newCurationTag.trim()],
                          newCurationTag: "",
                        })
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                  onClick={() => {
                    if (feedData.newCurationTag.trim() && !feedData.curationTags.includes(feedData.newCurationTag.trim())) {
                      setFeedData({
                        ...feedData,
                        curationTags: [...feedData.curationTags, feedData.newCurationTag.trim()],
                        newCurationTag: "",
                      })
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {feedData.curationTags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-[#e6f8fd] text-[#05AFF2] text-xs flex items-center gap-1">
                    {tag}
                    <button
                      className="ml-1 text-[#05AFF2] hover:text-[#059fd2]"
                      onClick={() => setFeedData({ ...feedData, curationTags: feedData.curationTags.filter((_, i) => i !== idx) })}
                    >×</button>
                  </span>
                ))}
              </div>
            </div>
            {/* Targeting */}
            <div className="space-y-2 mt-4">
              <label className="text-sm text-[#b6b0a6]">Targeting</label>
              <p className="text-xs text-[#b6b0a6] mb-1">Choose who should see this feed. You can target by user segment, region, or custom group.</p>
              <select
                value={feedData.targeting}
                onChange={e => setFeedData({ ...feedData, targeting: e.target.value })}
                className="h-12 rounded-xl border-[#e7e3de] focus:ring-2 focus:ring-[#F2C438] px-4"
              >
                <option value="all">All Users</option>
                <option value="subscribers">Subscribers Only</option>
                <option value="org">By Organization</option>
                <option value="program">By Program</option>
              </select>
              {/* Multi-select for region */}
              {feedData.targeting === "region" && (
                <div className="mt-2">
                  <label className="text-xs text-[#b6b0a6]">Regions</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["North America", "Europe", "Asia", "South America", "Africa", "Oceania"].map(region => (
                      <Button
                        key={region}
                        type="button"
                        variant={Array.isArray(feedData.regions) && feedData.regions.includes(region) ? "default" : "outline"}
                        className={
                          Array.isArray(feedData.regions) && feedData.regions.includes(region)
                            ? "bg-[#05AFF2] text-white rounded-full"
                            : "rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                        }
                        onClick={() => {
                          setFeedData({
                            ...feedData,
                            regions: Array.isArray(feedData.regions) && feedData.regions.includes(region)
                              ? feedData.regions.filter((r: string) => r !== region)
                              : [...(Array.isArray(feedData.regions) ? feedData.regions : []), region],
                          })
                        }}
                      >
                        {region}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {/* Multi-select for group */}
              {feedData.targeting === "group" && (
                <div className="mt-2">
                  <label className="text-xs text-[#b6b0a6]">Groups</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["Beta Testers", "VIP", "Staff", "Students", "Partners"].map(group => (
                      <Button
                        key={group}
                        type="button"
                        variant={Array.isArray(feedData.groups) && feedData.groups.includes(group) ? "default" : "outline"}
                        className={
                          Array.isArray(feedData.groups) && feedData.groups.includes(group)
                            ? "bg-[#05AFF2] text-white rounded-full"
                            : "rounded-full border-[#05AFF2] text-[#05AFF2] hover:bg-[#e6f8fd]"
                        }
                        onClick={() => {
                          setFeedData({
                            ...feedData,
                            groups: Array.isArray(feedData.groups) && feedData.groups.includes(group)
                              ? feedData.groups.filter((g: string) => g !== group)
                              : [...(Array.isArray(feedData.groups) ? feedData.groups : []), group],
                          })
                        }}
                      >
                        {group}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
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
              {step === 1 ? 'Add Content' : 
               step === 2 ? 'Edit Feed' : 
               step === 3 ? 'Track Changes' : 'Curation'}
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
            onClick={() => onSubmit(feedData)}
            className="bg-[#05AFF2] text-white rounded-full hover:bg-[#059fd2]"
          >
            Create Feed
          </Button>
        )}
      </div>
    </div>
  )
} 
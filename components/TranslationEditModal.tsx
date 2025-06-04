import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"

interface TranslationEditModalProps {
  isOpen: boolean
  onClose: () => void
  language: {
    code: string
    name: string
    flag: string
  }
  originalTitle: string
  originalSummary: string
  originalContent: string
  onSave: (translation: { title: string; summary: string; content: string }) => void
}

export function TranslationEditModal({
  isOpen,
  onClose,
  language,
  originalTitle,
  originalSummary,
  originalContent,
  onSave,
}: TranslationEditModalProps) {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [isTranslating, setIsTranslating] = useState<"title" | "summary" | "content" | null>(null)

  const handleSave = () => {
    onSave({ title, summary, content })
    onClose()
  }

  const translateField = async (field: "title" | "summary" | "content") => {
    setIsTranslating(field)
    try {
      // TODO: Implement actual translation API call
      // This is a mock translation for demonstration
      const text = field === "title" ? originalTitle : field === "summary" ? originalSummary : originalContent
      const mockTranslation = `[${language.name}] ${text}`
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (field === "title") setTitle(mockTranslation)
      else if (field === "summary") setSummary(mockTranslation)
      else setContent(mockTranslation)
    } catch (error) {
      console.error("Translation failed:", error)
    } finally {
      setIsTranslating(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{language.flag}</span>
            Edit {language.name} Translation
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Original Content */}
          <div className="space-y-4">
            <h3 className="font-medium">Original Content</h3>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={originalTitle} disabled />
              <div className="text-xs text-gray-500">{originalTitle.length}/60 characters</div>
            </div>
            <div className="space-y-2">
              <Label>Summary</Label>
              <Textarea value={originalSummary} disabled className="min-h-[80px]" />
              <div className="text-xs text-gray-500">{originalSummary.length}/250 characters</div>
            </div>
            <div className="space-y-2">
              <Label>Body</Label>
              <Textarea value={originalContent} disabled className="min-h-[300px]" />
            </div>
          </div>

          {/* Translation */}
          <div className="space-y-4">
            <h3 className="font-medium">Translation</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Title</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => translateField("title")}
                  disabled={isTranslating === "title"}
                  className="h-8"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  {isTranslating === "title" ? "Translating..." : "Translate Again"}
                </Button>
              </div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter translated title"
                maxLength={60}
              />
              <div className="text-xs text-gray-500">{title.length}/60 characters</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Summary</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => translateField("summary")}
                  disabled={isTranslating === "summary"}
                  className="h-8"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  {isTranslating === "summary" ? "Translating..." : "Translate Again"}
                </Button>
              </div>
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Enter translated summary..."
                className="min-h-[80px]"
                maxLength={250}
              />
              <div className="text-xs text-gray-500">{summary.length}/250 characters</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Body</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => translateField("content")}
                  disabled={isTranslating === "content"}
                  className="h-8"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  {isTranslating === "content" ? "Translating..." : "Translate Again"}
                </Button>
              </div>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your translated content here..."
                className="min-h-[300px]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Translation</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
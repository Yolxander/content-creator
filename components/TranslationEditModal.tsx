import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Languages } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
      <DialogContent className="max-w-6xl max-h-[85vh] flex flex-col">
        <DialogHeader className="pb-0 flex-shrink-0">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <span className="text-2xl">{language.flag}</span>
            <div>
              <div className="font-semibold">Edit {language.name} Translation</div>
              <div className="text-sm font-normal text-gray-600">Translate your article content</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="grid grid-cols-2 gap-8">
          {/* Original Content */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Languages className="w-5 h-5 text-gray-500" />
                Original Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="original-title" className="text-sm font-medium">Title</Label>
                <Input 
                  id="original-title"
                  value={originalTitle} 
                  disabled 
                  className="mt-2 bg-gray-50 border-gray-200"
                />
                <div className="text-xs text-gray-500 mt-1">{originalTitle.length}/60 characters</div>
              </div>
              
              <div>
                <Label htmlFor="original-summary" className="text-sm font-medium">Summary</Label>
                <Textarea 
                  id="original-summary"
                  value={originalSummary} 
                  disabled 
                  className="mt-2 min-h-[80px] bg-gray-50 border-gray-200 resize-none"
                />
                <div className="text-xs text-gray-500 mt-1">{originalSummary.length}/250 characters</div>
              </div>
              
              <div>
                <Label htmlFor="original-content" className="text-sm font-medium">Content</Label>
                <Textarea 
                  id="original-content"
                  value={originalContent} 
                  disabled 
                  className="mt-2 min-h-[300px] bg-gray-50 border-gray-200 resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Translation */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="text-xl">{language.flag}</span>
                {language.name} Translation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="translated-title" className="text-sm font-medium">Title</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => translateField("title")}
                    disabled={isTranslating === "title"}
                    className="h-8 text-xs"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {isTranslating === "title" ? "Translating..." : "Auto-translate"}
                  </Button>
                </div>
                <Input
                  id="translated-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter translated title"
                  maxLength={60}
                  className="mt-1"
                />
                <div className="text-xs text-gray-500 mt-1">{title.length}/60 characters</div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="translated-summary" className="text-sm font-medium">Summary</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => translateField("summary")}
                    disabled={isTranslating === "summary"}
                    className="h-8 text-xs"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {isTranslating === "summary" ? "Translating..." : "Auto-translate"}
                  </Button>
                </div>
                <Textarea
                  id="translated-summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Enter translated summary..."
                  className="mt-1 min-h-[80px] resize-none"
                  maxLength={250}
                />
                <div className="text-xs text-gray-500 mt-1">{summary.length}/250 characters</div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="translated-content" className="text-sm font-medium">Content</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => translateField("content")}
                    disabled={isTranslating === "content"}
                    className="h-8 text-xs"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {isTranslating === "content" ? "Translating..." : "Auto-translate"}
                  </Button>
                </div>
                <Textarea
                  id="translated-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your translated content here..."
                  className="mt-1 min-h-[300px] resize-none"
                />
              </div>
            </CardContent>
          </Card>
          </div>
        </div>


        <div className="flex justify-end gap-3 h-[50px] border-t-[1px] border-gray-300 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-[#05AFF2] hover:bg-[#05AFF2]/90"
          >
            Save Translation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
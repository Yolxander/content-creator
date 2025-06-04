import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Sparkles, CheckCircle } from "lucide-react"

interface InitialTranslationModalProps {
  isOpen: boolean
  onClose: () => void
  language: {
    code: string
    name: string
    flag: string
  }
  onTranslate: () => Promise<void>
}

export function InitialTranslationModal({
  isOpen,
  onClose,
  language,
  onTranslate,
}: InitialTranslationModalProps) {
  const [isTranslating, setIsTranslating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const handleTranslate = async () => {
    setIsTranslating(true)
    setProgress(0)
    setIsComplete(false)

    try {
      // Simulate translation progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 500)

      // Call the translation function
      await onTranslate()

      // Complete the progress
      clearInterval(interval)
      setProgress(100)
      setIsComplete(true)

      // Close modal after a delay
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      console.error("Translation failed:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{language.flag}</span>
            Translate to {language.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!isComplete ? (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Translation Progress</Label>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Sparkles className="w-4 h-4" />
                  <span>Using AI to translate your content...</span>
                </div>
                <div className="text-sm text-gray-500">
                  This may take a few moments. You can close this window and continue working.
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-gray-900">Translation Complete</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Your content has been translated to {language.name}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            {!isTranslating && !isComplete && (
              <>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleTranslate}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Translation
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
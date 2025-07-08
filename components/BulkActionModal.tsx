import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle, Download, Globe, Trash2, Upload } from "lucide-react"

interface Article {
  id: number
  title: string
  author: string
  category: string
  status: string
  views: string
  languages: number
  lastModified: string
  selected: boolean
}

interface BulkActionModalProps {
  isOpen: boolean
  onClose: () => void
  action: 'publish' | 'translate' | 'export' | 'delete' | null
  selectedArticles: Article[]
  onConfirm: (action: string, articleIds: number[]) => void
}

export function BulkActionModal({ isOpen, onClose, action, selectedArticles, onConfirm }: BulkActionModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  if (!action) return null

  const actionConfig = {
    publish: {
      title: "Publish Articles",
      description: "Are you sure you want to publish the selected articles?",
      icon: <Upload className="w-5 h-5" />,
      buttonText: "Publish",
      buttonVariant: "default" as const,
      isDestructive: false
    },
    translate: {
      title: "Translate Articles",
      description: "Are you sure you want to translate the selected articles?",
      icon: <Globe className="w-5 h-5" />,
      buttonText: "Translate",
      buttonVariant: "default" as const,
      isDestructive: false
    },
    export: {
      title: "Export Articles",
      description: "Are you sure you want to export the selected articles?",
      icon: <Download className="w-5 h-5" />,
      buttonText: "Export",
      buttonVariant: "default" as const,
      isDestructive: false
    },
    delete: {
      title: "Delete Articles",
      description: "Are you sure you want to delete the selected articles? This action is irreversible.",
      icon: <Trash2 className="w-5 h-5" />,
      buttonText: "Delete",
      buttonVariant: "destructive" as const,
      isDestructive: true
    }
  }

  const config = actionConfig[action]

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm(action, selectedArticles.map(article => article.id))
      onClose()
    } catch (error) {
      console.error('Action failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {config.icon}
            {config.title}
          </DialogTitle>
          <DialogDescription>
            {config.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-sm text-gray-900 mb-2">
              Selected Articles ({selectedArticles.length}):
            </h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {selectedArticles.map((article) => (
                <div key={article.id} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  {article.title}
                  {article.status === 'PUBLISHED' && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Published
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {action === 'delete' && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">
                This action cannot be undone. All selected articles will be permanently deleted.
              </span>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            variant={config.buttonVariant}
            onClick={handleConfirm}
            disabled={isLoading}
            className={config.isDestructive ? "bg-red-600 hover:bg-red-700" : ""}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {config.buttonText}ing...
              </div>
            ) : (
              config.buttonText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
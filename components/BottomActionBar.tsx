import { Button } from "@/components/ui/button"
import { Download, Trash2, Pin, ArrowUpDown, Upload, Globe } from "lucide-react"

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

interface Action {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

interface BottomActionBarProps {
  selectedCount: number
  itemType: string
  selectedItems?: Article[]
  actions?: Action[]
  onPublish?: () => void
  onTranslate?: () => void
  onExport?: () => void
  onDelete?: () => void
  onPin?: () => void
  onReorder?: () => void
}

export function BottomActionBar({ 
  selectedCount, 
  itemType, 
  selectedItems = [],
  actions,
  onPublish,
  onTranslate,
  onExport,
  onDelete,
  onPin,
  onReorder
}: BottomActionBarProps) {
  if (selectedCount === 0) return null

  // Check if any selected article is already published
  const hasPublishedArticles = selectedItems.some(item => item.status === 'PUBLISHED')

  const getDefaultActions = (): Action[] => {
    switch (itemType) {
      case 'articles':
        const articleActions: Action[] = []
        
        // Only show Publish if no articles are already published
        if (!hasPublishedArticles) {
          articleActions.push({
            label: "Publish",
            icon: <Upload className="w-4 h-4 mr-2" />,
            onClick: onPublish
          })
        }
        
        articleActions.push(
          {
            label: "Translate",
            icon: <Globe className="w-4 h-4 mr-2" />,
            onClick: onTranslate
          },
          {
            label: "Export",
            icon: <Download className="w-4 h-4 mr-2" />,
            onClick: onExport
          },
          {
            label: "Delete",
            icon: <Trash2 className="w-4 h-4 mr-2" />,
            onClick: onDelete
          }
        )
        
        return articleActions
        
      case 'feeds':
        return [
          { label: "Pin", icon: <Pin className="w-4 h-4 mr-2" />, onClick: onPin },
          { label: "Reorder", icon: <ArrowUpDown className="w-4 h-4 mr-2" />, onClick: onReorder },
          { label: "Export", icon: <Download className="w-4 h-4 mr-2" />, onClick: onExport },
          { label: "Delete", icon: <Trash2 className="w-4 h-4 mr-2" />, onClick: onDelete },
        ]
        
      case 'audio':
        const audioActions: Action[] = []
        
        // Only show Publish if no audio items are already published
        if (!hasPublishedArticles) {
          audioActions.push({
            label: "Publish",
            icon: <Upload className="w-4 h-4 mr-2" />,
            onClick: onPublish
          })
        }
        
        audioActions.push(
          {
            label: "Translate",
            icon: <Globe className="w-4 h-4 mr-2" />,
            onClick: onTranslate
          },
          {
            label: "Export",
            icon: <Download className="w-4 h-4 mr-2" />,
            onClick: onExport
          },
          {
            label: "Delete",
            icon: <Trash2 className="w-4 h-4 mr-2" />,
            onClick: onDelete
          }
        )
        
        return audioActions
        
      default:
        return []
    }
  }

  const displayActions = actions || getDefaultActions()

  return (
    <div className="bg-[#05AFF2] text-white p-4 flex items-center justify-between">
      <span className="text-sm">{selectedCount} selected {itemType}</span>
      <div className="flex items-center gap-2">
        {displayActions.map((action, index) => (
          <Button 
            key={index} 
            variant="secondary" 
            size="sm" 
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
} 
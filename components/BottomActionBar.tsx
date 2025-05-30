import { Button } from "@/components/ui/button"
import { Download, Trash2, Pin, ArrowUpDown } from "lucide-react"

interface Action {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
}

interface BottomActionBarProps {
  selectedCount: number
  itemType: string
  actions?: Action[]
}

export function BottomActionBar({ selectedCount, itemType, actions }: BottomActionBarProps) {
  if (selectedCount === 0) return null

  const defaultActions: Record<string, Action[]> = {
    articles: [
      { label: "Publish" },
      { label: "Translate" },
      { label: "Export", icon: <Download className="w-4 h-4 mr-2" /> },
      { label: "Delete", icon: <Trash2 className="w-4 h-4 mr-2" /> },
    ],
    feeds: [
      { label: "Pin", icon: <Pin className="w-4 h-4 mr-2" /> },
      { label: "Reorder", icon: <ArrowUpDown className="w-4 h-4 mr-2" /> },
      { label: "Export", icon: <Download className="w-4 h-4 mr-2" /> },
      { label: "Delete", icon: <Trash2 className="w-4 h-4 mr-2" /> },
    ],
    audio: [
      { label: "Publish" },
      { label: "Translate" },
      { label: "Export", icon: <Download className="w-4 h-4 mr-2" /> },
      { label: "Delete", icon: <Trash2 className="w-4 h-4 mr-2" /> },
    ],
  }

  const displayActions = actions || defaultActions[itemType] || []

  return (
    <div className="bg-[#05AFF2] text-white p-4 flex items-center justify-between">
      <span className="text-sm">{selectedCount} selected {itemType}</span>
      <div className="flex items-center gap-2">
        {displayActions.map((action, index) => (
          <Button key={index} variant="secondary" size="sm" onClick={action.onClick}>
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
} 
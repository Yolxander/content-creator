import { cn } from "@/lib/utils"
import { FileText, Image, Languages, Settings } from "lucide-react"

interface ArticleSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function ArticleSidebar({ activeSection, onSectionChange }: ArticleSidebarProps) {
  const articleNavItems = [
    {
      title: 'Content',
      section: 'content',
      icon: FileText,
    },
    {
      title: 'Media',
      section: 'media',
      icon: Image,
    },
    {
      title: 'Translation',
      section: 'translation',
      icon: Languages,
    },
    {
      title: 'Settings',
      section: 'settings',
      icon: Settings,
    },
  ]

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200">
      <div className="p-4">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Article Editor
        </h2>
        <div className="space-y-1">
          {articleNavItems.map((item) => (
            <button
              key={item.section}
              onClick={() => onSectionChange(item.section)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
                activeSection === item.section && 'bg-gray-100 text-gray-900'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 
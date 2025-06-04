import { cn } from "@/lib/utils"
import { FileAudio, Image as ImageIcon, Languages, Settings } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface AudioSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface NavItem {
  title: string;
  section: string;
  icon: LucideIcon;
}

export function AudioSidebar({ activeSection, onSectionChange }: AudioSidebarProps) {
  const audioNavItems: NavItem[] = [
    {
      title: 'Audio',
      section: 'audio',
      icon: FileAudio,
    },
    {
      title: 'Media',
      section: 'media',
      icon: ImageIcon,
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
          Audio Editor
        </h2>
        <div className="space-y-1">
          {audioNavItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.section}
                onClick={() => onSectionChange(item.section)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
                  activeSection === item.section && 'bg-gray-100 text-gray-900'
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {item.title}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

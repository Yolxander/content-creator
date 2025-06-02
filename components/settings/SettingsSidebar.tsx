import { cn } from "@/lib/utils"
import { Users, Settings, FileText, Bell, Shield, Languages, Wrench } from "lucide-react"

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  const settingsNavItems = [
    {
      title: 'Personal',
      section: 'personal',
      icon: Users,
    },
    {
      title: 'Organization',
      section: 'organization',
      icon: Settings,
    },
    {
      title: 'Content Defaults',
      section: 'content',
      icon: FileText,
    },
    {
      title: 'Notifications',
      section: 'notifications',
      icon: Bell,
    },
    {
      title: 'Security',
      section: 'security',
      icon: Shield,
    },
    {
      title: 'Language',
      section: 'language',
      icon: Languages,
    },
    {
      title: 'Admin Tools',
      section: 'admin',
      icon: Wrench,
    },
  ]

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200">
      <div className="p-4">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Settings
        </h2>
        <div className="space-y-1">
          {settingsNavItems.map((item) => (
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
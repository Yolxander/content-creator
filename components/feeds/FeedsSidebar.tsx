import { cn } from "@/lib/utils"
import { Rss, Settings, Link, Clock, BarChart, FileText, FileAudio, Users, Target, Filter } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface FeedsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string, subsection?: string) => void;
}

interface SubItem {
  title: string;
  section: string;
  subsection?: string;
  icon: LucideIcon;
}

interface NavItem {
  title: string;
  section: string;
  icon: LucideIcon;
  subItems?: SubItem[];
}

export function FeedsSidebar({ activeSection, onSectionChange }: FeedsSidebarProps) {
  const feedsNavItems: NavItem[] = [
    {
      title: 'Feed Details',
      section: 'details',
      icon: Rss,
    },
    {
      title: 'Content Selection',
      section: 'content',
      icon: FileText,
      subItems: [
        {
          title: 'Articles',
          section: 'content-articles',
          icon: FileText,
        },
        {
          title: 'Audio',
          section: 'content-audio',
          icon: FileAudio,
        },
      ],
    },
    {
      title: 'Feed Configuration',
      section: 'configuration',
      icon: Settings,
      subItems: [
        {
          title: 'Source Settings',
          section: 'configuration',
          subsection: 'source',
          icon: Link,
        },
        {
          title: 'Schedule',
          section: 'configuration',
          subsection: 'schedule',
          icon: Clock,
        },
        {
          title: 'Targeting',
          section: 'configuration',
          subsection: 'targeting',
          icon: Target,
        },
        {
          title: 'Rules',
          section: 'configuration',
          subsection: 'rules',
          icon: Filter,
        },
        {
          title: 'Analytics',
          section: 'configuration',
          subsection: 'analytics',
          icon: BarChart,
        },
        {
          title: 'Advanced Settings',
          section: 'configuration',
          subsection: 'advanced',
          icon: Settings,
        },
      ],
    },
  ]

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200">
      <div className="p-4">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Feed Configuration
        </h2>
        <div className="space-y-1">
          {feedsNavItems.map((item) => (
            <div key={item.section}>
              <button
                onClick={() => onSectionChange(item.section)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
                  activeSection === item.section && item.section !== 'configuration' && 'bg-gray-100 text-gray-900'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </button>
              {item.subItems && (activeSection === item.section || activeSection.startsWith('content')) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.section + (subItem.subsection || '')}
                      onClick={() => onSectionChange(subItem.section, subItem.subsection)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
                        activeSection === subItem.section && 'bg-gray-100 text-gray-900'
                      )}
                    >
                      <subItem.icon className="h-4 w-4" />
                      {subItem.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
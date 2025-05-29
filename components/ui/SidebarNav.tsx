import { PanelLeft, Users, LayoutList, FileText, Headphones, Layers, Rss, BarChart3, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"

const navItems = [
  { icon: PanelLeft, label: "Overview" },
  { icon: Users, label: "Users", hasDropdown: true },
]

const contentItems = [
  { icon: FileText, label: "Articles", active: true },
  { icon: Headphones, label: "Audio" },
  { icon: Layers, label: "Modules" },
  { icon: Rss, label: "Feeds" },
]

const moreItems = [
  { icon: BarChart3, label: "Analytics", hasDropdown: true },
  { icon: Settings, label: "Settings" },
]

type SidebarNavProps = {
  onContentTypeChange?: (type: string) => void
}

export default function SidebarNav({ onContentTypeChange }: SidebarNavProps) {
  const [activeContent, setActiveContent] = useState("articles")

  return (
    <aside className="w-64 bg-[#F8F9FB] border-r border-gray-200 flex flex-col justify-between min-h-screen px-4 py-6">
      <div>
        {/* Logo and Bell */}
        <div className="flex items-center gap-2 mb-10 px-1">
          <img src="/logo/lmc-logo.png" alt="LMC logo" className="w-12 h-12 rounded-lg" />
        
        </div>
        {/* Main nav */}
        <nav className="flex flex-col gap-2">
          {navItems.map(({ icon: Icon, label, hasDropdown }) => (
            <div key={label} className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-all">
              <Icon className="w-5 h-5" />
              <span className="font-medium text-base">{label}</span>
              {hasDropdown && <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />}
            </div>
          ))}
          {/* Content Section */}
          <div className="bg-white shadow-sm rounded-xl px-2 py-1 my-2 border border-gray-100">
            <div className="flex items-center gap-3 px-2 py-2 text-gray-900 font-semibold cursor-pointer">
              <LayoutList className="w-5 h-5" />
              <span>Content</span>
              <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />
            </div>
            <div className="ml-7 mt-1 flex flex-col gap-1">
              {contentItems.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer font-medium text-base transition-all ${activeContent === label.toLowerCase() ? "bg-gradient-to-r from-[#0583F2] via-[#0597F2] via-[#05AFF2] to-[#5CC8F2] text-white" : "text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => {
                    setActiveContent(label.toLowerCase())
                    if (onContentTypeChange) onContentTypeChange(label.toLowerCase())
                  }}
                >
                  <Icon className={`w-4 h-4 ${activeContent === label.toLowerCase() ? "text-white" : ""}`} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* More nav */}
          {moreItems.map(({ icon: Icon, label, hasDropdown }) => (
            <div key={label} className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-all">
              <Icon className="w-5 h-5" />
              <span className="font-medium text-base">{label}</span>
              {hasDropdown && <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />}
            </div>
          ))}
        </nav>
      </div>
      {/* User Profile */}
      <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl mt-8 cursor-pointer transition-all">
        <Avatar className="w-9 h-9">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback>LS</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="text-base font-medium text-gray-900">Lena Steiner</div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </aside>
  )
} 
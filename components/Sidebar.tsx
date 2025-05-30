import Link from "next/link"
import { Home, FileText, HelpCircle, Settings, ArrowUpRight, ChevronDown, Headphones, Rss, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <span className="font-semibold text-gray-900">Meetalo</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link href="/my-work">
            <Button variant="ghost" className="w-full justify-start">
              <Briefcase className="w-4 h-4 mr-2" />
              My work
            </Button>
          </Link>
          <Link href="/articles">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Articles
            </Button>
          </Link>
          <Link href="/audio">
            <Button variant="ghost" className="w-full justify-start">
              <Headphones className="w-4 h-4 mr-2" />
              Audio
            </Button>
          </Link>
          <Link href="/feeds">
            <Button variant="ghost" className="w-full justify-start">
              <Rss className="w-4 h-4 mr-2" />
              Feeds
            </Button>
          </Link>
        </div>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 mb-2">
          <HelpCircle className="w-4 h-4 mr-3" />
          Help
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 mb-4">
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </Button>

        {/* Usage indicator */}
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">86% of free records are used.</div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-orange-500 h-1 rounded-full" style={{ width: "86%" }}></div>
          </div>
        </div>

        <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 mb-4">
          <ArrowUpRight className="w-4 h-4 mr-3" />
          Upgrade subscription
        </Button>

        {/* User profile */}
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>SP</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">Simon Prusin</div>
            <div className="text-xs text-gray-500 truncate">simonprusin@gmail.com</div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  )
} 
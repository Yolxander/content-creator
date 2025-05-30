"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  FileText,
  FileAudio,
  Rss,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  FolderOpen,
} from "lucide-react"
import { OrganizationSwitcher } from "@/components/OrganizationSwitcher"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div
      className={`relative flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Collapse button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {/* Logo */}
      <div className="border-b border-gray-200 pt-4">
        {!isCollapsed && (
          <div className="px-4 pb-4">
            <OrganizationSwitcher />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/">
          <Button
            variant={isActive("/") ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            {!isCollapsed && "Dashboard"}
          </Button>
        </Link>

        {/* Content Section */}
        {!isCollapsed && (
          <div className="px-2 py-1">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Content</h3>
          </div>
        )}
        <Link href="/articles">
          <Button
            variant={isActive("/articles") ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <FileText className="w-4 h-4 mr-2" />
            {!isCollapsed && "Articles"}
          </Button>
        </Link>
        <Link href="/audio">
          <Button
            variant={isActive("/audio") ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <FileAudio className="w-4 h-4 mr-2" />
            {!isCollapsed && "Audio"}
          </Button>
        </Link>
        <Link href="/feeds">
          <Button
            variant={isActive("/feeds") ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Rss className="w-4 h-4 mr-2" />
            {!isCollapsed && "Feeds"}
          </Button>
        </Link>

        {/* Admin Section */}
        {!isCollapsed && (
          <div className="px-2 py-1 mt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin</h3>
          </div>
        )}
        <Link href="/admin/tools">
          <Button
            variant={isActive("/admin/tools") ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Shield className="w-4 h-4 mr-2" />
            {!isCollapsed && "Reviewer Tool"}
          </Button>
        </Link>
        <Link href="/settings">
          <Button
            variant={isActive("/settings") ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Settings className="w-4 h-4 mr-2" />
            {!isCollapsed && "Settings"}
          </Button>
        </Link>
      </nav>

      {/* User profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div>
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
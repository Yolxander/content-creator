"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
} from "lucide-react"
import { OrganizationSwitcher } from "@/components/OrganizationSwitcher"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  const isActive = (path: string) => {
    return pathname === path
  }

  const mainNavItems = [
    {
      title: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      title: 'Articles',
      href: '/articles',
      icon: FileText,
    },
    {
      title: 'Audio',
      href: '/audio',
      icon: FileAudio,
    },
    {
      title: 'Feeds',
      href: '/feeds',
      icon: Rss,
    },
  ]

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Logout failed:", error)
    }
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
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
              pathname === item.href && 'bg-gray-100 text-gray-900'
            )}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!isCollapsed && item.title}
          </Link>
        ))}

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
            <Shield className="w-4 h-4 mr-2 flex-shrink-0" />
            {!isCollapsed && "Reviewer Tool"}
          </Button>
        </Link>
        <Link href="/settings">
          <Button
            variant={isActive("/settings") ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Settings className="w-4 h-4 mr-2 flex-shrink-0" />
            {!isCollapsed && "Settings"}
          </Button>
        </Link>
      </nav>

      {/* User profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback>{user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div>
              <div className="text-sm font-medium">{user?.name || 'User'}</div>
              <div className="text-xs text-gray-500">{user?.email}</div>
            </div>
          )}
        </div>
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  )
} 
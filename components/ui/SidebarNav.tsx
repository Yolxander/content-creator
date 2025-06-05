"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

const navigation = [
  { name: "Overview", href: "/overview", icon: "Home" },
  { name: "Content", href: "/content", icon: "FileText" },
  { name: "Articles", href: "/articles", icon: "FileText" },
  { name: "Audio", href: "/audio", icon: "Headphones" },
  { name: "Feeds", href: "/feeds", icon: "Rss" },
  { name: "Settings", href: "/settings", icon: "Settings" },
]

export default function SidebarNav() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <Link href="/" className="text-xl font-bold text-[#05AFF2]">
            Content Creator
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? "→" : "←"}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md",
              pathname === item.href
                ? "bg-[#05AFF2] text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <span className="w-5 h-5 mr-3">{item.icon}</span>
            {!isCollapsed && item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        {user ? (
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              {!isCollapsed && (
                <>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name || user.email}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
              className="text-gray-500 hover:text-gray-700"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button className="w-full">Login</Button>
          </Link>
        )}
      </div>
    </div>
  )
} 
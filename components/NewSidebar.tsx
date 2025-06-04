"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Home,
  FileText,
  Headphones,
  MessageSquare,
  Settings,
  Menu,
  Users,
  Database,
  BarChart3,
  Globe,
  Languages,
  Clock,
  Eye,
} from "lucide-react"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/newdashboard",
  },
  {
    label: "Content",
    icon: FileText,
    href: "/content",
  },
  {
    label: "Audio",
    icon: Headphones,
    href: "/audio",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/messages",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    label: "Team",
    icon: Users,
    href: "/team",
  },
  {
    label: "Database",
    icon: Database,
    href: "/database",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

const tools = [
  {
    label: "Language",
    icon: Languages,
    href: "/language",
  },
  {
    label: "Views",
    icon: Eye,
    href: "/views",
  },
  {
    label: "Time",
    icon: Clock,
    href: "/time",
  },
  {
    label: "Global",
    icon: Globe,
    href: "/global",
  },
]

export function NewSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <div className="space-y-4 py-4 flex flex-col h-full">
            <div className="px-3 py-2 flex-1">
              <Link href="/newdashboard" className="flex items-center pl-3 mb-14">
                <h1 className="text-2xl font-bold">
                  Content Creator
                </h1>
              </Link>
              <div className="space-y-1">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-accent rounded-lg transition",
                      pathname === route.href ? "bg-accent" : "text-muted-foreground",
                    )}
                  >
                    <div className="flex items-center flex-1">
                      <route.icon className="h-5 w-5 mr-3" />
                      {route.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="px-3 py-2">
              <div className="space-y-1">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={cn(
                      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-accent rounded-lg transition",
                      pathname === tool.href ? "bg-accent" : "text-muted-foreground",
                    )}
                  >
                    <div className="flex items-center flex-1">
                      <tool.icon className="h-5 w-5 mr-3" />
                      {tool.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50 border-r">
        <div className="space-y-4 py-4 flex flex-col h-full">
          <div className="px-3 py-2 flex-1">
            <Link href="/newdashboard" className="flex items-center pl-3 mb-14">
              <h1 className="text-2xl font-bold">
                Content Creator
              </h1>
            </Link>
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-accent rounded-lg transition",
                    pathname === route.href ? "bg-accent" : "text-muted-foreground",
                  )}
                >
                  <div className="flex items-center flex-1">
                    <route.icon className="h-5 w-5 mr-3" />
                    {route.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="space-y-1">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-accent rounded-lg transition",
                    pathname === tool.href ? "bg-accent" : "text-muted-foreground",
                  )}
                >
                  <div className="flex items-center flex-1">
                    <tool.icon className="h-5 w-5 mr-3" />
                    {tool.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 
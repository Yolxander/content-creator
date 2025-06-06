import { PanelLeft, Users, LayoutList, FileText, Headphones, Layers, Rss, BarChart3, Settings, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import { useToast } from "@/components/ui/use-toast"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const navItems = [
  { icon: PanelLeft, label: "Overview", href: "/" },
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
  const [userProfile, setUserProfile] = useState<any>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const type = searchParams.get("type") || "articles"

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        setUserProfile(profile)
      } catch (error) {
        console.error('Error loading user profile:', error)
      }
    }

    loadUserProfile()
  }, [])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
        duration: 3000,
      })

      router.push('/auth')
    } catch (error) {
      console.error('Error logging out:', error)
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  return (
    <aside className="w-64 bg-[#f6f3ef] border-r border-[#e7e3de] flex flex-col justify-between min-h-screen px-6 py-8 rounded-3xl shadow-xl">
      <div>
        {/* Logo and Bell */}
        <div className="flex items-center gap-2 mb-10 px-1">
          <img src="/logo/lmc-logo.png" alt="LMC logo" className="w-12 h-12 rounded-2xl shadow-md" />
        </div>
        {/* Main nav */}
        <nav className="flex flex-col gap-3">
          {navItems.map(({ icon: Icon, label, hasDropdown, href }) => (
            href ? (
              <Link key={label} href={href} legacyBehavior>
                <a className={`flex items-center gap-3 px-4 py-3 ${pathname === href ? "bg-[#05AFF2] text-white shadow-md" : "text-[#05AFF2] hover:bg-[#e6f8fd]"} rounded-full cursor-pointer transition-all font-semibold text-lg`}>
                  <Icon className="w-6 h-6" />
                  <span>{label}</span>
                </a>
              </Link>
            ) : (
              <div key={label} className="flex items-center gap-3 px-4 py-3 text-[#05AFF2] hover:bg-[#e6f8fd] rounded-full cursor-pointer transition-all font-semibold text-lg">
                <Icon className="w-6 h-6" />
                <span>{label}</span>
                {hasDropdown && <ChevronDown className="w-5 h-5 ml-auto text-[#05AFF2]" />}
              </div>
            )
          ))}
          {/* Content Section */}
          <div className="bg-white shadow-md rounded-3xl px-3 py-2 my-4 border border-[#e7e3de]">
            <div className="flex items-center gap-3 px-3 py-3 text-[#05AFF2] font-bold cursor-pointer rounded-full">
              <LayoutList className="w-6 h-6" />
              <span>Content</span>
              <ChevronDown className="w-5 h-5 ml-auto text-[#05AFF2]" />
            </div>
            <div className="ml-8 mt-2 flex flex-col gap-2">
              {contentItems.map(({ icon: Icon, label }) => {
                const contentType = label.toLowerCase()
                const isActive = pathname === "/content" && type === contentType
                return (
                  <Link
                    key={label}
                    href={`/content?type=${contentType}`}
                    legacyBehavior
                  >
                    <a
                      className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer font-semibold text-lg transition-all ${isActive ? "bg-[#05AFF2] text-white shadow-md" : "text-[#05AFF2] hover:bg-[#e6f8fd]"}`}
                      onClick={() => {
                        setActiveContent(contentType)
                        if (onContentTypeChange) onContentTypeChange(contentType)
                      }}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#05AFF2]"}`} />
                      <span>{label}</span>
                    </a>
                  </Link>
                )
              })}
            </div>
          </div>
          {/* More nav */}
          {moreItems.map(({ icon: Icon, label, hasDropdown }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3 text-[#05AFF2] hover:bg-[#e6f8fd] rounded-full cursor-pointer transition-all font-semibold text-lg">
              <Icon className="w-6 h-6" />
              <span>{label}</span>
              {hasDropdown && <ChevronDown className="w-5 h-5 ml-auto text-[#05AFF2]" />}
            </div>
          ))}
        </nav>
      </div>
      {/* User Profile */}
      <div className="flex items-center justify-between p-4 hover:bg-[#e6f8fd] rounded-2xl mt-4 cursor-pointer transition-all">
        <Link href="/profile" className="flex items-center gap-4 flex-1">
        
          <div className="flex-1 min-w-0">
            <div className="text-lg font-bold text-[#05AFF2] truncate">
              {userProfile?.full_name || 'Loading...'}
            </div>
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-[#05AFF2] hover:text-[#05AFF2]/80 hover:bg-[#e6f8fd]"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </aside>
  )
} 
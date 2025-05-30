import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText, FileAudio } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface AddContentModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddContentModal({ isOpen, onClose }: AddContentModalProps) {
  const router = useRouter()

  const contentTypes = [
    {
      type: "article",
      title: "Article",
      description: "Create a new article or blog post",
      icon: FileText,
      path: "/articles/new",
    },
    {
      type: "audio",
      title: "Audio",
      description: "Create a new audio content or podcast",
      icon: FileAudio,
      path: "/audio/new",
    },
  ]

  const handleTypeSelect = (path: string) => {
    onClose()
    router.push(path)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Content</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {contentTypes.map((contentType) => (
            <button
              key={contentType.type}
              onClick={() => handleTypeSelect(contentType.path)}
              className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#05AFF2] hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 rounded-md bg-gray-100">
                <contentType.icon className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">{contentType.title}</h3>
                <p className="text-sm text-gray-500">{contentType.description}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
} 
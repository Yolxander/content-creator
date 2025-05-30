"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const organizations = [
  {
    id: "1",
    name: "Acme Inc",
    logo: "A",
  },
  {
    id: "2",
    name: "Acme Corp",
    logo: "A",
  },
  {
    id: "3",
    name: "Acme Ltd",
    logo: "A",
  },
]

export function OrganizationSwitcher() {
  const [selectedOrg, setSelectedOrg] = useState(organizations[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          className="w-full justify-between text-sm font-medium"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#05AFF2] flex items-center justify-center text-white text-xs font-medium">
              {selectedOrg.logo}
            </div>
            <span>{selectedOrg.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="w-[200px]">
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              selectedOrg.id === org.id && "bg-accent"
            )}
            onClick={() => setSelectedOrg(org)}
          >
            <div className="w-6 h-6 rounded-md bg-[#05AFF2] flex items-center justify-center text-white text-xs font-medium">
              {org.logo}
            </div>
            <span className="flex-1">{org.name}</span>
            {selectedOrg.id === org.id && (
              <Check className="h-4 w-4 text-[#05AFF2]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
import * as React from "react"
import { ChevronsUpDown, Plus, Coffee, ChevronLeft, PanelLeftClose } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,

  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Sample teams data
const teams = [
  {
    name: "SGU COFFEE",
    logo: "/logo-cnpm-preview.png",
  },
]

export function TeamSwitcher() {


  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  const { open } = useSidebar()

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent items-center gap-2 data-[state=open]:text-sidebar-accent-foreground py-10"
            >
              <div className="z-1 text-sidebar-primary-foreground flex aspect-square size-16 items-center justify-center rounded-lg">
                <img alt="SGU Logo" className="size-18" src={activeTeam.logo} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-xl text-black">{activeTeam.name}</span>
              </div>
              <SidebarTrigger >
                <PanelLeftClose className={cn("size-8 font-medium bg-white rounded-full", {
                  "rotate-180": !open
                })} />
              </SidebarTrigger>

            </SidebarMenuButton>
          </DropdownMenuTrigger>

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

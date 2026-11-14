"use client"

import {
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
  LinkIcon,
} from "@heroicons/react/24/outline"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { toast } from "@/components/ui/toast"

export type NavProject = { name: string; url: string; icon: React.ReactNode }

export function NavProjects({
  label,
  projects,
}: {
  label: string
  projects: NavProject[]
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              render={<a href={item.url} target="_blank" rel="noreferrer" />}
            >
              {item.icon}
              <span>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction
                    showOnHover
                    className="aria-expanded:bg-muted"
                  />
                }
              >
                <EllipsisHorizontalIcon />
                <span className="sr-only">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem
                  render={
                    <a href={item.url} target="_blank" rel="noreferrer" />
                  }
                >
                  <ArrowTopRightOnSquareIcon className="text-muted-foreground" />
                  <span>Open in new tab</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await navigator.clipboard.writeText(item.url)
                    toast.add({ title: "Link copied" })
                  }}
                >
                  <LinkIcon className="text-muted-foreground" />
                  <span>Copy link</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

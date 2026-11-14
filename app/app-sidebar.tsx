"use client"

import {
  BookOpenIcon,
  CubeIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline"
import { useTheme } from "next-themes"
import { useState } from "react"

import { ComponentSearch, type ComponentIndex } from "./component-search"
import { NavMain, type NavMainItem } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const references = [
  { name: "shadcn/ui", url: "https://ui.shadcn.com", icon: <CubeIcon /> },
  { name: "Base UI", url: "https://base-ui.com", icon: <BookOpenIcon /> },
  {
    name: "TanStack Table",
    url: "https://tanstack.com/table",
    icon: <TableCellsIcon />,
  },
]

/** Kitchen-sink navigation: the shadcn sidebar-08 layout fed with our component index. */
export function AppSidebar({
  nav,
  index,
}: {
  nav: NavMainItem[]
  index: ComponentIndex
}) {
  const [searchOpen, setSearchOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary gloss font-heading text-sm font-bold text-sidebar-primary-foreground shadow-chip">
                U
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-heading font-bold">UI Kit</span>
                <span className="truncate text-xs text-muted-foreground">
                  Marble edition
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="Components" items={nav} />
        <NavProjects label="References" projects={references} />
        <NavSecondary
          className="mt-auto"
          items={[
            {
              title: "Search",
              icon: <MagnifyingGlassIcon />,
              hint: (
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
              ),
              onSelect: () => setSearchOpen(true),
            },
            {
              title: "Toggle theme",
              icon: <MoonIcon />,
              hint: <Kbd>D</Kbd>,
              onSelect: () =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark"),
            },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: "Kit Maintainer", email: "kit@example.com" }} />
      </SidebarFooter>
      <ComponentSearch
        index={index}
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />
    </Sidebar>
  )
}

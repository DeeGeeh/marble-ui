"use client"

import {
  BookOpenIcon,
  ClipboardDocumentIcon,
  CubeIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { useTheme } from "next-themes"
import { useState } from "react"

import { useActiveSection } from "./use-active-section"

import { ComponentSearch, type ComponentIndex } from "./component-search"
import { NavMain, type NavMainItem } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { toast } from "@/components/ui/toast"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const REPO = "https://github.com/DeeGeeh/marble-ui"
const INSTALL =
  "npx shadcn@latest add https://raw.githubusercontent.com/DeeGeeh/marble-ui/master/public/r/marble-kit.json"

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
  const active = useActiveSection(
    index.flatMap((group) => group.sections.map((section) => section.id))
  )

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary gloss font-heading text-sm font-bold text-sidebar-primary-foreground shadow-chip">
                M
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-heading font-bold">
                  Marble UI
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  shadcn registry
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          label="Components"
          items={nav}
          active={active && `#${active}`}
        />
        <NavProjects label="References" projects={references} />
        <NavSecondary
          className="mt-auto"
          items={[
            {
              title: "Copy install command",
              icon: <ClipboardDocumentIcon />,
              onSelect: () =>
                navigator.clipboard
                  .writeText(INSTALL)
                  .then(() => toast.add({ title: "Install command copied" })),
            },
            { title: "GitHub", icon: <SiGithub />, url: REPO },
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
      <ComponentSearch
        index={index}
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />
    </Sidebar>
  )
}

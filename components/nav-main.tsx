"use client"

import { useState } from "react"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export type NavMainItem = {
  title: string
  url: string
  icon: React.ReactNode
  items?: { title: string; url: string }[]
}

/** `active` is the url of the section in view: its item is highlighted and its group opens (the others close). */
export function NavMain({
  label,
  items,
  active,
}: {
  label: string
  items: NavMainItem[]
  active?: string
}) {
  const activeGroup = items.find((item) =>
    item.items?.some((sub) => sub.url === active)
  )?.title
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [openedFor, setOpenedFor] = useState<string>()
  if (activeGroup !== openedFor) {
    setOpenedFor(activeGroup)
    if (activeGroup) setOpen({ [activeGroup]: true })
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            open={open[item.title] ?? false}
            onOpenChange={(isOpen) =>
              setOpen((all) => ({ ...all, [item.title]: isOpen }))
            }
            render={<SidebarMenuItem />}
          >
            <SidebarMenuButton
              tooltip={item.title}
              render={<a href={item.url} />}
            >
              {item.icon}
              <span>{item.title}</span>
            </SidebarMenuButton>
            {item.items?.length ? (
              <>
                <CollapsibleTrigger
                  render={
                    <SidebarMenuAction className="transition-transform aria-expanded:rotate-90" />
                  }
                >
                  <ChevronRightIcon />
                  <span className="sr-only">Toggle</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          isActive={subItem.url === active}
                          render={<a href={subItem.url} />}
                        >
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </>
            ) : null}
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

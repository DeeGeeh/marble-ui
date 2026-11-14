"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

/** A link (`url`) or an action (`onSelect`), with an optional trailing hint such as a shortcut. */
export type NavSecondaryItem = {
  title: string
  icon: React.ReactNode
  hint?: React.ReactNode
} & ({ url: string } | { onSelect: () => void })

export function NavSecondary({
  items,
  ...props
}: { items: NavSecondaryItem[] } & React.ComponentProps<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                size="sm"
                {...("url" in item
                  ? { render: <a href={item.url} /> }
                  : { onClick: item.onSelect })}
              >
                {item.icon}
                <span>{item.title}</span>
                {item.hint && <span className="ml-auto">{item.hint}</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

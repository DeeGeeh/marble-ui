"use client"

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"
import { cn } from "@/lib/utils"

function Toolbar({ className, ...props }: ToolbarPrimitive.Root.Props) {
  return (
    <ToolbarPrimitive.Root
      data-slot="toolbar"
      data-nest=""
      className={cn(
        "rim relative flex w-fit items-center gap-1 rounded-xl bg-card p-1 shadow-slab [--nest-radius:calc(var(--radius-xl)-var(--spacing))] data-[orientation=vertical]:flex-col **:data-[slot=button]:not-data-[variant=ghost]:not-data-[variant=link]:mb-[3px]",
        className
      )}
      {...props}
    />
  )
}

function ToolbarGroup({ className, ...props }: ToolbarPrimitive.Group.Props) {
  return (
    <ToolbarPrimitive.Group
      data-slot="toolbar-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

function ToolbarButton(props: ToolbarPrimitive.Button.Props) {
  return <ToolbarPrimitive.Button data-slot="toolbar-button" {...props} />
}

function ToolbarLink(props: ToolbarPrimitive.Link.Props) {
  return <ToolbarPrimitive.Link data-slot="toolbar-link" {...props} />
}

function ToolbarInput(props: ToolbarPrimitive.Input.Props) {
  return <ToolbarPrimitive.Input data-slot="toolbar-input" {...props} />
}

function ToolbarSeparator({
  className,
  ...props
}: ToolbarPrimitive.Separator.Props) {
  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:my-0.5 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-5 data-[orientation=vertical]:mx-0.5 data-[orientation=vertical]:h-5 data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export {
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  ToolbarLink,
  ToolbarInput,
  ToolbarSeparator,
}

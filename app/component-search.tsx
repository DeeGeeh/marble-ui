"use client"

import { useHotkeys } from "react-hotkeys-hook"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export type ComponentIndex = {
  title: string
  sections: { title: string; id: string }[]
}[]

/** ⌘K / Ctrl+K palette that jumps to a kitchen-sink section. */
export function ComponentSearch({
  index,
  open,
  onOpenChange,
}: {
  index: ComponentIndex
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  // ⌘K on Mac, Ctrl+K elsewhere; also works from inside the palette's input to close it
  useHotkeys("mod+k", () => onOpenChange(!open), {
    preventDefault: true,
    enableOnFormTags: true,
  })

  const jump = (id: string) => {
    onOpenChange(false)
    document.getElementById(id)?.scrollIntoView({ block: "start" })
    history.replaceState(null, "", `#${id}`)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search components"
      description="Jump to a component"
    >
      <Command>
        <CommandInput placeholder="Search components…" />
        <CommandList>
          <CommandEmpty>No components found.</CommandEmpty>
          {index.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.sections.map((section) => (
                <CommandItem key={section.id} onSelect={() => jump(section.id)}>
                  {section.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}

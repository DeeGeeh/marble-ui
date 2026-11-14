"use client"

import { SearchIcon } from "lucide-react"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

type Index = { title: string; sections: { title: string; id: string }[] }[]

/** ⌘K / Ctrl+K palette that jumps to a kitchen-sink section. */
export function ComponentSearch({ index }: { index: Index }) {
  const [open, setOpen] = useState(false)

  // ⌘K on Mac, Ctrl+K elsewhere; also works from inside the palette's input to close it
  useHotkeys("mod+k", () => setOpen((value) => !value), {
    preventDefault: true,
    enableOnFormTags: true,
  })

  const jump = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ block: "start" })
    history.replaceState(null, "", `#${id}`)
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto w-56 justify-between"
        onClick={() => setOpen(true)}
      >
        <span className="flex items-center gap-2 text-muted-foreground">
          <SearchIcon /> Search components
        </span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
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
                  <CommandItem
                    key={section.id}
                    onSelect={() => jump(section.id)}
                  >
                    {section.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

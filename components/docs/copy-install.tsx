"use client"

import { useState } from "react"
import {
  CheckIcon,
  ChevronDownIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline"
import { useCopyToClipboard } from "usehooks-ts"

import { addCommand, packageManagers, type PackageManager } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePackageManager } from "./install-command"
import { PackageManagerIcon } from "./package-manager-icon"

export function CopyInstall({
  items,
  className,
}: {
  items: readonly string[]
  className?: string
}) {
  const [, copy] = useCopyToClipboard()
  const [preferred, setPreferred] = usePackageManager()
  const [copied, setCopied] = useState(false)
  const run = (pm: PackageManager) =>
    copy(addCommand(items, pm)).then((ok) => {
      if (!ok) return
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    })

  return (
    <ButtonGroup className={className}>
      <Button variant="outline" size="sm" onClick={() => run(preferred)}>
        {copied ? <CheckIcon /> : <Square2StackIcon />}
        {copied ? "Copied" : "Copy CLI"}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Copy with another package manager"
            />
          }
        >
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {packageManagers.map((pm) => (
            <DropdownMenuItem
              key={pm}
              onClick={() => {
                setPreferred(pm)
                run(pm)
              }}
            >
              <PackageManagerIcon pm={pm} />
              {pm}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

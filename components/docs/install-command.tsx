"use client"

import { CheckIcon, Square2StackIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useCopyToClipboard, useLocalStorage } from "usehooks-ts"

import {
  addCommand,
  packageManagers,
  shadcnCommand,
  type PackageManager,
} from "@/lib/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PackageManagerIcon } from "./package-manager-icon"

export function usePackageManager() {
  return useLocalStorage<PackageManager>("marble:package-manager", "npm", {
    initializeWithValue: false,
  })
}

export function InstallCommand({
  className,
  ...what
}: ({ items: readonly string[] } | { args: string }) & { className?: string }) {
  const [pm, setPm] = usePackageManager()
  const command =
    "items" in what ? addCommand(what.items, pm) : shadcnCommand(what.args, pm)
  const [, copy] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)

  return (
    <div className={cn("flex w-full min-w-0 not-prose", className)}>
      <div className="flex h-11 w-full min-w-0 items-center gap-2 rounded-xl border bg-card pr-1.5 pl-1.5 shadow-well dark:bg-input/30">
        <Select
          items={packageManagers.map((manager) => ({
            value: manager,
            label: manager,
          }))}
          value={pm}
          onValueChange={(next) => next && setPm(next)}
        >
          <SelectTrigger
            size="sm"
            aria-label="Package manager"
            className="shrink-0 border-transparent bg-transparent shadow-none hover:bg-muted dark:bg-transparent"
          >
            <SelectValue>
              {(value: PackageManager) => <PackageManagerIcon pm={value} />}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {packageManagers.map((manager) => (
              <SelectItem key={manager} value={manager}>
                <PackageManagerIcon pm={manager} />
                {manager}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span aria-hidden className="h-5 w-px shrink-0 bg-border" />
        <code
          title={command}
          className="min-w-0 flex-1 truncate text-left font-mono text-sm"
        >
          {command}
        </code>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={copied ? "Copied" : "Copy command"}
          data-copied={copied || undefined}
          className="group/copy shrink-0"
          onClick={() =>
            copy(command).then((ok) => {
              if (!ok) return
              setCopied(true)
              setTimeout(() => setCopied(false), 1600)
            })
          }
        >
          <span className="grid *:col-start-1 *:row-start-1 *:transition-[opacity,scale,filter] *:duration-150 *:ease-out">
            <Square2StackIcon className="group-data-copied/copy:scale-75 group-data-copied/copy:opacity-0 group-data-copied/copy:blur-[2px]" />
            <CheckIcon className="scale-75 opacity-0 blur-[2px] group-data-copied/copy:scale-100 group-data-copied/copy:opacity-100 group-data-copied/copy:blur-none" />
          </span>
        </Button>
      </div>
    </div>
  )
}

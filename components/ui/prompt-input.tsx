"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  PaperClipIcon,
  StopIcon,
} from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group"

function PromptInput({
  className,
  children,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      data-slot="prompt-input"
      className={cn("w-full", className)}
      {...props}
    >
      <InputGroup className="rounded-xl bg-card dark:bg-card">
        {children}
      </InputGroup>
    </form>
  )
}

function PromptInputTextarea({
  className,
  onKeyDown,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <InputGroupTextarea
      data-slot="prompt-input-textarea"
      rows={1}
      className={cn(
        "field-sizing-content max-h-48 min-h-10 px-3 pt-3",
        className
      )}
      onKeyDown={(e) => {
        onKeyDown?.(e)
        if (
          e.defaultPrevented ||
          e.key !== "Enter" ||
          e.shiftKey ||
          e.nativeEvent.isComposing
        )
          return
        e.preventDefault()
        e.currentTarget.form?.requestSubmit()
      }}
      {...props}
    />
  )
}

function PromptInputFooter({
  className,
  ...props
}: React.ComponentProps<typeof InputGroupAddon>) {
  return (
    <InputGroupAddon
      data-slot="prompt-input-footer"
      align="block-end"
      className={cn("justify-between", className)}
      {...props}
    />
  )
}

function PromptInputHeader({
  className,
  ...props
}: React.ComponentProps<typeof InputGroupAddon>) {
  return (
    <InputGroupAddon
      data-slot="prompt-input-header"
      align="block-start"
      className={cn("flex-wrap empty:hidden", className)}
      {...props}
    />
  )
}

function PromptInputAttach({
  onFiles,
  accept,
  multiple = true,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "type" | "onClick"> & {
  onFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <>
      <Button
        data-slot="prompt-input-attach"
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label="Attach files"
        onClick={() => inputRef.current?.click()}
        {...props}
      >
        <PaperClipIcon />
      </Button>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          onFiles(Array.from(e.target.files ?? []))
          e.target.value = ""
        }}
      />
    </>
  )
}

function PromptInputSubmit({
  busy = false,
  onStop,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "type" | "onClick"> & {
  busy?: boolean
  onStop?: () => void
}) {
  return (
    <Button
      data-slot="prompt-input-submit"
      type={busy ? "button" : "submit"}
      size="icon-sm"
      variant={busy ? "secondary" : "default"}
      aria-label={busy ? "Stop" : "Send"}
      onClick={busy ? onStop : undefined}
      {...props}
    >
      {busy ? <StopIcon /> : <ArrowUpIcon />}
    </Button>
  )
}

export {
  PromptInput,
  PromptInputTextarea,
  PromptInputHeader,
  PromptInputFooter,
  PromptInputAttach,
  PromptInputSubmit,
}

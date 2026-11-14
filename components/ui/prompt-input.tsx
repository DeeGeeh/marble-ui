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

/** Chat composer. Enter sends, Shift+Enter breaks the line. */
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
      {/* opaque: the field shouldn't show the marble of whatever band it sits on */}
      <InputGroup className="rounded-xl bg-card dark:bg-card">{children}</InputGroup>
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

/** Row above the text for attachment chips and other context. */
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

/** Paperclip that opens the file picker and hands back what was chosen. */
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

/** Send while idle; becomes a stop button while the reply is in flight. */
function PromptInputSubmit({
  busy = false,
  onStop,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "type" | "onClick"> & {
  busy?: boolean
  onStop?: () => void
}) {
  return busy ? (
    <Button
      data-slot="prompt-input-submit"
      type="button"
      size="icon-sm"
      variant="secondary"
      aria-label="Stop"
      onClick={onStop}
      className={className}
      {...props}
    >
      <StopIcon />
    </Button>
  ) : (
    <Button
      data-slot="prompt-input-submit"
      type="submit"
      size="icon-sm"
      aria-label="Send"
      className={className}
      {...props}
    >
      <ArrowUpIcon />
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

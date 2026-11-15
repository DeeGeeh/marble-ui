"use client"

import * as React from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import {
  ArrowsRightLeftIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"

import { Label } from "@/components/ui/label"

const NumberFieldContext = React.createContext<{ fieldId: string } | null>(null)

function NumberField({
  id,
  className,
  ...props
}: NumberFieldPrimitive.Root.Props) {
  const generatedId = React.useId()
  const fieldId = id ?? generatedId
  return (
    <NumberFieldContext value={{ fieldId }}>
      <NumberFieldPrimitive.Root
        data-slot="number-field"
        id={fieldId}
        className={cn("flex w-full flex-col items-start gap-2", className)}
        {...props}
      />
    </NumberFieldContext>
  )
}

function NumberFieldGroup({
  className,
  ...props
}: NumberFieldPrimitive.Group.Props) {
  return (
    <NumberFieldPrimitive.Group
      data-slot="number-field-group"
      className={cn(
        "flex h-9 w-full items-stretch overflow-hidden rounded-lg border border-input bg-card text-base shadow-well transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

const stepper =
  "relative flex w-9 shrink-0 cursor-pointer items-center justify-center text-muted-foreground transition-colors duration-150 ease-out hover:bg-muted hover:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 pointer-coarse:after:absolute pointer-coarse:after:-inset-1 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:transition-[scale] [&_svg]:duration-150 [&_svg]:ease-out active:[&_svg]:scale-90"

function NumberFieldDecrement({
  className,
  ...props
}: NumberFieldPrimitive.Decrement.Props) {
  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      className={cn(stepper, className)}
      {...props}
    >
      <MinusIcon />
    </NumberFieldPrimitive.Decrement>
  )
}

function NumberFieldIncrement({
  className,
  ...props
}: NumberFieldPrimitive.Increment.Props) {
  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      className={cn(stepper, className)}
      {...props}
    >
      <PlusIcon />
    </NumberFieldPrimitive.Increment>
  )
}

function NumberFieldInput({
  className,
  ...props
}: NumberFieldPrimitive.Input.Props) {
  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      className={cn(
        "w-full min-w-0 grow bg-transparent text-center tabular-nums outline-none",
        className
      )}
      {...props}
    />
  )
}

function NumberFieldScrubArea({
  className,
  label,
  ...props
}: NumberFieldPrimitive.ScrubArea.Props & { label: string }) {
  const context = React.use(NumberFieldContext)
  if (!context)
    throw new Error("NumberFieldScrubArea must be used inside NumberField")
  return (
    <NumberFieldPrimitive.ScrubArea
      data-slot="number-field-scrub-area"
      className={cn("flex cursor-ew-resize", className)}
      {...props}
    >
      <Label htmlFor={context.fieldId} className="cursor-ew-resize">
        {label}
      </Label>
      <NumberFieldPrimitive.ScrubAreaCursor className="drop-shadow-sm">
        <ArrowsRightLeftIcon className="size-5" />
      </NumberFieldPrimitive.ScrubAreaCursor>
    </NumberFieldPrimitive.ScrubArea>
  )
}

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
}

"use client"

import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group"
import { cn } from "@/lib/utils"

/** Checkboxes sharing one value array; a Checkbox with `parent` toggles them all. */
function CheckboxGroup({ className, ...props }: CheckboxGroupPrimitive.Props) {
  return (
    <CheckboxGroupPrimitive
      data-slot="checkbox-group"
      className={cn("flex flex-col items-start gap-3", className)}
      {...props}
    />
  )
}

export { CheckboxGroup }

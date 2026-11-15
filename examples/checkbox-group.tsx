"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { Field, FieldLabel } from "@/components/ui/field"

const permissions = ["Read", "Write", "Deploy"]

export default function CheckboxGroupExample() {
  const [value, setValue] = useState(["Read"])
  return (
    <CheckboxGroup
      value={value}
      onValueChange={setValue}
      allValues={permissions}
      aria-label="Permissions"
    >
      <Field orientation="horizontal">
        <Checkbox id="perm-all" parent />
        <FieldLabel htmlFor="perm-all">All permissions</FieldLabel>
      </Field>
      {permissions.map((permission) => (
        <Field key={permission} orientation="horizontal" className="ml-6">
          <Checkbox id={`perm-${permission}`} value={permission} />
          <FieldLabel htmlFor={`perm-${permission}`}>{permission}</FieldLabel>
        </Field>
      ))}
    </CheckboxGroup>
  )
}

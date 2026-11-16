"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { Field, FieldItem, FieldLabel } from "@/components/ui/field"

const permissions = ["Read", "Write", "Deploy"]

export default function CheckboxGroupExample() {
  const [value, setValue] = useState(["Read"])
  return (
    <Field name="permissions">
      <CheckboxGroup
        value={value}
        onValueChange={setValue}
        allValues={permissions}
        aria-label="Permissions"
      >
        <FieldItem>
          <Checkbox id="perm-all" parent />
          <FieldLabel htmlFor="perm-all">All permissions</FieldLabel>
        </FieldItem>
        {permissions.map((permission) => (
          <FieldItem key={permission} className="ml-6">
            <Checkbox id={`perm-${permission}`} value={permission} />
            <FieldLabel htmlFor={`perm-${permission}`}>{permission}</FieldLabel>
          </FieldItem>
        ))}
      </CheckboxGroup>
    </Field>
  )
}

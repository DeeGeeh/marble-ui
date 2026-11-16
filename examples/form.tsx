"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"

export default function FormExample() {
  return (
    <Form
      className="max-w-xs"
      onSubmit={(event) => {
        event.preventDefault()
        toast.add({ title: "Invite sent" })
      }}
    >
      <Field name="email">
        <FieldLabel htmlFor="invite-email">Invite by email</FieldLabel>
        <Input
          id="invite-email"
          type="email"
          required
          placeholder="name@company.com"
        />
        <FieldError />
      </Field>
      <Button type="submit" className="self-start">
        Send invite
      </Button>
    </Form>
  )
}

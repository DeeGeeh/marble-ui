import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldExample() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="you@example.com" />
        <FieldDescription>We never share it.</FieldDescription>
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input id="username" aria-invalid defaultValue="admin" />
        <FieldError>Username is taken.</FieldError>
      </Field>
    </FieldGroup>
  )
}

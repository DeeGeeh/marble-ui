import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"

export default function CheckboxExample() {
  return (
    <div className="flex flex-col gap-3">
      <Field orientation="horizontal">
        <Checkbox id="terms" defaultChecked />
        <FieldLabel htmlFor="terms">Accept terms</FieldLabel>
      </Field>
      <Field orientation="horizontal" disabled>
        <Checkbox id="disabled" disabled />
        <FieldLabel htmlFor="disabled">Disabled</FieldLabel>
      </Field>
    </div>
  )
}

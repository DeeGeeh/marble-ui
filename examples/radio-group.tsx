import { Field, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioGroupExample() {
  return (
    <RadioGroup defaultValue="comfortable">
      {["Default", "Comfortable", "Compact"].map((label) => (
        <Field key={label} orientation="horizontal">
          <RadioGroupItem value={label.toLowerCase()} id={`density-${label}`} />
          <FieldLabel htmlFor={`density-${label}`}>{label}</FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  )
}

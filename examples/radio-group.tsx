import { Field, FieldItem, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioGroupExample() {
  return (
    <Field name="density">
      <RadioGroup defaultValue="comfortable">
        {["Default", "Comfortable", "Compact"].map((label) => (
          <FieldItem key={label}>
            <RadioGroupItem
              value={label.toLowerCase()}
              id={`density-${label}`}
            />
            <FieldLabel htmlFor={`density-${label}`}>{label}</FieldLabel>
          </FieldItem>
        ))}
      </RadioGroup>
    </Field>
  )
}

import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

export default function NativeSelectExample() {
  return (
    <NativeSelect>
      {fruits.map((fruit) => (
        <NativeSelectOption key={fruit.value} value={fruit.value}>
          {fruit.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}

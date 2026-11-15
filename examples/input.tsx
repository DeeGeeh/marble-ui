import { Input } from "@/components/ui/input"

export default function InputExample() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Input aria-label="Default" placeholder="Default" />
      <Input aria-label="Disabled" placeholder="Disabled" disabled />
      <Input aria-label="Upload a file" type="file" />
    </div>
  )
}

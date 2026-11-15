import { Input } from "@/components/ui/input"

export default function InputExample() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Input placeholder="Default" />
      <Input placeholder="Disabled" disabled />
      <Input type="file" />
    </div>
  )
}

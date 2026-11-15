import { BoldIcon, ItalicIcon } from "@heroicons/react/24/outline"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleExample() {
  return (
    <div className="flex gap-2">
      <Toggle aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Italic">
        <ItalicIcon />
      </Toggle>
    </div>
  )
}

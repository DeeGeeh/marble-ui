import { CheckIcon } from "@heroicons/react/24/outline"
import { Badge } from "@/components/ui/badge"

export default function BadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="secondary">
        <CheckIcon /> Verified
      </Badge>
    </div>
  )
}

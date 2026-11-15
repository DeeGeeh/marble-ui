import { Square2StackIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"

export default function ButtonExample() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" variant="outline" aria-label="Copy" tooltip="Copy">
          <Square2StackIcon />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button loading>Saving</Button>
        <Button variant="secondary" disabledReason="Add a payment method first">
          Upgrade
        </Button>
      </div>
    </>
  )
}

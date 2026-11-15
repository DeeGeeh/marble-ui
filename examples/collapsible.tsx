import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function CollapsibleExample() {
  return (
    <Collapsible className="w-full max-w-sm">
      <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
        Show more <ChevronDownIcon />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="pt-2 text-sm text-muted-foreground">
          Hidden content revealed.
        </p>
      </CollapsibleContent>
    </Collapsible>
  )
}

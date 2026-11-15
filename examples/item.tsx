import { InboxIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {(["outline", "muted", "default"] as const).map((variant) => (
        <Item key={variant} variant={variant}>
          <ItemMedia variant="icon">
            <InboxIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{variant[0].toUpperCase() + variant.slice(1)}</ItemTitle>
            <ItemDescription>You have 3 unread messages.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Open
            </Button>
          </ItemActions>
        </Item>
      ))}
    </div>
  )
}

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/ui/toolbar"

export default function ToolbarExample() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton
          render={<Button variant="ghost" size="icon-sm" aria-label="Bold" />}
        >
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton
          render={<Button variant="ghost" size="icon-sm" aria-label="Italic" />}
        >
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Underline" />
          }
        >
          <UnderlineIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton render={<Button size="sm" />}>Publish</ToolbarButton>
    </Toolbar>
  )
}

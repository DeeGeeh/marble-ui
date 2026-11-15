import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function InputGroupExample() {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupInput placeholder="Search…" />
      <InputGroupAddon>
        <MagnifyingGlassIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
}

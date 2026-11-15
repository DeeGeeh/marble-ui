import { Separator } from "@/components/ui/separator"

export default function SeparatorExample() {
  return (
    <div className="flex h-5 items-center gap-4 text-sm">
      Blog
      <Separator orientation="vertical" />
      Docs
      <Separator orientation="vertical" />
      Source
    </div>
  )
}

import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function AspectRatioExample() {
  return (
    <AspectRatio ratio={16 / 9} className="w-full max-w-sm">
      <div className="size-full rounded-lg bg-muted" />
    </AspectRatio>
  )
}

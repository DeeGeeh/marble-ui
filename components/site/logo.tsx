import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative block size-6 shrink-0 overflow-hidden rounded-full bg-card shadow-stone before:absolute before:inset-0 before:rotate-[103deg] before:marble-knob after:absolute after:inset-0 after:gloss dark:bg-foreground",
        className
      )}
    />
  )
}

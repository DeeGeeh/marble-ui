import { cn } from "@/lib/utils"

/** Glossy pebble that squishes, reshapes and overshoots. Sizes with font-size, colors with currentColor. */
function Spinner({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn(
        "relative inline-block size-[1em] shrink-0 align-middle",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[10%] animate-spinner-morph bg-current bg-[radial-gradient(circle_at_32%_26%,oklch(1_0_0/0.75),oklch(1_0_0/0.15)_22%,transparent_45%)] shadow-[inset_0_-0.08em_0.12em_oklch(0_0_0/0.35)]" />
    </span>
  )
}

export { Spinner }

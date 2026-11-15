import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-md bg-muted shadow-well",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 animate-skeleton-sweep bg-[linear-gradient(115deg,transparent_25%,var(--skeleton-sheen)_50%,transparent_75%)] motion-reduce:animate-none" />
    </div>
  )
}

const lineWidths = ["w-full", "w-[94%]", "w-[98%]", "w-[88%]"]

function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}) {
  return (
    <div aria-hidden className={cn("flex flex-col gap-2.5", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-3.5",
            i === lines - 1 && lines > 1
              ? "w-[62%]"
              : lineWidths[i % lineWidths.length]
          )}
        />
      ))}
    </div>
  )
}

function SkeletonAvatar({ className }: { className?: string }) {
  return <Skeleton className={cn("size-10 shrink-0 rounded-full", className)} />
}

function SkeletonReveal({
  loading,
  skeleton,
  children,
  className,
}: {
  loading: boolean
  skeleton: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return loading ? (
    <div role="status" aria-busy aria-label="Loading" className={className}>
      {skeleton}
    </div>
  ) : (
    <div className={cn("animate-skeleton-reveal", className)}>{children}</div>
  )
}

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonReveal }

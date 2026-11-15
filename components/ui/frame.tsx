import { cn } from "@/lib/utils"

function Frame({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="frame"
      className={cn(
        "rim relative flex flex-col gap-1.5 rounded-2xl bg-muted/50 marble-fine p-1.5 shadow-slab",
        className
      )}
      {...props}
    />
  )
}

function FramePanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="frame-panel"
      className={cn(
        "relative rounded-xl border bg-card p-5 shadow-well",
        className
      )}
      {...props}
    />
  )
}

function FrameHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="frame-header"
      className={cn("flex flex-col gap-0.5 px-4 pt-3 pb-2 engraved", className)}
      {...props}
    />
  )
}

function FrameTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="frame-title"
      className={cn(
        "font-heading text-sm font-semibold text-foreground/75",
        className
      )}
      {...props}
    />
  )
}

function FrameDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="frame-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function FrameFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer
      data-slot="frame-footer"
      className={cn("px-4 pt-2 pb-3 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameFooter,
}

import { cn } from "@/lib/utils"

/** A recessed marble tray (the band material of card and dialog footers) holding raised panels: for grouping related surfaces. */
function Frame({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="frame"
      className={cn(
        "flex flex-col gap-1.5 rounded-2xl border bg-muted/50 marble-fine p-1.5 shadow-well",
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
        "rim relative rounded-xl bg-card p-5 shadow-slab",
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
      className={cn("flex flex-col gap-0.5 px-4 pt-3 pb-2", className)}
      {...props}
    />
  )
}

function FrameTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="frame-title"
      className={cn("text-sm font-semibold", className)}
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

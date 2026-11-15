"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "@/lib/utils"

function SegmentedControl({
  className,
  children,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        className: cn(
          "relative isolate inline-flex w-fit items-center rounded-lg bg-muted p-[3px] text-muted-foreground shadow-well",
          className
        ),
        children: (
          <>
            {children}
            <SegmentedControlIndicator />
          </>
        ),
      },
      props
    ),
    state: { slot: "segmented-control" },
  })
}

function SegmentedControlItem({
  className,
  render,
  ...props
}: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        className: cn(
          "relative inline-flex h-[calc(--spacing(9)-7px)] flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md px-2.5 text-sm font-medium whitespace-nowrap text-foreground/70 transition-colors outline-none select-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          "aria-[current=page]:text-foreground data-pressed:text-foreground dark:aria-[current=page]:text-foreground dark:data-pressed:text-foreground data-checked:text-foreground dark:data-checked:text-foreground",
          "not-in-data-[indicator=ready]:data-pressed:bg-card not-in-data-[indicator=ready]:data-pressed:shadow-stone not-in-data-[indicator=ready]:data-checked:bg-card not-in-data-[indicator=ready]:data-checked:shadow-stone",
          className
        ),
        ...(render ? {} : { type: "button" as const }),
      },
      props
    ),
    state: { slot: "segmented-control-item" },
  })
}

const activeItem =
  ':scope > [data-checked], :scope > [data-pressed], :scope > [aria-current="page"]'
const watched = ["data-checked", "data-pressed", "aria-current"]

type Rect = { left: number; top: number; width: number; height: number }

function SegmentedControlIndicator() {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [rect, setRect] = React.useState<Rect | null>(null)

  React.useLayoutEffect(() => {
    const root = ref.current?.parentElement
    if (!root) return

    const update = () => {
      const item = root.querySelector<HTMLElement>(activeItem)
      const next = item && {
        left: item.offsetLeft,
        top: item.offsetTop,
        width: item.offsetWidth,
        height: item.offsetHeight,
      }
      setRect((prev) =>
        prev &&
        next &&
        Object.entries(next).every(([k, v]) => prev[k as keyof Rect] === v)
          ? prev
          : next
      )
      root.dataset.indicator = next ? "ready" : "idle"
    }

    const scroller = root.parentElement
    const active = root.querySelector<HTMLElement>(activeItem)
    if (scroller && active && scroller.scrollWidth > scroller.clientWidth) {
      const from = scroller.getBoundingClientRect()
      const to = active.getBoundingClientRect()
      scroller.scrollLeft += to.left - from.left - (from.width - to.width) / 2
    }

    const resize = new ResizeObserver(update)
    const mutation = new MutationObserver(update)
    resize.observe(root)
    for (const child of root.children) {
      resize.observe(child)
      mutation.observe(child, { attributes: true, attributeFilter: watched })
    }
    update()
    return () => {
      resize.disconnect()
      mutation.disconnect()
    }
  }, [])

  return (
    <span
      ref={ref}
      aria-hidden
      hidden={!rect}
      data-slot="segmented-control-indicator"
      className="pointer-events-none absolute top-0 left-0 -z-1 h-(--h) w-(--w) translate-x-(--x) translate-y-(--y) rounded-md bg-card shadow-stone transition-[translate,width,height] duration-200 ease-in-out motion-reduce:transition-none dark:bg-input/30 dark:ring-1 dark:ring-input dark:ring-inset"
      style={
        {
          "--x": `${rect?.left ?? 0}px`,
          "--y": `${rect?.top ?? 0}px`,
          "--w": `${rect?.width ?? 0}px`,
          "--h": `${rect?.height ?? 0}px`,
        } as React.CSSProperties
      }
    />
  )
}

export { SegmentedControl, SegmentedControlItem }

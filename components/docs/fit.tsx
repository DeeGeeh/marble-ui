"use client"

import { useLayoutEffect, useRef, useState } from "react"

export function Fit({ children }: { children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null!)
  const inner = useRef<HTMLDivElement>(null!)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const fit = () => {
      const available = outer.current.clientHeight
      const needed = inner.current.offsetHeight
      setScale(needed > available ? available / needed : 1)
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(outer.current)
    observer.observe(inner.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={outer} className="flex size-full items-center justify-center">
      <div
        ref={inner}
        style={{ scale }}
        className="flex w-full shrink-0 flex-col items-center gap-4"
      >
        {children}
      </div>
    </div>
  )
}

"use client"

import type * as React from "react"

import { useAnimationFrame, useReducedMotion } from "motion/react"
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type PointerEvent,
} from "react"
import {
  drop,
  hold,
  INITIAL_STATE,
  MOTION,
  poseOf,
  step,
  type SimppaState,
} from "./motion"
import { SimppaSprite } from "./sprite"

const SETTLED = 1e-3

const position = (s: SimppaState) => `translate3d(${s.x}px, ${-s.y}px, 0)`
const squash = (s: SimppaState) => {
  const k = Math.min(Math.max(s.squash, -0.4), 0.4)
  return `scale(${s.dir * (1 + k * 0.6)}, ${1 - k})`
}
export function Simppa() {
  const reduceMotion = useReducedMotion()
  const state = useRef(INITIAL_STATE)
  const grab = useRef<{ x: number; y: number } | null>(null)
  const root = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const width = useRef(0)
  useEffect(() => {
    const node = root.current
    const strip = node?.parentElement
    if (!node || !strip) return
    const measure = () => {
      width.current = strip.clientWidth
    }
    const observer = new ResizeObserver(measure)
    observer.observe(strip)
    measure()
    return () => observer.disconnect()
  }, [])

  const [seen, setSeen] = useState(true)
  useEffect(() => {
    const node = root.current
    if (!node) return
    let onScreen = true
    const update = () =>
      setSeen(onScreen && document.visibilityState === "visible")
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? true
      update()
    })
    observer.observe(node)
    document.addEventListener("visibilitychange", update)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", update)
    }
  }, [])
  const [pose, setPose] = useState(() => poseOf(INITIAL_STATE))
  const [cadence, setCadence] = useState<"frame" | "walk" | "asleep">("frame")
  const alarm = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(alarm.current), [])

  const apply = (next: SimppaState) => {
    state.current = next
    if (root.current) root.current.style.transform = position(next)
    if (body.current) body.current.style.transform = squash(next)
    const nextPose = poseOf(next)
    setPose((prev) =>
      prev.frame === nextPose.frame && prev.blink === nextPose.blink
        ? prev
        : nextPose
    )
  }

  const advance = (seconds: number) => {
    let next = state.current
    for (let left = seconds; left > 0; left -= 1 / 60)
      next = step(next, Math.min(left, 1 / 60), width.current)
    return next
  }

  const sleep = () => {
    state.current = { ...state.current, squash: 0, squashVelocity: 0 }
    const seconds = Math.max(
      0,
      Math.min(state.current.until, state.current.blink)
    )
    const start = performance.now()
    setCadence("asleep")
    alarm.current = setTimeout(() => {
      apply(
        step(state.current, (performance.now() - start) / 1000, width.current)
      )
      setCadence("frame")
    }, seconds * 1000)
  }

  const tick = (seconds: number) => {
    const next = advance(Math.min(seconds, 0.2))
    apply(next)
    const settled =
      Math.abs(next.squash) < SETTLED && Math.abs(next.squashVelocity) < SETTLED
    if (next.mode === "rest" && next.blink > 0 && settled) sleep()
    else setCadence(next.mode === "walk" && settled ? "walk" : "frame")
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    clearTimeout(alarm.current)
    setCadence("frame")
    event.currentTarget.setPointerCapture(event.pointerId)
    grab.current = {
      x: event.clientX - state.current.x,
      y: event.clientY + state.current.y,
    }
    apply(hold(state.current, state.current.x, state.current.y))
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const from = grab.current
    if (!from) return
    apply(hold(state.current, event.clientX - from.x, from.y - event.clientY))
  }

  const onPointerUp = () => {
    if (!grab.current) return
    grab.current = null
    const dropped = drop(state.current)
    apply(reduceMotion ? { ...dropped, mode: "rest", y: 0 } : dropped)
  }

  return (
    <div
      ref={root}
      aria-hidden
      className="absolute bottom-0 left-0 z-floating transform-(--at) cursor-grab touch-none select-none active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ "--at": position(INITIAL_STATE) } as React.CSSProperties}
    >
      {reduceMotion || !seen || cadence === "asleep" ? null : cadence ===
        "walk" ? (
        <Ticker fps={MOTION.walkFps} onTick={tick} />
      ) : (
        <Loop onFrame={tick} />
      )}
      <div
        ref={body}
        className="origin-bottom transform-(--at)"
        style={{ "--at": squash(INITIAL_STATE) } as React.CSSProperties}
      >
        <SimppaSprite frame={pose.frame} blink={pose.blink} className="block" />
      </div>
    </div>
  )
}

function Loop({ onFrame }: { onFrame: (seconds: number) => void }) {
  const latest = useRef(onFrame)
  useEffect(() => {
    latest.current = onFrame
  })
  useAnimationFrame((_, delta) => latest.current(delta / 1000))
  return null
}

function Ticker({
  fps,
  onTick,
}: {
  fps: number
  onTick: (seconds: number) => void
}) {
  const tick = useEffectEvent(onTick)
  useEffect(() => {
    let last = performance.now()
    const id = setInterval(() => {
      const now = performance.now()
      tick((now - last) / 1000)
      last = now
    }, 1000 / fps)
    return () => clearInterval(id)
  }, [fps])
  return null
}

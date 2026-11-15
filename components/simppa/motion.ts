import {
  AIR_FRAME,
  REST_FRAME,
  SPRITE,
  WALK_FRAMES,
  WALK_TRAVEL,
} from "./sprites"

export const MOTION = {
  scale: 2,
  walkFps: 12,
  gravity: 1800,
  jumpVelocity: 420,
  bounce: 0.35,
  settleVelocity: 70,
  squashKick: 0.006,
  squashStiffness: 320,
  squashDamping: 11,
  blinkEvery: [2, 6],
  blinkLength: 0.14,
  walkFor: [3, 8],
  restFor: [2, 5],
  weights: { walk: 6, rest: 3, jump: 1 },
} as const

type Mode = keyof typeof MOTION.weights | "held"

export type SimppaState = {
  mode: Mode
  until: number
  x: number
  dir: 1 | -1
  y: number
  vy: number
  squash: number
  squashVelocity: number
  cycle: number
  blink: number
}

export const INITIAL_STATE: SimppaState = {
  mode: "rest",
  until: 1.5,
  x: 24,
  dir: 1,
  y: 0,
  vy: 0,
  squash: 0,
  squashVelocity: 0,
  cycle: 0,
  blink: 3,
}

const STRIDE = WALK_TRAVEL.at(-1) ?? 0

const walkFrame = (cycle: number) =>
  Math.floor(cycle * MOTION.walkFps) % WALK_FRAMES.length

function travelled(cycle: number) {
  const lap = Math.floor((cycle * MOTION.walkFps) / WALK_FRAMES.length)
  return lap * STRIDE + (WALK_TRAVEL[walkFrame(cycle)] ?? 0)
}

const between = ([min, max]: readonly [number, number], random: () => number) =>
  min + (max - min) * random()

function pick(random: () => number): Mode {
  const entries = Object.entries(MOTION.weights) as [Mode, number][]
  let roll = random() * entries.reduce((sum, [, weight]) => sum + weight, 0)
  for (const [mode, weight] of entries) {
    roll -= weight
    if (roll < 0) return mode
  }
  return "rest"
}

export function step(
  prev: SimppaState,
  dt: number,
  viewportWidth: number,
  random: () => number = Math.random
): SimppaState {
  const s = { ...prev, until: prev.until - dt, blink: prev.blink - dt }

  const maxX = Math.max(0, viewportWidth - SPRITE.width * MOTION.scale)

  if (s.mode === "walk") {
    const before = travelled(s.cycle)
    s.cycle += dt
    s.x += s.dir * (travelled(s.cycle) - before) * MOTION.scale
    if (s.x <= 0) s.dir = 1
    else if (s.x >= maxX) s.dir = -1
  }
  s.x = Math.min(Math.max(s.x, 0), maxX)

  if (s.mode === "jump") {
    s.vy -= MOTION.gravity * dt
    s.y += s.vy * dt
    if (s.y <= 0) {
      s.y = 0
      s.squashVelocity += -s.vy * MOTION.squashKick
      s.vy = -s.vy * MOTION.bounce
      if (s.vy < MOTION.settleVelocity) {
        s.vy = 0
        s.mode = "rest"
        s.until = between(MOTION.restFor, random)
      }
    }
  }

  s.squashVelocity -=
    (MOTION.squashStiffness * s.squash +
      MOTION.squashDamping * s.squashVelocity) *
    dt
  s.squash += s.squashVelocity * dt

  if (s.blink < -MOTION.blinkLength)
    s.blink = between(MOTION.blinkEvery, random)

  const midStride = s.mode === "walk" && walkFrame(s.cycle) !== 0

  if (s.until <= 0 && s.mode !== "jump" && s.mode !== "held" && !midStride) {
    s.mode = pick(random)
    if (s.mode === "walk") {
      s.cycle = 0
      s.until = between(MOTION.walkFor, random)
      s.dir = random() < 0.5 ? -1 : 1
    } else if (s.mode === "jump") {
      s.vy = MOTION.jumpVelocity
    } else {
      s.until = between(MOTION.restFor, random)
    }
  }

  return s
}

export const hold = (s: SimppaState, x: number, y: number): SimppaState => ({
  ...s,
  mode: "held",
  x,
  y: Math.max(0, y),
  vy: 0,
})

export const drop = (s: SimppaState): SimppaState => ({
  ...s,
  mode: "jump",
  vy: 0,
})

export function poseOf(s: SimppaState) {
  const frame =
    s.mode === "walk"
      ? (WALK_FRAMES[walkFrame(s.cycle)] ?? REST_FRAME)
      : s.y > 0
        ? AIR_FRAME
        : REST_FRAME
  return { frame, blink: s.blink < 0 }
}

export const SPRITE = { width: 44, height: 26 } as const

export type Pixel =
  "o" | "c" | "l" | "r" | "b" | "d" | "m" | "e" | "w" | "p" | "n"
export type Grid = (Pixel | null)[][]

const HEAD = [
  ".....oooooo.....",
  "...oollccccoo...",
  "..olllccccccco..",
  ".ollcccccccccco.",
  "occeecccccceecco",
  "oceweecccceweeco",
  "oceeeecccceeeeco",
  "occeecmmmmceecco",
  "ocppcmmnnmmcppco",
  "occcmmmmmmmmccco",
  ".occcmmmmmmccco.",
  "..occcccccccco..",
  "...oooccccooo...",
  "......oooo......",
]

const BLINK_ROWS: Record<number, string> = {
  4: "occcccccccccccco",
  5: "occcccccccccccco",
  6: "ococcoccccoccoco",
  7: "occoocmmmmcoocco",
}

function parse(rows: string[]): Grid {
  return rows.map((row) =>
    [...row].map((ch) => (ch === "." ? null : (ch as Pixel)))
  )
}

export const HEAD_SIZE = { width: 16, height: HEAD.length } as const

export const HEADS = {
  open: parse(HEAD),
  blink: parse(HEAD.map((row, y) => BLINK_ROWS[y] ?? row)),
}

const GROUND = SPRITE.height - 2

const CHEST = 37

type Pose = { tail: number; arch: number; flap: number }

const REST: Pose = { tail: 6, arch: 0, flap: 0 }
const AIR: Pose = { tail: 11, arch: 3.5, flap: 1 }

const WALK: Pose[] = [
  REST,
  { tail: 7, arch: 0.8, flap: 1 },
  { tail: 9, arch: 1.8, flap: 1 },
  { tail: 11, arch: 2.8, flap: 1 },
  { tail: 13, arch: 3.5, flap: 1 },
  { tail: 14, arch: 3.8, flap: 1 },
  { tail: 13, arch: 3, flap: 0 },
  { tail: 11, arch: 2, flap: 0 },
  { tail: 9, arch: 1.2, flap: 0 },
  { tail: 7, arch: 0.5, flap: 0 },
  { tail: 6, arch: 0, flap: 0 },
  REST,
]

const STAMPS = {
  rearUp: parse(["d.d..", "dddd.", ".dddd", "..ddd"]),
  rearFlat: parse(["d.....", "ddddd.", ".ddddd"]),
  ring: parse([".rr.", "r..r", ".rr."]),
  frontPush: parse([".oo..", "oddo.", "oddo.", ".oddo", "..oo."]),
  frontRest: parse(["..ooo.", ".odddo", "oddoo.", ".oo..."]),
}

function stamp(target: Grid, art: Grid, x: number, y: number, onto?: Pixel) {
  art.forEach((row, dy) =>
    row.forEach((px, dx) => {
      const line = target[y + dy]
      if (
        px &&
        line &&
        line[x + dx] !== undefined &&
        (!onto || line[x + dx] === onto)
      ) {
        line[x + dx] = px
      }
    })
  )
}

function drawBody({ tail, arch, flap }: Pose): Grid {
  const grid: Grid = Array.from({ length: SPRITE.height }, () =>
    Array.from({ length: SPRITE.width }, () => null)
  )
  const set = (x: number, y: number, px: Pixel) => {
    if (grid[y]?.[x] !== undefined) grid[y][x] = px
  }
  const length = CHEST - tail
  const cap = 5
  for (let x = tail; x <= CHEST; x++) {
    const u = (x - tail) / length
    const lift = arch * Math.sin(Math.PI * u)
    const thickness =
      2.5 + 9.5 * Math.sin(Math.PI * Math.min(u, 0.97) * 0.82) ** 0.8
    const capDrop =
      x > CHEST - cap ? cap - Math.sqrt(cap ** 2 - (x - (CHEST - cap)) ** 2) : 0
    const top = Math.round(GROUND - thickness - lift + capDrop)
    const tuck = Math.max(0, x - (CHEST - 2))
    const bottom = Math.round(
      GROUND - lift * 0.6 * Math.sin(Math.PI * u) - tuck
    )
    for (let y = top; y <= bottom; y++) {
      set(x, y, bottom - y < 2 ? "b" : y === top && u > 0.3 ? "l" : "c")
    }
  }
  const rear = flap ? STAMPS.rearUp : STAMPS.rearFlat
  stamp(grid, rear, tail + 2 - (rear[0]?.length ?? 0), GROUND - rear.length)
  for (const at of [0.3, 0.5, 0.68]) {
    const x = Math.round(tail + at * length)
    const lift = arch * Math.sin(Math.PI * at)
    const y = Math.round(
      GROUND - 2 - 9.5 * Math.sin(Math.PI * at * 0.82) ** 0.8 * 0.7 - lift
    )
    stamp(grid, STAMPS.ring, x - 1, y, "c")
  }
  const outlined = grid.map((row, y) =>
    row.map((px, x) => {
      if (px) return px
      const near = [grid[y - 1]?.[x], grid[y + 1]?.[x], row[x - 1], row[x + 1]]
      return near.some(Boolean) ? "o" : null
    })
  )
  stamp(
    outlined,
    flap ? STAMPS.frontPush : STAMPS.frontRest,
    CHEST - 9,
    GROUND - 4
  )
  return outlined
}

export type Frame = { body: Grid; head: { x: number; y: number } }

const toFrame = (pose: Pose): Frame => ({
  body: drawBody(pose),
  head: { x: CHEST - 13, y: 4 + Math.round(pose.arch * 0.4) },
})

export const WALK_FRAMES = WALK.map(toFrame)
export const REST_FRAME = toFrame(REST)
export const AIR_FRAME = toFrame(AIR)

const rearOf = ({ body }: Frame) =>
  Math.min(...body.flatMap((row) => row.flatMap((px, x) => (px ? [x] : []))))

export const WALK_TRAVEL = WALK_FRAMES.reduce(
  (travel, frame, i) => {
    const next = WALK_FRAMES[(i + 1) % WALK_FRAMES.length] ?? frame
    return [
      ...travel,
      (travel.at(-1) ?? 0) + Math.max(0, rearOf(frame) - rearOf(next)),
    ]
  },
  [0]
)

import type { ReactNode } from "react"

export type PixelGrid<P extends string> = readonly (readonly (P | null)[])[]

export function parsePixels<P extends string>(
  rows: readonly string[],
  palette: Record<P, string>
): (P | null)[][] {
  const isPixel = (ch: string): ch is P => Object.hasOwn(palette, ch)
  return rows.map((row) => [...row].map((ch) => (isPixel(ch) ? ch : null)))
}

const pathCache = new WeakMap<PixelGrid<string>, [string, string][]>()

function toPaths<P extends string>(grid: PixelGrid<P>): [P, string][] {
  const cached = pathCache.get(grid)
  if (cached) return cached as [P, string][]
  const paths = new Map<P, string>()
  grid.forEach((row, y) => {
    for (let x = 0; x < row.length;) {
      const px = row[x]
      let run = 1
      while (px && row[x + run] === px) run++
      if (px)
        paths.set(px, `${paths.get(px) ?? ""}M${x} ${y}h${run}v1h-${run}z`)
      x += run
    }
  })
  const result = [...paths]
  pathCache.set(grid, result)
  return result
}

export function PixelLayer<P extends string>({
  grid,
  palette,
  x = 0,
  y = 0,
}: {
  grid: PixelGrid<P>
  palette: Record<P, string>
  x?: number
  y?: number
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {toPaths(grid).map(([px, d]) => (
        <path key={px} d={d} fill={palette[px]} />
      ))}
    </g>
  )
}

export function PixelCanvas({
  width,
  height,
  scale = 2,
  className,
  children,
}: {
  width: number
  height: number
  scale?: number
  className?: string
  children: ReactNode
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  )
}

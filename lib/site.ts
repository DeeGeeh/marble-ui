export const site = {
  name: "Marble UI",
  tagline: "Base UI components in a marble, glossy, chunky finish.",
  repo: "https://github.com/DeeGeeh/marble-ui",
  github: "DeeGeeh/marble-ui",
  registry:
    "https://raw.githubusercontent.com/DeeGeeh/marble-ui/master/public/r",
}

export const registryUrl = (item: string) => `${site.registry}/${item}.json`

export const packageManagers = ["npm", "pnpm", "bun", "yarn"] as const
export type PackageManager = (typeof packageManagers)[number]

const runners: Record<PackageManager, string> = {
  pnpm: "pnpm dlx",
  npm: "npx",
  bun: "bunx --bun",
  yarn: "yarn dlx",
}

export const shadcnCommand = (args: string, pm: PackageManager = "npm") =>
  `${runners[pm]} shadcn@latest ${args}`

export const addCommand = (
  items: readonly string[],
  pm: PackageManager = "npm"
) =>
  shadcnCommand(
    `add ${items.map((item) => `${site.github}/${item}`).join(" ")}`,
    pm
  )

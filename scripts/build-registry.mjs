// Writes registry.json from the kit's sources; `pnpm registry` then runs `shadcn build` into public/r.
// Each component's npm and kit dependencies are read from its imports, so this never needs hand edits.
import { readdirSync, readFileSync, writeFileSync } from "node:fs"

const BASE = "https://raw.githubusercontent.com/DeeGeeh/marble-ui/master/public/r"
const url = (name) => `${BASE}/${name}.json`
const pkg = JSON.parse(readFileSync("package.json", "utf8"))
const versions = { ...pkg.dependencies, ...pkg.devDependencies }

// "@base-ui/react/menu" -> "@base-ui/react@^1.9.0"; react and kit-internal paths are skipped
const npm = (spec) => {
  const name = spec.split("/").slice(0, spec.startsWith("@") ? 2 : 1).join("/")
  return versions[name] ? `${name}@${versions[name]}` : name
}

function depsOf(path) {
  const specs = [...readFileSync(path, "utf8").matchAll(/from "([^"]+)"|import "([^"]+)"/g)].map(
    (m) => m[1] ?? m[2]
  )
  const local = specs.filter((s) => s.startsWith("@/"))
  return {
    dependencies: [
      ...new Set(
        specs.filter((s) => !s.startsWith("@/") && !s.startsWith(".") && s !== "react").map(npm)
      ),
    ],
    registryDependencies: [
      url("marble-theme"),
      ...local
        .map((s) =>
          s.startsWith("@/components/ui/") ? s.slice("@/components/ui/".length)
          : s === "@/hooks/use-mobile" ? "use-mobile"
          : null
        )
        .filter(Boolean)
        .map(url),
    ],
  }
}

const components = readdirSync("components/ui")
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(".tsx", ""))

const items = [
  {
    name: "utils",
    type: "registry:lib",
    dependencies: [npm("cn")],
    files: [{ path: "lib/utils.ts", type: "registry:lib" }],
  },
  {
    name: "marble-theme",
    type: "registry:item",
    title: "Marble theme",
    description: "Tokens, materials, motion and base styles, plus the theme provider (d toggles dark mode).",
    dependencies: ["tw-animate-css", "shadcn", "next-themes", "react-hotkeys-hook"].map(npm),
    registryDependencies: [url("utils")],
    files: [
      { path: "app/marble.css", type: "registry:file", target: "app/marble.css" },
      { path: "components/theme-provider.tsx", type: "registry:component" },
    ],
    docs: 'Replace app/globals.css with: @import "tailwindcss"; @import "tw-animate-css"; @import "shadcn/tailwind.css"; @import "./marble.css"; (theme vars left by shadcn init would override Marble). Load Geist, Geist Mono and Bricolage Grotesque as --font-sans, --font-mono and --font-display, and wrap the app in <ThemeProvider>.',
  },
  {
    name: "use-mobile",
    type: "registry:hook",
    files: [{ path: "hooks/use-mobile.ts", type: "registry:hook" }],
  },
  ...components.map((name) => ({
    name,
    type: "registry:ui",
    ...depsOf(`components/ui/${name}.tsx`),
    files: [{ path: `components/ui/${name}.tsx`, type: "registry:ui" }],
  })),
  {
    name: "marble-kit",
    type: "registry:item",
    title: "Marble kit",
    description: "The whole kit: theme and every component.",
    registryDependencies: components.map(url),
  },
]

writeFileSync(
  "registry.json",
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "marble-ui",
      homepage: "https://github.com/DeeGeeh/marble-ui",
      items,
    },
    null,
    2
  ) + "\n"
)
console.log(`registry.json: ${items.length} items`)

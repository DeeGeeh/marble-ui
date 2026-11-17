import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import postcss from "postcss"

import { registryUrl as url, site } from "../lib/site.ts"
const pkg = JSON.parse(readFileSync("package.json", "utf8"))
const versions = { ...pkg.dependencies, ...pkg.devDependencies }

const npm = (spec) => {
  const name = spec
    .split("/")
    .slice(0, spec.startsWith("@") ? 2 : 1)
    .join("/")
  return versions[name] ? `${name}@${versions[name]}` : name
}

function depsOf(path) {
  const specs = [
    ...readFileSync(path, "utf8").matchAll(/from "([^"]+)"|import "([^"]+)"/g),
  ].map((m) => m[1] ?? m[2])
  const local = specs.filter((s) => s.startsWith("@/"))
  return {
    dependencies: [
      ...new Set(
        specs
          .filter(
            (s) => !s.startsWith("@/") && !s.startsWith(".") && s !== "react"
          )
          .map(npm)
      ),
    ],
    registryDependencies: [
      url("marble-theme"),
      ...local
        .map((s) =>
          s.startsWith("@/components/ui/")
            ? s.slice("@/components/ui/".length)
            : s === "@/hooks/use-mobile"
              ? "use-mobile"
              : null
        )
        .filter(Boolean)
        .map(url),
    ],
  }
}

function themeFromCss(file) {
  const toObject = (container) => {
    const out = {}
    container.each((node) => {
      if (node.type === "decl")
        out[node.prop] = node.important
          ? `${node.value} !important`
          : node.value
      else if (node.type === "rule")
        out[node.selector] = { ...out[node.selector], ...toObject(node) }
      else if (node.type === "atrule")
        out[`@${node.name} ${node.params}`.trim()] = toObject(node)
    })
    return out
  }
  const vars = (block) =>
    Object.fromEntries(
      Object.entries(block)
        .filter(([k]) => k.startsWith("--"))
        .map(([k, v]) => [k.slice(2), v])
    )
  const pick = (block, prefix) =>
    Object.fromEntries(
      Object.entries(block).filter(([k]) => k.startsWith(prefix))
    )
  const {
    ":root": light,
    ".dark": dark,
    "@theme": tokens,
    "@theme inline": inline,
    ...css
  } = toObject(postcss.parse(readFileSync(file, "utf8")))
  for (const key of Object.keys(css))
    if (key.startsWith("@custom-variant")) delete css[key]
  const theme = { ...vars(tokens), ...vars(inline) }
  const rest = { ...pick(tokens, "@keyframes"), ...css }
  const referenced = new Set(
    [
      ...JSON.stringify([theme, light, dark, rest]).matchAll(
        /var\(--([\w-]+)/g
      ),
    ].map(([, name]) => name)
  )
  const runtime = Object.fromEntries(
    Object.entries(theme).filter(
      ([name, value]) => referenced.has(name) && value !== `var(--${name})`
    )
  )
  return {
    cssVars: { theme, light: { ...runtime, ...vars(light) }, dark: vars(dark) },
    css: rest,
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
    type: "registry:theme",
    title: "Marble theme",
    description:
      "Tokens, materials, motion and base styles, plus the theme provider (d toggles dark mode).",
    dependencies: [
      "tw-animate-css",
      "shadcn",
      "next-themes",
      "react-hotkeys-hook",
    ].map(npm),
    registryDependencies: [url("utils")],
    ...themeFromCss("app/marble.css"),
    files: [
      { path: "components/theme-provider.tsx", type: "registry:component" },
    ],
    docs: "Load Geist, Geist Mono and Bricolage Grotesque as --font-sans, --font-mono and --font-display, and wrap the app in <ThemeProvider>.",
  },
  {
    name: "use-mobile",
    type: "registry:hook",
    dependencies: [npm("usehooks-ts")],
    files: [{ path: "hooks/use-mobile.ts", type: "registry:hook" }],
  },
  ...components.map((name) => ({
    name,
    type: "registry:ui",
    ...depsOf(`components/ui/${name}.tsx`),
    files: [
      {
        path: `components/ui/${name}.tsx`,
        type: "registry:ui",
        // shadcn derives the destination from the path relative to the ui alias's last
        // folder; in monorepos (ui alias ".../components") that nests files in ui/.
        target: `@ui/${name}.tsx`,
      },
    ],
  })),
  {
    name: "marble-kit",
    // shadcn only replaces existing CSS variables when the requested item is a style or
    // theme; as a plain item the kit would keep the stock shadcn colours.
    type: "registry:style",
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
      homepage: site.repo,
      items,
    },
    null,
    2
  ) + "\n"
)
console.log(`registry.json: ${items.length} items`)

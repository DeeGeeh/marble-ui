import { readFile } from "node:fs/promises"
import path from "node:path"
import type { TypeNode } from "fumadocs-ui/components/type-table"
import {
  createFileSystemGeneratorCache,
  createGenerator,
} from "fumadocs-typescript"

import type { ComponentPage } from "@/lib/components"

const generator = createGenerator({
  tsconfigPath: "./tsconfig.json",
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
})

const uiFile = (item: string) => `components/ui/${item}.tsx`
const ownComponents = path.join(process.cwd(), "components", "ui")

const readUi = (item: string) =>
  readFile(path.join(ownComponents, `${item}.tsx`), "utf8").catch(() => "")

const exportedComponents = (code: string) =>
  (/^export \{([^}]+)\}/m.exec(code)?.[1] ?? "")
    .split(",")
    .map((name) => name.trim())
    .filter((name) => /^[A-Z]/.test(name))

const baseUiUtils = new Set(["use-render", "merge-props", "direction-provider"])

const baseUiParts = (code: string) =>
  [...code.matchAll(/from "@base-ui\/react\/([a-z-]+)"/g)]
    .map(([, part]) => part)
    .filter((part) => !baseUiUtils.has(part))
    .map((part) => ({
      name: part.replace(
        /(^|-)(\w)/g,
        (_, dash, c: string) => (dash ? " " : "") + c.toUpperCase()
      ),
      href: `https://base-ui.com/react/components/${part}#api-reference`,
    }))

async function propsOf(file: string, name: string) {
  const docs = await generator
    .generateTypeTable(
      {
        path: file,
        type: `import("react").ComponentProps<typeof ${name}>`,
      },
      {
        basePath: process.cwd(),
        transform(entry, _type, symbol) {
          const source = symbol.declarations[0]
            ?.resolve(this.program)
            ?.getSourceFile().fileName
          if (!source?.startsWith(ownComponents))
            entry.tags.push({ name: "inherited", text: "" })
        },
      }
    )
    .catch(() => [])
  return Object.fromEntries(
    (docs[0]?.entries ?? [])
      .filter((entry) => !entry.tags.some((tag) => tag.name === "inherited"))
      .map((entry): [string, TypeNode] => [
        entry.name,
        {
          type: entry.type.replace(/( \| (undefined|null))+$/, ""),
          description: entry.description,
          default: entry.tags.find((tag) => tag.name === "default")?.text,
          required: entry.required,
          deprecated: entry.deprecated,
        },
      ])
  )
}

export async function componentApi(page: ComponentPage) {
  const file = uiFile(page.slug)
  const code = await readUi(page.slug)
  const tables = await Promise.all(
    exportedComponents(code).map(async (name) => ({
      name,
      props: await propsOf(file, name),
    }))
  )
  return {
    tables: tables.filter((table) => Object.keys(table.props).length > 0),
    baseUi: baseUiParts(code),
  }
}

export async function componentUsage(page: ComponentPage) {
  const lines = await Promise.all(
    page.install.map(async (item) => {
      const names = exportedComponents(await readUi(item))
      const from = `from "@/components/ui/${item}"`
      if (names.length === 0) return ""
      return names.length > 3
        ? `import {\n  ${names.join(",\n  ")},\n} ${from}`
        : `import { ${names.join(", ")} } ${from}`
    })
  )
  return lines.filter(Boolean).join("\n")
}

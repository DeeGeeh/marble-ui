import registry from "@/registry.json"
import { registryUrl } from "@/lib/site"

type RegistryItem = {
  name: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: { path: string }[]
}

const items = new Map<string, RegistryItem>(
  registry.items.map((item) => [registryUrl(item.name), item])
)

export function registryItems(names: readonly string[]) {
  const seen = new Set<string>()
  const resolved: RegistryItem[] = []

  function visit(url: string) {
    // The installation instructions require the theme to be installed first.
    if (url === registryUrl("marble-theme") || seen.has(url)) return
    const item = items.get(url)
    if (!item) throw new Error(`Unknown registry item: ${url}`)
    seen.add(url)
    item.registryDependencies?.forEach(visit)
    resolved.push(item)
  }

  names.forEach((name) => visit(registryUrl(name)))
  return resolved
}

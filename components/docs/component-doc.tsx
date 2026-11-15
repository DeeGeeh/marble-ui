import Link from "next/link"
import { TypeTable } from "fumadocs-ui/components/type-table"

import type { componentApi } from "@/lib/component-api"
import { componentPages, type ComponentPage } from "@/lib/components"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { ComponentInstall } from "./component-install"
import { ComponentPreview } from "./component-preview"

export function ComponentDoc({
  page,
  usage,
  api,
}: {
  page: ComponentPage
  usage: string
  api: Awaited<ReturnType<typeof componentApi>>
}) {
  const related = componentPages
    .filter((other) => other.group === page.group && other.slug !== page.slug)
    .slice(0, 3)

  return (
    <>
      {page.examples.map((name) => (
        <ComponentPreview
          key={name}
          name={name}
          install={page.install}
          usage={usage}
        />
      ))}
      <h2 id="installation">Installation</h2>
      <ComponentInstall items={page.install} />
      {(api.tables.length > 0 || api.baseUi.length > 0) && (
        <h2 id="api-reference">API Reference</h2>
      )}
      {api.tables.map((table) => (
        <section key={table.name}>
          <h3 id={table.name}>{table.name}</h3>
          <TypeTable type={table.props} />
        </section>
      ))}
      {api.baseUi.length > 0 && (
        <p>
          Also accepts the props of{" "}
          {api.baseUi.map((part, index) => (
            <span key={part.href}>
              {index > 0 && ", "}
              <a href={part.href} target="_blank" rel="noreferrer">
                Base UI {part.name}
              </a>
            </span>
          ))}
          .
        </p>
      )}
      <h2 id="related">Related Components</h2>
      <div className="grid gap-3 not-prose sm:grid-cols-3">
        {related.map((other) => (
          <Item
            key={other.slug}
            variant="outline"
            render={<Link href={`/components/${other.slug}`} />}
          >
            <ItemContent>
              <ItemTitle>{other.title}</ItemTitle>
              <ItemDescription>{other.description}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </div>
    </>
  )
}

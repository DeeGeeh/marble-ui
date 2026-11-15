import Link from "next/link"

import { componentPage, componentPages } from "@/lib/components"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { ComponentInstall } from "./component-install"
import { ComponentPreview } from "./component-preview"

export function ComponentDoc({ slug }: { slug: string }) {
  const page = componentPage(slug)
  if (!page) throw new Error(`No component page "${slug}"`)
  const related = componentPages
    .filter((other) => other.group === page.group && other.slug !== page.slug)
    .slice(0, 3)

  return (
    <>
      {page.examples.map((name) => (
        <ComponentPreview key={name} name={name} install={page.install} />
      ))}
      <h2 id="installation">Installation</h2>
      <ComponentInstall items={page.install} />
      <h2 id="related">Related</h2>
      <div className="grid gap-3 not-prose sm:grid-cols-3">
        {related.map((other) => (
          <Item
            key={other.slug}
            variant="outline"
            render={<Link href={`/docs/components/${other.slug}`} />}
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

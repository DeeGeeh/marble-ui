import type { Metadata } from "next"
import Link from "next/link"

import { componentPages, groups } from "@/lib/components"
import { examples } from "@/examples"
import { Fit } from "@/components/docs/fit"
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export const metadata: Metadata = {
  title: "Components",
  description: "Every Marble UI component, live.",
}

const categories = [
  { slug: undefined, label: "All" },
  ...groups.map((group) => ({
    slug: group.toLowerCase().replaceAll(" ", "-"),
    label: group,
  })),
]

export default async function Components(props: PageProps<"/components">) {
  const { category } = await props.searchParams
  const active = categories.find((item) => item.slug === category)
  const pages = componentPages.filter(
    (page) => !active?.slug || page.group === active.label
  )
  const cards = await Promise.all(
    pages.map(async (page) => {
      const { default: Example } = await examples[page.examples[0]]()
      return { page, Example }
    })
  )

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 pt-16 pb-20">
        <header className="flex flex-col gap-3">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Components
          </h1>
          <p className="max-w-xl text-lg text-pretty text-muted-foreground">
            {componentPages.length} components, live. Install only what you need
            through the shadcn registry.
          </p>
        </header>
        <div className="-mx-6 no-scrollbar snap-x scroll-px-6 overflow-x-auto overflow-y-hidden overscroll-x-contain px-6 py-1">
          <SegmentedControl>
            {categories.map((item) => (
              <SegmentedControlItem
                key={item.label}
                className="snap-start select-none"
                aria-current={
                  item === (active ?? categories[0]) ? "page" : undefined
                }
                render={
                  <Link
                    href={
                      item.slug
                        ? `/components?category=${item.slug}`
                        : "/components"
                    }
                    scroll={false}
                  />
                }
              >
                {item.label}
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ page, Example }) => (
            <div
              key={page.slug}
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-muted/50 marble shadow-well transition-transform duration-150 ease-out active:scale-99"
            >
              <div inert className="h-56 overflow-hidden p-6">
                <Fit>
                  <Example />
                </Fit>
              </div>
              <div className="flex flex-col gap-1 border-t bg-card px-5 py-4">
                <Link
                  href={`/components/${page.slug}`}
                  className="font-medium group-hover:underline after:absolute after:inset-0"
                >
                  {page.title}
                </Link>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {page.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

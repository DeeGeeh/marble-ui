import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

import { componentPage } from "@/lib/components"
import { examples } from "@/examples"
import { Button } from "@/components/ui/button"
import { InstallCommand } from "@/components/docs/install-command"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { Simppa } from "@/components/simppa/simppa"

const showcase = [
  "button",
  "segmented-control",
  "number-field",
  "toggle-group",
  "area-chart",
  "switch",
]

export default async function Home() {
  const tiles = await Promise.all(
    showcase.map(async (name) => {
      const { default: Example } = await examples[name]()
      const page = componentPage(name) ?? componentPage("chart")
      return { name, Example, page }
    })
  )

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 pt-24 pb-16 text-center">
          <h1 className="font-heading text-5xl font-bold tracking-tight text-balance md:text-7xl">
            Marble UI
          </h1>
          <p className="max-w-xl text-lg text-pretty text-muted-foreground">
            Base UI components in a marble, glossy, chunky finish.
          </p>
          <div className="flex w-full max-w-2xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <InstallCommand items={["marble-kit"]} className="flex-1" />
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/components" />}
            >
              Browse components <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-6 pb-20 md:grid-cols-2 xl:grid-cols-3">
          {tiles.map(({ name, Example, page }) => (
            <div
              key={name}
              className="flex min-h-64 min-w-0 flex-col rounded-2xl border bg-muted/50 marble shadow-well"
            >
              <Link
                href={`/components/${page?.slug}`}
                className="group flex items-center justify-between px-5 pt-4 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {page?.title}
                <ArrowRightIcon className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-5">
                <Example />
              </div>
            </div>
          ))}
        </section>

        <div className="relative mt-auto h-20 overflow-hidden">
          <Simppa />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

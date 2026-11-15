"use client"

import {
  createElement,
  Suspense,
  use,
  useDeferredValue,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import {
  DocumentTextIcon,
  HashtagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import { useFetchSearch } from "fumadocs-core/search/client"
import { useMediaQuery } from "usehooks-ts"
import type { SharedProps } from "fumadocs-ui/contexts/search"

import { componentPage, componentPages, groups } from "@/lib/components"
import { examples } from "@/examples"
import { cn } from "@/lib/utils"
import { Fit } from "@/components/docs/fit"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

type Hit = { id: string; url: string; label: string; heading?: boolean }

const loaded = new Map<string, ReturnType<(typeof examples)[string]>>()

const load = (slug: string) => {
  if (!loaded.has(slug)) loaded.set(slug, examples[slug]())
  return loaded.get(slug)!
}

function Example({ slug }: { slug: string }) {
  return createElement(use(load(slug)).default)
}

const slugOf = (url: string) => url.match(/^\/components\/([^/#]+)/)?.[1]

export function SearchDialog({ open, onOpenChange }: SharedProps) {
  const router = useRouter()
  const { search, onSearchChange, isLoading, data } = useFetchSearch({
    delayMs: 200,
  })
  const [active, setActive] = useState("")
  const wide = useMediaQuery("(min-width: 40rem)")

  useEffect(() => {
    if (!open || !wide) return
    const id = setTimeout(() => Object.keys(examples).forEach(load))
    return () => clearTimeout(id)
  }, [open, wide])

  const sections: [string, Hit[]][] =
    search && data
      ? [
          [
            "Results",
            data.items
              .flatMap((item) => (item.type === "table" ? item.rows : [item]))
              .map((r) => ({
                id: r.id,
                url: r.url,
                label: r.content.replaceAll("`", ""),
                heading: r.type !== "page",
              })),
          ],
        ]
      : groups.map((group) => [
          group,
          componentPages
            .filter((page) => page.group === group)
            .map((page) => ({
              id: page.slug,
              url: `/components/${page.slug}`,
              label: page.title,
            })),
        ])

  const empty = !isLoading && sections.every(([, hits]) => hits.length === 0)
  const all = sections.flatMap(([, hits]) => hits)
  const current = all.find((h) => h.id === active) ?? all[0]
  const hit = useDeferredValue(current)
  const page = hit && componentPage(slugOf(hit.url) ?? "")

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search"
      description="Search the docs and components"
      className="sm:max-w-3xl"
    >
      <Command
        shouldFilter={false}
        disablePointerSelection
        value={current?.id ?? ""}
        onValueChange={setActive}
      >
        <CommandInput
          value={search}
          onValueChange={onSearchChange}
          placeholder="Search components and docs…"
        />
        <div className="flex h-96">
          <CommandList
            className={cn("max-h-none w-full shrink-0", !empty && "sm:w-64")}
          >
            <CommandEmpty className="flex h-full items-center justify-center">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <MagnifyingGlassIcon />
                  </EmptyMedia>
                  <EmptyTitle>No results</EmptyTitle>
                  <EmptyDescription>
                    Nothing matches &ldquo;{search}&rdquo;.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </CommandEmpty>
            {sections.map(
              ([group, hits]) =>
                hits.length > 0 && (
                  <CommandGroup key={group} heading={group}>
                    {hits.map((h) => {
                      const Icon = h.heading ? HashtagIcon : DocumentTextIcon
                      return (
                        <CommandItem
                          key={h.id}
                          value={h.id}
                          className="hover:bg-muted"
                          onSelect={() => {
                            router.push(h.url)
                            onOpenChange(false)
                          }}
                        >
                          {!slugOf(h.url) && (
                            <Icon className="text-muted-foreground" />
                          )}
                          <span className="truncate">{h.label}</span>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                )
            )}
          </CommandList>
          {!empty && wide && (
            <div className="m-1.5 flex flex-1 flex-col overflow-hidden rounded-lg border bg-muted/50 marble shadow-well">
              {page ? (
                <>
                  <div inert className="min-h-0 flex-1 p-6">
                    <Fit key={page.slug}>
                      <Suspense>
                        <Example slug={page.examples[0]} />
                      </Suspense>
                    </Fit>
                  </div>
                  <div className="border-t bg-card px-4 py-3">
                    <p className="font-medium">{page.title}</p>
                    <p className="line-clamp-1 text-sm text-muted-foreground">
                      {page.description}
                    </p>
                  </div>
                </>
              ) : (
                hit && (
                  <p className="m-auto max-w-xs p-6 text-center text-sm text-muted-foreground">
                    {hit.label}
                  </p>
                )
              )}
            </div>
          )}
        </div>
      </Command>
    </CommandDialog>
  )
}

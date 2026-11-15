"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { useSearchContext } from "fumadocs-ui/contexts/search"
import { useTheme } from "next-themes"

import { site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Logo } from "@/components/site/logo"

const nav = [
  { label: "Home", href: "/", match: (path: string) => path === "/" },
  {
    label: "Docs",
    href: "/docs",
    match: (path: string) => path.startsWith("/docs"),
  },
  {
    label: "Components",
    href: "/components",
    match: (path: string) => path.startsWith("/components"),
  },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { setOpenSearch } = useSearchContext()
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-sticky flex h-(--site-header-height) items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <Link
        href="/"
        className="flex items-center gap-2 font-heading text-base font-bold"
      >
        <Logo />
        {site.name}
      </Link>
      <nav
        aria-label="Main"
        className="mx-auto hidden items-center gap-1 rounded-full bg-muted/60 p-1 shadow-well md:flex"
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-active={item.match(pathname) || undefined}
            className={cn(
              "rounded-full px-3.5 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              "data-active:bg-card data-active:text-foreground data-active:shadow-stone"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-1 md:ml-0">
        <Button
          variant="ghost"
          size="sm"
          aria-label="Search"
          className="gap-2 rounded-full bg-muted/60 pr-1.5 text-muted-foreground shadow-well hover:bg-muted"
          onClick={() => setOpenSearch(true)}
        >
          <MagnifyingGlassIcon />
          <span className="hidden sm:inline">Search</span>
          <KbdGroup className="hidden sm:flex">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="GitHub"
          nativeButton={false}
          render={<a href={site.repo} target="_blank" rel="noreferrer" />}
        >
          <SiGithub />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Toggle theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <SunIcon className="dark:hidden" />
          <MoonIcon className="hidden dark:block" />
        </Button>
      </div>
    </header>
  )
}

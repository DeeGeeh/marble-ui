import Link from "next/link"

import { site } from "@/lib/site"
import { Logo } from "@/components/site/logo"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="size-7" />
          <div className="flex flex-col">
            <span className="font-heading font-bold">{site.name}</span>
            <span className="text-sm text-muted-foreground">
              {site.tagline}
            </span>
          </div>
        </div>
        <nav
          aria-label="Footer"
          className="flex gap-5 text-sm text-muted-foreground"
        >
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <Link href="/components" className="hover:text-foreground">
            Components
          </Link>
          <a href={site.repo} className="hover:text-foreground">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}

import { DocsLayout } from "fumadocs-ui/layouts/docs"

import { site } from "@/lib/site"
import { source } from "@/lib/source"
import { SiteHeader } from "@/components/site/site-header"

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <DocsLayout
        tree={source.getPageTree()}
        nav={{
          enabled: false,
          title: <span className="sr-only">{site.name}</span>,
        }}
        searchToggle={{ enabled: false }}
        themeSwitch={{ enabled: false }}
      >
        {children}
      </DocsLayout>
    </>
  )
}

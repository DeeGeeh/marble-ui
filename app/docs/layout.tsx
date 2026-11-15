import { DocsLayout } from "fumadocs-ui/layouts/docs"

import { source } from "@/lib/source"
import { SiteHeader } from "@/components/site/site-header"

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <>
      <SiteHeader />
      <DocsLayout
        tree={source.getPageTree()}
        nav={{ enabled: false }}
        searchToggle={{ enabled: false }}
        themeSwitch={{ enabled: false }}
      >
        {children}
      </DocsLayout>
    </>
  )
}

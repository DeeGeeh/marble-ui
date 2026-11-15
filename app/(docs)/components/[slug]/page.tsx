import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page"

import { componentApi, componentUsage } from "@/lib/component-api"
import { componentPage, componentPages } from "@/lib/components"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ComponentDoc } from "@/components/docs/component-doc"

export default async function Page(props: PageProps<"/components/[slug]">) {
  const page = componentPage((await props.params).slug)
  if (!page) notFound()
  const [api, usage] = await Promise.all([
    componentApi(page),
    componentUsage(page),
  ])
  const toc = [
    { title: "Installation", url: "#installation", depth: 2 },
    ...(api.tables.length > 0 || api.baseUi.length > 0
      ? [
          { title: "API Reference", url: "#api-reference", depth: 2 },
          ...api.tables.map((table) => ({
            title: table.name,
            url: `#${table.name}`,
            depth: 3,
          })),
        ]
      : []),
    { title: "Related Components", url: "#related", depth: 2 },
  ]

  return (
    <DocsPage toc={toc} breadcrumb={{ enabled: false }}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/components" />}>
              Components
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{page.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription>{page.description}</DocsDescription>
      <DocsBody>
        <ComponentDoc page={page} usage={usage} api={api} />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return componentPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata(
  props: PageProps<"/components/[slug]">
): Promise<Metadata> {
  const page = componentPage((await props.params).slug)
  if (!page) notFound()
  return { title: page.title, description: page.description }
}

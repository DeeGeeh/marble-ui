import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page"
import { createRelativeLink } from "fumadocs-ui/mdx"

import { getMDXComponents } from "@/components/mdx"
import { source } from "@/lib/source"

const getDoc = (slug: string[] = []) => {
  const page = source.getPage(["docs", ...slug])
  return page && "body" in page.data ? { ...page, data: page.data } : undefined
}

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const page = getDoc((await props.params).slug)
  if (!page) notFound()
  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({ a: createRelativeLink(source, page) })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source
    .getPages()
    .filter((page) => page.slugs[0] === "docs")
    .map((page) => ({ slug: page.slugs.slice(1) }))
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">
): Promise<Metadata> {
  const page = getDoc((await props.params).slug)
  if (!page) notFound()
  return { title: page.data.title, description: page.data.description }
}

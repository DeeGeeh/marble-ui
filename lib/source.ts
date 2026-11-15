import { loader } from "fumadocs-core/source"
import { defineDocs } from "fumadocs-mdx/macro"

import { componentPages } from "@/lib/components"

const docs = defineDocs({ dir: "content" })

const components = {
  files: [
    {
      type: "meta" as const,
      path: "components/meta.json",
      data: {
        title: "Components",
        pages: componentPages
          .toSorted((a, b) => a.title.localeCompare(b.title))
          .map((page) => page.slug),
      },
    },
    ...componentPages.map((page) => ({
      type: "page" as const,
      path: `components/${page.slug}.json`,
      data: {
        title: page.title,
        description: page.description,
        structuredData: {
          headings: [],
          contents: [{ heading: undefined, content: page.description }],
        },
      },
    })),
  ],
}

export const source = loader({
  baseUrl: "/",
  source: { docs: docs.toFumadocsSource(), components },
})

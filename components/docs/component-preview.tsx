import { readFile } from "node:fs/promises"
import path from "node:path"
import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc"

import { examples } from "@/examples"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyInstall } from "./copy-install"

export async function ComponentPreview({
  name,
  install,
  usage,
}: {
  name: string
  install: readonly string[]
  usage: string
}) {
  const load = examples[name]
  if (!load) throw new Error(`No example named "${name}"`)
  const [{ default: Example }, code] = await Promise.all([
    load(),
    readFile(path.join(process.cwd(), "examples", `${name}.tsx`), "utf8"),
  ])

  return (
    <Tabs defaultValue="preview" className="my-6 not-prose">
      <div className="flex items-center justify-between gap-2">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          {usage && <TabsTrigger value="usage">Usage</TabsTrigger>}
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <CopyInstall items={install} />
      </div>
      <TabsContent value="preview">
        <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border bg-muted/50 marble px-6 py-10 shadow-well">
          <Example />
        </div>
      </TabsContent>
      {usage && (
        <TabsContent value="usage">
          <ServerCodeBlock code={usage} lang="tsx" />
        </TabsContent>
      )}
      <TabsContent value="code">
        <ServerCodeBlock code={code} lang="tsx" />
      </TabsContent>
    </Tabs>
  )
}

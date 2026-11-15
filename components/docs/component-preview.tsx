import { readFile } from "node:fs/promises"
import path from "node:path"
import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc"

import { examples } from "@/examples"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyInstall } from "./copy-install"

export async function ComponentPreview({
  name,
  install,
}: {
  name: string
  install: readonly string[]
}) {
  const load = examples[name]
  if (!load) throw new Error(`No example named "${name}"`)
  const [{ default: Example }, code] = await Promise.all([
    load(),
    readFile(path.join(process.cwd(), "examples", `${name}.tsx`), "utf8"),
  ])

  return (
    <Tabs defaultValue="preview" className="my-6 not-prose">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div className="relative flex min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border bg-muted/50 marble px-6 pt-16 pb-10 shadow-well">
          <CopyInstall items={install} className="absolute top-3 right-3" />
          <Example />
        </div>
      </TabsContent>
      <TabsContent value="code">
        <ServerCodeBlock code={code} lang="tsx" />
      </TabsContent>
    </Tabs>
  )
}

import { readFile } from "node:fs/promises"
import path from "node:path"
import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc"
import { registryItems } from "@/lib/registry"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InstallCommand } from "./install-command"

export async function ComponentInstall({
  items,
}: {
  items: readonly string[]
}) {
  const resolved = registryItems(items)
  const deps = [...new Set(resolved.flatMap((item) => item.dependencies ?? []))]
  const files = await Promise.all(
    resolved
      .flatMap((item) => item.files ?? [])
      .map(async (file) => ({
        path: file.path,
        code: await readFile(path.join(process.cwd(), file.path), "utf8"),
      }))
  )

  return (
    <Tabs defaultValue="cli" className="my-6 not-prose">
      <TabsList variant="line">
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="cli">
        <InstallCommand items={items} />
      </TabsContent>
      <TabsContent value="manual" className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Set up the Marble theme first, then install the dependencies and copy
          the source.
        </p>
        {deps.length > 0 && (
          <ServerCodeBlock code={`npm install ${deps.join(" ")}`} lang="bash" />
        )}
        {files.map((file) => (
          <ServerCodeBlock
            key={file.path}
            code={file.code}
            lang="tsx"
            codeblock={{ title: file.path }}
          />
        ))}
      </TabsContent>
    </Tabs>
  )
}

import { CommandLineIcon } from "@heroicons/react/24/outline"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block"

export default function CodeBlockExample() {
  return (
    <CodeBlock className="w-full max-w-md">
      <CodeBlockHeader>
        <CodeBlockTitle>
          <CommandLineIcon /> Terminal
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value="pnpm dlx shadcn@latest add button" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>pnpm dlx shadcn@latest add button</CodeBlockContent>
    </CodeBlock>
  )
}

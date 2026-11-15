import {
  CommandLineIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export default function TraceExample() {
  return (
    <Trace className="w-full max-w-md">
      <TraceLine>
        <TraceIcon>
          <DocumentTextIcon />
        </TraceIcon>
        <TraceTitle>Read app/page.tsx</TraceTitle>
      </TraceLine>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <CommandLineIcon />
            </TraceIcon>
            <TraceTitle>Ran node --version</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent>v24.18.0</CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceLine status="pending">
        <TraceIcon>
          <MagnifyingGlassIcon />
        </TraceIcon>
        <TraceTitle>Search queued</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <XMarkIcon />
        </TraceIcon>
        <TraceTitle>Build failed</TraceTitle>
      </TraceLine>
    </Trace>
  )
}

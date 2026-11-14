"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { lastAssistantMessageIsCompleteWithApprovalResponses } from "ai"
import {
  ArrowPathIcon,
  DocumentIcon,
  DocumentTextIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  RocketLaunchIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

import type { ChatMessage } from "@/lib/ai/agent"
import { Alert, AlertAction, AlertDescription } from "@/components/ui/alert"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import {
  PromptInput,
  PromptInputAttach,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { Spinner } from "@/components/ui/spinner"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

type Part = ChatMessage["parts"][number]
type ApprovalResponse = ReturnType<
  typeof useChat<ChatMessage>
>["addToolApprovalResponse"]

export function AgentChat() {
  const [input, setInput] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
    regenerate,
    addToolApprovalResponse,
  } = useChat<ChatMessage>({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
  })
  const busy = status === "submitted" || status === "streaming"

  return (
    <Card className="h-112 w-full max-w-xl">
      <CardContent className="min-h-0 flex-1">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent>
                {messages.length === 0 && (
                  <p className="m-auto text-sm text-muted-foreground">
                    Try “ship the marble theme”.
                  </p>
                )}
                {messages.map((message) => (
                  <MessageScrollerItem
                    key={message.id}
                    messageId={message.id}
                    scrollAnchor={message.role === "user"}
                  >
                    <Message align={message.role === "user" ? "end" : "start"}>
                      <MessageContent>
                        {message.parts.map((part, i) => (
                          <MessagePart
                            key={i}
                            part={part}
                            fromUser={message.role === "user"}
                            respond={addToolApprovalResponse}
                          />
                        ))}
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
                {status === "submitted" && messages.at(-1)?.role === "user" && (
                  <Trace>
                    <TraceLine status="running">
                      <TraceIcon>
                        <Spinner />
                      </TraceIcon>
                      <TraceTitle>Thinking</TraceTitle>
                    </TraceLine>
                  </Trace>
                )}
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>Something went wrong.</AlertDescription>
                    <AlertAction>
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => regenerate()}
                      >
                        <ArrowPathIcon /> Retry
                      </Button>
                    </AlertAction>
                  </Alert>
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </CardContent>
      <CardFooter>
        <PromptInput
          onSubmit={(e) => {
            e.preventDefault()
            if ((!input.trim() && !files.length) || busy) return
            sendMessage({ text: input, files: toFileList(files) })
            setInput("")
            setFiles([])
          }}
        >
          <PromptInputHeader>
            {files.map((file, i) => (
              <FileChip
                key={file.name + i}
                name={file.name}
                mediaType={file.type}
                onRemove={() =>
                  setFiles((all) => all.filter((_, j) => j !== i))
                }
              />
            ))}
          </PromptInputHeader>
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the agent…"
          />
          <PromptInputFooter>
            <PromptInputAttach
              onFiles={(picked) => setFiles((all) => [...all, ...picked])}
            />
            <PromptInputSubmit busy={busy} onStop={stop} />
          </PromptInputFooter>
        </PromptInput>
      </CardFooter>
    </Card>
  )
}

function MessagePart({
  part,
  fromUser,
  respond,
}: {
  part: Part
  fromUser: boolean
  respond: ApprovalResponse
}) {
  switch (part.type) {
    case "file":
      return (
        <FileChip name={part.filename ?? "file"} mediaType={part.mediaType} />
      )
    case "text":
      return (
        <Bubble variant={fromUser ? "default" : "ghost"}>
          <BubbleContent>{part.text}</BubbleContent>
        </Bubble>
      )
    case "reasoning":
      return (
        <Trace>
          <TraceCollapsible>
            <TraceCollapsibleTrigger>
              <TraceLine
                status={part.state === "streaming" ? "running" : undefined}
              >
                <TraceIcon>
                  <LightBulbIcon />
                </TraceIcon>
                <TraceTitle>
                  {part.state === "streaming" ? "Thinking" : "Thought"}
                </TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>{part.text}</TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      )
    case "tool-searchDocs":
      return part.state === "output-available" ? (
        <Trace>
          <TraceCollapsible>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <MagnifyingGlassIcon />
                </TraceIcon>
                <TraceTitle>Searched docs for “{part.input.query}”</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <ul className="flex flex-col gap-1">
                {part.output.map((doc) => (
                  <li key={doc.path} className="flex items-center gap-2">
                    <DocumentTextIcon className="size-4" /> {doc.title}
                  </li>
                ))}
              </ul>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      ) : (
        <ToolLine
          icon={<MagnifyingGlassIcon />}
          status={part.state === "output-error" ? "error" : "running"}
          title={
            part.state === "output-error"
              ? "Docs search failed"
              : "Searching docs"
          }
        />
      )
    case "tool-deployPreview":
      switch (part.state) {
        case "approval-requested":
          return (
            <div className="flex flex-col gap-2">
              <ToolLine
                icon={<RocketLaunchIcon />}
                status="pending"
                title={`Deploy ${part.input.branch} to a preview?`}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    respond({ id: part.approval.id, approved: true })
                  }
                >
                  Deploy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    respond({ id: part.approval.id, approved: false })
                  }
                >
                  Not now
                </Button>
              </div>
            </div>
          )
        case "output-available":
          return (
            <ToolLine
              icon={<RocketLaunchIcon />}
              title={
                <>
                  Deployed to{" "}
                  <a href={part.output.url}>
                    {part.output.url.replace("https://", "")}
                  </a>
                </>
              }
            />
          )
        case "output-denied":
          return <ToolLine icon={<XMarkIcon />} title="Deploy skipped" />
        case "output-error":
          return (
            <ToolLine
              icon={<XMarkIcon />}
              status="error"
              title="Deploy failed"
            />
          )
        default:
          return (
            <ToolLine
              icon={<RocketLaunchIcon />}
              status="running"
              title="Deploying preview"
            />
          )
      }
    default:
      return null
  }
}

function ToolLine({
  icon,
  title,
  status,
}: {
  icon: React.ReactNode
  title: React.ReactNode
  status?: React.ComponentProps<typeof TraceLine>["status"]
}) {
  return (
    <Trace>
      <TraceLine status={status}>
        <TraceIcon>{icon}</TraceIcon>
        <TraceTitle>{title}</TraceTitle>
      </TraceLine>
    </Trace>
  )
}

function FileChip({
  name,
  mediaType,
  onRemove,
}: {
  name: string
  mediaType: string
  onRemove?: () => void
}) {
  return (
    <Attachment size="xs" className="group-data-[align=end]/message:self-end">
      <AttachmentMedia>
        {mediaType.startsWith("image/") ? <PhotoIcon /> : <DocumentIcon />}
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{name}</AttachmentTitle>
      </AttachmentContent>
      {onRemove && (
        <AttachmentActions>
          <AttachmentAction aria-label={`Remove ${name}`} onClick={onRemove}>
            <XMarkIcon />
          </AttachmentAction>
        </AttachmentActions>
      )}
    </Attachment>
  )
}

/** sendMessage takes a FileList; build one from the picked files. */
function toFileList(files: File[]) {
  const transfer = new DataTransfer()
  files.forEach((file) => transfer.items.add(file))
  return transfer.files
}

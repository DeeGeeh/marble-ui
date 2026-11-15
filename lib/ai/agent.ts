import {
  convertToModelMessages,
  generateId,
  isStepCount,
  simulateReadableStream,
  streamText,
  tool,
  type InferUITools,
  type UIDataTypes,
  type UIMessage,
} from "ai"
import { MockLanguageModelV4 } from "ai/test"
import { z } from "zod"

const STREAM_DELAY_MS = 30
const TOOL_DELAY_MS = 900

const docs = [
  { title: "Deploying previews", path: "docs/deploy/previews.md" },
  { title: "Branch environments", path: "docs/deploy/branches.md" },
  { title: "Rollbacks", path: "docs/deploy/rollbacks.md" },
]

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const tools = {
  searchDocs: tool({
    description: "Search the project docs",
    inputSchema: z.object({ query: z.string() }),
    execute: async () => {
      await sleep(TOOL_DELAY_MS)
      return docs
    },
  }),
  deployPreview: tool({
    description: "Deploy a preview build of a branch",
    inputSchema: z.object({ branch: z.string() }),
    execute: async ({ branch }) => {
      await sleep(TOOL_DELAY_MS * 1.5)
      return { url: `https://${branch}.preview.example.com` }
    },
  }),
}

export type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  InferUITools<typeof tools>
>

const usage = {
  inputTokens: {
    total: 0,
    noCache: 0,
    cacheRead: undefined,
    cacheWrite: undefined,
  },
  outputTokens: { total: 0, text: 0, reasoning: undefined },
}

type StreamPart =
  Awaited<
    ReturnType<MockLanguageModelV4["doStream"]>
  >["stream"] extends ReadableStream<infer P>
    ? P
    : never

const model = new MockLanguageModelV4({
  doStream: async ({ prompt }) => {
    const lastTool = prompt
      .findLast((message) => message.role === "tool")
      ?.content.findLast((part) => part.type === "tool-result")
    const words = (text: string, id: string) => [
      { type: "text-start" as const, id },
      ...text
        .split(/(?<= )/)
        .map((delta) => ({ type: "text-delta" as const, id, delta })),
      { type: "text-end" as const, id },
    ]
    const call = (toolName: keyof typeof tools, input: object) => ({
      type: "tool-call" as const,
      toolCallId: generateId(),
      toolName,
      input: JSON.stringify(input),
    })
    const finish = (unified: "stop" | "tool-calls") => ({
      type: "finish" as const,
      finishReason: { unified, raw: undefined },
      usage,
    })

    const chunks: StreamPart[] =
      lastTool?.toolName === "deployPreview"
        ? [
            ...words(
              lastTool.output.type === "execution-denied"
                ? "No problem, nothing was deployed. Say the word when you're ready."
                : "The preview is live. Give it a spin and tell me what to tweak.",
              "answer"
            ),
            finish("stop"),
          ]
        : lastTool?.toolName === "searchDocs"
          ? [
              ...words(
                "Found the guide: previews build straight from a branch. I can spin one up for marble-theme.",
                "answer"
              ),
              call("deployPreview", { branch: "marble-theme" }),
              finish("tool-calls"),
            ]
          : [
              { type: "reasoning-start" as const, id: "think" },
              ...[
                "They want to ship this. ",
                "Before deploying I should check how previews work here, ",
                "so I'll search the docs first.",
              ].map((delta) => ({
                type: "reasoning-delta" as const,
                id: "think",
                delta,
              })),
              { type: "reasoning-end" as const, id: "think" },
              call("searchDocs", { query: "deploy preview" }),
              finish("tool-calls"),
            ]

    return {
      stream: simulateReadableStream({
        chunks,
        chunkDelayInMs: STREAM_DELAY_MS,
      }),
    }
  },
})

export async function streamAgent(messages: ChatMessage[]) {
  return streamText({
    model,
    messages: await convertToModelMessages(messages),
    tools,
    toolApproval: { deployPreview: "user-approval" },
    stopWhen: isStepCount(5),
  })
}

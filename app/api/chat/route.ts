import { createUIMessageStreamResponse, toUIMessageStream } from "ai"

import { streamAgent, type ChatMessage } from "@/lib/ai/agent"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: ChatMessage[] } = await req.json()
  const result = await streamAgent(messages)
  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}

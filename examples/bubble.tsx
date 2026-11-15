import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageContent } from "@/components/ui/message"

export default function BubbleExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {(
          [
            "default",
            "secondary",
            "muted",
            "tinted",
            "outline",
            "destructive",
          ] as const
        ).map((variant) => (
          <Bubble key={variant} variant={variant}>
            <BubbleContent>{variant}</BubbleContent>
          </Bubble>
        ))}
      </div>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>What does the ghost variant do?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble variant="ghost">
            <BubbleContent>
              It drops the bubble entirely, so long assistant answers read like
              plain text in the thread.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}

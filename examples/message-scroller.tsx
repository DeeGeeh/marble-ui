import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Card, CardContent } from "@/components/ui/card"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

export default function MessageScrollerExample() {
  return (
    <Card className="h-64 w-full max-w-md">
      <CardContent className="min-h-0 flex-1">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <MessageScrollerItem key={i} messageId={String(i)}>
                    <Message align={i % 2 ? "start" : "end"}>
                      <MessageContent>
                        <Bubble variant={i % 2 ? "muted" : "default"}>
                          <BubbleContent>Message {i + 1}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </CardContent>
    </Card>
  )
}

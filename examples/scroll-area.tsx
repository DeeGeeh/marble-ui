import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ScrollAreaExample() {
  return (
    <Card className="w-full max-w-xs">
      <CardContent>
        <ScrollArea className="h-40">
          <div className="text-sm">
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} className="py-1">
                v1.2.0-beta.{30 - i}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

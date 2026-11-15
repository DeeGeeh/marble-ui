import { Card, CardContent } from "@/components/ui/card"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function ResizableExample() {
  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <ResizablePanelGroup orientation="horizontal" className="min-h-40">
          <ResizablePanel defaultSize="30%">
            <div className="flex h-full items-center justify-center text-sm">
              One
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="70%">
            <div className="flex h-full items-center justify-center text-sm">
              Two
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  )
}

import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"

export default function FrameExample() {
  return (
    <Frame className="w-full max-w-sm">
      <FrameHeader>
        <FrameTitle>Workspace</FrameTitle>
        <FrameDescription>Two panels in one tray.</FrameDescription>
      </FrameHeader>
      <FramePanel>Members and roles</FramePanel>
      <FramePanel>Billing and plans</FramePanel>
    </Frame>
  )
}

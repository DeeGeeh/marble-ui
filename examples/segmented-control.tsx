"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control"

export default function SegmentedControlExample() {
  return (
    <SegmentedControl render={<ToggleGroupPrimitive defaultValue={["week"]} />}>
      {["Day", "Week", "Month"].map((label) => (
        <SegmentedControlItem
          key={label}
          render={<TogglePrimitive value={label.toLowerCase()} />}
        >
          {label}
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  )
}

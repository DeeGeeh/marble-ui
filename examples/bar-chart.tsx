"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const monthly = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const monthlyConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

const monthTick = (value: string) => value.slice(0, 3)

export default function BarChartExample() {
  return (
    <ChartContainer config={monthlyConfig} className="h-56 w-full">
      <BarChart data={monthly} barGap={4}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={monthTick}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar
          isAnimationActive={false}
          dataKey="desktop"
          fill="var(--color-desktop)"
          radius={6}
        />
        <Bar
          isAnimationActive={false}
          dataKey="mobile"
          fill="var(--color-mobile)"
          radius={6}
        />
      </BarChart>
    </ChartContainer>
  )
}

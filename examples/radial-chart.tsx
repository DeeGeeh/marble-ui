"use client"

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

const goal = [{ name: "goal", value: 72, fill: "var(--color-goal)" }]

const goalConfig = {
  goal: { label: "Goal", color: "var(--chart-1)" },
} satisfies ChartConfig

export default function RadialChartExample() {
  return (
    <ChartContainer config={goalConfig} className="aspect-square h-56">
      <RadialBarChart
        data={goal}
        startAngle={90}
        endAngle={-270}
        innerRadius={72}
        outerRadius={96}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar dataKey="value" background cornerRadius={12} />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
          <tspan
            x="50%"
            dy="-0.2em"
            className="fill-foreground font-heading text-3xl font-bold"
          >
            72%
          </tspan>
          <tspan x="50%" dy="1.8em" className="fill-muted-foreground text-xs">
            of quarterly goal
          </tspan>
        </text>
      </RadialBarChart>
    </ChartContainer>
  )
}

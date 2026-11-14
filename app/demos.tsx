"use client"

// Demos that need function props (callbacks, render functions) live here.
import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import {
  SkeletonAvatar,
  SkeletonReveal,
  SkeletonText,
} from "@/components/ui/skeleton"
import { DataTable, dataTableColumns } from "@/components/ui/data-table"
import { toast } from "@/components/ui/toast"

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.add({ title: "Event created", description: "Sunday at 9:00" })
        }
      >
        Show toast
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          const id = toast.add({
            title: "Message archived",
            actionProps: { children: "Undo", onClick: () => toast.close(id) },
          })
        }}
      >
        With action
      </Button>
    </div>
  )
}

export function CommandDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search emoji</CommandItem>
              <CommandItem>
                Settings <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

const frameworks = ["Next.js", "Remix", "Astro", "SvelteKit", "Nuxt"]

export function ComboboxDemo() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" className="max-w-xs" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig

export function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-48 w-full max-w-lg">
      <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value: string) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey="desktop"
          type="natural"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  )
}

const questionnaireItems = [
  {
    name: "stack",
    required: true,
    choices: [{ value: "next" }, { value: "start" }],
  },
] as const

export function QuestionnaireDemo() {
  return (
    <Questionnaire
      className="max-w-lg"
      defaultItem="stack"
      items={questionnaireItems}
      onSubmit={(event) => {
        event.preventDefault()
        toast.add({ title: "Submitted" })
      }}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="stack" required>
        <QuestionnaireTitle>Which framework?</QuestionnaireTitle>
        <QuestionnaireDescription>Pick one.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="next">
            <span className="font-medium">Next.js</span>
            <QuestionnaireChoiceDescription>
              App router, RSC.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="start">
            <span className="font-medium">TanStack Start</span>
            <QuestionnaireChoiceDescription>
              Type-safe routing.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireActions className="w-full">
        <QuestionnairePrevious />
        <QuestionnaireNext>Next</QuestionnaireNext>
        <QuestionnaireSubmit>Submit</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}

export function SkeletonDemo() {
  const [loading, setLoading] = useState(false)
  const reload = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1600)
  }
  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <SkeletonReveal
        className="w-full"
        loading={loading}
        skeleton={
          <Item>
            <ItemMedia>
              <SkeletonAvatar />
            </ItemMedia>
            <ItemContent>
              <SkeletonText lines={2} />
            </ItemContent>
          </Item>
        }
      >
        <Item>
          <ItemMedia>
            <Avatar size="lg">
              <AvatarFallback>UK</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>UI Kit Studio</ItemTitle>
            <ItemDescription>Marble edition</ItemDescription>
          </ItemContent>
        </Item>
      </SkeletonReveal>
      <Button variant="outline" size="sm" onClick={reload}>
        Simulate loading
      </Button>
    </div>
  )
}

const stages = ["Lead", "Qualified", "Proposal", "Won", "Lost"] as const

type Company = {
  name: string
  domain: string
  stage: (typeof stages)[number]
  employees: number
  owner: string
  created: string
}

const companyNames = [
  "Airbnb",
  "Anthropic",
  "Figma",
  "Linear",
  "Notion",
  "Stripe",
  "Vercel",
  "Supabase",
  "Raycast",
  "Arc",
  "Framer",
  "Loom",
  "Miro",
  "Retool",
  "Clerk",
  "Resend",
  "Posthog",
  "Sentry",
  "Cal.com",
  "Railway",
  "Neon",
  "Plaid",
  "Ramp",
  "Mercury",
]
const owners = ["Diar", "Sam", "Alex", "Robin"]

const initialCompanies: Company[] = companyNames.map((name, i) => ({
  name,
  domain: `${name.toLowerCase().replace(/[^a-z]/g, "")}.com`,
  stage: stages[i % stages.length],
  employees: 40 + ((i * 137) % 900),
  owner: owners[i % owners.length],
  created: `2026-${String((i % 9) + 1).padStart(2, "0")}-${String((i % 27) + 1).padStart(2, "0")}`,
}))

const col = dataTableColumns<Company>()
const companyColumns = [
  col.accessor("name", {
    header: "Company",
    size: 180,
    meta: { editor: "text" },
  }),
  col.accessor("domain", {
    header: "Domain",
    size: 180,
    meta: { editor: "text" },
  }),
  col.accessor("stage", {
    header: "Stage",
    size: 130,
    meta: { editor: "select", options: stages },
  }),
  col.accessor("employees", {
    header: "Employees",
    size: 120,
    meta: { editor: "number" },
  }),
  col.accessor("owner", {
    header: "Owner",
    size: 130,
    meta: { editor: "text" },
  }),
  col.accessor("created", {
    header: "Created",
    size: 150,
    meta: { editor: "date" },
  }),
]

export function DataTableDemo() {
  const [rows, setRows] = useState(initialCompanies)
  return (
    <DataTable
      className="max-w-2xl"
      data={rows}
      columns={companyColumns}
      onRowChange={(index, patch) =>
        setRows((current) =>
          current.map((row, i) => (i === index ? { ...row, ...patch } : row))
        )
      }
    />
  )
}

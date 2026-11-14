"use client"

// Demos that need function props (callbacks, render functions) live here.
import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
} from "recharts"

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
  ChartLegend,
  ChartLegendContent,
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
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { CalendarIcon } from "@heroicons/react/24/outline"
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@/components/ui/autocomplete"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control"

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

export function AreaChartDemo() {
  return (
    <ChartContainer config={monthlyConfig} className="h-56 w-full">
      <AreaChart data={monthly} margin={{ left: 12, right: 12 }}>
        <defs>
          {(["desktop", "mobile"] as const).map((key) => (
            <linearGradient
              key={key}
              id={`fill-${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={`var(--color-${key})`}
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor={`var(--color-${key})`}
                stopOpacity={0.05}
              />
            </linearGradient>
          ))}
        </defs>
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
          content={<ChartTooltipContent indicator="dot" />}
        />
        {(["mobile", "desktop"] as const).map((key) => (
          <Area
            key={key}
            dataKey={key}
            type="natural"
            fill={`url(#fill-${key})`}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            stackId="a"
          />
        ))}
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}

export function BarChartDemo() {
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
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={6} />
      </BarChart>
    </ChartContainer>
  )
}

export function LineChartDemo() {
  return (
    <ChartContainer config={monthlyConfig} className="h-56 w-full">
      <LineChart data={monthly} margin={{ left: 12, right: 12, top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={monthTick}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {(["desktop", "mobile"] as const).map((key) => (
          <Line
            key={key}
            dataKey={key}
            type="monotone"
            stroke={`var(--color-${key})`}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--card)" }}
          />
        ))}
      </LineChart>
    </ChartContainer>
  )
}

const browsers = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const browserConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig

const totalVisitors = browsers.reduce((sum, b) => sum + b.visitors, 0)

export function PieChartDemo() {
  return (
    <ChartContainer config={browserConfig} className="aspect-square h-56">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={browsers}
          dataKey="visitors"
          nameKey="browser"
          innerRadius={58}
          strokeWidth={4}
          stroke="var(--card)"
          cornerRadius={6}
          paddingAngle={2}
        >
          <Label
            content={({ viewBox }) =>
              viewBox && "cx" in viewBox ? (
                <text
                  x={viewBox.cx}
                  y={viewBox.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x={viewBox.cx}
                    y={viewBox.cy}
                    className="fill-foreground font-heading text-2xl font-bold"
                  >
                    {totalVisitors.toLocaleString()}
                  </tspan>
                  <tspan
                    x={viewBox.cx}
                    y={(viewBox.cy ?? 0) + 22}
                    className="fill-muted-foreground text-xs"
                  >
                    Visitors
                  </tspan>
                </text>
              ) : null
            }
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}

const goal = [{ name: "goal", value: 72, fill: "var(--color-goal)" }]
const goalConfig = {
  goal: { label: "Goal", color: "var(--chart-1)" },
} satisfies ChartConfig

export function RadialChartDemo() {
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

const cities = [
  "Amsterdam",
  "Barcelona",
  "Copenhagen",
  "Helsinki",
  "Lisbon",
  "Oslo",
  "Stockholm",
  "Vienna",
]

export function AutocompleteDemo() {
  return (
    <Autocomplete items={cities}>
      <AutocompleteInput
        placeholder="Search a city…"
        showClear
        className="max-w-xs"
      />
      <AutocompleteContent>
        <AutocompleteEmpty>No matching city.</AutocompleteEmpty>
        <AutocompleteList>
          {(city: string) => (
            <AutocompleteItem key={city} value={city}>
              {city}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  )
}

export function DatePickerDemo() {
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" className="w-56 justify-start" />}
      >
        <CalendarIcon />
        {date
          ? date.toLocaleDateString(undefined, { dateStyle: "medium" })
          : "Pick a date"}
      </PopoverTrigger>
      <PopoverContent className="w-auto" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => {
            setDate(day)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

const permissions = ["Read", "Write", "Deploy"]

export function CheckboxGroupDemo() {
  const [value, setValue] = useState(["Read"])
  return (
    <CheckboxGroup
      value={value}
      onValueChange={setValue}
      allValues={permissions}
      aria-label="Permissions"
    >
      <Field orientation="horizontal">
        <Checkbox id="perm-all" parent />
        <FieldLabel htmlFor="perm-all">All permissions</FieldLabel>
      </Field>
      {permissions.map((permission) => (
        <Field key={permission} orientation="horizontal" className="ml-6">
          <Checkbox id={`perm-${permission}`} value={permission} />
          <FieldLabel htmlFor={`perm-${permission}`}>{permission}</FieldLabel>
        </Field>
      ))}
    </CheckboxGroup>
  )
}

export function SegmentedControlDemo() {
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

export function FormDemo() {
  return (
    <Form
      className="max-w-xs"
      onSubmit={(event) => {
        event.preventDefault()
        toast.add({ title: "Invite sent" })
      }}
    >
      <Field>
        <FieldLabel htmlFor="invite-email">Invite by email</FieldLabel>
        <Input
          id="invite-email"
          type="email"
          required
          placeholder="name@company.com"
        />
      </Field>
      <Button type="submit" className="self-start">
        Send invite
      </Button>
    </Form>
  )
}

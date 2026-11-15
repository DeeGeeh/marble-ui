"use client"

import { useState } from "react"
import { DataTable, dataTableColumns } from "@/components/ui/data-table"

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

const companyColumns = col.columns([
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
])

export default function DataTableExample() {
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

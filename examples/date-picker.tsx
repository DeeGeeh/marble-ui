"use client"

import { CalendarIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePickerExample() {
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

"use client"

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@/components/ui/autocomplete"

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

export default function AutocompleteExample() {
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

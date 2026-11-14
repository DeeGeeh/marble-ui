"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()
  // plain "d" only; ignored while typing in form fields (library default)
  useHotkeys("d", () => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
  return null
}

export { ThemeProvider }

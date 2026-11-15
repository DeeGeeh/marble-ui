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
      <ThemeColor />
      {children}
    </NextThemesProvider>
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()
  useHotkeys("d", () => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
  return null
}

function ThemeColor() {
  const { resolvedTheme } = useTheme()
  React.useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    )
    if (!meta) {
      meta = document.createElement("meta")
      meta.name = "theme-color"
      document.head.append(meta)
    }
    const tag = meta
    const frame = requestAnimationFrame(() => {
      tag.content = getComputedStyle(document.body).backgroundColor
    })
    return () => cancelAnimationFrame(frame)
  }, [resolvedTheme])
  return null
}

export { ThemeProvider }

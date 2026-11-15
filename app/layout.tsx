import type { Metadata } from "next"
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google"

import { RootProvider } from "fumadocs-ui/provider/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" })
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = { title: "Marble UI" }

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        sans.variable,
        mono.variable,
        display.variable
      )}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <RootProvider theme={{ enabled: false }}>
            <TooltipProvider>
              <Toaster>{children}</Toaster>
            </TooltipProvider>
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

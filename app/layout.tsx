import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Roboto_Mono } from "next/font/google"

const roboto = Roboto_Mono({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "ReadSnap",
  description: "Discover and read book summaries in minutes",
  icons: {
    icon: "/favicon.svg"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              themes={["light", "dark", "reading"]}
            >
              {children}
            </ThemeProvider>
      </body>
    </html>
  )
}

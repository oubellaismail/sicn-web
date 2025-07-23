import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, Fira_Code } from "next/font/google"
import "./globals.css"
import { CoursesProvider } from "@/hooks/use-courses"
import { AuthProvider } from "@/hooks/use-auth"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
})

export const metadata: Metadata = {
  title: "SICN - Cybersecurity & Digital Trust Program",
  description: "Engineer's Program in IT Security and Digital Trust - ENSA Agadir",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${firaCode.variable} font-sans`}>
        <AuthProvider>
          <CoursesProvider>{children}</CoursesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import LandingPage from "./landing/page"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <LandingPage />
}

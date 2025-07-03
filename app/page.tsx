"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import LandingPage from "./landing/page"
import SignInPage from "@/components/sign-in-page"

export default function HomePage() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const signinParam = searchParams.get("signin")

    // Show sign in page if signin parameter is present
    if (signinParam === "true") {
      setShowSignIn(true)
    }

    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (showSignIn) {
    return <SignInPage />
  }

  return <LandingPage />
}

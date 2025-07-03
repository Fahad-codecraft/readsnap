"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

interface ReadingProgressProps {
  contentRef: React.RefObject<HTMLElement>
}

export default function ReadingProgress({ contentRef }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      if (!contentRef.current) return

      const element = contentRef.current
      const scrollTop = window.scrollY
      const docHeight = element.offsetHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      const scrollPercentRounded = Math.round(scrollPercent * 100)

      setProgress(Math.min(100, Math.max(0, scrollPercentRounded)))
    }

    const handleScroll = () => {
      requestAnimationFrame(updateProgress)
    }

    window.addEventListener("scroll", handleScroll)
    updateProgress() // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [contentRef])

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Progress value={progress} className="h-1 rounded-none border-none bg-transparent" />
      <div className="absolute top-1 right-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
        {progress}%
      </div>
    </div>
  )
}

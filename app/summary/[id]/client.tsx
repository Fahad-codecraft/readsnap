"use client"

import { useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Lightbulb, Quote } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import ReadingProgress from "@/components/reading-progress"
import ReactMarkdown from "react-markdown"



export default function SummaryReaderClient({ book, contentType }: { book: any, contentType: string }) {
  const contentRef = useRef<HTMLElement>(null)
  const router = useRouter()

  const getContentTypeInfo = () => {
    switch (contentType) {
      case "takeaways":
        return { title: "Key Takeaways", icon: Lightbulb }
      case "quotes":
        return { title: "Quotes & Insights", icon: Quote }
      default:
        return { title: "Full Summary", icon: BookOpen }
    }
  }

  const renderContent = () => {
    switch (contentType) {
      case "takeaways":
        return renderKeyTakeaways()
      case "quotes":
        return renderQuotes()
      default:
        return renderFullSummary()
    }
  }

  const renderFullSummary = () => {
    // Sample markdown content - in a real app, this would come from the database
    const summaryMarkdown = `
This comprehensive summary explores the key concepts and insights from "${book?.title}" by ${book?.author}. The book presents a compelling narrative that challenges conventional thinking and offers practical wisdom for personal and professional growth.

## Overview

The author begins by establishing the fundamental premise that success in any field requires a combination of strategic thinking, persistent effort, and the ability to adapt to changing circumstances. This foundation sets the stage for deeper exploration of the principles that drive exceptional performance.

One of the most significant insights presented is the importance of developing a **growth mindset**. Rather than viewing abilities as fixed traits, the book argues that embracing challenges and learning from failures creates opportunities for continuous improvement and innovation.

## Core Principles

The book outlines several core principles that serve as guideposts for achieving meaningful success. These principles emphasize the value of:

- **Authentic relationships**
- **Purposeful action** 
- **Maintaining perspective** during both triumphs and setbacks

Another crucial element discussed is the role of *emotional intelligence* in leadership and collaboration. The ability to understand and manage emotions—both your own and others'—emerges as a critical skill for navigating complex interpersonal dynamics and building trust.

## Practical Applications

The book provides numerous practical strategies that readers can implement immediately. These range from:

1. Daily habits that compound over time
2. Frameworks for making difficult decisions under pressure
3. Methods for building resilience

Each strategy is supported by research and real-world examples.

> The author also addresses common obstacles and misconceptions that prevent people from reaching their potential. By identifying these barriers and providing concrete solutions, the book serves as both inspiration and practical guide for transformation.

## Conclusion

"${book?.title}" offers a thoughtful and actionable approach to personal development that transcends simple self-help advice. The book's enduring value lies in its ability to provide both philosophical depth and practical utility, making it relevant for readers at any stage of their journey.
    `

    return (
      <div className="prose prose-lg dark:prose-invert reading:prose-serif max-w-none">
        <ReactMarkdown>{summaryMarkdown}</ReactMarkdown>
      </div>
    )
  }

  const renderKeyTakeaways = () => {
    // Sample markdown content for takeaways
    const takeawaysMarkdown = `
Here are the most important lessons and actionable insights from "${book?.title}" that you can apply immediately.

---

## 1. Embrace the Power of Small Changes

The most significant transformations come from consistent, small improvements rather than dramatic overhauls. Focus on making 1% improvements daily rather than seeking overnight success.

> **Action Step:** Identify one small habit you can improve by just 1% today and commit to it for the next week.

---

## 2. Design Your Environment for Success

Your environment shapes your behavior more than willpower. Create systems and surroundings that make good choices easier and bad choices harder.

> **Action Step:** Remove one temptation from your environment and add one cue that encourages a positive behavior.

---

## 3. Focus on Systems, Not Goals

Goals are about the results you want to achieve, but systems are about the processes that lead to those results. Winners and losers have the same goals, but winners have better systems.

> **Action Step:** Write down one goal you have, then create a daily system that will help you achieve it.

---

## 4. Use the Two-Minute Rule

When starting a new habit, it should take less than two minutes to do. The idea is to make it as easy as possible to get started and build momentum.

> **Action Step:** Take a habit you want to build and scale it down to a two-minute version.

---

## 5. Track Your Progress

What gets measured gets managed. Tracking your habits creates a visual cue that can trigger your next behavior and provides immediate satisfaction when you see your progress.

> **Action Step:** Choose a simple way to track one habit for the next 30 days (calendar, journal, or app).
    `

    return (
      <div className="prose prose-lg dark:prose-invert reading:prose-serif max-w-none">
        <ReactMarkdown>{takeawaysMarkdown}</ReactMarkdown>
      </div>
    )
  }

  const renderQuotes = () => {
    // Sample markdown content for quotes
    const quotesMarkdown = `
Powerful quotes from "${book?.title}" with context and explanations to help you understand their deeper meaning.

---

> "You do not rise to the level of your goals. You fall to the level of your systems."

### What this means:
This quote emphasizes that achieving success isn't about setting ambitious goals, but about creating reliable systems and processes. Your daily habits and routines determine your outcomes more than your aspirations. If you have poor systems, even great goals won't save you.

**Apply it:** Instead of just setting a goal to "get fit," create a system like "go to the gym every Monday, Wednesday, and Friday at 7 AM."

---

> "Every action you take is a vote for the type of person you wish to become."

### What this means:
Each small action reinforces your identity. When you make your bed, you vote for being organized. When you write a page, you vote for being a writer. These small votes accumulate to shape who you become.

**Apply it:** Before taking any action, ask yourself: "What type of person would do this?" and "Is this action aligned with who I want to become?"

---

> "The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become."

### What this means:
Identity-based habits are more powerful than outcome-based habits. Instead of focusing on what you want (outcome), focus on who you want to be (identity). Your behaviors will naturally align with your self-image.

**Apply it:** Instead of "I want to run a marathon," think "I am a runner." Then ask, "What would a runner do today?"

---

> "Habits are the compound interest of self-improvement."

### What this means:
Just like money compounds over time, small habits compound into remarkable results. A 1% improvement daily leads to being 37 times better over a year. The effects are small initially but become dramatic over time.

**Apply it:** Focus on small, consistent improvements rather than dramatic changes. Trust the process and be patient with the results.

---

> "You don't have to be the victim of your environment. You can also be the architect of it."

### What this means:
While your environment influences your behavior, you have the power to design it intentionally. By changing your surroundings, you can make good habits easier and bad habits harder to perform.

**Apply it:** Redesign your space to support your goals. Put healthy snacks at eye level, place your workout clothes where you'll see them, or remove distracting apps from your phone's home screen.
    `

    return (
      <div className="prose prose-lg dark:prose-invert reading:prose-serif max-w-none">
        <ReactMarkdown>{quotesMarkdown}</ReactMarkdown>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Book not found</h1>
            <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          </div>
        </div>
      </div>
    )
  }

  const contentInfo = getContentTypeInfo()
  const IconComponent = contentInfo.icon

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress contentRef={contentRef} />

      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 mt-1">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <IconComponent className="w-5 h-5 text-primary" />
              <div>
                <h1 className="font-semibold">{book.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {contentInfo.title} • by {book.author}
                </p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" ref={contentRef}>
        <article className="max-w-3xl mx-auto">
          <div className="reading-text space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <IconComponent className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold m-0">{contentInfo.title}</h2>
            </div>

            {renderContent()}
          </div>
        </article>
      </main>
    </div>
  )
}
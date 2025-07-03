"use client"

import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Lightbulb, Quote } from "lucide-react"
import Navbar from "@/components/navbar"
import { books } from "@/lib/mock-data"

export default function ReadingSelectionPage() {
  const router = useRouter()
  const params = useParams()
  const bookId = params.id as string

  const book = books.find((b) => b.id === bookId)

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Book not found</h1>
            <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          </div>
        </main>
      </div>
    )
  }

  const readingOptions = [
    {
      id: "summary",
      title: "Full Summary",
      description: "Read the complete summary covering all major concepts and insights from the book",
      icon: BookOpen,
      estimatedTime: "8-12 min read",
      color: "bg-blue-50 dark:bg-blue-950 reading:bg-amber-50",
      iconColor: "text-blue-600 dark:text-blue-400 reading:text-amber-700",
    },
    {
      id: "takeaways",
      title: "Key Takeaways",
      description: "Discover the most important lessons and actionable insights you can apply immediately",
      icon: Lightbulb,
      estimatedTime: "5-7 min read",
      color: "bg-green-50 dark:bg-green-950 reading:bg-amber-50",
      iconColor: "text-green-600 dark:text-green-400 reading:text-amber-700",
    },
    {
      id: "quotes",
      title: "Quotes & Insights",
      description: "Explore powerful quotes from the book with explanations and context",
      icon: Quote,
      estimatedTime: "3-5 min read",
      color: "bg-purple-50 dark:bg-purple-950 reading:bg-amber-50",
      iconColor: "text-purple-600 dark:text-purple-400 reading:text-amber-700",
    },
  ]

  const handleOptionSelect = (optionId: string) => {
    router.push(`/summary/${bookId}?type=${optionId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Book Details
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Book Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 p-6 bg-card rounded-lg border">
            <div className="w-32 h-48 relative rounded-md overflow-hidden shadow-md flex-shrink-0">
              <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">by {book.author}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {book.genres.map((genre) => (
                  <Badge key={genre} variant="outline" className="capitalize">
                    {genre}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{book.description}</p>
            </div>
          </div>

          {/* Reading Options */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">What do you want to read?</h2>
            <p className="text-muted-foreground mb-6">Choose your preferred reading experience</p>

            <div className="grid md:grid-cols-3 gap-6">
              {readingOptions.map((option) => {
                const IconComponent = option.icon
                return (
                  <Card
                    key={option.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/20"
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`w-16 h-16 rounded-full ${option.color} flex items-center justify-center mx-auto mb-4`}
                      >
                        <IconComponent className={`w-8 h-8 ${option.iconColor}`} />
                      </div>
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                      <CardDescription className="text-sm">{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center pt-0">
                      <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full inline-block">
                        {option.estimatedTime}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-card rounded-lg border">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Key Concepts</div>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Actionable Tips</div>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="text-2xl font-bold text-primary">15</div>
              <div className="text-sm text-muted-foreground">Memorable Quotes</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

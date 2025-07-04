import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Lightbulb, Quote } from "lucide-react"
import Navbar from "@/components/navbar"
import { getBookById } from "@/actions/book.actions"

type ReadingSelectionPageProps = {
  params: {
    id: string
  }
}

export default async function ReadingSelectionPage({ params }: ReadingSelectionPageProps) {
  const { id } = await params
  const book = await getBookById(id)

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Book not found</h1>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Link href={`/book/${id}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Book Details
          </Button>
        </Link>

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
                  <Link key={option.id} href={`/summary/${id}?type=${option.id}`}>
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/20">
                      <CardHeader className="text-center pb-4">
                        <div
                          className={`w-16 h-16 rounded-full ${option.color} flex items-center justify-center mx-auto mb-4`}
                        >
                          <IconComponent className={`w-8 h-8 ${option.iconColor}`} />
                        </div>
                        <CardTitle className="text-lg">{option.title}</CardTitle>
                        <CardDescription className="text-sm">{option.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen } from "lucide-react"
import Navbar from "@/components/navbar"
import { books } from "@/lib/mock-data"

export default function BookDetailsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const bookId = params.id as string

  const book = books.find((b) => b.id === bookId)

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus !== "true") {
      router.push("/")
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated || !book) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Books
        </Button>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg">
              <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {book.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {book.genres.map((genre) => (
                  <Badge key={genre} variant="outline" className="capitalize">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{book.description}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Genres:</span>{" "}
                {book.genres.map((g) => g.charAt(0).toUpperCase() + g.slice(1)).join(", ")}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Reading Time:</span> {book.readingTime}
              </p>
            </div>

            <Button size="lg" className="w-full" onClick={() => router.push(`/read/${book.id}`)}>
              <BookOpen className="w-4 h-4 mr-2" />
              Read Summary
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

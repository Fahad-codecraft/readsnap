"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

import { getAllBooks } from "@/actions/book.actions"
import type { Book } from "@/actions/book.actions"

interface BookGridProps {
  searchQuery: string
  selectedGenre: string
}

export default function BookGrid({ searchQuery, selectedGenre }: BookGridProps) {
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBooks() {
      try {
        const fetchedBooks = await getAllBooks()
        setBooks(fetchedBooks)
      } catch (error) {
        console.error("Error loading books:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesGenre =
        selectedGenre === "all" || book.genres.includes(selectedGenre)

      return matchesSearch && matchesGenre
    })
  }, [books, searchQuery, selectedGenre])

  const handleBookClick = (bookId: string) => {
    router.push(`/book/${bookId}`)
  }

  if (loading) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-muted-foreground">Loading books...</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredBooks.map((book) => (
        <Card
          key={book.id}
          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
          onClick={() => handleBookClick(book.id)}
        >
          <CardContent className="p-4">
            <div className="aspect-[3/4] relative mb-4 rounded-md overflow-hidden">
              <Image
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm line-clamp-2 leading-tight">{book.title}</h3>
              <p className="text-sm text-muted-foreground">by {book.author}</p>

              <div className="flex flex-wrap gap-1 mb-2">
                {book.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-xs capitalize">
                    {genre}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {book.readingTime}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredBooks.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No books found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}

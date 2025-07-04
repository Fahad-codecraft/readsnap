import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { getBooksByQueryAndGenre } from "@/actions/book.actions"
import type { Book } from "@/actions/book.actions"
import { useDebounce } from "@/lib/hook"

interface BookGridProps {
  searchQuery: string
  selectedGenre: string
}

export default function BookGrid({ searchQuery, selectedGenre }: BookGridProps) {
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  const debouncedSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    async function fetchFilteredBooks() {
      try {
        setLoading(true)
        const fetchedBooks = await getBooksByQueryAndGenre(debouncedSearch, selectedGenre)
        setBooks(fetchedBooks)
      } catch (error) {
        console.error("Error loading filtered books:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredBooks()
  }, [debouncedSearch, selectedGenre]) // Fetch on input change

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
      {books.map((book) => (
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
            </div>
          </CardContent>
        </Card>
      ))}

      {books.length === 0 && !loading && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No books found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}

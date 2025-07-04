"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreVertical, Trash2, Edit, Eye, Clock, BookOpen } from "lucide-react"
import Navbar from "@/components/navbar"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { deleteBook, getBooksByQueryAndGenre } from "@/actions/book.actions"
import type { Book } from "@/actions/book.actions"
import { useDebounce } from "@/lib/hook"

export default function BookListPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [books, setBooks] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [bookToDelete, setBookToDelete] = useState<string | null>(null)
  const debouncedSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    async function fetchFilteredBooks() {
      try {
        const fetchedBooks = await getBooksByQueryAndGenre(debouncedSearch, "all")
        setBooks(fetchedBooks)
      } catch (error) {
        console.error("Error loading filtered books:", error)
      }
    }

    fetchFilteredBooks()
  }, [debouncedSearch])

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      book.author.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      book.genres.some((genre) => genre.toLowerCase().includes(debouncedSearch.toLowerCase())),
  )

  const handleDeleteBook = async (bookId: string) => {
    const bookToRemove = books.find((book) => book.id === bookId)

    try {
      await deleteBook(bookId)
      setBooks((prev) => prev.filter((book) => book.id !== bookId))
      setBookToDelete(null)

      toast({
        title: "Book Deleted",
        description: `"${bookToRemove?.title}" has been removed from the library.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete "${bookToRemove?.title}". Please try again.`,
        variant: "destructive",
      })
    }
  }

  const handleViewBook = (bookId: string) => {
    router.push(`/book/${bookId}`)
  }

  const handleEditBook = (bookId: string) => {
    toast({
      title: "Edit Feature",
      description: "Edit functionality would be implemented here.",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Book Library</h1>
              <p className="text-muted-foreground">Manage your book collection • {books.length} books total</p>
            </div>
            <Button onClick={() => router.push("/add/new")} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Book
            </Button>
          </div>

          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books by title, author, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{books.length}</div>
                <div className="text-sm text-muted-foreground">Total Books</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {new Set(books.flatMap((book) => book.genres)).size}
                </div>
                <div className="text-sm text-muted-foreground">Genres</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{new Set(books.map((book) => book.author)).size}</div>
                <div className="text-sm text-muted-foreground">Authors</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{filteredBooks.length}</div>
                <div className="text-sm text-muted-foreground">Showing</div>
              </CardContent>
            </Card>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] relative mb-4 rounded-md overflow-hidden bg-muted">
                      <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewBook(book.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditBook(book.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Book
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setBookToDelete(book.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Book
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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

                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs bg-transparent"
                          onClick={() => handleViewBook(book.id)}
                        >
                          <BookOpen className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-2 bg-transparent"
                          onClick={() => setBookToDelete(book.id)}
                        >
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? `No books match your search for "${searchQuery}"`
                  : "Your library is empty. Add your first book to get started."}
              </p>
              {!searchQuery && (
                <Button onClick={() => router.push("/add/new")}>...
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Book
                </Button>
              )}
            </div>
          )}

          <AlertDialog open={!!bookToDelete} onOpenChange={() => setBookToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Book</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{books.find((b) => b.id === bookToDelete)?.title}"? This action
                  cannot be undone and will permanently remove the book and all its content.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => bookToDelete && handleDeleteBook(bookToDelete)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Book
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

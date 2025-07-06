"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, BookOpen, X, Save, Lightbulb, QuoteIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import ReactMarkdown from "react-markdown"
import type { Book } from "@/actions/book.actions"
import { getBookContent, updateBookAndContent } from "@/actions/book.actions"

const availableGenres = [
  "business",
  "self-help",
  "psychology",
  "productivity",
  "leadership",
  "finance",
  "health",
  "technology",
  "entrepreneurship",
  "management",
  "lifestyle",
  "history",
  "science",
  "philosophy",
  "spirituality",
  "education",
  "anthropology",
]

export default function EditClientBook({ book, id }: { book: Book, id: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const bookId = id

  // Find the book to edit
  const bookToEdit = book

  // Basic book info
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [readingTime, setReadingTime] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [coverUrl, setCoverUrl] = useState("")

  // Content
  const [summary, setSummary] = useState("")
  const [takeaways, setTakeaways] = useState("")
  const [quotes, setQuotes] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load book data on component mount
  useEffect(() => {
  if (bookToEdit) {
    setTitle(bookToEdit.title)
    setAuthor(bookToEdit.author)
    setDescription(bookToEdit.description)
    setReadingTime(bookToEdit.readingTime)
    setSelectedGenres(bookToEdit.genres)
    setCoverUrl(bookToEdit.cover || "")

    // Load book content
    const fetchContent = async () => {
      try {
        const content = await getBookContent(bookId)
        if (content) {
          setSummary(content.summary || "")
          setTakeaways(content.takeaways || "")
          setQuotes(content.quotes || "")
        } else {
          toast({
            title: "No Content Found",
            description: "This book doesn't have any content yet.",
            variant: "default",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load book content.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  } else {
    toast({
      title: "Book Not Found",
      description: "The book you're trying to edit doesn't exist.",
      variant: "destructive",
    })
    router.push("/booklist")
  }
}, [bookToEdit, bookId, router, toast])

  const addGenre = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  const removeGenre = (genre: string) => {
    setSelectedGenres(selectedGenres.filter((g) => g !== genre))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  // Validation
  if (!title || !author || !description || selectedGenres.length === 0) {
    toast({
      title: "Missing Information",
      description: "Please fill in all required fields and select at least one genre.",
      variant: "destructive",
    })
    setIsSubmitting(false)
    return
  }

  try {
    const updated = await updateBookAndContent({
      id: bookId,
      title,
      author,
      description,
      genres: selectedGenres,
      readingTime: readingTime || "10 min read",
      cover: coverUrl || "/placeholder.svg?height=400&width=300",
      summary,
      takeaways,
      quotes,
    })

    if (updated) {
      toast({
        title: "Book Updated Successfully!",
        description: `"${title}" has been updated.`,
        variant: "default",
      })

      setTimeout(() => {
        router.push("/booklist")
      }, 1500)
    }
  } catch (error) {
    console.error("Error updating book:", error)
    toast({
      title: "Update Failed",
      description: "An error occurred while updating the book. Please try again.",
      variant: "destructive",
    })
  } finally {
    setIsSubmitting(false)
  }
}

  const sampleTakeaway = `## 1. Embrace the Power of Small Changes

The most significant transformations come from consistent, small improvements rather than dramatic overhauls. Focus on making 1% improvements daily rather than seeking overnight success.

> **Action Step:** Identify one small habit you can improve by just 1% today and commit to it for the next week.`

  const sampleQuote = `> "You do not rise to the level of your goals. You fall to the level of your systems."

### What this means:
This quote emphasizes that achieving success isn't about setting ambitious goals, but about creating reliable systems and processes. Your daily habits and routines determine your outcomes more than your aspirations.

### Apply it:
Instead of just setting a goal to "get fit," create a system like "go to the gym every Monday, Wednesday, and Friday at 7 AM."`

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading book details...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Edit Book</h1>
              <p className="text-muted-foreground">Update "{bookToEdit?.title}" with new content using Markdown</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>Update the basic details about the book</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Book Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a brief description of the book"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="readingTime">Reading Time</Label>
                    <Input
                      id="readingTime"
                      value={readingTime}
                      onChange={(e) => setReadingTime(e.target.value)}
                      placeholder="e.g., 10 min read"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverUrl">Cover Image URL</Label>
                    <Input
                      id="coverUrl"
                      value={coverUrl}
                      onChange={(e) => setCoverUrl(e.target.value)}
                      placeholder="Enter cover image URL (optional)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Genres *</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedGenres.map((genre) => (
                      <Badge key={genre} variant="secondary" className="capitalize">
                        {genre}
                        <button
                          type="button"
                          onClick={() => removeGenre(genre)}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={addGenre}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genres" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableGenres
                        .filter((genre) => !selectedGenres.includes(genre))
                        .map((genre) => (
                          <SelectItem key={genre} value={genre} className="capitalize">
                            {genre}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Full Summary</CardTitle>
                <CardDescription>Update the comprehensive summary using Markdown formatting</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="write" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="write" className="space-y-2">
                    <Textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Write a detailed summary using Markdown formatting...

Example:
# Overview
The book presents a compelling narrative that challenges conventional thinking...

## Core Principles
- **Principle 1**: Description here
- **Principle 2**: Another key point

### Key Insights
> Important quote or insight

**Bold text** for emphasis, *italic text* for subtle emphasis."
                      rows={12}
                      className="min-h-[300px] font-mono text-sm"
                    />
                  </TabsContent>
                  <TabsContent value="preview" className="space-y-2">
                    <div className="min-h-[300px] p-4 border rounded-md bg-muted/30">
                      {summary ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown>{summary}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-muted-foreground italic">Preview will appear here...</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Key Takeaways */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Key Takeaways
                </CardTitle>
                <CardDescription>Update actionable insights using Markdown formatting</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="write" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="write">
                    <Textarea
                      value={takeaways}
                      onChange={(e) => setTakeaways(e.target.value)}
                      placeholder={`Write your key takeaways in Markdown format...

Example:
${sampleTakeaway}`}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="min-h-[200px] p-4 border rounded-md bg-muted/30">
                      {takeaways ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown>{takeaways}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-muted-foreground italic">Preview will appear here...</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Quotes & Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QuoteIcon className="w-5 h-5" />
                  Quotes & Insights
                </CardTitle>
                <CardDescription>Update memorable quotes with explanations using Markdown</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="write" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="write">
                    <Textarea
                      value={quotes}
                      onChange={(e) => setQuotes(e.target.value)}
                      placeholder={`Write your quotes and insights in Markdown format...

Example:
${sampleQuote}`}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="min-h-[200px] p-4 border rounded-md bg-muted/30">
                      {quotes ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown>{quotes}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-muted-foreground italic">Preview will appear here...</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Separator />

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Book
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

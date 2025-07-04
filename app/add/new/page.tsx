"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, BookOpen, Plus, X, Save, Lightbulb, QuoteIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import ReactMarkdown from "react-markdown"

interface Takeaway {
  id: string
  content: string
}

interface Quote {
  id: string
  content: string
}

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

export default function AddNewBookPage() {
  const router = useRouter()
  const { toast } = useToast()

  // Basic book info
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [readingTime, setReadingTime] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [coverUrl, setCoverUrl] = useState("")

  // Summary content
  const [summary, setSummary] = useState("")

  // Key takeaways
  const [takeaways, setTakeaways] = useState<Takeaway[]>([{ id: "1", content: "" }])

  // Quotes
  const [quotes, setQuotes] = useState<Quote[]>([{ id: "1", content: "" }])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const addGenre = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  const removeGenre = (genre: string) => {
    setSelectedGenres(selectedGenres.filter((g) => g !== genre))
  }


  const removeTakeaway = (id: string) => {
    if (takeaways.length > 1) {
      setTakeaways(takeaways.filter((t) => t.id !== id))
    }
  }

  const updateTakeaway = (id: string, content: string) => {
    setTakeaways(takeaways.map((t) => (t.id === id ? { ...t, content } : t)))
  }

  const removeQuote = (id: string) => {
    if (quotes.length > 1) {
      setQuotes(quotes.filter((q) => q.id !== id))
    }
  }

  const updateQuote = (id: string, content: string) => {
    setQuotes(quotes.map((q) => (q.id === id ? { ...q, content } : q)))
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

    // Simulate saving (in a real app, this would be an API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newBook = {
        id: Date.now().toString(),
        title,
        author,
        description,
        genres: selectedGenres,
        readingTime: readingTime || "10 min read",
        cover: coverUrl || "/placeholder.svg?height=400&width=300",
        summary,
        takeaways: takeaways.filter((t) => t.content.trim()),
        quotes: quotes.filter((q) => q.content.trim()),
      }

      // In a real app, you would save this to your database
      console.log("New book created:", newBook)

      toast({
        title: "Book Added Successfully!",
        description: `"${title}" has been added to the library.`,
      })

      // Redirect to dashboard after successful creation
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the book. Please try again.",
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
              <h1 className="text-3xl font-bold">Add New Book</h1>
              <p className="text-muted-foreground">
                Create a comprehensive book summary with takeaways and quotes using Markdown
              </p>
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
                <CardDescription>Enter the basic details about the book</CardDescription>
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
                <CardDescription>Write a comprehensive summary using Markdown formatting</CardDescription>
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
                <CardDescription>Add actionable insights using Markdown formatting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {takeaways.map((takeaway, index) => (
                  <div key={takeaway.id} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Takeaway #{index + 1}</h4>
                      {takeaways.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeTakeaway(takeaway.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <Tabs defaultValue="write" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="write">Write</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="write">
                        <Textarea
                          value={takeaway.content}
                          onChange={(e) => updateTakeaway(takeaway.id, e.target.value)}
                          placeholder={`Write your takeaway in Markdown format...

Example:
${sampleTakeaway}`}
                          rows={8}
                          className="font-mono text-sm"
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        <div className="min-h-[200px] p-4 border rounded-md bg-muted/30">
                          {takeaway.content ? (
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              <ReactMarkdown>{takeaway.content}</ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-muted-foreground italic">Preview will appear here...</p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quotes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QuoteIcon className="w-5 h-5" />
                  Quotes & Insights
                </CardTitle>
                <CardDescription>Add memorable quotes with explanations using Markdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {quotes.map((quote, index) => (
                  <div key={quote.id} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Quote #{index + 1}</h4>
                      {quotes.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeQuote(quote.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <Tabs defaultValue="write" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="write">Write</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="write">
                        <Textarea
                          value={quote.content}
                          onChange={(e) => updateQuote(quote.id, e.target.value)}
                          placeholder={`Write your quote and explanation in Markdown format...

Example:
${sampleQuote}`}
                          rows={8}
                          className="font-mono text-sm"
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        <div className="min-h-[200px] p-4 border rounded-md bg-muted/30">
                          {quote.content ? (
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              <ReactMarkdown>{quote.content}</ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-muted-foreground italic">Preview will appear here...</p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                ))}

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
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Add Book
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

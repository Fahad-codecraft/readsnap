"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import BookGrid from "@/components/book-grid"
import SearchAndFilter from "@/components/search-and-filter"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Book Summaries</h1>
          <p className="text-muted-foreground">Read comprehensive summaries of books in minutes</p>
        </div>

        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />

        <BookGrid searchQuery={searchQuery} selectedGenre={selectedGenre} />
      </main>
    </div>
  )
}

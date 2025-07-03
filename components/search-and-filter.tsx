"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchAndFilterProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedGenre: string
  setSelectedGenre: (genre: string) => void
}

const genres = [
  { value: "all", label: "All Genres" },
  { value: "business", label: "Business" },
  { value: "self-help", label: "Self Help" },
  { value: "psychology", label: "Psychology" },
  { value: "productivity", label: "Productivity" },
  { value: "leadership", label: "Leadership" },
  { value: "finance", label: "Finance" },
  { value: "health", label: "Health" },
  { value: "technology", label: "Technology" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  { value: "management", label: "Management" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "history", label: "History" },
  { value: "science", label: "Science" },
  { value: "philosophy", label: "Philosophy" },
  { value: "spirituality", label: "Spirituality" },
  { value: "education", label: "Education" },
  { value: "anthropology", label: "Anthropology" },
]

export default function SearchAndFilter({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
}: SearchAndFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search books by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={selectedGenre} onValueChange={setSelectedGenre}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter by genre" />
        </SelectTrigger>
        <SelectContent>
          {genres.map((genre) => (
            <SelectItem key={genre.value} value={genre.value}>
              {genre.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

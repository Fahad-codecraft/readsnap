export interface Book {
  id: string
  title: string
  author: string
  cover: string
  genres: string[] // Changed from genre to genres array
  tags: string[]
  description: string
  readingTime: string
}

export const books: Book[] = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/placeholder.svg?height=400&width=300",
    genres: ["self-help", "productivity"],
    tags: ["Habits", "Productivity", "Self-Improvement"],
    description:
      "An Easy & Proven Way to Build Good Habits & Break Bad Ones. This book provides a practical framework for improving every day through small, incremental changes.",
    readingTime: "8 min read",
  },
  {
    id: "2",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    cover: "/placeholder.svg?height=400&width=300",
    genres: ["business", "leadership", "self-help"],
    tags: ["Leadership", "Personal Development", "Success"],
    description:
      "A comprehensive guide to personal and professional effectiveness based on timeless principles of fairness, integrity, and human dignity.",
    readingTime: "12 min read",
  },
  {
    id: "3",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    cover: "/placeholder.svg?height=400&width=300",
    genres: ["finance", "self-help"],
    tags: ["Wealth", "Success", "Mindset"],
    description:
      "The classic guide to achieving financial success through the power of thought and personal achievement philosophy.",
    readingTime: "10 min read",
  },
  {
    id: "4",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    cover: "/placeholder.svg?height=400&width=300",
    genres: ["psychology", "spirituality"],
    tags: ["Mindfulness", "Spirituality", "Present Moment"],
    description: "A guide to spiritual enlightenment that teaches the importance of living in the present moment.",
    readingTime: "9 min read",
  },
  {
    id: "5",
    title: "Good to Great",
    author: "Jim Collins",
    cover: "/placeholder.svg?height=400&width=300",
    genres: ["business", "leadership", "management"],
    tags: ["Leadership", "Management", "Strategy"],
    description: "Why some companies make the leap from good to great while others don't, based on extensive research.",
    readingTime: "11 min read",
  },
  {
    id: "6",
    title: "The Lean Startup",
    author: "Eric Ries",
    cover: "/placeholder.svg?height=400&width=300",
    genres: ["business", "entrepreneurship", "technology"],
    tags: ["Entrepreneurship", "Innovation", "Startup"],
    description: "How today's entrepreneurs use continuous innovation to create radically successful businesses.",
    readingTime: "9 min read",
  },
  {
    id: "7",
    title: "Mindset",
    author: "Carol S. Dweck",
    cover: "/placeholder.svg?height=400&width=300",
    genres: ["psychology", "education"],
    tags: ["Growth Mindset", "Learning", "Psychology"],
    description: "The new psychology of success that shows how we can learn to fulfill our potential.",
    readingTime: "8 min read",
  },
  {
    id: "8",
    title: "Deep Work",
    author: "Cal Newport",
    cover: "/placeholder.svg?height=400&width=300",
    genres: ["productivity", "business"],
    tags: ["Focus", "Productivity", "Work"],
    description: "Rules for focused success in a distracted world, teaching how to master the art of deep work.",
    readingTime: "10 min read",
  },
  {
    id: "9",
    title: "The 4-Hour Workweek",
    author: "Timothy Ferriss",
    cover: "/placeholder.svg?height=400&width=300",
    genres: ["productivity", "lifestyle", "business"],
    tags: ["Lifestyle", "Automation", "Freedom"],
    description: "Escape 9-5, live anywhere, and join the new rich through lifestyle design and automation.",
    readingTime: "11 min read",
  },
  {
    id: "10",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "/placeholder.svg?height=400&width=300",
    genres: ["history", "science", "anthropology"],
    tags: ["History", "Anthropology", "Evolution"],
    description: "A brief history of humankind, exploring how Homo sapiens came to dominate the world.",
    readingTime: "15 min read",
  },
  {
    id: "11",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    cover: "/placeholder.svg?height=400&width=300",
    genres: ["self-help", "philosophy"],
    tags: ["Philosophy", "Life Advice", "Happiness"],
    description: "A counterintuitive approach to living a good life by focusing on what truly matters.",
    readingTime: "7 min read",
  },
  {
    id: "12",
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    cover: "/placeholder.svg?height=400&width=300",
    genres: ["psychology", "business", "self-help"],
    tags: ["Emotions", "Intelligence", "Relationships"],
    description: "Why emotional intelligence matters more than IQ for success in life and work.",
    readingTime: "9 min read",
  },
]

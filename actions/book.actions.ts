"use server"
import { prisma } from "@/lib/prisma"

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

export interface UpdateBook {
  id: string;
  title: string;
  author: string;
  description: string;
  genres: string[];
  readingTime?: string;
  cover?: string;
  summary: string;
  takeaways: string;
  quotes: string;
}

export async function getAllBooks(): Promise<Book[]> {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        title: 'asc'
      }
    })
    return books
  } catch (error) {
    console.error('Error fetching books:', error)
    throw new Error('Failed to fetch books')
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: id
      }
    })
    return book
  } catch (error) {
    console.error('Error fetching book:', error)
    throw new Error('Failed to fetch book')
  }
}

interface CreateBookInput {
  title: string
  author: string
  description: string
  genres: string[]
  cover: string
  readingTime: string
  summary: string
  takeaways: string
  quotes: string
}


export async function createBook(data: CreateBookInput): Promise<Book> {
  try {
    const content = await prisma.content.create({
      data: {
        summary: data.summary,
        takeaways: data.takeaways,
        quotes: data.quotes,
        bookId: "TEMP", // will update after Book creation
      },
    })

    const book = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        description: data.description,
        genres: data.genres,
        cover: data.cover,
        readingTime: data.readingTime,
        contentId: content.id,
      },
    })

    // Update content to link back with the real book ID (optional if you don't enforce foreign key in both directions)
    await prisma.content.update({
      where: { id: content.id },
      data: { bookId: book.id },
    })

    return book
  } catch (error) {
    console.error("Error creating book:", error)
    throw new Error("Failed to create book")
  }
}

export async function getBookContent(bookId: string): Promise<{
  summary: string;
  takeaways: string;
  quotes: string;
} | null> {
  try {
    // First, get the book to find the contentId
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
      select: {
        contentId: true,
      },
    });

    if (!book?.contentId) return null;

    // Then, fetch the content using contentId
    const content = await prisma.content.findUnique({
      where: {
        id: book.contentId,
      },
      select: {
        summary: true,
        takeaways: true,
        quotes: true,
      },
    });

    return content;
  } catch (error) {
    console.error("Error fetching book content:", error);
    return null;
  }
}

export async function updateBookAndContent({
  id,
  title,
  author,
  description,
  genres,
  readingTime,
  cover,
  summary,
  takeaways,
  quotes,
}: UpdateBook) {
  try {
    // Step 1: Fetch existing book to get contentId
    const existingBook = await prisma.book.findUnique({
      where: { id },
      select: { contentId: true },
    });

    if (!existingBook) {
      throw new Error("Book not found.");
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        description,
        genres,
        readingTime,
        cover,
      },
    });

    const updatedContent = await prisma.content.update({
      where: { id: existingBook.contentId ?? undefined },
      data: {
        summary,
        takeaways,
        quotes,
      },
    });

    return {
      book: updatedBook,
      content: updatedContent,
    };
  } catch (error) {
    console.error("Error updating book and content:", error);
    throw new Error("Failed to update book and its content.");
  }
}

export async function deleteBook(id: string): Promise<void> {
  try {
    await prisma.book.delete({
      where: {
        id: id
      }
    })
    await prisma.content.deleteMany({
      where: {
        bookId: id
      }
    })
  } catch (error) {
    console.error('Error deleting book:', error)
    throw new Error('Failed to delete book')
  }
}

export async function searchBooks(query: string): Promise<Book[]> {
  try {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            author: {
              contains: query,
              mode: 'insensitive'
            }
          },
        ]
      },
      orderBy: {
        title: 'asc'
      }
    })
    return books
  } catch (error) {
    console.error('Error searching books:', error)
    throw new Error('Failed to search books')
  }
}

export async function getBooksByGenre(genre: string): Promise<Book[]> {
  try {
    const books = await prisma.book.findMany({
      where: {
        genres: {
          has: genre
        }
      },
      orderBy: {
        title: 'asc'
      }
    })
    return books
  } catch (error) {
    console.error('Error fetching books by genre:', error)
    throw new Error('Failed to fetch books by genre')
  }
}

export async function getBooksByQueryAndGenre(query: string, genre: string): Promise<Book[]> {
  try {
    const books = await prisma.book.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { author: { contains: query, mode: 'insensitive' } }
            ]
          },
          genre !== 'all' ? { genres: { has: genre } } : {}
        ]
      },
      orderBy: { title: 'asc' }
    })
    return books
  } catch (error) {
    console.error("Error searching books:", error)
    throw new Error("Failed to search books")
  }
}



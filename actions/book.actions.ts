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

export async function createBook(bookData: Omit<Book, 'id'>): Promise<Book> {
  try {
    const book = await prisma.book.create({
      data: bookData
    })
    return book
  } catch (error) {
    console.error('Error creating book:', error)
    throw new Error('Failed to create book')
  }
}

export async function updateBook(id: string, bookData: Partial<Omit<Book, 'id'>>): Promise<Book> {
  try {
    const book = await prisma.book.update({
      where: {
        id: id
      },
      data: bookData
    })
    return book
  } catch (error) {
    console.error('Error updating book:', error)
    throw new Error('Failed to update book')
  }
}

export async function deleteBook(id: string): Promise<void> {
  try {
    await prisma.book.delete({
      where: {
        id: id
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
          {
            description: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            tags: {
              hasSome: [query]
            }
          },
          {
            genres: {
              hasSome: [query]
            }
          }
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

export async function getBooksByTag(tag: string): Promise<Book[]> {
  try {
    const books = await prisma.book.findMany({
      where: {
        tags: {
          has: tag
        }
      },
      orderBy: {
        title: 'asc'
      }
    })
    return books
  } catch (error) {
    console.error('Error fetching books by tag:', error)
    throw new Error('Failed to fetch books by tag')
  }
}


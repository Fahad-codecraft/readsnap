import { PrismaClient } from '@prisma/client'
import { books } from '../lib/mock-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  
  // Clear existing data
  await prisma.book.deleteMany()
  
  // Insert seed data
  for (const book of books) {
    const createdBook = await prisma.book.create({
      data: {
        id: book.id,
        title: book.title,
        author: book.author,
        cover: book.cover,
        genres: book.genres,
        tags: book.tags,
        description: book.description,
        readingTime: book.readingTime,
      },
    })
    console.log(`Created book with id: ${createdBook.id}`)
  }
  
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


// app/books/[id]/edit/page.tsx
import { getBookById } from "@/actions/book.actions"
import { notFound } from "next/navigation"
import EditClientBook from "./client"

interface EditBookPageProps {
  params: {
    id: string
  }
}

export default async function EditBookPage({ params }: EditBookPageProps) {
  const {id} = await params
  const book = await getBookById(id)

  if (!book) {
    return notFound()
  }

  return <EditClientBook book={book} id={id}/>
}

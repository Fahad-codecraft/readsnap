import { getBookById } from "@/actions/book.actions";
import SummaryReaderClient from "./client";

type SummaryReaderPageProps = {
  params: { id: string }
  searchParams: { type?: string }
}

export default async function SummaryReaderPage({ params, searchParams }: SummaryReaderPageProps) {
  const {id} = await params;
  const searchParam = await searchParams
  const book = await getBookById(id)

  if (!book) {
    return <div className="p-10">Book not found</div>
  }

  return (
    <SummaryReaderClient book={book} contentType={searchParam.type || "summary"} />
  )
}
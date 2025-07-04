import { getBookById } from "@/actions/book.actions";
import SummaryReaderClient from "./client";
import { getBookContent } from "@/actions/book.actions";

type SummaryReaderPageProps = {
  params: { id: string }
  searchParams: { type?: string }
}

export default async function SummaryReaderPage({ params, searchParams }: SummaryReaderPageProps) {
  const {id} = await params;
  const searchParam = await searchParams
  const book = await getBookById(id)
  const content = await getBookContent(id);
  const contentType = searchParam.type || "summary";


  if (!book || !content) {
    return <div className="p-10">Book not found</div>
  }

  return (
    <SummaryReaderClient book={book} content={content} contentType={contentType} />
  )
}
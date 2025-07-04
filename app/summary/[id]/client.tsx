"use client"

import { useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Lightbulb, Quote } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import ReadingProgress from "@/components/reading-progress"
import ReactMarkdown from "react-markdown"



export default function SummaryReaderClient({
  book,
  content,
  contentType,
}: {
  book: any;
  content: { summary: string; takeaways: string; quotes: string };
  contentType: string;
}) {
  const contentRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const getContentTypeInfo = () => {
    switch (contentType) {
      case "takeaways":
        return { title: "Key Takeaways", icon: Lightbulb };
      case "quotes":
        return { title: "Quotes & Insights", icon: Quote };
      default:
        return { title: "Full Summary", icon: BookOpen };
    }
  };

  const renderFullSummary = () => {
    return (
      <div className="prose prose-lg dark:prose-invert reading:prose-serif max-w-none">
        <ReactMarkdown>{content.summary}</ReactMarkdown>
      </div>
    );
  };

  const renderKeyTakeaways = () => {
    return (
      <div className="prose prose-lg dark:prose-invert reading:prose-serif max-w-none">
        <ReactMarkdown>{content.takeaways}</ReactMarkdown>
      </div>
    );
  };

  const renderQuotes = () => {
    return (
      <div className="prose prose-lg dark:prose-invert reading:prose-serif max-w-none">
        <ReactMarkdown>{content.quotes}</ReactMarkdown>
      </div>
    );
  };

  const renderContent = () => {
    switch (contentType) {
      case "takeaways":
        return renderKeyTakeaways();
      case "quotes":
        return renderQuotes();
      default:
        return renderFullSummary();
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Book not found</h1>
            <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  const contentInfo = getContentTypeInfo();
  const IconComponent = contentInfo.icon;

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress contentRef={contentRef} />

      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 mt-1">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <IconComponent className="w-5 h-5 text-primary" />
              <div>
                <h1 className="font-semibold">{book.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {contentInfo.title} • by {book.author}
                </p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" ref={contentRef}>
        <article className="max-w-3xl mx-auto">
          <div className="reading-text space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <IconComponent className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold m-0">{contentInfo.title}</h2>
            </div>

            {renderContent()}
          </div>
        </article>
      </main>
    </div>
  );
}

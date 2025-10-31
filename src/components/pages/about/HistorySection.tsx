import { RichTextRenderer } from "@/components/shared/richtext/RichTextRenderer"
import { Card, CardContent } from "@/components/ui/card"
import type { PortableTextBlock } from "@/types/sanity/portableText"
import Image from "next/image"
type HistorySectionProps = {
  content?: PortableTextBlock[]
  historyImage: {
    url: string
    alt?: string
    width: number
    height: number
  }
}
export function HistorySection({ 
  content, 
  historyImage
}: HistorySectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center">
          {/* Contenu Rich Text */}
          <div className="flex justify-center items-center">
            {content && <RichTextRenderer content={content} />}
          </div>
          {historyImage && (
            <Card className="w-full h-auto min-w-80 max-h-128 max-w-128 p-0 overflow-hidden flex justify-center items-center group">
              <CardContent className="p-0 relative w-full h-full">
                <Image 
                  src={historyImage.url} 
                  alt={historyImage.alt || 'Image historique'} 
                  width={historyImage.width} 
                  height={historyImage.height} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" 
                  />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

import { RichTextRenderer } from "@/components/shared/richtext/RichTextRenderer"
import type { PortableTextBlock } from "@/types/sanity/portableText"


type ValuesSectionProps = {
  content?: PortableTextBlock[]
}

export function ValuesSection({ content }: ValuesSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {content && <RichTextRenderer content={content} />}
      </div>
    </section>
  )
}

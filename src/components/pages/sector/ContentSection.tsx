// 📂 src/components/pages/sector/ContentSection.tsx
// 👉 Section de contenu Portable Text pour les pages secteurs

import type { PortableTextBlock } from '@/types/sanity/sectorPage'
import { PortableText } from '@portabletext/react'

export interface ContentSectionProps {
  content: PortableTextBlock[]
}

export function ContentSection({ content }: ContentSectionProps) {
  if (!content || content.length === 0) return null

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <PortableText value={content} />
      </div>
    </section>
  )
}


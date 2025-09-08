import { RichTextRenderer } from "@/components/RichTextRenderer"
import { RichTextBlock } from "@/types/richText"
import Image from "next/image"

// Données temporaires - seront remplacées par Sanity
const historyContent = [
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Notre Histoire'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Fondée en 2006 par Madame Piccant Amel, la garderie a été reprise en février 2008 par Monsieur Witzig. Après une période de mise en conformité et de réinvestissement, des améliorations ont été apportées, notamment un nouveau programme pédagogique et des plans d\'hygiène.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'En 2016, des investissements majeurs ont été réalisés pour rénover les espaces intérieurs et le jardin, incluant l\'installation de plaques amortissantes suite à la canicule de 2015.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Aujourd\'hui, la Garderie Les P\'tits Loups continue d\'évoluer pour offrir le meilleur environnement possible aux enfants et à leurs familles.'
      }
    ]
  }
]

type HistorySectionProps = {
  content?: RichTextBlock[]
  imageUrl?: string
}

export function HistorySection({ 
  content = historyContent,
  imageUrl = "/jardin.webp"
}: HistorySectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Contenu Rich Text */}
          <div className="order-2 lg:order-1">
            <RichTextRenderer content={content} />
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={imageUrl} 
                alt="Histoire de la garderie" 
                fill
                className="object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

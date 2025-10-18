import { RichTextRenderer } from "@/components/shared"
import { RichTextBlock } from "@/types/richText"

// Données temporaires - seront remplacées par Sanity
const pedagogyContent = [
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Nos Fondements Pédagogiques'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Notre approche pédagogique repose sur des fondements solides qui favorisent l\'épanouissement et le développement harmonieux de chaque enfant.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'Pédagogie Active'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Nous mettons l\'accent sur une pédagogie active, permettant à l\'enfant d\'apprendre à son rythme et selon ses propres besoins.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'Horaire Structuré'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Un horaire structuré avec des rituels et des ateliers créatifs est mis en place pour préparer les enfants à l\'école.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'Préparation à l\'École'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Nos activités favorisent l\'autonomie et le développement harmonieux, préparant ainsi les enfants à leur entrée à l\'école.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'Routines Sécurisantes'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Les éducatrices instaurent des routines pour offrir un cadre sécurisant, favorisant le bien-être et la confiance des enfants.'
      }
    ]
  }
]

// Citation en bas de page
const quoteContent = [
  {
    _type: 'block',
    style: 'blockquote',
    children: [
      {
        _type: 'span',
        text: 'Arrêtez de parler moins fort!'
      },
      {
        _type: 'span',
        text: 'Guillaume - 4 ans',
        author: 'Guillaume - 4 ans'
      }
    ]
  }
]

type PedagogySectionProps = {
  content?: RichTextBlock[]
  quoteContent?: RichTextBlock[]
}

export function PedagogySection({ 
  content = pedagogyContent,
  quoteContent: quote = quoteContent
}: PedagogySectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-bg-light">
      <div className="max-w-4xl mx-auto">
        <RichTextRenderer content={content} />
        
        {/* Citation en bas de section */}
        <div className="mt-12 flex justify-center max-w-2xl mx-auto">
          <RichTextRenderer content={quote} />
        </div>
      </div>
    </section>
  )
}

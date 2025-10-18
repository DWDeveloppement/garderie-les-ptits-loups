import { RichTextRenderer } from "@/components/shared"
import { RichTextBlock } from "@/types/richText"

// Données temporaires - seront remplacées par Sanity
const valuesContent = [
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Nos Valeurs Institutionnelles'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Nos valeurs fondamentales guident notre approche pédagogique et notre relation avec les enfants et leurs familles.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'Le Respect'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Assurer le bien-vivre ensemble en respectant les autres, le matériel et soi-même.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'La Sécurité'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Garantir la sécurité physique, psychique et affective des enfants pour favoriser leur développement.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'Le Partenariat avec les familles'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Créer une relation de confiance avec les parents pour assurer une continuité entre la maison et la garderie.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'La Relation individualisée'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Adapter l\'accompagnement aux besoins spécifiques de chaque enfant et de sa famille.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'La Cohérence et la Communication'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Assurer une communication efficace au sein de l\'équipe pour offrir un cadre cohérent aux enfants.'
      }
    ]
  }
]

type ValuesSectionProps = {
  content?: RichTextBlock[]
}

export function ValuesSection({ content = valuesContent }: ValuesSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <RichTextRenderer content={content} />
      </div>
    </section>
  )
}

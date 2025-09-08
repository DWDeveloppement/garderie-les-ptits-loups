import { RichTextRenderer } from "@/components/RichTextRenderer"
import { RichTextBlock } from "@/types/richText"

// Données temporaires - seront remplacées par Sanity
const teamContent = [
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Notre Équipe'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Notre équipe éducative est composée de six personnes qualifiées, soutenues par une intendante, un directeur administratif et une directrice pédagogique. Des places de stage sont également proposées tout au long de l\'année.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'L\'équipe, actuellement féminine, valorise le respect mutuel, la communication transparente, la remise en question constructive et la formation continue.'
      }
    ]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Cette approche collaborative permet d\'offrir un environnement cohérent et bienveillant pour l\'épanouissement de chaque enfant.'
      }
    ]
  }
]

type TeamSectionProps = {
  content?: RichTextBlock[]
}

export function TeamSection({ content = teamContent }: TeamSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-bg-light">
      <div className="max-w-4xl mx-auto">
        <RichTextRenderer content={content} />
      </div>
    </section>
  )
}

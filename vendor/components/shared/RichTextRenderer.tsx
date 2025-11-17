import { Card, CardContent } from "@/components/ui/card"
import { RichTextBlock } from "@/types/richText"
import { Quote } from "lucide-react"
import Image from "next/image"

type RichTextRendererProps = {
  content: RichTextBlock[]
  className?: string
}

export function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  if (!content || content.length === 0) {
    return null
  }

  const renderBlock = (block: RichTextBlock, index: number) => {
    const { _type, children, style } = block

    // Gestion des citations avec design spécifique
    if (_type === 'block' && style === 'blockquote') {
      // Séparer le texte de la citation de l'auteur
      const quoteText = children?.[0]?.text || ''
      const author = children?.[1]?.text || ''
      
      return (
				<Card key={index} className='!flex flex-col justify-center items-center relative w-full max-w-2xl mx-auto !pt-12 mt-32 mb-8 bg-purple-2 border-purple-6 shadow-lg !overflow-visible !contain-none'>
					{/* Icône de citation centrée en haut */}
					<div className='absolute -top-12 left-1/2 -translate-x-1/2 flex justify-center items-center'>
						<Quote className='p-4 h-24 w-24 text-purple-9 rounded-full bg-purple-2 border-purple-9 border-4' />
					</div>

					<CardContent className='p-6 text-center'>
						{/* Texte de la citation */}
						<blockquote className='text-2xl italic text-purple-11 leading-relaxed mb-4'>{quoteText}</blockquote>

						{/* Auteur de la citation */}
						{author && <cite className='block text-md font-semibold text-purple-10 not-italic'>— {author}</cite>}
					</CardContent>
				</Card>
			)
    }

    // Gestion des titres
    if (_type === 'block' && style?.startsWith('h')) {
      const HeadingTag = style as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return (
        <HeadingTag key={index} className="text-orange-12 font-bold mb-4 mt-8 first:mt-0">
          {children?.map((child, childIndex) => (
            <span key={childIndex}>
              {child.text}
            </span>
          ))}
        </HeadingTag>
      )
    }

    // Gestion des paragraphes
    if (_type === 'block' && (!style || style === 'normal')) {
      return (
        <p key={index} className="text-orange-11 leading-relaxed mb-4">
          {children?.map((child, childIndex) => {
            let textElement: React.ReactNode = child.text
            
            // Gestion des marques (gras, italique, etc.)
            if (child.marks) {
              child.marks.forEach(mark => {
                if (mark === 'strong') {
                  textElement = <strong key={childIndex} className="font-semibold text-orange-12">{textElement}</strong>
                } else if (mark === 'em') {
                  textElement = <em key={childIndex} className="italic">{textElement}</em>
                }
              })
            }
            
            return <span key={childIndex}>{textElement}</span>
          })}
        </p>
      )
    }

    // Gestion des listes
    if (_type === 'block' && (style === 'bullet' || style === 'number')) {
      const ListTag = style === 'bullet' ? 'ul' : 'ol'
      return (
        <ListTag key={index} className={`mb-4 ${style === 'bullet' ? 'list-disc' : 'list-decimal'} ml-6`}>
          {children?.map((child, childIndex) => (
            <li key={childIndex} className="text-orange-11 leading-relaxed mb-2">
              {child.text}
            </li>
          ))}
        </ListTag>
      )
    }

    // Gestion des images (pour l'instant, placeholder)
    if (_type === 'image') {
      return (
        <div key={index} className="my-6">
          <Image 
            src="/jardin.webp" 
            alt="Image de contenu" 
            width={800}
            height={400}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )
    }

    // Fallback pour les autres types
    return (
      <div key={index} className="text-orange-11 leading-relaxed mb-4">
        {children?.map((child, childIndex) => (
          <span key={childIndex}>
            {child.text}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className={`rich-text-content ${className}`}>
      {content.map((block, index) => renderBlock(block, index))}
    </div>
  )
}

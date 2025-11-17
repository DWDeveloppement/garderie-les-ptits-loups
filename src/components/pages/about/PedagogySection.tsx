import { RichTextRenderer } from '@/components/shared/richtext/RichTextRenderer'
import type { PortableTextBlock } from '@/sanity/types/core/portableText'

type PedagogySectionProps = {
	content?: PortableTextBlock[]
	quoteContent?: PortableTextBlock[]
}

export function PedagogySection({ content, quoteContent }: PedagogySectionProps) {
	if (!content && !quoteContent) return null

	return (
		<section className='py-16 px-4 sm:px-6 lg:px-8 gradient-section-a'>
			<div className='max-w-6xl mx-auto'>
				{content && <RichTextRenderer content={content} />}

				{quoteContent && (
					<div className='mt-12 flex justify-center max-w-2xl mx-auto'>
						<RichTextRenderer content={quoteContent} />
					</div>
				)}
			</div>
		</section>
	)
}

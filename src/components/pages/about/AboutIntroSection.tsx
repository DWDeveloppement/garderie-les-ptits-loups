import { RichTextRenderer } from '@/components/shared/richtext/RichTextRenderer'
import { Card, CardContent } from '@/components/ui/card'
import type { PortableTextBlock } from '@/sanity/types/core/portableText'

type AboutIntroSectionProps = {
	content: PortableTextBlock[]
}

export function AboutIntroSection({ content }: AboutIntroSectionProps) {
	return (
		<section className='py-16 px-4 sm:px-6 lg:px-8 gradient-section-a'>
			<Card variant='primary' className='max-w-4xl mx-auto'>
				<CardContent className='p-8'>
					<RichTextRenderer content={content} />
				</CardContent>
			</Card>
		</section>
	)
}

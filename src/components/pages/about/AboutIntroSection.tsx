import { RichTextRenderer } from '@/components/shared/richtext/RichTextRenderer'
import { Card, CardContent } from '@/components/ui/card'
import type { PortableTextBlock } from '@/sanity/types/core/portableText'

type AboutIntroSectionProps = {
	content: PortableTextBlock[]
}

export function AboutIntroSection({ content }: AboutIntroSectionProps) {
	return (
		<section className='py-16 px-8 md:px-16 gradient-section-a'>
			<Card variant='primary' className='max-w-4xl mx-auto'>
				<CardContent className='p-0 sm:p-3 md:p-6'>
					<RichTextRenderer content={content} />
				</CardContent>
			</Card>
		</section>
	)
}

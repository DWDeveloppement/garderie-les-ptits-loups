import { RichTextRenderer } from '@/components/shared/richtext/RichTextRenderer'
import type { PortableTextBlock } from '@/sanity/types/core/portableText'

type TeamSectionProps = {
	content?: PortableTextBlock[]
}

export function TeamSection({ content }: TeamSectionProps) {
	return <section className='py-16 px-8 md:px-16 gradient-section-a'>{content && <RichTextRenderer content={content} />}</section>
}

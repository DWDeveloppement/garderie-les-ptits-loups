import { RichTextRenderer } from '@/components/shared/richtext/RichTextRenderer'
import type { PortableTextBlock } from '@/sanity/types/core/portableText'

type ValuesSectionProps = {
	content?: PortableTextBlock[]
}

export function ValuesSection({ content }: ValuesSectionProps) {
	return <section className='py-16 px-8 md:px-16 gradient-section-b'>{content && <RichTextRenderer content={content} />}</section>
}

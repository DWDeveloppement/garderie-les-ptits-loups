/**
 * Page Mentions Légales - Garderie Les P'tits Loups
 * Données depuis Sanity CMS
 */

import { RichTextRenderer } from '@/components/shared/richtext/RichTextRenderer'
import { Card, CardContent } from '@/components/ui/card'
import { getLegacyPageData } from '@/sanity/queries/legacyPage'
import { notFound } from 'next/navigation'

// ISR: Cache de 60s + revalidation on-demand (via webhook Sanity)
export const revalidate = 60

export const metadata = {
	title: "Mentions Légales | Garderie Les P'tits Loups",
	description: "Mentions légales de la Garderie Les P'tits Loups",
}

export default async function MentionsLegalesPage() {
	const data = await getLegacyPageData()

	if (!data) {
		notFound()
	}

	return (
		<section className='py-16 px-4 sm:px-6 lg:px-8 gradient-section-a'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-fl-3xl font-bold text-center mb-12 text-purple-9'>{data.title}</h1>
				{data.content && data.content.length > 0 && <RichTextRenderer content={data.content} className='rich-text-legacy' />}
			</div>
		</section>
	)
}

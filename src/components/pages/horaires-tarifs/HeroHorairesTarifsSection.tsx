'use client'

import { HeroGlobal } from '@/components/HeroGlobal'
type HeroAboutSectionProps = {
	title?: string
	description?: string
	imageUrl?: string
}

export function HeroHorairesTarifsSection({
	title = 'Horaires & Tarifs',
	description = '',
	imageUrl = '/jardin.webp',
}: HeroAboutSectionProps) {
	return <HeroGlobal title={title} description={description} imageUrl={imageUrl} />
}

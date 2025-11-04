import { Button } from '@/components/ui/button'
import type { HomePageData } from '@/types/queries/home'
import Image from 'next/image'

type HeroSectionProps = {
	sectionHero?: HomePageData['sectionHero']
}

export function HeroSection({ sectionHero }: HeroSectionProps) {
	// Valeurs par défaut avec fallbacks
	const title = sectionHero?.title || 'Bienvenue chez'
	const garderieName = sectionHero?.garderieName || "Les P'tits Loups"
	const description =
		sectionHero?.description ||
		"Un environnement chaleureux et sécurisé où votre enfant peut grandir, apprendre et s'épanouir avec joie dans notre garderie familiale."
	const logo = sectionHero?.logo
	const buttonText = sectionHero?.buttonText || 'Nous contacter'
	const buttonLink = sectionHero?.buttonLink || '/contact'

	// URL du logo (simple et direct)
	const logoUrl = logo?.asset?.url || '/logo-les-ptits-loups.webp'

	return (
		<section className='w-full relative min-h-[80vh] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 bg-gradient-to-br from-orange-2 to-purple-1 flex items-center'>
			<div className='max-w-7xl mx-auto w-full'>
				<div className='flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center'>
					{/* Contenu Gauche - Texte et Boutons */}
					<div className='flex flex-col flex-wrap items-center space-y-6 w-full md:max-w-[60%]'>
						<h1 className='font-bold leading-tight text-orange-11'>
							{title}
							<br />
							<span className='text-purple-9'>{garderieName}</span>
						</h1>

						<p className='leading-relaxed text-orange-11'>{description}</p>

						<Button size='xl' variant='default' asNextLink href={buttonLink || '/contact'} ariaLabel={`${buttonText} - ${garderieName}`}>
							{buttonText}
						</Button>
					</div>

					{/* Logo Droite */}
					<div className='flex justify-center lg:justify-end'>
						<Image
							src={logoUrl}
							alt={logo?.alt || `Logo Garderie ${garderieName}`}
							width={851}
							height={376}
							className='w-80 h-80 lg:w-96 lg:h-96 object-contain'
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

import { Button } from '@/ui/button'
import type { HomePageData } from '@/types/sanity/pages/home'
import Image from 'next/image'

type HeroSectionProps = {
	sectionHero?: HomePageData['sectionHero']
}

export function HeroSection({ sectionHero }: HeroSectionProps) {
	if (!sectionHero) return null

	const { title, garderieName, description, logo, buttonText } = sectionHero

	// URL du logo (simple et direct)
	const logoUrl = logo.asset.url

	return (
		<section className='w-full relative min-h-[80vh] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 bg-gradient-to-br from-orange-2 to-purple-1 flex items-center'>
			<div className='max-w-7xl mx-auto w-full'>
				<div className='flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center'>
					{/* Contenu Gauche - Texte et Boutons */}
					<div className='flex flex-col flex-wrap justify-center items-center gap-6 md:gap-12 w-full md:max-w-[60%]'>
						<h1 className='text-fl-3xl text-center leading-relaxed font-bold text-orange-11'>
							<span className='text-orange-11'>{title}</span>
							<br />
							<span className='text-purple-9'>{garderieName}</span>
						</h1>

						<p className='leading-relaxed text-fl-lg text-orange-11'>{description}</p>

						<Button size='xl' variant='default' asNextLink href='/contact' className='text-fl-base'>
							{buttonText}
						</Button>
					</div>

					{/* Logo Droite */}
					<div className='flex justify-center lg:justify-end'>
						<Image
							src={logoUrl}
							alt={logo.alt}
							width={851}
							height={376}
							className='w-120 h-70 object-contain'
							priority
							sizes='(max-width: 1024px) 100vw, 50vw'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

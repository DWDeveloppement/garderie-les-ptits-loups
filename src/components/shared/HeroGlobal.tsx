'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useScrollParallax } from '@/hooks/useScollParalax'
import Image from 'next/image'

type HeroGlobalProps = {
	title: string
	description?: string
	imageUrl?: string
	className?: string
}

export function HeroGlobal({ title, description, imageUrl = '/jardin.webp', className = '' }: HeroGlobalProps) {
	const { elementRef, imageTransform, textTransform, overlayOpacity } = useScrollParallax({
		speed: 20,
		scale: 0.1,
		textSpeed: -15,
		overlayIntensity: 0.3,
	})

	return (
		<section ref={elementRef} className={`relative h-150 overflow-hidden pt-20 ${className}`}>
			{/* Image de fond avec effet parallax */}
			<div
				className='absolute inset-0 transform'
				style={{
					transform: imageTransform,
					transition: 'transform 0.1s ease-out',
				}}>
				<Image src={imageUrl} alt={title} fill className='object-cover object-center' priority />
			</div>

			{/* Overlay semi-transparent */}
			<div
				className='absolute inset-0 bg-gradient-to-b from-orange-12/20 via-orange-12/30 to-orange-12/40'
				style={{
					backgroundColor: `rgba(var(--orange-12-rgb), ${overlayOpacity})`,
					transition: 'background-color 0.1s ease-out',
				}}
			/>

			{/* Contenu centré */}
			<div className='relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1
						className='font-bold mb-12 drop-shadow-lg'
						style={{
							transform: textTransform,
							transition: 'transform 0.1s ease-out',
						}}>
						{title}
					</h1>

					{description && (
						<Card variant='primary' size='lg' className='max-w-2xl mx-auto'>
							<CardContent className='p-6'>
								<p className='leading-relaxed'>{description}</p>
							</CardContent>
						</Card>
					)}
				</div>
			</div>

			{/* Effet de profondeur */}
			<div className='absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-purple-12/20 to-transparent' />
		</section>
	)
}

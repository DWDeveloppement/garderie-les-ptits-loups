'use client'
import { Card, CardContent } from '@/ui/card'
import { TestimonialsTypesProps } from '@/types/sanity/pages/testimonials'
import { Quote } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

type TestimonialsSectionProps = {
	testimonials: TestimonialsTypesProps[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isHovered, setIsHovered] = useState(false)

	const nextTestimonial = useCallback(() => {
		setCurrentIndex((prev) => (prev + 1) % testimonials.length)
	}, [testimonials.length])

	const goToTestimonial = (index: number) => {
		setCurrentIndex(index)
	}

	// Autoplay functionality
	useEffect(() => {
		if (!isHovered) {
			const interval = setInterval(() => {
				nextTestimonial()
			}, 4000) // Change slide every 4 seconds

			return () => clearInterval(interval)
		}
	}, [isHovered, nextTestimonial])

	return (
		<section className='py-16 px-8 md:px-16 gradient-section-a'>
			<div className='max-w-5xl mx-auto'>
				<div className='text-center mb-12'>
					<h2 className='font-bold mb-8'>Ce que disent les parents</h2>
					<p className='max-w-3xl mx-auto'>La confiance des familles est notre plus belle récompense. Découvrez leurs témoignages.</p>
				</div>

				{/* Slider Container */}
				<div
					className='relative'
					role='region'
					aria-label='Slider de témoignages'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-500 ease-in-out'
							style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
							{testimonials.map((testimonial) => (
								<div key={testimonial.id} className='w-full flex-shrink-0 px-4'>
									<Card role='article' variant='secondary' className='backdrop-blur-sm max-w-3xl mx-auto'>
										<CardContent className='flex flex-col items-center justify-center gap-4 p-4 text-center'>
											<div className='flex justify-center mb-6'>
												<Quote className='h-16 w-16 text-purple-9' />
											</div>
											<h3 className='font-medium text-fl-xl'>{testimonial.title}</h3>
											<p className='leading-relaxed mb-8 italic'>&quot;{testimonial.content}&quot;</p>
											{/* Le rating sera temporairement commenté */}
											{/* {testimonial.rating && (
												<div className='flex items-center justify-center mb-6'>
													{[...Array(testimonial.rating)].map((_, i) => (
														<Star key={i} className='h-6 w-6 text-yellow-500 fill-current mx-0.5' />
														))}
													</div>
												)} */}

											<div>
												<p className='font-semibold mb-1 text-purple-9'>{testimonial.name}</p>
											</div>
										</CardContent>
									</Card>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Dots Navigation */}
				<div className='flex justify-center mt-8 space-x-2'>
					{testimonials.map((_, index) => (
						<button
							key={index}
							type='button'
							onClick={() => goToTestimonial(index)}
							className={`w-6 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
								index === currentIndex ? 'bg-purple-9' : 'bg-orange-6 hover:bg-orange-8'
							}`}
							aria-label={`Afficher le témoignage ${index + 1}`}
							aria-pressed={index === currentIndex}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

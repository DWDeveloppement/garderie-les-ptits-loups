'use client'
import { Card, CardContent } from '@/components/ui/card'
import { TestimonialsTypesProps } from '@/types/queries/testimonials'
import { Quote, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

type TestimonialsSectionProps = {
	testimonials: TestimonialsTypesProps[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isHovered, setIsHovered] = useState(false)

	const nextTestimonial = () => {
		setCurrentIndex((prev) => (prev + 1) % testimonials.length)
	}

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
	}, [isHovered, currentIndex])

	return (
		<section className='py-16 px-4 sm:px-6 lg:px-8 gradient-section-a'>
			<div className='max-w-5xl mx-auto'>
				<div className='text-center mb-12'>
					<h2 className='font-bold mb-4'>Ce que disent les parents</h2>
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
										<CardContent className='p-8 text-center'>
											<div className='flex justify-center mb-6'>
												<Quote className='h-16 w-16 text-purple-9' />
											</div>
											<h4 className='font-medium' role='heading' aria-level={4}>
												{testimonial.title}
											</h4>
											<p className='leading-relaxed mb-8 italic' role='text'>
												&quot;{testimonial.content}&quot;
											</p>

											<div className='flex items-center justify-center mb-6'>
												{[...Array(testimonial.rating)].map((_, i) => (
													<Star key={i} className='h-6 w-6 text-yellow-500 fill-current mx-0.5' />
												))}
											</div>

											<div>
												<p className='font-semibold mb-1 text-purple-9' role='text' aria-level={5}>
													{testimonial.name}
												</p>
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
							onClick={() => goToTestimonial(index)}
							className={`w-3 h-3 rounded-full transition-colors ${
								index === currentIndex ? 'bg-purple-9' : 'bg-orange-6 hover:bg-orange-8'
							}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

'use client'

import { useEffect, useState } from 'react'

type SuccessAnimationProps = {
	isVisible: boolean
	onComplete?: () => void
}

export function SuccessAnimation({ isVisible, onComplete }: SuccessAnimationProps) {
	const [showCheckmark, setShowCheckmark] = useState(false)

	useEffect(() => {
		if (isVisible) {
			// Délai pour l'animation du checkmark
			const timer = setTimeout(() => {
				setShowCheckmark(true)
				// Appeler onComplete après l'animation
				if (onComplete) {
					setTimeout(onComplete, 1000)
				}
			}, 200)

			return () => clearTimeout(timer)
		} else {
			setShowCheckmark(false)
		}
	}, [isVisible, onComplete])

	if (!isVisible) return null

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-8 max-w-sm mx-4 text-center shadow-xl'>
				{/* Cercle de succès */}
				<div className='relative w-16 h-16 mx-auto mb-4'>
					<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
						<div
							className={`w-12 h-12 bg-green-500 rounded-full flex items-center justify-center transition-all duration-500 ${
								showCheckmark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
							}`}>
							{/* Checkmark SVG */}
							<svg
								className={`w-8 h-8 text-white transition-all duration-300 ${showCheckmark ? 'opacity-100' : 'opacity-0'}`}
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
							</svg>
						</div>
					</div>

					{/* Particules de succès */}
					{showCheckmark && (
						<>
							<div className='absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-ping'></div>
							<div
								className='absolute -bottom-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-ping'
								style={{ animationDelay: '0.2s' }}></div>
							<div
								className='absolute top-1 -left-3 w-2 h-2 bg-green-400 rounded-full animate-ping'
								style={{ animationDelay: '0.4s' }}></div>
						</>
					)}
				</div>

				{/* Message de succès */}
				<h3 className='font-semibold text-gray-800 mb-2'>Message envoyé !</h3>
				<p className='text-gray-600'>Votre message a été transmis avec succès à l&apos;équipe de la garderie.</p>
			</div>
		</div>
	)
}

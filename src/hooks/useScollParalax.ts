'use client'

import { useEffect, useRef, useState } from 'react'

type UseScrollParallaxOptions = {
	speed?: number
	scale?: number
	textSpeed?: number
	overlayIntensity?: number
}

export function useScrollParallax(options: UseScrollParallaxOptions = {}) {
	const { speed = 20, scale = 0.1, textSpeed = -15, overlayIntensity = 0.3 } = options

	const [scrollY, setScrollY] = useState(0)
	const elementRef = useRef<HTMLElement>(null)

	useEffect(() => {
		const handleScroll = () => {
			if (elementRef.current) {
				const rect = elementRef.current.getBoundingClientRect()
				const elementTop = rect.top
				const elementHeight = rect.height
				const windowHeight = window.innerHeight

				// Calcul du pourcentage de scroll dans l'élément
				const scrollProgress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))

				setScrollY(scrollProgress)
			}
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll() // Appel initial

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Calcul des transformations basées sur le scroll
	const imageTransform = `translateY(${scrollY * speed}px) scale(${1 + scrollY * scale})`
	const textTransform = `translateY(${scrollY * textSpeed}px)`
	const overlayOpacity = Math.min(0.6, 0.3 + scrollY * overlayIntensity)

	return {
		scrollY,
		elementRef,
		imageTransform,
		textTransform,
		overlayOpacity,
	}
}

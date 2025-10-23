'use client'

import { useEffect, useState } from 'react'

export function useScrollDirection(threshold = 8) {
	const [dir, setDir] = useState<'up' | 'down'>('up')

	useEffect(() => {
		let lastY = window.scrollY
		const onScroll = () => {
			const y = window.scrollY
			const diff = y - lastY
			if (Math.abs(diff) >= threshold) {
				setDir(diff > 0 ? 'down' : 'up')
				lastY = y
			}
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [threshold])

	return dir
}

export function useScrollToTop(threshold = 300) {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const toggle = () => setVisible(window.scrollY > threshold)
		window.addEventListener('scroll', toggle, { passive: true })
		toggle()
		return () => window.removeEventListener('scroll', toggle)
	}, [threshold])

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return { visible, scrollToTop }
}

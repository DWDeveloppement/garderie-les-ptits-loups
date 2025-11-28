'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useState, useCallback } from 'react'

type TransitionDirection = 'forward' | 'backward'

interface TransitionContextType {
	direction: TransitionDirection
	setDirection: (dir: TransitionDirection) => void
}

const TransitionContext = createContext<TransitionContextType>({
	direction: 'forward',
	setDirection: () => {},
})

export const useTransition = () => useContext(TransitionContext)

const transition = {
	type: 'tween' as const,
	ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
	duration: 0.4,
}

// Variants avec custom parameter - reçoit la direction de AnimatePresence
const variants = {
	initial: (direction: TransitionDirection) => ({
		opacity: 0,
		x: direction === 'forward' ? 100 : -100,
	}),
	animate: { opacity: 1, x: 0 },
	exit: (direction: TransitionDirection) => ({
		opacity: 0,
		x: direction === 'forward' ? -100 : 100,
	}),
}

/**
 * Provider pour le contexte de transition (direction)
 * À placer autour de TOUT le contenu (header, main, footer)
 */
export default function TransitionProvider({ children }: { children: React.ReactNode }) {
	const [direction, setDirectionState] = useState<TransitionDirection>('forward')

	const setDirection = useCallback((dir: TransitionDirection) => {
		setDirectionState(dir)
	}, [])

	return <TransitionContext.Provider value={{ direction, setDirection }}>{children}</TransitionContext.Provider>
}

/**
 * Composant pour l'animation de page
 * À placer UNIQUEMENT autour du contenu de page (pas header/footer)
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	const { direction } = useTransition()

	return (
		<AnimatePresence mode='wait' initial={false} custom={direction}>
			<motion.main
				key={pathname}
				custom={direction}
				variants={variants}
				initial='initial'
				animate='animate'
				exit='exit'
				transition={transition}>
				{children}
			</motion.main>
		</AnimatePresence>
	)
}

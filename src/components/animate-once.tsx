'use client'

import { useAnimateOnce } from '@/hooks/use-animate-once'
import { cn } from '@/lib/utils'
import { forwardRef, type ReactNode, type HTMLAttributes, type ElementType } from 'react'

type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'scale-up' | 'rotate' | 'blur'

type AnimationSpeed = 'fast' | 'normal' | 'slow' | 'slower'
type AnimationEasing = 'smooth' | 'bounce' | 'elastic'

interface AnimateOnceProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	/** Type d'animation */
	animation?: AnimationType
	/** Vitesse de l'animation */
	speed?: AnimationSpeed
	/** Type d'easing */
	easing?: AnimationEasing
	/** Délai avant l'animation (ms) */
	delay?: number
	/** Seuil de visibilité (0-1) */
	threshold?: number
	/** Marge autour de l'élément observé */
	rootMargin?: string
	/** Désactiver l'animation */
	disabled?: boolean
	/** Tag HTML à utiliser */
	as?: ElementType
	/** Index pour le délai en cascade (utilisé avec stagger) */
	staggerIndex?: number
}

const animationClasses: Record<AnimationType, string> = {
	fade: 'animate-ready-fade',
	'slide-up': 'animate-ready-slide-up',
	'slide-down': 'animate-ready-slide-down',
	'slide-left': 'animate-ready-slide-left',
	'slide-right': 'animate-ready-slide-right',
	scale: 'animate-ready-scale',
	'scale-up': 'animate-ready-scale-up',
	rotate: 'animate-ready-rotate',
	blur: 'animate-ready-blur',
}

const speedClasses: Record<AnimationSpeed, string> = {
	fast: 'animate-fast',
	normal: '',
	slow: 'animate-slow',
	slower: 'animate-slower',
}

const easingClasses: Record<AnimationEasing, string> = {
	smooth: '',
	bounce: 'animate-bounce',
	elastic: 'animate-elastic',
}

/**
 * Composant wrapper qui anime son contenu une seule fois
 * quand il entre dans le viewport
 */
export const AnimateOnce = forwardRef<HTMLDivElement, AnimateOnceProps>(
	(
		{
			children,
			animation = 'fade',
			speed = 'normal',
			easing = 'smooth',
			delay = 0,
			threshold = 0.2,
			rootMargin = '0px',
			disabled = false,
			as: Component = 'div',
			staggerIndex,
			className,
			style,
			...props
		},
		forwardedRef
	) => {
		const { ref, hasAnimated } = useAnimateOnce({
			threshold,
			rootMargin,
			delay,
			disabled,
		})

		// Calculer le délai en cascade si staggerIndex est fourni
		const staggerDelay = staggerIndex !== undefined ? staggerIndex * 100 : 0

		const Tag = Component

		return (
			<Tag
				ref={(node: HTMLDivElement | null) => {
					;(ref as React.MutableRefObject<HTMLElement | null>).current = node
					if (typeof forwardedRef === 'function') {
						forwardedRef(node)
					} else if (forwardedRef) {
						forwardedRef.current = node
					}
				}}
				className={cn(
					animationClasses[animation],
					hasAnimated && 'animate-done',
					speedClasses[speed],
					easingClasses[easing],
					staggerIndex !== undefined && `animate-delay-${Math.min(staggerIndex + 1, 8)}`,
					className
				)}
				style={{
					...style,
					...(staggerDelay > 0 && !hasAnimated ? { transitionDelay: `${staggerDelay}ms` } : {}),
				}}
				{...props}>
				{children}
			</Tag>
		)
	}
)

AnimateOnce.displayName = 'AnimateOnce'

/**
 * Composant pour animer un groupe d'éléments en cascade
 */
interface AnimateGroupProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode[]
	/** Type d'animation pour tous les enfants */
	animation?: AnimationType
	/** Vitesse de l'animation */
	speed?: AnimationSpeed
	/** Type d'easing */
	easing?: AnimationEasing
	/** Seuil de visibilité (0-1) */
	threshold?: number
	/** Tag HTML à utiliser pour le conteneur */
	as?: ElementType
}

export function AnimateGroup({
	children,
	animation = 'slide-up',
	speed = 'normal',
	easing = 'smooth',
	threshold = 0.2,
	as: Component = 'div',
	className,
	...props
}: AnimateGroupProps) {
	const Tag = Component

	return (
		<Tag className={className} {...props}>
			{children.map((child, index) => (
				<AnimateOnce key={index} animation={animation} speed={speed} easing={easing} threshold={threshold} staggerIndex={index}>
					{child}
				</AnimateOnce>
			))}
		</Tag>
	)
}

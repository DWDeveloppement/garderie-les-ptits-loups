'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from '@/providers/Transition'
import { useCallback, forwardRef, type ComponentProps, type MouseEvent } from 'react'
import { navigationMenu } from '@/constants/navigation_menu'

interface TransitionLinkProps extends ComponentProps<typeof Link> {
	/** Forcer une direction spécifique */
	direction?: 'forward' | 'backward' | 'auto'
}

/**
 * Détermine la direction de navigation basée sur la structure des routes
 */
function getRouteDepth(pathname: string): number {
	if (pathname === '/') return 0
	return pathname.split('/').filter(Boolean).length
}

/**
 * Map de priorité des routes pour déterminer la direction
 * Synchronisé avec src/constants/navigation_menu.ts
 */
const routeOrder: Record<string, number> = navigationMenu.reduce(
	(acc, item) => {
		if (item.href && typeof item.href === 'string') {
			acc[item.href] = item.id
		}
		if (item.subMenu) {
			item.subMenu.forEach((subItem) => {
				if (subItem.href && typeof subItem.href === 'string') {
					acc[subItem.href] = subItem.id
				}
			})
		}
		return acc
	},
	{} as Record<string, number>
)

function getRouteIndex(pathname: string): number {
	if (routeOrder[pathname] !== undefined) {
		return routeOrder[pathname]
	}

	const segments = pathname.split('/').filter(Boolean)
	for (let i = segments.length; i > 0; i--) {
		const parentPath = '/' + segments.slice(0, i).join('/')
		if (routeOrder[parentPath] !== undefined) {
			return routeOrder[parentPath] + (segments.length - i) * 0.1
		}
	}

	return getRouteDepth(pathname)
}

function determineDirection(currentPath: string, targetPath: string): 'forward' | 'backward' {
	const currentIndex = getRouteIndex(currentPath)
	const targetIndex = getRouteIndex(targetPath)

	if (currentIndex === targetIndex) {
		const currentDepth = getRouteDepth(currentPath)
		const targetDepth = getRouteDepth(targetPath)
		return targetDepth >= currentDepth ? 'forward' : 'backward'
	}

	return targetIndex > currentIndex ? 'forward' : 'backward'
}

/**
 * Composant Link avec gestion automatique de la direction de transition
 */
export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
	({ href, direction = 'auto', onClick, children, ...props }, ref) => {
		const router = useRouter()
		const pathname = usePathname()
		const { setDirection } = useTransition()

		const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
			e.preventDefault()

			const targetPath = typeof href === 'string' ? href : href.pathname || '/'
			const navDirection = direction === 'auto' ? determineDirection(pathname, targetPath) : direction

			onClick?.(e)
			setDirection(navDirection)

			// Petit délai pour laisser le re-render se faire avant la navigation
			setTimeout(() => {
				router.push(targetPath)
			}, 10)
		}

		return (
			<Link ref={ref} href={href} onClick={handleClick} {...props}>
				{children}
			</Link>
		)
	}
)

TransitionLink.displayName = 'TransitionLink'

/**
 * Hook pour navigation programmatique avec direction
 */
export function useTransitionRouter() {
	const router = useRouter()
	const pathname = usePathname()
	const { setDirection } = useTransition()

	const push = useCallback(
		(href: string, direction?: 'forward' | 'backward' | 'auto') => {
			const navDirection = direction === 'auto' || !direction ? determineDirection(pathname, href) : direction
			setDirection(navDirection)
			setTimeout(() => {
				router.push(href)
			}, 10)
		},
		[router, pathname, setDirection]
	)

	const back = useCallback(() => {
		setDirection('backward')
		setTimeout(() => {
			router.back()
		}, 10)
	}, [router, setDirection])

	const forward = useCallback(() => {
		setDirection('forward')
		setTimeout(() => {
			router.forward()
		}, 10)
	}, [router, setDirection])

	return {
		push,
		back,
		forward,
		replace: router.replace,
		prefetch: router.prefetch,
	}
}

/**
 * Bouton retour avec animation automatique
 */
export function BackButton({ children = 'Retour', className, ...props }: ComponentProps<'button'>) {
	const { back } = useTransitionRouter()

	return (
		<button onClick={back} className={className} {...props}>
			{children}
		</button>
	)
}

// 📂 src/hooks/a11y/useLinkA11y.ts
// 👉 Hook pour la gestion de l'accessibilité des liens

export type LinkA11yProps = {
	mode: 'link' | 'next-link'
	href: string
	external: boolean
}

export function useLinkA11y({ href, external, mode }: LinkA11yProps) {
	if (mode !== 'link' && mode !== 'next-link') return {}

	return {
		role: 'link',
		href,
		target: external ? '_blank' : undefined,
		rel: external ? 'noopener noreferrer' : undefined,
	}
}

// 📂 src/hooks/a11y/useButtonA11y.ts
// 👉 Hook pour la gestion de l'accessibilité des boutons

export type ButtonA11yProps = {
	mode: 'button' | 'link' | 'next-link' | 'decorative'
	children: React.ReactNode
	disabled?: boolean
	loading?: boolean
}

export function useButtonA11y({ mode, disabled, ...props }: ButtonA11yProps) {
	if (mode !== 'button') return {}

	return {
		role: 'button',
		'aria-disabled': disabled ? 'true' : undefined,
		tabIndex: 0,
		...props,
	}
}

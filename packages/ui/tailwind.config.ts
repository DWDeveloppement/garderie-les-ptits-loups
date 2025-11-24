import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./components/**/*.{ts,tsx}', './css/**/*.{css}'],
	theme: {
		// Optionnel : surcharger ici
	},
	plugins: [],
}

export default config

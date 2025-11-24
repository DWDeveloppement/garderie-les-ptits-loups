import type { Config } from 'tailwindcss'
import uiConfig from '@ui/tailwind.config'

const config: Config = {
	presets: [uiConfig],
	content: ['./src/**/*.{ts,tsx}', './packages/ui/**/*.{ts,tsx}'],
}

export default config

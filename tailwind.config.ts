import type { Config } from 'tailwindcss'
import uiConfig from './src/ui/tailwind.config'

const config: Config = {
	presets: [uiConfig],
	content: ['./src/**/*.{ts,tsx}'],
}

export default config

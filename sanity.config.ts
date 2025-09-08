import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schema } from './sanity/schema'

export default defineConfig({
	name: 'garderie-les-ptits-loups',
	title: "Garderie Les P'tits Loups",

	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

	plugins: [structureTool(), visionTool()],

	schema,
})

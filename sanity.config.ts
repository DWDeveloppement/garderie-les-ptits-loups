import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { deskStructure } from './sanity/deskStructure'
import { schema } from './sanity/schema'

export default defineConfig({
	name: 'garderie-les-ptits-loups',
	title: "Garderie Les P'tits Loups",

	projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
	dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

	plugins: [
		structureTool({
			structure: deskStructure,
		}),
		visionTool(),
	],

	schema,
})

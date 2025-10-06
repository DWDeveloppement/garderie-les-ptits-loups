import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { FieldsSidebar } from './sanity/components/FieldsSidebar'
import SimpleTest from './sanity/components/SimpleTest'
import { isDeveloper } from './sanity/config/roles'
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
			defaultDocumentNode: (S, { schemaType, documentId }) => {
				// Configuration des vues pour chaque type de document
				console.log('🔧 defaultDocumentNode appelé avec schemaType:', schemaType) // Debug
				console.log('🔧 Document ID:', documentId) // Debug
				console.log('🔧 S object:', S) // Debug

				// Récupérer l'utilisateur actuel (à implémenter)
				const currentUser = null // TODO: Récupérer l'utilisateur connecté
				const userIsDeveloper = isDeveloper(currentUser)

				console.log('👤 Utilisateur actuel (defaultDocumentNode):', currentUser) // Debug
				console.log('🔧 Est développeur (defaultDocumentNode):', userIsDeveloper) // Debug

				// Vérifier si le composant SimpleTest est disponible
				console.log('🔧 SimpleTest component:', SimpleTest) // Debug

				// Sidebar conditionnelle selon le rôle
				if (userIsDeveloper) {
					// Développeur : sidebar complète
					if (schemaType === 'home') {
						console.log('🏠 La page home est ouverte (développeur)') // Debug
						console.log('🔧 Configuring home views (développeur)') // Debug

						try {
							const views = [S.view.form().title('Formulaire'), S.view.component(SimpleTest).title('Simple Test')]
							console.log('🔧 Home views created successfully (développeur):', views) // Debug
							return S.document().views(views)
						} catch (error) {
							console.error('❌ Erreur lors de la création des vues home (développeur):', error) // Debug
							return S.document().views([S.view.form()])
						}
					}

					if (schemaType === 'aboutPage' || schemaType === 'contactPage' || schemaType === 'schedulePage') {
						console.log('🔧 Configuring other page views (développeur)') // Debug

						try {
							const views = [S.view.form().title('Formulaire'), S.view.component(FieldsSidebar).title('Fields Sidebar')]
							console.log('🔧 Other page views created successfully (développeur):', views) // Debug
							return S.document().views(views)
						} catch (error) {
							console.error('❌ Erreur lors de la création des vues autres pages (développeur):', error) // Debug
							return S.document().views([S.view.form()])
						}
					}
				} else {
					// Éditeur : pas de sidebar
					console.log('👤 Éditeur détecté - pas de sidebar') // Debug
				}

				// Vue par défaut pour les autres types
				console.log('🔧 Using default view for schemaType:', schemaType) // Debug
				return S.document().views([S.view.form()])
			},
		}),
		visionTool(),
	],

	schema,
})

import { StructureBuilder } from 'sanity/structure'
import { ALLOWED_FIXED_PAGES, isDeveloper } from './config/roles'

export const deskStructure = (S: StructureBuilder) => {
	console.log('🏗️ deskStructure appelé avec S:', S) // Debug

	// Récupérer l'utilisateur actuel (à implémenter)
	const currentUser = null // TODO: Récupérer l'utilisateur connecté
	const userIsDeveloper = isDeveloper(currentUser)

	console.log('👤 Utilisateur actuel:', currentUser) // Debug
	console.log('🔧 Est développeur:', userIsDeveloper) // Debug

	return S.list()
		.title('Contenu')
		.items([
			// Pages Statiques / Fixes - Documents multiples
			// Page Accueil, À propos, Contact, Horaires & Tarifs
			// Pages Fixes - Gestion conditionnelle selon le rôle
			S.listItem()
				.title('Pages Fixes')
				.child(
					S.list()
						.title('Pages Fixes')
						.items([
							// Pages existantes
							...ALLOWED_FIXED_PAGES.map((page) =>
								S.listItem()
									.title(page.title)
									.icon(() => {
										const icons: { [key: string]: string } = {
											home: '🏠',
											aboutPage: '📄',
											contactPage: '📞',
											schedulePage: '📅',
										}
										return icons[page.type] || '📄'
									})
									.child(
										userIsDeveloper
											? S.document().schemaType(page.type).documentId(page.id)
											: S.documentList()
													.title(page.title)
													.filter(`_type == "${page.type}" && _id == "${page.id}"`)
													.apiVersion('2023-05-03')
													.canHandleIntent(() => false) // Empêche la création
													.menuItems([]) // Supprime les options de menu (delete, etc.)
									)
							),
							// Bouton d'ajout (développeur uniquement)
							...(userIsDeveloper
								? [
										S.divider(),
										S.listItem()
											.title('+ Nouvelle page fixe')
											.icon(() => '➕')
											.child(
												S.documentList()
													.title('Créer une nouvelle page')
													.filter(`_type in [${ALLOWED_FIXED_PAGES.map((p) => `"${p.type}"`).join(', ')}]`)
													.apiVersion('2023-05-03')
													.canHandleIntent(() => true)
											),
									]
								: []),
						])
				),

			// Contient des documents dont la structure du schema peut différer d'une page à l'autre. Voir comment solutionner cela en ayant un Schema global et un Schema pour chaque page. Le Schema global gère le nom de la page, le slug, le titre, la description, un hero de page un blocde contenu variable en fonction de la page. Un bloc poour gérer le SEO. de chaque page.

			// La Structure - Documents multiples
			S.listItem()
				.title('La Structure')
				.child(S.documentList().title('La Structure').filter('_type == "sectors"').apiVersion('2023-05-03')),

			// Espaces - Documents multiples
			S.listItem().title('Espaces').child(S.documentList().title('Espaces').filter('_type == "spaces"').apiVersion('2023-05-03')),

			// Prix et Tarifs - Documents multiples
			S.listItem()
				.title('Prix et Tarifs')
				.icon(() => '💰')
				.child(S.documentList().title('Prix et Tarifs').filter('_type == "prices"').apiVersion('2023-05-03')),
			// Médiathèque personnalisée avec nos champs SEO
			S.listItem()
				.title('Médiathèque SEO')
				.child(S.documentList().title('Médiathèque SEO').filter('_type == "assets"').apiVersion('2023-05-03')),
		])
}

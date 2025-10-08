import { StructureBuilder } from 'sanity/structure'
// Affichage simple pour utilisateurs (pas d'ajout)

export const deskStructure = (S: StructureBuilder) => {
	return S.list()
		.title('Contenu')
		.items([
			// Pages fixes (uniquement 4 docs, pas de création)
			S.listItem()
				.title('Pages Fixes')
				.child(
					S.list()
						.title('Pages Fixes')
						.items([
							S.listItem()
								.icon(() => '🏠')
								.title("Page d'accueil")
								.child(S.document().schemaType('home').documentId('home')),
							S.listItem()
								.icon(() => '👤')
								.title('Page À propos')
								.child(S.document().schemaType('aboutPage').documentId('aboutPage')),
							S.listItem()
								.icon(() => '📞')
								.title('Page Contact')
								.child(S.document().schemaType('contactPage').documentId('contactPage')),
							S.listItem()
								.icon(() => '📅')
								.title('Page Horaires & Tarifs')
								.child(S.document().schemaType('schedulePage').documentId('schedulePage')),
						])
				),

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
				.title('Galleries photos')
				.child(
					S.list()
						.title('Galleries photos')
						.items([
							S.listItem()
								.title('La Nurserie')
								.child(S.documentList().title('La Nurserie').filter('_type == "gallery"').apiVersion('2023-05-03')),
							S.listItem()
								.title('Les Trotteurs')
								.child(S.documentList().title('LesTrotteurs').filter('_type == "gallery"').apiVersion('2023-05-03')),
							S.listItem()
								.title('Les Grands')
								.child(S.documentList().title('Les Grands').filter('_type == "gallery"').apiVersion('2023-05-03')),
							S.listItem()
								.title('Les Autres Espaces')
								.child(S.documentList().title('Autres Espaces').filter('_type == "gallery"').apiVersion('2023-05-03')),
						])
				),
		])
}

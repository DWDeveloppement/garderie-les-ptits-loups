import { StructureBuilder } from 'sanity/structure'
// Affichage simple pour utilisateurs (pas d'ajout)

export const deskStructure = (S: StructureBuilder) => {
	return S.list()
		.title('Contenu')
		.items([
			// Pages fixes générales
			S.listItem()
				.title('Pages Générales')
				.icon(() => '📄')
				.child(
					S.list()
						.title('Pages Générales')
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
								.icon(() => '💰')
								.title('Page Tarifs')
								.child(S.document().schemaType('schedulePage').documentId('schedulePage')),
						])
				),

			// La Structure - 4 secteurs fixes
			S.listItem()
				.title('La Structure')
				.icon(() => '🏛️')
				.child(
					S.list()
						.title('La Structure')
						.items([
							S.listItem()
								.icon(() => '👶')
								.title('La Nurserie')
								.child(S.document().schemaType('sectorPage').documentId('nurserie')),
							S.listItem()
								.icon(() => '🚼')
								.title('Les Trotteurs')
								.child(S.document().schemaType('sectorPage').documentId('trotteurs')),
							S.listItem()
								.icon(() => '🧒')
								.title('Les Grands')
								.child(S.document().schemaType('sectorPage').documentId('grands')),
							S.listItem()
								.icon(() => '🏢')
								.title('Les Autres Espaces')
								.child(S.document().schemaType('sectorPage').documentId('autres-espaces')),
						])
				),

			// Espaces - 12 espaces fixes groupés par secteur
			S.listItem()
				.title('Les Espaces')
				.icon(() => '🚪')
				.child(
					S.list()
						.title('Espaces')
						.items([
							// Nurserie
							S.listItem()
								.title('Nurserie')
								.child(
									S.list()
										.title('Espaces Nurserie')
										.items([
											S.listItem().title('Salle de jeux').child(S.document().schemaType('spacePage').documentId('nurseryPlaygroundSpace')),
											S.listItem().title('Espace Repos').child(S.document().schemaType('spacePage').documentId('nurseryRestSpace')),
											S.listItem().title('Espace Soins').child(S.document().schemaType('spacePage').documentId('nurseryCareSpace')),
										])
								),
							// Trotteurs
							S.listItem()
								.title('Trotteurs')
								.child(
									S.list()
										.title('Espaces Trotteurs')
										.items([
											S.listItem()
												.title('Salle de jeux')
												.child(S.document().schemaType('spacePage').documentId('trotteursPlaygroundSpace')),
											S.listItem().title('Espace Repos').child(S.document().schemaType('spacePage').documentId('trotteursRestSpace')),
											S.listItem().title('Espace soins').child(S.document().schemaType('spacePage').documentId('trotteursCareSpace')),
										])
								),
							// Grands
							S.listItem()
								.title('Grands')
								.child(
									S.list()
										.title('Espaces Grands')
										.items([
											S.listItem().title('Espace jeux').child(S.document().schemaType('spacePage').documentId('grandsPlaygroundSpace')),
											S.listItem().title('Espace repos').child(S.document().schemaType('spacePage').documentId('grandsRestSpace')),
											S.listItem().title('Espace soins').child(S.document().schemaType('spacePage').documentId('grandsCareSpace')),
										])
								),
							// Autres Espaces
							S.listItem()
								.title('Autres Espaces')
								.child(
									S.list()
										.title('Autres Espaces')
										.items([
											S.listItem().title('Le Jardin').child(S.document().schemaType('spacePage').documentId('gardenSpace')),
											S.listItem().title('La Cuisine').child(S.document().schemaType('spacePage').documentId('kitchenSpace')),
											S.listItem().title("L'armoire à bricolages").child(S.document().schemaType('spacePage').documentId('bricolageSpace')),
										])
								),
						])
				),

			// Prix et Tarifs - Documents multiples (conservé)
			S.listItem()
				.title('Prix et Tarifs')
				.icon(() => '💰')
				.child(S.documentList().title('Prix et Tarifs').filter('_type == "prices"').apiVersion('2023-05-03')),
			// Témoignages - Documents multiples avec add document
			S.listItem()
				.title('Témoignages')
				.icon(() => '🎉')
				.child(S.documentList().title('Témoignages').filter('_type == "testimonials"').apiVersion('2023-05-03')),
		])
}

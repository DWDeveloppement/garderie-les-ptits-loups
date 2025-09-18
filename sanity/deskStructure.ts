import { StructureBuilder } from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
	S.list()
		.title('Contenu')
		.items([
			// Page d'accueil - Document unique
			S.listItem().title("Page d'accueil").child(S.document().title("Page d'accueil").documentId('home-page').schemaType('home')),

			// À propos - Document unique
			S.listItem().title('À propos').child(S.document().title('À propos').documentId('about-page').schemaType('about')),

			// Contact - Document unique
			S.listItem().title('Contact').child(S.document().title('Contact').documentId('contact-page').schemaType('contact')),

			// Horaires & Tarifs - Document unique
			S.listItem()
				.title('Horaires & Tarifs')
				.child(S.document().title('Horaires & Tarifs').documentId('schedule-page').schemaType('schedule')),

			// La Structure - Documents multiples
			S.listItem().title('La Structure').child(S.documentList().title('La Structure').filter('_type == "sectors"')),

			// Espaces - Documents multiples
			S.listItem().title('Espaces').child(S.documentList().title('Espaces').filter('_type == "spaces"')),

			// Médiathèque gérée par sanity-plugin-media (http://localhost:3333/media)
			// Plus besoin d'item dans la structure car le plugin fournit son propre onglet
		])

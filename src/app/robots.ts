import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://garderielesptitsloups-pataco80s-projects.vercel.app'

	// Définir les domaines de production autorisés à être indexés
	const productionDomains = [
		'www.garderielesptitsloups.ch',
		'garderielesptitsloups.ch',
		// Ajouter ici d'autres alias de production si nécessaire
	]

	// Vérifier si on est sur un domaine de production
	const isProduction = productionDomains.some((domain) => baseUrl.includes(domain))

	// Si on est sur Vercel preview ou un domaine non listé, ne pas indexer
	if (!isProduction) {
		return {
			rules: {
				userAgent: '*',
				disallow: '/',
			},
		}
	}

	// En production avec domaine autorisé, autoriser l'indexation
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/', '/sanity/', '/_next/'],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	}
}

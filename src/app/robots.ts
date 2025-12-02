import { MetadataRoute } from 'next'

// Construire l'URL de base avec le bon protocole
const getBaseUrl = () => {
	if (process.env.NEXT_PUBLIC_SITE_URL) {
		return process.env.NEXT_PUBLIC_SITE_URL
	}
	// Sur Vercel, VERCEL_URL est défini sans protocole
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`
	}
	return 'http://localhost:3000'
}

export default function robots(): MetadataRoute.Robots {
	const baseUrl = getBaseUrl()

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

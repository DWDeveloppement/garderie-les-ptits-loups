import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://garderielesptitsloups-pataco80s-projects.vercel.app'

	// Si on est sur Vercel sans domaine personnalisé, ne pas indexer
	const isVercelPreview = baseUrl.includes('.vercel.app')

	if (isVercelPreview) {
		return {
			rules: {
				userAgent: '*',
				disallow: '/',
			},
		}
	}

	// En production avec domaine personnalisé, autoriser l'indexation
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/', '/sanity/', '/_next/'],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	}
}

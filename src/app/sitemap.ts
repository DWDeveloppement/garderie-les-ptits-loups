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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = getBaseUrl()

	// Pages statiques
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/a-propos`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/tarifs`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/mentions-legales`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
		{
			url: `${baseUrl}/politique-confidentialite`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
	]

	// Pages secteurs
	const sectorSlugs = ['nurserie', 'trotteurs', 'grands', 'autres-espaces']
	const sectorPages: MetadataRoute.Sitemap = sectorSlugs.map((slug) => ({
		url: `${baseUrl}/la-structure/${slug}`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.8,
	}))

	return [...staticPages, ...sectorPages]
}

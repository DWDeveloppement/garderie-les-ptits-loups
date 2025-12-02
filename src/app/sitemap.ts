import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://garderielesptitsloups-pataco80s-projects.vercel.app'

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

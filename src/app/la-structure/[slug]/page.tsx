import { DevJsonViewer } from '@/components/dev'
import { ContentSection, GallerySection, HeroSectorSection, LinkedSpacesSection, ParallaxSection } from '@/components/pages/sector'
import { transformSanityGalleryToPhotos } from 'lib/sanity/helpers/galleryTransform'
import { fetchSectorPage } from 'lib/sanity/queries/sectors'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// 4 secteurs fixes pour SSG
const SECTOR_SLUGS = ['nurserie', 'trotteurs', 'grands', 'autres-espaces'] as const

// Mapping slug → sectorId (pour Sanity)
const SLUG_TO_SECTOR_ID: Record<string, string> = {
	nurserie: 'nurserie',
	trotteurs: 'trotteurs',
	grands: 'grands',
	'autres-espaces': 'autres-espaces',
}

/**
 * Generate static params pour SSG (4 pages secteurs)
 * Build-time : génère les 4 pages secteurs
 */
export async function generateStaticParams() {
	return SECTOR_SLUGS.map((slug) => ({
		slug,
	}))
}

/**
 * Generate metadata pour SEO
 * Utilise les données SEO depuis Sanity
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params
	const sectorId = SLUG_TO_SECTOR_ID[slug]

	if (!sectorId) {
		return {
			title: 'Secteur introuvable',
			description: "Ce secteur n'existe pas.",
		}
	}

	const data = await fetchSectorPage(sectorId)

	if (!data) {
		return {
			title: 'Secteur introuvable',
			description: "Ce secteur n'existe pas.",
		}
	}

	return {
		title: data.seo?.metaTitle || data.title,
		description: data.seo?.metaDescription || data.sectionHero.description,
		keywords: data.seo?.keywords,
		openGraph: {
			title: data.seo?.metaTitle || data.title,
			description: data.seo?.metaDescription || data.sectionHero.description,
			type: 'website',
		},
	}
}

/**
 * Page Secteur (SSG)
 * Route : /la-structure/[slug]
 */
export default async function StructurePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const sectorId = SLUG_TO_SECTOR_ID[slug]

	if (!sectorId) {
		notFound()
	}

	const data = await fetchSectorPage(sectorId)

	if (!data) {
		notFound()
	}

	const { title, sectionHero, linkedSpaces, parallax, content, gallery } = data

	// Transformer les images Sanity pour la galerie
	const photos = transformSanityGalleryToPhotos(gallery)

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			{sectionHero && <HeroSectorSection title={title} description={sectionHero.description} image={sectionHero.image} />}

			{/* Linked Spaces Section */}
			{linkedSpaces && linkedSpaces.length > 0 && <LinkedSpacesSection linkedSpaces={linkedSpaces} />}

			{/* Parallax Image */}
			{parallax?.image && <ParallaxSection image={parallax.image} />}

			{/* Content Section (Rich Text) */}
			{content && content.length > 0 && <ContentSection content={content} />}

			{/* Gallery Section */}
			{photos.length > 0 && <GallerySection photos={photos} />}

			{/* Dev Debug Viewer (dev only) */}
			<DevJsonViewer data={data} slug={`la-structure/${data.slug}`} collapsed />
		</div>
	)
}

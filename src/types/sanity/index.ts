// 📂 src/types/sanity/index.ts
// 👉 DEPRECATED - Ce fichier redirige vers les nouveaux emplacements dans sanity/types/
// ⚠️ Utilisez @/sanity/types/* à la place

// Re-exports pour compatibilité (à supprimer progressivement)
export type {
	SanityImageDimensions,
	SanityImageMetadata,
	SanityImageAssetRef,
	SanityImage,
} from '@/sanity/types/core/image'

export type {
	PortableTextBlock,
	PortableTextSpan,
	PortableTextLink,
	PortableTextAlign,
	PortableTextMarkDef,
} from '@/sanity/types/core/portableText'

export type {
	GalleryItem,
	LinkedSpace,
	SectionHero,
	Parallax,
	SeoMetadata,
	SectorPageData
} from '@/sanity/types/pages/sectorPage'

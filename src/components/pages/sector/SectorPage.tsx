// 📂 src/components/pages/sector/SectorPage.tsx
// 👉 Page complète pour un secteur (Nurserie, Trotteurs, Grands, Autres Espaces)

import { DevJsonViewer } from '@/components/dev'
import type { SectorPageData } from '@/types/sanity/sectorPage'
import { transformSanityGalleryToPhotos } from 'lib/sanity/helpers/galleryTransform'
import * as React from 'react'
import { ContentSection } from './ContentSection'
import { GallerySection } from './GallerySection'
import { HeroSectorSection } from './HeroSectorSection'
import { LinkedSpacesSection } from './LinkedSpacesSection'
import { ParallaxSection } from './ParallaxSection'

export interface SectorPageProps {
  data: SectorPageData
}

/**
 * Page Secteur complète
 * 
 * **Sections :**
 * - Hero avec image et description
 * - Espaces liés (cards avec liens)
 * - Image parallaxe
 * - Contenu rich-text (Portable Text)
 * - Galerie photo avec lightbox
 * 
 * @example
 * ```tsx
 * <SectorPage data={sectorData} />
 * ```
 */
export function SectorPage({ data }: SectorPageProps) {
  const { title, sectionHero, linkedSpaces, parallax, content, gallery } = data;

  // Transformer les images Sanity pour la galerie
  const photos = React.useMemo(
    () => transformSanityGalleryToPhotos(gallery),
    [gallery]
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {sectionHero && (
        <HeroSectorSection
          title={title}
          description={sectionHero.description}
          image={sectionHero.image}
        />
      )}

      {/* Linked Spaces Section */}
      {linkedSpaces && <LinkedSpacesSection linkedSpaces={linkedSpaces} />}

      {/* Parallax Image */}
      {parallax?.image && (
        <ParallaxSection
          image={parallax.image}
        />
      )}

      {/* Content Section (Portable Text) */}
      {content && <ContentSection content={content} />}

      {/* Gallery Section */}
      {photos.length > 0 && <GallerySection photos={photos} />}

      {/* Dev Debug Viewer (dev only) */}
      <DevJsonViewer data={data} slug={`la-structure/${data.slug}`} collapsed />
    </div>
  );
}

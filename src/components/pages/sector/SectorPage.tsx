// 📂 src/components/pages/sector/SectorPage.tsx
// 👉 Page complète pour un secteur (Nurserie, Trotteurs, Grands, Autres Espaces)

import * as React from 'react';
import { PortableText } from '@portabletext/react';
import { GalleryWithLightbox } from '@/components/gallery';
import { DevJsonViewer } from '@/components/dev';
import { transformSanityGalleryToPhotos, getOptimalGalleryLayout } from 'lib/sanity/helpers/galleryTransform';
import { getHeroImagePropsOptimized } from 'lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

// Type pour les données du secteur depuis Sanity
export interface SectorPageData {
  _id: string;
  title: string;
  slug: string;
  sectionHero?: {
    image?: unknown;
    description?: string;
  };
  linkedSpaces?: Array<{
    _id: string;
    title: string;
    image?: unknown;
    description?: string;
  }>;
  parallax?: {
    image?: unknown;
  };
  content?: unknown; // Portable Text
  gallery?: unknown[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    shareImage?: unknown;
  };
}

export interface SectorPageProps {
  data: SectorPageData;
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
    () => transformSanityGalleryToPhotos(gallery as never),
    [gallery]
  );

  const galleryLayout = React.useMemo(
    () => getOptimalGalleryLayout(photos.length),
    [photos.length]
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {sectionHero && (
        <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] bg-muted">
          {sectionHero.image && (
            <Image
              {...getHeroImagePropsOptimized(sectionHero.image)}
              alt={title}
              fill
              priority
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {title}
            </h1>
            {sectionHero.description && (
              <p className="text-lg md:text-xl max-w-2xl">
                {sectionHero.description}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Linked Spaces Section */}
      {linkedSpaces && linkedSpaces.length > 0 && (
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Nos Espaces</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {linkedSpaces.map((space) => (
                <Link
                  key={space._id}
                  href={`/espaces/${space._id}`}
                  className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all duration-300"
                >
                  {space.image && (
                    <div className="relative h-48 w-full bg-muted">
                      <Image
                        {...getHeroImagePropsOptimized(space.image)}
                        alt={space.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {space.title}
                    </h3>
                    {space.description && (
                      <p className="text-muted-foreground line-clamp-2">
                        {space.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Parallax Image */}
      {parallax?.image && (
        <section className="relative w-full h-[40vh] min-h-[300px] bg-muted">
          <Image
            {...getHeroImagePropsOptimized(parallax.image)}
            alt="Séparateur visuel"
            fill
            className="object-cover"
            loading="lazy"
          />
        </section>
      )}

      {/* Content Section (Portable Text) */}
      {content && (
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <PortableText value={content as never} />
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {photos.length > 0 && (
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Galerie</h2>
            <GalleryWithLightbox
              photos={photos}
              layout={galleryLayout}
              spacing="md"
              rounded="lg"
            />
          </div>
        </section>
      )}

      {/* Dev Debug Viewer (dev only) */}
      <DevJsonViewer data={data} title={`Sector: ${title}`} collapsed />
    </div>
  );
}


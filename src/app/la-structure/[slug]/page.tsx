import { SectorPage } from '@/components/pages/sector';
import { fetchSectorPage } from '@/lib/sanity/queries/sectors';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// 4 secteurs fixes pour SSG
const SECTOR_SLUGS = ['nurserie', 'trotteurs', 'grands', 'autres-espaces'] as const;

// Mapping slug → sectorId (pour Sanity)
const SLUG_TO_SECTOR_ID: Record<string, string> = {
  'nurserie': 'nurserie',
  'trotteurs': 'trotteurs',
  'grands': 'grands',
  'autres-espaces': 'autres-espaces'
};

/**
 * Generate static params pour SSG (4 pages secteurs)
 * Build-time : génère les 4 pages secteurs
 */
export async function generateStaticParams() {
  return SECTOR_SLUGS.map((slug) => ({
    slug
  }));
}

/**
 * Generate metadata pour SEO
 * Utilise les données SEO depuis Sanity
 */
export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const sectorId = SLUG_TO_SECTOR_ID[params.slug];
  
  if (!sectorId) {
    return {
      title: 'Secteur introuvable',
      description: 'Ce secteur n\'existe pas.'
    };
  }

  const data = await fetchSectorPage(sectorId);

  if (!data) {
    return {
      title: 'Secteur introuvable',
      description: 'Ce secteur n\'existe pas.'
    };
  }

  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription || data.sectionHero?.description,
    keywords: data.seo?.keywords,
    openGraph: {
      title: data.seo?.metaTitle || data.title,
      description: data.seo?.metaDescription || data.sectionHero?.description,
      type: 'website'
    }
  };
}

/**
 * Page Secteur (SSG)
 * Route : /la-structure/[slug]
 */
export default async function StructurePage({
  params
}: {
  params: { slug: string };
}) {
  const sectorId = SLUG_TO_SECTOR_ID[params.slug];

  if (!sectorId) {
    notFound();
  }

  const data = await fetchSectorPage(sectorId);

  if (!data) {
    notFound();
  }

  return <SectorPage data={data} />;
}
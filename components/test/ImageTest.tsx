import { GalleryImage, HeroImage, ImageDisplay, SectionImage } from '../../lib/sanity/image-display'
import { type SanityImage } from '../../lib/sanity/image-optimization'

/**
 * Composant de test pour vérifier le rendu des images
 * Utilise les différents contextes d'usage
 */

type ImageTestProps = {
	heroImage: SanityImage
	galleryImage: SanityImage
	sectionImage: SanityImage
}

export function ImageTest({ heroImage, galleryImage, sectionImage }: ImageTestProps) {
	return (
		<div className="space-y-8 p-8">
			<h1 className="text-3xl font-bold">Test des Images Optimisées</h1>
			
			{/* Test Hero Image */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Image Hero (1920x1080)</h2>
				<div className="w-full max-w-4xl">
					<HeroImage image={heroImage} className="rounded-lg shadow-lg" />
				</div>
			</section>

			{/* Test Gallery Image */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Image Galerie (1200x800)</h2>
				<div className="w-full max-w-2xl">
					<GalleryImage image={galleryImage} className="rounded-lg shadow-md" />
				</div>
			</section>

			{/* Test Section Image */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Image Section (960x640)</h2>
				<div className="w-full max-w-xl">
					<SectionImage image={sectionImage} className="rounded-lg shadow-sm" />
				</div>
			</section>

			{/* Test avec usage personnalisé */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Image avec Usage Personnalisé</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h3 className="text-lg font-medium mb-2">Thumbnail (400x300)</h3>
						<ImageDisplay 
							image={galleryImage} 
							usage="thumbnail" 
							className="rounded-lg shadow-sm" 
						/>
					</div>
					<div>
						<h3 className="text-lg font-medium mb-2">Article (800x600)</h3>
						<ImageDisplay 
							image={sectionImage} 
							usage="article" 
							className="rounded-lg shadow-sm" 
						/>
					</div>
				</div>
			</section>
		</div>
	)
}

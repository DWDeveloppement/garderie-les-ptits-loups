// 📂 src/components/gallery/LightboxCustom.tsx
// 👉 Lightbox avec Yet Another React Lightbox + custom render Tailwind

'use client'

import { Icon } from '@/components/icons'
import '@/styles/lightbox-override.css'
import type { Photo } from 'react-photo-album'
import YetAnotherLightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

export type LightboxCustomProps = {
	/** Index de l'image active */
	index: number
	/** Photos à afficher */
	photos: Photo[]
	/** Ouvert/Fermé */
	open: boolean
	/** Callback à la fermeture */
	onClose: () => void
	/** Classe CSS custom */
	className?: string
}

// Custom Slide supprimé - utilisation des slides natifs

/**
 * Custom Icons pour Yet Another React Lightbox
 */
function CustomIconPrev() {
	return <Icon name='chevronLeft' size='lg' className='text-white' />
}

function CustomIconNext() {
	return <Icon name='chevronRight' size='lg' className='text-white' />
}

function CustomIconClose() {
	return <Icon name='close' size='lg' className='text-white' />
}
// CustomDescription supprimé - utilisation des captions natifs

/**
 * LightboxCustom - Yet Another React Lightbox avec custom render
 *
 * **Features :**
 * - Performance native Yet Another React Lightbox
 * - Custom render avec composants Tailwind
 * - Navigation clavier (←/→, Esc)
 * - Swipe sur mobile
 * - Captions élégants
 * - Accessibilité native
 *
 * @example
 * ```tsx
 * <LightboxCustom
 *   open={index >= 0}
 *   index={index}
 *   photos={photos}
 *   onClose={() => setIndex(-1)}
 * />
 * ```
 */
export function LightboxCustom({ index, photos, open, onClose }: LightboxCustomProps) {
	// Utilisation directe des photos sans transformation

	// Transformer les photos pour inclure les captions
	const slides = photos.map((photo) => {
		const customPhoto = photo as Photo & { srcHigh?: string; caption?: string }
		return {
			...photo,
			// Utiliser srcHigh si disponible pour meilleure qualité
			src: customPhoto.srcHigh || photo.src,
			// Description pour les captions natifs
			description: customPhoto.caption || photo.title,
		}
	})

	return (
		<YetAnotherLightbox
			open={open}
			index={index}
			slides={slides}
			close={onClose}
			plugins={[Captions]}
			toolbar={{ buttons: ['close'] }}
			render={{
				// Custom icons pour navigation et close
				iconPrev: () => <CustomIconPrev />,
				iconNext: () => <CustomIconNext />,
				iconClose: () => <CustomIconClose />,
			}}
			animation={{ fade: 300, swipe: 250 }}
			controller={{
				closeOnBackdropClick: true, // Click sur overlay pour fermer
				closeOnPullDown: true, // Pull down to close (mobile)
				closeOnPullUp: false, // Pas de pull up
			}}
			carousel={{ finite: false, preload: 2 }}
			captions={{
				showToggle: false,
				descriptionTextAlign: 'center',
				descriptionMaxLines: 3,
			}}
			// Tous les styles sont dans lightbox-override.css
		/>
	)
}

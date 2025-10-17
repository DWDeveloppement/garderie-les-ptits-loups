// 📂 src/components/ui/variants/gallery.ts
// 👉 Variants CVA pour le système de galerie (react-photo-album)

import { type VariantProps, cva } from 'class-variance-authority'

/**
 * Variants pour le conteneur de galerie
 *
 * **Layouts disponibles :**
 * - `rows` : Layout en lignes (hauteur constante)
 * - `columns` : Layout en colonnes (largeur constante)
 * - `masonry` : Layout en mosaïque (Pinterest-style)
 *
 * @example
 * ```tsx
 * <div className={galleryContainerVariants({ layout: 'masonry', spacing: 'md' })}>
 *   <PhotoAlbum {...} />
 * </div>
 * ```
 */
export const galleryContainerVariants = cva('w-full', {
	variants: {
		layout: {
			rows: '',
			columns: '',
			masonry: '',
		},
		spacing: {
			none: '[&_.photo-album]:gap-0',
			xs: '[&_.photo-album]:gap-1',
			sm: '[&_.photo-album]:gap-2',
			md: '[&_.photo-album]:gap-4',
			lg: '[&_.photo-album]:gap-6',
			xl: '[&_.photo-album]:gap-8',
		},
		rounded: {
			none: '[&_img]:rounded-none',
			sm: '[&_img]:rounded-sm',
			md: '[&_img]:rounded-md',
			lg: '[&_img]:rounded-lg',
			xl: '[&_img]:rounded-xl',
			full: '[&_img]:rounded-full',
		},
	},
	defaultVariants: {
		layout: 'rows',
		spacing: 'md',
		rounded: 'md',
	},
})

/**
 * Variants pour les items de galerie individuels
 *
 * **Effets disponibles :**
 * - Hover (scale, opacity, shadow)
 * - Focus (outline, ring)
 * - Transition (smooth, fast, slow)
 *
 * @example
 * ```tsx
 * <button className={galleryItemVariants({ hover: 'scale', shadow: 'md' })}>
 *   <img src={photo.src} alt={photo.alt} />
 * </button>
 * ```
 */
export const galleryItemVariants = cva(
	[
		'relative overflow-hidden cursor-pointer',
		'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
		'transition-all duration-300 ease-in-out',
	],
	{
		variants: {
			hover: {
				none: '',
				scale: 'hover:scale-[1.02]',
				lift: 'hover:scale-105 hover:-translate-y-1',
				opacity: 'hover:opacity-90',
				'scale-opacity': 'hover:scale-[1.02] hover:opacity-95',
			},
			shadow: {
				none: '',
				sm: 'hover:shadow-sm',
				md: 'hover:shadow-md',
				lg: 'hover:shadow-lg',
				xl: 'hover:shadow-xl',
			},
			border: {
				none: '',
				default: 'border border-border',
				accent: 'border-2 border-accent',
				primary: 'border-2 border-primary',
			},
			transition: {
				smooth: 'transition-all duration-300 ease-in-out',
				fast: 'transition-all duration-150 ease-in-out',
				slow: 'transition-all duration-500 ease-in-out',
			},
		},
		compoundVariants: [
			{
				hover: 'lift',
				shadow: 'lg',
				class: 'hover:shadow-2xl',
			},
			{
				hover: 'scale',
				shadow: 'md',
				class: 'hover:shadow-lg',
			},
		],
		defaultVariants: {
			hover: 'scale-opacity',
			shadow: 'md',
			border: 'none',
			transition: 'smooth',
		},
	}
)

/**
 * Variants pour l'overlay des images (caption, badges, etc.)
 *
 * @example
 * ```tsx
 * <div className={galleryOverlayVariants({ position: 'bottom', opacity: 'medium' })}>
 *   <p>{photo.title}</p>
 * </div>
 * ```
 */
export const galleryOverlayVariants = cva(
	['absolute inset-x-0 z-10', 'flex items-center justify-center', 'pointer-events-none', 'transition-opacity duration-300'],
	{
		variants: {
			position: {
				top: 'top-0 items-start',
				center: 'inset-y-0 items-center',
				bottom: 'bottom-0 items-end',
			},
			opacity: {
				none: 'opacity-0',
				light: 'bg-black/30',
				medium: 'bg-black/50',
				heavy: 'bg-black/70',
				gradient: 'bg-gradient-to-t from-black/60 to-transparent',
			},
			visibility: {
				always: '',
				hover: 'opacity-0 group-hover:opacity-100',
			},
		},
		defaultVariants: {
			position: 'bottom',
			opacity: 'gradient',
			visibility: 'always',
		},
	}
)

/**
 * Variants pour les filtres de galerie
 *
 * @example
 * ```tsx
 * <button className={galleryFilterVariants({ active: true, variant: 'outlined' })}>
 *   Tous
 * </button>
 * ```
 */
export const galleryFilterVariants = cva(
	[
		'px-4 py-2 rounded-lg',
		'text-sm font-medium',
		'transition-all duration-200',
		'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
	],
	{
		variants: {
			variant: {
				solid: 'bg-muted text-muted-foreground hover:bg-muted/80',
				outlined: 'border-2 border-border text-foreground hover:border-primary/50',
				ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
			},
			active: {
				true: '',
				false: '',
			},
		},
		compoundVariants: [
			{
				variant: 'solid',
				active: true,
				class: 'bg-primary text-primary-foreground hover:bg-primary/90',
			},
			{
				variant: 'outlined',
				active: true,
				class: 'border-primary bg-primary/10 text-primary',
			},
			{
				variant: 'ghost',
				active: true,
				class: 'bg-primary/10 text-primary',
			},
		],
		defaultVariants: {
			variant: 'outlined',
			active: false,
		},
	}
)

/**
 * Types d'export pour usage externe
 */
export type GalleryContainerVariants = VariantProps<typeof galleryContainerVariants>
export type GalleryItemVariants = VariantProps<typeof galleryItemVariants>
export type GalleryOverlayVariants = VariantProps<typeof galleryOverlayVariants>
export type GalleryFilterVariants = VariantProps<typeof galleryFilterVariants>

// 📂 src/components/ui/variants/lightbox.ts
// 👉 Variants CVA pour le lightbox/dialog (yet-another-react-lightbox + Radix Dialog)

import { type VariantProps, cva } from 'class-variance-authority'

/**
 * Variants pour l'overlay du lightbox
 *
 * @example
 * ```tsx
 * <div className={lightboxOverlayVariants({ opacity: 'heavy' })} />
 * ```
 */
export const lightboxOverlayVariants = cva(
	[
		'fixed inset-0 z-50',
		'bg-black',
		'transition-opacity duration-300',
		'data-[state=open]:animate-in data-[state=closed]:animate-out',
		'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
	],
	{
		variants: {
			opacity: {
				light: 'bg-opacity-60',
				medium: 'bg-opacity-80',
				heavy: 'bg-opacity-90',
				full: 'bg-opacity-95',
			},
			blur: {
				none: '',
				sm: 'backdrop-blur-sm',
				md: 'backdrop-blur-md',
				lg: 'backdrop-blur-lg',
			},
		},
		defaultVariants: {
			opacity: 'heavy',
			blur: 'none',
		},
	}
)

/**
 * Variants pour le conteneur du lightbox
 *
 * @example
 * ```tsx
 * <div className={lightboxContentVariants({ size: 'full' })}>
 *   <img src={currentImage} alt="..." />
 * </div>
 * ```
 */
export const lightboxContentVariants = cva(
	[
		'fixed left-[50%] top-[50%] z-50',
		'translate-x-[-50%] translate-y-[-50%]',
		'flex items-center justify-center',
		'focus:outline-none',
		'data-[state=open]:animate-in data-[state=closed]:animate-out',
		'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
		'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
	],
	{
		variants: {
			size: {
				fit: 'max-w-[90vw] max-h-[90vh]',
				full: 'w-screen h-screen',
				contained: 'w-[90vw] h-[85vh]',
				large: 'w-[95vw] h-[90vh]',
			},
			padding: {
				none: 'p-0',
				sm: 'p-4',
				md: 'p-6',
				lg: 'p-8',
			},
		},
		defaultVariants: {
			size: 'contained',
			padding: 'md',
		},
	}
)

/**
 * Variants pour l'image affichée dans le lightbox
 *
 * @example
 * ```tsx
 * <img className={lightboxImageVariants({ fit: 'contain' })} />
 * ```
 */
export const lightboxImageVariants = cva(['max-w-full max-h-full', 'object-contain', 'select-none', 'transition-transform duration-300'], {
	variants: {
		fit: {
			contain: 'object-contain',
			cover: 'object-cover',
			fill: 'object-fill',
			'scale-down': 'object-scale-down',
		},
		rounded: {
			none: 'rounded-none',
			sm: 'rounded-sm',
			md: 'rounded-md',
			lg: 'rounded-lg',
		},
	},
	defaultVariants: {
		fit: 'contain',
		rounded: 'none',
	},
})

/**
 * Variants pour les boutons de contrôle du lightbox
 * (Close, Previous, Next, Zoom, etc.)
 *
 * @example
 * ```tsx
 * <button className={lightboxControlVariants({ position: 'top-right', variant: 'ghost' })}>
 *   <Icon name="close" />
 * </button>
 * ```
 */
export const lightboxControlVariants = cva(
	[
		'absolute z-10',
		'flex items-center justify-center',
		'rounded-full',
		'transition-all duration-200',
		'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black',
		'disabled:opacity-30 disabled:cursor-not-allowed',
	],
	{
		variants: {
			position: {
				'top-left': 'top-4 left-4',
				'top-right': 'top-4 right-4',
				'top-center': 'top-4 left-1/2 -translate-x-1/2',
				'bottom-left': 'bottom-4 left-4',
				'bottom-right': 'bottom-4 right-4',
				'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
				'center-left': 'top-1/2 left-4 -translate-y-1/2',
				'center-right': 'top-1/2 right-4 -translate-y-1/2',
			},
			variant: {
				solid: 'bg-white text-black hover:bg-white/90',
				ghost: 'bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm',
				outlined: 'bg-transparent border-2 border-white/50 text-white hover:bg-white/10',
			},
			size: {
				sm: 'size-8 [&_[data-slot="icon"]]:size-4',
				md: 'size-10 [&_[data-slot="icon"]]:size-5',
				lg: 'size-12 [&_[data-slot="icon"]]:size-6',
				xl: 'size-14 [&_[data-slot="icon"]]:size-7',
			},
		},
		defaultVariants: {
			position: 'top-right',
			variant: 'ghost',
			size: 'md',
		},
	}
)

/**
 * Variants pour les thumbnails de navigation
 *
 * @example
 * ```tsx
 * <button className={lightboxThumbnailVariants({ active: true })}>
 *   <img src={thumbnail} alt="..." />
 * </button>
 * ```
 */
export const lightboxThumbnailVariants = cva(
	[
		'relative overflow-hidden',
		'rounded-md',
		'transition-all duration-200',
		'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black',
		'cursor-pointer',
	],
	{
		variants: {
			active: {
				true: 'ring-2 ring-white ring-offset-2 ring-offset-black opacity-100',
				false: 'opacity-60 hover:opacity-100',
			},
			size: {
				sm: 'size-12',
				md: 'size-16',
				lg: 'size-20',
				xl: 'size-24',
			},
		},
		defaultVariants: {
			active: false,
			size: 'md',
		},
	}
)

/**
 * Variants pour le conteneur des thumbnails
 *
 * @example
 * ```tsx
 * <div className={lightboxThumbnailsContainerVariants({ position: 'bottom' })}>
 *   {thumbnails.map(thumb => <Thumbnail key={thumb.id} {...thumb} />)}
 * </div>
 * ```
 */
export const lightboxThumbnailsContainerVariants = cva(['absolute z-20', 'flex gap-2', 'transition-opacity duration-300'], {
	variants: {
		position: {
			top: 'top-0 inset-x-0 justify-center pt-4',
			bottom: 'bottom-0 inset-x-0 justify-center pb-4',
			left: 'left-0 inset-y-0 flex-col items-start pl-4',
			right: 'right-0 inset-y-0 flex-col items-end pr-4',
		},
		background: {
			none: '',
			light: 'bg-black/20 backdrop-blur-sm',
			medium: 'bg-black/40 backdrop-blur-md',
			heavy: 'bg-black/60 backdrop-blur-lg',
		},
		scrollable: {
			true: 'overflow-x-auto overflow-y-hidden max-w-full px-4',
			false: '',
		},
	},
	defaultVariants: {
		position: 'bottom',
		background: 'medium',
		scrollable: true,
	},
})

/**
 * Variants pour les captions/légendes
 *
 * @example
 * ```tsx
 * <div className={lightboxCaptionVariants({ position: 'bottom' })}>
 *   <h3>{image.title}</h3>
 *   <p>{image.description}</p>
 * </div>
 * ```
 */
export const lightboxCaptionVariants = cva(['absolute z-10', 'text-white', 'transition-opacity duration-300', 'pointer-events-none'], {
	variants: {
		position: {
			top: 'top-0 inset-x-0 pt-4 px-8',
			bottom: 'bottom-0 inset-x-0 pb-4 px-8',
		},
		background: {
			none: '',
			gradient: '',
			solid: 'bg-black/50 backdrop-blur-md py-3',
		},
		align: {
			left: 'text-left',
			center: 'text-center',
			right: 'text-right',
		},
	},
	compoundVariants: [
		{
			position: 'top',
			background: 'gradient',
			class: 'bg-gradient-to-b from-black/60 to-transparent pt-8',
		},
		{
			position: 'bottom',
			background: 'gradient',
			class: 'bg-gradient-to-t from-black/60 to-transparent pb-8',
		},
	],
	defaultVariants: {
		position: 'bottom',
		background: 'gradient',
		align: 'center',
	},
})

/**
 * Types d'export pour usage externe
 */
export type LightboxOverlayVariants = VariantProps<typeof lightboxOverlayVariants>
export type LightboxContentVariants = VariantProps<typeof lightboxContentVariants>
export type LightboxImageVariants = VariantProps<typeof lightboxImageVariants>
export type LightboxControlVariants = VariantProps<typeof lightboxControlVariants>
export type LightboxThumbnailVariants = VariantProps<typeof lightboxThumbnailVariants>
export type LightboxThumbnailsContainerVariants = VariantProps<typeof lightboxThumbnailsContainerVariants>
export type LightboxCaptionVariants = VariantProps<typeof lightboxCaptionVariants>

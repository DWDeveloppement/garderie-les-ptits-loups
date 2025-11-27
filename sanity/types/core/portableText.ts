// 📂 sanity/types/core/portableText.ts
// 👉 Types centralisés pour Portable Text (Sanity)

export type PortableTextSpan = {
	_key: string
	_type: 'span'
	text: string
	marks: string[]
}

export type PortableTextLink = {
	_key: string
	_type: 'link'
	href: string
}

export type PortableTextAlign = {
	_key: string
	_type: 'textAlign'
	align: 'left' | 'center' | 'right' | 'justify'
}

export type PortableTextMarkDef = PortableTextLink | PortableTextAlign | { _key: string; _type: string; [key: string]: unknown }

export type PortableTextBlock = {
	_key: string
	_type: 'block'
	children: PortableTextSpan[]
	markDefs: PortableTextMarkDef[]
	style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote' | 'text-left' | 'text-center' | 'text-right' | 'text-justify'
}

// ============================================================================
// BLOCKQUOTE - Type unifié
// ============================================================================

export type Blockquote = {
	_key: string
	_type: 'blockquote'
	text: string
	author?: string
	isSecondary?: boolean // false = Primary (violet), true = Secondary (orange)
	isSpecial?: boolean // false = Standard (bordure), true = Special (carte)
}

// Union de tous les types de contenu Portable Text
export type PortableTextContent = PortableTextBlock | Blockquote


// Type centralisé pour Portable Text (Sanity)
export interface PortableTextSpan {
	_key: string
	_type: 'span'
	text: string
	marks: string[]
}

export interface PortableTextLink {
	_key: string
	_type: 'link'
	href: string
}

export type PortableTextMarkDef = PortableTextLink | { _key: string; _type: string; [key: string]: unknown }

export interface PortableTextBlock {
	_key: string
	_type: 'block'
	children: PortableTextSpan[]
	markDefs: PortableTextMarkDef[]
	style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
}

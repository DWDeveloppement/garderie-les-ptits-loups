// Type centralisé pour Portable Text (Sanity)
export interface PortableTextSpan {
	_key: string
	_type: 'span'
	text: string
	marks: string[]
}

export interface PortableTextBlock {
	_key: string
	_type: 'block'
	children: PortableTextSpan[]
	markDefs: unknown[]
	style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
}

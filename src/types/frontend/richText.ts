/**
 * Type pour le bloc de texte dans le rich text
 */
export type RichTextBlock = {
	_type: string
	children?: Array<{
		_type: string
		text: string
		marks?: string[]
	}>
	style?: string
	markDefs?: Array<{
		_key: string
		_type: string
		href?: string
	}>
}
type RichTextQuoteBlock = {
	listItem: 'bullet' | 'number'
	quoteText: string
	author?: string
	variant?: 'default' | 'secondary'
}

type RichTextHeadingBlock = {
	headingTag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	children: Array<{
		_type: string
		text: string
		marks?: string[]
	}>
}

type RichTextParagraphBlock = {
	children: Array<{
		_type: string
		text: string
		marks?: string[]
	}>
}

type RichTextListBlock = {
	listItems: Array<{
		text: string
		marks?: string[]
		variant?: 'default' | 'secondary'
	}>
}

// type pour le composant RichTextRenderer
export type RichTextBlockProps = {
	block: RichTextBlock
	index: number
	className?: string
	children?: React.ReactNode
	list: RichTextListBlock
	quote: RichTextQuoteBlock
	heading: RichTextHeadingBlock
	paragraph: RichTextParagraphBlock
}

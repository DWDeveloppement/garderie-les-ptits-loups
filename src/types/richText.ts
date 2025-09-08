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

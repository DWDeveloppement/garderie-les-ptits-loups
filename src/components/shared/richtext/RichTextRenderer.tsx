/**
 * RichTextRenderer - Composant de rendu du contenu Portable Text
 *
 * Gère les blocs suivants :
 * - Paragraphes (normal)
 * - Titres (h1-h6)
 * - Listes (bullet/number)
 * - Blockquotes personnalisés (Primary, Secondary, Special Primary, Special Secondary)
 * - Liens, formatage (bold, italic, underline)
 */

import { ICONS, type IconName } from '@/components/icons/registry'
import { RichTextFeedbackCard } from '@/components/shared/richtext/RichTextFeedbackCard'
import { RichTextList, type RichTextListItem } from '@/components/shared/richtext/RichTextList'
import { RichTextQuote, RichTextQuoteSpecial } from '@/components/shared/richtext/RichTextQuote'
import type { HeadingTag, RichTextTitleVariant } from '@/components/shared/richtext/RichTextTitle'
import { RichTextTitle } from '@/components/shared/richtext/RichTextTitle'
import { cn } from '@/lib/utils'
import type {
	BlockquotePrimary,
	BlockquoteSecondary,
	BlockquoteSpecialPrimary,
	BlockquoteSpecialSecondary,
	PortableTextBlock,
	PortableTextContent,
} from '@/sanity/types/core/portableText'
import { RichTextBlock } from '@/types/richText'
import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'

// ============================================================================
// TYPES
// ============================================================================

type MinimalSpan = {
	_type: string
	text: string
	marks?: string[]
	_key?: string
}

type RichTextRendererProps = {
	content: Array<RichTextBlock | PortableTextContent>
	className?: string
}

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
	if (!content || content.length === 0) {
		return null
	}

	const renderedBlocks: ReactNode[] = []

	for (let i = 0; i < content.length; i += 1) {
		const block = content[i]

		// Gestion des blockquotes personnalisés Sanity
		if (isBlockquotePrimary(block)) {
			renderedBlocks.push(renderBlockquotePrimary(block, i))
			continue
		}

		if (isBlockquoteSecondary(block)) {
			renderedBlocks.push(renderBlockquoteSecondary(block, i))
			continue
		}

		if (isBlockquoteSpecialPrimary(block)) {
			renderedBlocks.push(renderBlockquoteSpecialPrimary(block, i))
			continue
		}

		if (isBlockquoteSpecialSecondary(block)) {
			renderedBlocks.push(renderBlockquoteSpecialSecondary(block, i))
			continue
		}

		// Gestion des listes
		if (isListBlock(block)) {
			const { listBlocks, nextIndex } = collectListItems(content, i)
			renderedBlocks.push(renderList(listBlocks, i))
			i = nextIndex - 1
			continue
		}

		// Gestion des blocs standards
		const rendered = renderStandardBlock(block as RichTextBlock | PortableTextBlock, i)
		if (rendered) {
			renderedBlocks.push(rendered)
		}
	}

	return (
		<div className={cn('rich-text-content', className)}>
			{renderedBlocks.map((node, idx) => (
				<Fragment key={idx}>{node}</Fragment>
			))}
		</div>
	)
}

// ============================================================================
// TYPE GUARDS - Détection des types de blocs
// ============================================================================

function isBlockquotePrimary(block: unknown): block is BlockquotePrimary {
	return typeof block === 'object' && block !== null && (block as { _type?: string })._type === 'blockquotePrimary'
}

function isBlockquoteSecondary(block: unknown): block is BlockquoteSecondary {
	return typeof block === 'object' && block !== null && (block as { _type?: string })._type === 'blockquoteSecondary'
}

function isBlockquoteSpecialPrimary(block: unknown): block is BlockquoteSpecialPrimary {
	return typeof block === 'object' && block !== null && (block as { _type?: string })._type === 'blockquoteSpecialPrimary'
}

function isBlockquoteSpecialSecondary(block: unknown): block is BlockquoteSpecialSecondary {
	return typeof block === 'object' && block !== null && (block as { _type?: string })._type === 'blockquoteSpecialSecondary'
}

type PortableTextListBlock = PortableTextBlock & {
	listItem: 'bullet' | 'number'
	level?: number
}

function isListBlock(block: unknown): block is PortableTextListBlock {
	if (typeof block !== 'object' || block === null) return false
	const candidate = block as { _type?: unknown; listItem?: unknown }
	return candidate._type === 'block' && typeof candidate.listItem === 'string'
}

// ============================================================================
// RENDERERS - Blockquotes personnalisés
// ============================================================================

function renderBlockquotePrimary(block: BlockquotePrimary, index: number) {
	return (
		<RichTextQuote
			key={block._key ?? `blockquote-primary-${index}`}
			variant='default'
			content={block.text}
			author={block.author}
		/>
	)
}

function renderBlockquoteSecondary(block: BlockquoteSecondary, index: number) {
	return (
		<RichTextQuote
			key={block._key ?? `blockquote-secondary-${index}`}
			variant='secondary'
			content={block.text}
			author={block.author}
		/>
	)
}

function renderBlockquoteSpecialPrimary(block: BlockquoteSpecialPrimary, index: number) {
	return (
		<RichTextQuoteSpecial
			key={block._key ?? `blockquote-special-primary-${index}`}
			variant='default'
			content={block.text}
			author={block.author}
		/>
	)
}

function renderBlockquoteSpecialSecondary(block: BlockquoteSpecialSecondary, index: number) {
	return (
		<RichTextQuoteSpecial
			key={block._key ?? `blockquote-special-secondary-${index}`}
			variant='secondary'
			content={block.text}
			author={block.author}
		/>
	)
}

// ============================================================================
// RENDERERS - Listes
// ============================================================================

function collectListItems(content: Array<RichTextBlock | PortableTextContent>, startIndex: number) {
	const listBlocks: PortableTextListBlock[] = []
	let j = startIndex

	const firstBlock = content[startIndex] as PortableTextListBlock
	const listType = firstBlock.listItem

	while (j < content.length) {
		const candidate = content[j]
		if (!isListBlock(candidate) || candidate.listItem !== listType) break
		listBlocks.push(candidate)
		j += 1
	}

	return { listBlocks, nextIndex: j }
}

function renderList(blocks: PortableTextListBlock[], startIndex: number) {
	const listType = blocks[0].listItem
	const items: RichTextListItem[] = blocks.map((block, idx) => {
		const spans = ((block.children as MinimalSpan[]) ?? []).map((span, spanIndex) => ({
			...span,
			_key: span._key ?? `list-span-${startIndex + idx}-${spanIndex}`,
		}))

		return {
			_key: block._key ?? `list-item-${startIndex + idx}`,
			children: spans,
			markDefs: block.markDefs ?? [],
		}
	})

	const { items: normalizedItems, variant: listVariant } = normalizeListItems(items)

	return (
		<RichTextList
			key={`list-${blocks[0]._key ?? startIndex}`}
			type={listType}
			items={normalizedItems}
			variant={listVariant}
			renderSpanNodes={renderSpanNodes}
		/>
	)
}

// ============================================================================
// RENDERER - Blocs standards (paragraphes, titres, blockquotes legacy)
// ============================================================================

function renderStandardBlock(block: RichTextBlock | PortableTextBlock, index: number): ReactNode {
	const { _type, children, style } = block
	const markDefs = (block as PortableTextBlock).markDefs ?? []
	const alignmentClass = getTextAlignFromBlock(block)

	// Blockquote legacy (style blockquote dans un bloc normal)
	if (_type === 'block' && style === 'blockquote') {
		return renderLegacyBlockquote(block, index, markDefs)
	}

	// Titres (h1-h6)
	if (_type === 'block' && style?.startsWith('h') && style.length === 2) {
		return renderHeading(block, index, markDefs, alignmentClass)
	}

	// Paragraphes
	if (_type === 'block' && (!style || style === 'normal' || style?.startsWith('text-'))) {
		return renderParagraph(block, index, markDefs, alignmentClass)
	}

	// Fallback
	return (
		<div key={index} className='text-orange-11 leading-relaxed mb-3'>
			{renderSpanNodes(children as unknown as MinimalSpan[], `fallback-${index}`, markDefs)}
		</div>
	)
}

function renderLegacyBlockquote(block: RichTextBlock | PortableTextBlock, index: number, markDefs: PortableTextBlock['markDefs']) {
	const spans = (((block as PortableTextBlock).children as MinimalSpan[]) ?? []).map((span, spanIndex) => ({
		...span,
		_key: span._key ?? `quote-span-${index}-${spanIndex}`,
	}))

	const metadata = extractQuoteMetadata(block)

	if (spans[0]?.text) {
		const parsed = stripQuoteTags(spans[0].text)
		spans[0].text = parsed.text
		if (parsed.variant) metadata.variant = parsed.variant
		if (parsed.style) metadata.style = parsed.style
		if (parsed.type) metadata.type = parsed.type
		if (parsed.feedbackVariant) metadata.feedbackVariant = parsed.feedbackVariant
		if (parsed.feedbackSize) metadata.feedbackSize = parsed.feedbackSize
		if (parsed.feedbackTitle) metadata.feedbackTitle = parsed.feedbackTitle
		if (parsed.feedbackIcon) metadata.feedbackIcon = parsed.feedbackIcon
	}

	// Feedback card
	if (metadata.type === 'feedback') {
		const feedbackProps = buildFeedbackCardProps(metadata)
		const bodySpans = spans.filter((span, spanIndex) => {
			if (spanIndex === 0) return (span?.text ?? '').trim().length > 0
			return true
		})
		return (
			<RichTextFeedbackCard
				key={getBlockKey(block, index)}
				variant={feedbackProps.variant}
				size={feedbackProps.size}
				icon={feedbackProps.icon}
				title={feedbackProps.title}>
				{renderSpanNodes(bodySpans, `feedback-${index}`, markDefs)}
			</RichTextFeedbackCard>
		)
	}

	const { contentSpans, authorSpans } = splitQuoteSpans(spans)
	const contentNodes = <>{renderSpanNodes(contentSpans, `quote-${index}`, markDefs)}</>
	const authorNodes = authorSpans.length > 0 ? <>{renderSpanNodes(authorSpans, `quote-author-${index}`, markDefs)}</> : undefined

	if (metadata.style === 'special') {
		return <RichTextQuoteSpecial key={getBlockKey(block, index)} content={contentNodes} author={authorNodes} variant={metadata.variant} />
	}

	return <RichTextQuote key={getBlockKey(block, index)} content={contentNodes} author={authorNodes} variant={metadata.variant} />
}

function renderHeading(
	block: RichTextBlock | PortableTextBlock,
	index: number,
	markDefs: PortableTextBlock['markDefs'],
	alignmentClass?: string
) {
	const style = block.style as HeadingTag
	const headingSpans = (((block as PortableTextBlock).children as MinimalSpan[]) ?? []).map((span, spanIndex) => ({
		...span,
		_key: span._key ?? `heading-span-${index}-${spanIndex}`,
	}))

	const { variant: headingVariant, spans: normalizedSpans } = normalizeHeadingSpans(headingSpans)

	const titleElement = (
		<RichTextTitle key={getBlockKey(block, index)} tag={style} variant={headingVariant} className='mb-4 mt-8 first:mt-0'>
			{renderSpanNodes(normalizedSpans, `heading-${index}`, markDefs)}
		</RichTextTitle>
	)

	if (alignmentClass) {
		return (
			<div key={getBlockKey(block, index)} className={cn('rich-text-align-wrapper', alignmentClass)}>
				{titleElement}
			</div>
		)
	}

	return titleElement
}

function renderParagraph(
	block: RichTextBlock | PortableTextBlock,
	index: number,
	markDefs: PortableTextBlock['markDefs'],
	alignmentClass?: string
) {
	const style = block.style
	const paragraphSpans = (((block as PortableTextBlock).children as MinimalSpan[]) ?? []).map((span, spanIndex) => ({
		...span,
		_key: span._key ?? `paragraph-span-${index}-${spanIndex}`,
	}))

	const { variant: paragraphVariant, spans: normalizedSpans } = normalizeParagraphSpans(paragraphSpans)
	const hasContent = normalizedSpans.some((span) => (span?.text ?? '').trim().length > 0)

	if (!hasContent) {
		return <div key={index} className='mb-4 last:mb-0 h-2' aria-hidden='true' />
	}

	const finalAlignmentClass = alignmentClass || (style?.startsWith('text-') ? style : undefined)

	const paragraphElement = (
		<p key={index} className={cn('mb-6 last:mb-0', paragraphVariant === 'primary' ? 'text-purple-10' : undefined)}>
			{renderSpanNodes(normalizedSpans, `paragraph-${index}`, markDefs)}
		</p>
	)

	if (alignmentClass && !style?.startsWith('text-')) {
		return (
			<div key={index} className={cn('rich-text-align-wrapper', alignmentClass)}>
				{paragraphElement}
			</div>
		)
	}

	if (finalAlignmentClass && style?.startsWith('text-')) {
		return (
			<p key={index} className={cn('mb-4 last:mb-0', paragraphVariant === 'primary' ? 'text-purple-10' : undefined, finalAlignmentClass)}>
				{renderSpanNodes(normalizedSpans, `paragraph-${index}`, markDefs)}
			</p>
		)
	}

	return paragraphElement
}

// ============================================================================
// SPAN RENDERER - Rendu des spans (texte, liens, formatage)
// ============================================================================

function renderSpanNodes(spans: MinimalSpan[] = [], keyPrefix: string, markDefs: PortableTextBlock['markDefs'] = []) {
	return spans
		.flatMap((span, idx) => {
			if (!span?.text) return null

			const lines = span.text.split(/\n/)

			return lines.map((line, lineIdx) => {
				const baseKey = span._key ?? `${keyPrefix}-${idx}-${lineIdx}`
				const trimmed = line
				let node: ReactNode = trimmed

				// Gestion des liens
				const standardMarks = ['strong', 'em', 'underline', 'code']
				const linkMark = span.marks?.find(
					(mark) => !standardMarks.includes(mark) && markDefs.some((def) => def._key === mark && def._type === 'link')
				)

				if (linkMark && markDefs.length > 0) {
					const linkDef = markDefs.find((def) => def._key === linkMark && def._type === 'link') as
						| { _type: 'link'; href: string; _key?: string }
						| undefined

					if (linkDef?.href) {
						const isExternal =
							linkDef.href.startsWith('http') || linkDef.href.startsWith('mailto:') || linkDef.href.startsWith('tel:')

						if (!isExternal && linkDef.href.startsWith('/')) {
							node = (
								<Link href={linkDef.href} className='text-purple-10 hover:text-purple-11 underline underline-offset-2 transition-colors'>
									{node}
								</Link>
							)
						} else {
							node = (
								<a
									href={linkDef.href}
									target={isExternal ? '_blank' : undefined}
									rel={isExternal ? 'noopener noreferrer' : undefined}
									className='text-purple-10 hover:text-purple-11 underline underline-offset-2 transition-colors'>
									{node}
								</a>
							)
						}
					}
				}

				if (span.marks?.includes('strong')) {
					node = <strong>{node}</strong>
				}

				if (span.marks?.includes('em')) {
					node = <em>{node}</em>
				}

				if (span.marks?.includes('underline')) {
					node = <u>{node}</u>
				}

				if (lineIdx === 0) {
					return <span key={baseKey}>{node}</span>
				}

				return (
					<Fragment key={baseKey}>
						<br />
						<span>{node}</span>
					</Fragment>
				)
			})
		})
		.filter(Boolean)
}

// ============================================================================
// HELPERS
// ============================================================================

function getBlockKey(block: RichTextBlock | PortableTextBlock, fallback: number) {
	const candidate = block as { _key?: string }
	return candidate._key ?? `block-${fallback}`
}

function getTextAlignFromBlock(block: RichTextBlock | PortableTextBlock): string | undefined {
	const markDefs = (block as PortableTextBlock).markDefs ?? []
	const spans = (block as PortableTextBlock).children ?? []

	for (const span of spans) {
		if (span.marks && span.marks.length > 0) {
			for (const mark of span.marks) {
				const alignDef = markDefs.find((def) => def._key === mark && def._type === 'textAlign') as
					| { _type: 'textAlign'; align: string }
					| undefined
				if (alignDef?.align) {
					return `text-${alignDef.align}`
				}
			}
		}
	}

	return undefined
}

// ============================================================================
// QUOTE HELPERS (Legacy support)
// ============================================================================

type QuoteMetadata = {
	variant: 'default' | 'secondary'
	style: 'standard' | 'special'
	type: 'standard' | 'feedback'
	feedbackVariant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'destructive'
	feedbackSize?: 'sm' | 'md' | 'lg'
	feedbackIcon?: IconName
	feedbackTitle?: string
}

type QuoteVariantMark = {
	_type?: string
	variant?: 'default' | 'secondary'
	style?: 'standard' | 'special'
}

function extractQuoteMetadata(block: RichTextBlock | PortableTextBlock): QuoteMetadata {
	const markDefs = (block as PortableTextBlock).markDefs as QuoteVariantMark[] | undefined
	const mark = markDefs?.find((def) => def?._type === 'quoteVariant')

	return {
		variant: mark?.variant === 'secondary' ? 'secondary' : 'default',
		style: mark?.style === 'special' ? 'special' : 'standard',
		type: 'standard',
	}
}

function stripQuoteTags(text: string) {
	let remaining = text
	let variant: QuoteMetadata['variant'] | undefined
	let style: QuoteMetadata['style'] | undefined
	let type: QuoteMetadata['type'] | undefined
	let feedbackVariant: QuoteMetadata['feedbackVariant'] | undefined
	let feedbackSize: QuoteMetadata['feedbackSize'] | undefined
	let feedbackTitle: string | undefined
	let feedbackIcon: IconName | undefined

	const tagPattern =
		/^\{(type|variant|style|size|title|icon):(default|secondary|standard|special|feedback|primary|success|info|warning|destructive|sm|md|lg|[^}]+)\}\s*/i

	let match = tagPattern.exec(remaining)

	while (match) {
		const [, rawKey, rawValue] = match
		const key = rawKey.toLowerCase()
		const value = rawValue.toLowerCase()

		if (key === 'type' && value === 'feedback') {
			type = 'feedback'
		}

		if (key === 'variant') {
			if (value === 'default' || value === 'secondary') {
				variant = value as QuoteMetadata['variant']
			}
			if (['primary', 'secondary', 'success', 'info', 'warning', 'destructive'].includes(value)) {
				feedbackVariant = value as QuoteMetadata['feedbackVariant']
			}
		}

		if (key === 'style' && (value === 'standard' || value === 'special')) {
			style = value as QuoteMetadata['style']
		}

		if (key === 'size' && ['sm', 'md', 'lg'].includes(value)) {
			feedbackSize = value as QuoteMetadata['feedbackSize']
		}

		if (key === 'title') {
			feedbackTitle = rawValue.slice(0)
		}

		if (key === 'icon') {
			const normalizedIcon = normalizeIconName(rawValue)
			if (normalizedIcon) {
				feedbackIcon = normalizedIcon
			}
		}

		remaining = remaining.slice(match[0].length)
		match = tagPattern.exec(remaining)
	}

	return { text: remaining, variant, style, type, feedbackVariant, feedbackSize, feedbackTitle, feedbackIcon }
}

function splitQuoteSpans(spans: MinimalSpan[]) {
	const content: MinimalSpan[] = []
	const author: MinimalSpan[] = []
	let authorMode = false

	const citeRegex = /\{cite(?::([^}]*))?\}/i

	spans.forEach((span, idx) => {
		if (!span?.text) {
			;(authorMode ? author : content).push(span)
			return
		}

		const match = citeRegex.exec(span.text)
		if (match) {
			const before = span.text.slice(0, match.index).trim()
			const explicit = match[1]?.trim()
			const afterMarker = span.text.slice(match.index + match[0].length).trim()

			if (before) {
				content.push({ ...span, _key: `${span._key ?? `quote-span-${idx}`}-pre`, text: before })
			}

			const authorText = explicit ?? afterMarker
			if (authorText) {
				author.push({ ...span, _key: `${span._key ?? `quote-span-${idx}`}-author`, text: authorText })
			}

			authorMode = true
			return
		}

		if (!authorMode) {
			content.push(span)
		} else {
			author.push(span)
		}
	})

	return { contentSpans: content, authorSpans: author }
}

// ============================================================================
// HEADING & PARAGRAPH NORMALIZATION
// ============================================================================

function normalizeHeadingSpans(spans: MinimalSpan[]) {
	if (spans.length === 0) {
		return { spans, variant: undefined as RichTextTitleVariant | undefined }
	}

	const cloned = spans.map((span, idx) => ({
		...span,
		_key: span._key ?? `heading-span-generic-${idx}`,
	}))

	let variant: RichTextTitleVariant | undefined
	const firstSpan = { ...cloned[0] }
	let firstText = firstSpan.text ?? ''

	const variantPattern = /^\{variant:(default|secondary|muted)\}\s*/i
	const variantMatch = variantPattern.exec(firstText)

	if (variantMatch) {
		variant = variantMatch[1].toLowerCase() as RichTextTitleVariant
		firstText = firstText.slice(variantMatch[0].length)
	}

	firstSpan.text = firstText
	cloned[0] = firstSpan

	const cleanupPattern = /\{(?:variant:(?:default|secondary|muted)|cite(?::[^}]+)?)\}/gi

	const cleaned = cloned.map((span) => {
		if (!span?.text) return span
		const cleanedText = span.text.replace(cleanupPattern, '')
		if (cleanedText === span.text) return span
		return { ...span, text: cleanedText }
	})

	return { spans: cleaned, variant }
}

function normalizeParagraphSpans(spans: MinimalSpan[]) {
	if (spans.length === 0) {
		return { spans, variant: undefined as 'primary' | undefined }
	}

	const cloned = spans.map((span, idx) => ({
		...span,
		_key: span._key ?? `paragraph-span-${idx}`,
	}))

	let variant: 'primary' | undefined
	const firstSpan = { ...cloned[0] }
	let firstText = firstSpan.text ?? ''

	const variantPattern = /^\{variant:(primary)\}\s*/i
	const variantMatch = variantPattern.exec(firstText)

	if (variantMatch) {
		variant = variantMatch[1].toLowerCase() as 'primary'
		firstText = firstText.slice(variantMatch[0].length)
	}

	firstSpan.text = firstText
	cloned[0] = firstSpan

	const cleanupPattern = /\{variant:(?:primary|default)\}/gi

	const cleaned = cloned.map((span) => {
		if (!span?.text) return span
		const cleanedText = span.text.replace(cleanupPattern, '')
		if (cleanedText === span.text) return span
		return { ...span, text: cleanedText }
	})

	return { spans: cleaned, variant }
}

// ============================================================================
// LIST NORMALIZATION
// ============================================================================

function normalizeListItems(items: RichTextListItem[]) {
	let detectedVariant: 'primary' | undefined

	const normalizedItems = items.map((item, itemIndex) => {
		const spans = (item.children ?? []).map((span, spanIndex) => ({
			...span,
			_key: span._key ?? `list-item-${itemIndex}-span-${spanIndex}`,
		}))

		const { spans: cleanedSpans, variant } = normalizeListItemSpans(spans)

		if (!detectedVariant && variant) {
			detectedVariant = variant
		}

		return { ...item, children: cleanedSpans }
	})

	return { items: normalizedItems, variant: detectedVariant }
}

function normalizeListItemSpans(spans: MinimalSpan[]) {
	if (spans.length === 0) {
		return { spans, variant: undefined as 'primary' | undefined }
	}

	const cloned = spans.map((span, idx) => ({
		...span,
		_key: span._key ?? `list-span-generic-${idx}`,
	}))

	let variant: 'primary' | undefined
	const firstSpan = { ...cloned[0] }
	let firstText = firstSpan.text ?? ''

	const variantPattern = /^\{variant:(primary)\}\s*/i
	const variantMatch = variantPattern.exec(firstText)

	if (variantMatch) {
		variant = variantMatch[1].toLowerCase() as 'primary'
		firstText = firstText.slice(variantMatch[0].length)
	}

	firstSpan.text = firstText.trimStart()
	cloned[0] = firstSpan

	const cleanupPattern = /\{variant:(?:primary|default)\}/gi

	const cleaned = cloned.map((span) => {
		if (!span?.text) return span
		const cleanedText = span.text.replace(cleanupPattern, '')
		if (cleanedText === span.text) return span
		return { ...span, text: cleanedText }
	})

	return { spans: cleaned, variant }
}

// ============================================================================
// FEEDBACK CARD HELPERS
// ============================================================================

const DEFAULT_FEEDBACK_ICONS: Record<'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'destructive', IconName> = {
	primary: 'info',
	secondary: 'info',
	success: 'success',
	info: 'info',
	warning: 'warning',
	destructive: 'error',
}

function buildFeedbackCardProps(metadata: QuoteMetadata) {
	const variant = metadata.feedbackVariant ?? 'primary'
	const size = metadata.feedbackSize ?? 'md'
	const icon = metadata.feedbackIcon ?? DEFAULT_FEEDBACK_ICONS[variant]

	return {
		variant,
		size,
		icon,
		title: metadata.feedbackTitle?.trim().length ? metadata.feedbackTitle.trim() : undefined,
	}
}

function normalizeIconName(rawValue: string): IconName | undefined {
	const trimmed = rawValue.trim()
	if (!trimmed) return undefined
	if (isIconName(trimmed)) return trimmed

	const camelCased = trimmed.toLowerCase().replace(/[-_\s]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''))

	if (isIconName(camelCased)) {
		return camelCased as IconName
	}

	return undefined
}

function isIconName(value: string): value is IconName {
	return value in ICONS
}

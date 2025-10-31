/**
 * RichTextRenderer est un composant qui rend le contenu riche en texte.
 * Il est utilisé pour rendre le contenu riche en texte dans les pages et les composants.
 * Il gère les blocs de texte, les citations, les titres, les listes, les paragraphes, etc.
 * Des conditions seronts mises en place pour gérer les différents cas de figure suivant le composant parent et le style de celui-ci, on utilise le composant et le variant adapté. code plus soft car ne fait que retourner le composant créé en y passant les props.
 * Celui-ci gèrera la logique de rendu du contenu riche en texte.
 */
import { RichTextList, type RichTextListItem } from "@/components/shared/richtext/RichTextList"
import { RichTextQuote, RichTextQuoteSpecial } from "@/components/shared/richtext/RichTextQuote"
import type { HeadingTag, RichTextTitleVariant } from "@/components/shared/richtext/RichTextTitle"
import { RichTextTitle } from "@/components/shared/richtext/RichTextTitle"
import { cn } from "@/lib/utils"
import { RichTextBlock } from "@/types/richText"
import type { PortableTextBlock } from "@/types/sanity/portableText"
import { Fragment, type ReactNode } from "react"

type RichTextRendererProps = {
  content: Array<RichTextBlock | PortableTextBlock>
  className?: string
}

export function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  if (!content || content.length === 0) {
    return null
  }

  const renderSpanNodes = (spans: MinimalSpan[] = [], keyPrefix: string) => {
    return spans
      .flatMap((span, idx) => {
        if (!span?.text) return null

        const lines = span.text.split(/\n/)

        return lines.map((line, lineIdx) => {
          const baseKey = span._key ?? `${keyPrefix}-${idx}-${lineIdx}`
          const trimmed = line
          let node: ReactNode = trimmed

          if (span.marks?.includes('strong')) {
            node = <strong>{node}</strong>
          }

          if (span.marks?.includes('em')) {
            node = <em>{node}</em>
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

  const renderBlock = (block: RichTextBlock | PortableTextBlock, index: number) => {
    const { _type, children, style } = block

    if (_type === 'block' && style === 'blockquote') {
      const spans = ((children as MinimalSpan[]) ?? []).map((span, spanIndex) => ({
        ...span,
        _key: span._key ?? `quote-span-${index}-${spanIndex}`,
      }))

      const metadata = extractQuoteMetadata(block)

      if (spans[0]?.text) {
        const { text, variant, style: styleOverride } = stripQuoteTags(spans[0].text)
        spans[0].text = text
        if (variant) metadata.variant = variant
        if (styleOverride) metadata.style = styleOverride
      }

      const { contentSpans, authorSpans } = splitQuoteSpans(spans)

      const contentNodes = <>{renderSpanNodes(contentSpans, `quote-${index}`)}</>
      const authorNodes = authorSpans.length > 0
        ? <>{renderSpanNodes(authorSpans, `quote-author-${index}`)}</>
        : undefined

      if (metadata.style === 'special') {
        return (
          <RichTextQuoteSpecial
            key={getBlockKey(block, index)}
            content={contentNodes}
            author={authorNodes}
            variant={metadata.variant}
          />
        )
      }

      return (
        <RichTextQuote
          key={getBlockKey(block, index)}
          content={contentNodes}
          author={authorNodes}
          variant={metadata.variant}
        />
      )
    }

    // Gestion des titres
    if (_type === 'block' && style?.startsWith('h')) {
      const tag = style as HeadingTag
      const headingSpans = ((children as MinimalSpan[]) ?? []).map((span, spanIndex) => ({
        ...span,
        _key: span._key ?? `heading-span-${index}-${spanIndex}`,
      }))

      const { variant: headingVariant, spans: normalizedSpans } = normalizeHeadingSpans(headingSpans)

      return (
        <RichTextTitle
          key={getBlockKey(block, index)}
          tag={tag}
          variant={headingVariant}
          className="mb-4 mt-4 first:mt-0"
        >
          {renderSpanNodes(normalizedSpans, `heading-${index}`)}
        </RichTextTitle>
      )
    }

    // Gestion des paragraphes
    if (_type === 'block' && (!style || style === 'normal')) {
      const paragraphSpans = ((children as MinimalSpan[]) ?? []).map((span, spanIndex) => ({
        ...span,
        _key: span._key ?? `paragraph-span-${index}-${spanIndex}`,
      }))

      const { variant: paragraphVariant, spans: normalizedSpans } = normalizeParagraphSpans(paragraphSpans)

      const hasContent = normalizedSpans.some((span) => (span?.text ?? '').trim().length > 0)

      if (!hasContent) {
        return <div key={index} className="mb-3 h-2" aria-hidden="true" />
      }

      return (
        <p
          key={index}
          className={cn(
            "leading-relaxed mb-3",
            paragraphVariant === "primary" ? "text-purple-10" : undefined,
          )}
        >
          {renderSpanNodes(normalizedSpans, `paragraph-${index}`)}
        </p>
      )
    }


    // Fallback pour les autres types
    return (
      <div key={index} className="text-orange-11 leading-relaxed mb-3">
        {renderSpanNodes(children as unknown as MinimalSpan[], `fallback-${index}`)}
      </div>
    )
  }

  const renderedBlocks: ReactNode[] = []

  for (let i = 0; i < content.length; i += 1) {
    const block = content[i]

    if (isListBlock(block)) {
      const listType = block.listItem
      const items: RichTextListItem[] = []
      let j = i

      while (j < content.length) {
        const candidate = content[j]
        if (!isListBlock(candidate) || candidate.listItem !== listType) {
          break
        }

        const spans = ((candidate.children as MinimalSpan[]) ?? []).map((span, spanIndex) => ({
          ...span,
          _key: span._key ?? `list-span-${j}-${spanIndex}`,
        }))

        items.push({
          _key: getBlockKey(candidate, j),
          children: spans,
        })
        j += 1
      }

      const { items: normalizedItems, variant: listVariant } = normalizeListItems(items)

      renderedBlocks.push(
        <RichTextList
          key={`list-${getBlockKey(block, i)}`}
          type={listType}
          items={normalizedItems}
          variant={listVariant}
          renderSpanNodes={renderSpanNodes}
        />
      )

      i = j - 1
      continue
    }

    const rendered = renderBlock(block, i)
    if (rendered) {
      renderedBlocks.push(rendered)
    }
  }

  return (
    <div className={`rich-text-content ${className}`}>
      {renderedBlocks.map((node, idx) => (
        <Fragment key={idx}>{node}</Fragment>
      ))}
    </div>
  )
}

function getBlockKey(block: RichTextBlock | PortableTextBlock, fallback: number) {
  const candidate = block as { _key?: string }
  return candidate._key ?? `block-${fallback}`
}

type MinimalSpan = { _type: string; text: string; marks?: string[]; _key?: string }

type PortableTextListBlock = PortableTextBlock & {
  listItem: 'bullet' | 'number'
  level?: number
}

function isListBlock(block: unknown): block is PortableTextListBlock {
  if (typeof block !== 'object' || block === null) {
    return false
  }

  const candidate = block as { _type?: unknown; listItem?: unknown }
  return candidate._type === 'block' && typeof candidate.listItem === 'string'
}

type QuoteMetadata = {
  variant: 'default' | 'secondary'
  style: 'standard' | 'special'
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
  }
}

function stripQuoteTags(text: string) {
  let remaining = text
  let variant: QuoteMetadata['variant'] | undefined
  let style: QuoteMetadata['style'] | undefined

  const tagPattern = /^\{(variant|style):(default|secondary|standard|special)\}\s*/i

  let match = tagPattern.exec(remaining)

  while (match) {
    const [, key, value] = match
    if (key.toLowerCase() === 'variant' && (value === 'default' || value === 'secondary')) {
      variant = value as QuoteMetadata['variant']
    }
    if (key.toLowerCase() === 'style' && (value === 'standard' || value === 'special')) {
      style = value as QuoteMetadata['style']
    }
    remaining = remaining.slice(match[0].length)
    match = tagPattern.exec(remaining)
  }

  return { text: remaining, variant, style }
}

// (helpers d'images supprimés pour le moment; les images rich-text sont gérées ailleurs)

function splitQuoteSpans(spans: MinimalSpan[]) {
  const content: MinimalSpan[] = []
  const author: MinimalSpan[] = []
  let authorMode = false

  const citeRegex = /\{cite(?::([^}]*))?\}/i

  spans.forEach((span, idx) => {
    if (!span?.text) {
      (authorMode ? author : content).push(span)
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
  let firstText = firstSpan.text ?? ""

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

    const cleanedText = span.text.replace(cleanupPattern, "")
    if (cleanedText === span.text) {
      return span
    }

    return {
      ...span,
      text: cleanedText,
    }
  })

  return { spans: cleaned, variant }
}

function normalizeParagraphSpans(spans: MinimalSpan[]) {
  if (spans.length === 0) {
    return { spans, variant: undefined as "primary" | undefined }
  }

  const cloned = spans.map((span, idx) => ({
    ...span,
    _key: span._key ?? `paragraph-span-${idx}`,
  }))

  let variant: "primary" | undefined
  const firstSpan = { ...cloned[0] }
  let firstText = firstSpan.text ?? ""

  const variantPattern = /^\{variant:(primary)\}\s*/i
  const variantMatch = variantPattern.exec(firstText)

  if (variantMatch) {
    variant = variantMatch[1].toLowerCase() as "primary"
    firstText = firstText.slice(variantMatch[0].length)
  }

  firstSpan.text = firstText
  cloned[0] = firstSpan

  const cleanupPattern = /\{variant:(?:primary|default)\}/gi

  const cleaned = cloned.map((span) => {
    if (!span?.text) return span

    const cleanedText = span.text.replace(cleanupPattern, "")
    if (cleanedText === span.text) {
      return span
    }

    return {
      ...span,
      text: cleanedText,
    }
  })

  return { spans: cleaned, variant }
}

function normalizeListItems(items: RichTextListItem[]) {
  let detectedVariant: "primary" | undefined

  const normalizedItems = items.map((item, itemIndex) => {
    const spans = (item.children ?? []).map((span, spanIndex) => ({
      ...span,
      _key: span._key ?? `list-item-${itemIndex}-span-${spanIndex}`,
    }))

    const { spans: cleanedSpans, variant } = normalizeListItemSpans(spans)

    if (!detectedVariant && variant) {
      detectedVariant = variant
    }

    return {
      ...item,
      children: cleanedSpans,
    }
  })

  return {
    items: normalizedItems,
    variant: detectedVariant,
  }
}

function normalizeListItemSpans(spans: MinimalSpan[]) {
  if (spans.length === 0) {
    return { spans, variant: undefined as "primary" | undefined }
  }

  const cloned = spans.map((span, idx) => ({
    ...span,
    _key: span._key ?? `list-span-generic-${idx}`,
  }))

  let variant: "primary" | undefined
  const firstSpan = { ...cloned[0] }
  let firstText = firstSpan.text ?? ""

  const variantPattern = /^\{variant:(primary)\}\s*/i
  const variantMatch = variantPattern.exec(firstText)

  if (variantMatch) {
    variant = variantMatch[1].toLowerCase() as "primary"
    firstText = firstText.slice(variantMatch[0].length)
  }

  firstSpan.text = firstText.trimStart()
  cloned[0] = firstSpan

  const cleanupPattern = /\{variant:(?:primary|default)\}/gi

  const cleaned = cloned.map((span) => {
    if (!span?.text) return span

    const cleanedText = span.text.replace(cleanupPattern, "")
    if (cleanedText === span.text) {
      return span
    }

    return {
      ...span,
      text: cleanedText,
    }
  })

  return { spans: cleaned, variant }
}

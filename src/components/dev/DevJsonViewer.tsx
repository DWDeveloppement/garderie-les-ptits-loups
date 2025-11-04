// 📂 src/components/dev/DevJsonViewer.tsx
// 👉 Composant de debug pour afficher les données JSON en développement

'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import * as React from 'react'

type DevJsonViewerProps = {
	data: unknown
	slug?: string
	title?: string
	collapsed?: boolean
}

/**
 * Composant de debug pour afficher les données JSON
 * **Visible uniquement en développement (NODE_ENV !== 'production')**
 *
 * @example
 * ```tsx
 * <DevJsonViewer data={pageData} slug="nurserie" />
 * <DevJsonViewer data={pageData} slug="home" title="Page d'accueil" />
 * ```
 */
export function DevJsonViewer({ data, slug, title, collapsed = true }: DevJsonViewerProps) {
	const [isOpen, setIsOpen] = React.useState(!collapsed)
	const [copySuccess, setCopySuccess] = React.useState(false)

	// Masquer en production
	if (process.env.NODE_ENV === 'production') {
		return null
	}

	const jsonString = JSON.stringify(data, null, 2)

	// Titre par défaut basé sur le slug ou custom
	const displayTitle = title || (slug ? `/${slug}` : 'Debug Data')

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(jsonString)
			setCopySuccess(true)
			setTimeout(() => setCopySuccess(false), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	return (
		<div className='fixed bottom-0 left-0 right-0 z-[9999] border-t-4 border-yellow-500 bg-gray-900 text-white shadow-2xl'>
			{/* Header */}
			<div className='flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-2'>
				<div className='flex items-center gap-3'>
					<span className='rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-black'>DEV</span>
					<h3 className='text-sm font-semibold font-mono'>{displayTitle}</h3>
					{slug && <span className='rounded bg-blue-600 px-2 py-0.5 text-xs font-mono'>{slug}</span>}
					<span className='text-xs text-gray-400'>({typeof data === 'object' && data ? Object.keys(data).length : 0} keys)</span>
				</div>
				<div className='flex items-center gap-2'>
					<button onClick={handleCopy} className='rounded bg-gray-700 px-3 py-1 text-xs font-medium transition-colors hover:bg-gray-600'>
						{copySuccess ? '✓ Copied!' : '📋 Copy JSON'}
					</button>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='rounded bg-gray-700 px-3 py-1 text-xs font-medium transition-colors hover:bg-gray-600'>
						{isOpen ? '▼ Hide' : '▶ Show'}
					</button>
				</div>
			</div>

			{/* Content */}
			{isOpen && (
				<ScrollArea className='max-h-[40vh] bg-gray-900'>
					<div className='p-4'>
						<pre className='text-xs'>
							<code className='language-json'>{jsonString}</code>
						</pre>
					</div>
				</ScrollArea>
			)}
		</div>
	)
}

/**
 * Version inline pour debug contextuel
 */
export function DevJsonBlock({ data, slug, title }: Omit<DevJsonViewerProps, 'collapsed'>) {
	if (process.env.NODE_ENV === 'production') {
		return null
	}

	const displayTitle = title || (slug ? `/${slug}` : 'Debug Data')

	return (
		<details className='my-4 rounded-lg border-2 border-yellow-500 bg-gray-900 p-4 text-white'>
			<summary className='cursor-pointer font-mono text-sm font-bold'>
				<span className='mr-2 rounded bg-yellow-500 px-2 py-1 text-xs text-black'>DEV</span>
				{displayTitle}
				{slug && <span className='ml-2 rounded bg-blue-600 px-2 py-0.5 text-xs'>{slug}</span>}
			</summary>
			<pre className='mt-4 overflow-auto text-xs'>
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</details>
	)
}

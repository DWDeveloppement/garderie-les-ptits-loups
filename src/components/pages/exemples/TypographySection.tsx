/**
 * Section de typographie pour la page Exemples
 * @returns {JSX.Element}
 */
import { BlockQuote, BlockQuoteCard } from '@/components/shared/BlockQuote'

export function TypographySection() {
	return (
		<section className='space-y-6'>
			<h2 className='font-bold'>Système Typographique Fluide</h2>
			<h3 className='font-semibold'>Exemple d&apos;usage des classes fluides</h3>
			<p className='text-gray-700'>
				Ce système utilise des classes fluides basées sur Utopia.fyi pour une typographie et un espacement qui s&apos;adaptent
				automatiquement à la taille de l&apos;écran.
			</p>
			<div className='space-y-3'>
				<h4 className='font-medium'>Titre de sections</h4>
				<ul className='list-none text-purple-10 font-display'>
					<li>
						<p className='text-fl-4xl'>Titre de niveau 1 (h1)</p>
					</li>
					<li>
						<p className='text-fl-3xl'>Titre de niveau 2 (h2)</p>
					</li>
					<li>
						<p className='text-fl-2xl'>Titre de niveau 3 (h3)</p>
					</li>
					<li>
						<p className='text-fl-xl'>Titre de niveau 4 (h4)</p>
					</li>
					<li>
						<p className='text-fl-lg'>Titre de niveau 5 (h5)</p>
					</li>
					<li>
						<p className='text-fl-base'>Titre de niveau 6 (h6)</p>
					</li>
				</ul>
			</div>
			<div className='space-y-3'>
				<h4 className='font-medium'>Paragraphes</h4>
				<p className='text-fl-base'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
				</p>
				<p className='text-fl-lg leading-fl-6'>Paragraphe avec texte plus grand pour les introductions importantes.</p>
				<p className='text-fl-base'>
					Lorem ipsum dolor <strong>sit amet consectetur</strong> adipisicing elit. Quisquam, quos. adipisicing elit. Quisquam, quos.{' '}
					<strong>
						<em>Lorem ipsum dolor</em>
					</strong>{' '}
					sit amet consectetur adipisicing elit. <em>Quisquam, quos.</em> Lorem ipsum dolor <a href='#'>sit amet consectetur</a> adipisicing
					elit. Quisquam, quos.
				</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<h4 className='font-medium'>Listes non ordonnées</h4>
					<ul className='list-disc list-inside'>
						<li>item 1</li>
						<li>item 2</li>
						<li>item 3</li>
					</ul>
				</div>
				<div>
					<h4 className='font-medium'>Listes ordonnées</h4>
					<ol className='list-decimal list-inside'>
						<li>item 1</li>
						<li>item 2</li>
						<li>item 3</li>
					</ol>
				</div>
			</div>
			<div className='space-y-3'>
				<h4 className='font-medium'>Citations</h4>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{/* Citation de Carte default et secondary */}
					<BlockQuote
						variant="default"
						content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
						author='John Doe'
					/>
					<BlockQuote
						variant='secondary'
						content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
						author='John Doe'
					/>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<BlockQuoteCard
						variant="primary"
						content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
						author='John Doe'
					/>
					<BlockQuoteCard
						variant='secondary'
						content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
						author='John Doe'
					/>
				</div>
			</div>
		</section>
	)
}

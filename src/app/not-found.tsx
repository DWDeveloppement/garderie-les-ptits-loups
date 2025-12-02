import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center px-4 gradient-section-a'>
			<div className='max-w-2xl w-full text-center'>
				{/* Logo */}
				<div className='mb-8 flex justify-center'>
					<div className='relative w-40 h-40'>
						<Image src='/logo-les-ptits-loups.webp' alt="Logo Garderie Les P'tits Loups" fill className='object-contain' priority />
					</div>
				</div>

				{/* Error 404 */}
				<h1 className='text-9xl font-bold text-purple-9 mb-4'>404</h1>

				{/* Message */}
				<h2 className='text-fl-2xl font-bold text-purple-9 mb-4'>Page introuvable</h2>
				<p className='text-fl-base text-neutral-11 mb-8 max-w-md mx-auto'>
					Oups ! La page que vous recherchez n&apos;existe pas ou a été déplacée.
				</p>

				{/* Bouton retour accueil */}
				<Link
					href='/'
					className='inline-flex items-center gap-2 px-8 py-4 bg-purple-9 text-white rounded-full font-semibold hover:bg-purple-10 transition-colors duration-300 shadow-lg hover:shadow-xl'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<path d='m12 19-7-7 7-7' />
						<path d='M19 12H5' />
					</svg>
					Retour à l&apos;accueil
				</Link>

				{/* Liens utiles */}
				<div className='mt-12 pt-8 border-t border-neutral-6'>
					<p className='text-sm text-neutral-11 mb-4'>Vous cherchez peut-être :</p>
					<div className='flex flex-wrap justify-center gap-4'>
						<Link href='/a-propos' className='text-purple-9 hover:text-purple-10 underline text-sm'>
							À propos
						</Link>
						<Link href='/la-structure/nurserie' className='text-purple-9 hover:text-purple-10 underline text-sm'>
							La Nurserie
						</Link>
						<Link href='/la-structure/trotteurs' className='text-purple-9 hover:text-purple-10 underline text-sm'>
							Les Trotteurs
						</Link>
						<Link href='/la-structure/grands' className='text-purple-9 hover:text-purple-10 underline text-sm'>
							Les Grands
						</Link>
						<Link href='/la-structure/autres-espaces' className='text-purple-9 hover:text-purple-10 underline text-sm'>
							Nos autres espaces
						</Link>
						<Link href='/tarifs' className='text-purple-9 hover:text-purple-10 underline text-sm'>
							Tarifs
						</Link>
						<Link href='/contact' className='text-purple-9 hover:text-purple-10 underline text-sm'>
							Contact
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

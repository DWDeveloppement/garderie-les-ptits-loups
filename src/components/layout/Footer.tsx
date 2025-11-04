import { fetchFooterData } from 'lib/sanity/queries'
import Link from 'next/link'
import { Icon } from '../icons/Icon'
import { Separator } from '../ui/separator'

export async function Footer() {
	// Récupération des données de contact depuis Sanity
	const data = await fetchFooterData()
	return (
		<footer className='bg-purple-12 text-orange-1 mb-16 md:mb-0'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Logo et Description */}
					<div className='lg:col-span-2'>
						<div className='flex items-center space-x-2 mb-4'>
							<h4 className='text-orange-6 font-bold'>{data?.contactInfo?.name}</h4>
						</div>
						{/* Description de la garderie qui viendra de Sanity depuis contact.ts de contactInfo fields description*/}
						<p className='text-orange-4 mb-4 leading-relaxed'>{data?.contactInfo?.description}</p>
						<div className='flex space-x-4'>
							{/* Socials seront retournés depuis Sanity et rendus si le tableau des liens sociaux n'est pas vide. 
                  Pour l'instant rien dans sanity n'est encore installé pour les socials mais à placer plus tard 
                  une fois le rendu des autres éléments confirmés et la gestion des socials implémentée */}
							{/* TODO: Ajouter les socials dans le schéma contact.ts et les récupérer ici */}
						</div>
					</div>

					{/* Contact */}
					<div>
						<h4 className='text-orange-6 font-bold mb-4'>Contact</h4>
						<div className='space-y-3'>
							<div className='flex items-start space-x-3'>
								<Icon name='mapPin' size='lg' aria-hidden className='mt-1.5' />
								<div className='text-orange-4'>
									<p>{data?.contactInfo?.address}</p>
									<p>
										{data?.contactInfo?.postalCode} {data?.contactInfo?.city} {data?.contactInfo?.country}
									</p>
								</div>
							</div>
							<div className='flex items-center space-x-2'>
								<Icon name='phone' size='lg' aria-hidden />
								<a
									href={`tel:${data?.contactInfo?.phone}`}
									className='px-2 py-1 text-orange-4 hover:text-orange-2 transition-colors outline-none focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:rounded-lg focus-visible:ring-offset-2'>
									{data?.contactInfo?.phone}
								</a>
							</div>
							<div className='flex items-center space-x-3'>
								<Icon name='mail' size='lg' aria-hidden />
								<a
									href={`mailto:${data?.contactInfo?.email}`}
									className='px-2 py-1 text-orange-4 hover:text-orange-2 transition-colors outline-none focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:rounded-lg focus-visible:ring-offset-2'>
									{data?.contactInfo?.email}
								</a>
							</div>
						</div>
					</div>

					{/* Horaires */}
					<div>
						<h4 className='text-orange-6 font-bold mb-4'>Horaires</h4>
						<div className='space-y-3'>
							<div className='flex items-start space-x-3'>
								<Icon name='clock' size='lg' aria-hidden className='mt-1.5' />
								<div className='text-orange-4 whitespace-pre-line'>
									{/* Horaires qui viendra de Sanity depuis contact.ts de contactInfo fields openingHours*/}
									{data?.contactInfo?.openingHours}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Ligne de séparation */}
				<Separator orientation='horizontal' className='flex my-12 ' />
				<div className='flex flex-col md:flex-row justify-between items-center '>
					<p className='text-orange-4 text-sm'>
						&copy; {new Date().getFullYear()} {data?.contactInfo?.name}. Tous droits réservés.
					</p>
					<div className='flex space-x-6 mt-4 md:mt-0'>
						<Link
							href='/mentions-legales'
							className='px-2 py-1 text-orange-4 hover:text-orange-2 text-sm transition-colors outline-none focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[1px] focus-visible:rounded-lg focus-visible:ring-offset-2'>
							Mentions légales
						</Link>
						<Link
							href='/politique-confidentialite'
							className='px-2 py-1 text-orange-4 hover:text-orange-2 text-sm transition-colors outline-none focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:rounded-lg focus-visible:ring-offset-2'>
							Politique de confidentialité
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

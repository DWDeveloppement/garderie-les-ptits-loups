'use client'

import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '@/components/ui/accordion'

export function TarifsSection() {
  return (
		<section className='py-16 px-4 sm:px-6 lg:px-8 bg-orange-1'>
			<div className='max-w-6xl mx-auto'>
				{/* En-tête de section */}
				{/* Section Nurserie */}
				<div className='mb-16'>
					<h2 className='text-2xl font-bold text-purple-12 mb-4 text-center'>La Nurserie (3 mois - 18 mois)</h2>
					<article className='space-y-4'>
						<h3 className='text-xl font-bold text-purple-12 mb-4 text-center'>Tarifs au mois</h3>
						<AccordionRoot type='single' collapsible className='space-y-4'>
							<AccordionItem value='full-day'>
								<AccordionTrigger>Journée complète</AccordionTrigger>
								<AccordionContent>
									<table>
										<tr>
											<td>1 jour / semaine</td>
											<td>CHF 180</td>
										</tr>
										<tr>
											<td>2 jours / semaine</td>
											<td>CHF 360</td>
										</tr>
										<tr>
											<td>3 jours / semaine</td>
											<td>CHF 540</td>
										</tr>
										<tr>
											<td>4 jours / semaine</td>
											<td>CHF 720</td>
										</tr>
										<tr>
											<td>5 jours / semaine</td>
											<td>CHF 900</td>
										</tr>
									</table>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value='morning-day-with-lunch'>
								<AccordionTrigger>Matin avec repas</AccordionTrigger>
								<AccordionContent>
									<table>
										<tr>
											<td>1 jour / semaine</td>
											<td>CHF 180</td>
										</tr>
										<tr>
											<td>2 jours / semaine</td>
											<td>CHF 360</td>
										</tr>
										<tr>
											<td>3 jours / semaine</td>
											<td>CHF 540</td>
										</tr>
										<tr>
											<td>4 jours / semaine</td>
											<td>CHF 720</td>
										</tr>
										<tr>
											<td>5 jours / semaine</td>
											<td>CHF 900</td>
										</tr>
									</table>
								</AccordionContent>
							</AccordionItem>
						</AccordionRoot>
					</article>
					<article className='space-y-4'>
						<AccordionRoot type='single' collapsible className='space-y-4'>
							<AccordionItem value='nurserie-tarifs'>
								<AccordionTrigger>Tarifs et services inclus</AccordionTrigger>
								<AccordionContent>
									<div className='space-y-4'>
										<div className='text-center mb-6'>
											<div className='text-3xl font-bold text-purple-11 mb-2'>CHF 85</div>
											<div className='text-orange-10'>par jour</div>
										</div>
										<div className='space-y-3'>
											<div className='flex items-center'>
												<span className='w-2 h-2 bg-purple-9 rounded-full mr-3'></span>
												<span>Repas équilibrés (petit-déjeuner, collation, déjeuner, goûter)</span>
											</div>
											<div className='flex items-center'>
												<span className='w-2 h-2 bg-purple-9 rounded-full mr-3'></span>
												<span>Couches et produits de soins fournis</span>
											</div>
											<div className='flex items-center'>
												<span className='w-2 h-2 bg-purple-9 rounded-full mr-3'></span>
												<span>Soins spécialisés et suivi médical</span>
											</div>
											<div className='flex items-center'>
												<span className='w-2 h-2 bg-purple-9 rounded-full mr-3'></span>
												<span>Matériel pédagogique adapté</span>
											</div>
											<div className='flex items-center'>
												<span className='w-2 h-2 bg-purple-9 rounded-full mr-3'></span>
												<span>Assurance complète incluse</span>
											</div>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='nurserie-modalites'>
								<AccordionTrigger>Modalités de paiement</AccordionTrigger>
								<AccordionContent>
									<div className='space-y-4'>
										<div className='grid md:grid-cols-2 gap-4'>
											<div>
												<h4 className='font-semibold text-purple-11 mb-2'>Fréquence</h4>
												<p className='text-orange-10'>Facturation mensuelle</p>
											</div>
											<div>
												<h4 className='font-semibold text-purple-11 mb-2'>Délai de paiement</h4>
												<p className='text-orange-10'>30 jours net</p>
											</div>
										</div>
										<div>
											<h4 className='font-semibold text-purple-11 mb-2'>Moyens de paiement</h4>
											<p className='text-orange-10'>Virement bancaire, Twint, espèces</p>
										</div>
										<div>
											<h4 className='font-semibold text-purple-11 mb-2'>Réduction fratrie</h4>
											<p className='text-orange-10'>10% de réduction dès le 2ème enfant</p>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						</AccordionRoot>
					</article>
				</div>

				{/* Section Trotteurs + Grands */}
				<div className='mb-16'>
					<h2 className='text-2xl font-bold text-purple-12 mb-4 text-center'>La Nurserie (3 mois - 18 mois)</h2>
					<article className='space-y-4'>
						<h3 className='text-xl font-bold text-purple-12 mb-4 text-center'>Tarifs au mois</h3>
						<AccordionRoot type='single' collapsible className='space-y-4'>
							<AccordionItem value='full-day'>
								<AccordionTrigger>Journée complète</AccordionTrigger>
								<AccordionContent>
									<table>
										<tr>
											<td>1 jour / semaine</td>
											<td>CHF 180</td>
										</tr>
										<tr>
											<td>2 jours / semaine</td>
											<td>CHF 360</td>
										</tr>
										<tr>
											<td>3 jours / semaine</td>
											<td>CHF 540</td>
										</tr>
										<tr>
											<td>4 jours / semaine</td>
											<td>CHF 720</td>
										</tr>
										<tr>
											<td>5 jours / semaine</td>
											<td>CHF 900</td>
										</tr>
									</table>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value='morning-day-with-lunch'>
								<AccordionTrigger>Matin avec repas</AccordionTrigger>
								<AccordionContent>
									<table>
										<tr>
											<td>1 jour / semaine</td>
											<td>CHF 180</td>
										</tr>
										<tr>
											<td>2 jours / semaine</td>
											<td>CHF 360</td>
										</tr>
										<tr>
											<td>3 jours / semaine</td>
											<td>CHF 540</td>
										</tr>
										<tr>
											<td>4 jours / semaine</td>
											<td>CHF 720</td>
										</tr>
										<tr>
											<td>5 jours / semaine</td>
											<td>CHF 900</td>
										</tr>
									</table>
								</AccordionContent>
							</AccordionItem>
						</AccordionRoot>
					</article>
					<article className='space-y-4'>
						<AccordionRoot type='single' collapsible className='space-y-4'>
							<AccordionItem value='nurserie-tarifs'>
								<AccordionTrigger>Tarifs et services inclus</AccordionTrigger>
								<AccordionContent>
									<div className='space-y-4'>
										<div className='text-center mb-6'>
											<div className='text-3xl font-bold text-purple-11 mb-2'>CHF 85</div>
											<div className='text-orange-10'>par jour</div>
										</div>
										<div className='space-y-3'>
											<div className='flex items-center'>
												<span className='w-2 h-2 bg-purple-9 rounded-full mr-3'></span>
												<span>Repas équilibrés (petit-déjeuner, collation, déjeuner, goûter)</span>
											</div>
											<div className='flex items-center'>
												<span className='w-2 h-2 bg-purple-9 rounded-full mr-3'></span>
												<span>Couches et produits de soins fournis</span>
											</div>
											<div className='flex items-center'>
												<span className='w-2 h-2 bg-purple-9 rounded-full mr-3'></span>
												<span>Soins spécialisés et suivi médical</span>
											</div>
											<div className='flex items-center'>
												<span className='w-2 h-2 bg-purple-9 rounded-full mr-3'></span>
												<span>Matériel pédagogique adapté</span>
											</div>
											<div className='flex items-center'>
												<span className='w-2 h-2 bg-purple-9 rounded-full mr-3'></span>
												<span>Assurance complète incluse</span>
											</div>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='nurserie-modalites'>
								<AccordionTrigger>Modalités de paiement</AccordionTrigger>
								<AccordionContent>
									<div className='space-y-4'>
										<div className='grid md:grid-cols-2 gap-4'>
											<div>
												<h4 className='font-semibold text-purple-11 mb-2'>Fréquence</h4>
												<p className='text-orange-10'>Facturation mensuelle</p>
											</div>
											<div>
												<h4 className='font-semibold text-purple-11 mb-2'>Délai de paiement</h4>
												<p className='text-orange-10'>30 jours net</p>
											</div>
										</div>
										<div>
											<h4 className='font-semibold text-purple-11 mb-2'>Moyens de paiement</h4>
											<p className='text-orange-10'>Virement bancaire, Twint, espèces</p>
										</div>
										<div>
											<h4 className='font-semibold text-purple-11 mb-2'>Réduction fratrie</h4>
											<p className='text-orange-10'>10% de réduction dès le 2ème enfant</p>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						</AccordionRoot>
					</article>
				</div>

				{/* Note importante */}
				<div className='mt-12 bg-purple-2 rounded-lg p-6 border-l-4 border-purple-9'>
					<p className='text-purple-11'>
						<strong>Transparence totale :</strong> Nos tarifs sont clairs et sans surprise. Tous les services essentiels sont inclus dans le
						prix de base. Contactez-nous pour un devis personnalis&eacute; selon vos besoins sp&eacute;cifiques.
					</p>
				</div>
			</div>
		</section>
	)
}

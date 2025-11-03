// Exemple d'usage du système typographique et espacement fluide
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Callout, CalloutIcon, CalloutText } from "@/components/ui/callout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardExamples } from "@/components/ui/card-examples"
import { AlertCircle, AlertTriangle, ArrowRight, CheckCircle2, Download, Heart, Info, Mail, Phone, Send, Star } from 'lucide-react'

export default function ExamplePage() {
  return (
		<div className='p-fl-lg'>
			<div className='max-w-6xl mx-auto space-y-fl-xl'>
				{/* Section 1: Typographie */}
				<section className='space-y-fl-md'>
					<h1 className='font-bold text-purple-12 debug-fonts'>Système Typographique Fluide</h1>

					<h2 className='font-semibold text-orange-11'>Exemple d&apos;usage des classes fluides</h2>

					<p className='text-gray-700'>
						Ce système utilise des classes fluides basées sur Utopia.fyi pour une typographie et un espacement qui s&apos;adaptent
						automatiquement à la taille de l&apos;écran.
					</p>

					<div className='space-y-fl-sm'>
						<h3 className='font-medium text-purple-11'>Titre de section</h3>
						<p className='text-gray-600'>Paragraphe avec texte plus grand pour les introductions importantes.</p>
						<p className='text-fl-base text-gray-700 leading-fl-6'>
							Texte courant avec une hauteur de ligne optimisée pour la lisibilité. Les classes fluides s&apos;adaptent automatiquement à la
							taille de l&apos;écran.
						</p>
						<p className='text-fl-sm text-gray-500 leading-fl-5'>Texte secondaire plus petit pour les informations complémentaires.</p>
						<span className='text-fl-xs text-gray-400'>Label ou caption</span>
					</div>
				</section>

				{/* Section 2: Cards avec espacement fluide */}
				<section className='space-y-fl-md'>
					<h2 className='text-fl-3xl font-bold text-purple-12 font-display'>Test des Espacements</h2>

					<p className='text-fl-base text-gray-700 leading-fl-6'>
						Voici des exemples de Cards avec différents espacements fluides pour tester la cohérence visuelle du système.
					</p>

					{/* Cards avec padding fluide */}
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-fl-md'>
						<Card className="bg-purple-1 border-purple-6">
							<CardHeader>
								<CardTitle className='text-fl-lg font-display'>Padding Small</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-fl-sm text-purple-11'>
									Card avec padding fluide small. L&apos;espacement s&apos;adapte automatiquement.
								</p>
							</CardContent>
						</Card>

						<Card className="bg-orange-1 border-orange-6">
							<CardHeader>
								<CardTitle className='text-fl-lg font-display'>Padding Medium</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-fl-sm text-orange-11'>Card avec padding fluide medium. Plus d&apos;espace pour le contenu.</p>
							</CardContent>
						</Card>

						<Card className="bg-purple-2 border-purple-7">
							<CardHeader>
								<CardTitle className='text-fl-lg font-display'>Padding Large</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-fl-sm text-gray-700'>Card avec padding fluide large. Maximum d&apos;espace pour le confort.</p>
							</CardContent>
						</Card>
					</div>

					{/* Cards avec espacement directionnel */}
					<div className='grid md:grid-cols-2 gap-fl-lg'>
						<Card className="bg-purple-1 border-purple-6 'px-fl-md py-fl-sm">
							<CardHeader>
								<CardTitle className='text-fl-lg font-display'>Espacement Directionnel</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-fl-sm text-purple-11'>Card avec padding directionnel : px-fl-md (horizontal) et py-fl-sm (vertical).</p>
							</CardContent>
						</Card>

						<Card className="bg-orange-1 border-orange-6 'px-fl-lg py-fl-base">
							<CardHeader>
								<CardTitle className='text-fl-lg font-display'>Espacement Mixte</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-fl-sm text-orange-11'>Card avec espacement mixte : px-fl-lg (horizontal) et py-fl-base (vertical).</p>
							</CardContent>
						</Card>
					</div>

					{/* Cards avec paires fluides */}
					<div className='grid md:grid-cols-3 gap-fl-base'>
						<Card className="bg-purple-1 border-purple-6 'p-fl-sm-base">
							<CardHeader>
								<CardTitle className='text-fl-base font-display'>Paire sm-base</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-fl-xs text-purple-11'>Transition fluide de small à base.</p>
							</CardContent>
						</Card>

						<Card className="bg-orange-1 border-orange-6 'p-fl-base-md">
							<CardHeader>
								<CardTitle className='text-fl-base font-display'>Paire base-md</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-fl-xs text-orange-11'>Transition fluide de base à medium.</p>
							</CardContent>
						</Card>

						<Card className="bg-purple-2 border-purple-7 'p-fl-md-lg">
							<CardHeader>
								<CardTitle className='text-fl-base font-display'>Paire md-lg</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-fl-xs text-gray-700'>Transition fluide de medium à large.</p>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Section 3: Résumé */}
				<section className='text-center py-fl-xl'>
					<h2 className='text-fl-3xl font-bold text-purple-12 font-display mb-fl-md'>Système Complet</h2>
					<p className='text-fl-lg text-gray-700 leading-fl-6 max-w-3xl mx-auto'>
						Le système typographique et d&apos;espacement fluide est maintenant configuré et prêt à être utilisé dans toute
						l&apos;application.
					</p>
			  </section>
			  <CardExamples />
				{/* Section 4: Buttons */}
				<section className='p-fl-lg'>
					<div className='max-w-6xl mx-auto space-y-fl-xl'>
						{/* Section 1: Variants */}
						<section className='space-y-fl-md'>
							<h1 className='text-fl-4xl font-bold text-purple-12 font-display'>Système de Boutons</h1>

							<h2 className='text-fl-2xl font-semibold text-orange-11 font-display'>Variants de boutons</h2>

							<p className='text-fl-base text-gray-700 leading-fl-6'>Système de boutons cohérent avec variants, tailles et états.</p>

							<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-fl-md'>
								<Card className="bg-purple-1 border-purple-6">
									<CardHeader>
										<CardTitle className='text-fl-lg font-display'>Primary</CardTitle>
									</CardHeader>
									<CardContent className='space-y-2'>
										<Button className="bg-purple-1 border-purple-6" ariaLabel="Bouton Small">
											Small
										</Button>
										<Button className="bg-purple-1 border-purple-6" ariaLabel="Bouton Medium">
											Medium
										</Button>
										<Button className="bg-purple-1 border-purple-6" ariaLabel="Bouton Large">
											Large
										</Button>
										<Button className="bg-purple-1 border-purple-6" ariaLabel="Bouton Extra Large">
											Extra Large
										</Button>
									</CardContent>
								</Card>

								<Card className="bg-orange-1 border-orange-6">
									<CardHeader>
										<CardTitle className='text-fl-lg font-display'>Secondary</CardTitle>
									</CardHeader>
									<CardContent className='space-y-2'>
										<Button className="bg-orange-1 border-orange-6" ariaLabel="Bouton Secondary Small">
											Small
										</Button>
										<Button className="bg-orange-1 border-orange-6" ariaLabel="Bouton Secondary Medium">
											Medium
										</Button>
										<Button className="bg-orange-1 border-orange-6" ariaLabel="Bouton Secondary Large">
											Large
										</Button>
										<Button className="bg-orange-1 border-orange-6" ariaLabel="Bouton Secondary Extra Large">
											Extra Large
										</Button>
									</CardContent>
								</Card>

								<Card className="bg-purple-2 border-purple-7">
									<CardHeader>
										<CardTitle className='text-fl-lg font-display'>Outline</CardTitle>
									</CardHeader>
									<CardContent className='space-y-2'>
										<Button variant='outline' ariaLabel="Bouton Outline Small">
											Small
										</Button>
										<Button variant='outline' ariaLabel="Bouton Outline Medium">
											Medium
										</Button>
										<Button variant='outline' ariaLabel="Bouton Outline Large">
											Large
										</Button>
										<Button variant='outline' ariaLabel="Bouton Outline Extra Large">
											Extra Large
										</Button>
									</CardContent>
								</Card>

								<Card className="bg-purple-1 border-purple-6">
									<CardHeader>
										<CardTitle className='text-fl-lg font-display'>Ghost</CardTitle>
									</CardHeader>
									<CardContent className='space-y-2'>
										<Button variant='ghost' ariaLabel="Bouton Ghost Small">
											Small
										</Button>
										<Button variant='ghost' ariaLabel="Bouton Ghost Medium">
											Medium
										</Button>
										<Button variant='ghost' ariaLabel="Bouton Ghost Large">
											Large
										</Button>
										<Button variant='ghost' ariaLabel="Bouton Ghost Extra Large">
											Extra Large
										</Button>
									</CardContent>
								</Card>

								<Card className="bg-orange-1 border-orange-6">
									<CardHeader>
										<CardTitle className='text-fl-lg font-display'>Destructive</CardTitle>
									</CardHeader>
									<CardContent className='space-y-2'>
										<Button variant='destructive' ariaLabel="Bouton Destructive Small">
											Small
										</Button>
										<Button variant='destructive' ariaLabel="Bouton Destructive Medium">
											Medium
										</Button>
										<Button variant='destructive' ariaLabel="Bouton Destructive Large">
											Large
										</Button>
										<Button variant='destructive' ariaLabel="Bouton Destructive Extra Large">
											Extra Large
										</Button>
									</CardContent>
								</Card>

								<Card className="bg-purple-2 border-purple-7">
									<CardHeader>
										<CardTitle className='text-fl-lg font-display'>Link</CardTitle>
									</CardHeader>
									<CardContent className='space-y-2'>
										<Button variant='link' ariaLabel="Bouton Link Small">
											Small
										</Button>
										<Button variant='link' ariaLabel="Bouton Link Medium">
											Medium
										</Button>
										<Button variant='link' ariaLabel="Bouton Link Large">
											Large
										</Button>
										<Button variant='link' ariaLabel="Bouton Link Extra Large">
											Extra Large
										</Button>
									</CardContent>
								</Card>
							</div>
						</section>

						{/* Section 2: Boutons avec icônes */}
						<section className='space-y-fl-md'>
							<h2 className='text-fl-3xl font-bold text-purple-12 font-display'>Boutons avec Icônes</h2>

							<p className='text-fl-base text-gray-700 leading-fl-6'>
								Boutons avec icônes pour améliorer l&apos;UX et la clarté des actions.
							</p>

							<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-fl-md'>
								<Card className="bg-purple-1 border-purple-6">
									<CardHeader>
										<CardTitle className='text-fl-lg font-display'>Actions Communes</CardTitle>
									</CardHeader>
									<CardContent className='space-y-3'>
										<Button className="bg-purple-1 border-purple-6 w-full">
											<Mail className='mr-2 h-4 w-4' />
											Envoyer Email
										</Button>
										<Button className="bg-orange-1 border-orange-6 w-full">
											<Phone className='mr-2 h-4 w-4' />
											Appeler
										</Button>
										<Button variant='outline' className='w-full'>
											<Download className='mr-2 h-4 w-4' />
											Télécharger
										</Button>
									</CardContent>
								</Card>

								<Card className="bg-orange-1 border-orange-6">
									<CardHeader>
										<CardTitle className='text-fl-lg font-display'>Boutons Icon</CardTitle>
									</CardHeader>
									<CardContent className='space-y-3'>
										<div className='flex gap-2'>
											<Button variant='ghost' aria-label='Ajouter aux favoris'>
												<Heart className='h-4 w-4' />
											</Button>
											<Button variant='ghost' aria-label='Noter'>
												<Star className='h-4 w-4' />
											</Button>
											<Button variant='outline' aria-label='Envoyer'>
												<Send className='h-4 w-4' />
											</Button>
										</div>
										<div className='flex gap-2'>
											<Button className="bg-purple-1 border-purple-6" aria-label='Suivant'>
												<ArrowRight className='h-4 w-4' />
											</Button>
											<Button className="bg-orange-1 border-orange-6" aria-label='Envoyer un email'>
												<Mail className='h-4 w-4' />
											</Button>
										</div>
									</CardContent>
								</Card>

								<Card className="bg-purple-2 border-purple-7">
									<CardHeader>
										<CardTitle className='text-fl-lg font-display'>États</CardTitle>
									</CardHeader>
									<CardContent className='space-y-3'>
										<Button className="bg-purple-1 border-purple-6 w-full" loading>
											Chargement...
										</Button>
										<Button className="bg-orange-1 border-orange-6 w-full" disabled>
											Désactivé
										</Button>
										<Button variant='outline' className='w-full'>
											<Star className='mr-2 h-4 w-4' />
											Succès
										</Button>
										<Button variant='outline' className='w-full'>
											<Heart className='mr-2 h-4 w-4' />
											Erreur
										</Button>
									</CardContent>
								</Card>
							</div>
						</section>

						{/* Section 3: Usage réel */}
						<section className='space-y-fl-md'>
							<h2 className='text-fl-3xl font-bold text-purple-12 font-display'>Exemples d&apos;Usage Réel</h2>

							<p className='text-fl-base text-gray-700 leading-fl-6'>
								Exemples concrets d&apos;utilisation des boutons dans l&apos;application.
							</p>

							<div className='grid md:grid-cols-2 gap-fl-lg'>
								<Card className="bg-purple-1 border-purple-6">
									<CardHeader>
										<CardTitle className='text-fl-xl font-display'>Hero Section</CardTitle>
									</CardHeader>
									<CardContent className='space-y-4'>
										<p className='text-fl-base text-purple-11'>Bouton CTA principal pour les actions importantes.</p>
										<Button className="bg-purple-1 border-purple-6 w-full">
											Nous contacter
										</Button>
									</CardContent>
								</Card>

								<Card className="bg-orange-1 border-orange-6">
									<CardHeader>
										<CardTitle className='text-fl-xl font-display'>Formulaire</CardTitle>
									</CardHeader>
									<CardContent className='space-y-4'>
										<p className='text-fl-base text-orange-11'>Bouton de soumission avec état de chargement.</p>
										<Button className="bg-orange-1 border-orange-6 w-full" loading>
											Envoyer le message
										</Button>
									</CardContent>
								</Card>
							</div>
						</section>

					{/* Section 4: Tests d'Accessibilité */}
					<section className='space-y-fl-md'>
					<h2 className='text-fl-3xl font-bold text-purple-12 font-display'>Tests d&apos;Accessibilité</h2>
					<p className='text-fl-base text-gray-700 leading-fl-6'>
						Section dédiée aux tests d&apos;accessibilité des boutons.
					</p>
					<div className='grid md:grid-cols-2 gap-fl-md'>
						<Card className="bg-purple-1 border-purple-6" data-testid="button-primary">
							<CardHeader>
								<CardTitle className='text-fl-lg font-display'>Test Contraste</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<Button className="bg-purple-1 border-purple-6 w-full">
									Bouton Primary
								</Button>
								<Button variant='destructive' className='w-full'>
									Bouton Destructive
								</Button>
								<Button variant='outline' className='w-full'>
									Bouton Outline
								</Button>
							</CardContent>
						</Card>
						<Card className="bg-orange-1 border-orange-6" data-testid="button-group">
							<CardHeader>
								<CardTitle className='text-fl-lg font-display'>Test Navigation</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<div className='flex gap-2'>
									<Button className="bg-purple-1 border-purple-6">Tab 1</Button>
									<Button className="bg-orange-1 border-orange-6">Tab 2</Button>
									<Button variant='outline'>Tab 3</Button>
								</div>
								<div className='flex gap-2'>
									<Button variant='ghost'>Ghost</Button>
									<Button variant='link'>Link</Button>
								</div>
							</CardContent>
						</Card>
					</div>
					<div className='grid md:grid-cols-2 gap-fl-md' data-testid="button-states">
						<Card className="bg-purple-2 border-purple-7">
							<CardHeader>
								<CardTitle className='text-fl-lg font-display'>États des Boutons</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<Button className="bg-purple-1 border-purple-6 w-full">Normal</Button>
								<Button className="bg-purple-1 border-purple-6 w-full" disabled>Disabled</Button>
								<Button className="bg-purple-1 border-purple-6 w-full" loading>Loading</Button>
								<Button className="bg-purple-1 border-purple-6 w-full">Success</Button>
								<Button className="bg-purple-1 border-purple-6 w-full">Error</Button>
							</CardContent>
						</Card>
						<Card className="bg-purple-2 border-purple-7">
							<CardHeader>
								<CardTitle className='text-fl-lg font-display'>Tailles</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<Button className="bg-orange-1 border-orange-6 w-full">Small</Button>
								<Button className="bg-orange-1 border-orange-6 w-full">Medium</Button>
								<Button className="bg-orange-1 border-orange-6 w-full">Large</Button>
								<Button className="bg-orange-1 border-orange-6 w-full">Extra Large</Button>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Section 5: Résumé */}
				<section className='text-center py-fl-xl'>
					<h2 className='text-fl-3xl font-bold text-purple-12 font-display'>Système Complet</h2>
					<p className='text-fl-lg text-gray-700 leading-fl-6 max-w-3xl mx-auto'>
						Le système de boutons est maintenant configuré avec des variants cohérents, des tailles standardisées et des états
						appropriés. Tests d&apos;accessibilité inclus.
					</p>
					</section>
					</div>
				</section>
			  
				{/* Section 5: Callouts and Badges */}
				<section className='space-y-fl-md'>
					<h2 className='text-fl-3xl font-bold text-purple-12 font-display'>Callouts avec Variants</h2>

					<p className='text-fl-base text-gray-700 leading-fl-6'>
						Système de callouts cohérent avec variants de couleurs pour les messages de feedback.
					</p>

					<div className='grid md:grid-cols-2 gap-fl-md'>
						<Callout color='green'>
							<CalloutIcon>
								<CheckCircle2 className='h-4 w-4' />
							</CalloutIcon>
							<CalloutText>
								<strong>Succès !</strong> Action réalisée avec succès.
							</CalloutText>
						</Callout>

						<Callout color='yellow'>
							<CalloutIcon>
								<AlertTriangle className='h-4 w-4' />
							</CalloutIcon>
							<CalloutText>
								<strong>Attention !</strong> Vérifiez vos informations.
							</CalloutText>
						</Callout>

						<Callout color='red'>
							<CalloutIcon>
								<AlertCircle className='h-4 w-4' />
							</CalloutIcon>
							<CalloutText>
								<strong>Erreur !</strong> Une erreur s&apos;est produite.
							</CalloutText>
						</Callout>

						<Callout color='blue'>
							<CalloutIcon>
								<Info className='h-4 w-4' />
							</CalloutIcon>
							<CalloutText>
								<strong>Information :</strong> Ce champ est optionnel.
							</CalloutText>
						</Callout>
					</div>

					{/* Tailles de Callouts */}
					<div className='space-y-fl-md'>
						<h3 className='text-fl-xl font-semibold text-purple-11 font-display'>Tailles de Callouts</h3>
						
						<div className='space-y-fl-md'>
							<Callout color='green'>
								<CalloutIcon>
									<CheckCircle2 className='h-3 w-3' />
								</CalloutIcon>
								<CalloutText>
									Petit callout pour les messages courts.
								</CalloutText>
							</Callout>

							<Callout color='blue'>
								<CalloutIcon>
									<Info className='h-4 w-4' />
								</CalloutIcon>
								<CalloutText>
									Callout moyen pour les informations importantes avec un peu plus de contenu.
								</CalloutText>
							</Callout>

							<Callout color='yellow'>
								<CalloutIcon>
									<AlertTriangle className='h-5 w-5' />
								</CalloutIcon>
								<CalloutText>
									<strong>Callout large</strong> pour les messages très importants qui nécessitent 
									plus d&apos;attention et d&apos;espace pour expliquer la situation en détail.
								</CalloutText>
							</Callout>
						</div>
					</div>
				</section>

				{/* Section 6: Badges */}
				<section className='space-y-fl-md'>
					<h2 className='text-fl-3xl font-bold text-purple-12 font-display'>Badges avec Variants</h2>

					<p className='text-fl-base text-gray-700 leading-fl-6'>
						Système de badges cohérent avec variants de couleurs et tailles.
					</p>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-fl-md'>
						<Card className="bg-purple-1 border-purple-6">
							<CardHeader>
								<CardTitle className='text-fl-lg font-display'>Variants</CardTitle>
							</CardHeader>
							<CardContent className='space-y-2'>
								<div className='flex flex-wrap gap-2'>
									<Badge variant='default'>Default</Badge>
									<Badge className="bg-orange-1 border-orange-6">Secondary</Badge>
									<Badge variant='outline'>Outline</Badge>
									<Badge variant='ghost'>Ghost</Badge>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-orange-1 border-orange-6">
							<CardHeader>
								<CardTitle className='text-fl-lg font-display'>États</CardTitle>
							</CardHeader>
							<CardContent className='space-y-2'>
								<div className='flex flex-wrap gap-2'>
									<Badge variant='success'>Success</Badge>
									<Badge variant='warning'>Warning</Badge>
									<Badge variant='error'>Error</Badge>
									<Badge variant='info'>Info</Badge>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-purple-2 border-purple-7">
							<CardHeader>
								<CardTitle className='text-fl-lg font-display'>Tailles</CardTitle>
							</CardHeader>
							<CardContent className='space-y-2'>
								<div className='flex flex-wrap gap-2'>
									<Badge variant='default'>Small</Badge>
									<Badge variant='default'>Medium</Badge>
									<Badge variant='default'>Large</Badge>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Section 7: Résumé final */}
				<section className='text-center py-fl-xl'>
					<h2 className='text-fl-3xl font-bold text-purple-12 font-display'>Système Complet</h2>
					<p className='text-fl-lg text-gray-700 leading-fl-6 max-w-3xl mx-auto'>
						Le système de composants UI est maintenant configuré avec des variants cohérents, 
						des tailles standardisées et des couleurs de feedback appropriées.
					</p>
				</section>
			</div>
    </div>
  )
}
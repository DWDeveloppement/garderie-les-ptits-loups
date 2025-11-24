// Exemples des callouts
import { Callout, CalloutIcon, CalloutText } from '@/ui/callout'
import { AlertCircle, CheckCircle2, Info, Lightbulb } from 'lucide-react'

export function CalloutSection() {
	return (
		<section className='space-y-6'>
			<h2 className='font-bold'>Exemples de callouts</h2>
			<div className='grid gap-4 md:grid-cols-2'>
				<Callout color='blue' size='md' className='flex items-start gap-4 rounded-lg'>
					<CalloutIcon>
						<Info className='h-6 w-6 text-blue-600' />
					</CalloutIcon>
					<div>
						<p className='font-semibold text-fl-base'>Information générale</p>
						<CalloutText>
							Utilisez cette variante pour mettre en avant une information neutre ou une note explicative. Le texte hérite de la couleur
							définie sur le wrapper.
						</CalloutText>
					</div>
				</Callout>

				<Callout color='green' size='md' className='flex items-start gap-4 rounded-lg'>
					<CalloutIcon>
						<CheckCircle2 className='h-6 w-6 text-green-600' />
					</CalloutIcon>
					<div>
						<p className='font-semibold text-fl-base'>Succès / Confirmation</p>
						<CalloutText>
							Idéal après une action utilisateur réussie (envoi de formulaire, sauvegarde, etc.). Les couleurs sont adaptées pour conserver
							un bon contraste.
						</CalloutText>
					</div>
				</Callout>

				<Callout color='yellow' size='md' className='flex items-start gap-4 rounded-lg'>
					<CalloutIcon>
						<Lightbulb className='h-6 w-6 text-yellow-600' />
					</CalloutIcon>
					<div>
						<p className='font-semibold text-fl-base'>Astuce pratique</p>
						<CalloutText>
							Proposez une recommandation ou un conseil utile. Les tailles `sm`, `md`, `lg` permettent d’ajuster rapidement la densité du
							contenu.
						</CalloutText>
					</div>
				</Callout>

				<Callout color='red' size='md' className='flex items-start gap-4 rounded-lg'>
					<CalloutIcon>
						<AlertCircle className='h-6 w-6 text-red-600' />
					</CalloutIcon>
					<div>
						<p className='font-semibold text-fl-base'>Alerte importante</p>
						<CalloutText>
							Utilisez la variante rouge pour signaler un problème ou une action nécessaire. Les couleurs fortes attirent l’attention tout
							en restant lisibles.
						</CalloutText>
					</div>
				</Callout>
			</div>
		</section>
	)
}

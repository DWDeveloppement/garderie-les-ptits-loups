/**Section Contact - Garderie Les P'tits Loups
 * Importation du formulaire de contact que nous placeront dans le fichier ContactForm.tsx
 
 */
'use client'

import { ContactForm } from '@/components/forms'
//import { ContactFormDebug } from '@/components/debug/ContactFormDebug'
import { SuccessAnimation } from '@/components/shared/feedback'
import { useFormValidation } from '../../../../hooks/useFormValidation'

export function ContactFormSection() {
	// Hook personnalisé pour la gestion du formulaire (pour l'animation de succès)
	const { isSuccess } = useFormValidation()

	return (
		<section className='flex flex-col gap-4 py-16 px-4 sm:px-6 lg:px-8 gradient-section-b'>
			<div className='max-w-6xl mx-auto text-center space-y-4'>
				<div className='mb-16'>
					<h2 className='font-bold mb-8'>Contactez-nous</h2>
					<p>Nous sommes à votre entière disposition pour répondre à toutes vos questions.</p>
				</div>
				{/* Formulaire de contact */}
				<ContactForm />

				{/* Composant de debug - Commenter pour la production 
                <ContactFormDebug
                    formData={formData}
                    validationErrors={validationErrors}
                    isSubmitting={isSubmitting}
                    onSetValidationErrors={testCompleteValidation}
                />
				*/}
			</div>

			{/* Animation de succès */}
			<SuccessAnimation isVisible={isSuccess} onComplete={() => {}} />
		</section>
	)
}

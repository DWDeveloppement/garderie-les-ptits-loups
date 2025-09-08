/**Section Contact - Garderie Les P'tits Loups
 * Importation du formulaire de contact que nous placeront dans le fichier ContactForm.tsx
 
 */
"use client"

import ContactForm from '@/components/ContactForm'
//import { ContactFormDebug } from '@/components/debug/ContactFormDebug'
import { SuccessAnimation } from '@/components/ui/success-animation'
import { useFormValidation } from '@/hooks/useFormValidation'

export function ContactFormSection() {
	// Hook personnalisé pour la gestion du formulaire (pour l'animation de succès)
	const {
		isSuccess
	} = useFormValidation()

	return (
		<section className='flex flex-col gap-4 py-16 px-4 sm:px-6 lg:px-8 bg-orange-bg-light'>
			<div className='max-w-4xl mx-auto text-center space-y-4'>
				<h2 className='text-5xl font-bold text-purple-9'>Contactez-nous</h2>
				<p className='text-lg text-orange-11'>Nous sommes à votre entière disposition pour répondre à toutes vos questions.</p>
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
/**Ici on va mettre le formulaire de contact déja pret dans le fichier ContactFormSection.tsx 
 * On exporte le formulaire dans la section ContactFormSection.tsx
 * ici on fait le rendu du formulaire en passant les props, hooks,etc... du formulaire qui sont nécéssaires.
*/
'use client'
import { useFormValidation } from '@/hooks/useFormValidation'
import { useRecaptchaV2 } from '@/hooks/useRecaptchaV2'
import * as Form from '@radix-ui/react-form'
import { Button } from './ui/button'
import { RecaptchaV2 } from './ui/recaptcha-v2'
import { Spinner } from './ui/spinner'
import { useToast } from './ui/toast'

const ContactForm = () => {
	// Hook personnalisé pour la gestion du formulaire
	const {
		formData,
		isSubmitting,
		handleInputChange,
		handleFieldBlur,
		handleSubmit: submitForm,
		handleReset,
		getFieldError,
		hasFieldError,
		MESSAGES,
	} = useFormValidation()
	
	// Hook pour les toasts
	const { showSuccess, showError, ToastContainer } = useToast()
	
	// Hook reCAPTCHA v2
	const {
		isRecaptchaVerified,
		recaptchaError,
		handleRecaptchaVerify,
		handleRecaptchaExpire,
		handleRecaptchaError
	} = useRecaptchaV2()
	
	// Gestionnaire de soumission avec toasts
	const handleSubmit = async () => {
		// Vérifier reCAPTCHA
		if (!isRecaptchaVerified) {
			showError('Vérification requise', 'Veuillez compléter la vérification de sécurité.')
			return
		}
		
		const result = await submitForm()
		
		if (result?.success) {
			showSuccess('Message envoyé !', 'Votre message a été transmis avec succès à l\'équipe de la garderie.')
		} else {
			showError('Erreur d\'envoi', result?.error || MESSAGES.ERROR_GENERAL)
		}
	}

	return (
		<>
			<Form.Root className='w-full max-w-2xl mt-16'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{/* Nom */}
					<Form.Field className='mb-4 grid' name='nom'>
						<div className='flex items-baseline justify-between'>
							<Form.Label className='text-sm font-medium text-orange-12'>Nom</Form.Label>
							{getFieldError('nom') && <span className='text-xs text-red-500'>{getFieldError('nom')}</span>}
						</div>
						<Form.Control asChild>
							<input
								className={`w-full px-3 py-2 border rounded-md bg-white text-orange-12 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent ${
									hasFieldError('nom') ? 'border-red-500' : 'border-orange-6'
								} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
								type='text'
								value={formData.nom}
								onChange={(e) => handleInputChange('nom', e.target.value)}
								onBlur={() => handleFieldBlur('nom')}
								required
								disabled={isSubmitting}
							/>
						</Form.Control>
					</Form.Field>

					{/* Prénom */}
					<Form.Field className='mb-4 grid' name='prenom'>
						<div className='flex items-baseline justify-between'>
							<Form.Label className='text-sm font-medium text-orange-12'>Prénom</Form.Label>
							{getFieldError('prenom') && <span className='text-xs text-red-500'>{getFieldError('prenom')}</span>}
						</div>
						<Form.Control asChild>
							<input
								className={`w-full px-3 py-2 border rounded-md bg-white text-orange-12 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent ${
									hasFieldError('prenom') ? 'border-red-500' : 'border-orange-6'
								} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
								type='text'
								value={formData.prenom}
								onChange={(e) => handleInputChange('prenom', e.target.value)}
								onBlur={() => handleFieldBlur('prenom')}
								required
								disabled={isSubmitting}
							/>
						</Form.Control>
					</Form.Field>

					{/* Email */}
					<Form.Field className='mb-4 grid' name='email'>
						<div className='flex items-baseline justify-between'>
							<Form.Label className='text-sm font-medium text-orange-12'>Email</Form.Label>
							{getFieldError('email') && <span className='text-xs text-red-500'>{getFieldError('email')}</span>}
						</div>
						<Form.Control asChild>
							<input
								className={`w-full px-3 py-2 border rounded-md bg-white text-orange-12 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent ${
									hasFieldError('email') ? 'border-red-500' : 'border-orange-6'
								} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
								type='email'
								value={formData.email}
								onChange={(e) => handleInputChange('email', e.target.value)}
								onBlur={() => handleFieldBlur('email')}
								required
								disabled={isSubmitting}
							/>
						</Form.Control>
					</Form.Field>
				</div>
				{/* Sujet */}
				<Form.Field className='mb-4 grid' name='sujet'>
					<div className='flex items-baseline justify-between'>
						<Form.Label className='text-sm font-medium text-orange-12'>Sujet</Form.Label>
						{getFieldError('sujet') && <span className='text-xs text-red-500'>{getFieldError('sujet')}</span>}
					</div>
					<Form.Control asChild>
						<input
							className={`w-full px-3 py-2 border rounded-md bg-white text-orange-12 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent ${
								hasFieldError('sujet') ? 'border-red-500' : 'border-orange-6'
							} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
							type='text'
							value={formData.sujet}
							onChange={(e) => handleInputChange('sujet', e.target.value)}
							onBlur={() => handleFieldBlur('sujet')}
							required
							disabled={isSubmitting}
						/>
					</Form.Control>
				</Form.Field>

				{/* Message */}
				<Form.Field className='mb-4 grid' name='message'>
					<div className='flex items-baseline justify-between'>
						<Form.Label className='text-sm font-medium text-orange-12'>Message</Form.Label>
						{getFieldError('message') && <span className='text-xs text-red-500'>{getFieldError('message')}</span>}
					</div>
					<Form.Control asChild>
						<textarea
							className={`w-full px-3 py-2 border rounded-md bg-white text-orange-12 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent resize-none min-h-[120px] ${
								hasFieldError('message') ? 'border-red-500' : 'border-orange-6'
							} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
							value={formData.message}
							onChange={(e) => handleInputChange('message', e.target.value)}
							onBlur={() => handleFieldBlur('message')}
							required
							disabled={isSubmitting}
						/>
					</Form.Control>
				</Form.Field>

				{/* reCAPTCHA v2 - Placement correct avant les boutons */}
				<RecaptchaV2
					onVerify={handleRecaptchaVerify}
					onExpire={handleRecaptchaExpire}
					onError={handleRecaptchaError}
					className='mt-6'
				/>
				
				{/* Message d'erreur reCAPTCHA */}
				{recaptchaError && (
					<div className="mt-2 text-center">
						<p className="text-sm text-red-600">{recaptchaError}</p>
					</div>
				)}

				{/* Boutons */}
				<div className='flex gap-4 md:justify-between mt-6 '>
					<Button
						size='lg'
						type='button'
						className='bg-purple-9 hover:bg-purple-10 text-white relative'
						onClick={handleSubmit}
						disabled={isSubmitting}>
						{isSubmitting && <Spinner size='sm' className='mr-2' />}
						{isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
					</Button>
					<Button
						size='lg'
						type='button'
						variant='outline'
						className='border-orange-6 text-orange-12 hover:bg-orange-2'
						onClick={handleReset}
						disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Spinner size='sm' className='mr-2' />
								Envoi en cours...
							</>
						) : (
							'Réinitialiser'
						)}
					</Button>
				</div>
			</Form.Root>

			{/* Container pour les toasts */}
			<ToastContainer />
		</>
	)
}

export default ContactForm
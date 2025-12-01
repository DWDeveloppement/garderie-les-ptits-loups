/**Ici on va mettre le formulaire de contact déja pret dans le fichier ContactFormSection.tsx
 * On exporte le formulaire dans la section ContactFormSection.tsx
 * ici on fait le rendu du formulaire en passant les props, hooks,etc... du formulaire qui sont nécéssaires.
 * Des placeholders sont présents dans le composant pour guider l'utilisateur.
 */
'use client'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useFormValidation, useRecaptchaV2 } from '@/hooks'
import { Mail, MessageSquare, Phone, User } from 'lucide-react'
import { toast } from 'sonner'
import { HoneypotField } from './HoneypotField'
import { InputField } from './InputField'
import { TextareaField } from './TextareaField'
import { RecaptchaV2 } from './recaptcha-v2'

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

	// Toast state - Plus besoin avec Sonner
	const showSuccess = (title: string, description: string) => {
		toast.success(title, {
			description: description,
		})
	}

	const showError = (title: string, description: string) => {
		toast.error(title, {
			description: description,
		})
	}

	// Hook reCAPTCHA v2
	const { isRecaptchaVerified, recaptchaError, handleRecaptchaVerify, handleRecaptchaExpire, handleRecaptchaError } = useRecaptchaV2()

	// Gestionnaire de soumission avec toasts
	const handleSubmit = async () => {
		// Vérifier reCAPTCHA
		if (!isRecaptchaVerified) {
			showError('Vérification requise', 'Veuillez compléter la vérification de sécurité.')
			return
		}

		const result = await submitForm()

		if (result?.success) {
			showSuccess('Message envoyé !', "Votre message a été transmis avec succès à l'équipe de la garderie.")
		} else {
			showError("Erreur d'envoi", result?.error || MESSAGES.ERROR_GENERAL)
		}
	}

	return (
		<div className='w-full flex flex-col max-w-6xl'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-12'>
				{/* Nom */}
				<InputField
					name='nom'
					label='Nom'
					type='text'
					placeholder='Votre nom'
					value={formData.nom}
					onChange={(value) => handleInputChange('nom', value)}
					onBlur={() => handleFieldBlur('nom')}
					required
					disabled={isSubmitting}
					icon={User}
					hasError={hasFieldError('nom')}
					errorMessage={getFieldError('nom')}
				/>

				{/* Prénom */}
				<InputField
					name='prenom'
					label='Prénom'
					type='text'
					placeholder='Votre prénom'
					value={formData.prenom}
					onChange={(value) => handleInputChange('prenom', value)}
					onBlur={() => handleFieldBlur('prenom')}
					required
					disabled={isSubmitting}
					icon={User}
					hasError={hasFieldError('prenom')}
					errorMessage={getFieldError('prenom')}
				/>

				{/* Email */}
				<InputField
					name='email'
					label='Email'
					type='email'
					placeholder='Votre email'
					value={formData.email}
					onChange={(value) => handleInputChange('email', value)}
					onBlur={() => handleFieldBlur('email')}
					required
					disabled={isSubmitting}
					icon={Mail}
					hasError={hasFieldError('email')}
					errorMessage={getFieldError('email')}
				/>

				{/* Téléphone */}
				<InputField
					name='phone'
					label='Téléphone (optionnel)'
					type='tel'
					placeholder='Votre téléphone (optionnel)'
					value={formData.phone}
					onChange={(value) => handleInputChange('phone', value)}
					onBlur={() => handleFieldBlur('phone')}
					disabled={isSubmitting}
					icon={Phone}
					hasError={hasFieldError('phone')}
					errorMessage={getFieldError('phone')}
				/>
			</div>
			{/* Sujet */}
			<InputField
				name='sujet'
				label='Sujet'
				type='text'
				placeholder='Votre sujet'
				value={formData.sujet}
				onChange={(value) => handleInputChange('sujet', value)}
				onBlur={() => handleFieldBlur('sujet')}
				required
				disabled={isSubmitting}
				icon={MessageSquare}
				hasError={hasFieldError('sujet')}
				errorMessage={getFieldError('sujet')}
				className='mb-12'
			/>

			{/* Message */}
			<TextareaField
				name='message'
				label='Message'
				placeholder='Votre message'
				value={formData.message}
				onChange={(value) => handleInputChange('message', value)}
				onBlur={() => handleFieldBlur('message')}
				required
				disabled={isSubmitting}
				icon={MessageSquare}
				hasError={hasFieldError('message')}
				errorMessage={getFieldError('message')}
				minHeight='120px'
				className='mb-12'
			/>

			{/* Champ Honeypot - Anti-bot invisible */}
			<HoneypotField value={formData.website || ''} onChange={(value) => handleInputChange('website', value)} />

			{/* reCAPTCHA v2 - Placement correct avant les boutons */}
			<RecaptchaV2 onVerify={handleRecaptchaVerify} onExpire={handleRecaptchaExpire} onError={handleRecaptchaError} />

			{/* Message d'erreur reCAPTCHA */}
			{recaptchaError && (
				<div className='mt-2 text-center'>
					<p className='text-red-600'>{recaptchaError}</p>
				</div>
			)}

			{/* Boutons */}
			<div className='flex gap-4 justify-around mt-8'>
				<Button variant='default' size='xl' type='button' ariaLabel='Envoyer le message' onClick={handleSubmit} disabled={isSubmitting}>
					{isSubmitting && <Spinner className='mr-2 size-4' />}
					{isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
				</Button>
				<Button
					variant='outline'
					size='xl'
					type='button'
					ariaLabel='Réinitialiser le formulaire'
					onClick={handleReset}
					disabled={isSubmitting}>
					Réinitialiser
				</Button>
			</div>
		</div>
	)
}

export { ContactForm }
export default ContactForm

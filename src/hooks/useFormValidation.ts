'use client'

import {
	ContactFormData,
	defaultFormData,
	formatFormData,
	getFieldError,
	hasFieldError,
	MESSAGES,
	sendContactEmail,
	validateField,
	validateForm,
	ValidationError,
} from '@/scripts/contactForm'
import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useRecaptcha } from './useRecaptcha'

export function useFormValidation() {
	// Hook localStorage pour persister les données du formulaire
	const [formData, setFormData, clearFormData] = useLocalStorage<ContactFormData>('contact-form-data', defaultFormData)

	// État pour les erreurs de validation
	const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

	// État pour l'envoi en cours
	const [isSubmitting, setIsSubmitting] = useState(false)

	// État pour l'animation de succès
	const [isSuccess, setIsSuccess] = useState(false)

	// Hook reCAPTCHA pour la protection anti-spam
	const { executeRecaptchaAction, isRecaptchaAvailable } = useRecaptcha()

	// Gestionnaire de changement pour les champs
	const handleInputChange = (field: keyof ContactFormData, value: string) => {
		const newData = { ...formData, [field]: value }
		setFormData(newData) // Le hook gère automatiquement localStorage

		// Effacer l'erreur pour ce champ quand l'utilisateur commence à taper
		setValidationErrors((prev) => prev.filter((error) => error.field !== field))
	}

	// Validation au blur (quand l'utilisateur quitte un champ)
	const handleFieldBlur = (field: keyof ContactFormData) => {
		// Ne pas valider si le formulaire est en cours de soumission
		if (isSubmitting) return

		// Valider seulement ce champ spécifique
		const fieldValue = formData[field] || ''
		const fieldError = validateField(field, fieldValue)

		// Mettre à jour les erreurs pour ce champ seulement
		setValidationErrors((prev) => {
			const otherErrors = prev.filter((error) => error.field !== field)
			return fieldError ? [...otherErrors, fieldError] : otherErrors
		})

		console.log(`Validation au blur pour ${field}:`, { fieldValue, fieldError })
	}

	// Gestionnaire de soumission du formulaire
	const handleSubmit = async () => {
		setIsSubmitting(true)

		// Validation complète avant envoi
		const errors = validateForm(formData)
		if (errors.length > 0) {
			setValidationErrors(errors)
			setIsSubmitting(false)
			return
		}

		try {
			// Vérifier reCAPTCHA
			if (!isRecaptchaAvailable) {
				console.warn('reCAPTCHA non disponible, envoi sans protection')
			}

			// Générer le token reCAPTCHA
			console.log('🛡️ Génération du token reCAPTCHA...')
			const recaptchaToken = await executeRecaptchaAction('contact_form')

			if (!recaptchaToken && isRecaptchaAvailable) {
				throw new Error('Échec de la vérification reCAPTCHA')
			}

			// Formater les données avant envoi
			const formattedData = formatFormData(formData)
			console.log('📤 Envoi des données:', {
				...formattedData,
				recaptchaToken: recaptchaToken ? '✅ Token généré' : '❌ Pas de token',
				recaptchaStatus: isRecaptchaAvailable ? '🟢 Actif' : '🟡 Non disponible',
			})

			// Envoyer l'email via Resend avec le token reCAPTCHA
			const result = await sendContactEmail({ ...formattedData, recaptchaToken: recaptchaToken || undefined })
			console.log('Email envoyé avec succès:', result)

			// En cas de succès, vider le formulaire et localStorage
			clearFormData()
			setValidationErrors([])

			// Déclencher l'animation de succès
			setIsSuccess(true)

			// Réinitialiser l'état de succès après 3 secondes
			setTimeout(() => setIsSuccess(false), 3000)

			return { success: true, result }
		} catch (error) {
			console.error("Erreur lors de l'envoi:", error)

			// Gestion des erreurs spécifiques
			let errorMessage: string = MESSAGES.ERROR_GENERAL
			if (error instanceof Error) {
				if (error.message.includes('fetch')) {
					errorMessage = MESSAGES.ERROR_NETWORK
				} else if (error.message.includes('reCAPTCHA')) {
					errorMessage = 'Erreur de vérification de sécurité. Veuillez réessayer.'
				} else {
					errorMessage = error.message
				}
			}

			// Pour les erreurs de sécurité, on ne les assigne pas à un champ spécifique
			if (errorMessage.includes('vérification de sécurité')) {
				setValidationErrors([])
			} else {
				setValidationErrors([{ field: 'email', message: errorMessage }])
			}
			return { success: false, error: errorMessage }
		} finally {
			setIsSubmitting(false)
		}
	}

	// Gestionnaire de réinitialisation
	const handleReset = () => {
		clearFormData()
		setValidationErrors([])
		setIsSuccess(false)
	}

	// Fonction pour tester la validation d'un champ spécifique
	const testFieldValidation = (field: keyof ContactFormData) => {
		const fieldValue = formData[field] || ''
		const fieldError = validateField(field, fieldValue)
		console.log(`Test validation champ ${field}:`, { value: fieldValue, error: fieldError })
		return fieldError
	}

	// Fonction pour tester la validation complète
	const testCompleteValidation = () => {
		const errors = validateForm(formData)
		setValidationErrors(errors)
		console.log('Test validation complète:', errors)
		return errors
	}

	return {
		// Données du formulaire
		formData,
		setFormData,
		clearFormData,

		// États
		validationErrors,
		isSubmitting,
		isSuccess,

		// Gestionnaires d'événements
		handleInputChange,
		handleFieldBlur,
		handleSubmit,
		handleReset,

		// Fonctions utilitaires
		getFieldError: (field: keyof ContactFormData) => getFieldError(field, validationErrors),
		hasFieldError: (field: keyof ContactFormData) => hasFieldError(field, validationErrors),
		testFieldValidation,
		testCompleteValidation,

		// Messages
		MESSAGES,
	}
}

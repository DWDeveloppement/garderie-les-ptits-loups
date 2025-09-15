// Script de gestion du formulaire de contact
// Validation, types et utilitaires
// les placeholder sont dans le composant ContactForm.tsx pour guider l'utilisateur

// Structure du formulaire
export type ContactFormData = {
	nom: string
	prenom: string
	email: string
	phone: string
	sujet: string
	message: string
	website?: string // Champ honeypot anti-bot
	recaptchaToken?: string
}

// Type pour les erreurs de validation
export type ValidationError = {
	field: keyof ContactFormData
	message: string
}

// Valeurs par défaut du formulaire
export const defaultFormData: ContactFormData = {
	nom: '',
	prenom: '',
	email: '',
	phone: '',
	sujet: '',
	message: '',
	website: '', // Champ honeypot vide par défaut
}

// Fonction utilitaire pour valider l'email
export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

// Validation utilitaire pour le téléphone
export const isValidPhone = (phone: string): boolean => {
	const phoneRegex = /^\+?[0-9\s]+$/ // accepte le préfixe + et les espaces
	const cleanPhone = phone.replace(/\s/g, '') // Nétoie les espaces pour une meilleure validation
	return phoneRegex.test(cleanPhone)
}

// Validation complète du formulaire
export const validateForm = (data: ContactFormData): ValidationError[] => {
	const errors: ValidationError[] = []

	// Validation du nom
	if (!data.nom.trim()) {
		errors.push({ field: 'nom', message: 'Nom requis' })
	} else if (data.nom.trim().length < 2) {
		errors.push({ field: 'nom', message: 'Nom doit contenir au moins 2 caractères' })
	}

	// Validation du prénom
	if (!data.prenom.trim()) {
		errors.push({ field: 'prenom', message: 'Prénom requis' })
	} else if (data.prenom.trim().length < 2) {
		errors.push({ field: 'prenom', message: 'Prénom doit contenir au moins 2 caractères' })
	}

	// Validation de l'email
	if (!data.email.trim()) {
		errors.push({ field: 'email', message: 'Email requis' })
	} else if (!isValidEmail(data.email)) {
		errors.push({ field: 'email', message: "Format d'email invalide" })
	}

	// Validation du téléphone (optionnel)
	if (data.phone && !isValidPhone(data.phone)) {
		errors.push({ field: 'phone', message: 'Format de téléphone invalide' })
	}

	// Validation du sujet
	if (!data.sujet.trim()) {
		errors.push({ field: 'sujet', message: 'Sujet requis' })
	} else if (data.sujet.trim().length < 5) {
		errors.push({ field: 'sujet', message: 'Sujet doit contenir au moins 5 caractères' })
	}

	// Validation du message
	if (!data.message.trim()) {
		errors.push({ field: 'message', message: 'Message requis' })
	} else if (data.message.trim().length < 10) {
		errors.push({ field: 'message', message: 'Message doit contenir au moins 10 caractères' })
	}

	// Validation du champ honeypot (anti-bot)
	if (data.website && data.website.trim().length > 0) {
		// Si le champ honeypot est rempli, c'est probablement un bot
		errors.push({ field: 'website', message: 'Suspicion de bot détectée' })
	}

	return errors
}

// Fonction pour valider un champ spécifique
export const validateField = (field: keyof ContactFormData, value: string): ValidationError | null => {
	switch (field) {
		case 'nom':
			if (!value.trim()) {
				return { field: 'nom', message: 'Nom requis' }
			} else if (value.trim().length < 2) {
				return { field: 'nom', message: 'Nom doit contenir au moins 2 caractères' }
			}
			break

		case 'prenom':
			if (!value.trim()) {
				return { field: 'prenom', message: 'Prénom requis' }
			} else if (value.trim().length < 2) {
				return { field: 'prenom', message: 'Prénom doit contenir au moins 2 caractères' }
			}
			break

		case 'email':
			if (!value.trim()) {
				return { field: 'email', message: 'Email requis' }
			} else if (!isValidEmail(value)) {
				return { field: 'email', message: "Format d'email invalide" }
			}
			break

		case 'phone':
			if (value && !isValidPhone(value)) {
				return { field: 'phone', message: 'Format de téléphone invalide' }
			}
			break

		case 'sujet':
			if (!value.trim()) {
				return { field: 'sujet', message: 'Sujet requis' }
			} else if (value.trim().length < 5) {
				return { field: 'sujet', message: 'Sujet doit contenir au moins 5 caractères' }
			}
			break

		case 'message':
			if (!value.trim()) {
				return { field: 'message', message: 'Message requis' }
			} else if (value.trim().length < 10) {
				return { field: 'message', message: 'Message doit contenir au moins 10 caractères' }
			}
			break

		case 'website':
			// Champ honeypot : si rempli, c'est probablement un bot
			if (value && value.trim().length > 0) {
				return { field: 'website', message: 'Suspicion de bot détectée' }
			}
			break
	}

	return null // Pas d'erreur
}

// Fonction pour obtenir l'erreur d'un champ spécifique
export const getFieldError = (field: keyof ContactFormData, errors: ValidationError[]): string | undefined => {
	return errors.find((error) => error.field === field)?.message
}

// Fonction pour vérifier si un champ a une erreur
export const hasFieldError = (field: keyof ContactFormData, errors: ValidationError[]): boolean => {
	return errors.some((error) => error.field === field)
}

// Fonction pour formater les données avant envoi
export const formatFormData = (data: ContactFormData) => {
	return {
		nom: data.nom.trim(),
		prenom: data.prenom.trim(),
		email: data.email.trim().toLowerCase(),
		phone: data.phone.trim(),
		sujet: data.sujet.trim(),
		message: data.message.trim(),
		// Le champ 'website' (honeypot) est exclu de l'envoi
	}
}

// Messages de succès et d'erreur
export const MESSAGES = {
	SUCCESS: 'Message envoyé avec succès !',
	ERROR_GENERAL: "Erreur lors de l'envoi du message",
	ERROR_VALIDATION: 'Veuillez corriger les erreurs dans le formulaire',
	ERROR_NETWORK: 'Erreur de connexion. Veuillez réessayer.',
} as const

// Fonction pour envoyer l'email via l'API
export const sendContactEmail = async (data: ContactFormData) => {
	try {
		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.error || "Erreur lors de l'envoi")
		}

		const result = await response.json()
		return result
	} catch (error) {
		console.error('Erreur sendContactEmail:', error)
		throw error
	}
}

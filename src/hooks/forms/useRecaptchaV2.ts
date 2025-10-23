'use client'

import { useCallback, useState } from 'react'

export function useRecaptchaV2() {
	const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
	const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false)
	const [recaptchaError, setRecaptchaError] = useState<string | null>(null)

	// Gestionnaire de vérification reCAPTCHA
	const handleRecaptchaVerify = useCallback((token: string | null) => {
		if (token) {
			setRecaptchaToken(token)
			setIsRecaptchaVerified(true)
			setRecaptchaError(null)
			console.log('✅ reCAPTCHA v2 vérifié avec succès')
		} else {
			setRecaptchaToken(null)
			setIsRecaptchaVerified(false)
			setRecaptchaError('Vérification reCAPTCHA échouée')
			console.log('❌ reCAPTCHA v2 vérification échouée')
		}
	}, [])

	// Gestionnaire d'expiration
	const handleRecaptchaExpire = useCallback(() => {
		setRecaptchaToken(null)
		setIsRecaptchaVerified(false)
		setRecaptchaError('Vérification reCAPTCHA expirée')
		console.log('⏰ reCAPTCHA v2 expiré')
	}, [])

	// Gestionnaire d'erreur
	const handleRecaptchaError = useCallback(() => {
		setRecaptchaToken(null)
		setIsRecaptchaVerified(false)
		setRecaptchaError('Erreur de chargement reCAPTCHA')
		console.log('❌ reCAPTCHA v2 erreur de chargement')
	}, [])

	// Réinitialiser reCAPTCHA
	const resetRecaptcha = useCallback(() => {
		setRecaptchaToken(null)
		setIsRecaptchaVerified(false)
		setRecaptchaError(null)
		console.log('🔄 reCAPTCHA v2 réinitialisé')
	}, [])

	return {
		recaptchaToken,
		isRecaptchaVerified,
		recaptchaError,
		handleRecaptchaVerify,
		handleRecaptchaExpire,
		handleRecaptchaError,
		resetRecaptcha,
	}
}

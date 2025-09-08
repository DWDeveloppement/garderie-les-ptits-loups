'use client'

import { useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export function useRecaptcha() {
	const { executeRecaptcha } = useGoogleReCaptcha()

	const executeRecaptchaAction = useCallback(
		async (action: string = 'contact_form'): Promise<string | null> => {
			if (!executeRecaptcha) {
				console.warn('reCAPTCHA non disponible')
				return null
			}

			try {
				const token = await executeRecaptcha(action)
				console.log('Token reCAPTCHA généré:', token ? '✅' : '❌')
				return token
			} catch (error) {
				console.error('Erreur reCAPTCHA:', error)
				return null
			}
		},
		[executeRecaptcha]
	)

	return {
		executeRecaptchaAction,
		isRecaptchaAvailable: !!executeRecaptcha,
	}
}

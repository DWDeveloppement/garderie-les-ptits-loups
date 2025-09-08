"use client"

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

type RecaptchaProviderProps = {
	children: React.ReactNode
}

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
	const siteKey = process.env.RECAPTCHA_SITE_KEY

	if (!siteKey) {
		console.warn('RECAPTCHA_SITE_KEY non configurée')
		return <>{children}</>
	}

	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={siteKey}
			scriptProps={{
				async: false,
				defer: false,
				appendTo: 'head',
				nonce: undefined,
			}}
			// Mode debug pour rendre reCAPTCHA visible
			useRecaptchaNet={false}
			useEnterprise={false}
		>
			{children}
		</GoogleReCaptchaProvider>
	)
}

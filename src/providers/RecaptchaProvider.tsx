"use client"

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

type RecaptchaProviderProps = {
	children: React.ReactNode
}

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
	const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

	if (!siteKey) {
		console.warn('NEXT_PUBLIC_RECAPTCHA_SITE_KEY non configurée')
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
		>
			{children}
		</GoogleReCaptchaProvider>
	)
}

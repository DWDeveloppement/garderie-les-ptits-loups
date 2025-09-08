// import { RecaptchaProvider } from '@/providers'

type ContactLayoutProps = {
	children: React.ReactNode
}

export default function ContactLayout({ children }: ContactLayoutProps) {
	// TEMPORAIRE: Désactivation reCAPTCHA pour test
	return (
		<>
			{children}
		</>
	)
}

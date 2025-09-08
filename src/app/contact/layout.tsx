import { RecaptchaProvider } from '@/providers'

type ContactLayoutProps = {
	children: React.ReactNode
}

export default function ContactLayout({ children }: ContactLayoutProps) {
	return (
		<RecaptchaProvider>
			{children}
		</RecaptchaProvider>
	)
}

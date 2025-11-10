import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Chelsea_Market, Open_Sans } from 'next/font/google'
import './globals.css'

// Imports statiques - Server Components (doivent être rendus côté serveur)
import { Footer } from '@/components/layout/Footer'
import { Partners } from '@/components/shared'
import { CriticalCSS } from '@/components/shared/CriticalCSS'

// Imports dynamiques - Client Components (chargement différé pour réduire le bundle initial)
// Header : chargé dynamiquement mais avec SSR pour le SEO (navigation importante)
const Header = dynamic(() => import('@/components/layout/Header').then((mod) => ({ default: mod.Header })), {
	ssr: true, // SSR activé pour le SEO (navigation visible immédiatement)
})

// Composants chargés uniquement côté client (imports dynamiques avec ssr: false)
import { AnimateCSSClient, MobileNavigationClient, ToasterClient } from '@/components/lazy/ClientOnlyComponents'

const chelseaMarket = Chelsea_Market({
	variable: '--font-chelsea-market',
	subsets: ['latin'],
	weight: ['400'], // Chelsea Market n'a qu'un seul poids
	display: 'swap',
})

const openSans = Open_Sans({
	variable: '--font-open-sans',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800'], // Tous les poids disponibles
	display: 'swap',
})

export const metadata: Metadata = {
	title: "Garderie Les P'tits Loups",
	description: "Garderie Les P'tits Loups",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='fr' className={`${openSans.variable} ${chelseaMarket.variable}`}>
			<head>
				{/* CSS critique inline - Évite le blocage du rendu initial */}
				<CriticalCSS />

				{/* Preconnect vers Google Fonts pour accélérer le chargement */}
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />

				{/* Preconnect vers Sanity CDN pour images optimisées */}
				<link rel='preconnect' href='https://cdn.sanity.io' />
				<link rel='dns-prefetch' href='https://cdn.sanity.io' />
				{/* CSS Animations - Chargement uniquement côté client (non-critique pour le FCP) */}
				<AnimateCSSClient />
			</head>
			<body className='antialiased'>
				<Header />
				<main>{children}</main>
				<Partners />
				<Footer />
				{/* MobileNavigation - Chargement uniquement côté client (menu mobile) */}
				<MobileNavigationClient />
				{/* Toaster - Chargement uniquement côté client (toasts après interactions) */}
				<ToasterClient />
			</body>
		</html>
	)
}

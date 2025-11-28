import type { Metadata } from 'next'
import { Chelsea_Market, Open_Sans } from 'next/font/google'
import './globals.css'

// Imports statiques - Server Components (doivent être rendus côté serveur)
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Partners } from '@/components/shared'
import { CriticalCSS } from '@/components/shared/CriticalCSS'

// Composants chargés uniquement côté client (imports dynamiques avec ssr: false)
import { AnimateCSSClient, ToasterClient } from '@/components/lazy/ClientOnlyComponents'
import TransitionProvider, { PageTransition } from '@/providers/Transition'
const chelseaMarket = Chelsea_Market({
	variable: '--font-chelsea-market',
	subsets: ['latin'],
	weight: ['400'], // Chelsea Market n'a qu'un seul poids
	display: 'swap',
	preload: true, // Preload activé pour accélérer le chargement (critique pour les titres)
	fallback: ['cursive'], // Fallback explicite
})

const openSans = Open_Sans({
	variable: '--font-open-sans',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'], // Poids réellement utilisés (normal, medium, semibold, bold)
	display: 'swap',
	preload: true, // Preload activé pour accélérer le chargement
	fallback: ['Arial', 'sans-serif'], // Fallback explicite
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

				{/* Preconnect vers Sanity CDN pour images optimisées 
				<link rel='preconnect' href='https://cdn.sanity.io' />
				<link rel='dns-prefetch' href='https://cdn.sanity.io' />
				*/}
				{/* CSS Animations - Chargement uniquement côté client (non-critique pour le FCP) */}
				<AnimateCSSClient />
			</head>
			<body className='antialiased'>
				<TransitionProvider>
					<Header />
					<PageTransition>{children}</PageTransition>
					<Partners />
					<Footer />
				</TransitionProvider>
				{/* Toaster - Chargement uniquement côté client (toasts après interactions) */}
				<ToasterClient />
			</body>
		</html>
	)
}

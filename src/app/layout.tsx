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

import { getBaseUrl } from '@/lib/url'

export const metadata: Metadata = {
	metadataBase: new URL(getBaseUrl()),
	title: {
		default: "Garderie Les P'tits Loups - Accueil chaleureux pour vos enfants",
		template: "%s | Garderie Les P'tits Loups",
	},
	description:
		"Garderie Les P'tits Loups offre un environnement sécurisé et stimulant pour le développement de vos enfants. Découvrez nos services de garde professionnels.",
	keywords: ['garderie', 'crèche', 'enfants', 'garde enfants', 'éducation petite enfance', 'Suisse'],
	authors: [{ name: "Garderie Les P'tits Loups" }],
	openGraph: {
		type: 'website',
		locale: 'fr_CH',
		url: '/',
		title: "Garderie Les P'tits Loups",
		description: "Accueil chaleureux et professionnel pour vos enfants",
		siteName: "Garderie Les P'tits Loups",
	},
	twitter: {
		card: 'summary_large_image',
		title: "Garderie Les P'tits Loups",
		description: "Accueil chaleureux et professionnel pour vos enfants",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		// Ajouter Google Search Console verification code ici quand disponible
		// google: 'votre-code-verification',
	},
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

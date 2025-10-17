import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/**
	 * Images Configuration
	 * Autorisation des sources externes pour Next/Image
	 */
	images: {
		remotePatterns: [
			{
				// Sanity CDN - Images de contenu
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				pathname: '/images/**',
			},
		],
		formats: ['image/webp', 'image/avif'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},

	/**
	 * Domaines autorisés
	 * Dev: *.vercel.app
	 * Production: www.garderielesptitsloups.ch
	 */
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'on',
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
				],
			},
		]
	},

	/**
	 * Redirections
	 * www → non-www (si nécessaire en production)
	 */
	async redirects() {
		return []
	},

	/**
	 * Rewrites
	 * Pour gérer les anciennes URLs si migration
	 */
	async rewrites() {
		return []
	},

	/**
	 * Environnements
	 */
	env: {
		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'http://localhost:3000',
	},
}

export default nextConfig

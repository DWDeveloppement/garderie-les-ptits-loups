/**
 * Construit l'URL de base du site avec le protocole correct
 * Gère automatiquement les environnements Vercel, local et production
 */
export function getBaseUrl(): string {
	// 1. Priorité: Variable définie manuellement (production avec domaine)
	if (process.env.NEXT_PUBLIC_SITE_URL) {
		return process.env.NEXT_PUBLIC_SITE_URL
	}

	// 2. Vercel: VERCEL_URL est défini SANS protocole
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`
	}

	// 3. Fallback: Développement local
	return 'http://localhost:3000'
}

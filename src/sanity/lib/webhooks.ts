/**
 * Configuration des webhooks Sanity
 *
 * Webhooks déclenchés automatiquement lors de la publication de contenu
 * pour rebuilder le site sur Vercel/Netlify
 */

export const webhookConfig = {
	/**
	 * Webhook principal : Rebuild production sur publication
	 */
	productionDeploy: {
		name: 'vercel-production-deploy',
		description: 'Déclenche un rebuild automatique du site lors de la publication de contenu',

		// URL du Deploy Hook (à configurer dans Vercel Dashboard)
		// Settings → Git → Deploy Hooks → Create Hook
		url: process.env.SANITY_STUDIO_VERCEL_DEPLOY_HOOK || '',

		// Dataset concerné
		dataset: 'production',

		// Événements déclencheurs
		on: ['publish'], // Uniquement quand le client publie (pas les drafts)

		// Filtre GROQ : Rebuild uniquement pour les types de contenu importants
		// Évite les rebuilds inutiles (ex: modifications de settings internes)
		filter: `
			_type in [
				"home",
				"aboutPage", 
				"contactPage", 
				"schedulePage",
				"sectorPage",
				"spacePage",
				"prices",
				"testimonials"
			]
		`,

		// Projection : Données envoyées au webhook (pour logging)
		projection: `{
			_type,
			_id,
			title,
			"publishedAt": _updatedAt,
			"publishedBy": _updatedBy
		}`,

		// Headers HTTP (optionnel - pour sécurité supplémentaire)
		headers: {
			'Content-Type': 'application/json',
			// Ajouter un secret si Vercel le supporte
			// 'X-Sanity-Webhook-Secret': process.env.SANITY_WEBHOOK_SECRET
		},

		// HTTP Method
		httpMethod: 'POST',
	},

	/**
	 * Webhook optionnel : Notifications Discord/Slack
	 * (Pour être notifié quand le client publie du contenu)
	 */
	notifications: {
		enabled: false, // À activer plus tard si besoin
		name: 'discord-notifications',
		url: process.env.SANITY_STUDIO_DISCORD_WEBHOOK || '',
		on: ['publish'],
		filter: '_type in ["home", "aboutPage", "contactPage", "schedulePage"]',
	},
}

/**
 * Validation de la configuration
 */
export function validateWebhookConfig(): boolean {
	if (!webhookConfig.productionDeploy.url) {
		console.warn('⚠️  SANITY_STUDIO_VERCEL_DEPLOY_HOOK non configuré')
		console.warn('   Le site ne se rebuildera pas automatiquement.')
		console.warn('   Voir : sanity/lib/webhooks.ts pour la configuration')
		return false
	}

	console.log('✅ Webhook configuration validée')
	console.log(`   → URL: ${webhookConfig.productionDeploy.url.substring(0, 50)}...`)
	return true
}

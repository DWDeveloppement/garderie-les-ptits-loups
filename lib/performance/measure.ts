/**
 * Helpers pour mesurer les performances
 * Utile pour monitorer les temps de requêtes Sanity et rendering
 */

type PerformanceMeasure = {
	label: string
	duration: number
	timestamp: number
}

type AlertLevel = 'warning' | 'error' | 'critical'

type PerformanceAlert = {
	measure: PerformanceMeasure
	level: AlertLevel
	threshold: number
	message: string
}

type ThresholdsConfig = {
	/** Seuil d'alerte warning (ms) - Défaut: 100ms */
	warning: number
	/** Seuil d'alerte error (ms) - Défaut: 200ms */
	error: number
	/** Seuil d'alerte critical (ms) - Défaut: 500ms */
	critical: number
	/** Seuils spécifiques par type de requête (optionnel) */
	specific?: Record<string, { warning?: number; error?: number; critical?: number }>
}

const DEFAULT_THRESHOLDS: ThresholdsConfig = {
	warning: 100,
	error: 200,
	critical: 500,
}

let thresholdsConfig: ThresholdsConfig = { ...DEFAULT_THRESHOLDS }

const measurements: PerformanceMeasure[] = []

/**
 * Mesure le temps d'exécution d'une fonction async
 */
export async function measureAsync<T>(label: string, fn: () => Promise<T>, options: { log?: boolean } = {}): Promise<T> {
	const start = Date.now()

	try {
		const result = await fn()
		const duration = Date.now() - start

		const measure: PerformanceMeasure = {
			label,
			duration,
			timestamp: start,
		}

		measurements.push(measure)

		if (options.log !== false) {
			console.log(`[Performance] ${label}: ${duration}ms`)
		}

		return result
	} catch (error) {
		const duration = Date.now() - start
		console.error(`[Performance] ${label} FAILED after ${duration}ms`, error)
		throw error
	}
}

/**
 * Mesure spécifique pour les requêtes Sanity
 */
export async function measureSanityQuery<T>(queryName: string, queryFn: () => Promise<T>): Promise<T> {
	return measureAsync(`Sanity Query: ${queryName}`, queryFn, { log: true })
}

/**
 * Récupère toutes les mesures
 */
export function getMeasurements(): PerformanceMeasure[] {
	return [...measurements]
}

/**
 * Récupère le temps total de toutes les requêtes Sanity
 */
export function getTotalSanityTime(): number {
	return measurements.filter((m) => m.label.startsWith('Sanity Query')).reduce((total, m) => total + m.duration, 0)
}

/**
 * Affiche un rapport de performance
 */
export function logPerformanceReport() {
	if (measurements.length === 0) {
		console.log('[Performance] Aucune mesure enregistrée')
		return
	}

	console.log('\n' + '='.repeat(60))
	console.log('📊 RAPPORT DE PERFORMANCE')
	console.log('='.repeat(60))

	measurements.forEach((m) => {
		console.log(`   ${m.label.padEnd(40)} ${m.duration}ms`)
	})

	const total = measurements.reduce((sum, m) => sum + m.duration, 0)
	const sanityTotal = getTotalSanityTime()

	console.log('-'.repeat(60))
	console.log(`   ${'Total Sanity Queries'.padEnd(40)} ${sanityTotal}ms`)
	console.log(`   ${'Total général'.padEnd(40)} ${total}ms`)
	console.log('='.repeat(60) + '\n')
}

/**
 * Reset toutes les mesures
 */
export function resetMeasurements() {
	measurements.length = 0
}

/**
 * Configure les seuils d'alerte
 */
export function setThresholds(config: Partial<ThresholdsConfig>) {
	thresholdsConfig = { ...DEFAULT_THRESHOLDS, ...config }
	if (config.specific) {
		thresholdsConfig.specific = { ...thresholdsConfig.specific, ...config.specific }
	}
}

/**
 * Réinitialise les seuils aux valeurs par défaut
 */
export function resetThresholds() {
	thresholdsConfig = { ...DEFAULT_THRESHOLDS }
}

/**
 * Détecte le niveau d'alerte pour une mesure donnée
 */
function detectAlertLevel(measure: PerformanceMeasure, config: ThresholdsConfig): AlertLevel | null {
	const queryName = measure.label.replace('Sanity Query: ', '')

	// Déterminer les seuils à utiliser (spécifiques ou par défaut)
	let warning = config.warning
	let error = config.error
	let critical = config.critical

	if (config.specific && config.specific[queryName]) {
		const specific = config.specific[queryName]
		warning = specific.warning ?? config.warning
		error = specific.error ?? config.error
		critical = specific.critical ?? config.critical
	}

	if (measure.duration >= critical) {
		return 'critical'
	}
	if (measure.duration >= error) {
		return 'error'
	}
	if (measure.duration >= warning) {
		return 'warning'
	}

	return null
}

/**
 * Génère les alertes pour toutes les mesures
 */
export function generateAlerts(config: ThresholdsConfig = thresholdsConfig): PerformanceAlert[] {
	const alerts: PerformanceAlert[] = []

	for (const measure of measurements) {
		const level = detectAlertLevel(measure, config)
		if (level) {
			const queryName = measure.label.replace('Sanity Query: ', '')
			const specific = config.specific?.[queryName]

			// Déterminer le seuil en utilisant les valeurs spécifiques ou les valeurs par défaut
			let threshold: number
			if (level === 'critical') {
				threshold = specific?.critical ?? config.critical
			} else if (level === 'error') {
				threshold = specific?.error ?? config.error
			} else {
				threshold = specific?.warning ?? config.warning
			}

			alerts.push({
				measure,
				level,
				threshold,
				message: `${queryName} dépasse le seuil ${level} (${measure.duration}ms > ${threshold}ms)`,
			})
		}
	}

	return alerts.sort((a, b) => {
		const levelOrder: Record<AlertLevel, number> = { critical: 3, error: 2, warning: 1 }
		return levelOrder[b.level] - levelOrder[a.level] || b.measure.duration - a.measure.duration
	})
}

/**
 * Génère un rapport de performance au format JSON
 */
export function generatePerformanceReport(options: { includeAlerts?: boolean; thresholds?: ThresholdsConfig } = {}): {
	summary: {
		total: number
		sanityQueries: number
		sanityTotal: number
		other: number
		otherTotal: number
		count: number
		alerts?: {
			warning: number
			error: number
			critical: number
			total: number
		}
	}
	measurements: PerformanceMeasure[]
	sanityQueries: PerformanceMeasure[]
	other: PerformanceMeasure[]
	alerts?: PerformanceAlert[]
	thresholds?: ThresholdsConfig
	generatedAt: string
} {
	const sanityQueries = measurements.filter((m) => m.label.startsWith('Sanity Query'))
	const other = measurements.filter((m) => !m.label.startsWith('Sanity Query'))
	const total = measurements.reduce((sum, m) => sum + m.duration, 0)
	const sanityTotal = sanityQueries.reduce((sum, m) => sum + m.duration, 0)
	const otherTotal = other.reduce((sum, m) => sum + m.duration, 0)

	const config = options.thresholds || thresholdsConfig
	const alerts = options.includeAlerts !== false ? generateAlerts(config) : undefined

	const summary: {
		total: number
		sanityQueries: number
		sanityTotal: number
		other: number
		otherTotal: number
		count: number
		alerts?: {
			warning: number
			error: number
			critical: number
			total: number
		}
	} = {
		total,
		sanityQueries: sanityQueries.length,
		sanityTotal,
		other: other.length,
		otherTotal,
		count: measurements.length,
	}

	if (alerts) {
		summary.alerts = {
			warning: alerts.filter((a) => a.level === 'warning').length,
			error: alerts.filter((a) => a.level === 'error').length,
			critical: alerts.filter((a) => a.level === 'critical').length,
			total: alerts.length,
		}
	}

	return {
		summary,
		measurements: [...measurements],
		sanityQueries,
		other,
		...(alerts && { alerts }),
		...(options.includeAlerts !== false && { thresholds: config }),
		generatedAt: new Date().toISOString(),
	}
}

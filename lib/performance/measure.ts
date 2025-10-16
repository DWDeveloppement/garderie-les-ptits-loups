/**
 * Helpers pour mesurer les performances
 * Utile pour monitorer les temps de requêtes Sanity et rendering
 */

type PerformanceMeasure = {
	label: string
	duration: number
	timestamp: number
}

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

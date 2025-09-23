'use client'

import { QueriesLog, useQueriesLog } from '@/components/debug/QueriesLog'

type TestSanityQueryProps = {
  testData: unknown
  queryName?: string
  isEnabled?: boolean
}

export function TestSanityQuery({ testData, queryName = 'Test Query', isEnabled = true }: TestSanityQueryProps) {
  const { queries, logQuery, clearLogs } = useQueriesLog()

  const handleTestQuery = async () => {
    try {
      const startTime = Date.now()
      
      // Simuler une query avec les données passées
      const duration = Date.now() - startTime
      logQuery(queryName, testData, duration)
    } catch (error) {
      const duration = Date.now() - Date.now()
      logQuery(`${queryName} Error`, null, duration, error instanceof Error ? error.message : 'Erreur inconnue')
    }
  }
  const handleClearLogs = () => {
    clearLogs()
  }

  if (!isEnabled) return null

  return (
		<div className='p-4 w-full max-w-4xl mx-auto flex flex-col gap-4'>
			<div className='flex flex-row justify-around gap-4'>
				<button onClick={handleTestQuery} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
					Test Query Sanity
				</button>
				<button onClick={handleClearLogs} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
					Reinitialiser
				</button>
			</div>

			<QueriesLog queries={queries} isEnabled={true} />
		</div>
	)
}
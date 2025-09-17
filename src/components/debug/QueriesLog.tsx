'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useState } from 'react'

// ============================================================================
// TYPES
// ============================================================================

type QueryLog = {
  name: string
  data: unknown
  timestamp: Date
  duration?: number
  error?: string
}

type QueriesLogProps = {
  queries: QueryLog[]
  isEnabled?: boolean
  className?: string
}

// ============================================================================
// COMPOSANT QUERIES LOG
// ============================================================================

export function QueriesLog({ queries, isEnabled = true, className = '' }: QueriesLogProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null)

  // Si désactivé, ne rien afficher
  if (!isEnabled) {
    return null
  }

  // Si pas de queries, ne rien afficher
  if (!queries || queries.length === 0) {
    return null
  }

  const formatDuration = (duration?: number) => {
    if (!duration) return 'N/A'
    return `${duration}ms`
  }

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    })
  }

  const copyToClipboard = (data: unknown) => {
    const jsonString = JSON.stringify(data, null, 2)
    navigator.clipboard.writeText(jsonString)
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <Card className="bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
        {/* Header */}
        <CardHeader className="flex items-center justify-between p-3 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <h3 className="text-sm font-semibold">Sanity Queries Log</h3>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">
              {queries.length}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={isExpanded ? 'Réduire' : 'Développer'}
          >
            {isExpanded ? '−' : '+'}
          </button>
        </CardHeader>

        {/* Content */}
        <CardContent>
          {isExpanded && (
            <div className="max-h-96 overflow-y-auto">
              {queries.map((query, index) => (
                <div key={index} className="border-b border-gray-700 last:border-b-0">
                  {/* Query Header */}
                  <div
                    className="p-3 cursor-pointer hover:bg-gray-800 transition-colors"
                    onClick={() => setSelectedQuery(selectedQuery === query.name ? null : query.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-blue-400">
                          {query.name}
                        </span>
                        {query.error && (
                          <span className="text-xs bg-red-600 px-2 py-1 rounded">
                            ERROR
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatDuration(query.duration)}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatTimestamp(query.timestamp)}
                    </div>
                  </div>

                  {/* Query Details */}
                  {selectedQuery === query.name && (
                    <div className="px-3 pb-3 bg-gray-800">
                      {query.error ? (
                        <div className="text-red-400 text-sm font-mono">
                          {query.error}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">
                              Données ({Array.isArray(query.data) ? query.data.length : 'Object'})
                            </span>
                            <button
                              onClick={() => copyToClipboard(query.data)}
                              className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors"
                            >
                              Copier JSON
                            </button>
                          </div>
                          <pre className="text-xs bg-gray-900 p-2 rounded overflow-x-auto max-h-40 overflow-y-auto">
                            {JSON.stringify(query.data, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// HOOK POUR GÉRER LES QUERIES LOGS
// ============================================================================

export function useQueriesLog() {
  const [queries, setQueries] = useState<QueryLog[]>([])

  const logQuery = (
    name: string,
    data: unknown,
    duration?: number,
    error?: string
  ) => {
    const newQuery: QueryLog = {
      name,
      data,
      timestamp: new Date(),
      duration,
      error,
    }

    setQueries(prev => [newQuery, ...prev.slice(0, 9)]) // Garder les 10 dernières
  }

  const clearLogs = () => {
    setQueries([])
  }

  return {
    queries,
    logQuery,
    clearLogs,
  }
}

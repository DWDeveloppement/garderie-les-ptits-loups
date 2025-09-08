'use client'

import { useEffect, useState } from 'react'

export type LogEntry = {
	id: string
	timestamp: Date
	level: 'log' | 'warn' | 'error' | 'info'
	message: string
	data?: any
}

export function useConsoleLogs() {
	const [logs, setLogs] = useState<LogEntry[]>([])

	useEffect(() => {
		// Sauvegarder les fonctions console originales
		const originalLog = console.log
		const originalWarn = console.warn
		const originalError = console.error
		const originalInfo = console.info

		// Fonction pour ajouter un log
		const addLog = (level: LogEntry['level'], message: string, data?: any) => {
			const logEntry: LogEntry = {
				id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
				timestamp: new Date(),
				level,
				message,
				data,
			}

			setLogs((prev) => [...prev.slice(-19), logEntry]) // Garder les 20 derniers logs
		}

		// Intercepter console.log
		console.log = (...args) => {
			originalLog(...args)
			addLog('log', args.join(' '), args.length > 1 ? args : undefined)
		}

		// Intercepter console.warn
		console.warn = (...args) => {
			originalWarn(...args)
			addLog('warn', args.join(' '), args.length > 1 ? args : undefined)
		}

		// Intercepter console.error
		console.error = (...args) => {
			originalError(...args)
			addLog('error', args.join(' '), args.length > 1 ? args : undefined)
		}

		// Intercepter console.info
		console.info = (...args) => {
			originalInfo(...args)
			addLog('info', args.join(' '), args.length > 1 ? args : undefined)
		}

		// Cleanup function
		return () => {
			console.log = originalLog
			console.warn = originalWarn
			console.error = originalError
			console.info = originalInfo
		}
	}, [])

	const clearLogs = () => setLogs([])

	return { logs, clearLogs }
}

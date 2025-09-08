"use client"

import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type Toast = {
	id: string
	type: ToastType
	title: string
	message?: string
	duration?: number
}

type ToastProps = {
	toast: Toast
	onRemove: (id: string) => void
}

function ToastComponent({ toast, onRemove }: ToastProps) {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		// Animation d'entrée
		setIsVisible(true)

		// Auto-remove après la durée spécifiée
		const timer = setTimeout(() => {
			setIsVisible(false)
			setTimeout(() => onRemove(toast.id), 300) // Attendre la fin de l'animation
		}, toast.duration || 5000)

		return () => clearTimeout(timer)
	}, [toast.id, toast.duration, onRemove])

	const getToastStyles = () => {
		switch (toast.type) {
			case 'success':
				return 'border-green-200 bg-green-50 text-green-800'
			case 'error':
				return 'border-red-200 bg-red-50 text-red-800'
			case 'warning':
				return 'border-yellow-200 bg-yellow-50 text-yellow-800'
			case 'info':
				return 'border-blue-200 bg-blue-50 text-blue-800'
			default:
				return 'border-gray-200 bg-gray-50 text-gray-800'
		}
	}

	const getIcon = () => {
		switch (toast.type) {
			case 'success':
				return '✅'
			case 'error':
				return '❌'
			case 'warning':
				return '⚠️'
			case 'info':
				return 'ℹ️'
			default:
				return '📢'
		}
	}

	return (
		<div
			className={`fixed bottom-4 right-4 z-50 transition-all duration-300 transform ${
				isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
			}`}
		>
			<Card className={`p-4 shadow-lg border-l-4 ${getToastStyles()}`}>
				<div className="flex items-start gap-3">
					<span className="text-lg">{getIcon()}</span>
					<div className="flex-1">
						<h4 className="font-semibold text-sm">{toast.title}</h4>
						{toast.message && (
							<p className="text-sm mt-1 opacity-90">{toast.message}</p>
						)}
					</div>
					<button
						onClick={() => {
							setIsVisible(false)
							setTimeout(() => onRemove(toast.id), 300)
						}}
						className="text-lg opacity-60 hover:opacity-100 transition-opacity"
					>
						×
					</button>
				</div>
			</Card>
		</div>
	)
}

// Hook pour gérer les toasts
export function useToast() {
	const [toasts, setToasts] = useState<Toast[]>([])

	const addToast = (toast: Omit<Toast, 'id'>) => {
		const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
		const newToast: Toast = { ...toast, id }
		setToasts(prev => [...prev, newToast])
	}

	const removeToast = (id: string) => {
		setToasts(prev => prev.filter(toast => toast.id !== id))
	}

	const showSuccess = (title: string, message?: string) => {
		addToast({ type: 'success', title, message })
	}

	const showError = (title: string, message?: string) => {
		addToast({ type: 'error', title, message })
	}

	const showWarning = (title: string, message?: string) => {
		addToast({ type: 'warning', title, message })
	}

	const showInfo = (title: string, message?: string) => {
		addToast({ type: 'info', title, message })
	}

	const ToastContainer = () => (
		<div className="fixed bottom-4 right-4 z-50 space-y-2">
			{toasts.map(toast => (
				<ToastComponent
					key={toast.id}
					toast={toast}
					onRemove={removeToast}
				/>
			))}
		</div>
	)

	return {
		showSuccess,
		showError,
		showWarning,
		showInfo,
		ToastContainer
	}
}

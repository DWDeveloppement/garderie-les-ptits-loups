"use client"

import * as Toast from "@radix-ui/react-toast"
import * as React from "react"
import { Button } from "./button"
import { Card } from "./card"

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastProps = {
  type?: ToastType
  title: string
  description?: string
  action?: React.ReactNode
  duration?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

// Types de messages de toasts
const toastType = {
  success: {
    style: 'border-green-200 bg-green-50 text-green-800',
    icon: '✅'
  },
  error: {
    style: 'border-red-200 bg-red-50 text-red-800',
    icon: '❌'
  },
  warning: {
    style: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    icon: '⚠️'
  },
  info: {
    style: 'border-blue-200 bg-blue-50 text-blue-800',
    icon: 'ℹ️'
  },
  default: {
    style: 'border-gray-200 bg-gray-50 text-gray-800',
    icon: '📢'
  }
}


const ToastComponent = React.forwardRef<
  React.ElementRef<typeof Toast.Root>,
  ToastProps
>(({ type = 'info', title, description, action, duration = 5000, ...props }, ref) => {
  const getToastType = () => {
    switch (type) {
      case 'success':
        return {style: toastType.success.style, icon: toastType.success.icon}
      case 'error':
        return {style: toastType.error.style, icon: toastType.error.icon}
      case 'warning':
        return {style: toastType.warning.style, icon: toastType.warning.icon}
      case 'info':
        return {style: toastType.info.style, icon: toastType.info.icon}
      default:
        return {style: toastType.default.style, icon: toastType.default.icon}
    }
  }

  return (
		<Toast.Root
			ref={ref}
			duration={duration}
			className={`fixed bottom-4 right-4 z-50 transition-all duration-300 transform ${getToastType().style}`}
			{...props}>
			<Card className='p-4 shadow-lg border-l-4'>
				<div className='flex items-start gap-3'>
					<span className='text-lg'>{getToastType().icon}</span>
					<div className='flex-1'>
						<Toast.Title className='font-semibold text-sm'>{title}</Toast.Title>
						{description && <Toast.Description className='text-sm mt-1 opacity-90'>{description}</Toast.Description>}
					</div>
					{action && (
						<Toast.Action asChild altText={`${action}`}>
							{action}
						</Toast.Action>
					)}
					<Toast.Close asChild>
						<Button variant='ghost' size='1' className='h-6 w-6 text-lg opacity-60 hover:opacity-100' aria-label='Fermer'>
							×
						</Button>
					</Toast.Close>
				</div>
			</Card>
		</Toast.Root>
	)
})
ToastComponent.displayName = "Toast"

// Hook pour gérer les toasts avec Radix
export function useToast() {
  const [toasts, setToasts] = React.useState<Array<ToastProps & { id: string }>>([])

  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newToast: ToastProps & { id: string } = { ...toast, id }
    setToasts(prev => [...prev, newToast])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const showSuccess = (title: string, description?: string) => {
    addToast({ type: 'success', title, description })
  }

  const showError = (title: string, description?: string) => {
    addToast({ type: 'error', title, description })
  }

  const showWarning = (title: string, description?: string) => {
    addToast({ type: 'warning', title, description })
  }

  const showInfo = (title: string, description?: string) => {
    addToast({ type: 'info', title, description })
  }

  const ToastContainer = () => (
    <Toast.Provider swipeDirection="right">
      {toasts.map(toast => (
        <ToastComponent
          key={toast.id}
          {...toast}
          onOpenChange={(open) => {
            if (!open) {
              setTimeout(() => removeToast(toast.id), 300)
            }
          }}
        />
      ))}
      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50 outline-none" />
    </Toast.Provider>
  )

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    ToastContainer
  }
}

export { ToastComponent as Toast }

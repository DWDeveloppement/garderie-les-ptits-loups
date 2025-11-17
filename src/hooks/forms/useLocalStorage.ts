'use client'

import { useState } from 'react'

type UseLocalStorageReturn<T> = [T, (value: T) => void, () => void]

export function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturn<T> {
	// État pour stocker la valeur
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === 'undefined') {
			return initialValue
		}

		try {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			console.error(`Erreur lors de la lecture de localStorage pour la clé "${key}":`, error)
			return initialValue
		}
	})

	// Fonction pour mettre à jour la valeur et localStorage
	const setValue = (value: T) => {
		try {
			setStoredValue(value)
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(value))
			}
		} catch (error) {
			console.error(`Erreur lors de l'écriture dans localStorage pour la clé "${key}":`, error)
		}
	}

	// Fonction pour supprimer la valeur de localStorage
	const removeValue = () => {
		try {
			setStoredValue(initialValue)
			if (typeof window !== 'undefined') {
				window.localStorage.removeItem(key)
			}
		} catch (error) {
			console.error(`Erreur lors de la suppression de localStorage pour la clé "${key}":`, error)
		}
	}

	return [storedValue, setValue, removeValue]
}

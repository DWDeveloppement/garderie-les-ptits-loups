import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useConsoleLogs } from '@/hooks/useConsoleLogs'
import { ContactFormData, ValidationError, validateField } from '@/scripts/contactForm'

type ContactFormDebugProps = {
	formData: ContactFormData
	validationErrors: ValidationError[]
	isSubmitting: boolean
	onSetValidationErrors: () => ValidationError[]
}

export function ContactFormDebug({
	formData,
	validationErrors,
	isSubmitting,
	onSetValidationErrors
}: ContactFormDebugProps) {
	const { logs, clearLogs } = useConsoleLogs()

	const handleTestValidation = () => {
		const testErrors = onSetValidationErrors()
		console.log('Test validation complète:', testErrors)
	}
	
	const handleTestFieldValidation = (field: keyof ContactFormData) => {
		const fieldValue = formData[field] || ''
		const fieldError = validateField(field, fieldValue)
		console.log(`Test validation champ ${field}:`, { value: fieldValue, error: fieldError })
	}

	return (
		<Card className="mt-8">
			<CardHeader>
				<CardTitle className="text-orange-12">Debug - État du formulaire</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<h3 className="text-sm font-semibold text-orange-11 mb-2">Données du formulaire :</h3>
					<pre className="bg-orange-1 p-3 rounded text-xs text-orange-12 overflow-auto">
						{JSON.stringify(formData, null, 2)}
					</pre>
				</div>
				<div>
					<h3 className="text-sm font-semibold text-orange-11 mb-2">
						Erreurs de validation ({validationErrors.length}) :
					</h3>
					{validationErrors.length > 0 ? (
						<div className="space-y-1">
							{validationErrors.map((error) => (
								<div key={error.field} className="bg-red-50 border border-red-200 p-2 rounded text-sm">
									<span className="font-medium text-red-800">{error.field}:</span>
									<span className="text-red-700 ml-2">{error.message}</span>
								</div>
							))}
						</div>
					) : (
						<p className="text-green-600 text-sm">✅ Aucune erreur de validation</p>
					)}
				</div>
				<div>
					<h3 className="text-sm font-semibold text-orange-11 mb-2">État de soumission :</h3>
					<p className={`text-sm ${isSubmitting ? 'text-blue-600' : 'text-gray-600'}`}>
						{isSubmitting ? '🔄 En cours de soumission...' : '⏸️ En attente'}
					</p>
				</div>
				<div>
					<h3 className="text-sm font-semibold text-orange-11 mb-2">Test de validation :</h3>
					<div className="space-y-2">
						<Button 
							size="sm" 
							variant="outline" 
							onClick={handleTestValidation}
							className="text-xs mr-2"
						>
							Validation complète
						</Button>
						<div className="flex flex-wrap gap-1">
							{['nom', 'prenom', 'email', 'sujet', 'message'].map((field) => (
								<Button
									key={field}
									size="sm"
									variant="outline"
									onClick={() => handleTestFieldValidation(field as keyof ContactFormData)}
									className="text-xs"
								>
									{field}
								</Button>
							))}
						</div>
					</div>
                </div>
				
				{/* Statut reCAPTCHA v2 */}
				<div className="mb-4">
					<div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
						<div className="flex items-center space-x-2 mb-2">
							<div className="w-2 h-2 rounded-full bg-green-500"></div>
							<span className="text-sm font-medium text-gray-700">reCAPTCHA v2</span>
						</div>
						
						<div className="text-xs text-gray-600 space-y-1">
							<div>Status: 🟢 Case à cocher visible</div>
							<div>Mode: Production</div>
							<div>Protection: Anti-spam avec validation manuelle</div>
						</div>
					</div>
				</div>
				
				<div>
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-sm font-semibold text-orange-11">
							Logs console ({logs.length}) :
						</h3>
						<Button 
							size="sm" 
							variant="outline" 
							onClick={clearLogs}
							className="text-xs h-6 px-2"
						>
							Effacer
						</Button>
					</div>
					<div className="bg-orange-1 p-3 rounded text-xs text-orange-12 overflow-auto max-h-48">
						{logs.length === 0 ? (
							<p className="text-orange-10 italic">Aucun log pour le moment...</p>
						) : (
							<div className="space-y-1">
								{logs.map((log) => (
									<div key={log.id} className="flex items-start gap-2 text-xs">
										<span className={`font-mono text-xs px-1 rounded ${
											log.level === 'error' ? 'bg-red-100 text-red-800' :
											log.level === 'warn' ? 'bg-yellow-100 text-yellow-800' :
											log.level === 'info' ? 'bg-blue-100 text-blue-800' :
											'bg-gray-100 text-gray-800'
										}`}>
											{log.level.toUpperCase()}
										</span>
										<span className="text-orange-10 font-mono">
											{log.timestamp.toLocaleTimeString()}
										</span>
										<span className="flex-1">{log.message}</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

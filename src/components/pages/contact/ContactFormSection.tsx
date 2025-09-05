/**Section Contact - Garderie Les P'tits Loups
 * Un formulaire de contact avec Nom, prénom, email,sujet, message.
 * Un bouton de soumission et un bouton de réinitialisation.
 * système de conservation des données saisies dans le formulaire pour éviter que les champs soient effacés lors de l'échec de la soumission en utilisant le localStorage.
 * vidage du formulaire et du localStorage lors de la soumission réussie.
 * système de validation du formulaire avec des messages d'erreur si les champs ne sont pas remplis correctement.
 * Un message de confirmation.
 * Un message d'erreur si la soumission échoue.
 * Un message d'erreur si le formulaire est soumis avec des champs vides.
 * Un message d'erreur si le formulaire est soumis avec un email invalide.
 * 
 * Le système de validation du formulaire doit être fait en utilisant le composant Form de React Hook Form, avec zod pour la validation.
 * resend pour l'envoi des emails.
 */
"use client"

import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import * as Form from '@radix-ui/react-form'
import { z } from "zod"

// Structure du formulaire
type ContactFormData = {
  nom: string
  prenom: string
  email: string
  sujet: string
  message: string
}

// Validation Zod
const contactSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  prenom: z.string().min(2, "Prénom requis"),
  email: z.string().email("Email invalide"),
  sujet: z.string().min(5, "Sujet requis"),
  message: z.string().min(10, "Message requis")
})

export function ContactFormSection() {
	// Valeurs par défaut du formulaire
	const defaultFormData: ContactFormData = {
		nom: '',
		prenom: '',
		email: '',
		sujet: '',
		message: ''
	}

	// Hook localStorage pour persister les données du formulaire
	const [formData, setFormData, clearFormData] = useLocalStorage<ContactFormData>(
		'contact-form-data',
		defaultFormData
	)

	// Gestionnaire de changement pour les champs
	const handleInputChange = (field: keyof ContactFormData, value: string) => {
		const newData = { ...formData, [field]: value }
		setFormData(newData) // Le hook gère automatiquement localStorage
	}

	// Gestionnaire de soumission
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		
		// Validation avec Zod
		const validationResult = contactSchema.safeParse(formData)
		
		if (!validationResult.success) {
			console.error('Erreurs de validation:', validationResult.error.issues)
			// Ici on pourrait afficher les erreurs à l'utilisateur
			return
		}

		// Simulation d'envoi (à remplacer par l'appel API réel)
		console.log('Données du formulaire:', formData)
		
		// En cas de succès, vider le formulaire et localStorage
		clearFormData()
		
		// Message de succès (à implémenter)
		alert('Message envoyé avec succès !')
	}

	// Gestionnaire de réinitialisation
	const handleReset = () => {
		clearFormData()
	}

	return (
		<section className="flex flex-col gap-4 py-16 px-4 sm:px-6 lg:px-8 bg-orange-bg-light">
			<div className="max-w-4xl mx-auto text-center space-y-4">
			<h2 className="text-5xl font-bold text-purple-9">Contactez-nous</h2>
			<p className="text-lg text-orange-11">
				Nous sommes à votre entière disposition pour répondre à toutes vos questions.
			</p>
			
                <Form.Root className="w-full max-w-2xl mt-16" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Nom */}
				<Form.Field className="mb-4 grid" name="nom">
					<div className="flex items-baseline justify-between">
						<Form.Label className="text-sm font-medium text-orange-12">Nom</Form.Label>
						<Form.Message className="text-xs text-red-500" match="valueMissing">
							Nom requis
						</Form.Message>
					</div>
					<Form.Control asChild>
						<input
							className="w-full px-3 py-2 border border-orange-6 rounded-md bg-white text-orange-12 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent"
							type="text"
							value={formData.nom}
							onChange={(e) => handleInputChange('nom', e.target.value)}
							required
						/>
					</Form.Control>
				</Form.Field>

				{/* Prénom */}
				<Form.Field className="mb-4 grid" name="prenom">
					<div className="flex items-baseline justify-between">
						<Form.Label className="text-sm font-medium text-orange-12">Prénom</Form.Label>
						<Form.Message className="text-xs text-red-500" match="valueMissing">
							Prénom requis
						</Form.Message>
					</div>
					<Form.Control asChild>
						<input
							className="w-full px-3 py-2 border border-orange-6 rounded-md bg-white text-orange-12 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent"
							type="text"
							value={formData.prenom}
							onChange={(e) => handleInputChange('prenom', e.target.value)}
							required
						/>
					</Form.Control>
				</Form.Field>

				{/* Email */}
				<Form.Field className="mb-4 grid" name="email">
					<div className="flex items-baseline justify-between">
						<Form.Label className="text-sm font-medium text-orange-12">Email</Form.Label>
						<Form.Message className="text-xs text-red-500" match="valueMissing">
							Email requis
						</Form.Message>
						<Form.Message className="text-xs text-red-500" match="typeMismatch">
							Email invalide
						</Form.Message>
					</div>
					<Form.Control asChild>
						<input
							className="w-full px-3 py-2 border border-orange-6 rounded-md bg-white text-orange-12 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent"
							type="email"
							value={formData.email}
							onChange={(e) => handleInputChange('email', e.target.value)}
							required
						/>
					</Form.Control>
				</Form.Field>
                </div>
				{/* Sujet */}
				<Form.Field className="mb-4 grid" name="sujet">
					<div className="flex items-baseline justify-between">
						<Form.Label className="text-sm font-medium text-orange-12">Sujet</Form.Label>
						<Form.Message className="text-xs text-red-500" match="valueMissing">
							Sujet requis
						</Form.Message>
					</div>
					<Form.Control asChild>
						<input
							className="w-full px-3 py-2 border border-orange-6 rounded-md bg-white text-orange-12 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent"
							type="text"
							value={formData.sujet}
							onChange={(e) => handleInputChange('sujet', e.target.value)}
							required
						/>
					</Form.Control>
				</Form.Field>

				{/* Message */}
				<Form.Field className="mb-4 grid" name="message">
					<div className="flex items-baseline justify-between">
						<Form.Label className="text-sm font-medium text-orange-12">Message</Form.Label>
						<Form.Message className="text-xs text-red-500" match="valueMissing">
							Message requis
						</Form.Message>
					</div>
					<Form.Control asChild>
						<textarea
							className="w-full px-3 py-2 border border-orange-6 rounded-md bg-white text-orange-12 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent resize-vertical min-h-[120px]"
							value={formData.message}
							onChange={(e) => handleInputChange('message', e.target.value)}
							required
						/>
					</Form.Control>
				</Form.Field>

				{/* Boutons */}
				<div className="flex gap-4 md:justify-between mt-6 ">
					<Form.Submit asChild>
						<Button size="lg" type="submit" className="bg-purple-9 hover:bg-purple-10 text-white">
							Envoyer
						</Button>
					</Form.Submit>
					<Button 
						size="lg" 
						type="button" 
						variant="outline" 
						className="border-orange-6 text-orange-12 hover:bg-orange-2"
						onClick={handleReset}
					>
						Réinitialiser
					</Button>
				</div>
			</Form.Root>
			</div>
		</section>
	)
}
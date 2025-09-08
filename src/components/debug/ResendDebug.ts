/**
 * Debug de l'envoi d'email avec Resend
 */
import { Resend } from 'resend'

const resend = new Resend(`${process.env.RESEND_API_KEY}`)

resend.emails.send({
	from: 'onboarding@resend.dev',
	to: `${process.env.RESEND_TO_EMAIL}`,
	subject: 'Hello World',
	html: `<p>Congrats on sending your <strong>first email</strong>!</p>`,
})

/**Cette proposition de code pour l'envoi d'email avec Resend plus complet.
 */
// api/send-email.js

const resend = new Resend('your-api-key')

export default async function handler(req, res) {
	const { name, email, message } = req.body

	try {
		const data = await resend.emails.send({
			from: 'noreply@votredomaine.com', // ← Header
			to: 'contact@votredomaine.com', // ← Header
			replyTo: email, // L'email de l'utilisateur du formulaire ← Header
			subject: `Message de ${prenom} ${nom}`, // ← Header
			html: `
        <h2>Nouveau message reçu</h2>
        <p><strong>Nom :</strong> ${prenom} ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `, // ← Body
		})

		res.status(200).json(data)
	} catch (error) {
		res.status(400).json(error)
	}
}

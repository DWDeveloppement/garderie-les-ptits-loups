import { NextResponse } from 'next/server'

export async function GET() {
	// Exposer uniquement la clé publique reCAPTCHA
	const siteKey = process.env.RECAPTCHA_SITE_KEY

	if (!siteKey) {
		return NextResponse.json({ error: 'reCAPTCHA non configuré' }, { status: 500 })
	}

	return NextResponse.json({ siteKey })
}

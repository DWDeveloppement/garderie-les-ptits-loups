/**
 * Route API pour la revalidation du cache Next.js
 * Appelée par le webhook Sanity lors de la publication d'un document
 */

import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Secret pour sécuriser le webhook (à définir dans les variables d'environnement)
const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET

export async function POST(request: NextRequest) {
	try {
		// Vérifier le secret
		const secret = request.nextUrl.searchParams.get('secret')

		if (secret !== REVALIDATE_SECRET) {
			return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
		}

		// Parser le body du webhook Sanity
		const body = await request.json()
		const { _type, slug } = body

		console.log(`[Revalidate] Type: ${_type}, Slug: ${slug?.current || 'N/A'}`)

		// Revalidation basée sur le type de document
		switch (_type) {
			case 'home':
				revalidatePath('/')
				break
			case 'aboutPage':
				revalidatePath('/a-propos')
				break
			case 'contactPage':
				revalidatePath('/contact')
				break
			case 'schedulePage':
				revalidatePath('/tarifs')
				break
			case 'legacyPage':
				revalidatePath('/mentions-legales')
				break
			case 'privatePolicyPage':
				revalidatePath('/politique-confidentialite')
				break
			case 'sectorPage':
				// Revalidate toutes les pages secteur
				revalidatePath('/la-structure/[slug]', 'page')
				if (slug?.current) {
					revalidatePath(`/la-structure/${slug.current}`)
				}
				break
			case 'spacePage':
				// Les espaces sont affichés dans les secteurs
				revalidatePath('/la-structure/[slug]', 'page')
				break
			case 'prices':
				revalidatePath('/tarifs')
				break
			case 'testimonials':
				// Témoignages sur la home
				revalidatePath('/')
				break
			case 'partners':
				// Partenaires sur toutes les pages (footer)
				revalidateTag('partners')
				revalidatePath('/', 'layout')
				break
			default:
				// Revalidate tout en cas de type inconnu
				revalidatePath('/', 'layout')
		}

		return NextResponse.json({
			revalidated: true,
			now: Date.now(),
			type: _type,
		})
	} catch (error) {
		console.error('[Revalidate] Error:', error)
		return NextResponse.json({ message: 'Error revalidating', error: String(error) }, { status: 500 })
	}
}

// Permettre GET pour tester le endpoint
export async function GET(request: NextRequest) {
	const secret = request.nextUrl.searchParams.get('secret')

	if (secret !== REVALIDATE_SECRET) {
		return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
	}

	return NextResponse.json({
		status: 'ok',
		message: 'Revalidation endpoint is working',
	})
}

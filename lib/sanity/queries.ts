import { client } from './client'

// ============================================================================
// REQUÊTES POUR LES TARIFS ET SUBVENTIONS
// ============================================================================

/**
 * Récupère tous les documents de tarifs
 */
export async function getPrices() {
	const query = `*[_type == "priceDocument"] {
    _id,
    _type,
    title,
    prixAuMois {
      label,
      journeeComplete {
        label,
        items[] {
          description,
          price
        }
      },
      matinRepas {
        label,
        items[] {
          description,
          price
        }
      },
      matinSansRepas {
        label,
        items[] {
          description,
          price
        }
      },
      apresMidiRepas {
        label,
        items[] {
          description,
          price
        }
      },
      apresMidiSansRepas {
        label,
        items[] {
          description,
          price
        }
      }
    },
    prixAuJour {
      label,
      journeeComplete {
        label,
        items[] {
          description,
          price
        }
      },
      matinee {
        label,
        items[] {
          description,
          price
        }
      },
      apresMidi {
        label,
        items[] {
          description,
          price
        }
      }
    }
  }`

	return await client.fetch(query)
}

/**
 * Récupère un document de tarifs par ID
 */
export async function getPriceById(id: string) {
	const query = `*[_type == "priceDocument" && _id == $id][0] {
    _id,
    _type,
    title,
    prixAuMois {
      label,
      journeeComplete {
        label,
        items[] {
          description,
          price
        }
      },
      matinRepas {
        label,
        items[] {
          description,
          price
        }
      },
      matinSansRepas {
        label,
        items[] {
          description,
          price
        }
      },
      apresMidiRepas {
        label,
        items[] {
          description,
          price
        }
      },
      apresMidiSansRepas {
        label,
        items[] {
          description,
          price
        }
      }
    },
    prixAuJour {
      label,
      journeeComplete {
        label,
        items[] {
          description,
          price
        }
      },
      matinee {
        label,
        items[] {
          description,
          price
        }
      },
      apresMidi {
        label,
        items[] {
          description,
          price
        }
      }
    }
  }`

	return await client.fetch(query, { id })
}

/**
 * Récupère tous les documents de subventions
 */
export async function getSubsidies() {
	const query = `*[_type == "subsidiesDocument"] {
    _id,
    _type,
    title,
    labelIncomeRange,
    labelReduction,
    items[] {
      incomeRange,
      reductionDaily
    }
  }`

	return await client.fetch(query)
}

/**
 * Récupère un document de subventions par ID
 */
export async function getSubsidiesById(id: string) {
	const query = `*[_type == "subsidiesDocument" && _id == $id][0] {
    _id,
    _type,
    title,
    labelIncomeRange,
    labelReduction,
    items[] {
      incomeRange,
      reductionDaily
    }
  }`

	return await client.fetch(query, { id })
}

// ============================================================================
// REQUÊTES POUR LE CONTENU GÉNÉRAL
// ============================================================================

/**
 * Récupère toutes les actualités
 */
export async function getNews() {
	const query = `*[_type == "news"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    featured
  }`

	return await client.fetch(query)
}

/**
 * Récupère une actualité par slug
 */
export async function getNewsBySlug(slug: string) {
	const query = `*[_type == "news" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    featured
  }`

	return await client.fetch(query, { slug })
}

/**
 * Récupère toutes les activités
 */
export async function getActivities() {
	const query = `*[_type == "activity"] | order(title asc) {
    _id,
    _type,
    title,
    description,
    ageGroup,
    duration,
    materials,
    photos
  }`

	return await client.fetch(query)
}

/**
 * Récupère une activité par ID
 */
export async function getActivityById(id: string) {
	const query = `*[_type == "activity" && _id == $id][0] {
    _id,
    _type,
    title,
    description,
    ageGroup,
    duration,
    materials,
    photos
  }`

	return await client.fetch(query, { id })
}

/**
 * Récupère tous les membres de l'équipe
 */
export async function getStaff() {
	const query = `*[_type == "staff"] | order(lastName asc, firstName asc) {
    _id,
    _type,
    firstName,
    lastName,
    role,
    photo,
    bio,
    qualifications
  }`

	return await client.fetch(query)
}

/**
 * Récupère un membre de l'équipe par ID
 */
export async function getStaffById(id: string) {
	const query = `*[_type == "staff" && _id == $id][0] {
    _id,
    _type,
    firstName,
    lastName,
    role,
    photo,
    bio,
    qualifications
  }`

	return await client.fetch(query, { id })
}

// ============================================================================
// REQUÊTES UTILITAIRES
// ============================================================================

/**
 * Récupère tous les documents d'un type donné
 */
export async function getDocumentsByType(type: string) {
	const query = `*[_type == $type] | order(_createdAt desc)`
	return await client.fetch(query, { type })
}

/**
 * Récupère le nombre de documents d'un type donné
 */
export async function getDocumentCount(type: string) {
	const query = `count(*[_type == $type])`
	return await client.fetch(query, { type })
}

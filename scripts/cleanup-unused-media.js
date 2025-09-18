/**
 * Script de nettoyage des médias non utilisés
 * À exécuter avec: node scripts/cleanup-unused-media.js
 */

const { createClient } = require('@sanity/client')

// Configuration Sanity
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // Token avec permissions de suppression
  apiVersion: '2023-01-01',
  useCdn: false
})

/**
 * Trouve tous les médias non utilisés
 */
async function findUnusedMedia() {
  console.log('🔍 Recherche des médias non utilisés...')
  
  // Récupérer tous les médias
  const allMedia = await client.fetch(`
    *[_type == "media"] {
      _id,
      title,
      asset
    }
  `)

  console.log(`📁 ${allMedia.length} médias trouvés`)

  const unusedMedia = []
  
  for (const media of allMedia) {
    // Vérifier les références
    const references = await client.fetch(`
      *[references($mediaId)] {
        _type,
        _id,
        title
      }
    `, { mediaId: media._id })

    if (references.length === 0) {
      unusedMedia.push({
        ...media,
        references: references
      })
    }
  }

  return unusedMedia
}

/**
 * Supprime les médias non utilisés
 */
async function deleteUnusedMedia(unusedMedia, dryRun = true) {
  if (unusedMedia.length === 0) {
    console.log('✅ Aucun média non utilisé trouvé')
    return
  }

  console.log(`🗑️  ${unusedMedia.length} médias non utilisés trouvés:`)
  
  unusedMedia.forEach((media, index) => {
    console.log(`${index + 1}. ${media.title || media._id}`)
  })

  if (dryRun) {
    console.log('\n🔍 Mode dry-run activé - aucun média ne sera supprimé')
    console.log('Pour supprimer réellement, exécutez avec --delete')
    return
  }

  console.log('\n⚠️  Suppression en cours...')
  
  for (const media of unusedMedia) {
    try {
      await client.delete(media._id)
      console.log(`✅ Supprimé: ${media.title || media._id}`)
    } catch (error) {
      console.error(`❌ Erreur lors de la suppression de ${media.title || media._id}:`, error.message)
    }
  }
}

/**
 * Trouve les médias sans alt text
 */
async function findMediaWithoutAlt() {
  console.log('🔍 Recherche des médias sans alt text...')
  
  const mediaWithoutAlt = await client.fetch(`
    *[_type == "media" && (!defined(alt) || alt == "" || alt == null)] {
      _id,
      title,
      asset
    }
  `)

  console.log(`📁 ${mediaWithoutAlt.length} médias sans alt text trouvés`)
  
  mediaWithoutAlt.forEach((media, index) => {
    console.log(`${index + 1}. ${media.title || media._id}`)
  })

  return mediaWithoutAlt
}

/**
 * Fonction principale
 */
async function main() {
  const args = process.argv.slice(2)
  const dryRun = !args.includes('--delete')
  const showAlt = args.includes('--alt')

  console.log('🚀 Script de nettoyage des médias Sanity')
  console.log(`Mode: ${dryRun ? 'dry-run' : 'suppression'}`)
  console.log('')

  try {
    if (showAlt) {
      await findMediaWithoutAlt()
    } else {
      const unusedMedia = await findUnusedMedia()
      await deleteUnusedMedia(unusedMedia, dryRun)
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message)
    process.exit(1)
  }
}

// Exécuter le script
if (require.main === module) {
  main()
}

module.exports = {
  findUnusedMedia,
  deleteUnusedMedia,
  findMediaWithoutAlt
}

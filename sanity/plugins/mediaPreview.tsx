/**
 * Composant de preview personnalisé pour les médias avec informations de référence
 */

import { Badge, Box, Card, Flex, Text } from '@sanity/ui'
import { PreviewProps } from 'sanity'

/**
 * Preview pour les documents media avec compteur de références
 */
export function MediaPreviewWithReferences(props: PreviewProps) {
  const { title, media, subtitle } = props
  
  return (
    <Card padding={2}>
      <Flex align="center" gap={2}>
        {media && (
          <Box style={{ width: 40, height: 40, borderRadius: 4, overflow: 'hidden' }}>
            <img 
              src={media} 
              alt={title as string || 'Media preview'} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}
        
        <Box flex={1}>
          <Text size={1} weight="medium">
            {title || 'Sans titre'}
          </Text>
          {subtitle && (
            <Text size={0} muted>
              {subtitle}
            </Text>
          )}
        </Box>
        
        {/* Badge pour indiquer le type de média */}
        <Badge tone="primary" size={0}>
          Média
        </Badge>
      </Flex>
    </Card>
  )
}

/**
 * Preview pour les champs image avec informations de référence
 */
export function ImageFieldPreview(props: PreviewProps) {
  const { title, media, subtitle } = props
  
  return (
    <Card padding={2}>
      <Flex align="center" gap={2}>
        {media && (
          <Box style={{ width: 32, height: 32, borderRadius: 4, overflow: 'hidden' }}>
            <img 
              src={media} 
              alt={title as string || 'Image preview'} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}
        
        <Box flex={1}>
          <Text size={0} weight="medium">
            {title || 'Image'}
          </Text>
          {subtitle && (
            <Text size={0} muted>
              {subtitle}
            </Text>
          )}
        </Box>
      </Flex>
    </Card>
  )
}

/**
 * Fonction pour préparer les données de preview avec compteur de références
 */
export async function prepareMediaPreview(value: any, client: any) {
  if (!value?.asset?._ref) {
    return {
      title: 'Aucun média sélectionné',
      subtitle: 'Sélectionnez un média dans la médiathèque',
      media: null
    }
  }

  try {
    const mediaId = value.asset._ref.replace('image-', '').replace('file-', '')
    
    // Récupérer les informations du média
    const media = await client.fetch(`
      *[_id == $mediaId][0] {
        _id,
        title,
        asset,
        alt,
        caption,
        credit
      }
    `, { mediaId })

    if (!media) {
      return {
        title: 'Média introuvable',
        subtitle: 'Le média référencé n\'existe plus',
        media: null
      }
    }

    // Compter les références
    const references = await client.fetch(`
      *[references($mediaId)] {
        _type,
        _id
      }
    `, { mediaId })

    const referenceCount = references.length
    const referenceText = referenceCount === 0 
      ? 'Non utilisé' 
      : `${referenceCount} référence${referenceCount > 1 ? 's' : ''}`

    return {
      title: media.title || 'Sans titre',
      subtitle: `${referenceText} • ${media.alt ? 'Alt: ' + media.alt : 'Pas d\'alt text'}`,
      media: media.asset?.url
    }
  } catch (error) {
    console.error('Erreur lors de la préparation du preview:', error)
    return {
      title: 'Erreur de chargement',
      subtitle: 'Impossible de charger les informations du média',
      media: null
    }
  }
}

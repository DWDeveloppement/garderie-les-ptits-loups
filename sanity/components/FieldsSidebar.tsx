// Composant Sidebar fixe pour les fields des pages
import { Badge, Card, Stack, Text } from '@sanity/ui'
import React from 'react'

interface FieldInfo {
  name: string
  type: string
  title: string
  description?: string
}

interface FieldsSidebarProps {
  fields?: FieldInfo[]
}

export const FieldsSidebar: React.FC<FieldsSidebarProps> = ({ fields = [] }) => {
  // Champs par défaut pour la home page
  const defaultFields: FieldInfo[] = [
    { name: 'title', type: 'string', title: 'Titre', description: 'Titre de la page' },
    { name: 'sectionHero', type: 'hero', title: 'Section Hero', description: 'Composant hero avec image et texte' },
    { name: 'sections', type: 'array', title: 'Sections', description: 'Contenu flexible avec drag & drop' },
    { name: 'sectionStructure', type: 'spacesComponent', title: 'Structure', description: 'Section des espaces' },
    { name: 'seo', type: 'seo', title: 'SEO', description: 'Métadonnées pour le référencement' },
  ]

  const fieldsToShow = fields.length > 0 ? fields : defaultFields

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: '320px',
        height: '100vh',
        background: '#f8f9fa',
        borderLeft: '1px solid #e1e5e9',
        padding: '20px',
        overflow: 'auto',
        zIndex: 1000,
        boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
      }}
    >
      <Stack space={4}>
        <Text size={3} weight="bold" style={{ color: '#1a1a1a' }}>
          📋 Fields disponibles
        </Text>
        
        <Text size={1} style={{ color: '#666', marginBottom: '16px' }}>
          Champs disponibles pour cette page
        </Text>

        {fieldsToShow.map((field, index) => (
          <Card key={index} padding={3} style={{ background: 'white', borderRadius: '8px' }}>
            <Stack space={2}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text size={2} weight="medium" style={{ color: '#1a1a1a' }}>
                  {field.title}
                </Text>
                <Badge tone="primary" style={{ fontSize: '11px' }}>
                  {field.type}
                </Badge>
              </div>
              
              <Text size={1} style={{ color: '#666' }}>
                <strong>Nom:</strong> {field.name}
              </Text>
              
              {field.description && (
                <Text size={1} style={{ color: '#888' }}>
                  {field.description}
                </Text>
              )}
            </Stack>
          </Card>
        ))}

        <Card padding={3} style={{ background: '#e8f4fd', borderRadius: '8px', marginTop: '20px' }}>
          <Stack space={2}>
            <Text size={2} weight="medium" style={{ color: '#0066cc' }}>
              💡 Astuce
            </Text>
            <Text size={1} style={{ color: '#0066cc' }}>
              Utilisez le drag & drop pour réorganiser les sections dans le contenu principal.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </div>
  )
}

export default FieldsSidebar

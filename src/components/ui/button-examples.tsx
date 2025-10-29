/**
 * Exemples d'utilisation du composant Button avec les nouvelles props
 * 
 * Ce fichier montre comment utiliser le composant Button avec les différents types de rendu :
 * - Bouton par défaut
 * - Lien externe (asLink)
 * - Lien Next.js (asNextLink)
 */

import { Copy, ExternalLink, Home, Mail } from 'lucide-react'
import { Button } from './button'

export function ButtonExamples() {
  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold">Exemples d&apos;utilisation du composant Button</h2>
      
      {/* Boutons par défaut */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Boutons par défaut</h3>
        <div className="flex gap-4">
          <Button variant="primary" size="md">
            Bouton principal
          </Button>
          <Button variant="secondary" size="md">
            Bouton secondaire
          </Button>
          <Button variant="outline" size="md">
            Bouton outline
          </Button>
        </div>
      </section>

      {/* Liens externes avec asLink */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Liens externes (asLink)</h3>
        <div className="flex gap-4">
          <Button
            asLink
            href="https://www.google.com"
            variant="primary"
            size="md"
            ariaLabel="Ouvrir Google dans un nouvel onglet"
            external
          >
            <ExternalLink className="size-4" aria-hidden />
            Google
          </Button>
          
          <Button
            asLink
            href="mailto:contact@example.com"
            variant="secondary"
            size="md"
            ariaLabel="Envoyer un email à contact@example.com"
          >
            <Mail className="size-4" aria-hidden />
            Email
          </Button>
        </div>
      </section>

      {/* Liens Next.js avec asNextLink */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Liens Next.js (asNextLink)</h3>
        <div className="flex gap-4">
          <Button
            asNextLink
            href="/about"
            variant="primary"
            size="md"
            ariaLabel="Aller à la page À propos"
          >
            <Home className="size-4" aria-hidden />
            À propos
          </Button>
          
          <Button
            asNextLink
            href="/contact"
            variant="outline"
            size="md"
            ariaLabel="Aller à la page Contact"
          >
            Contact
          </Button>
        </div>
      </section>

      {/* Boutons avec états */}
      <section>
        <h3 className="text-lg font-semibold mb-4">États spéciaux</h3>
        <div className="flex gap-4">
          <Button
            variant="primary"
            size="md"
            loading
            ariaLabel="Chargement en cours"
          >
            Chargement
          </Button>
          
          <Button
            variant="primary"
            size="md"
            state="success"
            ariaLabel="Action réussie"
          >
            <Copy className="size-4" aria-hidden />
            Succès
          </Button>
          
          <Button
            variant="primary"
            size="md"
            state="error"
            ariaLabel="Erreur"
          >
            Erreur
          </Button>
        </div>
      </section>
    </div>
  )
}

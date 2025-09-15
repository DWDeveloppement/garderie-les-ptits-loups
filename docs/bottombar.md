# 📱 Amélioration de la Bottom Bar Mobile – Capriati

## 🔑 Principes UX pour une bottom bar
- **Nombre d’actions limité** : 3 à 5 maximum.
- **Cohérence visuelle** : icônes centrées et espacées de manière régulière.
- **Labels explicites** : icône + texte sous l’icône pour éviter toute ambiguïté.
- **Accessibilité** :
  - Zone tactile ≥ 44×44 px.
  - Contraste suffisant (visible au soleil).
  - Attributs ARIA (`aria-label`, `role="button"`).
- **Feedback utilisateur** : changement de couleur ou animation au tap.
- **Comportement dynamique** :
  - Barre fixe en bas.
  - Option : la barre se cache au scroll vers le bas, réapparaît vers le haut.

---

## 🎯 Suggestions spécifiques pour Capriati
1. **Réduire à 3 actions principales**, centrées :
   - 📞 Appeler  
   - ✉️ Écrire  
   - 🗺️ Itinéraire  

2. **Déplacer “Back to top”** en bouton flottant (apparition après un certain scroll, en bas à droite).

3. **Améliorer l’UX visuelle** :
   - Icône + label (`Appeler`, `Écrire`, `Itinéraire`).  
   - Animation de feedback au tap.  
   - Vérification du contraste et lisibilité.

---

## 🚀 Exemple de code avec Tailwind CSS

### Bottom Bar
```tsx
export default function BottomBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md">
      <ul className="flex justify-around py-2 text-sm">
        <li>
          <a
            href="tel:+41212223344"
            className="flex flex-col items-center text-gray-700 hover:text-violet-600"
            aria-label="Appeler"
          >
            <svg className="w-6 h-6 mb-1" /* Icône téléphone */ />
            Appeler
          </a>
        </li>
        <li>
          <a
            href="mailto:info@capriati.ch"
            className="flex flex-col items-center text-gray-700 hover:text-violet-600"
            aria-label="Écrire un mail"
          >
            <svg className="w-6 h-6 mb-1" /* Icône mail */ />
            Écrire
          </a>
        </li>
        <li>
          <a
            href="https://maps.google.com/?q=Capriati"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-gray-700 hover:text-violet-600"
            aria-label="Itinéraire"
          >
            <svg className="w-6 h-6 mb-1" /* Icône map */ />
            Itinéraire
          </a>
        </li>
      </ul>
    </nav>
  )
}
```

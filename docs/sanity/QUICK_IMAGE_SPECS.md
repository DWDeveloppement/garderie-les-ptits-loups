# 📸 Export images - Référence rapide

> Aide-mémoire pour exporter correctement les images.

---

## 🎯 Règle simple

**Exporter en largeur correcte, hauteur automatique, WebP 85%**

---

## 📏 Largeurs à utiliser

```
┌─────────────────────────────────────────────────┐
│  HERO / PARALLAX (pleine largeur)              │
│  → 2400px de large                              │
│  → Hauteur auto (proportions conservées)       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  GALERIE - Photo horizontale                    │
│  → 1600px de large                              │
│  → Hauteur auto                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  GALERIE - Photo verticale                      │
│  → 1200px de large                              │
│  → Hauteur auto                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  GALERIE - Photo carrée                         │
│  → 1600px de large (= 1600px de haut)          │
│  → Proportions conservées                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  RÉSEAUX SOCIAUX                                │
│  → 1200px × 630px (FIXE)                       │
│  → NE PAS conserver proportions                 │
└─────────────────────────────────────────────────┘
```

---

## ⚙️ Réglages Photoshop

### Redimensionner
```
Image → Taille de l'image
☑️ Conserver les proportions (sauf réseaux sociaux)
Résolution : 72 dpi
```

### Exporter
```
Fichier → Enregistrer pour le web
Format : WebP
Qualité : 85%
```

---

## ✅ Checklist export

- [ ] Largeur correcte selon type
- [ ] Proportions conservées (☑️ cadenas)
- [ ] Résolution 72 dpi
- [ ] Format WebP
- [ ] Qualité 85%
- [ ] Poids < 500 KB

---

## 💡 En un coup d'œil

| Quoi ? | Largeur | Proportions ? |
|--------|---------|---------------|
| Image principale | 2400px | ✅ Oui |
| Photo paysage | 1600px | ✅ Oui |
| Photo portrait | 1200px | ✅ Oui |
| Photo carrée | 1600px | ✅ Oui |
| Facebook/Twitter | 1200×630px | ❌ Non |

---

## 🚫 Erreurs courantes

| ❌ Erreur | ✅ Solution |
|-----------|-------------|
| Export trop large (3000px+) | Max 2400px |
| Qualité 100% | Qualité 85% |
| Fichier PNG lourd | WebP ou JPEG |
| Proportions étirées | Cocher cadenas |

---

**Guide complet client :** `/docs/client/GUIDE_EXPORT_IMAGES.md`

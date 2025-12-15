# 📸 Guide d'export des images - Simple

> Guide pratique pour exporter vos images depuis Photoshop avant de les uploader dans Sanity.

---

## 🎯 La règle simple

**Exporter en WebP avec la bonne largeur, la hauteur s'adapte automatiquement.**

---

## 📏 Quelle largeur utiliser ?

### Images pleine largeur (Hero, Parallax)
```
Largeur : 2400px
Hauteur : Automatique (conserve les proportions)
```
**Utilisé pour :**
- Image principale en haut de page
- Grandes images décoratives

### Images de galerie horizontales (paysage)
```
Largeur : 1600px
Hauteur : Automatique
```
**Utilisé pour :**
- Photos d'activités
- Vues de salles
- Photos de groupe

### Images de galerie verticales (portrait)
```
Largeur : 1200px
Hauteur : Automatique
```
**Utilisé pour :**
- Portraits d'enfants
- Photos en hauteur

### Images de galerie carrées
```
Largeur : 1600px
Hauteur : Automatique (sera 1600px aussi)
```
**Utilisé pour :**
- Photos carrées Instagram-style

### Images pour réseaux sociaux (Facebook, etc.)
```
Largeur : 1200px
Hauteur : 630px (FIXE, ne pas conserver proportions)
```
**Utilisé pour :**
- Partages sur réseaux sociaux uniquement

---

## ⚙️ Comment exporter depuis Photoshop ?

### Étape 1 : Redimensionner l'image

1. **Image → Taille de l'image**
2. Cocher ☑️ **"Conserver les proportions"** (cadenas)
3. Entrer la **largeur** selon le tableau ci-dessus
4. La hauteur s'ajuste automatiquement
5. **Résolution : 72 pixels/pouce**
6. Cliquer sur **OK**

### Étape 2 : Exporter en WebP

1. **Fichier → Exporter → Enregistrer pour le web (hérité)**
2. Format : **WebP**
3. Qualité : **85%** (ou utiliser le curseur)
4. Cliquer sur **Enregistrer**

> **Note :** Si WebP n'est pas disponible dans votre version de Photoshop, exportez en **JPEG qualité 85%** et convertissez ensuite sur https://squoosh.app/

---

## ✅ Récapitulatif rapide

| Type d'image | Largeur à exporter | Proportions |
|--------------|-------------------|-------------|
| **Hero / Parallax** | 2400px | ✅ Conserver |
| **Galerie paysage** | 1600px | ✅ Conserver |
| **Galerie portrait** | 1200px | ✅ Conserver |
| **Galerie carré** | 1600px | ✅ Conserver |
| **Réseaux sociaux** | 1200px × 630px | ❌ Fixer manuellement |

---

## 💡 Conseils pratiques

### ✅ À faire
- Toujours cocher "Conserver les proportions" (sauf réseaux sociaux)
- Utiliser WebP si possible
- Qualité 85% = bon compromis qualité/poids
- Nommer vos fichiers clairement : `hero-accueil.webp`, `galerie-jardin-01.webp`

### ❌ À éviter
- Exporter en très haute résolution (3000px+) = fichiers trop lourds
- Qualité 100% = fichiers trop lourds sans différence visible
- PNG pour les photos = fichiers beaucoup trop lourds

---

## 🔢 Exemples concrets

### Exemple 1 : Photo de jardin horizontale pour la galerie
```
1. Image → Taille de l'image
2. ☑️ Conserver les proportions
3. Largeur : 1600px
4. Hauteur : (automatique, par ex. 1067px si 3:2)
5. Résolution : 72
6. Exporter en WebP 85%
```

### Exemple 2 : Portrait d'enfant pour la galerie
```
1. Image → Taille de l'image
2. ☑️ Conserver les proportions
3. Largeur : 1200px
4. Hauteur : (automatique, par ex. 1800px si 2:3)
5. Résolution : 72
6. Exporter en WebP 85%
```

### Exemple 3 : Image principale page d'accueil
```
1. Image → Taille de l'image
2. ☑️ Conserver les proportions
3. Largeur : 2400px
4. Hauteur : (automatique, par ex. 1350px si 16:9)
5. Résolution : 72
6. Exporter en WebP 85%
```

---

## 🆘 Problèmes fréquents

### "Mon fichier est trop lourd (plus de 1 MB)"
→ Diminuez la qualité à 80% ou réduisez la largeur

### "Je n'ai pas WebP dans Photoshop"
→ Exportez en JPEG 85% puis convertissez sur https://squoosh.app/

### "L'image est floue sur le site"
→ Vérifiez que la largeur exportée est au moins celle recommandée

---

## 📊 Poids des fichiers attendus

Après export avec les bonnes dimensions :

| Type | Poids approximatif |
|------|-------------------|
| Hero 2400px | 300-500 KB |
| Galerie paysage 1600px | 150-300 KB |
| Galerie portrait 1200px | 150-300 KB |
| Réseaux sociaux 1200px | 100-200 KB |

Si vos fichiers sont beaucoup plus lourds, réduisez la qualité.

---

**En cas de doute, utilisez ces valeurs par défaut :**
- Photos horizontales : **1600px de large**
- Photos verticales : **1200px de large**
- Images principales : **2400px de large**
- Toujours en **WebP qualité 85%**

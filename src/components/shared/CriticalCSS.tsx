/**
 * Composant pour injecter le CSS critique dans le <head>
 * Ce CSS est nécessaire pour le First Contentful Paint (FCP)
 * et évite le blocage du rendu initial
 *
 * Inclut uniquement les variables et styles critiques pour le rendu initial :
 * - Variables de couleurs de base (purple-2, purple-10, orange-11)
 * - Variables de fonts
 * - Styles de base pour body et headings
 */

export function CriticalCSS() {
	return (
		<style
			dangerouslySetInnerHTML={{
				__html: `
/* Variables CSS critiques - Couleurs de base nécessaires pour le rendu initial */
:root {
	/* Couleurs Purple critiques */
	--purple-1: oklch(0.993 0.0039 324.9);
	--purple-2: oklch(0.983 0.0075 324.9);
	--purple-6: oklch(0.86 0.0589 324.9);
	--purple-9: oklch(0.511 0.1407 324.9);
	--purple-10: oklch(0.462 0.1407 324.9);
	
	/* Couleurs Orange critiques */
	--orange-11: oklch(0.498 0.1408 66.57);
	
	/* Variables de base */
	--radius: 0.625rem;
	--background: var(--purple-2);
	--foreground: var(--orange-11);
	
	/* Variables de fonts (définies par next/font) */
	--font-sans: var(--font-open-sans), Arial, sans-serif;
	--font-display: var(--font-chelsea-market), cursive;
	
	/* Variables critiques pour le rendu initial */
	--primary: var(--purple-9);
	--primary-foreground: var(--purple-1);
	--border: var(--purple-6);
}

/* Styles de base critiques - Nécessaires pour le FCP */
body {
	font-family: var(--font-sans);
	background-color: var(--background);
	color: var(--foreground);
		margin: 0;
	/* Ne pas forcer padding: 0 ici - laisser Tailwind gérer les paddings via les classes */
}

h1, h2, h3, h4, h5, h6 {
	font-family: var(--font-display);
	/* Ne pas forcer margin: 0 ici - laisser Tailwind gérer les marges via les classes */
}

/* Prévention du FOUC (Flash of Unstyled Content) */
html {
	background-color: var(--background);
}
`,
			}}
		/>
	)
}

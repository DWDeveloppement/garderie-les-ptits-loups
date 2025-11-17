/**
 * Composant pour injecter le CSS critique dans le <head>
 * Ce CSS est nécessaire pour le First Contentful Paint (FCP)
 * et évite le blocage du rendu initial
 *
 * Inclut uniquement les variables de fonts et typography fluide
 */

export function CriticalCSS() {
	return (
		<style
			dangerouslySetInnerHTML={{
				__html: `
/* Variables de fonts (définies par next/font) */
:root {
	--font-sans: var(--font-open-sans), Arial, sans-serif;
	--font-display: var(--font-chelsea-market), cursive;
	
	/* Variables fluid typography critiques */
	--fl-text-base: clamp(1.125rem, 1.0341rem + 0.4545vw, 1.375rem);
	--fl-text-lg: clamp(1.35rem, 1.1744rem + 0.878vw, 1.8329rem);
	--fl-text-xl: clamp(1.62rem, 1.3206rem + 1.4968vw, 2.4432rem);
	--fl-text-2xl: clamp(1.944rem, 1.4666rem + 2.3869vw, 3.2568rem);
	--fl-text-3xl: clamp(2.3328rem, 1.6024rem + 3.6519vw, 4.3413rem);
	--fl-text-4xl: clamp(2.7994rem, 1.7129rem + 5.4321vw, 5.787rem);
}
`,
			}}
		/>
	)
}

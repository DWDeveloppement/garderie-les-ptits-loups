// Exemples d'utilisation du système de breakpoints
import { useBreakpoint } from '@/hooks/useWindowSize'

export function ExampleBreakpointUsage() {
	const { 
		currentBreakpoint,
		isMobile, 
		isTablet, 
		isDesktop, 
		isSmallScreen,
		isBreakpoint,
		isBelowBreakpoint,
		isAboveBreakpoint 
	} = useBreakpoint()

	return (
		<div>
			{/* Affichage conditionnel basé sur les breakpoints */}
			{isMobile && <div>Contenu mobile uniquement</div>}
			{isTablet && <div>Contenu tablet uniquement</div>}
			{isDesktop && <div>Contenu desktop uniquement</div>}
			
			{/* Affichage conditionnel avec breakpoints spécifiques */}
			{isBreakpoint('lg') && <div>Large desktop et plus</div>}
			{isBelowBreakpoint('md') && <div>Mobile et petit tablet</div>}
			{isAboveBreakpoint('xl') && <div>Très large écran</div>}
			
			{/* Affichage du breakpoint actuel */}
			<div>Breakpoint actuel: {currentBreakpoint}</div>
			
			{/* Logique complexe */}
			{isSmallScreen ? (
				<div>Layout mobile/tablet</div>
			) : (
				<div>Layout desktop</div>
			)}
		</div>
	)
}

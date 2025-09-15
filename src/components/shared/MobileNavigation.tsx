'use client'

import { useWindowSize } from '@/hooks/useWindowSize'
import type { MapLocation } from '@/types/map'
import { BackToTop } from './BackToTop'
import { BottomBarWithAutoHide } from './BottomBarWithAutoHide'

type MobileNavigationProps = {
  location?: MapLocation
  phoneNumber?: string
  email?: string
  autoHide?: boolean
  showBackToTop?: boolean
}

export function MobileNavigation({ 
  location,
  phoneNumber,
  email,
  autoHide = true,
  showBackToTop = true
}: MobileNavigationProps) {
  const { width } = useWindowSize()
  const isMobile = width < 768 // md breakpoint

  // Ne pas afficher sur desktop
  if (!isMobile) {
    return showBackToTop ? <BackToTop /> : null
  }

  return (
    <>
      {/* Barre inférieure mobile */}
      <BottomBarWithAutoHide 
        location={location}
        phoneNumber={phoneNumber}
        email={email}
      />
      
      {/* Bouton retour en haut */}
      {showBackToTop && <BackToTop />}
    </>
  )
}

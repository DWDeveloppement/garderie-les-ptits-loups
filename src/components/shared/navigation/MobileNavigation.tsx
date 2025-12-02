'use client'

import { useWindowSize } from '@/hooks'
import type { MapLocation } from '@/types/map'
import { BackToTop } from './BackToTop'
import { BottomBar } from './BottomBar'

type MobileNavigationProps = {
  location?: MapLocation
  phoneNumber?: string
  email?: string
  showBackToTop?: boolean
}

export function MobileNavigation({ 
  location,
  phoneNumber,
  email,
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
      <BottomBar 
        location={location}
        phoneNumber={phoneNumber}
        email={email}
      />
      
      {/* Bouton retour en haut */}
      {showBackToTop && <BackToTop />}
    </>
  )
}

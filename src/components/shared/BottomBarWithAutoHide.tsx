'use client'

import { useScrollDirection } from '@/hooks/useScroll'
import type { MapLocation } from '@/types/map'
import { BottomBar } from './BottomBar'

type BottomBarProps = {
  location?: MapLocation
  phoneNumber?: string
  email?: string
  className?: string
}

export function BottomBarWithAutoHide(props: BottomBarProps) {
  const dir = useScrollDirection(8)
  
  return (
    <div
      className={
        "transition-transform duration-300 will-change-transform " +
        (dir === "down" ? "translate-y-full" : "translate-y-0")
      }
    >
      <BottomBar {...props} />
    </div>
  )
}

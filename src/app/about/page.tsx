"use client"
// Page About - Garderie Les P'tits Loups
import { QueriesLog, useQueriesLog } from '@/components/debug/QueriesLog'
import {
  AboutIntroSection,
  HeroAboutSection,
  HistorySection,
  PedagogySection,
  TeamSection,
  ValuesSection
} from "@/components/pages/about"
import { ParalaxImage } from "@/components/ParalaxImage"

export default function AboutPage() {
  const { queries, logQuery, clearLogs } = useQueriesLog()
  return (
    <div className="min-h-screen">
      <HeroAboutSection />
      <AboutIntroSection />
      <ParalaxImage />
      <HistorySection />
      <ParalaxImage />
      <TeamSection />
      <ValuesSection />
      <PedagogySection />
      <QueriesLog queries={queries} isEnabled={true} />
    </div>
  )
}

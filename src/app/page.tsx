"use client";

import { QueriesLog, useQueriesLog } from "@/components/debug/QueriesLog"
import { HeroSection } from "@/components/pages/home/HeroSection"
import { SpacesSection } from "@/components/pages/home/SpacesSection"
import { StructureSection } from "@/components/pages/home/StructureSection"
import { TestimonialsSection } from "@/components/pages/home/Testimonals"
import { ParalaxImage } from "@/components/ParalaxImage"

export default function Home() {
  const { queries, logQuery, clearLogs } = useQueriesLog()
  return (
    <div className="min-h-screen">
        <HeroSection />
        <StructureSection />
      <SpacesSection />
      <ParalaxImage />
      <TestimonialsSection />
      <QueriesLog queries={queries} isEnabled={true} />
    </div>
  );
}

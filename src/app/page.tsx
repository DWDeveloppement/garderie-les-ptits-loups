"use client";

import { HeroSection } from "@/components/pages/home/HeroSection"
import { SpacesSection } from "@/components/pages/home/SpacesSection"
import { StructureSection } from "@/components/pages/home/StructureSection"
import { TestimonialsSection } from "@/components/pages/home/Testimonals"
import { ParalaxImage } from "@/components/shared"

export default function Home() {
  return (
    <div className="min-h-screen">
        <HeroSection />
        <StructureSection />
      <SpacesSection />
      <ParalaxImage />
      <TestimonialsSection />
    </div>
  );
}

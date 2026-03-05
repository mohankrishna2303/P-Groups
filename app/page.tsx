"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MarqueeBanner } from "@/components/marquee-banner"
import { PropertiesSection } from "@/components/properties-section"
import { AboutSection } from "@/components/about-section"
import { SpecificationsSection } from "@/components/specifications-section"
import { TeamSection } from "@/components/team-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <PropertiesSection />
      <AboutSection />
      <SpecificationsSection />
      <TeamSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}

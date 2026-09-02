import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { IndustriesSection } from "@/components/landing/industries-section";
import { SecuritySection } from "@/components/landing/security-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { ServicesSection } from "@/components/landing/services-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <MetricsSection />
      <ServicesSection />
      <SecuritySection />
<InfrastructureSection />
       <IndustriesSection />
       <DevelopersSection />
      <TestimonialsSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}

import { BgGradient } from "@/components/_common/BgGradient";
import { CTASection } from "@/components/home/CTASection";
import { DemoSection } from "@/components/home/DemoSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorkSection } from "@/components/home/HowItWorkSection";
import { PricingSection } from "@/components/home/PricingSection";

export default function Home() {
  return (
    <div className="relative w-full">
      {/* Bg Gradient */}
      <BgGradient />

      <div className="flex flex-col">
        {/* Hero Section */}
        <HeroSection />

        {/* Demo Section */}
        <DemoSection />

        {/* How it works section */}
        <HowItWorkSection />

        {/* pricing */}
        {/* <PricingSection /> */}

        {/* CTASection */}
        <CTASection />
      </div>
    </div>
  );
}

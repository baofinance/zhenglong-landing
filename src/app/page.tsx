"use client";
import { geo } from "@/utils/fonts";

// Import all new components
import Header from "@/components/Header";
import SteamBackground from "@/components/SteamBackground";
import IdoBanner from "@/components/IdoBanner";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StabilityPoolsSection from "@/components/StabilityPoolsSection";
import SteamTokenSection from "@/components/SteamTokenSection";
import BoosterProgramSection from "@/components/BoosterProgramSection";
import UseCasesSection from "@/components/UseCasesSection";
import BuildMarketSection from "@/components/BuildMarketSection";
import SecuritySection from "@/components/SecuritySection";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-black text-[#F5F5F5] font-sans relative">
        <SteamBackground />
        <Header geoClassName={geo.className} page="landing" />

        {/* Main Content */}
        <main className="relative z-10 pt-16">
          <IdoBanner />
          <HeroSection />
          <FeaturesSection />
          <StabilityPoolsSection />
          <SteamTokenSection />
          <BoosterProgramSection />
          <UseCasesSection />
          <BuildMarketSection />
          <SecuritySection />
        </main>
      </div>
    </>
  );
}

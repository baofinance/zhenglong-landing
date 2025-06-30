"use client";

// Import all components
import Header from "@/components/Header";
import SteamBackground from "@/components/SteamBackground";
import NotificationWrapper from "@/components/NotificationWrapper";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import UseCasesSection from "@/components/UseCasesSection";
import ThreeTokenSection from "@/components/ThreeTokenSection";
import SecuritySection from "@/components/SecuritySection";
import StabilityPoolsSection from "@/components/StabilityPoolsSection";
import SteamTokenSection from "@/components/SteamTokenSection";
import BuildMarketSection from "@/components/BuildMarketSection";
import BoosterProgramSection from "@/components/BoosterProgramSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <NotificationWrapper />
      <Header page="landing" />
      <SteamBackground />
      <HeroSection />
      <FeaturesSection />
      <ThreeTokenSection />
      <StabilityPoolsSection />
      <SteamTokenSection />
      <UseCasesSection />
      <SecuritySection />
      <BuildMarketSection />
      <BoosterProgramSection />
      <Footer />
    </main>
  );
}

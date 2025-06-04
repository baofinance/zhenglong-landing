"use client";
import Link from "next/link";
import ComingSoonOverlay from "./ComingSoonOverlay";
import { geo } from "@/utils/fonts";

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-[80vh] overflow-hidden pt-8 bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1A1A1A]/90 to-black"></div>

        {/* Hero Steam Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large base squares */}
          <div className="absolute top-[15%] left-[20%] w-[600px] h-[400px] bg-[#4A7C59]/[0.06]"></div>
          <div className="absolute top-[25%] right-[15%] w-[500px] h-[450px] bg-[#4A7C59]/[0.05]"></div>
          <div className="absolute top-[20%] left-[35%] w-[400px] h-[300px] bg-[#4A7C59]/[0.07]"></div>

          {/* Medium squares - Layer 1 */}
          <div className="absolute top-[22%] left-[10%] w-[300px] h-[250px] bg-[#4A7C59]/[0.04] animate-float-1"></div>
          <div className="absolute top-[28%] right-[25%] w-[280px] h-[320px] bg-[#4A7C59]/[0.045] animate-float-2"></div>
          <div className="absolute top-[35%] left-[40%] w-[350px] h-[280px] bg-[#4A7C59]/[0.055] animate-float-3"></div>

          {/* Medium squares - Layer 2 */}
          <div className="absolute top-[30%] left-[28%] w-[250px] h-[200px] bg-[#4A7C59]/[0.065] animate-float-4"></div>
          <div className="absolute top-[25%] right-[30%] w-[220px] h-[180px] bg-[#4A7C59]/[0.05] animate-float-1"></div>
          <div className="absolute top-[40%] left-[15%] w-[280px] h-[240px] bg-[#4A7C59]/[0.06] animate-float-2"></div>

          {/* Small pixel squares */}
          <div className="absolute top-[20%] left-[45%] w-[120px] h-[120px] bg-[#4A7C59]/[0.075] animate-steam-1"></div>
          <div className="absolute top-[35%] right-[40%] w-[150px] h-[150px] bg-[#4A7C59]/[0.07] animate-steam-2"></div>
          <div className="absolute top-[30%] left-[25%] w-[100px] h-[100px] bg-[#4A7C59]/[0.08] animate-steam-3"></div>
          <div className="absolute top-[25%] right-[20%] w-[80px] h-[80px] bg-[#4A7C59]/[0.065] animate-steam-1"></div>
          <div className="absolute top-[45%] left-[30%] w-[90px] h-[90px] bg-[#4A7C59]/[0.075] animate-steam-2"></div>
          <div className="absolute top-[38%] right-[35%] w-[110px] h-[110px] bg-[#4A7C59]/[0.07] animate-steam-3"></div>
        </div>
      </div>

      {/* Content */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center pt-40">
          <h1
            className={`text-7xl md:text-8xl font-normal mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#4A7C59] to-[#6B9E76] tracking-[0.2em] uppercase ${geo.className}`}
          >
            ZHENGLONG
          </h1>
          <p className="text-xl md:text-2xl text-[#F5F5F5]/80 mb-8 tracking-wider font-light">
            Freshly steamed protected leverage tokens, paired with
            high-yield pegged stability.
          </p>
          <div className="flex justify-center gap-6">
            <ComingSoonOverlay>
              <button
                className={`bg-[#4A7C59]/50 text-[#F5F5F5]/50 px-8 py-3 tracking-wider uppercase text-lg cursor-not-allowed ${geo.className}`}
              >
                Get Started
              </button>
            </ComingSoonOverlay>
            <Link
              href="https://docs.zhenglong.finance"
              target="_blank"
              rel="noopener noreferrer"
              className={`border border-[#4A7C59] text-[#F5F5F5] hover:bg-[#4A7C59]/20 px-8 py-3 tracking-wider uppercase text-lg transition-colors ${geo.className}`}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection; 
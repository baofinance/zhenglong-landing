"use client";
import Image from "next/image";
import { Geo } from "next/font/google";
import TokenList from "../components/TokenList";
import Link from "next/link";
import { useState } from "react";

const geo = Geo({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Coming Soon Component
const ComingSoonOverlay = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <span
          className={`text-[#4A7C59] ${geo.className} tracking-wider whitespace-nowrap`}
        >
          Coming Soon
        </span>
      </div>
    </div>
  );
};

// Expandable Use Case Box
const UseCaseBox = ({
  title,
  tokens,
  summary,
  details,
}: {
  title: string;
  tokens: string[];
  summary: string;
  details: string;
}) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="h-80 w-full [perspective:2000px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      tabIndex={0}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-all duration-300 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 h-full w-full bg-[#4A7C59]/20 p-6 pt-10 shadow-[0_0_15px_rgba(74,124,89,0.1)] border border-[#4A7C59]/20 flex flex-col items-center justify-center transition-all relative [backface-visibility:hidden]">
          <span
            className={`text-3xl text-[#F5F5F5]/80 text-center uppercase tracking-wider font-semibold ${geo.className}`}
          >
            {title}
          </span>
          <svg
            className="w-5 h-5 mt-6 text-[#F5F5F5]/60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {/* Back Side */}
        <div className="absolute inset-0 h-full w-full bg-black/90 p-6 pt-10 shadow-[0_0_15px_rgba(74,124,89,0.1)] border border-[#4A7C59]/20 flex flex-col items-center justify-center transition-all [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-[#F5F5F5]/80 text-base leading-relaxed mb-2 text-center">
            {summary}
          </div>
          <div className="text-[#F5F5F5]/60 text-sm leading-relaxed text-center">
            {details}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-black text-[#F5F5F5] font-sans relative">
        {/* Steam Background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Large base squares */}
          <div className="absolute top-[10%] left-[20%] w-[200px] h-[200px] bg-[#4A7C59]/[0.06]"></div>
          <div className="absolute top-[15%] left-[35%] w-[180px] h-[180px] bg-[#4A7C59]/[0.05]"></div>
          <div className="absolute top-[20%] left-[50%] w-[160px] h-[160px] bg-[#4A7C59]/[0.07]"></div>

          {/* Medium squares - Layer 1 */}
          <div className="absolute top-[30%] left-[15%] w-[150px] h-[150px] bg-[#4A7C59]/[0.04] animate-float-1"></div>
          <div className="absolute top-[35%] left-[30%] w-[140px] h-[140px] bg-[#4A7C59]/[0.045] animate-float-2"></div>
          <div className="absolute top-[40%] left-[45%] w-[130px] h-[130px] bg-[#4A7C59]/[0.055] animate-float-3"></div>

          {/* Medium squares - Layer 2 */}
          <div className="absolute top-[50%] left-[25%] w-[120px] h-[120px] bg-[#4A7C59]/[0.065] animate-float-4"></div>
          <div className="absolute top-[55%] left-[40%] w-[110px] h-[110px] bg-[#4A7C59]/[0.05] animate-float-1"></div>
          <div className="absolute top-[60%] left-[55%] w-[100px] h-[100px] bg-[#4A7C59]/[0.06] animate-float-2"></div>

          {/* Small squares */}
          <div className="absolute top-[70%] left-[20%] w-[80px] h-[80px] bg-[#4A7C59]/[0.075] animate-steam-1"></div>
          <div className="absolute top-[75%] left-[35%] w-[70px] h-[70px] bg-[#4A7C59]/[0.07] animate-steam-2"></div>
          <div className="absolute top-[80%] left-[50%] w-[60px] h-[60px] bg-[#4A7C59]/[0.08] animate-steam-3"></div>
          <div className="absolute top-[85%] left-[65%] w-[50px] h-[50px] bg-[#4A7C59]/[0.065] animate-steam-1"></div>
          <div className="absolute top-[90%] left-[80%] w-[40px] h-[40px] bg-[#4A7C59]/[0.075] animate-steam-2"></div>
          <div className="absolute top-[95%] left-[95%] w-[30px] h-[30px] bg-[#4A7C59]/[0.07] animate-steam-3"></div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/90 backdrop-blur-sm border-b border-[#4A7C59]/20 w-full px-6">
          <div className="flex items-center justify-between h-16 w-full max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Zhenglong Protocol"
                  width={32}
                  height={32}
                  className="w-full h-full"
                />
              </div>
              <span
                className={`text-xl tracking-wider text-[#4A7C59] ${geo.className}`}
              >
                zhenglong
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="http://localhost:3001"
                className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap"
              >
                Docs
              </a>
              <ComingSoonOverlay>
                <a
                  href="#"
                  className="text-[#F5F5F5]/50 tracking-wider cursor-not-allowed whitespace-nowrap"
                >
                  Governance
                </a>
              </ComingSoonOverlay>
              <ComingSoonOverlay>
                <a
                  href="#"
                  className="text-[#F5F5F5]/50 tracking-wider cursor-not-allowed whitespace-nowrap"
                >
                  Discord
                </a>
              </ComingSoonOverlay>
              <ComingSoonOverlay>
                <a
                  href="#"
                  className="text-[#F5F5F5]/50 tracking-wider cursor-not-allowed whitespace-nowrap"
                >
                  Bug Bounty
                </a>
              </ComingSoonOverlay>
            </div>

            {/* Launch App Button */}
            <ComingSoonOverlay>
              <button
                className={`bg-[#4A7C59]/50 px-6 py-2 text-white/50 text-lg tracking-wider uppercase cursor-not-allowed ${geo.className}`}
              >
                Launch App
              </button>
            </ComingSoonOverlay>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-[#F5F5F5] hover:text-[#F5F5F5]/80 transition-colors">
              {/* Menu Icon */}
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12h18" />
                <path d="M3 6h18" />
                <path d="M3 18h18" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10 pt-16">
          {/* IDO Banner */}
          <div className="bg-[#4A7C59] text-white py-3">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <p className="text-lg tracking-wider">
                  🚀 Initial DEX Offering Now Live! Join the Zhenglong Protocol
                  Launch
                </p>
                <div className="flex gap-4">
                  <ComingSoonOverlay className="group">
                    <Link
                      href="/ido"
                      className={`inline-block bg-white text-[#4A7C59] hover:bg-[#F5F5F5] px-6 py-2 tracking-wider transition-all uppercase text-lg ${geo.className}`}
                    >
                      Participate in IDO →
                    </Link>
                  </ComingSoonOverlay>
                  <ComingSoonOverlay>
                    <button
                      className={`border border-white/50 text-white/50 px-6 py-2 tracking-wider uppercase text-lg cursor-not-allowed ${geo.className}`}
                    >
                      Learn More
                    </button>
                  </ComingSoonOverlay>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
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
                  Zhenglong
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
                  <ComingSoonOverlay>
                    <button
                      className={`border border-[#4A7C59]/50 text-[#F5F5F5]/50 px-8 py-3 tracking-wider uppercase text-lg cursor-not-allowed ${geo.className}`}
                    >
                      Learn More
                    </button>
                  </ComingSoonOverlay>
                </div>
              </div>
            </section>
          </div>

          {/* Features Section */}
          <section className="relative z-10">
            <div className="absolute inset-0 pointer-events-none">
              {/* Steam squares for Features section */}
              <div className="absolute top-[10%] left-[20%] w-[300px] h-[200px] bg-[#4A7C59]/[0.08]"></div>
              <div className="absolute top-[15%] right-[15%] w-[250px] h-[180px] bg-[#4A7C59]/[0.06]"></div>
              <div className="absolute top-[5%] left-[40%] w-[200px] h-[150px] bg-[#4A7C59]/[0.10] animate-float-1"></div>
              <div className="absolute top-[25%] right-[35%] w-[180px] h-[140px] bg-[#4A7C59]/[0.08] animate-float-2"></div>
              <div className="absolute bottom-[20%] left-[25%] w-[120px] h-[120px] bg-[#4A7C59]/[0.12] animate-steam-1"></div>
              <div className="absolute bottom-[30%] right-[25%] w-[100px] h-[100px] bg-[#4A7C59]/[0.10] animate-steam-2"></div>
            </div>
            <div className="container mx-auto px-6 py-24">
              <h2
                className={`text-3xl md:text-4xl font-normal text-center mb-16 tracking-wider uppercase ${geo.className}`}
              >
                Fully Backed and Redeemable Tokens
              </h2>
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="text-center p-6 pt-10 bg-black p-6 pt-10 shadow-[0_0_15px_rgba(74,124,89,0.1)] min-h-[280px] relative">
                      <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-[#4A7C59] flex items-center justify-center">
                        {/* Stability Icon */}
                        <img
                          src="/peg.svg"
                          alt="Pegged Token Icon"
                          className="w-12 h-12"
                        />
                      </div>
                      <div
                        className={`text-3xl md:text-4xl mb-6 text-[#4A7C59] ${geo.className}`}
                      >
                        ZHE TOKENS
                      </div>
                      <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light mb-8">
                        Pegged tokens that track price feeds with 1:1, with
                        built in real yield via stability pools
                      </p>
                      <TokenList
                        tokens={[
                          "zheUSD",
                          "zheBTC",
                          "zheETH",
                          "zheTSLA",
                          "zheSP500",
                        ]}
                        duration={20}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-black p-4 pt-8 shadow-[0_0_15px_rgba(74,124,89,0.1)] rounded-sm relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#4A7C59] flex items-center justify-center">
                          <img
                            src="/yield.svg"
                            alt="Yield Icon"
                            className="w-8 h-8"
                          />
                        </div>
                        <p className="text-sm text-[#F5F5F5]/70 text-center">
                          Earn real yield for depositing into the stability pool
                        </p>
                      </div>
                      <div className="bg-black p-4 pt-8 shadow-[0_0_15px_rgba(74,124,89,0.1)] rounded-sm relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#4A7C59] flex items-center justify-center">
                          <img
                            src="/rocket.svg"
                            alt="Rocket Icon"
                            className="w-8 h-8"
                          />
                        </div>
                        <p className="text-sm text-[#F5F5F5]/70 text-center">
                          Earn STEAM for providing AMM liquidity
                        </p>
                      </div>
                      <div className="bg-black p-4 pt-8 shadow-[0_0_15px_rgba(74,124,89,0.1)] rounded-sm relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#4A7C59] flex items-center justify-center">
                          <img
                            src="/defi.svg"
                            alt="DeFi Icon"
                            className="w-8 h-8"
                          />
                        </div>
                        <p className="text-sm text-[#F5F5F5]/70 text-center">
                          Use in Defi
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="text-center p-6 pt-10 bg-black p-6 pt-10 shadow-[0_0_15px_rgba(74,124,89,0.1)] min-h-[280px] relative">
                      <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-[#4A7C59] flex items-center justify-center">
                        {/* Volatility Icon */}
                        <img
                          src="/leverage.svg"
                          alt="Leverage Token Icon"
                          className="w-12 h-12"
                        />
                      </div>
                      <div
                        className={`text-3xl md:text-4xl mb-6 text-[#4A7C59] ${geo.className}`}
                      >
                        STEAMED TOKENS
                      </div>
                      <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light mb-8">
                        Get supercharged market exposure through
                        liquidation-protected variable leverage tokens
                      </p>
                      <TokenList
                        tokens={[
                          "steamedETH",
                          "steamedETH-DOWN",
                          "steamedBTC",
                          "steamedBTC-DOWN",
                          "steamedTSLA",
                          "steamedTSLA-DOWN",
                          "steamedSP500",
                          "steamedSP500-DOWN",
                        ]}
                        duration={32}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-black p-4 pt-8 shadow-[0_0_15px_rgba(74,124,89,0.1)] rounded-sm relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#4A7C59] flex items-center justify-center">
                          <img
                            src="/stability.svg"
                            alt="Stability Icon"
                            className="w-8 h-8"
                          />
                        </div>
                        <p className="text-sm text-[#F5F5F5]/70 text-center">
                          Stability Mechanism
                        </p>
                      </div>
                      <div className="bg-black p-4 pt-8 shadow-[0_0_15px_rgba(74,124,89,0.1)] rounded-sm relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#4A7C59] flex items-center justify-center">
                          <img
                            src="/rebalance.svg"
                            alt="Rebalance Icon"
                            className="w-8 h-8"
                          />
                        </div>
                        <p className="text-sm text-[#F5F5F5]/70 text-center">
                          Automated Rebalancing
                        </p>
                      </div>
                      <div className="bg-black p-4 pt-8 shadow-[0_0_15px_rgba(74,124,89,0.1)] rounded-sm relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#4A7C59] flex items-center justify-center">
                          <img
                            src="/defi.svg"
                            alt="DeFi Icon"
                            className="w-8 h-8"
                          />
                        </div>
                        <p className="text-sm text-[#F5F5F5]/70 text-center">
                          Use in Defi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stability Pools Section */}
          <section className="relative z-10">
            <div className="absolute inset-0 pointer-events-none">
              {/* Steam squares for Stability Pools section */}
              <div className="absolute top-[5%] left-[15%] w-[400px] h-[300px] bg-[#4A7C59]/[0.04]"></div>
              <div className="absolute top-[20%] right-[20%] w-[350px] h-[250px] bg-[#4A7C59]/[0.03]"></div>
              <div className="absolute top-[15%] left-[35%] w-[280px] h-[200px] bg-[#4A7C59]/[0.05] animate-float-3"></div>
              <div className="absolute bottom-[25%] right-[30%] w-[150px] h-[150px] bg-[#4A7C59]/[0.04] animate-float-4"></div>
              <div className="absolute bottom-[15%] left-[20%] w-[100px] h-[100px] bg-[#4A7C59]/[0.06] animate-steam-3"></div>
            </div>
            <div className="container mx-auto px-6 py-24">
              <h2
                className={`text-3xl md:text-4xl font-normal text-center mb-16 tracking-wider uppercase ${geo.className}`}
              >
                Stability Pools: Security & Yield
              </h2>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                {/* Left Column - Security */}
                <div className="space-y-8">
                  <div className="bg-black p-8 shadow-[0_0_15px_rgba(74,124,89,0.1)]">
                    <h3
                      className={`text-3xl text-[#4A7C59] mb-6 text-center uppercase tracking-wider font-semibold ${geo.className}`}
                    >
                      Protocol Security
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 mt-1 bg-[#4A7C59] flex-shrink-0 flex items-center justify-center">
                          <img
                            src="/stability.svg"
                            alt="Stability Icon"
                            className="w-8 h-8"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-[#F5F5F5]">
                            Stability Mechanism
                          </h4>
                          <p className="text-[#F5F5F5]/70 leading-relaxed">
                            Stability pools act as a stability mechanism by
                            automatically adjusting collateral ratios during
                            market stress, ensuring protocol solvency.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 mt-1 bg-[#4A7C59] flex-shrink-0 flex items-center justify-center">
                          <img
                            src="/rebalance.svg"
                            alt="Rebalance Icon"
                            className="w-8 h-8"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-[#F5F5F5]">
                            Automated Rebalancing
                          </h4>
                          <p className="text-[#F5F5F5]/70 leading-relaxed">
                            When collateral ratios reach predefined thresholds,
                            pools automatically swap tokens to maintain optimal
                            system health.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Yield */}
                <div className="space-y-8">
                  <div className="bg-black p-8 shadow-[0_0_15px_rgba(74,124,89,0.1)]">
                    <h3
                      className={`text-3xl text-[#4A7C59] mb-6 text-center uppercase tracking-wider font-semibold ${geo.className}`}
                    >
                      Yield Generation
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 mt-1 bg-[#4A7C59] flex-shrink-0 flex items-center justify-center">
                          <img
                            src="/yield.svg"
                            alt="Yield Icon"
                            className="w-8 h-8"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-[#F5F5F5]">
                            Collateral Yield
                          </h4>
                          <p className="text-[#F5F5F5]/70 leading-relaxed">
                            Earn yield from stETH and other yield-bearing
                            collateral tokens used in the protocol, distributed
                            to rebalance pool depositors.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 mt-1 bg-[#4A7C59] flex-shrink-0 flex items-center justify-center">
                          <img
                            src="/rocket.svg"
                            alt="Rocket Icon"
                            className="w-8 h-8"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-[#F5F5F5]">
                            STEAM Rewards
                          </h4>
                          <p className="text-[#F5F5F5]/70 leading-relaxed">
                            Receive STEAM tokens as additional rewards for
                            participating in stability pools, enhancing your
                            overall yield.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <ComingSoonOverlay className="inline-block">
                  <button
                    className={`bg-[#4A7C59]/50 text-[#F5F5F5]/50 px-8 py-3 tracking-wider uppercase text-lg cursor-not-allowed ${geo.className}`}
                  >
                    Explore Stability Pools
                  </button>
                </ComingSoonOverlay>
              </div>
            </div>
          </section>

          {/* STEAM Token Section */}
          <section className="relative z-10">
            <div className="absolute inset-0 pointer-events-none">
              {/* Steam squares for STEAM Token section */}
              <div className="absolute top-[10%] left-[25%] w-[450px] h-[320px] bg-[#4A7C59]/[0.06]"></div>
              <div className="absolute top-[15%] right-[25%] w-[380px] h-[280px] bg-[#4A7C59]/[0.05]"></div>
              <div className="absolute top-[30%] left-[40%] w-[300px] h-[220px] bg-[#4A7C59]/[0.07] animate-float-2"></div>
              <div className="absolute bottom-[20%] right-[35%] w-[180px] h-[180px] bg-[#4A7C59]/[0.06] animate-float-3"></div>
              <div className="absolute bottom-[30%] left-[30%] w-[120px] h-[120px] bg-[#4A7C59]/[0.08] animate-steam-1"></div>
            </div>
            <div className="container mx-auto px-6 py-24">
              <h2
                className={`text-3xl md:text-4xl font-normal text-center mb-16 tracking-wider uppercase ${geo.className}`}
              >
                STEAM Token
              </h2>
              <div className="space-y-8">
                <p className="text-xl text-[#F5F5F5]/90 leading-relaxed tracking-wide font-light mb-12 max-w-4xl mx-auto text-center">
                  STEAM is the governance token that powers the Zhenglong
                  Protocol ecosystem, offering holders multiple benefits and
                  control over the protocol&apos;s future.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <div className="bg-black p-6 shadow-[0_0_15px_rgba(74,124,89,0.2)] border border-[#4A7C59]/20">
                    <h3
                      className={`text-3xl text-[#4A7C59] mb-4 text-center uppercase tracking-wider font-semibold ${geo.className}`}
                    >
                      Revenue Share
                    </h3>
                    <p className="text-[#F5F5F5]/80 leading-relaxed tracking-wide font-light">
                      Earn a share of protocol revenue from market operations
                      and fees
                    </p>
                  </div>
                  <div className="bg-black p-6 shadow-[0_0_15px_rgba(74,124,89,0.2)] border border-[#4A7C59]/20">
                    <h3
                      className={`text-3xl text-[#4A7C59] mb-4 text-center uppercase tracking-wider font-semibold ${geo.className}`}
                    >
                      Boost Rewards
                    </h3>
                    <p className="text-[#F5F5F5]/80 leading-relaxed tracking-wide font-light">
                      Increase your earnings from stability pool and AMM
                      liquidity provision
                    </p>
                  </div>
                  <div className="bg-black p-6 shadow-[0_0_15px_rgba(74,124,89,0.2)] border border-[#4A7C59]/20">
                    <h3
                      className={`text-3xl text-[#4A7C59] mb-4 text-center uppercase tracking-wider font-semibold ${geo.className}`}
                    >
                      Governance Rights
                    </h3>
                    <p className="text-[#F5F5F5]/80 leading-relaxed tracking-wide font-light">
                      Vote in protocol governance and direct STEAM rewards
                    </p>
                  </div>
                </div>
                {/* Call to Action Buttons - Centered below the boxes */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full mt-8">
                  <ComingSoonOverlay className="w-full">
                    <button
                      className={`w-full bg-black/50 text-[#F5F5F5]/50 px-8 py-4 tracking-wider uppercase text-lg cursor-not-allowed ${geo.className}`}
                    >
                      Get STEAM
                    </button>
                  </ComingSoonOverlay>
                  <ComingSoonOverlay className="w-full">
                    <button
                      className={`w-full bg-[#4A7C59]/50 text-[#F5F5F5]/50 px-8 py-4 tracking-wider uppercase text-lg cursor-not-allowed ${geo.className}`}
                    >
                      Earn STEAM
                    </button>
                  </ComingSoonOverlay>
                </div>
              </div>
            </div>
          </section>

          {/* Booster Program Section */}
          <section className="relative z-10">
            <div className="absolute inset-0 pointer-events-none">
              {/* Steam squares for Booster Program section */}
              <div className="absolute top-[5%] left-[20%] w-[380px] h-[280px] bg-[#4A7C59]/[0.04]"></div>
              <div className="absolute top-[15%] right-[25%] w-[320px] h-[240px] bg-[#4A7C59]/[0.03]"></div>
              <div className="absolute top-[25%] left-[35%] w-[260px] h-[200px] bg-[#4A7C59]/[0.05] animate-float-1"></div>
              <div className="absolute bottom-[20%] right-[30%] w-[160px] h-[160px] bg-[#4A7C59]/[0.04] animate-float-4"></div>
              <div className="absolute bottom-[25%] left-[25%] w-[140px] h-[140px] bg-[#4A7C59]/[0.06] animate-steam-2"></div>
            </div>
            <div className="container mx-auto px-6 py-24">
              <h2
                className={`text-3xl md:text-4xl font-normal text-center mb-16 tracking-wider uppercase ${geo.className}`}
              >
                Community Booster Program
              </h2>
              <div className="space-y-16">
                {/* Main Content */}
                <div className="space-y-12">
                  {/* Description Text */}
                  <p className="text-xl text-[#F5F5F5]/80 leading-relaxed tracking-wide font-light text-center max-w-3xl mx-auto">
                    Join our community of boosters and earn STEAM tokens for
                    helping spread the word about Zhenglong Protocol. Any form
                    of marketing contribution is welcome.
                  </p>

                  {/* Four Boxes Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-black p-6 pt-10 shadow-[0_0_15px_rgba(74,124,89,0.1)] relative">
                      <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-[#4A7C59] flex items-center justify-center">
                        <img
                          src="/social.svg"
                          alt="Social Media Icon"
                          className="w-8 h-8"
                        />
                      </div>
                      <h3
                        className={`text-3xl text-[#4A7C59] mb-3 text-center uppercase tracking-wider font-semibold ${geo.className}`}
                      >
                        Social Media
                      </h3>
                      <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                        Create X threads, engage in discussions, and share
                        insights about the protocol
                      </p>
                    </div>
                    <div className="bg-black p-6 pt-10 shadow-[0_0_15px_rgba(74,124,89,0.1)] relative">
                      <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-[#4A7C59] flex items-center justify-center">
                        <img
                          src="/content.svg"
                          alt="Content Creation Icon"
                          className="w-8 h-8"
                        />
                      </div>
                      <h3
                        className={`text-3xl text-[#4A7C59] mb-3 text-center uppercase tracking-wider font-semibold ${geo.className}`}
                      >
                        Content Creation
                      </h3>
                      <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                        Produce videos, tutorials, articles, blogs, and
                        educational content about Zhenglong
                      </p>
                    </div>
                    <div className="bg-black p-6 pt-10 shadow-[0_0_15px_rgba(74,124,89,0.1)] relative">
                      <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-[#4A7C59] flex items-center justify-center">
                        <img
                          src="/art.svg"
                          alt="Art and Memes Icon"
                          className="w-8 h-8"
                        />
                      </div>
                      <h3
                        className={`text-3xl text-[#4A7C59] mb-3 text-center uppercase tracking-wider font-semibold ${geo.className}`}
                      >
                        Art & Memes
                      </h3>
                      <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                        Create artwork, memes, and visual content to promote
                        Zhenglong
                      </p>
                    </div>
                    <div className="bg-black p-6 pt-10 shadow-[0_0_15px_rgba(74,124,89,0.1)] relative">
                      <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-[#4A7C59] flex items-center justify-center">
                        <img
                          src="/community.svg"
                          alt="Community Building Icon"
                          className="w-8 h-8"
                        />
                      </div>
                      <h3
                        className={`text-3xl text-[#4A7C59] mb-3 text-center uppercase tracking-wider font-semibold ${geo.className}`}
                      >
                        Community Building
                      </h3>
                      <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                        Organize community events and foster discussions in your
                        local network
                      </p>
                    </div>
                  </div>

                  {/* Token Supply Text */}
                  <div className="text-center">
                    <p className="text-lg md:text-xl text-[#F5F5F5] leading-relaxed tracking-wider font-light">
                      <span className="block mb-2">
                        <span
                          className={`text-3xl md:text-5xl font-medium text-[#4A7C59] border-b border-[#4A7C59]/50 pb-1 ${geo.className}`}
                        >
                          3%
                        </span>
                      </span>
                      <span className="block text-[#F5F5F5]/90">
                        of STEAM token supply is distributed to our community of
                        boosters
                      </span>
                    </p>
                  </div>

                  {/* Become a Booster Box */}
                  <div className="max-w-2xl mx-auto">
                    <div className="bg-black p-6 shadow-[0_0_15px_rgba(74,124,89,0.1)] relative">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="space-y-3">
                          <div
                            className={`text-3xl text-[#4A7C59] ${geo.className}`}
                          >
                            Become a Booster
                          </div>
                          <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                            Help grow the Zhenglong ecosystem and earn rewards
                            for your contributions
                          </p>
                          <div className="pt-3">
                            <ComingSoonOverlay>
                              <button
                                className={`bg-[#4A7C59]/50 text-[#F5F5F5]/50 px-8 py-3 tracking-wider uppercase text-lg cursor-not-allowed ${geo.className}`}
                              >
                                Join Program
                              </button>
                            </ComingSoonOverlay>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="relative z-10">
            <div className="absolute inset-0 pointer-events-none">
              {/* Steam squares for Use Cases section */}
              <div className="absolute top-[8%] left-[18%] w-[420px] h-[300px] bg-[#4A7C59]/[0.08]"></div>
              <div className="absolute top-[12%] right-[22%] w-[360px] h-[260px] bg-[#4A7C59]/[0.06]"></div>
              <div className="absolute top-[20%] left-[38%] w-[280px] h-[220px] bg-[#4A7C59]/[0.10] animate-float-2"></div>
              <div className="absolute bottom-[18%] right-[28%] w-[180px] h-[180px] bg-[#4A7C59]/[0.08] animate-float-3"></div>
              <div className="absolute bottom-[22%] left-[22%] w-[140px] h-[140px] bg-[#4A7C59]/[0.12] animate-steam-1"></div>
            </div>
            <div className="container mx-auto px-6 py-24">
              <h2
                className={`text-3xl md:text-4xl font-normal text-center mb-16 tracking-wider uppercase ${geo.className}`}
              >
                Use Cases
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
                <UseCaseBox
                  title="Weather Derivatives"
                  tokens={["zheRAIN"]}
                  summary="Farmers hedge against drought or excessive rainfall; insurers offer coverage without centralized providers."
                  details="Pegged to rainfall or weather indices, zheRAIN enables decentralized weather risk management for agriculture and insurance markets."
                />
                <UseCaseBox
                  title="Carbon Credit & ESG Tokens"
                  tokens={["zheCO2"]}
                  summary="Businesses offset carbon exposure directly via DeFi, incentivizing green initiatives."
                  details="zheCO2 tracks global carbon prices, allowing companies to offset emissions and participate in ESG markets on-chain."
                />
                <UseCaseBox
                  title="Equity Indices"
                  tokens={["zheSPX", "zheNDX"]}
                  summary="DeFi traders gain exposure to equities without leaving crypto ecosystems."
                  details="Synthetic tokens like zheSPX and zheNDX track S&P 500 and Nasdaq indices, enabling global, 24/7 access to equity markets."
                />
                <UseCaseBox
                  title="Individual Stock Tokens"
                  tokens={["zheTSLA", "zheAAPL"]}
                  summary="Global accessibility to popular stocks, especially for users in restricted jurisdictions."
                  details="zheTSLA and zheAAPL provide synthetic exposure to Tesla and Apple, democratizing access to top equities."
                />
                <UseCaseBox
                  title="Athlete Performance Metrics"
                  tokens={["zheGOALS"]}
                  summary="Fans gain financial exposure to athlete performance, boosting engagement."
                  details="zheGOALS is pegged to athlete stats, letting fans and traders speculate on or hedge against sports performance."
                />
                <UseCaseBox
                  title="Music & Streaming Revenue"
                  tokens={["zheSTREAM"]}
                  summary="Artists tokenize future royalties, allowing direct fan investment."
                  details="zheSTREAM tracks streaming revenue indexes or royalties, opening new funding models for creators."
                />
                <UseCaseBox
                  title="Inflation & CPI Tokens"
                  tokens={["zheCPI"]}
                  summary="Users hedge against inflation risk directly on-chain, protecting their purchasing power."
                  details="zheCPI is pegged to consumer price indices, enabling on-chain inflation hedging for DeFi users."
                />
                <UseCaseBox
                  title="GDP Growth Tokens"
                  tokens={["zheGDP"]}
                  summary="Economists or investors hedge against or speculate on economic growth data."
                  details="zheGDP tracks GDP growth, allowing macro speculation and risk management on-chain."
                />
                <UseCaseBox
                  title="AI & Machine Learning Performance"
                  tokens={["zheAI"]}
                  summary="Investors gain exposure to AI advancements, rewarding R&D success transparently."
                  details="zheAI is pegged to AI performance benchmarks, letting users invest in the growth of AI technology."
                />
                <UseCaseBox
                  title="Crypto Adoption Metrics"
                  tokens={["zheADOPT"]}
                  summary="Speculate on crypto adoption growth without investing in a single asset."
                  details="zheADOPT tracks blockchain adoption or transaction metrics, enabling new ways to bet on crypto's future."
                />
                <UseCaseBox
                  title="Precious Metals"
                  tokens={["zheGOLD", "zheSILVER"]}
                  summary="Store of value alternatives or hedging instruments fully backed by crypto collateral."
                  details="zheGOLD and zheSILVER provide synthetic, on-chain exposure to gold and silver prices."
                />
                <UseCaseBox
                  title="Energy Commodities"
                  tokens={["zheOIL", "zheGAS"]}
                  summary="Traders or companies hedge energy exposure directly through DeFi markets."
                  details="zheOIL and zheGAS track oil and natural gas prices, bringing energy markets to DeFi."
                />
                <UseCaseBox
                  title="Foreign Currency Pegged Tokens"
                  tokens={["zheEUR", "zheJPY"]}
                  summary="Global, decentralized FX markets accessible 24/7."
                  details="zheEUR and zheJPY enable on-chain trading and hedging of major fiat currencies."
                />
                <UseCaseBox
                  title="Emerging Market Currency Tokens"
                  tokens={["zheINR", "zheBRL"]}
                  summary="Enable risk management or speculation on volatile emerging market currencies."
                  details="zheINR and zheBRL bring emerging market FX exposure to DeFi, expanding global access."
                />
                <UseCaseBox
                  title="ETH Gas Price Tokens"
                  tokens={["zheGAS"]}
                  summary="Hedge transaction fee exposure or speculate on Ethereum congestion."
                  details="zheGAS is pegged to Ethereum gas prices, letting users hedge or speculate on network fees."
                />
                <UseCaseBox
                  title="NFT Floor Price Tokens"
                  tokens={["zheNFT"]}
                  summary="Traders speculate or hedge NFT market exposure without direct NFT holdings."
                  details="zheNFT tracks floor prices of top NFT collections (e.g., CryptoPunks, BAYC), enabling new NFT market strategies."
                />
              </div>
              <div className="mt-12 text-center">
                <p className="text-[#F5F5F5]/80 leading-relaxed tracking-wide font-light max-w-3xl mx-auto">
                  These examples show just a few ways Zhenglong Protocol could
                  empower innovation by turning any reliable data source into a
                  secure, yield-generating pegged token market. The flexibility
                  is huge—and as long as there's reliable price data and market
                  demand, Zhenglong can tokenize it.
                </p>
              </div>
            </div>
          </section>

          {/* Build a Market Section */}
          <section className="relative z-10">
            <div className="absolute inset-0 pointer-events-none">
              {/* Steam squares for Build a Market section */}
              <div className="absolute top-[10%] left-[22%] w-[360px] h-[260px] bg-[#4A7C59]/[0.04]"></div>
              <div className="absolute top-[15%] right-[20%] w-[300px] h-[220px] bg-[#4A7C59]/[0.03]"></div>
              <div className="absolute top-[25%] left-[35%] w-[240px] h-[180px] bg-[#4A7C59]/[0.05] animate-float-4"></div>
              <div className="absolute bottom-[20%] right-[25%] w-[160px] h-[160px] bg-[#4A7C59]/[0.04] animate-float-1"></div>
              <div className="absolute bottom-[25%] left-[28%] w-[120px] h-[120px] bg-[#4A7C59]/[0.06] animate-steam-3"></div>
            </div>
            <div className="container mx-auto px-6 py-24">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-[#4A7C59] flex items-center justify-center rounded-sm mb-6">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m-8-8h16"
                    />
                  </svg>
                </div>
                <h2
                  className={`text-3xl md:text-4xl font-normal text-center tracking-wider uppercase ${geo.className}`}
                >
                  Collaborate on a New Market
                </h2>
              </div>
              <div className="max-w-5xl mx-auto space-y-8">
                <p className="text-xl text-[#F5F5F5]/80 leading-relaxed tracking-wide font-light">
                  Whether one of our existing ideas resonates with your
                  community or you have your own creative vision, Zhenglong is
                  ready to help you build it. Launch your own market with
                  minimal requirements - if you have a collateral token and a
                  price feed, you&apos;re ready to go.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 shrink-0 bg-[#4A7C59]/10 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#4A7C59]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 12V8H6a2 2 0 00-2 2v4m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0h-2m-4 0h-8"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-medium mb-2 tracking-wider uppercase text-[#4A7C59] ${geo.className}`}
                      >
                        Collateral Token
                      </h3>
                      <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                        Any ERC20 token can serve as collateral. Common choices
                        include stablecoins and major cryptocurrencies.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 shrink-0 bg-[#4A7C59]/10 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#4A7C59]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-medium mb-2 tracking-wider uppercase text-[#4A7C59] ${geo.className}`}
                      >
                        Price Feed
                      </h3>
                      <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                        Connect any data source through Chainlink oracles. From
                        traditional markets to novel data streams.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-8 text-center">
                  <ComingSoonOverlay className="inline-block">
                    <button
                      className={`bg-[#4A7C59]/50 text-[#F5F5F5]/50 px-8 py-4 tracking-wider uppercase text-lg cursor-not-allowed ${geo.className}`}
                    >
                      Contact Us
                    </button>
                  </ComingSoonOverlay>
                </div>
              </div>
            </div>
          </section>

          {/* Institutional-Grade Security & Testing Section */}
          <section className="relative z-10">
            <div className="absolute inset-0 pointer-events-none">
              {/* Steam squares for Security section */}
              <div className="absolute top-[12%] left-[20%] w-[400px] h-[280px] bg-[#4A7C59]/[0.12]"></div>
              <div className="absolute top-[18%] right-[25%] w-[340px] h-[240px] bg-[#4A7C59]/[0.10]"></div>
              <div className="absolute top-[25%] left-[38%] w-[260px] h-[200px] bg-[#4A7C59]/[0.14] animate-float-3"></div>
              <div className="absolute bottom-[22%] right-[30%] w-[180px] h-[180px] bg-[#4A7C59]/[0.12] animate-float-2"></div>
              <div className="absolute bottom-[28%] left-[25%] w-[140px] h-[140px] bg-[#4A7C59]/[0.16] animate-steam-2"></div>
            </div>
            <div className="container mx-auto px-6 py-24">
              <div className="flex flex-col items-center mb-10">
                <div className="w-16 h-16 bg-[#4A7C59] flex items-center justify-center rounded-sm mb-6">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="3" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12l2 2 4-4"
                    />
                  </svg>
                </div>
                <h2
                  className={`text-3xl md:text-4xl font-normal text-center tracking-wider uppercase text-[#F5F5F5]/80 ${geo.className}`}
                >
                  Institutional-Grade Security & Testing
                </h2>
              </div>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black p-8 shadow-[0_0_15px_rgba(74,124,89,0.1)] border border-[#4A7C59]/20 rounded-sm flex flex-col items-start">
                  <h3 className="text-2xl font-semibold mb-2 text-[#F5F5F5]/80 tracking-wider">
                    Code4rena Audited
                  </h3>
                  <p className="text-[#F5F5F5]/70 leading-relaxed font-light mb-2">
                    Smart contracts thoroughly audited by Code4rena, a leading
                    community-driven auditing platform trusted across DeFi.
                  </p>
                  <a
                    href="#"
                    className="inline-block mt-2 text-[#4A7C59] underline underline-offset-4 text-lg font-medium"
                  >
                    View Audit Report →
                  </a>
                </div>
                <div className="bg-black p-8 shadow-[0_0_15px_rgba(74,124,89,0.1)] border border-[#4A7C59]/20 rounded-sm flex flex-col items-start">
                  <h3 className="text-2xl font-semibold mb-2 text-[#F5F5F5]/80 tracking-wider">
                    Banking Industry Experience
                  </h3>
                  <p className="text-[#F5F5F5]/70 leading-relaxed font-light">
                    Built by professionals with 30+ years of banking software
                    experience, ensuring institutional-quality standards and
                    robust risk management.
                  </p>
                </div>
                <div className="bg-black p-8 shadow-[0_0_15px_rgba(74,124,89,0.1)] border border-[#4A7C59]/20 rounded-sm flex flex-col items-start">
                  <h3 className="text-2xl font-semibold mb-2 text-[#F5F5F5]/80 tracking-wider">
                    Multi-layered Testing
                  </h3>
                  <ul className="list-disc list-inside text-[#F5F5F5]/70 space-y-1">
                    <li>Comprehensive unit & integration testing</li>
                    <li>System-wide market scenario stress tests</li>
                    <li>Real-time security monitoring</li>
                    <li>Continuous risk assessment</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ComingSoonOverlay from "./ComingSoonOverlay";
import { geo } from "@/utils/fonts";

// Move messages outside the component to prevent re-creation on render
const messages = [
  "High yields shouldn't just be for stables",
  "And leverage should be protected from liquidation",
];

const HeroSection = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [heroAnimationPhase, setHeroAnimationPhase] = useState(0);

  const currentPhaseRef = useRef(0);
  const typeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const charIndexRef = useRef(0);

  const startTyping = () => {
    if (currentPhaseRef.current >= messages.length) {
      setTimeout(() => setShowSplash(false), 500); // End splash
      return;
    }

    const message = messages[currentPhaseRef.current];
    charIndexRef.current = 0;
    setDisplayText("");

    typeIntervalRef.current = setInterval(() => {
      if (charIndexRef.current < message.length) {
        setDisplayText(message.substring(0, charIndexRef.current + 1));
        charIndexRef.current++;
      } else {
        if (typeIntervalRef.current) {
          clearInterval(typeIntervalRef.current);
        }

        setTimeout(() => {
          currentPhaseRef.current++;
          startTyping();
        }, 1500);
      }
    }, 50);
  };

  // Initialize typing animation
  useEffect(() => {
    startTyping();
    return () => {
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    };
  }, []);

  // Hero section animation sequence
  useEffect(() => {
    if (!showSplash) {
      const timers = [
        setTimeout(() => setHeroAnimationPhase(1), 100), // "welcome to" fades in
        setTimeout(() => setHeroAnimationPhase(2), 700), // "ZHENGLONG" fades in
        setTimeout(() => setHeroAnimationPhase(3), 2000), // "welcome to" fades out
        setTimeout(() => setHeroAnimationPhase(4), 2300), // tagline/buttons fade in
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [showSplash]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(
      () => setShowCursor((prev) => !prev),
      500
    );
    return () => clearInterval(cursorInterval);
  }, []);

  const handleSkip = () => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    setShowSplash(false);
  };

  // Find the longest message for the sizer to prevent layout shifts
  const longestMessage = messages.reduce((a, b) =>
    a.length > b.length ? a : b
  );

  return (
    <div
      className={`relative w-full min-h-[80vh] overflow-hidden pt-8 bg-black ${
        showSplash ? "cursor-pointer" : ""
      }`}
      onClick={showSplash ? handleSkip : undefined}
    >
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
      <section className="container mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="text-center pt-40 px-2 sm:px-0">
          {showSplash ? (
            <div className="flex justify-center items-center w-full min-h-[14rem]">
              <div
                className={`absolute top-8 right-8 text-[#F5F5F5]/60 text-sm tracking-wider uppercase ${geo.className} pointer-events-none`}
              >
                Click anywhere to skip →
              </div>
              <div className="inline-grid min-h-[8rem] items-center">
                {/* 1. Invisible Sizer - includes a non-blinking cursor to reserve space */}
                <div
                  aria-hidden="true"
                  className={`invisible text-left row-start-1 col-start-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.05em] sm:tracking-[0.1em] ${geo.className}`}
                >
                  {longestMessage}
                  <span className="text-[#4A7C59]">|</span>
                </div>
                {/* 2. Visible Typing Text - with an opacity-blinking cursor */}
                <div
                  className={`text-left row-start-1 col-start-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#F5F5F5] tracking-[0.05em] sm:tracking-[0.1em] ${geo.className}`}
                >
                  {displayText}
                  <span
                    className={`transition-opacity duration-150 text-[#4A7C59] ${
                      showCursor ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    |
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-[14rem]">
              <div
                className={`text-2xl sm:text-3xl md:text-4xl text-[#F5F5F5]/80 mb-4 tracking-wider font-light transition-opacity duration-500 ${
                  heroAnimationPhase >= 1 && heroAnimationPhase < 3
                    ? "opacity-100"
                    : "opacity-0"
                } ${geo.className}`}
              >
                welcome to
              </div>
              <h1
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#4A7C59] to-[#6B9E76] tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] uppercase transition-opacity duration-500 ${
                  heroAnimationPhase >= 2 ? "opacity-100" : "opacity-0"
                } ${geo.className}`}
              >
                ZHENGLONG
              </h1>
              <div
                className={`transition-opacity duration-500 ${
                  heroAnimationPhase === 4 ? "opacity-100" : "opacity-0"
                }`}
              >
                <p
                  className={`text-xl md:text-2xl text-[#F5F5F5]/80 mb-8 tracking-wider font-light ${geo.className}`}
                >
                  Yield Like Never Before, For EVERY asset. Leverage protected
                  from Liquidation.
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
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

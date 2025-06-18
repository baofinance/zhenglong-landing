"use client";
import Link from "next/link";
import ComingSoonOverlay from "./ComingSoonOverlay";
import { geo } from "@/utils/fonts";

const IdoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#4A7C59] via-[#5A8B69] to-[#4A7C59] text-white py-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-2 h-2 bg-white animate-ping"></div>
        <div className="absolute top-2 right-4 w-1 h-1 bg-white animate-pulse"></div>
        <div
          className="absolute bottom-1 left-8 w-1 h-1 bg-white animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-3 right-12 w-2 h-2 bg-white animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            {/* Pulsing live indicator */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span
                className={`text-red-200 text-sm font-bold ${geo.className}`}
              >
                LIVE
              </span>
            </div>

            {/* Main message with enhanced styling */}
            <p
              className={`text-xl md:text-2xl tracking-wider font-bold ${geo.className}`}
            >
              <span className="animate-pulse">🔥</span> Discounted Community
              Sale Live Now!
              <span className="animate-pulse">🔥</span>
            </p>

            {/* Discount badge */}
            <div
              className="bg-yellow-400 text-black px-3 py-1 text-sm font-bold transform rotate-3 animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              33% OFF
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="/ido"
              className={`inline-block bg-white text-[#4A7C59] hover:bg-[#F5F5F5] px-6 py-2 tracking-wider transition-all uppercase text-lg hover:scale-105 transform shadow-lg ${geo.className}`}
            >
              Join Sale →
            </Link>
            <Link
              href="https://docs.zhenglong.finance"
              target="_blank"
              rel="noopener noreferrer"
              className={`border border-white text-white hover:bg-white/10 px-6 py-2 tracking-wider uppercase text-lg transition-all hover:scale-105 transform ${geo.className}`}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle moving background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform skew-x-12 animate-pulse"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>
    </div>
  );
};

export default IdoBanner;

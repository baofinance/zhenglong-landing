"use client";
import Link from "next/link";
import ComingSoonOverlay from "./ComingSoonOverlay";
import { geo } from "@/utils/fonts";

const IdoBanner = () => {
  return (
    <div className="bg-[#4A7C59] text-white py-3">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <p className="text-lg tracking-wider">
            🚀 Initial DEX Offering Now Live! Join the Zhenglong Launch
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
            <Link
              href="https://docs.zhenglong.finance"
              target="_blank"
              rel="noopener noreferrer"
              className={`border border-white text-white hover:bg-white/10 px-6 py-2 tracking-wider uppercase text-lg transition-colors ${geo.className}`}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdoBanner; 
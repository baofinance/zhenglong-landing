"use client";
import { useState } from "react";

const IdoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#4A7C59] to-[#5A8B69] text-white py-3 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-sm font-geo tracking-wider">
            🚀 COMMUNITY SALE NOW LIVE
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default IdoBanner;

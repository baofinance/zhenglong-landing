"use client";
import { useState } from "react";

// Replace the static green cards with flip cards
const FlipCard = ({
  token,
  explanation,
  // geoClass, // Note: This prop is named geoClass, but it seems like it should be using the geo object directly.
  // I will keep it as is for now, but this might need to be refactored if it's intended to use the imported geo.
  className,
}: {
  token: string;
  explanation: string;
  // geoClass: string;
  className?: string;
}) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`w-48 h-16 cursor-pointer [perspective:1000px] group transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 ${className}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      tabIndex={0}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59] shadow-[0_0_6px_0_rgba(74,124,89,0.4)] group-hover:shadow-[0_0_12px_2px_rgba(74,124,89,0.6)] transition-all duration-300 flex items-center justify-center [backface-visibility:hidden]">
          <span
            className={`text-[#4A7C59] text-lg font-normal tracking-wider break-words text-center font-geo`}
          >
            {(() => {
              if (token.startsWith("zhe")) {
                return (
                  <>
                    <span className="lowercase">zhe</span>
                    <span className="uppercase">{token.substring(3)}</span>
                  </>
                );
              }
              if (token.startsWith("steamed")) {
                return (
                  <>
                    <span className="lowercase">steamed</span>
                    <span className="uppercase">{token.substring(7)}</span>
                  </>
                );
              }
              return <span className="uppercase">{token}</span>;
            })()}
          </span>
        </div>
        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full bg-[#2B3C31] shadow flex items-center justify-center text-white text-xs font-medium px-1 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {explanation}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

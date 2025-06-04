"use client";
import { useState } from "react";
import { geo } from "@/utils/fonts";

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
        <div className="absolute inset-0 h-full w-full bg-[#4A7C59]/80 p-6 pt-10 shadow-[0_0_15px_rgba(74,124,89,0.1)] border border-[#4A7C59]/20 flex flex-col items-center justify-center transition-all relative [backface-visibility:hidden]">
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
        <div className="absolute inset-0 h-full w-full bg-black p-6 pt-10 shadow-[0_0_15px_rgba(74,124,89,0.1)] border border-[#4A7C59]/20 flex flex-col items-center justify-center transition-all [transform:rotateY(180deg)] [backface-visibility:hidden]">
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

export default UseCaseBox; 
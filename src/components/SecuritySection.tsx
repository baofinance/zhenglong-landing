"use client";
import { geo } from "@/utils/fonts";

const SecuritySection = () => {
  return (
    <section
      className="relative z-10"
      style={{ backgroundColor: "#000000" }}
    >
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
          <div
            className="p-8 border-2 border-[#4A7C59] flex flex-col items-start relative z-20"
            style={{ backgroundColor: "#000000", opacity: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-2 text-[#F5F5F5] tracking-wider">
              Third-Party Audited
            </h3>
            <p className="text-[#F5F5F5]/70 leading-relaxed font-light mb-2">
              Smart contracts will undergo a thorough independent security
              audit by a leading third-party firm before mainnet launch.
            </p>
          </div>
          <div
            className="p-8 border-2 border-[#4A7C59] flex flex-col items-start relative z-20"
            style={{ backgroundColor: "#000000", opacity: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-2 text-[#F5F5F5] tracking-wider">
              Banking Industry Experience
            </h3>
            <p className="text-[#F5F5F5]/70 leading-relaxed font-light">
              Built by professionals with 30+ years of banking software
              experience, ensuring institutional-quality standards and
              robust risk management.
            </p>
          </div>
          <div
            className="p-8 border-2 border-[#4A7C59] flex flex-col items-start relative z-20"
            style={{ backgroundColor: "#000000", opacity: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-2 text-[#F5F5F5] tracking-wider">
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
  );
};

export default SecuritySection; 
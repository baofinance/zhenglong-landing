"use client";
import { geo } from "@/utils/fonts";
import ComingSoonOverlay from "./ComingSoonOverlay";

const SteamTokenSection = () => {
  return (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <ComingSoonOverlay>
              <button
                className={`bg-black/50 text-[#F5F5F5]/50 px-8 py-4 tracking-wider uppercase text-lg cursor-not-allowed ${geo.className}`}
              >
                Get STEAM
              </button>
            </ComingSoonOverlay>
            <ComingSoonOverlay>
              <button
                className={`bg-[#4A7C59]/50 text-[#F5F5F5]/50 px-8 py-4 tracking-wider uppercase text-lg cursor-not-allowed ${geo.className}`}
              >
                Earn STEAM
              </button>
            </ComingSoonOverlay>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SteamTokenSection; 
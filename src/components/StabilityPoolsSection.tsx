"use client";
import { geo } from "@/utils/fonts";
import ComingSoonOverlay from "./ComingSoonOverlay";

const StabilityPoolsSection = () => {
  return (
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
          <div className="space-y-8 h-full">
            <div className="bg-black p-8 shadow-[0_0_15px_rgba(74,124,89,0.1)] min-h-[400px] flex flex-col">
              <h3
                className={`text-3xl text-[#4A7C59] mb-6 text-center uppercase tracking-wider font-semibold ${geo.className}`}
              >
                Protocol Security
              </h3>
              <div className="space-y-6 flex-1">
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
          <div className="space-y-8 h-full">
            <div className="bg-black p-8 shadow-[0_0_15px_rgba(74,124,89,0.1)] min-h-[400px] flex flex-col">
              <h3
                className={`text-3xl text-[#4A7C59] mb-6 text-center uppercase tracking-wider font-semibold ${geo.className}`}
              >
                Yield Generation
              </h3>
              <div className="space-y-6 flex-1">
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
  );
};

export default StabilityPoolsSection; 
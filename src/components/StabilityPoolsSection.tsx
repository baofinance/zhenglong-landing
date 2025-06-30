"use client";
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
          className={`text-3xl md:text-4xl font-normal text-center mb-16 tracking-wider uppercase font-geo`}
        >
          Stability Pools: Get rewarded for securing the market.
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Security */}
          <div className="space-y-8 h-full">
            <div className="bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors p-8 min-h-[400px] flex flex-col">
              <h3
                className={`text-3xl text-[#4A7C59] mb-6 text-center uppercase tracking-wider font-normal font-geo`}
              >
                Market Solvency
              </h3>
              <div className="space-y-6 flex-1">
                <p className="text-[#F5F5F5]/80 leading-relaxed mb-4">
                  When a market approaches its minimum collateral ratio (e.g.
                  130%), Stability Pools kick in to rebalance.
                </p>
                <ul className="list-disc list-inside text-[#F5F5F5]/70 mb-4">
                  <li>Redeemed for collateral at market value, or</li>
                  <li>
                    Swapped for steamedTOKENS (leveraged tokens) at market value
                  </li>
                </ul>
                <p className="text-[#F5F5F5]/80 leading-relaxed mb-2">
                  This controlled redemption improves the overall collateral
                  ratio.
                </p>
                <p className="text-[#F5F5F5]/60 leading-relaxed italic">
                  No margin calls. No liquidation cascades. Just resilient,
                  automated stability.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Yield */}
          <div className="space-y-8 h-full">
            <div className="bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors p-8 min-h-[400px] flex flex-col">
              <h3
                className={`text-3xl text-[#4A7C59] mb-6 text-center uppercase tracking-wider font-normal font-geo`}
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
                      Earn yield from stETH and other yield-bearing collateral
                      tokens used in the protocol, distributed to rebalance pool
                      depositors.
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
                      participating in stability pools, enhancing your overall
                      yield.
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
              className={`bg-[#4A7C59]/50 text-[#F5F5F5]/50 px-8 py-3 tracking-wider uppercase text-lg cursor-not-allowed font-geo`}
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

"use client";
import FlipCard from "./FlipCard";

const FeaturesSection = () => {
  return (
    <section className="relative z-10">
      <div className="absolute inset-0 pointer-events-none">
        {/* Steam squares for Features section */}
        <div className="absolute top-[10%] left-[20%] w-[300px] h-[200px] bg-[#4A7C59]/[0.08]"></div>
        <div className="absolute top-[15%] right-[15%] w-[250px] h-[180px] bg-[#4A7C59]/[0.06]"></div>
        <div className="absolute top-[5%] left-[40%] w-[200px] h-[150px] bg-[#4A7C59]/[0.10] animate-float-1"></div>
        <div className="absolute top-[25%] right-[35%] w-[180px] h-[140px] bg-[#4A7C59]/[0.08] animate-float-2"></div>
        <div className="absolute bottom-[20%] left-[25%] w-[120px] h-[120px] bg-[#4A7C59]/[0.12] animate-steam-1"></div>
        <div className="absolute bottom-[30%] right-[25%] w-[100px] h-[100px] bg-[#4A7C59]/[0.10] animate-steam-2"></div>
      </div>
      <div className="container mx-auto px-6 py-24">
        <h2
          className={`text-3xl md:text-4xl font-normal text-center mb-16 tracking-wider uppercase font-geo`}
        >
          Fully Backed and Redeemable Tokens
        </h2>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
            <div className="lg:col-span-2">
              <div className="text-center w-full max-w-4xl mx-auto h-full p-6 pt-10 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors relative">
                <div
                  className={`text-3xl md:text-4xl mb-6 text-[#4A7C59] font-geo`}
                >
                  ZHE TOKENS
                </div>
                <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-normal mb-8">
                  High yield pegged tokens that track price feeds 1:1, with
                  built in real yield via stability pools
                </p>
                {/* Scrolling green flip cards */}
                <div className="flex flex-col md:flex-row justify-center items-center w-full mb-4 gap-2 md:gap-4">
                  <FlipCard
                    token="zheETH"
                    explanation="Super high yield ETH exposure"
                    className="w-full md:w-40 h-16 mb-2 md:mb-0"
                  />
                  <FlipCard
                    token="zheBTC"
                    explanation="Super high yield BTC exposure"
                    className="w-full md:w-40 h-16 mb-2 md:mb-0"
                  />
                  <FlipCard
                    token="More Coming Soon"
                    explanation="Stay tuned for more high-yield tokens!"
                    className="w-full md:w-40 h-16 mb-2 md:mb-0"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 flex flex-col gap-4 h-full min-h-0">
              <div className="flex flex-row items-center gap-4 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors rounded-sm px-4 py-4 relative overflow-visible flex-1 min-h-20">
                <div className="w-8 h-8 bg-[#4A7C59] flex items-center justify-center flex-shrink-0 z-10 mr-2">
                  <img src="/yield.svg" alt="Yield Icon" className="w-8 h-8" />
                </div>
                <p className="text-sm text-[#F5F5F5]/70 text-left break-words">
                  Earn real yield from stability pools
                </p>
              </div>
              <div className="flex flex-row items-center gap-4 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors rounded-sm px-4 py-4 relative overflow-visible flex-1 min-h-20">
                <div className="w-8 h-8 bg-[#4A7C59] flex items-center justify-center flex-shrink-0 z-10 mr-2">
                  <img
                    src="/rocket.svg"
                    alt="Rocket Icon"
                    className="w-8 h-8"
                  />
                </div>
                <p className="text-sm text-[#F5F5F5]/70 text-left break-words">
                  Earn STEAM from AMM liquidity
                </p>
              </div>
              <div className="flex flex-row items-center gap-4 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors rounded-sm px-4 py-4 relative overflow-visible flex-1 min-h-20">
                <div className="w-8 h-8 bg-[#4A7C59] flex items-center justify-center flex-shrink-0 z-10 mr-2">
                  <img src="/defi.svg" alt="DeFi Icon" className="w-8 h-8" />
                </div>
                <p className="text-sm text-[#F5F5F5]/70 text-left break-words">
                  Use in Defi
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="text-center w-full max-w-4xl mx-auto h-full p-6 pt-10 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors relative">
                <div
                  className={`text-3xl md:text-4xl mb-6 text-[#4A7C59] font-geo`}
                >
                  STEAMED TOKENS
                </div>
                <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-normal mb-8">
                  Get supercharged market exposure through liquidation-protected
                  variable leverage tokens
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center w-full mb-4 gap-2 md:gap-4">
                  <FlipCard
                    token="steamedUSD/ETH"
                    explanation="Bullish USD vs ETH"
                    className="w-full md:w-40 h-16 mb-2 md:mb-0"
                  />
                  <FlipCard
                    token="steamedUSD/BTC"
                    explanation="Bullish USD vs BTC"
                    className="w-full md:w-40 h-16 mb-2 md:mb-0"
                  />
                  <FlipCard
                    token="steamedETH/BTC"
                    explanation="Bullish ETH vs BTC"
                    className="w-full md:w-40 h-16 mb-2 md:mb-0"
                  />
                  <FlipCard
                    token="More Coming Soon"
                    explanation="Stay tuned for more leveraged tokens!"
                    className="w-full md:w-40 h-16 mb-2 md:mb-0"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 flex flex-col gap-4 h-full min-h-0">
              <div className="flex flex-row items-center gap-4 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors rounded-sm px-4 py-4 relative overflow-visible flex-1 min-h-20">
                <div className="w-8 h-8 bg-[#4A7C59] flex items-center justify-center flex-shrink-0 z-10 mr-2">
                  <img
                    src="/stability.svg"
                    alt="Stability Icon"
                    className="w-8 h-8"
                  />
                </div>
                <p className="text-sm text-[#F5F5F5]/70 text-left break-words">
                  Each token has a bull side and bear side
                </p>
              </div>
              <div className="flex flex-row items-center gap-4 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors rounded-sm px-4 py-4 relative overflow-visible flex-1 min-h-20">
                <div className="w-8 h-8 bg-[#4A7C59] flex items-center justify-center flex-shrink-0 z-10 mr-2">
                  <img
                    src="/rebalance.svg"
                    alt="Rebalance Icon"
                    className="w-8 h-8"
                  />
                </div>
                <p className="text-sm text-[#F5F5F5]/70 text-left break-words">
                  Automated Rebalancing
                </p>
              </div>
              <div className="flex flex-row items-center gap-4 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors rounded-sm px-4 py-4 relative overflow-visible flex-1 min-h-20">
                <div className="w-8 h-8 bg-[#4A7C59] flex items-center justify-center flex-shrink-0 z-10 mr-2">
                  <img src="/defi.svg" alt="DeFi Icon" className="w-8 h-8" />
                </div>
                <p className="text-sm text-[#F5F5F5]/70 text-left break-words">
                  Use in Defi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

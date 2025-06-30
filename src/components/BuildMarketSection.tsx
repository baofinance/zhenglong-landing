"use client";
import Link from "next/link";

const BuildMarketSection = () => {
  return (
    <section className="relative z-10">
      <div className="absolute inset-0 pointer-events-none">
        {/* Steam squares for Build a Market section */}
        <div className="absolute top-[10%] left-[22%] w-[360px] h-[260px] bg-[#4A7C59]/[0.04]"></div>
        <div className="absolute top-[15%] right-[20%] w-[300px] h-[220px] bg-[#4A7C59]/[0.03]"></div>
        <div className="absolute top-[25%] left-[35%] w-[240px] h-[180px] bg-[#4A7C59]/[0.05] animate-float-4"></div>
        <div className="absolute bottom-[20%] right-[25%] w-[160px] h-[160px] bg-[#4A7C59]/[0.04] animate-float-1"></div>
        <div className="absolute bottom-[25%] left-[28%] w-[120px] h-[120px] bg-[#4A7C59]/[0.06] animate-steam-3"></div>
      </div>
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-[#4A7C59] flex items-center justify-center rounded-sm mb-6">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="white"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m-8-8h16"
              />
            </svg>
          </div>
          <h2
            className={`text-3xl md:text-4xl font-normal text-center tracking-wider uppercase font-geo`}
          >
            Collaborate on a New Market
          </h2>
        </div>
        <div className="bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors p-8">
          <div className="max-w-5xl mx-auto space-y-8 text-center">
            <p className="text-xl text-[#F5F5F5]/80 leading-relaxed tracking-wide font-light">
              Whether one of our existing ideas resonates with your community or
              you have your own creative vision, Zhenglong is ready to help you
              build it. Launch your own market with minimal requirements - if
              you have a collateral token and a price feed, you&apos;re ready to
              go.
            </p>
            <div className="space-y-6 text-left">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 bg-[#4A7C59] flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12V8H6a2 2 0 00-2 2v4m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0h-2m-4 0h-8"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className={`text-lg font-medium mb-2 tracking-wider uppercase text-[#4A7C59] font-geo`}
                  >
                    Collateral Token
                  </h3>
                  <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                    Any ERC20 token can serve as collateral. Common choices
                    include stablecoins and major cryptocurrencies.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 bg-[#4A7C59] flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className={`text-lg font-medium mb-2 tracking-wider uppercase text-[#4A7C59] font-geo`}
                  >
                    Price Feed
                  </h3>
                  <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                    Connect any data source through Chainlink oracles. From
                    traditional markets to novel data streams.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-8 text-center">
              <Link
                href="https://discord.com/invite/BW3P62vJXT"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block bg-[#4A7C59] hover:bg-[#4A7C59]/80 text-[#F5F5F5] px-8 py-4 tracking-wider uppercase text-lg transition-colors font-geo`}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildMarketSection;

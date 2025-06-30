"use client";
// Removed useState import as flip state is handled within each card
import UseCaseBox from "./UseCaseBox";

const UseCasesSection = () => {
  const useCases = [
    {
      title: "Weather Derivatives",
      description:
        "Farmers hedge against drought or excessive rainfall; insurers offer coverage without centralized providers.",
      icon: "/weather.svg",
    },
    {
      title: "Carbon Credit & ESG Tokens",
      description:
        "Businesses offset carbon exposure directly via DeFi, incentivizing green initiatives.",
      icon: "/content.svg",
    },
    {
      title: "Equity Indices",
      description:
        "DeFi traders gain exposure to equities without leaving crypto ecosystems.",
      icon: "/file.svg",
    },
    {
      title: "Individual Stock Tokens",
      description:
        "Global accessibility to popular stocks, especially for users in restricted jurisdictions.",
      icon: "/rocket.svg",
    },
    {
      title: "Athlete Performance Metrics",
      description:
        "Fans gain financial exposure to athlete performance, boosting engagement.",
      icon: "/social.svg",
    },
    {
      title: "Music & Streaming Revenue",
      description:
        "Artists tokenize future royalties, allowing direct fan investment.",
      icon: "/content.svg",
    },
    {
      title: "Inflation & CPI Tokens",
      description:
        "Users hedge against inflation risk directly on-chain, protecting their purchasing power.",
      icon: "/pricefeed.svg",
    },
    {
      title: "GDP Growth Tokens",
      description:
        "Economists or investors hedge against or speculate on economic growth data.",
      icon: "/funding.svg",
    },
    {
      title: "AI & Machine Learning Performance",
      description:
        "Investors gain exposure to AI advancements, rewarding R&D success transparently.",
      icon: "/automated.svg",
    },
    {
      title: "Crypto Adoption Metrics",
      description:
        "Speculate on crypto adoption growth without investing in a single asset.",
      icon: "/community.svg",
    },
    {
      title: "Precious Metals",
      description:
        "Store of value alternatives or hedging instruments fully backed by crypto collateral.",
      icon: "/collateral.svg",
    },
    {
      title: "Energy Commodities",
      description:
        "Traders or companies hedge energy exposure directly through DeFi markets.",
      icon: "/leverage.svg",
    },
    {
      title: "Foreign Currency Pegged Tokens",
      description: "Global, decentralized FX markets accessible 24/7.",
      icon: "/globe.svg",
    },
    {
      title: "Emerging Market Currency Tokens",
      description:
        "Enable risk management or speculation on volatile emerging market currencies.",
      icon: "/institution.svg",
    },
    {
      title: "ETH Gas Price Tokens",
      description:
        "Hedge transaction fee exposure or speculate on Ethereum congestion.",
      icon: "/yield.svg",
    },
    {
      title: "NFT Floor Price Tokens",
      description:
        "Traders speculate or hedge NFT market exposure without direct NFT holdings.",
      icon: "/art.svg",
    },
  ];

  return (
    <section className="relative z-10">
      <div className="absolute inset-0 pointer-events-none">
        {/* Steam squares for Use Cases section */}
        <div className="absolute top-[8%] left-[18%] w-[420px] h-[300px] bg-[#4A7C59]/[0.08]"></div>
        <div className="absolute top-[12%] right-[22%] w-[360px] h-[260px] bg-[#4A7C59]/[0.06]"></div>
        <div className="absolute top-[20%] left-[38%] w-[280px] h-[220px] bg-[#4A7C59]/[0.10] animate-float-2"></div>
        <div className="absolute bottom-[18%] right-[28%] w-[180px] h-[180px] bg-[#4A7C59]/[0.08] animate-float-3"></div>
        <div className="absolute bottom-[22%] left-[22%] w-[140px] h-[140px] bg-[#4A7C59]/[0.12] animate-steam-1"></div>
      </div>
      <div className="container mx-auto px-6 py-24">
        <h2
          className={`text-3xl md:text-4xl font-normal text-center mb-16 tracking-wider uppercase font-geo`}
        >
          Use Cases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {useCases.map((useCase, index) => (
            <UseCaseBox
              key={index}
              title={useCase.title}
              description={useCase.description}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-[#F5F5F5]/80 leading-relaxed tracking-wide font-normal max-w-3xl mx-auto">
            These examples show just a few ways Zhenglong Protocol could empower
            innovation by turning any reliable data source into a secure,
            yield-generating pegged token market. The flexibility is huge—and as
            long as there's reliable price data and market demand, Zhenglong can
            tokenize it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;

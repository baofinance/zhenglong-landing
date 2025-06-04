"use client";
import { geo } from "@/utils/fonts";
import UseCaseBox from "./UseCaseBox";

const UseCasesSection = () => {
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
          className={`text-3xl md:text-4xl font-normal text-center mb-16 tracking-wider uppercase ${geo.className}`}
        >
          Use Cases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          <UseCaseBox
            title="Weather Derivatives"
            tokens={["zheRAIN"]}
            summary="Farmers hedge against drought or excessive rainfall; insurers offer coverage without centralized providers."
            details="Pegged to rainfall or weather indices, zheRAIN enables decentralized weather risk management for agriculture and insurance markets."
          />
          <UseCaseBox
            title="Carbon Credit & ESG Tokens"
            tokens={["zheCO2"]}
            summary="Businesses offset carbon exposure directly via DeFi, incentivizing green initiatives."
            details="zheCO2 tracks global carbon prices, allowing companies to offset emissions and participate in ESG markets on-chain."
          />
          <UseCaseBox
            title="Equity Indices"
            tokens={["zheSPX", "zheNDX"]}
            summary="DeFi traders gain exposure to equities without leaving crypto ecosystems."
            details="Synthetic tokens like zheSPX and zheNDX track S&P 500 and Nasdaq indices, enabling global, 24/7 access to equity markets."
          />
          <UseCaseBox
            title="Individual Stock Tokens"
            tokens={["zheTSLA", "zheAAPL"]}
            summary="Global accessibility to popular stocks, especially for users in restricted jurisdictions."
            details="zheTSLA and zheAAPL provide synthetic exposure to Tesla and Apple, democratizing access to top equities."
          />
          <UseCaseBox
            title="Athlete Performance Metrics"
            tokens={["zheGOALS"]}
            summary="Fans gain financial exposure to athlete performance, boosting engagement."
            details="zheGOALS is pegged to athlete stats, letting fans and traders speculate on or hedge against sports performance."
          />
          <UseCaseBox
            title="Music & Streaming Revenue"
            tokens={["zheSTREAM"]}
            summary="Artists tokenize future royalties, allowing direct fan investment."
            details="zheSTREAM tracks streaming revenue indexes or royalties, opening new funding models for creators."
          />
          <UseCaseBox
            title="Inflation & CPI Tokens"
            tokens={["zheCPI"]}
            summary="Users hedge against inflation risk directly on-chain, protecting their purchasing power."
            details="zheCPI is pegged to consumer price indices, enabling on-chain inflation hedging for DeFi users."
          />
          <UseCaseBox
            title="GDP Growth Tokens"
            tokens={["zheGDP"]}
            summary="Economists or investors hedge against or speculate on economic growth data."
            details="zheGDP tracks GDP growth, allowing macro speculation and risk management on-chain."
          />
          <UseCaseBox
            title="AI & Machine Learning Performance"
            tokens={["zheAI"]}
            summary="Investors gain exposure to AI advancements, rewarding R&D success transparently."
            details="zheAI is pegged to AI performance benchmarks, letting users invest in the growth of AI technology."
          />
          <UseCaseBox
            title="Crypto Adoption Metrics"
            tokens={["zheADOPT"]}
            summary="Speculate on crypto adoption growth without investing in a single asset."
            details="zheADOPT tracks blockchain adoption or transaction metrics, enabling new ways to bet on crypto's future."
          />
          <UseCaseBox
            title="Precious Metals"
            tokens={["zheGOLD", "zheSILVER"]}
            summary="Store of value alternatives or hedging instruments fully backed by crypto collateral."
            details="zheGOLD and zheSILVER provide synthetic, on-chain exposure to gold and silver prices."
          />
          <UseCaseBox
            title="Energy Commodities"
            tokens={["zheOIL", "zheGAS"]}
            summary="Traders or companies hedge energy exposure directly through DeFi markets."
            details="zheOIL and zheGAS track oil and natural gas prices, bringing energy markets to DeFi."
          />
          <UseCaseBox
            title="Foreign Currency Pegged Tokens"
            tokens={["zheEUR", "zheJPY"]}
            summary="Global, decentralized FX markets accessible 24/7."
            details="zheEUR and zheJPY enable on-chain trading and hedging of major fiat currencies."
          />
          <UseCaseBox
            title="Emerging Market Currency Tokens"
            tokens={["zheINR", "zheBRL"]}
            summary="Enable risk management or speculation on volatile emerging market currencies."
            details="zheINR and zheBRL bring emerging market FX exposure to DeFi, expanding global access."
          />
          <UseCaseBox
            title="ETH Gas Price Tokens"
            tokens={["zheGAS"]}
            summary="Hedge transaction fee exposure or speculate on Ethereum congestion."
            details="zheGAS is pegged to Ethereum gas prices, letting users hedge or speculate on network fees."
          />
          <UseCaseBox
            title="NFT Floor Price Tokens"
            tokens={["zheNFT"]}
            summary="Traders speculate or hedge NFT market exposure without direct NFT holdings."
            details="zheNFT tracks floor prices of top NFT collections (e.g., CryptoPunks, BAYC), enabling new NFT market strategies."
          />
        </div>
        <div className="mt-12 text-center">
          <p className="text-[#F5F5F5]/80 leading-relaxed tracking-wide font-light max-w-3xl mx-auto">
            These examples show just a few ways Zhenglong Protocol could
            empower innovation by turning any reliable data source into a
            secure, yield-generating pegged token market. The flexibility
            is huge—and as long as there's reliable price data and market
            demand, Zhenglong can tokenize it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection; 
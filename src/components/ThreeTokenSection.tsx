"use client";

const ThreeTokenSection = () => {
  const items = [
    {
      title: "Collateral Tokens",
      body: "Yield-bearing assets (e.g. stETH) deposited by users. Collateral is pooled globally, backing both zheTOKENS and steamedTOKENS. The ongoing yield feeds Stability-Pool rewards.",
    },
    {
      title: "zheTOKENS",
      body: "Synthetic assets pegged 1 : 1 to real-world prices. Fully redeemable for collateral and able to earn native yield when deposited into Stability Pools.",
    },
    {
      title: "steamedTOKENS",
      body: "Tokenizing the difference in collateral and zheTOKEN value.  Collateral gains (or losses) magnify vs the peg, but without margin calls. Rebalancing is handled system-wide via Stability Pools instead of forced liquidations.",
    },
  ];

  return (
    <section className="relative z-10">
      <div className="container mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-normal text-center mb-16 tracking-wider uppercase font-geo">
          The Three-Token Model
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors p-8 flex flex-col"
            >
              <h3 className="text-3xl text-[#4A7C59] mb-6 tracking-wider font-geo font-normal text-center">
                {item.title === "zheTOKENS"
                  ? "zheTOKENS"
                  : item.title === "steamedTOKENS"
                  ? "steamedTOKENS"
                  : item.title.toUpperCase()}
              </h3>
              <p className="text-[#F5F5F5]/70 leading-relaxed font-normal">
                {item.body}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-[#F5F5F5]/80 leading-relaxed mt-12 max-w-4xl mx-auto">
          With 100% collateral efficiency, choose to mint a stable,
          yield-bearing zheTOKEN or a high-beta steamedTOKEN
        </p>
      </div>
    </section>
  );
};

export default ThreeTokenSection;

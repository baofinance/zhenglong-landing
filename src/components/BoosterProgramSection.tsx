"use client";
import Link from "next/link";

const BoosterProgramSection = () => {
  return (
    <section className="relative z-10">
      <div className="absolute inset-0 pointer-events-none">
        {/* Steam squares for Booster Program section */}
        <div className="absolute top-[5%] left-[20%] w-[380px] h-[280px] bg-[#4A7C59]/[0.04]"></div>
        <div className="absolute top-[15%] right-[25%] w-[320px] h-[240px] bg-[#4A7C59]/[0.03]"></div>
        <div className="absolute top-[25%] left-[35%] w-[260px] h-[200px] bg-[#4A7C59]/[0.05] animate-float-1"></div>
        <div className="absolute bottom-[20%] right-[30%] w-[160px] h-[160px] bg-[#4A7C59]/[0.04] animate-float-4"></div>
        <div className="absolute bottom-[25%] left-[25%] w-[140px] h-[140px] bg-[#4A7C59]/[0.06] animate-steam-2"></div>
      </div>
      <div className="container mx-auto px-6 py-24">
        <h2
          className={`text-3xl md:text-4xl font-normal text-center mb-16 tracking-wider uppercase font-geo`}
        >
          Community Booster Program
        </h2>
        <div className="space-y-16">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Description Text */}
            <p className="text-xl text-[#F5F5F5]/80 leading-relaxed tracking-wide font-light text-center max-w-3xl mx-auto">
              Join our community of boosters and earn STEAM tokens for helping
              spread the word about Zhenglong Protocol. Any form of marketing
              contribution is welcome.
            </p>

            {/* Four Boxes Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors p-6 pt-10 relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-[#4A7C59] flex items-center justify-center">
                  <img
                    src="/social.svg"
                    alt="Social Media Icon"
                    className="w-8 h-8"
                  />
                </div>
                <h3
                  className={`text-3xl text-[#4A7C59] mb-3 text-center uppercase tracking-wider font-normal font-geo`}
                >
                  Social Media
                </h3>
                <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                  Create X threads, engage in discussions, and share insights
                  about the protocol
                </p>
              </div>
              <div className="bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors p-6 pt-10 relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-[#4A7C59] flex items-center justify-center">
                  <img
                    src="/content.svg"
                    alt="Content Creation Icon"
                    className="w-8 h-8"
                  />
                </div>
                <h3
                  className={`text-3xl text-[#4A7C59] mb-3 text-center uppercase tracking-wider font-normal font-geo`}
                >
                  Content Creation
                </h3>
                <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                  Produce videos, tutorials, articles, blogs, and educational
                  content about Zhenglong
                </p>
              </div>
              <div className="bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors p-6 pt-10 relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-[#4A7C59] flex items-center justify-center">
                  <img
                    src="/art.svg"
                    alt="Art and Memes Icon"
                    className="w-8 h-8"
                  />
                </div>
                <h3
                  className={`text-3xl text-[#4A7C59] mb-3 text-center uppercase tracking-wider font-normal font-geo`}
                >
                  Art & Memes
                </h3>
                <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                  Create artwork, memes, and visual content to promote Zhenglong
                </p>
              </div>
              <div className="bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors p-6 pt-10 relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-[#4A7C59] flex items-center justify-center">
                  <img
                    src="/community.svg"
                    alt="Community Building Icon"
                    className="w-8 h-8"
                  />
                </div>
                <h3
                  className={`text-3xl text-[#4A7C59] mb-3 text-center uppercase tracking-wider font-normal font-geo`}
                >
                  Community Building
                </h3>
                <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                  Organize community events and foster discussions in your local
                  network
                </p>
              </div>
            </div>

            {/* Token Supply Text */}
            <div className="text-center">
              <p className="text-lg md:text-xl text-[#F5F5F5] leading-relaxed tracking-wider font-light">
                <span className="block mb-2">
                  <span
                    className={`text-3xl md:text-5xl font-medium text-[#4A7C59] border-b border-[#4A7C59]/50 pb-1 font-geo`}
                  >
                    3%
                  </span>
                </span>
                <span className="block text-[#F5F5F5]/90">
                  of STEAM token supply is distributed to our community of
                  boosters
                </span>
              </p>
            </div>

            {/* Become a Booster Box */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors p-6 relative">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="space-y-3">
                    <div
                      className={`text-3xl text-[#4A7C59] uppercase font-geo`}
                    >
                      Become a Booster
                    </div>
                    <p className="text-[#F5F5F5]/70 leading-relaxed tracking-wide font-light">
                      Help grow the Zhenglong ecosystem and earn rewards for
                      your contributions
                    </p>
                    <div className="pt-3">
                      <Link
                        href="https://discord.com/invite/BW3P62vJXT"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block bg-[#4A7C59] hover:bg-[#4A7C59]/80 text-[#F5F5F5] px-8 py-3 tracking-wider uppercase text-lg transition-colors font-geo`}
                      >
                        Join Program
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoosterProgramSection;

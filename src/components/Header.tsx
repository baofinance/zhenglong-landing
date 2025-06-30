"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  page: "landing" | "ido";
  walletAddress?: string;
  connectWallet?: () => void;
  disconnectWallet?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  page,
  walletAddress,
  connectWallet,
  disconnectWallet,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/90 backdrop-blur-sm border-b border-[#4A7C59]/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Zhenglong Logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-normal tracking-wider font-geo">
              ZHENGLONG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/ido"
              className="text-xl text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap font-geo"
            >
              IDO
            </a>
            <a
              href="https://docs.zhenglong.finance"
              className="text-xl text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap font-geo"
            >
              Docs
            </a>
            <a
              href="#"
              className="text-xl text-[#F5F5F5]/50 tracking-wider cursor-not-allowed whitespace-nowrap font-geo"
            >
              Governance
            </a>
            <a
              href="https://discord.com/invite/BW3P62vJXT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap font-geo"
            >
              Discord
            </a>
            <a
              href="https://x.com/ZhenglongFi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap font-geo"
            >
              X
            </a>
            <a
              href="https://litepaper.zhenglong.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap font-geo"
            >
              Litepaper
            </a>
          </div>

          {/* Action Button */}
          <div className="hidden md:flex relative" ref={menuRef}>
            {page === "ido" ? (
              walletAddress && connectWallet ? (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`bg-[#4A7C59]/50 px-6 py-2 text-white/50 text-xl tracking-wider uppercase font-geo`}
                >
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className={`bg-[#4A7C59] hover:bg-[#5A8B69] px-6 py-2 text-white text-xl tracking-wider uppercase transition-colors disabled:bg-[#4A7C59]/50 font-geo`}
                >
                  Connect Wallet
                </button>
              )
            ) : (
              <a
                href="#"
                className="bg-[#4A7C59] text-white px-6 py-3 tracking-wider uppercase text-xl cursor-not-allowed font-geo"
              >
                Launch App
              </a>
            )}

            {isMenuOpen && disconnectWallet && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#1A1A1A] border border-[#4A7C59]/50 shadow-lg">
                <button
                  onClick={() => {
                    disconnectWallet();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#F5F5F5]/80 hover:bg-[#4A7C59]/20 font-geo"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#F5F5F5] hover:text-[#F5F5F5]/80 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* Menu Icon */}
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18" />
              <path d="M3 6h18" />
              <path d="M3 18h18" />
            </svg>
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-[#1A1A1A] border-t border-[#4A7C59]/20 shadow-lg">
              <div className="flex flex-col items-center gap-4 py-4">
                <a
                  href="/ido"
                  className="text-xl text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors font-geo"
                >
                  IDO
                </a>
                <a
                  href="https://docs.zhenglong.finance"
                  className="text-xl text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors font-geo"
                >
                  Docs
                </a>
                <a
                  href="#"
                  className="text-xl text-[#F5F5F5]/50 tracking-wider cursor-not-allowed font-geo"
                >
                  Governance
                </a>
                <a
                  href="https://discord.com/invite/BW3P62vJXT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors font-geo"
                >
                  Discord
                </a>
                <a
                  href="https://x.com/ZhenglongFi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors font-geo"
                >
                  X
                </a>
                <a
                  href="https://litepaper.zhenglong.finance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors font-geo"
                >
                  Litepaper
                </a>
                <div className="mt-4">
                  {page === "ido" ? (
                    walletAddress && connectWallet ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="bg-[#4A7C59]/50 px-6 py-2 text-white/50 text-xl tracking-wider uppercase font-geo">
                          {walletAddress.slice(0, 6)}...
                          {walletAddress.slice(-4)}
                        </div>
                        <button
                          onClick={() => {
                            if (disconnectWallet) disconnectWallet();
                            setIsMenuOpen(false);
                          }}
                          className="text-sm text-[#F5F5F5]/80 hover:text-[#F5F5F5] font-geo"
                        >
                          Disconnect
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={connectWallet}
                        className="bg-[#4A7C59] hover:bg-[#5A8B69] px-6 py-2 text-white text-xl tracking-wider uppercase transition-colors disabled:bg-[#4A7C59]/50 font-geo"
                      >
                        Connect Wallet
                      </button>
                    )
                  ) : (
                    <a
                      href="#"
                      className="bg-[#4A7C59] text-white px-6 py-3 tracking-wider uppercase text-xl cursor-not-allowed font-geo"
                    >
                      Launch App
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

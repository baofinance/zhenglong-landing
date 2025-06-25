"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  geoClassName: string;
  page?: string;
  walletAddress?: string;
  isConnecting?: boolean;
  connectWallet?: () => Promise<void>;
  disconnectWallet?: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({
  geoClassName,
  page,
  walletAddress,
  isConnecting,
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/90 backdrop-blur-sm border-b border-[#4A7C59]/20 w-full px-6">
      <div className="flex items-center justify-between h-16 w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Zhenglong"
              width={32}
              height={32}
              className="w-full h-full"
            />
          </div>
          <span
            className={`text-xl tracking-wider text-[#4A7C59] ${geoClassName}`}
          >
            ZHENGLONG
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/ido"
            className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap"
          >
            IDO
          </a>
          <a
            href="https://docs.zhenglong.finance"
            className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap"
          >
            Docs
          </a>
          <a
            href="#"
            className="text-[#F5F5F5]/50 tracking-wider cursor-not-allowed whitespace-nowrap"
          >
            Governance
          </a>
          <a
            href="https://discord.com/invite/BW3P62vJXT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap"
          >
            Discord
          </a>
          <a
            href="https://x.com/ZhenglongFi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap"
          >
            X
          </a>
          <a
            href="https://litepaper.zhenglong.finance"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap"
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
                className={`bg-[#4A7C59]/50 px-6 py-2 text-white/50 text-lg tracking-wider uppercase ${geoClassName}`}
              >
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </button>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className={`bg-[#4A7C59] hover:bg-[#5A8B69] px-6 py-2 text-white text-lg tracking-wider uppercase transition-colors disabled:bg-[#4A7C59]/50 ${geoClassName}`}
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )
          ) : (
            <button
              disabled
              className={`bg-[#4A7C59]/50 px-6 py-2 text-white/50 text-lg tracking-wider uppercase ${geoClassName}`}
            >
              Launch App
            </button>
          )}

          {isMenuOpen && disconnectWallet && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-[#1A1A1A] border border-[#4A7C59]/50 shadow-lg">
              <button
                onClick={() => {
                  disconnectWallet();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-[#F5F5F5]/80 hover:bg-[#4A7C59]/20"
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
                className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors"
              >
                IDO
              </a>
              <a
                href="https://docs.zhenglong.finance"
                className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors"
              >
                Docs
              </a>
              <a
                href="#"
                className="text-[#F5F5F5]/50 tracking-wider cursor-not-allowed"
              >
                Governance
              </a>
              <a
                href="https://discord.com/invite/BW3P62vJXT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors"
              >
                Discord
              </a>
              <a
                href="https://x.com/ZhenglongFi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors"
              >
                X
              </a>
              <a
                href="https://litepaper.zhenglong.finance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors"
              >
                Litepaper
              </a>
              <div className="mt-4">
                {page === "ido" ? (
                  walletAddress && connectWallet ? (
                    <div className="flex flex-col items-center gap-4">
                      <div
                        className={`bg-[#4A7C59]/50 px-6 py-2 text-white/50 text-lg tracking-wider uppercase ${geoClassName}`}
                      >
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </div>
                      <button
                        onClick={() => {
                          if (disconnectWallet) disconnectWallet();
                          setIsMenuOpen(false);
                        }}
                        className="text-sm text-[#F5F5F5]/80 hover:text-[#F5F5F5]"
                      >
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={connectWallet}
                      disabled={isConnecting}
                      className={`bg-[#4A7C59] hover:bg-[#5A8B69] px-6 py-2 text-white text-lg tracking-wider uppercase transition-colors disabled:bg-[#4A7C59]/50 ${geoClassName}`}
                    >
                      {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </button>
                  )
                ) : (
                  <button
                    disabled
                    className={`bg-[#4A7C59]/50 px-6 py-2 text-white/50 text-lg tracking-wider uppercase ${geoClassName}`}
                  >
                    Launch App
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
